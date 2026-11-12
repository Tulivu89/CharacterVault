// ============================================================================
// Entry point: hooks first (so they're in place before any generation), then
// state, the UI and the library.
// ============================================================================

let forgeWindow: { close: () => Promise<void>; isClosed: () => boolean } | null = null

function forgeRoot(id: string) {
    return api.v1.ui.part.jsx({
        id,
        onMount: (el: any) => render(<App />, el),
        // Keep typing in the panel from triggering editor hotkeys.
        captureEvents: ['keydown', 'keyup', 'keypress'],
    })
}

async function openForgeWindow() {
    if (forgeWindow && !forgeWindow.isClosed()) return
    forgeWindow = await api.v1.ui.window.open({
        id: 'forge-window',
        title: 'Prompt Forge',
        defaultWidth: 760,
        defaultHeight: '80%',
        minWidth: 420,
        resizable: true,
        content: [forgeRoot('forge-root-window')],
    })
}

registerHooks()
;(async () => {
    try {
        await loadState()
        await api.v1.ui.register([
            api.v1.ui.extension.scriptPanel({ id: 'forge-panel', name: 'Prompt Forge', iconId: 'image', content: [forgeRoot('forge-root-panel')] }),
            api.v1.ui.extension.toolbarButton({ id: 'forge-open', text: 'Forge', iconId: 'image', callback: () => openForgeWindow() }),
        ])
        await loadLibrary()
        refreshBudget()
        await firstRun()
    } catch (e) {
        api.v1.error('Prompt Forge failed to start', e)
    }
})()
