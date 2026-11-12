// ============================================================================
// App state: one store shared by every mounted view, persisted to story
// storage (so a packed .story carries its setups with it).
// ============================================================================

type TabId = 'build' | 'output' | 'looks' | 'library' | 'settings'

interface ForgeSettings {
    /** editor: runs through the Send path (not limited by the script token budget). background: api.v1.generate (budgeted). */
    mode: 'editor' | 'background'
    /** capture: the reply never touches the document. scratch: it streams into a scratch paragraph that is removed afterwards. */
    output: 'capture' | 'scratch'
    autoApply: boolean
    retries: number
    /** What Send does when no step is armed in a Forge story. */
    sendWithNoStep: 'block' | 'normal'
    liveDoc: boolean
    hide: string[]
}

interface RunView {
    id: string
    job: JobId
    label: string
    attempt: number
    text: string
    status: 'starting' | 'running' | 'parsing' | 'done' | 'failed' | 'cancelled' | 'waiting'
    message: string
    mode: 'editor' | 'background'
}

interface LastResult {
    runId: string
    job: JobId
    label: string
    arg: JobArg
    preview: string
    problems: string[]
    raw: string
    input: string
    applied: boolean
    failed: boolean
    tags: string[]
}

interface UndoStep {
    label: string
    setup?: Setup
    sheet?: Sheet
}

interface AppState {
    ready: boolean
    enabled: boolean
    tab: TabId
    setup: Setup
    saved: Record<string, Setup>
    lib: Library
    libSource: 'lorebook' | 'memory'
    settings: ForgeSettings
    run: RunView | null
    queue: { job: JobId; arg: JobArg }[]
    last: LastResult | null
    undo: UndoStep[]
    armed: { job: JobId; arg: JobArg; label: string } | null
    sheetId: string | null
    budget: { input: number; output: number } | null
}

const DEFAULT_SETTINGS: ForgeSettings = {
    mode: 'editor',
    output: 'capture',
    autoApply: true,
    retries: 1,
    sendWithNoStep: 'block',
    liveDoc: true,
    hide: [],
}

const KEYS = {
    setup: 'forge.setup',
    saved: 'forge.saved',
    settings: 'forge.settings',
    enabled: 'forge.enabled',
    doc: 'forge.doc',
    sheets: 'forge.sheets.fallback',
}

function emptyLibrary(): Library {
    return withBuiltins({ sheets: [], styles: [], kits: [], examples: [], cards: {} })
}

const STORE = createStore<AppState>({
    ready: false,
    enabled: false,
    tab: 'build',
    setup: blankSetup(),
    saved: {},
    lib: emptyLibrary(),
    libSource: 'memory',
    settings: { ...DEFAULT_SETTINGS },
    run: null,
    queue: [],
    last: null,
    undo: [],
    armed: null,
    sheetId: null,
    budget: null,
})

function S(): AppState {
    return STORE.get()
}

function patch(p: Partial<AppState>) {
    STORE.set(s => ({ ...s, ...p }))
}

function clone<T>(v: T): T {
    return JSON.parse(JSON.stringify(v))
}

/** Edit the current setup through a draft; `undoLabel` records the previous state. */
function editSetup(fn: (s: Setup) => void, undoLabel?: string) {
    STORE.set(st => {
        const next = clone(st.setup)
        fn(next)
        const undo = undoLabel ? [...st.undo.slice(-19), { label: undoLabel, setup: st.setup }] : st.undo
        return { ...st, setup: next, undo }
    })
}

function editSheet(id: string, fn: (s: Sheet) => void) {
    STORE.set(st => ({ ...st, lib: { ...st.lib, sheets: st.lib.sheets.map(sh => (sh.id === id ? (() => { const n = clone(sh); fn(n); return n })() : sh)) } }))
}

function setSettings(p: Partial<ForgeSettings>) {
    STORE.set(s => ({ ...s, settings: { ...s.settings, ...p } }))
}

async function toast(msg: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
    try {
        await api.v1.ui.toast(msg, { type, autoClose: type === 'error' ? 6000 : 3500 })
    } catch {
        api.v1.log(msg)
    }
}

async function ensurePerm(p: ScriptPermission | ScriptPermission[], why: string): Promise<boolean> {
    try {
        if (await api.v1.permissions.has(p)) return true
        return await api.v1.permissions.request(p, why)
    } catch {
        return false
    }
}

async function copyText(text: string, what: string) {
    if (!(await ensurePerm('clipboardWrite', 'Prompt Forge copies finished prompt blocks to your clipboard.'))) return toast('Clipboard permission was not granted.', 'warning')
    await api.v1.clipboard.writeText(text)
    toast(`Copied ${what}.`, 'success')
}

// ---------------------------------------------------------------- persistence

let saveTimer: number | null = null
let lastSaved: { setup?: Setup; saved?: Record<string, Setup>; settings?: ForgeSettings; enabled?: boolean } = {}

async function loadState() {
    const ss = api.v1.storyStorage
    const [setup, saved, settings, enabled] = await Promise.all([ss.get(KEYS.setup), ss.get(KEYS.saved), ss.get(KEYS.settings), ss.get(KEYS.enabled)])
    const st: Partial<AppState> = {
        setup: normalizeSetup(setup),
        saved: saved && typeof saved === 'object' ? Object.fromEntries(Object.entries(saved).map(([k, v]) => [k, normalizeSetup(v)])) : {},
        settings: { ...DEFAULT_SETTINGS, ...(settings || {}) },
        enabled: enabled === true,
        ready: true,
    }
    patch(st)
    const now = S()
    lastSaved = { setup: now.setup, saved: now.saved, settings: now.settings, enabled: now.enabled }
    STORE.subscribe(scheduleSave)
}

function scheduleSave() {
    if (saveTimer !== null) return
    api.v1.timers
        .setTimeout(async () => {
            saveTimer = null
            const s = S()
            const ss = api.v1.storyStorage
            try {
                if (s.setup !== lastSaved.setup) await ss.set(KEYS.setup, s.setup)
                if (s.saved !== lastSaved.saved) await ss.set(KEYS.saved, s.saved)
                if (s.settings !== lastSaved.settings) await ss.set(KEYS.settings, s.settings)
                if (s.enabled !== lastSaved.enabled) await ss.set(KEYS.enabled, s.enabled)
                lastSaved = { setup: s.setup, saved: s.saved, settings: s.settings, enabled: s.enabled }
            } catch (e) {
                api.v1.error('Prompt Forge: save failed', e)
            }
        }, 600)
        .then(id => (saveTimer = id))
}

function undoLast() {
    const st = S()
    const step = st.undo[st.undo.length - 1]
    if (!step) return
    const next: Partial<AppState> = { undo: st.undo.slice(0, -1) }
    if (step.setup) next.setup = step.setup
    if (step.sheet) next.lib = { ...st.lib, sheets: st.lib.sheets.map(sh => (sh.id === step.sheet!.id ? step.sheet! : sh)) }
    patch(next)
    toast(`Undid: ${step.label}`)
}
