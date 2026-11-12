// ============================================================================
// Data model: setups, cast, saved character sheets and the library.
// ============================================================================

type LookLines = Partial<Record<LookSlot, string>>
type OutfitLines = Partial<Record<OutfitSlot, string>>

interface Outfit {
    name: string
    lines: OutfitLines
    /** What this look must not grow (other outfits' garments, wrong footwear). */
    uc: string
}

/** A saved, reusable character look. Lives in the lorebook so it can be edited by hand. */
interface Sheet {
    id: string
    /** Display name. Never emitted into a prompt (SKILL §6). */
    name: string
    /** One visible feature used to name this character in prose: "tall fox girl", "girl in yellow jacket". */
    label: string
    gender: Gender
    look: LookLines
    outfits: Outfit[]
    /** Identity guard, face counter-UC, color drift (character-standard.md "Character UC"). */
    uc: string
    /** Explicit layer: genital/nipple/pubic lines, used only in explicit setups. */
    explicit: string
    entryId?: string
}

interface CastState {
    posture: string
    gesture: string
    expression: string
    gaze: string
    extra: string
}

interface CastMember {
    id: string
    sheetId: string | null
    name: string
    label: string
    gender: Gender
    look: LookLines
    outfitName: string
    outfit: OutfitLines
    outfitUc: string
    explicit: string
    state: CastState
    /** Mood words for the emotion lookup and the pose job. */
    mood: string
    position: { x: number; y: number } | null
    uc: string
    /** Skip framing trims for this character. */
    noTrim: boolean
}

interface Interaction {
    id: string
    actor: string
    act: string
    /** Cast id, or '' for an act with no partner in frame. */
    target: string
    mutual: boolean
}

interface Brief {
    where: string
    when: string
    light: string
    camera: string
    moment: string
    mood: string
}

interface Setup {
    id: string
    title: string
    idea: string
    brief: Brief
    rating: Rating
    canvas: Canvas
    styleId: string
    addon: string
    medium: string
    objects: string
    scene: string
    background: string
    framing: Framing
    vAngle: VAngle
    hAngle: HAngle
    camera: string
    cast: CastMember[]
    interactions: Interaction[]
    prose: string
    baseExtra: string
    ucMode: UcMode
    ucExtra: string
    quality: boolean
    complexity: string
    year: string
    stabilizer: boolean
    text: boolean
    settings: ImageSettings
}

interface StyleBlock {
    id: string
    name: string
    base: string
    uc: string
    /** Theme add-ons; `ucDrop` lists Base UC entries the add-on removes (e.g. Dark fantasy drops `dark, in shadows`). */
    addons: { name: string; text: string; ucDrop?: string }[]
    /** The block carries its own year/quality tail; rating goes in before its year tag. */
    ownTail: boolean
    guidance?: number
    note: string
    entryId?: string
}

type KitKind = 'body' | 'face'
interface Kit {
    id: string
    name: string
    kind: KitKind
    /** Text added to each look slot (tags, then an optional sentence). */
    parts: LookLines
    /** Counter-UC added to the character's UC. */
    uc: string
    note: string
    entryId?: string
}

type JobId = 'brief' | 'scene' | 'pose' | 'prose' | 'look' | 'outfit'

interface Example {
    id: string
    job: JobId
    /** Labels for picking the closest examples: rating, cast count, framing. */
    tags: string[]
    input: string
    output: string
    entryId?: string
}

interface Library {
    sheets: Sheet[]
    styles: StyleBlock[]
    kits: Kit[]
    examples: Example[]
    /** Job card overrides edited in the lorebook, keyed by CARD_KEYS. Empty → built-in card. */
    cards: Record<string, string>
}

function blankState(): CastState {
    return { posture: '', gesture: '', expression: '', gaze: '', extra: '' }
}

function blankBrief(): Brief {
    return { where: '', when: '', light: '', camera: '', moment: '', mood: '' }
}

function blankSetup(): Setup {
    return {
        id: shortId(),
        title: 'Untitled setup',
        idea: '',
        brief: blankBrief(),
        rating: 'general',
        canvas: 'portrait',
        styleId: '',
        addon: '',
        medium: '',
        objects: '',
        scene: '',
        background: '',
        framing: 'cowboy shot',
        vAngle: '',
        hAngle: '',
        camera: '',
        cast: [],
        interactions: [],
        prose: '',
        baseExtra: '',
        ucMode: 'lean',
        ucExtra: '',
        quality: false,
        complexity: 'high complexity',
        year: 'year 2026',
        stabilizer: false,
        text: false,
        settings: { ...DEFAULT_IMAGE_SETTINGS },
    }
}

function castFromSheet(sheet: Sheet | null, gender: Gender = 'girl'): CastMember {
    const outfit = sheet?.outfits[0]
    return {
        id: shortId(),
        sheetId: sheet?.id ?? null,
        name: sheet?.name ?? '',
        label: sheet?.label ?? gender,
        gender: sheet?.gender ?? gender,
        look: { ...(sheet?.look ?? {}) },
        outfitName: outfit?.name ?? '',
        outfit: { ...(outfit?.lines ?? {}) },
        outfitUc: outfit?.uc ?? '',
        explicit: sheet?.explicit ?? '',
        state: blankState(),
        mood: '',
        position: null,
        uc: sheet?.uc ?? '',
        noTrim: false,
    }
}

function blankSheet(): Sheet {
    return { id: shortId(), name: 'New character', label: 'girl', gender: 'girl', look: {}, outfits: [{ name: 'Default', lines: {}, uc: '' }], uc: '', explicit: '' }
}

/** Fill gaps in a stored setup so older saves keep loading. */
function normalizeSetup(raw: any): Setup {
    const base = blankSetup()
    if (!raw || typeof raw !== 'object') return base
    const s: Setup = { ...base, ...raw }
    s.brief = { ...blankBrief(), ...(raw.brief || {}) }
    s.settings = { ...DEFAULT_IMAGE_SETTINGS, ...(raw.settings || {}) }
    s.cast = Array.isArray(raw.cast) ? raw.cast.map((c: any) => ({ ...castFromSheet(null), ...c, state: { ...blankState(), ...(c?.state || {}) } })) : []
    s.interactions = Array.isArray(raw.interactions) ? raw.interactions : []
    if (!RATINGS.includes(s.rating)) s.rating = 'general'
    if (!FRAMINGS.includes(s.framing)) s.framing = 'cowboy shot'
    if (!(s.canvas in CANVAS)) s.canvas = 'portrait'
    return s
}
