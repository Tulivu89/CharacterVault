// ============================================================================
// Library data: built-in style blocks and kits (from the vault's
// nai-v5-images references), and the plain-text formats lorebook entries use,
// so every item can be read and edited by hand in NovelAI's Lorebook.
// Pure: no API calls.
// ============================================================================

const BUILTIN_STYLES: StyleBlock[] = [
    {
        id: 'style-vivid-pop',
        name: 'Vivid Pop v1',
        base: 'pinup (style), western comics (style), realistic shading, 1::artist:bm94199 ::, 1::artist:calm (artist)::, 1::artist:obj shep::, -2::monochrome, sketch, lineart::, 1.5::digital illustration::, 0.25::gradient skin, body creases::, vivid colors, sharp highlights, high contrast, two-tone shading, subsurface scattering, year 2026, high complexity, best quality, very aesthetic',
        uc: 'artist:yone kinji, artist:shichimenchou, lowres, adversarial noise, jpeg artifacts, photograph, flat color, worst quality, very displeasing,',
        addons: [],
        ownTail: true,
        note: 'Saturated pinup-comic look. Stable.',
    },
    {
        id: 'style-painterly-comic',
        name: 'Painterly Comic v2',
        base: '1.2::artist:lesly oh::, 1.7::artist:aleksandra skiba::, 1::artist:emmanuel viola::, 2::painterly, cel shading, colored lineart, western comics (style), oil painting (medium)::, Fantasy illustration blending crisp graphic-novel inking with loose painterly color. Thin elegant ink lines with tapering strokes define forms, while visible brushstrokes texture color fills. Shading falls in clear confident shapes with soft painted edges where light meets shadow.',
        uc: '1::artist:urushihara satoshi, artist:shirow masamune,::, lowres, worst quality, low quality, bad anatomy, bad hands, jpeg artifacts, watermark, signature, photorealistic, 3d, 2.5d, limited palette, thick lineart, monochrome, greyscale, simple background, halftone, sketch, glossy, shiny, dark, in shadows, multiple views, nsfw',
        addons: [
            { name: 'Jewel', text: 'high contrast, backlighting, light particles, depth of field, Saturated luminous color: rich jewel tones, warm light against cool shadow, glowing highlights, strong rim light separating figure from background.' },
            { name: 'Warm', text: 'Warm gentle color: honey, cream and soft terracotta, low contrast, warm light bouncing softly off nearby surfaces, light airy shadows.' },
            { name: 'Dark fantasy', text: 'dark fantasy, high contrast, Low-key color: deep blacks and cold desaturated blues, one warm light source carving form out of shadow, heavy cast shadows.', ucDrop: 'dark, in shadows' },
            { name: 'Court muted', text: 'Muted color: slate, pewter and bone with one rich accent color, soft diffuse light, gentle shadows.' },
            { name: 'Moonlit', text: 'Cool nocturnal color: indigo and silver-blue, pale moonlight edging forms, deep soft shadows.', ucDrop: 'dark, in shadows' },
            { name: 'Golden hour', text: 'Golden-hour color: amber, rose and violet, low sunlight raking across forms, warm highlights with purple shadows.' },
        ],
        ownTail: false,
        note: 'Western painterly look that holds faces best; one theme add-on per image. Stable.',
    },
    {
        id: 'style-anime-pinup',
        name: 'Anime Pinup v1',
        base: '0.8::copyright:brown dust 2 ::, 0.6::copyright:goddess of victory: nikke ::, 1.::artist:zd 1995 ::, year 2026, 2::masterpiece::, semi-realistic, A very high-quality anime screenshot style, smooth cel-shaded animation with vibrant colors and clean, confident lineart, professional digital art.',
        uc: 'lowres, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, dithering, halftone, screentone, multiple views, logo, too many watermarks, negative space, blank page, @_@, mismatched pupils, glowing eyes, bad anatomy, company name, copyright name,',
        addons: [],
        ownTail: true,
        note: 'Gacha polish; foundation for img2img and inpainting. Stable. Remove "glowing eyes" from UC for glowing-eyed characters (the assembler does this when a box asks for it).',
    },
    {
        id: 'style-semireal',
        name: 'Semirealistic mix v0',
        base: 'pinup (style), western comics (style), 1.0::fernando suarez::, 1.2::illyne cosplay::, 0.6::nekromaxxing::, 0.8::ginsky2000 ::., best quality, very aesthetic, masterpiece, detailed, amazing quality, year 2026, colored, 1.5:: digital illustration,   ::, 0.25::gradient skin, body creases, ::, high complexity, vivid colors, sharp highlights, high contrast, two-tone shading, gradient shading, semi-realistic, 0.5::colored lineart::,',
        uc: 'artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou, lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page, censored, mosaic censoring, 2::monochrome, sketch, line art, steam, plastic skin, fake skin::, comic books, magazines, background faces, artist name, artist logo,',
        addons: [],
        ownTail: true,
        note: 'WIP, verbatim. Review notes not yet applied: "ginsky2000 ::." should end "::,"; "line art" in UC should be "lineart"; five quality tags (keep best quality, very aesthetic); A/B two-tone vs gradient shading. verify count: fernando suarez, illyne cosplay, nekromaxxing, ginsky2000.',
    },
]

const BUILTIN_KITS: Kit[] = [
    // Face kits (face-kits.md, bench-tested). Framing trims drop sentence 2 at cowboy shot and both sentences wider.
    {
        id: 'kit-face-willow', name: 'Face: Willow (tall, long, angular)', kind: 'face',
        parts: { identity: 'tall female, 0.6::mature female::', faceShape: 'tsurime, long eyelashes, eyeliner. Face long and narrow, pointed chin, almond-shaped eyes, long straight nose.', faceModel: 'High sharp cheekbones, defined jawline, thin straight eyebrows, narrow lips.', upper: 'collarbone' },
        uc: 'tareme, petite, round face, chubby cheeks, button nose, thick eyebrows', note: '',
    },
    {
        id: 'kit-face-doll', name: 'Face: Doll (petite, round, soft)', kind: 'face',
        parts: { identity: 'petite, 0.4::mature female::', faceShape: 'tareme, long eyelashes. Face round and soft, small rounded chin, large round eyes set wide apart, small button nose.', faceModel: 'Full rounded cheeks, gently arched eyebrows, small full mouth with pronounced cupid\'s bow.', eyes: 'pink lips', upper: 'small breasts' },
        uc: 'tsurime, tall female, long face, sharp cheekbones, pointed chin', note: 'Always keep the mature female anchor.',
    },
    {
        id: 'kit-face-vixen', name: 'Face: Vixen (petite, sharp, feline)', kind: 'face',
        parts: { identity: 'petite', faceShape: 'tsurime, black eyeliner, thick eyelashes. Face heart-shaped, wide cheekbones tapering to small pointed chin, upturned eyes, small upturned nose.', faceModel: 'Sharp arched eyebrows, angular cheekbones, wide mouth with full lower lip.' },
        uc: 'tareme, round face, button nose, freckles, chubby cheeks', note: '',
    },
    {
        id: 'kit-face-siren', name: 'Face: Siren (slender voluptuous, sultry)', kind: 'face',
        parts: { identity: 'curvy', faceShape: 'tareme, long eyelashes, eyeshadow. Face oval, softly tapered chin, heavy-lidded downturned eyes, straight nose with rounded tip.', faceModel: 'Full lips, softly defined cheekbones, smooth gently curved jaw, dark arched eyebrows.', eyes: 'lips, red lips', faceMarks: 'mole under eye' },
        uc: 'tsurime, petite, freckles, pointed chin, thin lips', note: '',
    },
    {
        id: 'kit-face-ranger', name: 'Face: Ranger (athletic, strong-featured)', kind: 'face',
        parts: { identity: 'toned, tan', faceShape: 'thick eyebrows. Face squarish, strong angular jaw, deep-set wide eyes, straight nose with slight bump on bridge.', faceModel: 'Prominent brow ridge, broad flat cheekbones, wide mouth, straight heavy eyebrows.', faceMarks: 'freckles' },
        uc: 'tareme, petite, long eyelashes, makeup, round face, button nose, furrowed brow, frown, sweat, shiny skin', note: '',
    },
    {
        id: 'kit-face-tomboy-vixen', name: 'Face: Tomboy Vixen (petite, sharp, unmade-up) v0', kind: 'face',
        parts: { identity: 'petite, 0.4::mature female::, toned', faceShape: 'tsurime. Face heart-shaped, wide cheekbones tapering to small pointed chin, upturned eyes, small straight nose.', faceModel: 'Straight dark eyebrows, clean angular cheekbones, wide mouth with full lower lip, no makeup.' },
        uc: 'tareme, round face, chubby cheeks, button nose, freckles, makeup, eyeliner, eyeshadow, long eyelashes, lipstick, thick eyebrows', note: 'Untested.',
    },
    // Body kits (character-standard.md, v0 untested).
    { id: 'kit-body-hard-petite', name: 'Body: Hard petite', kind: 'body', parts: { identity: 'petite, 0.4::mature female::', upper: 'small breasts', torso: 'toned, abs, obliques. Compact shoulders, hard flat stomach, lean muscular thighs.' }, uc: 'tall female, curvy, plump, wide hips, large breasts, flat chest', note: 'Untested.' },
    { id: 'kit-body-athletic', name: 'Body: Athletic', kind: 'body', parts: { identity: 'muscular female', upper: 'broad shoulders, medium breasts', torso: 'toned, abs. Swimmer\'s shoulders, defined arms, strong legs.', lower: 'thick thighs' }, uc: 'petite, skinny, plump', note: 'Untested.' },
    { id: 'kit-body-willowy', name: 'Body: Willowy', kind: 'body', parts: { identity: 'tall female, skinny', upper: 'small breasts, collarbone', torso: 'narrow waist. Long limbs, narrow hips.', lower: 'long legs' }, uc: 'petite, curvy, thick thighs, plump', note: 'Untested.' },
    { id: 'kit-body-curvy', name: 'Body: Curvy', kind: 'body', parts: { identity: 'curvy', upper: 'large breasts', torso: 'narrow waist. Soft hourglass figure.', lower: 'wide hips, thick thighs' }, uc: 'skinny, muscular, abs, flat chest', note: 'Untested.' },
    { id: 'kit-body-soft', name: 'Body: Soft', kind: 'body', parts: { identity: 'plump', upper: 'medium breasts', torso: 'belly. Soft rounded stomach, full arms.', lower: 'wide hips, thick thighs' }, uc: 'abs, muscular, skinny, narrow waist', note: 'Untested.' },
    { id: 'kit-body-powerhouse', name: 'Body: Powerhouse', kind: 'body', parts: { identity: 'tall female, muscular female', upper: 'biceps, broad shoulders', torso: 'abs. Heavy shoulders, thick muscled arms.', lower: 'thick thighs' }, uc: 'petite, skinny, narrow waist', note: 'Untested.' },
    { id: 'kit-body-lean-male', name: 'Body: Lean male', kind: 'body', parts: { identity: 'toned male', upper: 'collarbone', torso: 'narrow waist. Long lean muscle.' }, uc: 'muscular male, fat, large pectorals', note: 'Untested.' },
    { id: 'kit-body-brawler', name: 'Body: Brawler', kind: 'body', parts: { identity: 'muscular male', upper: 'broad shoulders, large pectorals, biceps, veiny arms. Thick neck, heavy hands.' }, uc: 'skinny, toned male', note: 'Untested.' },
    { id: 'kit-body-heavy-male', name: 'Body: Heavy male', kind: 'body', parts: { identity: 'mature male, fat', upper: 'broad shoulders', torso: 'belly. Heavy-set, thick hands, soft gut over old muscle.' }, uc: 'abs, skinny, toned male', note: 'Untested.' },
    { id: 'kit-body-big-anthro', name: 'Body: Big anthro', kind: 'body', parts: { identity: 'anthro, muscular anthro, big muscles', upper: 'broad shoulders. Barrel chest, heavy forearms.', torso: 'musclegut' }, uc: 'slim, skinny', note: 'Untested.' },
]

// ---------------------------------------------------------------- formats

interface TextSection {
    name: string
    arg: string
    body: string
}

/** Split `[name]` / `[name: arg]` sections; text before the first section is the head. */
function sections(text: string): { head: string; list: TextSection[] } {
    const list: TextSection[] = []
    let head = ''
    let cur: TextSection | null = null
    for (const line of String(text || '').split('\n')) {
        const m = line.match(/^\s*\[([a-z][a-z0-9 -]*?)(?:\s*:\s*(.*?))?\]\s*$/i)
        if (m) {
            cur = { name: m[1].trim().toLowerCase(), arg: (m[2] || '').trim(), body: '' }
            list.push(cur)
            continue
        }
        if (cur) cur.body += (cur.body ? '\n' : '') + line
        else head += (head ? '\n' : '') + line
    }
    for (const s of list) s.body = s.body.trim()
    return { head: head.trim(), list }
}

/** `key: value` lines for known keys; values may hold colons (weights, prefixes). */
function keyLines(body: string, keys: string[]): Record<string, string> {
    const out: Record<string, string> = {}
    const lower = keys.map(k => k.toLowerCase())
    for (const line of body.split('\n')) {
        const m = line.match(/^\s*([A-Za-z][A-Za-z ]{0,24}?)\s*:\s?(.*)$/)
        if (!m) continue
        const i = lower.indexOf(m[1].trim().toLowerCase())
        if (i >= 0) out[keys[i]] = out[keys[i]] ? out[keys[i]] + '\n' + m[2].trim() : m[2].trim()
    }
    return out
}

const LOOK_KEYS = LOOK_SLOTS.map(s => s.key) as string[]
const OUTFIT_KEYS_ALL = OUTFIT_SLOTS.map(s => s.key) as string[]

function sheetToText(s: Sheet): string {
    const out = [`id: ${s.id}`, `gender: ${s.gender}`, `label: ${s.label}`, '', '[look]']
    for (const k of LOOK_KEYS) {
        for (const l of lines((s.look as any)[k])) out.push(`${k}: ${l}`)
    }
    for (const o of s.outfits) {
        out.push('', `[outfit: ${o.name}]`)
        for (const k of OUTFIT_KEYS_ALL) for (const l of lines((o.lines as any)[k])) out.push(`${k}: ${l}`)
        if (o.uc.trim()) out.push(`uc: ${o.uc.trim()}`)
    }
    out.push('', '[uc]', s.uc.trim())
    if (s.explicit.trim()) out.push('', '[explicit]', s.explicit.trim())
    return out.join('\n').trim()
}

function sheetFromText(name: string, text: string, id?: string): Sheet {
    const { head, list } = sections(text)
    const h = keyLines(head, ['id', 'gender', 'label'])
    const g = (h.gender || 'girl').toLowerCase()
    const sheet: Sheet = {
        id: h.id || id || shortId(),
        name,
        label: h.label || g,
        gender: g === 'boy' ? 'boy' : g === 'other' ? 'other' : 'girl',
        look: {},
        outfits: [],
        uc: '',
        explicit: '',
    }
    for (const sec of list) {
        if (sec.name === 'look') sheet.look = keyLines(sec.body, LOOK_KEYS) as LookLines
        else if (sec.name === 'outfit') {
            const f = keyLines(sec.body, [...OUTFIT_KEYS_ALL, 'uc'])
            const { uc, ...rest } = f
            sheet.outfits.push({ name: sec.arg || `Outfit ${sheet.outfits.length + 1}`, lines: rest as OutfitLines, uc: uc || '' })
        } else if (sec.name === 'uc') sheet.uc = sec.body
        else if (sec.name === 'explicit') sheet.explicit = sec.body
    }
    if (!sheet.outfits.length) sheet.outfits.push({ name: 'Default', lines: {}, uc: '' })
    return sheet
}

function styleToText(s: StyleBlock): string {
    const out = [`id: ${s.id}`, `own tail: ${s.ownTail ? 'yes' : 'no'}`]
    if (s.guidance) out.push(`guidance: ${s.guidance}`)
    if (s.note) out.push(`note: ${s.note}`)
    out.push('', '[base]', s.base, '', '[uc]', s.uc)
    for (const a of s.addons) {
        out.push('', `[addon: ${a.name}]`, a.text)
        if (a.ucDrop) out.push(`uc drop: ${a.ucDrop}`)
    }
    return out.join('\n')
}

function styleFromText(name: string, text: string, id?: string): StyleBlock {
    const { head, list } = sections(text)
    const h = keyLines(head, ['id', 'own tail', 'guidance', 'note'])
    const s: StyleBlock = { id: h.id || id || shortId(), name, base: '', uc: '', addons: [], ownTail: /^y/i.test(h['own tail'] || ''), guidance: parseFloat(h.guidance) || undefined, note: h.note || '' }
    for (const sec of list) {
        if (sec.name === 'base') s.base = sec.body.replace(/\s*\n\s*/g, ' ')
        else if (sec.name === 'uc') s.uc = sec.body.replace(/\s*\n\s*/g, ' ')
        else if (sec.name === 'addon') {
            const drop = sec.body.match(/^\s*uc drop:\s*(.*)$/im)
            s.addons.push({ name: sec.arg || `Add-on ${s.addons.length + 1}`, text: sec.body.replace(/^\s*uc drop:.*$/gim, '').trim().replace(/\s*\n\s*/g, ' '), ucDrop: drop ? drop[1].trim() : undefined })
        }
    }
    if (!h['own tail']) s.ownTail = /\byear \d{4}\b/.test(s.base)
    return s
}

function kitToText(k: Kit): string {
    const out = [`id: ${k.id}`, `kind: ${k.kind}`]
    if (k.note) out.push(`note: ${k.note}`)
    for (const key of LOOK_KEYS) {
        const v = (k.parts as any)[key]
        if (v) out.push('', `[${key}]`, v)
    }
    out.push('', '[uc]', k.uc)
    return out.join('\n')
}

function kitFromText(name: string, text: string, id?: string): Kit {
    const { head, list } = sections(text)
    const h = keyLines(head, ['id', 'kind', 'note'])
    const k: Kit = { id: h.id || id || shortId(), name, kind: /body/i.test(h.kind || '') ? 'body' : 'face', parts: {}, uc: '', note: h.note || '' }
    for (const sec of list) {
        const key = LOOK_KEYS.find(x => x.toLowerCase() === sec.name.replace(/\s+/g, '').toLowerCase())
        if (key) (k.parts as any)[key] = sec.body
        else if (sec.name === 'uc') k.uc = sec.body
    }
    return k
}

function exampleToText(e: Example): string {
    return [`job: ${e.job}`, `tags: ${e.tags.join(', ')}`, '', '[input]', e.input, '', '[output]', e.output].join('\n')
}

function exampleFromText(text: string, id?: string): Example | null {
    const { head, list } = sections(text)
    const h = keyLines(head, ['job', 'tags'])
    const job = (h.job || '').trim() as JobId
    if (!(job in JOBS)) return null
    const input = list.find(s => s.name === 'input')?.body || ''
    const output = list.find(s => s.name === 'output')?.body || ''
    if (!input || !output) return null
    return { id: id || shortId(), job, tags: (h.tags || '').split(',').map(t => t.trim()).filter(Boolean), input, output }
}

/** Add a kit's parts to a sheet: tags merge without duplicates, sentences append. */
function applyKit(sheet: Sheet, kit: Kit): Sheet {
    const look: LookLines = { ...sheet.look }
    for (const [slot, text] of Object.entries(kit.parts) as [LookSlot, string][]) {
        if (!text) continue
        const cur = splitLine(look[slot] || '')
        const add = splitLine(text)
        const tags = uniq([...cur.tags, ...add.tags].map(t => t.trim()).filter(Boolean))
        const prose = [cur.prose, add.prose].filter(Boolean).join(' ')
        look[slot] = tagsAndProse(tags.join(', '), prose).replace(/,$/, '')
    }
    const uc = uniq([...splitSegments(sheet.uc), ...splitSegments(kit.uc)]).join(', ')
    return { ...sheet, look, uc }
}

/** Merge lorebook items over the built-ins (same name wins). */
function withBuiltins(lib: Library): Library {
    const names = new Set(lib.styles.map(s => s.name.toLowerCase()))
    const kitNames = new Set(lib.kits.map(k => k.name.toLowerCase()))
    return {
        ...lib,
        styles: [...lib.styles, ...BUILTIN_STYLES.filter(s => !names.has(s.name.toLowerCase()))],
        kits: [...lib.kits, ...BUILTIN_KITS.filter(k => !kitNames.has(k.name.toLowerCase()))],
    }
}
