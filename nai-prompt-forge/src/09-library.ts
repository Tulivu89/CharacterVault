// ============================================================================
// Library storage in the Lorebook. Five categories, created disabled so their
// entries never reach story context; the script reads them itself. Every item
// is plain text in the formats from 07-library-data.ts.
// ============================================================================

const LIB_CATS = {
    sheets: 'Forge · Characters',
    styles: 'Forge · Styles',
    kits: 'Forge · Kits',
    examples: 'Forge · Examples',
    cards: 'Forge · Cards',
} as const
type LibCat = keyof typeof LIB_CATS

async function libCategories(create: boolean): Promise<Partial<Record<LibCat, string>>> {
    const out: Partial<Record<LibCat, string>> = {}
    const cats = await api.v1.lorebook.categories()
    for (const key of Object.keys(LIB_CATS) as LibCat[]) {
        const hit = cats.find(c => c.name === LIB_CATS[key])
        if (hit) out[key] = hit.id
        else if (create) out[key] = await api.v1.lorebook.createCategory({ id: api.v1.uuid(), name: LIB_CATS[key], enabled: false })
    }
    return out
}

async function canEditLorebook(ask: boolean): Promise<boolean> {
    try {
        if (await api.v1.permissions.has('lorebookEdit')) return true
        return ask ? await api.v1.permissions.request('lorebookEdit', 'Prompt Forge keeps characters, styles, examples and cards as Lorebook entries you can edit by hand. Its categories stay disabled, so they never enter story context.') : false
    } catch {
        return false
    }
}

async function loadLibrary(): Promise<void> {
    const lib: Library = { sheets: [], styles: [], kits: [], examples: [], cards: {} }
    let source: 'lorebook' | 'memory' = 'memory'
    try {
        const cats = await libCategories(false)
        if (Object.keys(cats).length) source = 'lorebook'
        if (cats.sheets) for (const e of await api.v1.lorebook.entries(cats.sheets)) lib.sheets.push({ ...sheetFromText(e.displayName || 'Character', e.text || '', e.id), entryId: e.id })
        if (cats.styles) for (const e of await api.v1.lorebook.entries(cats.styles)) lib.styles.push({ ...styleFromText(e.displayName || 'Style', e.text || '', e.id), entryId: e.id })
        if (cats.kits) for (const e of await api.v1.lorebook.entries(cats.kits)) lib.kits.push({ ...kitFromText(e.displayName || 'Kit', e.text || '', e.id), entryId: e.id })
        if (cats.examples)
            for (const e of await api.v1.lorebook.entries(cats.examples)) {
                const ex = exampleFromText(e.text || '', e.id)
                if (ex) lib.examples.push({ ...ex, entryId: e.id })
            }
        if (cats.cards)
            for (const e of await api.v1.lorebook.entries(cats.cards)) {
                const key = (e.displayName || '').replace(/^card:\s*/i, '').trim()
                if (key && e.text?.trim()) lib.cards[key] = e.text
            }
    } catch (e) {
        api.v1.error('Prompt Forge: reading the Lorebook failed', e)
    }
    // Characters saved while Lorebook editing was refused.
    const fallback = await api.v1.storyStorage.get(KEYS.sheets)
    if (Array.isArray(fallback)) for (const sh of fallback) if (!lib.sheets.some(x => x.id === sh.id)) lib.sheets.push(sh)
    patch({ lib: withBuiltins(lib), libSource: source })
}

async function upsertEntry(cat: LibCat, entryId: string | undefined, name: string, text: string): Promise<string> {
    const cats = await libCategories(true)
    if (entryId && (await api.v1.lorebook.entry(entryId))) {
        await api.v1.lorebook.updateEntry(entryId, { displayName: name, text })
        return entryId
    }
    return api.v1.lorebook.createEntry({ id: api.v1.uuid(), displayName: name, text, category: cats[cat], keys: [], enabled: true, forceActivation: false })
}

async function saveSheet(sheet: Sheet): Promise<void> {
    if (await canEditLorebook(true)) {
        const entryId = await upsertEntry('sheets', sheet.entryId, sheet.name, sheetToText(sheet))
        STORE.set(s => ({ ...s, lib: { ...s.lib, sheets: s.lib.sheets.map(x => (x.id === sheet.id ? { ...sheet, entryId } : x)) } }))
        toast(`Saved "${sheet.name}" to Lorebook → ${LIB_CATS.sheets}.`, 'success')
    } else {
        const all = S().lib.sheets.filter(x => !x.entryId)
        await api.v1.storyStorage.set(KEYS.sheets, all)
        toast(`Saved "${sheet.name}" in this story (Lorebook editing not allowed).`, 'warning')
    }
}

async function deleteSheet(sheet: Sheet): Promise<void> {
    if (sheet.entryId && (await canEditLorebook(true))) await api.v1.lorebook.removeEntry(sheet.entryId)
    STORE.set(s => ({ ...s, lib: { ...s.lib, sheets: s.lib.sheets.filter(x => x.id !== sheet.id) }, sheetId: null }))
    await api.v1.storyStorage.set(KEYS.sheets, S().lib.sheets.filter(x => !x.entryId))
}

async function saveExample(ex: Example): Promise<void> {
    if (!(await canEditLorebook(true))) return toast('Lorebook editing is needed to keep examples.', 'warning')
    const entryId = await upsertEntry('examples', ex.entryId, `${ex.job}: ${ex.tags.join(', ')}`.slice(0, 80), exampleToText(ex))
    STORE.set(s => ({ ...s, lib: { ...s.lib, examples: [...s.lib.examples.filter(x => x.id !== ex.id), { ...ex, entryId }] } }))
    toast('Kept as an example. The closest two go into future calls of this step.', 'success')
}

async function deleteExample(ex: Example): Promise<void> {
    if (ex.entryId && (await canEditLorebook(true))) await api.v1.lorebook.removeEntry(ex.entryId)
    STORE.set(s => ({ ...s, lib: { ...s.lib, examples: s.lib.examples.filter(x => x.id !== ex.id) } }))
}

/** Copy a built-in card into the Lorebook so it can be edited; the script then uses the Lorebook text. */
async function overrideCard(key: string): Promise<void> {
    if (!(await canEditLorebook(true))) return toast('Lorebook editing is needed to edit cards.', 'warning')
    const text = S().lib.cards[key] || builtinCard(key)
    await upsertEntry('cards', undefined, `Card: ${key}`, text)
    await loadLibrary()
    toast(`Card "${key}" is now in Lorebook → ${LIB_CATS.cards}. Edit it there.`, 'success')
}

async function resetCard(key: string): Promise<void> {
    if (!(await canEditLorebook(true))) return
    const cats = await libCategories(false)
    if (cats.cards) for (const e of await api.v1.lorebook.entries(cats.cards)) if ((e.displayName || '').replace(/^card:\s*/i, '').trim() === key) await api.v1.lorebook.removeEntry(e.id)
    await loadLibrary()
    toast(`Card "${key}" is back to the built-in text.`)
}

/** Write the built-in style blocks and kits as editable entries (skips names already there). */
async function seedLibrary(): Promise<void> {
    if (!(await canEditLorebook(true))) return toast('Lorebook editing is needed to seed the library.', 'warning')
    const cats = await libCategories(true)
    const have = new Set<string>()
    for (const c of [cats.styles, cats.kits]) if (c) for (const e of await api.v1.lorebook.entries(c)) have.add((e.displayName || '').toLowerCase())
    let n = 0
    for (const s of BUILTIN_STYLES) if (!have.has(s.name.toLowerCase())) (await upsertEntry('styles', undefined, s.name, styleToText(s)), n++)
    for (const k of BUILTIN_KITS) if (!have.has(k.name.toLowerCase())) (await upsertEntry('kits', undefined, k.name, kitToText(k)), n++)
    await loadLibrary()
    toast(n ? `Seeded ${n} styles and kits into the Lorebook.` : 'The Lorebook already has every built-in style and kit.', 'success')
}

async function exportLibrary(): Promise<void> {
    if (!(await ensurePerm('fileDownload', 'Prompt Forge saves your library and setups as a JSON file.'))) return
    const s = S()
    const data = { forge: 1, sheets: s.lib.sheets, styles: s.lib.styles.filter(x => x.entryId), kits: s.lib.kits.filter(x => x.entryId), examples: s.lib.examples, cards: s.lib.cards, setups: s.saved }
    await api.v1.file.save('prompt-forge-library.json', JSON.stringify(data, null, 1))
}

async function importLibrary(): Promise<void> {
    if (!(await ensurePerm('fileInput', 'Prompt Forge reads a library JSON file you pick.'))) return
    const text = (await api.v1.file.prompt({ accept: '.json,application/json' })) as string | void
    if (!text) return
    let data: any
    try {
        data = JSON.parse(text)
    } catch {
        return toast('That file is not JSON.', 'error')
    }
    if (!data || data.forge !== 1) return toast('That file is not a Prompt Forge library.', 'error')
    if (!(await canEditLorebook(true))) return toast('Lorebook editing is needed to import.', 'warning')
    for (const sh of data.sheets || []) await upsertEntry('sheets', undefined, sh.name, sheetToText(sh))
    for (const st of data.styles || []) await upsertEntry('styles', undefined, st.name, styleToText(st))
    for (const k of data.kits || []) await upsertEntry('kits', undefined, k.name, kitToText(k))
    for (const ex of data.examples || []) await upsertEntry('examples', undefined, `${ex.job}: ${(ex.tags || []).join(', ')}`, exampleToText(ex))
    for (const [k, v] of Object.entries(data.cards || {})) await upsertEntry('cards', undefined, `Card: ${k}`, String(v))
    if (data.setups) STORE.set(s => ({ ...s, saved: { ...s.saved, ...data.setups } }))
    await loadLibrary()
    toast('Library imported.', 'success')
}
