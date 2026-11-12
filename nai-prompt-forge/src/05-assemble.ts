// ============================================================================
// Assembler and linter: turns a Setup into the paste-ready V5 blocks and runs
// the pre-flight checklist (SKILL §25). Pure functions, no API calls.
// ============================================================================

type IssueLevel = 'error' | 'warn' | 'info'

interface Issue {
    level: IssueLevel
    where: string
    msg: string
}

interface CharBlock {
    title: string
    prompt: string
    uc: string
}

interface Blocks {
    settings: string
    base: string
    baseUc: string
    chars: CharBlock[]
    notes: string[]
    issues: Issue[]
    tokens: number
}

interface Ctx {
    setup: Setup
    lib: Library
    issues: Issue[]
    notes: string[]
}

function newCtx(setup: Setup, lib: Library): Ctx {
    return { setup, lib, issues: [], notes: [] }
}

function issue(ctx: Ctx, level: IssueLevel, where: string, msg: string) {
    if (!ctx.issues.some(i => i.where === where && i.msg === msg)) ctx.issues.push({ level, where, msg })
}

function note(ctx: Ctx, msg: string) {
    if (!ctx.notes.includes(msg)) ctx.notes.push(msg)
}

// ---------------------------------------------------------------- tag cleaning

const PREFIX_RE = /^(artist|character|copyright|species|rating|meta):/
const INTERACTION_RE = /^(source|target|mutual)#/
const AGE_WORDS_RE = /\b(child|children|kid|kids|toddler|loli|shota|little girl|little boy|young girl|young boy|teen|teenager|underage|schoolchild)\b/i

/** Clean one tag segment: normalise, rename, canonicalise, drop banned. Returns '' to drop it. */
function cleanTag(seg: string, ctx: Ctx, where: string, positive: boolean): string {
    const raw = seg.trim()
    if (!raw) return ''
    if (raw.startsWith('||')) return raw // randomizer, left as written
    const w = unweight(raw)
    if (w.weight !== null) {
        const inner = splitSegments(w.inner)
            .map(s => cleanTag(s, ctx, where, positive && w.weight! > 0))
            .filter(Boolean)
            .join(', ')
        if (!inner) return ''
        const fixed = /[a-z]\d+$/i.test(inner) ? inner + ' ' : inner // digit bug (SKILL §17)
        if (fixed !== inner) note(ctx, `${where}: added a space before "::" after "${inner}" (digit bug).`)
        return `${w.weight}::${fixed}::`
    }
    let t = normTag(raw.replace(/\.$/, ''))
    if (raw.includes('_') && !KEEP_UNDERSCORE.has(raw.toLowerCase())) note(ctx, `${where}: "${raw}" → "${t}".`)
    const pre = t.match(INTERACTION_RE)
    const body = pre ? t.slice(pre[0].length) : t
    let fixedBody = body
    if (RENAMED[fixedBody]) fixedBody = RENAMED[fixedBody]
    const v = vocab()
    if (!v.has(fixedBody) && v.aliases.has(fixedBody)) fixedBody = v.canon(fixedBody)
    if (fixedBody !== body) note(ctx, `${where}: "${body}" → "${fixedBody}" (canonical tag).`)
    t = (pre ? pre[0] : '') + fixedBody
    if (positive && BANNED_POSITIVE[fixedBody]) {
        note(ctx, `${where}: removed "${fixedBody}" (${BANNED_POSITIVE[fixedBody]}).`)
        return ''
    }
    if (fixedBody.includes('|')) {
        issue(ctx, 'error', where, `"${fixedBody}" contains "|"; NovelAI reads it as a randomizer.`)
        return ''
    }
    return t
}

/** A sentence that wandered into a tag-only field. */
function looksLikeSentence(seg: string): boolean {
    const s = seg.trim()
    return /[.!?]$/.test(s) ? s.split(/\s+/).length > 3 : s.split(/\s+/).length > 5
}

/** Clean a tag-only field: every segment is a tag (capitals are lowered, not read as prose). */
function cleanTags(text: string, ctx: Ctx, where: string, positive = true): string {
    return splitSegments(text)
        .map(s => {
            if (looksLikeSentence(s) && !unweight(s).weight) {
                issue(ctx, 'info', where, `"${s.slice(0, 40)}…" reads as a sentence; put it in the prose instead.`)
            }
            return cleanTag(s, ctx, where, positive)
        })
        .filter(Boolean)
        .join(', ')
}

/** Clean a multi-line slot field line by line, keeping each line's prose. */
function cleanLines(text: string, ctx: Ctx, where: string): string[] {
    return lines(text)
        .map(l => {
            const { tags, prose } = splitLine(l)
            const cleaned = tags.map(t => cleanTag(t, ctx, where, true)).filter(Boolean)
            return tagsAndProse(cleaned.join(', '), prose)
        })
        .filter(Boolean)
}

/**
 * Every plain tag in a field, line by line. Weights are unwrapped; prefixes and
 * randomizers are skipped; once a line turns to prose, the rest of it is prose.
 */
function plainTags(text: string): string[] {
    const out: string[] = []
    for (const line of String(text || '').split('\n')) {
        for (const seg of splitLine(line).tags) {
            const w = unweight(seg)
            if (w.weight !== null) {
                if (w.weight > 0) out.push(...plainTags(w.inner))
                continue
            }
            if (seg.startsWith('||')) continue
            const t = seg.trim().replace(/\.$/, '').toLowerCase()
            if (t) out.push(t.replace(INTERACTION_RE, ''))
        }
    }
    return out
}

/** The prose parts of a field (sentences after the tags on each line). */
function proseParts(text: string): string {
    return String(text || '')
        .split('\n')
        .map(l => splitLine(l).prose)
        .filter(Boolean)
        .join(' ')
}

// ------------------------------------------------------------------ checks

function checkExclusive(text: string, ctx: Ctx, where: string) {
    const tags = new Set(plainTags(text))
    for (const g of EXCLUSIVE_GROUPS) {
        const hit = g.tags.filter(t => tags.has(t))
        if (hit.length > 1) issue(ctx, 'warn', where, `One ${g.name} tag per field; found ${hit.join(', ')}.`)
    }
}

function checkUnknown(text: string, ctx: Ctx, where: string) {
    const v = vocab()
    const prefixed = String(text || '')
        .split('\n')
        .flatMap(l => splitSegments(l))
        .flatMap(s => {
            const w = unweight(s)
            return w.weight !== null ? splitSegments(w.inner) : [s]
        })
        .map(s => s.trim().toLowerCase())
        .filter(s => PREFIX_RE.test(s))
    for (const t of uniq(prefixed)) {
        const pm = t.match(PREFIX_RE)!
        const name = t.slice(pm[0].length).trim()
        if (pm[1] === 'artist') {
            const n = v.artistCount(name)
            if (n === undefined) issue(ctx, 'warn', where, `verify count: artist "${name}" isn't in the Danbooru list (under ~100 posts, e621-only, or misspelled).`)
            else if (n < 1000) issue(ctx, 'info', where, `Artist "${name}" has ${n} posts; under ~1,000 can be unreliable.`)
        } else if (pm[1] === 'copyright') {
            const n = v.copyrightCount(name)
            if (n === undefined) issue(ctx, 'warn', where, `verify count: copyright "${name}".`)
            else if (n < 200) issue(ctx, 'warn', where, `Copyright "${name}" has ${n} posts; below ~200 is unreliable.`)
        }
    }
    for (const t of uniq(plainTags(text))) {
        if (PREFIX_RE.test(t) || /^year \d{4}$/.test(t) || /complexity$/.test(t)) continue
        if (v.has(t) || OFF_FILE_ALLOWED.has(t)) continue
        if (/^(\d+|6\+)(girls?|boys?|others?)$/.test(t)) continue
        const color = COLOR_WORDS.find(c => t.startsWith(c + ' '))
        if (color && (v.has(t.slice(color.length + 1)) || OFF_FILE_ALLOWED.has(t.slice(color.length + 1)))) continue
        // The bundled lists hold ~4k curated tags, not all of Danbooru: a miss is a typo only when a near spelling exists.
        const sug = v.suggest(t).filter(x => x !== t)
        if (sug.length) issue(ctx, 'warn', where, `"${t}" isn't in the tag lists; did you mean ${sug.map(x => `"${x}"`).join(' / ')}?`)
        else issue(ctx, 'info', where, `"${t}" isn't in the bundled lists; check it in NovelAI's autocomplete, or write it as prose.`)
    }
}

function checkWeights(text: string, ctx: Ctx, where: string, budget = 3) {
    const opens = (text.match(/::/g) || []).length
    if (opens % 2 !== 0) issue(ctx, 'error', where, 'Unclosed weight: every "n::" needs a closing "::".')
    const content = splitSegments(text).filter(s => {
        const w = unweight(s)
        return w.weight !== null && w.weight > 0 && w.weight !== 1 && !/^artist:/.test(w.inner) && !/mature female|teenage/.test(w.inner)
    })
    if (content.length > budget) issue(ctx, 'warn', where, `${content.length} emphasized entries; keep content emphasis to ${budget} or fewer.`)
    if (/\(\s*[^()]+:\s*\d+(\.\d+)?\s*\)/.test(text)) issue(ctx, 'error', where, 'A1111 weight syntax "(tag:1.3)" does nothing in NovelAI; use 1.3::tag::.')
    if (/--ar\b|--v\s*\d/.test(text)) issue(ctx, 'error', where, 'Midjourney flags do nothing in NovelAI.')
}

/** Drop age-lowering tags from a positive field in any rating above general (SKILL §1). */
function stripAgeTags(text: string, ctx: Ctx, where: string): string {
    if (ctx.setup.rating === 'general') return text
    return String(text || '')
        .split('\n')
        .map(line =>
            splitSegments(line)
                .filter(seg => {
                    const hit = plainTags(seg).find(x => AGE_LOWERING.includes(x))
                    if (hit) issue(ctx, 'error', where, `Removed "${hit}": age-lowering tags never go in a ${ctx.setup.rating} image.`)
                    return !hit
                })
                .join(', '),
        )
        .filter(Boolean)
        .join('\n')
}

function checkAgeProse(text: string, ctx: Ctx, where: string) {
    if (ctx.setup.rating === 'general' || !text) return
    const m = text.match(AGE_WORDS_RE)
    if (m) issue(ctx, 'error', where, `"${m[0]}" in the prose of a ${ctx.setup.rating} image; every figure here is an adult. Rewrite it.`)
}

function checkProse(text: string, ctx: Ctx, where: string) {
    if (!text.trim()) return
    checkAgeProse(text, ctx, where)
    const words: string[] = text.toLowerCase().match(/[a-z']+/g) || []
    const pron = uniq(words.filter(w => PRONOUNS.includes(w)))
    if (pron.length) issue(ctx, 'warn', where, `Pronouns (${pron.join(', ')}): name the subject by a visible feature each time.`)
    if (words.includes('camera')) issue(ctx, 'warn', where, 'Say "viewer", not "camera" (a literal camera can appear).')
    if (/["“”]/.test(text) && !ctx.setup.text) issue(ctx, 'warn', where, 'Quotation marks mean rendered text; remove them or turn on "Text in image".')
    const sentences = text.split(/[.!?]+(\s|$)/).filter(s => s.trim()).length
    if (sentences > 6) issue(ctx, 'warn', where, `${sentences} sentences; past the token ceiling the tail (style, rating) is ignored. Aim for 2–5.`)
    if (/\b(in front of|behind)\b/i.test(text)) issue(ctx, 'info', where, '"In front of" and "behind" are ambiguous; prefer left, right, upper, lower.')
    const feel = words.filter(w => ['feels', 'felt', 'feeling', 'thinks', 'thought', 'remembers', 'wants', 'hopes', 'wishes', 'knows'].includes(w))
    if (feel.length) issue(ctx, 'info', where, `"${uniq(feel).join('", "')}": inner life doesn't render; show it in face and body.`)
    if (words.some(w => ['then', 'afterwards', 'later', 'finally'].includes(w))) issue(ctx, 'info', where, 'Time-sequence words: an image is one frozen instant.')
    if (words.some(w => ['smell', 'smells', 'scent', 'sound', 'sounds', 'hear', 'hears', 'noise', 'taste', 'tastes'].includes(w))) issue(ctx, 'info', where, "Smell, sound and taste don't render.")
    const articles = words.filter(w => ['the', 'a', 'an'].includes(w)).length
    if (articles > 6) issue(ctx, 'info', where, `${articles} articles; V5 prose reads like tags joined by words, so strip most of them.`)
}

function checkNames(fields: [string, string][], ctx: Ctx) {
    const names = uniq(
        [...ctx.setup.cast.map(c => c.name), ...ctx.lib.sheets.map(s => s.name)]
            .map(n => (n || '').trim())
            .filter(n => n.length >= 3 && !['girl', 'boy', 'other', 'new character'].includes(n.toLowerCase())),
    )
    for (const [where, text] of fields) {
        for (const n of names) {
            if (new RegExp(`\\b${escapeRegExp(n)}\\b`, 'i').test(text)) issue(ctx, 'error', where, `Character name "${n}" in the prompt; it renders as text or summons strangers. Use a visible feature.`)
        }
    }
}

function checkBaseAppearance(text: string, ctx: Ctx) {
    const v = vocab()
    const bad = plainTags(text).filter(t => {
        const info = v.get(t)
        return info && info.cats.length && info.cats.every(c => APPEARANCE_CATS.has(c))
    })
    if (bad.length) issue(ctx, 'warn', 'Base Prompt', `Appearance in the base (${uniq(bad).slice(0, 6).join(', ')}); it belongs in a character box.`)
}

function checkBoxScope(text: string, ctx: Ctx, where: string) {
    const v = vocab()
    const gaze = new Set(EXCLUSIVE_GROUPS[0].tags)
    const bad = plainTags(text).filter(t => {
        if (gaze.has(t) || t === 'looking back') return false
        if (/^(\d+|6\+)(girls?|boys?|others?)$/.test(t) || t === 'solo' || t === 'solo focus') return true
        const info = v.get(t)
        return !!info && info.cats.length > 0 && info.cats.every(c => ['setting', 'lighting', 'composition', 'quality', 'count'].includes(c))
    })
    if (bad.length) issue(ctx, 'warn', where, `Scene, camera, count or quality tags in a box (${uniq(bad).slice(0, 6).join(', ')}); they belong in the base.`)
}

function checkRatingTags(text: string, ctx: Ctx, where: string) {
    if (ctx.setup.rating !== 'general' && ctx.setup.rating !== 'sensitive') return
    const v = vocab()
    const nsfw = plainTags(text).filter(t => v.inCats(t, [...CAT.nsfw, ...CAT.furryNsfw]) && !['nsfw', 'explicit'].includes(t))
    if (nsfw.length) issue(ctx, 'warn', where, `Explicit tags (${uniq(nsfw).slice(0, 4).join(', ')}) with rating ${ctx.setup.rating}; raise the rating or remove them.`)
}

// --------------------------------------------------------------- assembly

function styleFor(setup: Setup, lib: Library): StyleBlock | undefined {
    return lib.styles.find(s => s.id === setup.styleId)
}

/** Insert `rating:x` before the block's own `year NNNN` tag (style-blocks.md). */
function withRating(blockBase: string, rating: Rating): string {
    if (/rating:\w+/.test(blockBase)) return blockBase.replace(/rating:\w+/, `rating:${rating}`)
    const m = blockBase.match(/(^|,\s*)(year \d{4})/)
    if (!m || m.index === undefined) return joinSegments([blockBase, `rating:${rating}`])
    const at = m.index + m[1].length
    return blockBase.slice(0, at) + `rating:${rating}, ` + blockBase.slice(at)
}

function moodCues(mood: string): string {
    const out: string[] = []
    for (const w of String(mood || '').toLowerCase().split(/[\s,]+/).filter(Boolean)) {
        if (EMOTION_CUES[w]) out.push(EMOTION_CUES[w])
    }
    return joinSegments(out)
}

function stateTags(c: CastMember): string {
    const s = c.state
    return joinSegments([s.posture, s.gesture, s.expression || moodCues(c.mood), s.gaze, s.extra])
}

function autoPositions(cast: CastMember[]): { x: number; y: number }[] {
    const n = cast.length
    return cast.map((c, i) => c.position ?? { x: n === 1 ? 0.5 : +(0.2 + (0.6 * i) / (n - 1)).toFixed(2), y: 0.4 })
}

/** Trim a member's look and outfit to the framing; returns box lines and what was dropped. */
function boxLines(c: CastMember, setup: Setup, ctx: Ctx, where: string): { look: string[]; outfit: string[]; dropped: string[] } {
    const trim = trimFor(setup.framing, setup.hAngle)
    const v = vocab()
    const dropped: string[] = []
    const closedEyes = plainTags(stateTags(c)).includes('closed eyes')
    const filterLine = (line: string, slot: string): string => {
        const { tags, prose } = splitLine(line)
        let keep = tags
        if (trim.dropCats.length) {
            keep = keep.filter(t => {
                const hit = v.inCats(t.toLowerCase(), trim.dropCats)
                if (hit) dropped.push(t)
                return !hit
            })
        }
        if (closedEyes && slot === 'eyes') {
            keep = keep.filter(t => {
                const hit = v.inCats(t.toLowerCase(), ['eyeColor'])
                if (hit) dropped.push(`${t} (closed eyes)`)
                return !hit
            })
        }
        const keepProse = trim.tagsOnly.includes(slot as LookSlot) ? '' : prose
        if (prose && !keepProse) dropped.push(`${slot} sentence`)
        return tagsAndProse(keep.join(', '), keepProse).replace(/,$/, '')
    }
    const take = (slots: readonly { key: string; label: string }[], src: Record<string, string | undefined>, keepList: string[]): string[] => {
        const out: string[] = []
        for (const s of slots) {
            const val = src[s.key]
            if (!val || !val.trim()) continue
            if (!c.noTrim && !keepList.includes(s.key)) {
                dropped.push(s.label.toLowerCase())
                continue
            }
            for (const l of cleanLines(val, ctx, where)) {
                const f = c.noTrim ? l : filterLine(l, s.key)
                if (f) out.push(punctuateLine(f))
            }
        }
        return out
    }
    return { look: take(LOOK_SLOTS, c.look, trim.look), outfit: take(OUTFIT_SLOTS, c.outfit, trim.outfit), dropped }
}

/** The other characters' most distinctive traits, minus anything this one has (SKILL §16 bleed guard). */
function bleedGuard(c: CastMember, cast: CastMember[]): string[] {
    const v = vocab()
    const mine = new Set(plainTags([...Object.values(c.look), ...Object.values(c.outfit), stateTags(c)].join('\n')))
    const out: string[] = []
    for (const o of cast) {
        if (o.id === c.id) continue
        const theirs = plainTags(Object.values(o.look).join('\n'))
        const distinct = theirs.filter(t => v.inCats(t, ['hairColor', 'ears', 'horns', 'species', 'wings', 'skinTone']))
        // Signature garment: outerwear before the top, skipping generic words.
        const generic = ['shirt', 'jacket', 'long sleeves', 'short sleeves', 'dress', 'coat', 'sleeveless', 'white shirt', 'collared shirt']
        const garment = plainTags([o.outfit.outer, o.outfit.top].join('\n')).find(t => v.inCats(t, ['top', 'outer']) && !generic.includes(t))
        if (garment) distinct.push(garment)
        for (const t of distinct) if (!mine.has(t) && !out.includes(t)) out.push(t)
    }
    return out
}

function hasAnimalEars(c: CastMember): boolean {
    const v = vocab()
    return plainTags([c.look.headExtras, c.look.identity].join('\n')).some(t => t === 'animal ears' || (v.inCats(t, ['ears']) && / ears$/.test(t) && t !== 'pointy ears'))
}

/** Interactions → per-box prefixed acts, plus acts that belong in the base (positions, off-frame partners). */
function splitInteractions(setup: Setup): { boxActs: Record<string, string[]>; baseActs: string[] } {
    const boxActs: Record<string, string[]> = {}
    const baseActs: string[] = []
    const positions = EXCLUSIVE_GROUPS.find(g => g.name === 'sex position')!.tags
    const ids = new Set(setup.cast.map(c => c.id))
    for (const it of setup.interactions) {
        const act = normTag(it.act || '')
        if (!act || !ids.has(it.actor)) continue
        if (positions.includes(act) || !it.target || !ids.has(it.target)) {
            baseActs.push(act)
            continue
        }
        const push = (id: string, t: string) => (boxActs[id] = boxActs[id] || []).push(t)
        if (it.mutual) {
            push(it.actor, `mutual#${act}`)
            push(it.target, `mutual#${act}`)
        } else {
            push(it.actor, `source#${act}`)
            push(it.target, `target#${act}`)
        }
    }
    return { boxActs, baseActs }
}

function assemble(setup: Setup, lib: Library): Blocks {
    const ctx = newCtx(setup, lib)
    const cast = setup.cast
    const multi = cast.length > 1
    const style = styleFor(setup, lib)
    const { boxActs, baseActs } = splitInteractions(setup)

    // A shared gaze stays in the base for multi-character images (SKILL §6).
    const sharedGaze = multi && cast.every(c => normTag(c.state.gaze) === 'looking at another')

    // ---- base prompt (SKILL §10)
    const framingTags = setup.framing === 'wide shot' || setup.framing === 'very wide shot' ? ['full body', setup.framing] : [setup.framing]
    const datasets = plainTags(joinSegments([setup.objects, setup.baseExtra])).filter(t => t === 'fur dataset' || t === 'background dataset')
    const strip = (s: string) => s.replace(/\b(fur|background) dataset\b,?\s*/g, '')
    const subject = joinSegments([...datasets, countTag(cast.map(c => c.gender)), cleanTags(strip(setup.objects), ctx, 'Base Prompt')])
    const sceneT = cleanTags(joinSegments([setup.scene, setup.background]), ctx, 'Base Prompt')
    const wideNeg = setup.framing === 'full body' || framingTags.length > 1 ? '-1::close-up::' : ''
    const cameraT = cleanTags(joinSegments([...framingTags, wideNeg, setup.vAngle, setup.hAngle, setup.camera, sharedGaze ? 'looking at another' : '']), ctx, 'Base Prompt')
    const stateT = !multi && cast[0] ? cleanTags(joinSegments([stateTags(cast[0]), ...(boxActs[cast[0].id] || [])]), ctx, 'Base Prompt') : ''
    const actsT = cleanTags(baseActs.join(', '), ctx, 'Base Prompt')
    const extra = cleanTags(strip(setup.baseExtra), ctx, 'Base Prompt')
    const medium = cleanTags(setup.medium, ctx, 'Base Prompt')
    const prose = setup.prose.trim().replace(/\s*\n+\s*/g, ' ')

    let styleT = ''
    if (style) {
        const addon = style.addons.find(a => a.name === setup.addon)
        styleT = joinSegments([style.ownTail ? withRating(style.base, setup.rating) : style.base, addon?.text])
    }
    const tail = style?.ownTail ? '' : joinSegments([setup.year, `rating:${setup.rating}`, setup.complexity, setup.quality ? 'very aesthetic, best quality' : ''])

    const contentBase = stripAgeTags(joinSegments([subject, sceneT, cameraT, stateT, actsT]), ctx, 'Base Prompt')
    const extraSafe = stripAgeTags(extra, ctx, 'Base Prompt')
    // Tags, then the prose after a full stop, then style and tail (the SKILL §24 shape).
    const after = joinSegments([extraSafe, medium, styleT, tail])
    const base = prose ? `${tagsAndProse(contentBase, prose)}${after ? ' ' + after : ''}` : joinSegments([contentBase, after])
    const baseTagText = joinSegments([contentBase, extraSafe, medium])

    checkExclusive(baseTagText, ctx, 'Base Prompt')
    checkUnknown(baseTagText, ctx, 'Base Prompt')
    checkWeights(baseTagText, ctx, 'Base Prompt')
    checkBaseAppearance(joinSegments([contentBase, extraSafe]), ctx)
    checkRatingTags(baseTagText, ctx, 'Base Prompt')
    checkProse(prose, ctx, 'Base prose')
    if (style) {
        checkWeights(styleT, ctx, `Style "${style.name}"`, 99)
        if (/\b(highres|absurdres)\b/.test(styleT)) issue(ctx, 'warn', `Style "${style.name}"`, 'The style block holds highres/absurdres (white glow in V5).')
    }

    // ---- character boxes (SKILL §11)
    const positions = autoPositions(cast)
    if (multi && cast.some(c => !c.position)) note(ctx, 'Some positions not set; spread evenly left to right.')
    const chars: CharBlock[] = cast.map((c, i) => {
        const where = `Character ${i + 1}`
        const { look, outfit, dropped } = boxLines(c, setup, ctx, where)
        if (dropped.length) note(ctx, `${where}: dropped ${uniq(dropped).join(', ')} for ${setup.hAngle === 'from behind' ? 'the from-behind view' : setup.framing}.`)
        const explicit = setup.rating === 'explicit' ? cleanLines(c.explicit, ctx, where) : []
        let state = ''
        if (multi) {
            const segs = splitSegments(joinSegments([stateTags(c), ...(boxActs[c.id] || [])])).filter(s => !(sharedGaze && normTag(s) === 'looking at another'))
            state = cleanTags(segs.join(', '), ctx, where)
        }
        const genderRe = new RegExp(`^(${c.gender})\\s*,\\s*`, 'i')
        const identity = (look.shift() || '').replace(genderRe, '')
        const rawLines = [identity ? `${c.gender}, ${identity}` : `${c.gender},`, ...look, ...explicit, state, ...outfit].filter(Boolean)
        const prompt = lines(stripAgeTags(rawLines.map(l => l.replace(/,\s*$/, '')).join('\n'), ctx, where))
            .map(punctuateLine)
            .join('\n')

        checkExclusive(prompt, ctx, where)
        checkUnknown(prompt, ctx, where)
        checkWeights(prompt, ctx, where)
        checkBoxScope(prompt, ctx, where)
        checkRatingTags(prompt, ctx, where)
        checkAgeProse(proseParts(prompt), ctx, where)
        if (!Object.values(c.look).some(v => v && v.trim())) issue(ctx, 'warn', where, 'No look yet: pick a saved character or build one.')

        // ---- character UC (SKILL §16)
        const ucParts: string[] = [...lines(c.uc), c.outfitUc]
        if (multi) ucParts.push(bleedGuard(c, cast).join(', '))
        if (hasAnimalEars(c) && !/extra ears/.test(c.uc)) ucParts.push('extra ears')
        if (setup.rating !== 'general' && !/\bchild\b/.test(c.uc)) ucParts.push(ageGuard(c.gender))
        if (setup.stabilizer) ucParts.push(STABILIZER)
        const mine = new Set(plainTags(prompt))
        const uc = uniq(
            splitSegments(ucParts.filter(Boolean).map(p => p.replace(/[,\s]+$/, '')).join(', '))
                .map(s => cleanTag(s, ctx, `${where} UC`, false))
                .filter(s => s && !mine.has(s.toLowerCase())),
        ).join(', ')
        checkWeights(uc, ctx, `${where} UC`, 99)

        const pos = multi ? positions[i] : null
        const title = pos ? `Character ${i + 1} — Position: x≈${pos.x.toFixed(2)} y≈${pos.y.toFixed(2)} (${positionGloss(pos.x, pos.y)})` : `Character ${i + 1}`
        return { title, prompt, uc }
    })

    // ---- base UC (SKILL §16)
    const useStyleUc = setup.ucMode === 'style' && !!style
    if (setup.ucMode === 'style' && !style) note(ctx, 'UC mode is "style" but no style block is selected; used the lean UC.')
    const ucSource = useStyleUc ? style!.uc : UC_STRINGS[setup.ucMode === 'human focus' ? 'human focus' : 'lean']
    const addon = style?.addons.find(a => a.name === setup.addon)
    const drop = new Set<string>(plainTags(addon?.ucDrop || ''))
    const wanted = new Set(plainTags(joinSegments([baseTagText, styleT])))
    if (wanted.has('comic') || wanted.has('multiple views') || wanted.has('reference sheet') || wanted.has('multiple panels layout')) drop.add('multiple views')
    if (setup.text) drop.add('too many watermarks')
    const boxTags = new Set(chars.flatMap(ch => plainTags(ch.prompt)))
    const ucSegs = splitSegments(ucSource).filter(s => {
        const t = s.trim().toLowerCase()
        if (t === 'nsfw' || drop.has(t)) return false
        if (wanted.has(t) || boxTags.has(t)) {
            note(ctx, `Base UC: dropped "${t}" because the prompt asks for it.`)
            return false
        }
        return true
    })
    if (setup.rating === 'general') ucSegs.push('nsfw')
    const baseUc = joinSegments([ucSegs.join(', '), cleanTags(setup.ucExtra, ctx, 'Base UC', false)])
    checkWeights(baseUc, ctx, 'Base UC', 99)
    if (/\b(low|medium|high|ultra) complexity\b/.test(baseUc) && !/0\.[0-5]::[^:]*complexity/.test(baseUc)) issue(ctx, 'warn', 'Base UC', 'A complexity tag in UC at full strength; use ≤0.5:: or remove it.')

    // ---- whole-setup checks
    checkNames(
        [
            ['Base Prompt', base],
            ['Base UC', baseUc],
            ...chars.flatMap((ch, i) => [[`Character ${i + 1}`, ch.prompt], [`Character ${i + 1} UC`, ch.uc]] as [string, string][]),
        ],
        ctx,
    )
    if (cast.length > 4) issue(ctx, 'info', 'Cast', 'More than 4 characters: consistency drops; give each a contrasting pose and gaze.')
    if ((setup.framing === 'full body' || setup.framing === 'wide shot') && setup.canvas === 'landscape' && cast.length === 1) issue(ctx, 'info', 'Canvas', 'Full body on a landscape canvas: a portrait canvas holds a standing figure better.')
    const tokens = estimateTokens(base)
    if (tokens > 400) issue(ctx, 'warn', 'Base Prompt', `About ${tokens} tokens; past the ceiling the tail is ignored. Shorten the prose first.`)
    if (style?.guidance && style.guidance !== setup.settings.guidance) note(ctx, `Style "${style.name}" is tuned at guidance ${style.guidance}.`)

    return { settings: settingsBlock(setup.settings, setup.canvas), base, baseUc, chars, notes: ctx.notes, issues: ctx.issues, tokens }
}

/** All blocks as one text, in the skill's output order (SKILL §4). */
function blocksText(b: Blocks, title = ''): string {
    const out: string[] = []
    if (title) out.push(`=== ${title} ===`, '')
    out.push('Model & Settings', b.settings, '', 'Base Prompt', b.base, '', 'Base UC', b.baseUc)
    b.chars.forEach((c, i) => out.push('', c.title, c.prompt, '', `Character ${i + 1} UC`, c.uc))
    if (b.notes.length) out.push('', 'Notes', ...b.notes.map(n => `- ${n}`))
    return out.join('\n')
}
