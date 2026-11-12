// ============================================================================
// Jobs: the only things the model does. Each job is one small call with one
// card, at most two examples, the input and (where tags are picked) a menu of
// real tags. The parser checks the answer; a failed check gets one retry with
// the exact problem named. Pure: no API calls.
// ============================================================================

interface JobArg {
    castId?: string
    sheetId?: string
    group?: 'head' | 'body'
    description?: string
}

interface JobInput {
    system: string
    examples: { input: string; output: string }[]
    input: string
    allowed: Set<string>
}

interface JobResult {
    /** Shown in the panel before/after applying. */
    preview: string
    /** Non-fatal findings (off-menu tags dropped, groups trimmed). */
    problems: string[]
    /** Set when the answer is unusable; the engine retries once with this text. */
    retry?: string
    applySetup?: (s: Setup) => Setup
    applySheet?: (sh: Sheet) => Sheet
}

interface JobSpec {
    id: JobId
    label: string
    temperature: number
    maxTokens: number
    /** Where the job runs from in the UI; the engine doesn't care. */
    scope: 'setup' | 'cast' | 'sheet'
    card: string
    build(setup: Setup, lib: Library, arg: JobArg, hide: string[]): JobInput
    parse(text: string, setup: Setup, lib: Library, arg: JobArg, allowed: Set<string>): JobResult
}

const PREAMBLE =
    'You fill in one part of an image prompt for an anime image model (NovelAI Diffusion V5). Do only the task below. ' +
    'Answer in exactly the format shown: no greeting, no explanation, no notes, no markdown.'

// ------------------------------------------------------------ parse helpers

/** `KEY: value` lines (case-insensitive, markdown and bullets ignored). Repeated keys are joined with "\n". */
function fieldsOf(text: string, keys: string[]): Record<string, string> {
    const out: Record<string, string> = {}
    let last = ''
    for (const raw of cleanModelText(text).split('\n')) {
        const line = raw.replace(/\*\*/g, '').replace(/^[\s>*\-•]+/, '').trim()
        if (!line) continue
        const m = line.match(/^([A-Za-z][A-Za-z /]{0,24}?)\s*[:：]\s*(.*)$/)
        const key = m ? m[1].trim().toUpperCase() : ''
        if (m && keys.includes(key)) {
            out[key] = out[key] ? out[key] + '\n' + m[2].trim() : m[2].trim()
            last = key
        } else if (last && !m) {
            out[last] += ' ' + line // wrapped continuation
        }
    }
    return out
}

function isNone(v: string | undefined): boolean {
    return !v || /^(-|none|n\/a|nothing|no)\.?$/i.test(v.trim())
}

/** Tags from a model answer, canonicalised. */
function tagList(v: string | undefined): string[] {
    if (isNone(v)) return []
    return uniq(
        String(v)
            .split(/[,;\n]/)
            .map(t => t.replace(/["'`]/g, '').replace(/\.$/, '').trim())
            .filter(t => t && !isNone(t))
            .map(t => {
                let x = normTag(t)
                if (RENAMED[x]) x = RENAMED[x]
                const V = vocab()
                if (!V.has(x) && V.aliases.has(x)) x = V.canon(x)
                return x
            }),
    )
}

/** Keep menu tags (and real tags off the menu); report the rest. */
function sortPicks(tags: string[], allowed: Set<string>): { keep: string[]; offMenu: string[]; rejected: string[] } {
    const V = vocab()
    const keep: string[] = []
    const offMenu: string[] = []
    const rejected: string[] = []
    for (const t of tags) {
        if (allowed.has(t)) keep.push(t)
        else if (V.has(t) || OFF_FILE_ALLOWED.has(t)) {
            keep.push(t)
            offMenu.push(t)
        } else rejected.push(t)
    }
    return { keep, offMenu, rejected }
}

/** One tag per exclusive group: keeps the first, reports the rest. */
function onePerGroup(tags: string[]): { keep: string[]; dropped: string[] } {
    const keep: string[] = []
    const dropped: string[] = []
    const used = new Set<string>()
    for (const t of tags) {
        const g = EXCLUSIVE_GROUPS.find(x => x.tags.includes(t))
        if (g && used.has(g.name)) {
            dropped.push(t)
            continue
        }
        if (g) used.add(g.name)
        keep.push(t)
    }
    return { keep, dropped }
}

function sideOf(c: CastMember, i: number, n: number): string {
    const x = c.position?.x ?? (n === 1 ? 0.5 : 0.2 + (0.6 * i) / Math.max(1, n - 1))
    return x < 0.4 ? 'on the left' : x > 0.6 ? 'on the right' : 'in the center'
}

function castLines(setup: Setup, withState = false): string {
    const n = setup.cast.length
    return setup.cast
        .map((c, i) => {
            const parts = [`${i + 1}. ${c.gender}: ${c.label || c.gender}`]
            if (n > 1) parts.push(sideOf(c, i, n))
            if (c.mood) parts.push(`mood: ${c.mood}`)
            if (withState) {
                const st = stateTags(c)
                if (st) parts.push(`pose: ${st}`)
            }
            return parts.join(' — ')
        })
        .join('\n')
}

function actsInWords(setup: Setup): string {
    const byId = new Map(setup.cast.map(c => [c.id, c.label || c.gender]))
    return setup.interactions
        .filter(it => it.act && byId.has(it.actor))
        .map(it => `${byId.get(it.actor)} → ${it.act}${it.target && byId.has(it.target) ? ` → ${byId.get(it.target)}` : ''}${it.mutual ? ' (both)' : ''}`)
        .join('; ')
}

function briefLines(setup: Setup): string {
    const b = setup.brief
    return [
        `RATING: ${setup.rating}`,
        b.where && `WHERE: ${b.where}`,
        b.when && `WHEN: ${b.when}`,
        b.light && `LIGHT: ${b.light}`,
        `CAMERA: ${[setup.framing, setup.vAngle, setup.hAngle].filter(Boolean).join(', ')}`,
        b.moment && `MOMENT: ${b.moment}`,
        b.mood && `MOOD: ${b.mood}`,
    ]
        .filter(Boolean)
        .join('\n')
}

/** Match a label the model wrote back to a cast member. */
function findCast(setup: Setup, label: string, exceptId?: string): CastMember | undefined {
    const others = setup.cast.filter(c => c.id !== exceptId)
    if (others.length === 1) return others[0]
    const words = label.toLowerCase().split(/\W+/).filter(w => w.length > 2 && !['girl', 'boy', 'the', 'with'].includes(w))
    let best: CastMember | undefined
    let score = 0
    for (const c of others) {
        const s = words.filter(w => c.label.toLowerCase().includes(w)).length
        if (s > score) {
            score = s
            best = c
        }
    }
    return best
}

function pickExamples(lib: Library, job: JobId, tags: string[], builtin: { input: string; output: string }[]): { input: string; output: string }[] {
    const mine = lib.examples
        .filter(e => e.job === job)
        .map(e => ({ e, score: e.tags.filter(t => tags.includes(t)).length }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 2)
        .map(x => ({ input: x.e.input, output: x.e.output }))
    return mine.length ? mine : builtin
}

function exampleTags(setup: Setup): string[] {
    return [setup.rating, `${setup.cast.length} characters`, setup.framing]
}

// ------------------------------------------------------------------ cards

const CARD_BRIEF = `Turn the idea into a plan for ONE still image: one frozen moment.
Write exactly these lines. Fill each one, or write "-".
WHO: each character as "girl/boy/other, one visible feature to name them by", separated by " ; "
WHERE: the place, and indoors or outdoors
WHEN: time of day and weather
LIGHT: the main light, where it comes from, and a second light if any
CAMERA: one of close-up, portrait, upper body, cowboy shot, full body, wide shot; then an angle if any (from above, from below, from side, from behind)
MOMENT: one sentence: who does what to whom, right now
MOOD: one or two words per character, in WHO order, separated by " ; "
RATING: general, sensitive, questionable or explicit
Rules:
- Only what a viewer could see. No backstory, thoughts, sounds or smells.
- Name characters by how they look or what they wear, never by a name.
- Keep the characters the idea gives. Add no one.
- Keep the given rating unless the idea clearly needs another.`

const EX_BRIEF = [
    {
        input: `IDEA: my fox mechanic messing up her friend's hair in the shop at sunset, friend is sitting on the bike pretending to be annoyed
RATING: general`,
        output: `WHO: girl, tall fox girl in tank top ; girl, girl in yellow jacket
WHERE: garage, indoors
WHEN: evening, sunset
LIGHT: low sunset light through the open door behind them; cool work light on their faces
CAMERA: cowboy shot, from side
MOMENT: fox girl ruffles the hair of the girl in yellow jacket, who sits sideways on the motorcycle seat
MOOD: playful ; annoyed
RATING: general`,
    },
]

const CARD_SCENE = `Choose tags for the place, the time and the light, from the MENU.
Copy tags exactly as the menu writes them. Do not invent tags.
Pick 4 to 10 tags: indoors or outdoors, the place if the menu has it, time of day, weather if any, and 1 to 3 light tags.
Then pick exactly ONE background tag.
Answer in two lines:
TAGS: tag, tag, tag
BACKGROUND: one tag`

const EX_SCENE = [
    {
        input: `WHERE: garage, indoors
WHEN: evening, sunset
LIGHT: low sunset light through the open door; cool work light on faces
CAMERA: cowboy shot, from side`,
        output: `TAGS: indoors, evening, sunset, backlighting, light rays, sunlight
BACKGROUND: detailed background`,
    },
]

const CARD_POSE = `Choose how ONE character holds their body, hands, face and eyes in the MOMENT, from the MENU.
Copy tags exactly as the menu writes them. Do not invent tags.
Answer in these lines; write "-" for none:
POSTURE: exactly one posture tag
GESTURE: up to 2 tags for hands, arms or legs
EXPRESSION: up to 3 tags that show the mood on the face
GAZE: exactly one gaze tag
ACT: something this character does to another character, as "tag > their visible feature"; one per line; "-" if none
Show feelings only through face and body tags. Pick nothing for the other characters.`

const EX_POSE = [
    {
        input: `CHARACTER: girl: tall fox girl in tank top — on the left — mood: playful
OTHERS: girl in yellow jacket
MOMENT: fox girl ruffles the hair of the girl in yellow jacket, who sits sideways on the motorcycle seat`,
        output: `POSTURE: standing
GESTURE: hand up
EXPRESSION: grin, one eye closed
GAZE: looking at another
ACT: headpat > girl in yellow jacket`,
    },
]

const CARD_PROSE = `Write 2 to 5 short sentences telling an image model what the viewer sees in this one frozen moment.
Write about:
- where each figure is in the frame: left, right, center, upper, lower
- who does what to whom, and with which hand
- what each figure holds or touches, and whose it is
- clothing state if it matters: open, torn, slipping, wet
- where the light comes from and what it falls on
Name each figure by its label every time, exactly as written in FIGURES.
Plain sentences, each ending with a period. Simple words.
Never write: names; she, he, her, his, they, them, it; "camera" (say "viewer"); feelings or thoughts; backstory; sounds or smells; "then" or "after"; quotation marks; style or quality words like masterpiece, detailed, beautiful; hair, eye, body or clothing descriptions beyond the label.
The tags already cover the place, the poses and the faces: do not list them again.
Answer with the sentences only.`

const EX_PROSE = [
    {
        input: `FRAMING: cowboy shot, from side; the frame ends at mid-thigh
PLACE: garage, indoors; evening, sunset
LIGHT: low sunset light through the open door; cool work light on faces
OBJECTS: motorcycle
FIGURES:
1. girl: fox girl in tank top — on the left — standing, grin, looking at another
2. girl: girl in yellow jacket — on the right — sitting sideways, pout, looking at another
ACTS: fox girl in tank top → headpat → girl in yellow jacket
MOMENT: fox girl ruffles the hair of the girl in yellow jacket, who sits sideways on the motorcycle seat`,
        output: `Fox girl in tank top stands on left beside motorcycle, right hand ruffling hair of girl in yellow jacket. Girl in yellow jacket sits sideways on motorcycle seat on right, white helmet resting in lap. Open garage door behind motorcycle shows orange sunset sky. Hanging work light casts cool white light on both faces.`,
    },
]

const SLOT_KEYS: Record<string, string> = {
    IDENTITY: 'identity',
    HAIR: 'hair',
    'HAIR HIDDEN': 'hairHidden',
    HEAD: 'headExtras',
    'FACE SHAPE': 'faceShape',
    EYES: 'eyes',
    'FACE MARKS': 'faceMarks',
    SKIN: 'skin',
    UPPER: 'upper',
    TORSO: 'torso',
    LOWER: 'lower',
    TAIL: 'tail',
}

const OUTFIT_KEYS: Record<string, string> = {
    'HEAD AND NECK': 'headNeck',
    TOP: 'top',
    OUTER: 'outer',
    HANDS: 'hands',
    BOTTOM: 'bottom',
    LEGWEAR: 'legwear',
    FOOTWEAR: 'footwear',
    PROPS: 'props',
    STATE: 'state',
}

const CARD_LOOK_HEAD = `Describe ONE character's head and face as image tags, from the MENU, for the description given.
Copy tags exactly as the menu writes them. Do not invent tags.
Answer in these lines; write "-" when the character has nothing there:
IDENTITY: species or type if not plain human, a skin tone tag if it matters, ONE body frame tag (petite, tall female, curvy, muscular female...)
HAIR: length, style, color, bangs, extras; then one short sentence only if tags can't show it (how a color fades, how a cut is shaped)
HAIR HIDDEN: hair seen from one side only (undercut, back braid), or "-"
HEAD: animal ears, horns, halo, pointy ears
EYES: eye color, pupils, eye shape, makeup
FACE MARKS: freckles, moles, scars, piercings; a short sentence for where they are
One color per feature. Tags first, lowercase. A sentence starts with a capital and ends with a period.`

const EX_LOOK_HEAD = [
    {
        input: `DESCRIPTION: fox mechanic, tall and strong, long red ponytail that fades to white at the ends, sharp green eyes, freckles
GENDER: girl`,
        output: `IDENTITY: fox girl, tall female, muscular female
HAIR: long hair, ponytail, red hair, colored tips. Red hair fades to white at tips.
HAIR HIDDEN: -
HEAD: fox ears, animal ear fluff
EYES: green eyes, tsurime
FACE MARKS: freckles`,
    },
]

const CARD_LOOK_BODY = `Describe ONE character's body as image tags, from the MENU, for the description given.
Copy tags exactly as the menu writes them. Do not invent tags.
Answer in these lines; write "-" when there is nothing distinctive:
SKIN: fur or scale color, tattoos, scars, markings; a short sentence for where each one is
UPPER: shoulders, chest, arms, hands, nails
TORSO: waist, abs, stomach, back
LOWER: hips, thighs, legs, bare feet features
TAIL: tail type and color, low wings
Never pad: skip anything ordinary. Tags first, lowercase. A sentence starts with a capital and ends with a period.`

const EX_LOOK_BODY = [
    {
        input: `DESCRIPTION: fox mechanic, tall and strong, broad shoulders, thick thighs, big fluffy fox tail, grease-stained hands
GENDER: girl`,
        output: `SKIN: -
UPPER: broad shoulders, medium breasts, biceps. Hands stained with grease.
TORSO: toned, abs
LOWER: thick thighs
TAIL: fox tail, fluffy tail`,
    },
]

const CARD_OUTFIT = `Describe ONE outfit as image tags, from the MENU, for the description given.
Copy tags exactly as the menu writes them. Give every garment its color ("white tank top", "black pants").
Answer in these lines; write "-" for none:
HEAD AND NECK: hats, hair ornaments, earrings, chokers, collars
TOP: shirt, dress or top
OUTER: jacket, coat, cape
HANDS: gloves, bracelets
BOTTOM: skirt, pants, shorts
LEGWEAR: socks, thighhighs, pantyhose
FOOTWEAR: shoes or boots, or barefoot
PROPS: things held or carried
STATE: one short sentence if the outfit is wet, torn, open or stained, else "-"`

const EX_OUTFIT = [
    {
        input: `DESCRIPTION: grease-stained white tank top, black work pants, fingerless gloves, goggles pushed up on her head, heavy boots
GENDER: girl`,
        output: `HEAD AND NECK: goggles on head
TOP: white tank top
OUTER: -
HANDS: fingerless gloves
BOTTOM: black pants
LEGWEAR: -
FOOTWEAR: black boots
PROPS: -
STATE: Tank top smeared with grease.`,
    },
]

// ------------------------------------------------------------------ jobs

function menuFor(groups: { cat: string; label: string }[], perCat: number, hide: string[], extra: { label: string; tags: string[] }[] = []) {
    const m = vocab().menu(groups, perCat, hide)
    const extraLines = extra
        .filter(e => e.tags.length)
        .map(e => {
            e.tags.forEach(t => m.allowed.add(t))
            return `${e.label}: ${e.tags.join(', ')}`
        })
    return { text: [m.text, ...extraLines].filter(Boolean).join('\n'), allowed: m.allowed }
}

function vaultTags(names: string[], hide: string[]): string[] {
    const V = vocab()
    return uniq(names.flatMap(n => V.vaultCats.get(n) || [])).filter(t => !V.hidden(t, hide))
}

const JOBS: Record<JobId, JobSpec> = {
    brief: {
        id: 'brief',
        label: 'Plan the shot',
        temperature: 0.7,
        maxTokens: 320,
        scope: 'setup',
        card: CARD_BRIEF,
        build(setup, lib) {
            const known = setup.cast.length ? `\nCHARACTERS ALREADY CHOSEN:\n${castLines(setup)}` : ''
            return {
                system: '',
                examples: pickExamples(lib, 'brief', exampleTags(setup), EX_BRIEF),
                input: `IDEA: ${setup.idea.trim() || '(none: invent a simple scene)'}\nRATING: ${setup.rating}${known}`,
                allowed: new Set(),
            }
        },
        parse(text, setup) {
            const f = fieldsOf(text, ['WHO', 'WHERE', 'WHEN', 'LIGHT', 'CAMERA', 'MOMENT', 'MOOD', 'RATING'])
            const missing = ['WHO', 'WHERE', 'CAMERA', 'MOMENT'].filter(k => !(k in f))
            if (missing.length) return { preview: text, problems: [], retry: `Your answer is missing the line(s) ${missing.join(', ')}. Write all eight lines.` }
            const who = isNone(f.WHO)
                ? []
                : f.WHO.split(/\s*;\s*|\n/)
                      .map(s => s.trim())
                      .filter(Boolean)
                      .map(s => {
                          const m = s.match(/^(girl|boy|other|woman|man|female|male)\b[\s,:-]*(.*)$/i)
                          const g = (m ? m[1].toLowerCase() : 'girl') as string
                          const gender: Gender = ['boy', 'man', 'male'].includes(g) ? 'boy' : g === 'other' ? 'other' : 'girl'
                          return { gender, label: (m ? m[2] : s).replace(/[.;]$/, '').trim() || gender }
                      })
            const moods = isNone(f.MOOD) ? [] : f.MOOD.split(/\s*;\s*/).map(s => s.trim())
            const cam = (f.CAMERA || '').toLowerCase()
            const framing = FRAMINGS.slice().sort((a, b) => b.length - a.length).find(fr => cam.includes(fr))
            const vAngle: VAngle = cam.includes('from above') ? 'from above' : cam.includes('from below') ? 'from below' : ''
            const hAngle: HAngle = cam.includes('from behind') ? 'from behind' : cam.includes('from side') ? 'from side' : cam.includes('straight-on') ? 'straight-on' : ''
            const rating = RATINGS.find(r => (f.RATING || '').toLowerCase().includes(r))
            const problems: string[] = []
            if (setup.cast.length && who.length !== setup.cast.length) problems.push(`The plan names ${who.length} characters; the setup has ${setup.cast.length}. Labels were matched in order.`)
            const preview = Object.entries(f)
                .map(([k, v]) => `${k}: ${v}`)
                .join('\n')
            return {
                preview,
                problems,
                applySetup: s => {
                    const n = normalizeSetup(JSON.parse(JSON.stringify(s)))
                    n.brief = {
                        where: isNone(f.WHERE) ? '' : f.WHERE,
                        when: isNone(f.WHEN) ? '' : f.WHEN,
                        light: isNone(f.LIGHT) ? '' : f.LIGHT,
                        camera: f.CAMERA || '',
                        moment: isNone(f.MOMENT) ? '' : f.MOMENT,
                        mood: isNone(f.MOOD) ? '' : f.MOOD,
                    }
                    if (framing) n.framing = framing
                    n.vAngle = vAngle
                    n.hAngle = hAngle
                    if (rating) n.rating = rating
                    if (!n.cast.length) n.cast = who.map(w => ({ ...castFromSheet(null, w.gender), label: w.label }))
                    n.cast.forEach((c, i) => {
                        if (who[i] && (!c.label || c.label === c.gender)) c.label = who[i].label
                        if (moods[i] && !isNone(moods[i])) c.mood = moods[i]
                    })
                    if (n.title === 'Untitled setup' && n.brief.moment) n.title = n.brief.moment.split(/[,.]/)[0].slice(0, 48)
                    return n
                },
            }
        },
    },

    scene: {
        id: 'scene',
        label: 'Pick scene tags',
        temperature: 0.4,
        maxTokens: 140,
        scope: 'setup',
        card: CARD_SCENE,
        build(setup, lib, _arg, hide) {
            const menu = menuFor(
                [
                    { cat: 'setting', label: 'place and background' },
                    { cat: 'lighting', label: 'time and light' },
                ],
                90,
                hide,
                [
                    { label: 'more light', tags: vaultTags(['core-and-environment/Atmospheric Lighting', 'core-and-environment/Effects and Artificial Light'], hide) },
                    { label: 'more places', tags: vaultTags(['core-and-environment/Urban and Indoor', 'core-and-environment/Nature and Wilderness', 'core-and-environment/Aquatic'], hide) },
                    { label: 'background (pick one)', tags: ['detailed background', 'blurry background', 'simple background', 'white background', 'dark background', 'gradient background', 'transparent background'] },
                ],
            )
            return {
                system: '',
                examples: pickExamples(lib, 'scene', exampleTags(setup), EX_SCENE),
                input: `${briefLines(setup)}\n\nMENU:\n${menu.text}`,
                allowed: menu.allowed,
            }
        },
        parse(text, setup, _lib, _arg, allowed) {
            const f = fieldsOf(text, ['TAGS', 'BACKGROUND'])
            if (!f.TAGS) return { preview: text, problems: [], retry: 'Start the first line with "TAGS:" and list tags from the MENU.' }
            const picks = sortPicks(tagList(f.TAGS), allowed)
            const bgPick = sortPicks(tagList(f.BACKGROUND), allowed).keep
            const bgGroup = EXCLUSIVE_GROUPS.find(g => g.name === 'background')!.tags
            const bgFromTags = picks.keep.filter(t => bgGroup.includes(t))
            const background = bgPick.find(t => bgGroup.includes(t)) || bgFromTags[0] || ''
            const tags = onePerGroup(picks.keep.filter(t => !bgGroup.includes(t)))
            if (tags.keep.length < 2) return { preview: text, problems: [], retry: `Only ${tags.keep.length} of your tags are in the MENU. Copy 4 to 10 tags exactly as the MENU writes them.` }
            const problems: string[] = []
            if (picks.rejected.length) problems.push(`Not tags, left for the prose: ${picks.rejected.join(', ')}`)
            if (picks.offMenu.length) problems.push(`Real tags from off the menu, kept: ${picks.offMenu.join(', ')}`)
            if (tags.dropped.length) problems.push(`One per group, dropped: ${tags.dropped.join(', ')}`)
            return {
                preview: `TAGS: ${tags.keep.join(', ')}\nBACKGROUND: ${background || '-'}`,
                problems,
                applySetup: s => {
                    const n = normalizeSetup(JSON.parse(JSON.stringify(s)))
                    n.scene = tags.keep.join(', ')
                    if (background) n.background = background
                    if (picks.rejected.length && !n.brief.where.includes(picks.rejected[0])) n.brief.where = joinSegments([n.brief.where, ...picks.rejected])
                    return n
                },
            }
        },
    },

    pose: {
        id: 'pose',
        label: 'Pick pose and face',
        temperature: 0.5,
        maxTokens: 160,
        scope: 'cast',
        card: CARD_POSE,
        build(setup, lib, arg, hide) {
            const i = setup.cast.findIndex(c => c.id === arg.castId)
            const c = setup.cast[i]
            const multi = setup.cast.length > 1
            const explicit = setup.rating === 'explicit' || setup.rating === 'questionable'
            const groups = [
                { cat: 'pose', label: 'posture and gesture' },
                { cat: 'expression', label: 'expression' },
                { cat: 'eyeDetail', label: 'eyes' },
            ]
            if (multi) groups.push({ cat: 'actions', label: 'acts with another' })
            if (explicit) groups.push({ cat: 'actionsNsfw', label: 'sex acts' })
            const gaze = EXCLUSIVE_GROUPS[0].tags.concat(['looking back'])
            const cues = c?.mood ? moodCues(c.mood) : ''
            const menu = menuFor(groups, 90, hide, [
                { label: 'gaze (pick one)', tags: gaze },
                { label: 'more poses', tags: explicit ? vaultTags(['poses-and-explicit/Poses, Orientations & Psychological Dynamics'], hide) : [] },
            ])
            const others = setup.cast.filter(x => x.id !== c?.id).map(x => x.label || x.gender)
            const input = [
                `CHARACTER: ${c ? `${c.gender}: ${c.label || c.gender}${multi ? ` — ${sideOf(c, i, setup.cast.length)}` : ''}${c.mood ? ` — mood: ${c.mood}` : ''}` : '?'}`,
                `OTHERS: ${others.length ? others.join('; ') : 'none'}`,
                `MOMENT: ${setup.brief.moment || setup.idea || '-'}`,
                cues ? `THIS MOOD USUALLY SHOWS AS: ${cues}` : '',
                `RATING: ${setup.rating}`,
                '',
                `MENU:\n${menu.text}`,
            ]
                .filter(x => x !== '')
                .join('\n')
            return { system: '', examples: pickExamples(lib, 'pose', exampleTags(setup), EX_POSE), input, allowed: menu.allowed }
        },
        parse(text, setup, _lib, arg, allowed) {
            const c = setup.cast.find(x => x.id === arg.castId)
            if (!c) return { preview: text, problems: [], retry: undefined }
            const f = fieldsOf(text, ['POSTURE', 'GESTURE', 'EXPRESSION', 'GAZE', 'ACT'])
            if (!('POSTURE' in f) && !('EXPRESSION' in f)) return { preview: text, problems: [], retry: 'Answer with the lines POSTURE, GESTURE, EXPRESSION, GAZE and ACT.' }
            const problems: string[] = []
            const take = (key: string, max: number) => {
                const p = sortPicks(tagList(f[key]), allowed)
                if (p.rejected.length) problems.push(`${key.toLowerCase()}: not tags, dropped: ${p.rejected.join(', ')}`)
                const g = onePerGroup(p.keep)
                const extra = [...g.dropped, ...g.keep.slice(max)]
                if (extra.length) problems.push(`${key.toLowerCase()}: kept ${max}, dropped: ${extra.join(', ')}`)
                return g.keep.slice(0, max)
            }
            const posture = take('POSTURE', 1)
            const gesture = take('GESTURE', 2)
            const expression = take('EXPRESSION', 3)
            const gaze = take('GAZE', 1)
            const acts: { act: string; target: string }[] = []
            for (const line of (f.ACT || '').split('\n')) {
                if (isNone(line)) continue
                const [actRaw, who] = line.split(/\s*>\s*/)
                const act = tagList(actRaw)[0]
                if (!act) continue
                if (!allowed.has(act) && !vocab().has(act)) {
                    problems.push(`act "${act}" isn't a tag, dropped`)
                    continue
                }
                const target = who ? findCast(setup, who, c.id) : setup.cast.length === 2 ? setup.cast.find(x => x.id !== c.id) : undefined
                acts.push({ act, target: target?.id || '' })
            }
            if (!posture.length && !expression.length) return { preview: text, problems, retry: 'None of your tags are in the MENU. Copy tags exactly as the MENU writes them.' }
            const all = onePerGroup([...posture, ...gesture, ...expression, ...gaze])
            if (all.dropped.length) problems.push(`one per group, dropped: ${all.dropped.join(', ')}`)
            return {
                preview: `posture: ${posture.join(', ') || '-'}\ngesture: ${gesture.join(', ') || '-'}\nexpression: ${expression.join(', ') || '-'}\ngaze: ${gaze.join(', ') || '-'}${acts.length ? `\nacts: ${acts.map(a => a.act).join(', ')}` : ''}`,
                problems,
                applySetup: s => {
                    const n = normalizeSetup(JSON.parse(JSON.stringify(s)))
                    const m = n.cast.find(x => x.id === c.id)
                    if (!m) return n
                    m.state = { posture: posture.join(', '), gesture: gesture.join(', '), expression: expression.join(', '), gaze: gaze.join(', '), extra: m.state.extra }
                    n.interactions = n.interactions.filter(it => it.actor !== c.id)
                    for (const a of acts) n.interactions.push({ id: shortId(), actor: c.id, act: a.act, target: a.target, mutual: false })
                    return n
                },
            }
        },
    },

    prose: {
        id: 'prose',
        label: 'Write prose',
        temperature: 0.75,
        maxTokens: 280,
        scope: 'setup',
        card: CARD_PROSE,
        build(setup, lib) {
            const fr = [setup.framing, setup.vAngle, setup.hAngle].filter(Boolean).join(', ')
            const input = [
                `FRAMING: ${fr}; ${CROP_EDGE[setup.framing]}`,
                `PLACE: ${joinSegments([setup.brief.where, setup.brief.when]) || setup.scene || '-'}`,
                `LIGHT: ${setup.brief.light || '-'}`,
                setup.objects ? `OBJECTS: ${setup.objects}` : '',
                `FIGURES:\n${castLines(setup, true) || '- none'}`,
                actsInWords(setup) ? `ACTS: ${actsInWords(setup)}` : '',
                `MOMENT: ${setup.brief.moment || setup.idea || '-'}`,
                setup.text ? 'TEXT IN IMAGE: allowed; put the exact words in quotation marks and say where they are.' : '',
            ]
                .filter(Boolean)
                .join('\n')
            return { system: '', examples: pickExamples(lib, 'prose', exampleTags(setup), EX_PROSE), input, allowed: new Set() }
        },
        parse(text, setup, lib) {
            let t = cleanModelText(text)
                .split('\n')
                .map(l => l.replace(/^[-*•\d.)\s]+(?=[A-Z])/, '').trim())
                .filter(l => l && !/^(here|sure|okay|certainly)\b/i.test(l) && !/^[A-Z ]{3,}:/.test(l))
                .join(' ')
                .replace(/\s+/g, ' ')
                .trim()
            if (!t) return { preview: text, problems: [], retry: 'Write 2 to 5 sentences, nothing else.' }
            if (!/[.!?]$/.test(t)) t = t.replace(/[,;:\s]+$/, '') + '.'
            const probe = normalizeSetup(JSON.parse(JSON.stringify(setup)))
            probe.prose = t
            const ctx = newCtx(probe, lib)
            checkProse(t, ctx, 'prose')
            checkNames([['prose', t]], ctx)
            const hard = ctx.issues.filter(i => i.level === 'error' || /Pronouns|camera|Quotation/.test(i.msg))
            const problems = ctx.issues.filter(i => !hard.includes(i)).map(i => i.msg)
            if (hard.length) {
                const labels = setup.cast.map(c => `"${c.label}"`).join(', ')
                return {
                    preview: t,
                    problems: hard.map(i => i.msg),
                    retry: `Fix these and answer again with the sentences only: ${hard.map(i => i.msg).join(' ')}${labels ? ` Name the figures only as ${labels}.` : ''}`,
                    applySetup: s => ({ ...s, prose: t }),
                }
            }
            return { preview: t, problems, applySetup: s => ({ ...s, prose: t }) }
        },
    },

    look: {
        id: 'look',
        label: 'Build look',
        temperature: 0.5,
        maxTokens: 420,
        scope: 'sheet',
        card: CARD_LOOK_HEAD,
        build(setup, lib, arg, hide) {
            const sheet = lib.sheets.find(s => s.id === arg.sheetId)
            const head = arg.group !== 'body'
            const groups = head
                ? [
                      { cat: 'species', label: 'species' },
                      { cat: 'skinTone', label: 'skin tone' },
                      { cat: 'build', label: 'body frame' },
                      { cat: 'hairLength', label: 'hair length' },
                      { cat: 'hairStyle', label: 'hair style' },
                      { cat: 'hairColor', label: 'hair color' },
                      { cat: 'bangs', label: 'bangs' },
                      { cat: 'hairDetail', label: 'hair extras' },
                      { cat: 'ears', label: 'ears' },
                      { cat: 'horns', label: 'horns and halos' },
                      { cat: 'eyeColor', label: 'eye color' },
                      { cat: 'eyeDetail', label: 'eye shape' },
                      { cat: 'makeup', label: 'makeup' },
                      { cat: 'faceDetail', label: 'face marks' },
                  ]
                : [
                      { cat: 'skinDetail', label: 'skin' },
                      { cat: 'traits', label: 'traits' },
                      { cat: 'neck', label: 'neck and shoulders' },
                      { cat: 'chest', label: 'chest' },
                      { cat: 'arms', label: 'arms' },
                      { cat: 'hands', label: 'hands' },
                      { cat: 'nails', label: 'nails' },
                      { cat: 'waist', label: 'waist' },
                      { cat: 'hips', label: 'hips' },
                      { cat: 'legs', label: 'legs' },
                      { cat: 'feet', label: 'feet' },
                      { cat: 'tail', label: 'tails' },
                      { cat: 'wings', label: 'wings' },
                  ]
            const menu = menuFor(groups, 60, hide)
            const input = `DESCRIPTION: ${arg.description || sheet?.label || '-'}\nGENDER: ${sheet?.gender || 'girl'}\n\nMENU:\n${menu.text}`
            return { system: '', examples: pickExamples(lib, 'look', [arg.group || 'head'], head ? EX_LOOK_HEAD : EX_LOOK_BODY), input, allowed: menu.allowed }
        },
        parse(text, _setup, _lib, arg, allowed) {
            const keys = arg.group === 'body' ? ['SKIN', 'UPPER', 'TORSO', 'LOWER', 'TAIL'] : ['IDENTITY', 'HAIR', 'HAIR HIDDEN', 'HEAD', 'EYES', 'FACE MARKS']
            return parseSlots(text, keys, SLOT_KEYS, allowed, (sh, slots) => ({ ...sh, look: { ...sh.look, ...slots } }))
        },
    },

    outfit: {
        id: 'outfit',
        label: 'Build outfit',
        temperature: 0.5,
        maxTokens: 320,
        scope: 'sheet',
        card: CARD_OUTFIT,
        build(setup, lib, arg, hide) {
            const sheet = lib.sheets.find(s => s.id === arg.sheetId)
            const menu = menuFor(
                [
                    { cat: 'theme', label: 'outfit types' },
                    { cat: 'headwear', label: 'head' },
                    { cat: 'eyewear', label: 'face and ears' },
                    { cat: 'neckwear', label: 'neck' },
                    { cat: 'top', label: 'tops' },
                    { cat: 'outer', label: 'outerwear' },
                    { cat: 'gloves', label: 'hands and arms' },
                    { cat: 'bottom', label: 'bottoms' },
                    { cat: 'legwear', label: 'legwear' },
                    { cat: 'footwear', label: 'footwear' },
                    { cat: 'carry', label: 'held props' },
                ],
                60,
                hide,
            )
            const input = `DESCRIPTION: ${arg.description || '-'}\nGENDER: ${sheet?.gender || 'girl'}\n\nMENU:\n${menu.text}`
            return { system: '', examples: pickExamples(lib, 'outfit', [], EX_OUTFIT), input, allowed: menu.allowed }
        },
        parse(text, _setup, _lib, _arg, allowed) {
            return parseSlots(text, Object.keys(OUTFIT_KEYS), OUTFIT_KEYS, allowed, (sh, slots) => {
                const outfits = sh.outfits.length ? sh.outfits.slice() : [{ name: 'Default', lines: {}, uc: '' }]
                outfits[0] = { ...outfits[0], lines: { ...slots } }
                return { ...sh, outfits }
            })
        },
    },
}

/** Shared parser for slot-line jobs (look, outfit). */
function parseSlots(
    text: string,
    keys: string[],
    map: Record<string, string>,
    allowed: Set<string>,
    put: (sh: Sheet, slots: Record<string, string>) => Sheet,
): JobResult {
    const f = fieldsOf(text, keys)
    const found = keys.filter(k => k in f)
    if (found.length < Math.ceil(keys.length / 2)) return { preview: text, problems: [], retry: `Answer with these lines: ${keys.join(', ')}. Write "-" for an empty one.` }
    const V = vocab()
    const problems: string[] = []
    const slots: Record<string, string> = {}
    for (const k of found) {
        if (isNone(f[k])) continue
        const { tags, prose } = splitLine(f[k])
        const keep: string[] = []
        for (const t of tagList(tags.join(', '))) {
            const color = COLOR_WORDS.find(c => t.startsWith(c + ' '))
            const known = allowed.has(t) || V.has(t) || OFF_FILE_ALLOWED.has(t) || (!!color && V.has(t.slice(color.length + 1)))
            if (!known) problems.push(`${k.toLowerCase()}: "${t}" isn't in the lists; kept, check it`)
            keep.push(t)
        }
        const line = tagsAndProse(keep.join(', '), prose).replace(/,$/, '')
        if (line) slots[map[k]] = line
    }
    if (!Object.keys(slots).length) return { preview: text, problems, retry: 'Every line was empty. Describe the character with tags from the MENU.' }
    return {
        preview: Object.entries(slots)
            .map(([k, v]) => `${k}: ${v}`)
            .join('\n'),
        problems,
        applySheet: sh => put(sh, slots),
    }
}

/** The card the model sees: the library's override or the built-in one. */
function cardKey(job: JobSpec, arg: JobArg): string {
    return job.id === 'look' && arg.group === 'body' ? 'lookBody' : job.id
}

function builtinCard(key: string): string {
    return key === 'lookBody' ? CARD_LOOK_BODY : JOBS[key as JobId]?.card || ''
}

function cardText(job: JobSpec, lib: Library, arg: JobArg): string {
    const key = cardKey(job, arg)
    const own = lib.cards[key]
    return own && own.trim() ? own.trim() : builtinCard(key)
}

/** Card keys the library can override, with display names. */
const CARD_KEYS: { key: string; label: string }[] = [
    { key: 'brief', label: 'Plan the shot' },
    { key: 'scene', label: 'Scene tags' },
    { key: 'pose', label: 'Pose and face' },
    { key: 'prose', label: 'Prose' },
    { key: 'look', label: 'Look: head and face' },
    { key: 'lookBody', label: 'Look: body' },
    { key: 'outfit', label: 'Outfit' },
]

/** Assemble the chat messages for one job run. */
function jobMessages(job: JobSpec, setup: Setup, lib: Library, arg: JobArg, hide: string[]): { messages: Message[]; allowed: Set<string> } {
    const built = job.build(setup, lib, arg, hide)
    const card = built.system || cardText(job, lib, arg)
    const messages: Message[] = [{ role: 'system', content: `${PREAMBLE}\n\n${card}` }]
    for (const ex of built.examples) {
        messages.push({ role: 'user', content: ex.input })
        messages.push({ role: 'assistant', content: ex.output })
    }
    messages.push({ role: 'user', content: built.input })
    return { messages, allowed: built.allowed }
}

/** Messages for a retry: the bad answer, then the named problem. */
function retryMessages(base: Message[], badAnswer: string, hint: string): Message[] {
    return [...base, { role: 'assistant', content: cleanModelText(badAnswer).slice(0, 1200) }, { role: 'user', content: `${hint}\nAnswer again in the same format.` }]
}
