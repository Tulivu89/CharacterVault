// ============================================================================
// The document as a copy desk: the current setup is rendered at the end of the
// story as labelled blocks; saved setups are archived above it.
// ============================================================================

interface DocState {
    live: number[]
}

function para(text: string, bold = false): Partial<Section> {
    return { text, formatting: bold && text ? [{ position: 0, length: text.length, data: 'bold' }] : [] }
}

function blockParas(b: Blocks, title: string, stamp = ''): Partial<Section>[] {
    const out: Partial<Section>[] = [para(`▌ ${title}${stamp ? ` · ${stamp}` : ''}`, true), para('Model & Settings', true), ...lines(b.settings).map(l => para(l)), para(''), para('Base Prompt', true), para(b.base), para(''), para('Base UC', true), para(b.baseUc)]
    b.chars.forEach((c, i) => {
        out.push(para(''), para(c.title, true), ...lines(c.prompt).map(l => para(l)), para(''), para(`Character ${i + 1} UC`, true), para(c.uc || '-'))
    })
    if (b.notes.length) out.push(para(''), para('Notes', true), ...b.notes.map(n => para(`• ${n}`)))
    out.push(para(''))
    return out
}

async function inTransaction(fn: () => Promise<void>) {
    const t = (api.v1.document as any).transaction
    if (typeof t === 'function') {
        try {
            await t(fn)
            return
        } catch {
            /* experimental API off: fall through */
        }
    }
    await fn()
}

async function readDocState(): Promise<DocState> {
    const st = await api.v1.storyStorage.get(KEYS.doc)
    return st && Array.isArray(st.live) ? st : { live: [] }
}

async function removeLive(st: DocState) {
    const ids = new Set(await api.v1.document.sectionIds())
    const existing = st.live.filter(id => ids.has(id))
    if (existing.length) await api.v1.document.removeParagraphs(existing)
    st.live = []
}

async function appendTracked(paras: Partial<Section>[]): Promise<number[]> {
    const before = new Set(await api.v1.document.sectionIds())
    await api.v1.document.appendParagraphs(paras)
    return (await api.v1.document.sectionIds()).filter(id => !before.has(id))
}

let renderChain: Promise<void> = Promise.resolve()

/** Render the current setup at the end of the document, replacing the previous render. Calls are serialised. */
function renderLive(): Promise<void> {
    renderChain = renderChain.then(renderLiveNow, renderLiveNow)
    return renderChain
}

async function renderLiveNow(): Promise<void> {
    if (!(await ensurePerm('documentEdit', 'Prompt Forge writes the finished blocks into this story so you can copy them.'))) return
    const s = S()
    const b = assemble(s.setup, s.lib)
    const st = await readDocState()
    await inTransaction(async () => {
        await removeLive(st)
        st.live = await appendTracked(blockParas(b, s.setup.title))
    })
    await api.v1.storyStorage.set(KEYS.doc, st)
}

/** Save the setup to the list and archive a frozen copy above the live render. */
function saveSetup(): Promise<void> {
    renderChain = renderChain.then(saveSetupNow, saveSetupNow)
    return renderChain
}

async function saveSetupNow(): Promise<void> {
    const s = S()
    const setup = clone(s.setup)
    STORE.set(st => ({ ...st, saved: { ...st.saved, [setup.id]: setup } }))
    if (!(await ensurePerm('documentEdit', 'Prompt Forge archives saved setups in this story.'))) return toast('Saved to the setup list.', 'success')
    const b = assemble(setup, s.lib)
    const st = await readDocState()
    const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ')
    await inTransaction(async () => {
        await removeLive(st)
        await api.v1.document.appendParagraphs(blockParas(b, setup.title, stamp))
        st.live = await appendTracked(blockParas(b, setup.title))
    })
    await api.v1.storyStorage.set(KEYS.doc, st)
    toast('Saved, and archived in the document.', 'success')
}
