// Smoke test. Setup once: (cd test/smoke && npm install). Run: node test/smoke/harness.mjs dist/prompt-forge.js
// Smoke test: runs dist/prompt-forge.js against a mock NovelAI script API with real Preact in jsdom.
import { JSDOM } from 'jsdom'
import vm from 'node:vm'
import { readFileSync } from 'node:fs'
import * as preact from 'preact'
import * as hooks from 'preact/hooks'

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>')
globalThis.window = dom.window
globalThis.document = dom.window.document
globalThis.Node = dom.window.Node
globalThis.Event = dom.window.Event
globalThis.HTMLElement = dom.window.HTMLElement

const log = []
const errors = []
const sleep = ms => new Promise(r => setTimeout(r, ms))

// ---------------------------------------------------------------- preact globals the runtime provides
function createStore(initial) {
    let v = initial
    const subs = new Set()
    return {
        get: () => v,
        set: n => {
            v = typeof n === 'function' ? n(v) : n
            for (const s of [...subs]) s()
        },
        subscribe: fn => (subs.add(fn), () => subs.delete(fn)),
    }
}
function useStoreValue(store) {
    return hooks.useSyncExternalStore ? hooks.useSyncExternalStore(store.subscribe, store.get) : useStoreFallback(store)
}
function useStoreFallback(store) {
    const [, force] = hooks.useState(0)
    hooks.useEffect(() => store.subscribe(() => force(x => x + 1)), [store])
    return store.get()
}
Object.assign(globalThis, {
    h: preact.h,
    Fragment: preact.Fragment,
    render: preact.render,
    useState: hooks.useState,
    useMemo: hooks.useMemo,
    useRef: hooks.useRef,
    useEffect: hooks.useEffect,
    useCallback: hooks.useCallback,
    useReducer: hooks.useReducer,
    createStore,
    useStoreValue,
    useStore: s => [useStoreValue(s), s.set],
    useSetStore: s => s.set,
})

// ---------------------------------------------------------------- mock API
const storyStorage = new Map()
const lore = { cats: [], entries: [] }
let sections = [{ id: 1, text: 'Prompt Forge workspace' }]
let nextSection = 2
const registered = { ui: [], hooks: {} }
let genParams = { model: 'glm-4-6', temperature: 1, max_tokens: 300 }
let scriptGens = 0
const genLog = []
const bgCalls = []

const replies = {
    brief: [
        `**WHO:** girl, tall fox girl in tank top ; girl, girl in yellow jacket
WHERE: garage, indoors
WHEN: evening, sunset
LIGHT: sunset through the open door; work light on faces
CAMERA: cowboy shot, from side
MOMENT: fox girl ruffles hair of girl in yellow jacket, who sits sideways on the motorcycle
MOOD: playful ; annoyed
RATING: general`,
    ],
    scene: ['TAGS: indoors, evening, sunset, backlighting, light rays, garage\nBACKGROUND: detailed background'],
    pose: ['POSTURE: standing\nGESTURE: hand up\nEXPRESSION: grin\nGAZE: looking at another\nACT: headpat > girl in yellow jacket', 'POSTURE: sitting\nGESTURE: -\nEXPRESSION: pout\nGAZE: looking at another\nACT: -'],
    prose: ['She stands near the camera and grins.', 'Fox girl in tank top stands on left beside motorcycle, right hand on hair of girl in yellow jacket. Girl in yellow jacket sits sideways on motorcycle seat on right.'],
    lookHead: ['IDENTITY: fox girl, tall female\nHAIR: long hair, ponytail, red hair\nHAIR HIDDEN: -\nHEAD: fox ears, animal ear fluff\nEYES: green eyes\nFACE MARKS: freckles'],
}
function whichJob(messages) {
    const sys = messages[0]?.content || ''
    if (sys.includes('plan for ONE still image')) return 'brief'
    if (sys.includes('the place, the time and the light')) return 'scene'
    if (sys.includes('holds their body')) return 'pose'
    if (sys.includes('2 to 5 short sentences')) return 'prose'
    if (sys.includes('head and face as image tags')) return 'lookHead'
    return 'unknown'
}

async function simulateGeneration(scriptInitiated) {
    const H = registered.hooks
    const continuityId = 'c' + Math.random().toString(36).slice(2)
    const req = await H.onGenerationRequested?.({ continuityId, model: genParams.model, scriptInitiated })
    if (req?.stopGeneration) return genLog.push({ stopped: true })
    const before = await H.onBeforeContextBuild?.({ continuityId, model: genParams.model, dryRun: false, lorebookEntries: [['e1', { active: true, content: 'x' }]], systemPrompt: { active: true, content: 'sys' }, prefill: { active: true, content: '' }, memory: { active: true, content: '' }, authorsNote: { active: true, content: '' }, storyText: { active: true, content: 'story' } })
    let messages = [{ role: 'system', content: 'default' }, { role: 'user', content: 'story text' }]
    const built = await H.onContextBuilt?.({ continuityId, model: genParams.model, dryRun: false, messages })
    if (built?.messages) messages = built.messages
    const job = whichJob(messages)
    const reply = (replies[job] || ['?']).shift() || 'TAGS: -'
    genLog.push({ job, temperature: genParams.temperature, msgs: messages.length, storyTextOff: before?.storyText?.active === false })
    const chunks = reply.match(/[\s\S]{1,25}/g) || ['']
    let inserted = ''
    for (let i = 0; i < chunks.length; i++) {
        const r = await H.onResponse?.({ continuityId, text: [chunks[i]], logprobs: [], tokenIds: [[1]], final: i === chunks.length - 1, model: genParams.model })
        inserted += (r?.text ?? [chunks[i]]).join('')
        if (r?.stopGeneration) break
    }
    if (inserted) sections.push({ id: nextSection++, text: inserted })
    await H.onGenerationEnd?.({ continuityId, model: genParams.model })
}

const api = {
    v1: {
        log: (...a) => log.push(a.join(' ')),
        error: (...a) => (errors.push(a.map(x => (x && x.stack) || String(x)).join(' ')), log.push('ERROR ' + a.join(' '))),
        uuid: () => 'u' + Math.random().toString(36).slice(2),
        storyStorage: {
            get: async k => storyStorage.get(k),
            set: async (k, v) => void storyStorage.set(k, JSON.parse(JSON.stringify(v))),
            has: async k => storyStorage.has(k),
            remove: async k => void storyStorage.delete(k),
        },
        permissions: { has: async () => true, request: async () => true, list: async () => [] },
        clipboard: { writeText: async t => log.push('CLIP ' + t.slice(0, 40)) },
        timers: { setTimeout: async (fn, ms) => setTimeout(fn, Math.min(ms, 50)), sleep: ms => sleep(ms) },
        ui: {
            register: async ext => registered.ui.push(...ext),
            toast: async m => log.push('TOAST ' + m),
            part: { jsx: c => ({ type: 'jsx', ...c }) },
            extension: { scriptPanel: c => ({ type: 'scriptPanel', ...c }), toolbarButton: c => ({ type: 'toolbarButton', ...c }) },
            window: { open: async c => ({ close: async () => {}, isClosed: () => false, c }) },
            openPanel: async () => {},
        },
        hooks: { register: (name, fn) => (registered.hooks[name] = fn) },
        lorebook: {
            categories: async () => lore.cats,
            createCategory: async c => (lore.cats.push(c), c.id),
            entries: async cat => lore.entries.filter(e => !cat || e.category === cat),
            entry: async id => lore.entries.find(e => e.id === id) || null,
            createEntry: async e => (lore.entries.push(e), e.id),
            updateEntry: async (id, p) => Object.assign(lore.entries.find(e => e.id === id), p),
            removeEntry: async id => void (lore.entries = lore.entries.filter(e => e.id !== id)),
        },
        document: {
            sectionIds: async () => sections.map(s => s.id),
            appendParagraph: async p => void sections.push({ id: nextSection++, text: p.text || '' }),
            appendParagraphs: async ps => (log.push('APPEND ' + ps.length), ps.forEach(p => sections.push({ id: nextSection++, text: p.text || '' }))),
            removeParagraphs: async ids => (log.push('REMOVE ' + ids.length), void (sections = sections.filter(s => !ids.includes(s.id)))),
            transaction: async fn => fn(),
        },
        editor: {
            isBlocked: async () => false,
            generate: async () => {
                scriptGens++
                if (scriptGens > 3) throw new Error('capped without user action')
                setTimeout(() => simulateGeneration(true).catch(e => errors.push(e.stack)), 5)
            },
        },
        generationParameters: { get: async () => ({ ...genParams }), update: async p => void Object.assign(genParams, p) },
        script: { getAllowedInput: () => 5000, getAllowedOutput: () => 2000, countUncachedInputTokens: m => JSON.stringify(m).length / 4 },
        createCancellationSignal: async () => ({ cancelled: false, cancel: async () => {}, dispose() {} }),
        generate: async (msgs, params, cb) => { bgCalls.push(params); const t = 'TAGS: outdoors, night, moonlight, starry sky\nBACKGROUND: detailed background'; cb && cb([{ text: t }], false); return { choices: [{ text: t }] } },
        file: { save: async () => {}, prompt: async () => undefined },
    },
}
globalThis.api = api

// ---------------------------------------------------------------- load the script
const code = readFileSync(process.argv[2], 'utf8')
vm.runInThisContext(code, { filename: 'prompt-forge.js' })
await sleep(200)

const panel = registered.ui.find(e => e.type === 'scriptPanel')
const root = document.getElementById('root')
panel.content[0].onMount(root)
await sleep(50)

const text = () => root.textContent
const button = label => [...root.querySelectorAll('button')].find(b => b.textContent.trim().startsWith(label))
const click = async label => {
    const b = button(label)
    if (!b) throw new Error('no button: ' + label + '\n' + [...root.querySelectorAll('button')].map(x => x.textContent.trim()).join(' | '))
    scriptGens = 0 // a click is a user action
    b.click()
    await sleep(30)
}
const typeInto = async (placeholderStart, value) => {
    const el = [...root.querySelectorAll('textarea,input')].find(x => (x.placeholder || '').startsWith(placeholderStart))
    if (!el) throw new Error('no input ' + placeholderStart)
    el.value = value
    el.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
    await sleep(20)
}
const waitIdle = async (ms = 3000) => {
    const t0 = Date.now()
    while (Date.now() - t0 < ms) {
        const s = STORE.get()
        if ((!s.run || ['done', 'failed', 'cancelled', 'waiting'].includes(s.run.status)) && !s.queue.length) return
        await sleep(25)
    }
}

const results = []
const ok = (name, cond, detail) => results.push([cond ? 'PASS' : 'FAIL', name, cond ? '' : detail])

ok('panel renders', text().includes('Prompt Forge') && text().includes('Idea and plan'), text().slice(0, 200))
ok('enable banner shown', text().includes('Use this story'), '')
await click('Use this story')
ok('enabled', STORE.get().enabled === true, '')

await typeInto('My fox mechanic', 'my fox mechanic messing up her friend\'s hair in the shop at sunset')
ok('idea stored', STORE.get().setup.idea.includes('fox mechanic'), STORE.get().setup.idea)

await click('Run all steps')
let sends = 0
for (let i = 0; i < 6; i++) {
    await waitIdle(5000)
    const st = STORE.get()
    if (st.run?.status === 'waiting') {
        sends++
        scriptGens = 0 // Send is a user action
        await simulateGeneration(false)
        continue
    }
    if (!st.queue.length && st.run?.status !== 'starting') break
}
await sleep(300)
const s1 = STORE.get()
ok('brief made cast', s1.setup.cast.length === 2, s1.setup.cast)
ok('scene tags applied', s1.setup.scene.startsWith('indoors'), s1.setup.scene)
ok('pose applied', s1.setup.cast[0].state.posture === 'standing' && s1.setup.cast[1].state.posture === 'sitting', s1.setup.cast.map(c => c.state))
ok('interaction from pose', s1.setup.interactions.some(i => i.act === 'headpat'), s1.setup.interactions)
ok('prose retried and applied', s1.setup.prose.startsWith('Fox girl in tank top'), s1.setup.prose)
ok('prose took two attempts', genLog.filter(g => g.job === 'prose').length === 2, genLog.map(g => g.job))
ok('cap hit and Send continued the chain', sends >= 1, sends)
ok('story context swapped', genLog.every(g => g.stopped || g.storyTextOff), genLog)
ok('per-job temperature set', genLog.some(g => g.job === 'scene' && g.temperature === 0.4), genLog.map(g => [g.job, g.temperature]))
ok('params restored', genParams.temperature === 1 && genParams.max_tokens === 300, genParams)
ok('reply kept out of document', !sections.some(x => /TAGS:|POSTURE:/.test(x.text)), sections.map(x => x.text))
ok('document has blocks once', sections.filter(x => x.text === 'Base Prompt').length === 1 && sections.some(x => x.text.startsWith('2girls')), sections.map(x => x.text).slice(0, 14))
const baseLine = sections.find(x => x.text.startsWith('2girls'))?.text || ''
console.log('BASE:', baseLine)

// Output tab and copy
await click('Output')
ok('output tab shows base', text().includes('Base Prompt') && text().includes('2girls'), text().slice(0, 300))
await click('Copy all')
await sleep(30)
ok('copied', log.some(l => l.startsWith('CLIP')), log.slice(-5))

// Characters: create, build head via armed Send
await click('Characters')
await click('+ New')
await typeInto('Plain words', 'fox mechanic, tall, long red ponytail, green eyes, freckles')
await click('Head and face')
await waitIdle(3000)
const sh = STORE.get().lib.sheets[0]
ok('look built', sh && /fox girl/.test(sh.look.identity || '') && /red hair/.test(sh.look.hair || ''), sh && sh.look)
await click('Save to Lorebook')
await sleep(50)
ok('sheet in lorebook', lore.entries.some(e => e.text.includes('[look]')), lore.entries.map(e => e.displayName))
ok('forge categories disabled', lore.cats.every(c => c.enabled === false), lore.cats)

// Library seeding and reload
await click('Library')
await click('Seed built-in styles and kits')
await sleep(100)
ok('seeded styles', lore.entries.some(e => e.displayName === 'Painterly Comic v2'), lore.entries.length)
const s3 = STORE.get()
ok('library from lorebook', s3.libSource === 'lorebook' && s3.lib.sheets.length === 1, [s3.libSource, s3.lib.sheets.length])

// Send with no step armed: blocked
await simulateGeneration(false)
ok('send blocked when nothing armed', genLog[genLog.length - 1].stopped === true, genLog[genLog.length - 1])

// Armed step: Send runs it (and rerolls each press)
await click('Build')
replies.prose.push('Fox girl in tank top leans over girl in yellow jacket on right.')
const armBtns = [...root.querySelectorAll('button')].filter(b => b.textContent.trim() === '⏎')
armBtns[armBtns.length - 1].click() // the prose step's arm button
await sleep(30)
ok('armed prose', STORE.get().armed?.job === 'prose', STORE.get().armed)
await simulateGeneration(false)
await waitIdle(3000)
ok('Send ran armed step', STORE.get().setup.prose.startsWith('Fox girl in tank top leans'), STORE.get().setup.prose)
STORE.set(x => ({ ...x, armed: null }))

// Background mode uses api.v1.generate (budgeted) when the budget covers it
STORE.set(x => ({ ...x, settings: { ...x.settings, mode: 'background' } }))
await startJob('scene')
await waitIdle(3000)
ok('background path', bgCalls.length === 1 && STORE.get().setup.scene.startsWith('outdoors, night'), [bgCalls, STORE.get().setup.scene])
ok('background disables thinking', bgCalls[0]?.enable_thinking === false, bgCalls[0])
STORE.set(x => ({ ...x, settings: { ...x.settings, mode: 'editor' } }))

// Stop while waiting for Send
scriptGens = 99
await startJob('prose')
await sleep(100)
ok('capped start waits for Send', STORE.get().run?.status === 'waiting', STORE.get().run)
await cancelRun()
ok('cancel restores params', genParams.temperature === 1, genParams)
ok('cancelled', STORE.get().run?.status === 'cancelled', STORE.get().run)

// Kits, interactions, saving a setup
await click('Characters')
const kitSelect = [...root.querySelectorAll('select')].find(x => [...x.options].some(o => o.textContent.startsWith('add a face or body kit')))
kitSelect.value = 'kit-face-willow'
kitSelect.dispatchEvent(new dom.window.Event('change', { bubbles: true }))
await sleep(20)
await click('Apply kit')
const shk = STORE.get().lib.sheets[0]
ok('kit applied', /tsurime/.test(shk.look.faceShape || '') && /round face/.test(shk.uc), [shk.look.faceShape, shk.uc])
await click('Build')
await click('+ interaction')
ok('interaction row added', STORE.get().setup.interactions.length >= 2, STORE.get().setup.interactions)
await click('Output')
const before = sections.length
await click('Save setup')
await sleep(150)
ok('setup saved and archived', Object.keys(STORE.get().saved).length === 1 && sections.filter(x => x.text === 'Base Prompt').length === 2 && sections.length > before, [Object.keys(STORE.get().saved), sections.length])
await click('Settings')
ok('settings tab renders', text().includes('Run steps through'), text().slice(0, 200))

// First run of a packed story: forge.fresh clears the template text once
storyStorage.set('forge.fresh', true)
await firstRun()
ok('first run clears document', sections.length === 2 && sections[0].text === 'Prompt Forge workspace.' && storyStorage.get('forge.fresh') === false, sections.map(x => x.text))

// Persistence
await sleep(800)
ok('setup persisted', !!storyStorage.get('forge.setup')?.prose, [...storyStorage.keys()])

for (const r of results) console.log(r[0], r[1], r[0] === 'FAIL' ? JSON.stringify(r[2]).slice(0, 600) : '')
if (errors.length) console.log('SCRIPT ERRORS:\n' + errors.join('\n'))
console.log(log.filter(l => /APPEND|REMOVE|ERROR/.test(l)).join(' ; '))
const toasts = log.filter(l => l.startsWith('TOAST'))
console.log(toasts.slice(-8).join('\n'))
console.log(`${results.filter(r => r[0] === 'PASS').length}/${results.length} passed`)
process.exit(results.some(r => r[0] === 'FAIL') || errors.length ? 1 : 0)
