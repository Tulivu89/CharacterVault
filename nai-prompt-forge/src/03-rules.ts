// ============================================================================
// The v8 rulebook (nai-v5-images SKILL Part B) as data. Everything here is
// applied by code, never sent to the model.
// ============================================================================

type Rating = 'general' | 'sensitive' | 'questionable' | 'explicit'
type Gender = 'girl' | 'boy' | 'other'
type Framing = 'close-up' | 'portrait' | 'upper body' | 'cowboy shot' | 'full body' | 'wide shot' | 'very wide shot'
type VAngle = '' | 'from above' | 'from below'
type HAngle = '' | 'from side' | 'from behind' | 'straight-on'

const RATINGS: Rating[] = ['general', 'sensitive', 'questionable', 'explicit']
const FRAMINGS: Framing[] = ['close-up', 'portrait', 'upper body', 'cowboy shot', 'full body', 'wide shot', 'very wide shot']

/** Character standard slots 1–13, head to toe. */
const LOOK_SLOTS = [
    { key: 'identity', label: 'Identity', hint: 'species/type, skin tone tag, ONE frame tag' },
    { key: 'hair', label: 'Hair', hint: 'length, style, color, bangs, ahoge' },
    { key: 'hairHidden', label: 'Hair (hidden side)', hint: 'undercut, back braid: shows from one angle' },
    { key: 'headExtras', label: 'Head extras', hint: 'animal ears, horns, halo, pointy ears' },
    { key: 'faceShape', label: 'Face shape', hint: 'eye shape tags + outline sentence' },
    { key: 'faceModel', label: 'Face modeling', hint: 'cheekbones, jaw, lips sentence' },
    { key: 'eyes', label: 'Eyes and brows', hint: 'eye color, pupils, brows, makeup' },
    { key: 'faceMarks', label: 'Face marks', hint: 'scars, freckles, moles, piercings' },
    { key: 'skin', label: 'Skin and markings', hint: 'fur/scales, tattoos, brands' },
    { key: 'upper', label: 'Upper body', hint: 'shoulders, chest, arms, hands, nails' },
    { key: 'torso', label: 'Torso', hint: 'waist, abs, stomach, back' },
    { key: 'lower', label: 'Lower body', hint: 'hips, thighs, legs, bare feet' },
    { key: 'tail', label: 'Tail and low extras', hint: 'tail type and color, low wings' },
] as const
type LookSlot = (typeof LOOK_SLOTS)[number]['key']

const OUTFIT_SLOTS = [
    { key: 'headNeck', label: 'Head and neck' },
    { key: 'top', label: 'Top' },
    { key: 'outer', label: 'Outerwear' },
    { key: 'hands', label: 'Hands and wrists' },
    { key: 'bottom', label: 'Bottom' },
    { key: 'legwear', label: 'Legwear' },
    { key: 'footwear', label: 'Footwear' },
    { key: 'props', label: 'Held props' },
    { key: 'state', label: 'State sentence' },
] as const
type OutfitSlot = (typeof OUTFIT_SLOTS)[number]['key']

interface Trim {
    look: LookSlot[]
    outfit: OutfitSlot[]
    /** Keep only the tags of these slots (drop their sentences). */
    tagsOnly: LookSlot[]
    /** Drop tags of these vocab categories from the look and outfit. */
    dropCats: string[]
}

const ALL_LOOK = LOOK_SLOTS.map(s => s.key) as LookSlot[]
const ALL_OUTFIT = OUTFIT_SLOTS.map(s => s.key) as OutfitSlot[]

/** Framing trims from character-standard.md. */
function trimFor(framing: Framing, hAngle: HAngle): Trim {
    if (hAngle === 'from behind') {
        return { look: ['identity', 'hair', 'hairHidden', 'headExtras', 'skin', 'upper', 'torso', 'lower', 'tail'], outfit: ALL_OUTFIT, tagsOnly: [], dropCats: [] }
    }
    switch (framing) {
        case 'close-up':
        case 'portrait':
            return { look: ['identity', 'hair', 'headExtras', 'faceShape', 'faceModel', 'eyes', 'faceMarks'], outfit: ['headNeck', 'top', 'outer', 'state'], tagsOnly: [], dropCats: [] }
        case 'upper body':
            return { look: ['identity', 'hair', 'headExtras', 'faceShape', 'faceModel', 'eyes', 'faceMarks', 'skin', 'upper', 'torso'], outfit: ['headNeck', 'top', 'outer', 'hands', 'bottom', 'props', 'state'], tagsOnly: [], dropCats: [] }
        case 'cowboy shot':
            return { look: ['identity', 'hair', 'headExtras', 'faceShape', 'eyes', 'faceMarks', 'skin', 'upper', 'torso', 'lower', 'tail'], outfit: ALL_OUTFIT.filter(s => s !== 'footwear'), tagsOnly: [], dropCats: ['feet'] }
        default:
            return { look: ['identity', 'hair', 'headExtras', 'faceShape', 'eyes', 'skin', 'upper', 'torso', 'lower', 'tail'], outfit: ALL_OUTFIT, tagsOnly: ['faceShape'], dropCats: [] }
    }
}

/** What the bottom edge of the crop cuts through, for the prose card. */
const CROP_EDGE: Record<Framing, string> = {
    'close-up': 'the frame shows the face only',
    portrait: 'the frame ends at the shoulders',
    'upper body': 'the frame ends at the waist',
    'cowboy shot': 'the frame ends at mid-thigh',
    'full body': 'the whole figure is in frame, feet included',
    'wide shot': 'the figures are small in a wide view of the place',
    'very wide shot': 'the figures are tiny in a very wide view',
}

/** Exclusive groups (SKILL §9, §21): one tag per group per field. */
const EXCLUSIVE_GROUPS: { name: string; tags: string[] }[] = [
    { name: 'gaze', tags: ['looking at viewer', 'looking to the side', 'looking up', 'looking down', 'looking away', 'looking at another', 'looking ahead', 'looking afar'] },
    { name: 'framing', tags: ['close-up', 'portrait', 'upper body', 'cowboy shot', 'full body', 'full-length portrait'] },
    { name: 'shot width', tags: ['wide shot', 'very wide shot'] },
    { name: 'background', tags: ['simple background', 'white background', 'blurry background', 'detailed background', 'transparent background', 'dark background', 'grey background', 'black background', 'gradient background'] },
    { name: 'posture', tags: ['sitting', 'standing', 'lying', 'kneeling', 'squatting'] },
    { name: 'horizontal angle', tags: ['from side', 'from behind', 'straight-on'] },
    { name: 'vertical angle', tags: ['from above', 'from below'] },
    { name: 'layout', tags: ['comic', 'multiple views', 'reference sheet', 'sticker'] },
    { name: 'hair length', tags: ['very short hair', 'short hair', 'medium hair', 'long hair', 'very long hair', 'absurdly long hair'] },
    {
        name: 'sex position',
        tags: ['missionary', 'cowgirl position', 'reverse cowgirl position', 'doggystyle', 'mating press', 'standing sex', 'sex from behind', 'spooning', 'prone bone', 'full nelson', 'suspended congress', 'piledriver (sex)', 'amazon position', 'reverse upright straddle', 'upright straddle'],
    },
]

/** Never emit in a positive field (SKILL §0, §7, §19). */
const BANNED_POSITIVE: Record<string, string> = {
    highres: 'gives a white glow/outline in V5',
    absurdres: 'gives a white glow/outline in V5',
    'incredibly absurdres': 'gives a white glow/outline in V5',
    'game cg': 'negative only (canonical: game asset)',
    masterpiece: 'V4.5 quality stack; forces a default style in V5',
    'eyes focused on viewer': 'stopped working in V5; use looking at viewer',
    'anime screenshot': 'degraded in V5; use anime coloring',
    cg: 'visual novel tags must be fully prefixed',
}

/** Renames that are always safe to apply (SKILL §7). Waifoundry's alias table covers the rest. */
const RENAMED: Record<string, string> = {
    v: 'peace sign',
    'double v': 'double peace',
    '|_|': 'bar eyes',
    ':|': 'neutral face',
    'eyepatch bikini': 'square bikini',
    'tachi-e': 'character image',
    'elf ears': 'pointy ears',
    'male pov': 'pov',
    'lining up': 'queue',
}

/** Tags the model may use though they're not in the tag files (SKILL §7). */
const OFF_FILE_ALLOWED = new Set([
    'nsfw', 'no text', 'fur dataset', 'background dataset', 'zero pictured', 'detailed background', 'rule of thirds',
    'multiple panels layout', 'split view', 'full-length portrait', 'top aesthetic', 'location', 'transparent background',
    'has alpha', 'alpha transparency', 'attractive male', 'very aesthetic', 'best quality', 'amazing quality', 'aesthetic',
    'low complexity', 'medium complexity', 'high complexity', 'ultra complexity', 'peace sign', 'double peace', 'bar eyes',
    'neutral face', 'square bikini', 'character image', 'game asset', 'side-by-side', 'expression chart', 'pov hands',
    'cel shading', 'semi-realistic', 'visual novel cg', 'oil painting (medium)', 'western comics (style)', 'toon (style)',
    // box gender words and core framing/posture tags the curated lists leave out
    'girl', 'boy', 'other', 'no humans', 'close-up', 'portrait', 'upper body', 'cowboy shot', 'full body', 'wide shot', 'very wide shot',
    'sitting sideways', 'goggles on head', 'hand on own cheek', 'hugging own legs', 'outstretched hand', 'arm support', 'head rest',
])

/** Color words: `<color> <known garment or feature>` counts as a known tag (Danbooru has most such combinations). */
const COLOR_WORDS = ['white', 'black', 'red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'brown', 'grey', 'aqua', 'silver', 'gold', 'beige', 'light blue', 'dark blue', 'light brown', 'dark green', 'multicolored', 'striped', 'plaid']

/** Tags that lower apparent age. Never in a suggestive or explicit positive field (SKILL §1). */
const AGE_LOWERING = ['loli', 'shota', 'child', 'children', 'female child', 'male child', 'toddler', 'baby', 'aged down', 'oppai loli', 'teenage']

/** Age guard for each character UC in suggestive or explicit setups (character-standard.md). */
function ageGuard(gender: Gender): string {
    if (gender === 'girl') return 'loli, child, aged down'
    if (gender === 'boy') return 'shota, child, aged down'
    return 'child, aged down'
}

const UC_STRINGS = {
    lean: 'lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page',
    'human focus':
        'lowres, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, dithering, halftone, screentone, multiple views, logo, too many watermarks, negative space, blank page, @_@, mismatched pupils, glowing eyes, bad anatomy',
}
type UcMode = 'lean' | 'human focus' | 'style'

const STABILIZER =
    '1.5::bad anatomy, bad proportions, wrong anatomy, anatomical nonsense, deformed, disfigured, mutation::, 1.4::bad hands, bad feet, extra digits, fewer digits, extra fingers, missing fingers, fused fingers, extra hands, extra arms, extra legs, missing limb::, 1.3::bad face, extra eyes, extra pupils, extra mouth, bad neck::, 1.2::clone, duplicate::'

const CANVAS = {
    portrait: { size: '832x1216', label: 'Normal portrait' },
    landscape: { size: '1216x832', label: 'Normal landscape' },
    square: { size: '1024x1024', label: 'Normal square' },
}
type Canvas = keyof typeof CANVAS

/** Emotion → visible cues (SKILL §20). The model only handles moods not listed here. */
const EMOTION_CUES: Record<string, string> = {
    grief: 'tears, frown, hand over own mouth',
    sad: 'frown, downturned eyes, looking down',
    shame: 'blush, looking away, covering own face',
    embarrassed: 'blush, looking away, wavy mouth',
    defiant: 'glaring, clenched teeth, v-shaped eyebrows',
    angry: 'angry, glaring, clenched teeth',
    afraid: 'scared, wide-eyed, trembling, sweat',
    aroused: 'heavy breathing, blush, sweat, trembling, half-closed eyes',
    exhausted: 'half-closed eyes, sweat, open mouth, heavy breathing',
    smug: 'smug, smirk, half-closed eyes',
    happy: 'smile, open mouth, closed eyes',
    playful: 'grin, one eye closed, tongue out',
    calm: 'closed mouth, light smile',
    shocked: 'surprised, wide-eyed, open mouth',
    bored: 'expressionless, half-closed eyes',
    flustered: 'blush, wavy mouth, sweatdrop',
    determined: 'serious, v-shaped eyebrows, closed mouth',
    crying: 'crying, tears, open mouth',
    seductive: 'seductive smile, half-closed eyes, looking at viewer',
    pain: 'clenched teeth, one eye closed, tears, sweat',
}

/** 3×3 placement grid (v5-positioning.md), y on the shoulders. */
const GRID = {
    x: [{ v: 0.25, l: 'left third' }, { v: 0.5, l: 'center' }, { v: 0.75, l: 'right third' }],
    y: [{ v: 0.3, l: 'upper' }, { v: 0.45, l: 'middle' }, { v: 0.65, l: 'lower' }],
}

function positionGloss(x: number, y: number): string {
    const hx = x < 0.2 ? 'far left' : x < 0.4 ? 'left third' : x <= 0.6 ? 'center' : x <= 0.8 ? 'right third' : 'far right'
    const vy = y < 0.25 ? 'top' : y < 0.4 ? 'upper body' : y <= 0.55 ? 'mid-height' : y <= 0.75 ? 'lower' : 'bottom'
    return `${hx}, ${vy}`
}

/** Count tag for the cast (SKILL §12). */
function countTag(genders: Gender[]): string {
    const n = (g: Gender) => genders.filter(x => x === g).length
    const part = (k: number, word: string, plural: string) => (k === 0 ? '' : k >= 6 ? `6+${plural}` : k === 1 ? `1${word}` : `${k}${plural}`)
    const parts = [part(n('girl'), 'girl', 'girls'), part(n('boy'), 'boy', 'boys'), part(n('other'), 'other', 'others')].filter(Boolean)
    if (!parts.length) return 'no humans'
    if (genders.length === 1) parts.push('solo')
    return parts.join(', ')
}

interface ImageSettings {
    model: string
    effort: string
    sampler: string
    steps: number
    guidance: number
    rescale: number
    seed: string
}

const DEFAULT_IMAGE_SETTINGS: ImageSettings = {
    model: 'NovelAI Diffusion V5 Full (Anime)',
    effort: 'High',
    sampler: 'Euler Ancestral',
    steps: 24,
    guidance: 4.5,
    rescale: 0,
    seed: 'random',
}

function settingsBlock(s: ImageSettings, canvas: Canvas): string {
    const c = CANVAS[canvas]
    return [
        `Model: ${s.model} | Effort: ${s.effort}`,
        `Sampler: ${s.sampler} | Steps: ${s.steps} | Guidance: ${s.guidance} | Rescale: ${s.rescale}`,
        `Resolution: ${c.size} (${c.label}) | Seed: ${s.seed}`,
        'Quality Tags toggle: OFF | UC Preset: None',
    ].join('\n')
}

/** Words that mark pronoun-led prose (SKILL §8: name the subject every time). */
const PRONOUNS = ['she', 'he', 'her', 'his', 'him', 'hers', 'they', 'them', 'their', 'theirs', 'it', 'its', 'herself', 'himself', 'themselves', 'itself']
