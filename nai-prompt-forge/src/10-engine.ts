// ============================================================================
// Generation engine.
//
// Editor path (default): a step runs as a normal editor generation, the same
// as pressing Send, so it isn't drawn from the script's token budget. The
// hooks swap the story context for the job's messages (onContextBuilt), keep
// the reply out of the document (onResponse), then parse and apply it
// (onGenerationEnd).
//
// Background path (optional): api.v1.generate, which IS budgeted; used only
// when chosen in Settings and the budget covers the call.
// ============================================================================

interface ActiveRun {
    id: string
    job: JobId
    arg: JobArg
    label: string
    base: Message[]
    messages: Message[]
    allowed: Set<string>
    input: string
    attempt: number
    buffer: string
    continuityId: string | null
    mode: 'editor' | 'background'
    cancelled: boolean
    scratchFrom: number | null
    savedParams: Record<string, any> | null
    signal: CancellationSignal | null
}

let PENDING: ActiveRun | null = null
let ACTIVE: ActiveRun | null = null
let lastStreamPush = 0
let pendingResult: { res: JobResult; run: ActiveRun } | null = null

function stepLabel(job: JobId, arg: JobArg, setup: Setup, lib: Library): string {
    const spec = JOBS[job]
    if (job === 'pose') {
        const c = setup.cast.find(x => x.id === arg.castId)
        return `${spec.label}: ${c?.label || 'character'}`
    }
    if (job === 'look') return `${arg.group === 'body' ? 'Build body' : 'Build head and face'}: ${lib.sheets.find(s => s.id === arg.sheetId)?.name || 'character'}`
    if (job === 'outfit') return `${spec.label}: ${lib.sheets.find(s => s.id === arg.sheetId)?.name || 'character'}`
    return spec.label
}

function setRun(p: Partial<RunView> | null) {
    STORE.set(s => ({ ...s, run: p === null ? null : { ...(s.run as RunView), ...p } }))
}

/** Can this step run with the current state? Returns a reason when not. */
function blocker(job: JobId, arg: JobArg, s: AppState): string {
    if (job === 'pose' && !s.setup.cast.some(c => c.id === arg.castId)) return 'Add a character to the cast first.'
    if ((job === 'look' || job === 'outfit') && !s.lib.sheets.some(x => x.id === arg.sheetId)) return 'Pick or create a character first.'
    if ((job === 'look' || job === 'outfit') && !(arg.description || '').trim()) return 'Write a description first.'
    if (job === 'prose' && !s.setup.brief.moment && !s.setup.idea) return 'Write an idea or plan the shot first.'
    return ''
}

function newRun(job: JobId, arg: JobArg): ActiveRun | string {
    const s = S()
    const why = blocker(job, arg, s)
    if (why) return why
    const { messages, allowed } = jobMessages(JOBS[job], s.setup, s.lib, arg, s.settings.hide)
    return {
        id: shortId(),
        job,
        arg,
        label: stepLabel(job, arg, s.setup, s.lib),
        base: messages,
        messages,
        allowed,
        input: messages[messages.length - 1].content || '',
        attempt: 1,
        buffer: '',
        continuityId: null,
        mode: s.settings.mode,
        cancelled: false,
        scratchFrom: null,
        savedParams: null,
        signal: null,
    }
}

async function startJob(job: JobId, arg: JobArg = {}) {
    if (PENDING || ACTIVE) return toast('A step is already running.', 'warning')
    const run = newRun(job, arg)
    if (typeof run === 'string') return toast(run, 'warning')
    STORE.set(s => ({ ...s, run: { id: run.id, job, label: run.label, attempt: 1, text: '', status: 'starting', message: '', mode: run.mode }, last: null }))
    await dispatch(run)
}

async function dispatch(run: ActiveRun) {
    if (run.mode === 'background') {
        if (budgetCovers(run)) return runBackground(run)
        run.mode = 'editor'
        toast('The script budget is low; running this step through Send instead.', 'info')
        setRun({ mode: 'editor' })
    }
    return runEditor(run)
}

function budgetCovers(run: ActiveRun): boolean {
    try {
        const need = api.v1.script.countUncachedInputTokens(run.messages)
        return api.v1.script.getAllowedInput() >= need && api.v1.script.getAllowedOutput() >= JOBS[run.job].maxTokens
    } catch {
        return false
    }
}

function refreshBudget() {
    try {
        patch({ budget: { input: api.v1.script.getAllowedInput(), output: api.v1.script.getAllowedOutput() } })
    } catch {
        /* not available */
    }
}

// ---------------------------------------------------------------- editor path

async function runEditor(run: ActiveRun) {
    try {
        if (await api.v1.editor.isBlocked()) {
            setRun({ status: 'failed', message: 'The editor is busy. Try again in a moment.' })
            return
        }
        const spec = JOBS[run.job]
        if (!run.savedParams && (await api.v1.permissions.has('storyEdit'))) {
            run.savedParams = await api.v1.generationParameters.get()
            await api.v1.generationParameters.update({ temperature: spec.temperature, max_tokens: spec.maxTokens })
        }
        if (S().settings.output === 'scratch' && (await ensurePerm('documentEdit', 'Prompt Forge uses a scratch paragraph for replies.'))) {
            const before = new Set(await api.v1.document.sectionIds())
            await api.v1.document.appendParagraph({ text: '' })
            run.scratchFrom = (await api.v1.document.sectionIds()).find(id => !before.has(id)) ?? null
        }
        PENDING = run
        setRun({ status: 'starting', attempt: run.attempt, message: '' })
        await api.v1.editor.generate()
        // Script-started editor generations are capped without user action; if this one didn't start, Send will.
        api.v1.timers.setTimeout(() => {
            if (PENDING === run) setRun({ status: 'waiting', message: 'Press Send to run this step.' })
        }, 4000)
    } catch (e) {
        PENDING = run
        setRun({ status: 'waiting', message: 'Press Send to run this step.' })
    }
}

// ---------------------------------------------------------------- background path

async function runBackground(run: ActiveRun) {
    const spec = JOBS[run.job]
    try {
        const params = await api.v1.generationParameters.get()
        run.signal = await api.v1.createCancellationSignal()
        ACTIVE = run
        setRun({ status: 'running', attempt: run.attempt, message: '' })
        const res = await api.v1.generate(
            run.messages,
            { model: params.model || 'glm-4-6', max_tokens: spec.maxTokens, temperature: spec.temperature, enable_thinking: false },
            (choices, final) => {
                const c = choices[0]
                if (!c || c.isReasoning || final) return
                run.buffer += c.text
                pushStream(run)
            },
            'background',
            run.signal,
        )
        const c = res.choices[0]
        if (c) run.buffer = c.parsedContent ?? c.text ?? run.buffer
    } catch (e) {
        if (!run.cancelled) api.v1.error('Prompt Forge: background generation failed', e)
    } finally {
        refreshBudget()
    }
    if (ACTIVE === run) ACTIVE = null
    await finishRun(run)
}

// ---------------------------------------------------------------- hooks

function boundRun(continuityId: string): ActiveRun | null {
    return ACTIVE && ACTIVE.continuityId === continuityId ? ACTIVE : null
}

function pushStream(run: ActiveRun, force = false) {
    const now = Date.now()
    if (!force && now - lastStreamPush < 120) return
    lastStreamPush = now
    setRun({ text: cleanModelText(run.buffer).slice(-1500), status: 'running' })
}

function registerHooks() {
    api.v1.hooks.register('onGenerationRequested', async p => {
        if (PENDING) {
            ACTIVE = PENDING
            PENDING = null
            ACTIVE.continuityId = p.continuityId
            setRun({ status: 'running', message: '' })
            return
        }
        const s = S()
        if (!s.enabled || ACTIVE) return
        if (s.armed) {
            const run = newRun(s.armed.job, s.armed.arg)
            if (typeof run === 'string') {
                toast(run, 'warning')
                return { stopGeneration: true }
            }
            run.continuityId = p.continuityId
            ACTIVE = run
            STORE.set(st => ({ ...st, run: { id: run.id, job: run.job, label: run.label, attempt: 1, text: '', status: 'running', message: '', mode: 'editor' }, last: null }))
            return
        }
        if (s.settings.sendWithNoStep === 'block' && !p.scriptInitiated) {
            toast('Prompt Forge: pick a step in the panel, or arm one so Send runs it.', 'info')
            return { stopGeneration: true }
        }
    })

    api.v1.hooks.register('onBeforeContextBuild', p => {
        const run = boundRun(p.continuityId) || (p.dryRun && S().enabled && S().armed ? true : null)
        if (!run) return
        const off = { active: false, content: '' }
        return {
            storyText: off,
            memory: off,
            authorsNote: off,
            prefill: off,
            systemPrompt: off,
            lorebookEntries: p.lorebookEntries.map(([id]) => [id, { active: false }] as [string, { active: boolean }]),
        }
    })

    api.v1.hooks.register('onContextBuilt', p => {
        const run = boundRun(p.continuityId)
        if (run) return { messages: run.messages }
        const s = S()
        if (p.dryRun && s.enabled && s.armed) {
            const preview = newRun(s.armed.job, s.armed.arg)
            if (typeof preview !== 'string') return { messages: preview.messages }
        }
    })

    api.v1.hooks.register('onResponse', p => {
        const run = boundRun(p.continuityId)
        if (!run) return
        run.buffer += p.text.join('')
        pushStream(run, p.final)
        const hide = S().settings.output === 'capture'
        const text = hide ? p.text.map(() => '') : p.text
        if (run.cancelled || run.buffer.length > JOBS[run.job].maxTokens * 8) return { stopGeneration: true, text }
        if (hide) return { text }
    })

    api.v1.hooks.register('onGenerationEnd', async p => {
        const run = boundRun(p.continuityId)
        if (!run) return
        ACTIVE = null
        await finishRun(run)
    })
}

// ---------------------------------------------------------------- finishing

async function restoreParams(run: ActiveRun) {
    if (!run.savedParams) return
    try {
        const { model, ...rest } = run.savedParams
        await api.v1.generationParameters.update(rest)
    } catch {
        /* ignore */
    }
    run.savedParams = null
}

async function clearScratch(run: ActiveRun) {
    if (run.scratchFrom === null) return
    try {
        const ids = await api.v1.document.sectionIds()
        const at = ids.indexOf(run.scratchFrom)
        if (at >= 0) await api.v1.document.removeParagraphs(ids.slice(at))
    } catch {
        /* the user may have edited around it */
    }
    run.scratchFrom = null
}

async function finishRun(run: ActiveRun) {
    await clearScratch(run)
    if (run.cancelled) {
        await restoreParams(run)
        STORE.set(s => ({ ...s, queue: [], run: s.run && { ...s.run, status: 'cancelled', message: 'Stopped.' } }))
        return
    }
    setRun({ status: 'parsing', text: cleanModelText(run.buffer).slice(-1500) })
    const s = S()
    const spec = JOBS[run.job]
    let res: JobResult
    try {
        res = spec.parse(run.buffer, s.setup, s.lib, run.arg, run.allowed)
    } catch (e) {
        api.v1.error('Prompt Forge: parse failed', e)
        res = { preview: run.buffer, problems: ['The answer could not be read.'], retry: 'Answer in exactly the format shown.' }
    }
    if (res.retry && run.attempt <= s.settings.retries) {
        run.messages = retryMessages(run.base, run.buffer, res.retry)
        run.attempt++
        run.buffer = ''
        run.continuityId = null
        setRun({ status: 'starting', attempt: run.attempt, text: '', message: `Retrying: ${res.retry.slice(0, 160)}` })
        await dispatch(run)
        return
    }
    await restoreParams(run)
    const usable = !!(res.applySetup || res.applySheet)
    const failed = !usable
    if (usable && s.settings.autoApply) applyResult(res, run)
    STORE.set(st => ({
        ...st,
        run: st.run && { ...st.run, status: failed ? 'failed' : 'done', message: failed ? res.retry || 'No usable answer.' : '' },
        last: {
            runId: run.id,
            job: run.job,
            label: run.label,
            arg: run.arg,
            preview: res.preview,
            problems: res.retry && usable ? [...res.problems] : res.problems,
            raw: run.buffer,
            input: run.input,
            applied: usable && st.settings.autoApply,
            failed,
            tags: run.job === 'look' ? [run.arg.group || 'head'] : exampleTags(st.setup),
        },
    }))
    pendingResult = usable ? { res, run } : null
    if (usable && S().settings.liveDoc && spec.scope !== 'sheet') renderLive().catch(() => {})
    nextInQueue()
}

function applyResult(res: JobResult, run: ActiveRun) {
    STORE.set(st => {
        let setup = st.setup
        let lib = st.lib
        const undo = st.undo.slice(-19)
        if (res.applySetup) {
            undo.push({ label: run.label, setup: st.setup })
            setup = res.applySetup(st.setup)
        }
        if (res.applySheet && run.arg.sheetId) {
            const sh = st.lib.sheets.find(x => x.id === run.arg.sheetId)
            if (sh) {
                undo.push({ label: run.label, sheet: sh })
                lib = { ...st.lib, sheets: st.lib.sheets.map(x => (x.id === sh.id ? res.applySheet!(x) : x)) }
            }
        }
        return { ...st, setup, lib, undo }
    })
}

/** Apply the last result by hand (when auto-apply is off). */
function applyLast() {
    const st = S()
    if (!pendingResult || !st.last || st.last.applied || pendingResult.run.id !== st.last.runId) return
    applyResult(pendingResult.res, pendingResult.run)
    STORE.set(s => ({ ...s, last: s.last && { ...s.last, applied: true } }))
}

function nextInQueue() {
    const q = S().queue
    if (!q.length) return
    let [next, ...rest] = q
    // `castId: '*'` expands to one pose step per cast member, read when its turn comes (the plan may have just made the cast).
    if (next.job === 'pose' && next.arg.castId === '*') {
        const poses = S().setup.cast.map(c => ({ job: 'pose' as JobId, arg: { castId: c.id } }))
        if (!poses.length) {
            patch({ queue: rest })
            return nextInQueue()
        }
        ;[next, ...rest] = [...poses, ...rest]
    }
    patch({ queue: rest })
    // Show the next step at once; it starts after a beat so the editor has released its generation lock.
    const st = S()
    STORE.set(x => ({ ...x, run: { id: shortId(), job: next.job, label: stepLabel(next.job, next.arg, st.setup, st.lib), attempt: 1, text: '', status: 'starting', message: '', mode: st.settings.mode } }))
    api.v1.timers.setTimeout(() => startJob(next.job, next.arg), 300)
}

async function cancelRun() {
    patch({ queue: [] })
    if (PENDING) {
        const run = PENDING
        PENDING = null
        await restoreParams(run)
        await clearScratch(run)
        setRun({ status: 'cancelled', message: 'Stopped.' })
        return
    }
    if (ACTIVE) {
        ACTIVE.cancelled = true
        if (ACTIVE.signal) await ACTIVE.signal.cancel()
        setRun({ message: 'Stopping…' })
    }
}

/** The whole chain for a setup: plan (when there's an idea and no plan yet), scene, every pose, prose. */
function runAll() {
    const s = S()
    const steps: { job: JobId; arg: JobArg }[] = []
    if (!s.setup.brief.moment && s.setup.idea.trim()) steps.push({ job: 'brief', arg: {} })
    steps.push({ job: 'scene', arg: {} }, { job: 'pose', arg: { castId: '*' } }, { job: 'prose', arg: {} })
    patch({ queue: steps })
    nextInQueue()
}

/** Keep the last answer as an example for its step (input without the menu). */
async function keepLast() {
    const last = S().last
    if (!last || last.failed) return
    const input = last.input.split(/\n\nMENU:/)[0].trim()
    const output = last.job === 'prose' ? last.preview : cleanModelText(last.raw)
    await saveExample({ id: shortId(), job: last.job, tags: last.tags, input, output })
}
