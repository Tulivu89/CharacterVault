// ============================================================================
// The Prompt Forge panel.
// ============================================================================

function App() {
    const s = useStoreValue(STORE)
    if (!s.ready) return <div style={st.app}>Loading Prompt Forge…</div>
    const tabs: [TabId, string][] = [
        ['build', 'Build'],
        ['output', 'Output'],
        ['looks', 'Characters'],
        ['library', 'Library'],
        ['settings', 'Settings'],
    ]
    return (
        <div style={st.app}>
            <Header s={s} />
            {!s.enabled ? <EnableBanner /> : null}
            <RunBar s={s} />
            <div style={{ ...st.row, gap: '2px', borderBottom: `1px solid ${C.bg3}` }}>
                {tabs.map(([id, label]) => (
                    <button type="button" style={st.tab(s.tab === id)} onClick={() => patch({ tab: id })}>
                        {label}
                    </button>
                ))}
            </div>
            {s.tab === 'build' ? <BuildTab s={s} /> : null}
            {s.tab === 'output' ? <OutputTab s={s} /> : null}
            {s.tab === 'looks' ? <LooksTab s={s} /> : null}
            {s.tab === 'library' ? <LibraryTab s={s} /> : null}
            {s.tab === 'settings' ? <SettingsTab s={s} /> : null}
        </div>
    )
}

function Header(p: { s: AppState }) {
    const { s } = p
    const busy = !!s.run && ['starting', 'running', 'parsing', 'waiting'].includes(s.run.status)
    return (
        <div style={{ ...st.row, justifyContent: 'space-between' }}>
            <div style={{ ...st.row, flex: '1 1 260px' }}>
                <strong style={{ color: C.head, fontSize: '15px' }}>Prompt Forge</strong>
                <div style={{ flex: '1 1 160px' }}>
                    <TextIn value={s.setup.title} onChange={v => editSetup(x => (x.title = v))} placeholder="Setup title" />
                </div>
            </div>
            <div style={st.row}>
                {s.armed ? (
                    <span style={st.hint} title="Pressing Send runs this step">
                        Send runs: <strong style={{ color: C.accent }}>{s.armed.label}</strong>{' '}
                        <span style={{ cursor: 'pointer' }} onClick={() => patch({ armed: null })}>
                            ✕
                        </span>
                    </span>
                ) : null}
                <Btn kind="primary" disabled={busy} onClick={runAll} title="Plan (if needed), scene tags, every pose, then prose">
                    Run all steps
                </Btn>
                <Btn disabled={!s.undo.length} onClick={undoLast} title={s.undo.length ? `Undo: ${s.undo[s.undo.length - 1].label}` : 'Nothing to undo'}>
                    Undo
                </Btn>
            </div>
        </div>
    )
}

function EnableBanner() {
    return (
        <div style={{ ...st.card, ...st.row, justifyContent: 'space-between', borderColor: C.accent }}>
            <span>
                Use this story as a Prompt Forge workspace? Send will then run the armed step, and stories without Forge are never touched.
            </span>
            <Btn kind="primary" onClick={() => patch({ enabled: true })}>
                Use this story
            </Btn>
        </div>
    )
}

/** Step button: runs now, or arms the step for Send with the ⏎ button. */
function StepBtn(p: { job: JobId; arg?: JobArg; label: string; s: AppState; primary?: boolean }) {
    const busy = !!p.s.run && ['starting', 'running', 'parsing', 'waiting'].includes(p.s.run.status)
    return (
        <span style={{ ...st.row, gap: '2px' }}>
            <Btn kind={p.primary ? 'primary' : 'ghost'} disabled={busy} onClick={() => startJob(p.job, p.arg || {})}>
                {p.label} ▶
            </Btn>
            <Btn disabled={busy} title="Arm: Send runs this step (Send isn't drawn from the script budget, and rerolls with each press)" onClick={() => patch({ armed: { job: p.job, arg: p.arg || {}, label: p.label }, enabled: true })}>
                ⏎
            </Btn>
        </span>
    )
}

function RunBar(p: { s: AppState }) {
    const { run, last } = p.s
    if (!run && !last) return null
    const busy = !!run && ['starting', 'running', 'parsing', 'waiting'].includes(run.status)
    return (
        <div style={{ ...st.card, borderColor: busy ? C.accent : C.bg3 }}>
            {run ? (
                <div style={{ ...st.row, justifyContent: 'space-between' }}>
                    <span>
                        <strong style={{ color: C.head }}>{run.label}</strong>
                        <span style={st.hint}>
                            {' '}
                            · {run.status}
                            {run.attempt > 1 ? ` · attempt ${run.attempt}` : ''} · {run.mode === 'editor' ? 'via Send' : 'background'}
                        </span>
                    </span>
                    <span style={st.row}>
                        {p.s.queue.length ? <span style={st.hint}>{p.s.queue.length} more queued</span> : null}
                        {busy ? (
                            <Btn kind="danger" onClick={cancelRun}>
                                Stop
                            </Btn>
                        ) : (
                            <Btn onClick={() => patch({ run: null, last: null })}>Close</Btn>
                        )}
                    </span>
                </div>
            ) : null}
            {run?.message ? <div style={{ ...st.hint, color: run.status === 'waiting' ? C.accent : C.dim }}>{run.message}</div> : null}
            {busy && run?.text ? <pre style={{ ...st.pre, maxHeight: '120px' }}>{run.text}</pre> : null}
            {!busy && last ? (
                <div style={{ ...st.col, marginTop: '6px' }}>
                    <pre style={{ ...st.pre, maxHeight: '160px' }}>{last.preview}</pre>
                    {last.problems.length ? (
                        <div style={st.col}>
                            {last.problems.map(x => (
                                <span style={st.hint}>▲ {x}</span>
                            ))}
                        </div>
                    ) : null}
                    <div style={st.row}>
                        {!last.applied && !last.failed ? (
                            <Btn kind="primary" onClick={applyLast}>
                                Apply
                            </Btn>
                        ) : null}
                        {last.applied ? <span style={st.hint}>Applied.</span> : null}
                        <Btn onClick={() => startJob(last.job, last.arg)}>Run again</Btn>
                        {!last.failed ? (
                            <Btn onClick={keepLast} title="Save this answer as an example; the closest two go into future calls of this step">
                                Keep as example
                            </Btn>
                        ) : null}
                        <Btn onClick={() => copyText(last.raw, 'the raw answer')}>Copy raw</Btn>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

// ---------------------------------------------------------------- Build tab

function BuildTab(p: { s: AppState }) {
    const { s } = p
    const x = s.setup
    const blocks = useMemo(() => assemble(x, s.lib), [x, s.lib])
    const style = s.lib.styles.find(st0 => st0.id === x.styleId)
    const bgOptions = ['', ...EXCLUSIVE_GROUPS.find(g => g.name === 'background')!.tags]
    const errors = blocks.issues.filter(i => i.level === 'error').length
    const warns = blocks.issues.filter(i => i.level === 'warn').length
    return (
        <div style={st.col}>
            <Panel title="1 · Idea and plan" right={<StepBtn job="brief" label="Plan the shot" s={s} primary />}>
                <Field label="Idea" hint="A sentence or two. The plan turns it into one frozen moment.">
                    <Area value={x.idea} rows={3} onChange={v => editSetup(d => (d.idea = v))} placeholder="My fox mechanic messing up her friend's hair in the shop at sunset…" />
                </Field>
                <div style={st.grid2}>
                    <Field label="Rating">
                        <Pick value={x.rating} options={RATINGS} onChange={v => editSetup(d => (d.rating = v))} />
                    </Field>
                    <Field label="Where">
                        <TextIn value={x.brief.where} onChange={v => editSetup(d => (d.brief.where = v))} />
                    </Field>
                    <Field label="When">
                        <TextIn value={x.brief.when} onChange={v => editSetup(d => (d.brief.when = v))} />
                    </Field>
                    <Field label="Light">
                        <TextIn value={x.brief.light} onChange={v => editSetup(d => (d.brief.light = v))} />
                    </Field>
                    <Field label="Moment" wide>
                        <TextIn value={x.brief.moment} onChange={v => editSetup(d => (d.brief.moment = v))} placeholder="Who does what to whom, right now" />
                    </Field>
                </div>
            </Panel>

            <Panel title="2 · Camera and canvas">
                <div style={st.grid2}>
                    <Field label="Framing">
                        <Pick value={x.framing} options={FRAMINGS} onChange={v => editSetup(d => (d.framing = v))} />
                    </Field>
                    <Field label="Vertical angle">
                        <Pick<VAngle> value={x.vAngle} options={[['', 'none'], 'from above', 'from below']} onChange={v => editSetup(d => (d.vAngle = v))} />
                    </Field>
                    <Field label="Horizontal angle">
                        <Pick<HAngle> value={x.hAngle} options={[['', 'none'], 'from side', 'from behind', 'straight-on']} onChange={v => editSetup(d => (d.hAngle = v))} />
                    </Field>
                    <Field label="Canvas">
                        <Pick<Canvas> value={x.canvas} options={[['portrait', 'Portrait 832×1216'], ['landscape', 'Landscape 1216×832'], ['square', 'Square 1024×1024']]} onChange={v => editSetup(d => (d.canvas = v))} />
                    </Field>
                    <Field label="Camera extras" hint="pov, dutch angle, foot focus, depth of field…" wide>
                        <TextIn value={x.camera} onChange={v => editSetup(d => (d.camera = v))} />
                    </Field>
                </div>
            </Panel>

            <Panel title="3 · Scene" right={<StepBtn job="scene" label="Pick scene tags" s={s} />}>
                <div style={st.grid2}>
                    <Field label="Key objects" hint="Standalone objects that need a tag up front">
                        <TextIn value={x.objects} onChange={v => editSetup(d => (d.objects = v))} />
                    </Field>
                    <Field label="Background (one)">
                        <Pick value={x.background} options={bgOptions.map(b => [b, b || 'none'] as [string, string])} onChange={v => editSetup(d => (d.background = v))} />
                    </Field>
                    <Field label="Scene tags" hint="Place, time, weather, light" wide>
                        <Area value={x.scene} rows={2} onChange={v => editSetup(d => (d.scene = v))} />
                    </Field>
                </div>
            </Panel>

            <Panel title={`4 · Cast (${x.cast.length})`} right={<AddCast s={s} />}>
                {x.cast.length ? null : <span style={st.hint}>No characters yet: add one from your saved looks, add a blank, or let the plan create them.</span>}
                {x.cast.map((c, i) => (
                    <CastCard s={s} c={c} i={i} />
                ))}
                {x.cast.length > 1 ? <Interactions s={s} /> : null}
            </Panel>

            <Panel title="5 · Prose" right={<StepBtn job="prose" label="Write prose" s={s} primary />}>
                <Area value={x.prose} rows={4} onChange={v => editSetup(d => (d.prose = v))} placeholder="2–5 plain sentences: placement, who does what, light." />
                <Issues issues={blocks.issues} filter={i => i.where === 'Base prose'} />
            </Panel>

            <Panel title="6 · Style and UC" startOpen={false}>
                <div style={st.grid2}>
                    <Field label="Style block">
                        <Pick value={x.styleId} options={[['', 'none (tags below)'], ...s.lib.styles.map(b => [b.id, b.name] as [string, string])]} onChange={v => editSetup(d => ((d.styleId = v), (d.addon = ''), (d.ucMode = v ? 'style' : 'lean')))} />
                    </Field>
                    {style?.addons.length ? (
                        <Field label="Theme add-on">
                            <Pick value={x.addon} options={[['', 'none'], ...style.addons.map(a => [a.name, a.name] as [string, string])]} onChange={v => editSetup(d => (d.addon = v))} />
                        </Field>
                    ) : null}
                    <Field label="Medium / style tags" hint="oil painting (medium), cel shading, toon (style)…">
                        <TextIn value={x.medium} onChange={v => editSetup(d => (d.medium = v))} />
                    </Field>
                    <Field label="Base UC">
                        <Pick<UcMode> value={x.ucMode} options={[['lean', 'Lean (default)'], ['human focus', 'Human Focus (anime polish)'], ['style', "Style block's UC"]]} onChange={v => editSetup(d => (d.ucMode = v))} />
                    </Field>
                    <Field label="Extra UC" hint="Only what you've watched go wrong">
                        <TextIn value={x.ucExtra} onChange={v => editSetup(d => (d.ucExtra = v))} />
                    </Field>
                    <Field label="Extra base tags">
                        <TextIn value={x.baseExtra} onChange={v => editSetup(d => (d.baseExtra = v))} />
                    </Field>
                    <Field label="Complexity">
                        <Pick value={x.complexity} options={['high complexity', 'medium complexity', 'low complexity', 'ultra complexity', ['', 'none']]} onChange={v => editSetup(d => (d.complexity = v))} />
                    </Field>
                    <Field label="Year tag">
                        <TextIn value={x.year} onChange={v => editSetup(d => (d.year = v))} />
                    </Field>
                </div>
                <div style={st.row}>
                    <Check checked={x.quality} onChange={v => editSetup(d => (d.quality = v))} label="Quality tags (very aesthetic, best quality)" />
                    <Check checked={x.stabilizer} onChange={v => editSetup(d => (d.stabilizer = v))} label="Stabilizer in character UC" title="A/B it on a locked seed; keep only if it helps" />
                    <Check checked={x.text} onChange={v => editSetup(d => (d.text = v))} label="Text in image" />
                </div>
            </Panel>

            <Panel title="7 · Image settings" startOpen={false}>
                <div style={st.grid2}>
                    <Field label="Model">
                        <Pick value={x.settings.model} options={['NovelAI Diffusion V5 Full (Anime)', 'NovelAI Diffusion V5 Curated (Anime)', 'NovelAI Diffusion V5 Full (Furry)']} onChange={v => editSetup(d => (d.settings.model = v))} />
                    </Field>
                    <Field label="Sampler">
                        <Pick value={x.settings.sampler} options={['Euler Ancestral', 'Euler', 'DPM++ 2M']} onChange={v => editSetup(d => (d.settings.sampler = v))} />
                    </Field>
                    <Field label="Steps">
                        <NumIn value={x.settings.steps} min={1} max={50} onChange={v => editSetup(d => (d.settings.steps = v))} />
                    </Field>
                    <Field label="Guidance" hint="4–6 common; 2.5–3.5 for stylized/western">
                        <NumIn value={x.settings.guidance} step={0.1} min={0} max={10} onChange={v => editSetup(d => (d.settings.guidance = v))} />
                    </Field>
                    <Field label="Seed">
                        <TextIn value={x.settings.seed} onChange={v => editSetup(d => (d.settings.seed = v))} />
                    </Field>
                </div>
            </Panel>

            <div style={{ ...st.row, justifyContent: 'space-between' }}>
                <span style={st.hint}>
                    {errors} error{errors === 1 ? '' : 's'}, {warns} warning{warns === 1 ? '' : 's'} · about {blocks.tokens} tokens in the base
                </span>
                <span style={st.row}>
                    <Btn onClick={() => patch({ tab: 'output' })}>See output</Btn>
                    <Btn onClick={() => renderLive().then(() => toast('Blocks written to the document.', 'success'))}>Write to document</Btn>
                </span>
            </div>
        </div>
    )
}

function AddCast(p: { s: AppState }) {
    const [pick, setPick] = useState('')
    const add = (sheet: Sheet | null, gender: Gender = 'girl') => editSetup(d => d.cast.push(castFromSheet(sheet, gender)), 'Add character')
    return (
        <span style={st.row}>
            {p.s.lib.sheets.length ? (
                <span style={{ width: '160px' }}>
                    <Pick value={pick} options={[['', 'saved look…'], ...p.s.lib.sheets.map(sh => [sh.id, sh.name] as [string, string])]} onChange={v => setPick(v)} />
                </span>
            ) : null}
            {pick ? <Btn onClick={() => (add(p.s.lib.sheets.find(sh => sh.id === pick) || null), setPick(''))}>Add</Btn> : null}
            <Btn onClick={() => add(null, 'girl')}>+ girl</Btn>
            <Btn onClick={() => add(null, 'boy')}>+ boy</Btn>
            <Btn onClick={() => add(null, 'other')}>+ other</Btn>
        </span>
    )
}

function CastCard(p: { s: AppState; c: CastMember; i: number }) {
    const { s, c, i } = p
    const sheet = s.lib.sheets.find(sh => sh.id === c.sheetId)
    const ed = (fn: (m: CastMember) => void, undo?: string) =>
        editSetup(d => {
            const m = d.cast.find(y => y.id === c.id)
            if (m) fn(m)
        }, undo)
    const loadSheet = (id: string) => {
        const sh = s.lib.sheets.find(y => y.id === id) || null
        ed(m => {
            const fresh = castFromSheet(sh, m.gender)
            Object.assign(m, { ...fresh, id: m.id, state: m.state, mood: m.mood, position: m.position, label: sh?.label || m.label })
        }, 'Change look')
    }
    const setOutfit = (name: string) => {
        const o = sheet?.outfits.find(y => y.name === name)
        ed(m => ((m.outfitName = name), (m.outfit = { ...(o?.lines || {}) }), (m.outfitUc = o?.uc || '')))
    }
    return (
        <div style={{ ...st.card, background: C.bg2 }}>
            <div style={{ ...st.row, justifyContent: 'space-between' }}>
                <strong>
                    {i + 1}. {c.name || c.label || c.gender}
                </strong>
                <span style={st.row}>
                    <StepBtn job="pose" arg={{ castId: c.id }} label="Pick pose" s={s} />
                    <Btn disabled={i === 0} onClick={() => editSetup(d => d.cast.splice(i - 1, 0, d.cast.splice(i, 1)[0]))}>
                        ↑
                    </Btn>
                    <Btn kind="danger" onClick={() => editSetup(d => ((d.cast = d.cast.filter(y => y.id !== c.id)), (d.interactions = d.interactions.filter(it => it.actor !== c.id && it.target !== c.id))), 'Remove character')}>
                        ✕
                    </Btn>
                </span>
            </div>
            <div style={{ ...st.grid2, marginTop: '6px' }}>
                <Field label="Saved look">
                    <Pick value={c.sheetId || ''} options={[['', 'none'], ...s.lib.sheets.map(sh => [sh.id, sh.name] as [string, string])]} onChange={loadSheet} />
                </Field>
                <Field label="Label in prose" hint="One visible feature, never a name">
                    <TextIn value={c.label} onChange={v => ed(m => (m.label = v))} />
                </Field>
                <Field label="Box starts with">
                    <Pick<Gender> value={c.gender} options={['girl', 'boy', 'other']} onChange={v => ed(m => (m.gender = v))} />
                </Field>
                {sheet && sheet.outfits.length > 1 ? (
                    <Field label="Outfit">
                        <Pick value={c.outfitName} options={sheet.outfits.map(o => [o.name, o.name] as [string, string])} onChange={setOutfit} />
                    </Field>
                ) : null}
                <Field label="Mood" hint={moodCues(c.mood) ? `→ ${moodCues(c.mood)}` : 'grief, shame, defiant, aroused, smug, playful…'}>
                    <TextIn value={c.mood} onChange={v => ed(m => (m.mood = v))} />
                </Field>
                <Field label="Posture">
                    <TextIn value={c.state.posture} onChange={v => ed(m => (m.state.posture = v))} />
                </Field>
                <Field label="Gesture">
                    <TextIn value={c.state.gesture} onChange={v => ed(m => (m.state.gesture = v))} />
                </Field>
                <Field label="Expression">
                    <TextIn value={c.state.expression} onChange={v => ed(m => (m.state.expression = v))} />
                </Field>
                <Field label="Gaze">
                    <TextIn value={c.state.gaze} onChange={v => ed(m => (m.state.gaze = v))} />
                </Field>
                <Field label="Other state tags">
                    <TextIn value={c.state.extra} onChange={v => ed(m => (m.state.extra = v))} />
                </Field>
                <Field label="Extra character UC">
                    <TextIn value={c.uc} onChange={v => ed(m => (m.uc = v))} />
                </Field>
            </div>
            <div style={{ ...st.row, marginTop: '6px', justifyContent: 'space-between' }}>
                <span style={st.row}>
                    <span style={st.label}>Position</span>
                    <PosGrid value={c.position} onChange={v => ed(m => (m.position = v))} />
                    <span style={st.hint}>{c.position ? positionGloss(c.position.x, c.position.y) : 'auto'}</span>
                </span>
                <Check checked={c.noTrim} onChange={v => ed(m => (m.noTrim = v))} label="No framing trims" />
            </div>
            {!sheet && !Object.values(c.look).some(Boolean) ? (
                <span style={st.hint}>
                    No look yet.{' '}
                    <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => newSheetFromCast(c)}>
                        Build one in Characters
                    </span>
                </span>
            ) : null}
        </div>
    )
}

function newSheetFromCast(c: CastMember) {
    const sh = { ...blankSheet(), name: c.label || 'New character', label: c.label || c.gender, gender: c.gender }
    STORE.set(s => ({
        ...s,
        lib: { ...s.lib, sheets: [...s.lib.sheets, sh] },
        sheetId: sh.id,
        tab: 'looks',
        setup: { ...s.setup, cast: s.setup.cast.map(m => (m.id === c.id ? { ...m, sheetId: sh.id } : m)) },
    }))
}

function Interactions(p: { s: AppState }) {
    const x = p.s.setup
    const who = x.cast.map(c => [c.id, c.label || c.gender] as [string, string])
    return (
        <div style={st.col}>
            <div style={{ ...st.row, justifyContent: 'space-between' }}>
                <span style={st.label}>Interactions (source# / target# / mutual#)</span>
                <Btn onClick={() => editSetup(d => d.interactions.push({ id: shortId(), actor: d.cast[0].id, act: '', target: d.cast[1]?.id || '', mutual: false }))}>+ interaction</Btn>
            </div>
            {x.interactions.map(it => {
                const ed = (fn: (i: Interaction) => void) =>
                    editSetup(d => {
                        const t = d.interactions.find(y => y.id === it.id)
                        if (t) fn(t)
                    })
                return (
                    <div style={st.row}>
                        <span style={{ width: '150px' }}>
                            <Pick value={it.actor} options={who} onChange={v => ed(t => (t.actor = v))} />
                        </span>
                        <span style={{ width: '140px' }}>
                            <TextIn value={it.act} placeholder="headpat, hug, kiss…" onChange={v => ed(t => (t.act = v))} />
                        </span>
                        <span style={{ width: '150px' }}>
                            <Pick value={it.target} options={[['', 'nobody in frame'], ...who]} onChange={v => ed(t => (t.target = v))} />
                        </span>
                        <Check checked={it.mutual} onChange={v => ed(t => (t.mutual = v))} label="mutual" />
                        <Btn kind="danger" onClick={() => editSetup(d => (d.interactions = d.interactions.filter(y => y.id !== it.id)))}>
                            ✕
                        </Btn>
                    </div>
                )
            })}
        </div>
    )
}

// ---------------------------------------------------------------- Output tab

function OutputTab(p: { s: AppState }) {
    const { s } = p
    const b = useMemo(() => assemble(s.setup, s.lib), [s.setup, s.lib])
    const saved = Object.values(s.saved).sort((a, c) => a.title.localeCompare(c.title))
    return (
        <div style={st.col}>
            <Panel title="Checks">
                <Issues issues={b.issues} />
            </Panel>
            <div style={st.row}>
                <Btn kind="primary" onClick={() => copyText(blocksText(b, s.setup.title), 'every block')}>
                    Copy all
                </Btn>
                <Btn onClick={() => renderLive().then(() => toast('Blocks written to the document.', 'success'))}>Write to document</Btn>
                <Btn onClick={saveSetup}>Save setup</Btn>
            </div>
            <CopyBlock title="Model & Settings" text={b.settings} what="the settings" />
            <CopyBlock title="Base Prompt" text={b.base} what="the base prompt" />
            <CopyBlock title="Base UC" text={b.baseUc} what="the base UC" />
            {b.chars.map((c, i) => (
                <div style={{ ...st.card, ...st.col }}>
                    <CopyBlock title={c.title} text={c.prompt} what={`character ${i + 1}`} />
                    <CopyBlock title={`Character ${i + 1} UC`} text={c.uc} what={`character ${i + 1} UC`} />
                </div>
            ))}
            {b.notes.length ? (
                <Panel title="Notes" startOpen={false}>
                    {b.notes.map(n => (
                        <span style={st.hint}>• {n}</span>
                    ))}
                </Panel>
            ) : null}
            <Panel title={`Saved setups (${saved.length})`} startOpen={false} right={<Btn onClick={() => patch({ setup: blankSetup(), last: null, run: null })}>New setup</Btn>}>
                {saved.map(x => (
                    <div style={{ ...st.row, justifyContent: 'space-between' }}>
                        <span>{x.title}</span>
                        <span style={st.row}>
                            <Btn onClick={() => STORE.set(st0 => ({ ...st0, setup: clone(x), undo: [...st0.undo, { label: 'Load setup', setup: st0.setup }] }))}>Load</Btn>
                            <Btn onClick={() => STORE.set(st0 => ({ ...st0, setup: { ...clone(x), id: shortId(), title: `${x.title} (copy)` } }))}>Copy</Btn>
                            <Btn
                                kind="danger"
                                onClick={() =>
                                    STORE.set(st0 => {
                                        const next = { ...st0.saved }
                                        delete next[x.id]
                                        return { ...st0, saved: next }
                                    })
                                }
                            >
                                ✕
                            </Btn>
                        </span>
                    </div>
                ))}
            </Panel>
        </div>
    )
}

// ---------------------------------------------------------------- Characters tab

function LooksTab(p: { s: AppState }) {
    const { s } = p
    const sheet = s.lib.sheets.find(x => x.id === s.sheetId) || null
    const [desc, setDesc] = useState('')
    const [outfitIdx, setOutfitIdx] = useState(0)
    const [kit, setKit] = useState('')
    const ed = (fn: (x: Sheet) => void) => sheet && editSheet(sheet.id, fn)
    const add = () => {
        const sh = blankSheet()
        STORE.set(st0 => ({ ...st0, lib: { ...st0.lib, sheets: [...st0.lib.sheets, sh] }, sheetId: sh.id }))
    }
    return (
        <div style={st.col}>
            <div style={st.row}>
                <span style={{ flex: '1 1 200px' }}>
                    <Pick value={s.sheetId || ''} options={[['', s.lib.sheets.length ? 'pick a character…' : 'no characters yet'], ...s.lib.sheets.map(x => [x.id, x.name] as [string, string])]} onChange={v => (patch({ sheetId: v || null }), setOutfitIdx(0))} />
                </span>
                <Btn onClick={add}>+ New</Btn>
            </div>
            {!sheet ? (
                <span style={st.hint}>Characters are reusable looks, saved in Lorebook → {LIB_CATS.sheets}. Their names never go into a prompt; the label does the naming in prose.</span>
            ) : (
                <div style={st.col}>
                    <div style={st.grid2}>
                        <Field label="Name (never in prompts)">
                            <TextIn value={sheet.name} onChange={v => ed(x => (x.name = v))} />
                        </Field>
                        <Field label="Label in prose" hint="tall fox girl, girl in yellow jacket">
                            <TextIn value={sheet.label} onChange={v => ed(x => (x.label = v))} />
                        </Field>
                        <Field label="Box starts with">
                            <Pick<Gender> value={sheet.gender} options={['girl', 'boy', 'other']} onChange={v => ed(x => (x.gender = v))} />
                        </Field>
                    </div>
                    <Panel title="Build from a description">
                        <Area value={desc} rows={3} onChange={setDesc} placeholder="Plain words: species, build, hair, eyes, marks, clothes. The model picks real tags from menus, one part at a time." />
                        <div style={st.row}>
                            <StepBtn job="look" arg={{ sheetId: sheet.id, group: 'head', description: desc }} label="Head and face" s={s} />
                            <StepBtn job="look" arg={{ sheetId: sheet.id, group: 'body', description: desc }} label="Body" s={s} />
                            <StepBtn job="outfit" arg={{ sheetId: sheet.id, description: desc }} label="Outfit" s={s} />
                        </div>
                    </Panel>
                    <Panel title="Look (character standard, head to toe)">
                        <div style={st.row}>
                            <span style={{ flex: '1 1 200px' }}>
                                <Pick value={kit} options={[['', 'add a face or body kit…'], ...s.lib.kits.map(k => [k.id, k.name] as [string, string])]} onChange={setKit} />
                            </span>
                            {kit ? (
                                <Btn
                                    onClick={() => {
                                        const k = s.lib.kits.find(y => y.id === kit)
                                        if (k) STORE.set(st0 => ({ ...st0, undo: [...st0.undo, { label: `Kit ${k.name}`, sheet }], lib: { ...st0.lib, sheets: st0.lib.sheets.map(y => (y.id === sheet.id ? applyKit(y, k) : y)) } }))
                                        setKit('')
                                    }}
                                >
                                    Apply kit
                                </Btn>
                            ) : null}
                        </div>
                        <div style={st.grid2}>
                            {LOOK_SLOTS.map(sl => (
                                <Field label={sl.label} hint={sl.hint}>
                                    <Area value={sheet.look[sl.key] || ''} rows={1} onChange={v => ed(x => (x.look[sl.key] = v))} />
                                </Field>
                            ))}
                        </div>
                    </Panel>
                    <Panel title="Outfits">
                        <div style={st.row}>
                            {sheet.outfits.map((o, i) => (
                                <button type="button" style={st.tab(i === outfitIdx)} onClick={() => setOutfitIdx(i)}>
                                    {o.name}
                                </button>
                            ))}
                            <Btn onClick={() => (ed(x => x.outfits.push({ name: `Outfit ${x.outfits.length + 1}`, lines: {}, uc: '' })), setOutfitIdx(sheet.outfits.length))}>+ outfit</Btn>
                        </div>
                        {sheet.outfits[outfitIdx] ? (
                            <div style={st.grid2}>
                                <Field label="Outfit name">
                                    <TextIn value={sheet.outfits[outfitIdx].name} onChange={v => ed(x => (x.outfits[outfitIdx].name = v))} />
                                </Field>
                                {OUTFIT_SLOTS.map(sl => (
                                    <Field label={sl.label}>
                                        <TextIn value={sheet.outfits[outfitIdx].lines[sl.key] || ''} onChange={v => ed(x => (x.outfits[outfitIdx].lines[sl.key] = v))} />
                                    </Field>
                                ))}
                                <Field label="Outfit UC" hint="Garments this look must not grow" wide>
                                    <TextIn value={sheet.outfits[outfitIdx].uc} onChange={v => ed(x => (x.outfits[outfitIdx].uc = v))} />
                                </Field>
                                {sheet.outfits.length > 1 ? (
                                    <Btn kind="danger" onClick={() => (ed(x => x.outfits.splice(outfitIdx, 1)), setOutfitIdx(0))}>
                                        Delete outfit
                                    </Btn>
                                ) : null}
                            </div>
                        ) : null}
                    </Panel>
                    <div style={st.grid2}>
                        <Field label="Character UC" hint="Frame guard, face counter-UC, color drift. Age guard is added automatically above general rating.">
                            <Area value={sheet.uc} rows={3} onChange={v => ed(x => (x.uc = v))} />
                        </Field>
                        <Field label="Explicit layer" hint="Used only in explicit setups">
                            <Area value={sheet.explicit} rows={3} onChange={v => ed(x => (x.explicit = v))} />
                        </Field>
                    </div>
                    <div style={st.row}>
                        <Btn kind="primary" onClick={() => saveSheet(sheet)}>
                            Save to Lorebook
                        </Btn>
                        <Btn onClick={() => (editSetup(d => d.cast.push(castFromSheet(sheet)), 'Add character'), patch({ tab: 'build' }))}>Add to cast</Btn>
                        <Btn
                            onClick={() =>
                                editSetup(d =>
                                    d.cast.forEach(m => {
                                        if (m.sheetId !== sheet.id) return
                                        const fresh = castFromSheet(sheet, m.gender)
                                        m.look = fresh.look
                                        m.uc = fresh.uc
                                        m.explicit = fresh.explicit
                                        m.name = sheet.name
                                        const o = sheet.outfits.find(y => y.name === m.outfitName) || sheet.outfits[0]
                                        m.outfit = { ...(o?.lines || {}) }
                                        m.outfitUc = o?.uc || ''
                                    }),
                                    'Refresh cast',
                                )
                            }
                        >
                            Update cast copies
                        </Btn>
                        <Btn kind="danger" onClick={() => deleteSheet(sheet)}>
                            Delete
                        </Btn>
                    </div>
                </div>
            )}
        </div>
    )
}

// ---------------------------------------------------------------- Library tab

function LibraryTab(p: { s: AppState }) {
    const { s } = p
    const [view, setView] = useState('')
    return (
        <div style={st.col}>
            <div style={{ ...st.card, ...st.col }}>
                <span>
                    Library source: <strong>{s.libSource === 'lorebook' ? 'Lorebook (Forge categories)' : 'built-ins only'}</strong>. The Forge categories are created disabled, so nothing in them enters story context; the script picks what each step needs.
                </span>
                <div style={st.row}>
                    <Btn onClick={() => loadLibrary().then(() => toast('Library reloaded.'))}>Reload from Lorebook</Btn>
                    <Btn onClick={seedLibrary}>Seed built-in styles and kits</Btn>
                    <Btn onClick={exportLibrary}>Export JSON</Btn>
                    <Btn onClick={importLibrary}>Import JSON</Btn>
                </div>
            </div>
            <Panel title="Cards (what the model is told)" startOpen={false}>
                <span style={st.hint}>Each step's card is short on purpose. Copy one into the Lorebook to edit it; the script uses your text from then on.</span>
                {CARD_KEYS.map(k => {
                    const own = !!s.lib.cards[k.key]
                    return (
                        <div style={st.col}>
                            <div style={{ ...st.row, justifyContent: 'space-between' }}>
                                <span>
                                    {k.label} <span style={st.hint}>{own ? '· your Lorebook text' : '· built-in'}</span>
                                </span>
                                <span style={st.row}>
                                    <Btn onClick={() => setView(view === k.key ? '' : k.key)}>{view === k.key ? 'Hide' : 'View'}</Btn>
                                    {own ? <Btn onClick={() => resetCard(k.key)}>Reset</Btn> : <Btn onClick={() => overrideCard(k.key)}>Edit in Lorebook</Btn>}
                                </span>
                            </div>
                            {view === k.key ? <pre style={st.pre}>{s.lib.cards[k.key] || builtinCard(k.key)}</pre> : null}
                        </div>
                    )
                })}
            </Panel>
            <Panel title={`Examples (${s.lib.examples.length})`} startOpen={false}>
                <span style={st.hint}>Kept answers. The two closest (by rating, cast size and framing) replace the built-in example in that step's call.</span>
                {s.lib.examples.map(ex => (
                    <div style={{ ...st.row, justifyContent: 'space-between' }}>
                        <span>
                            <strong>{ex.job}</strong> <span style={st.hint}>{ex.tags.join(', ')}</span> — {ex.output.slice(0, 80)}
                            {ex.output.length > 80 ? '…' : ''}
                        </span>
                        <Btn kind="danger" onClick={() => deleteExample(ex)}>
                            ✕
                        </Btn>
                    </div>
                ))}
            </Panel>
            <Panel title={`Style blocks (${s.lib.styles.length})`} startOpen={false}>
                {s.lib.styles.map(b => (
                    <div style={st.col}>
                        <span>
                            <strong>{b.name}</strong> <span style={st.hint}>{b.entryId ? '· Lorebook' : '· built-in'} {b.note}</span>
                        </span>
                    </div>
                ))}
            </Panel>
            <Panel title={`Kits (${s.lib.kits.length})`} startOpen={false}>
                {s.lib.kits.map(k => (
                    <span>
                        {k.name} <span style={st.hint}>{k.entryId ? '· Lorebook' : '· built-in'}</span>
                    </span>
                ))}
            </Panel>
        </div>
    )
}

// ---------------------------------------------------------------- Settings tab

function SettingsTab(p: { s: AppState }) {
    const { s } = p
    const set = s.settings
    return (
        <div style={st.col}>
            <div style={{ ...st.card, ...st.col }}>
                <Check checked={s.enabled} onChange={v => patch({ enabled: v })} label="This story is a Prompt Forge workspace" title="Off: the script only acts on steps you start from the panel" />
                <div style={st.grid2}>
                    <Field label="Run steps through" hint="Send isn't drawn from the script token budget; background is, and falls back to Send when low">
                        <Pick value={set.mode} options={[['editor', 'Send (editor generation)'], ['background', 'Background (script budget)']]} onChange={v => setSettings({ mode: v as ForgeSettings['mode'] })} />
                    </Field>
                    <Field label="Model reply" hint="Scratch: if hidden capture misbehaves, replies stream into a paragraph that's removed after">
                        <Pick value={set.output} options={[['capture', 'Hidden (captured by the script)'], ['scratch', 'Scratch paragraph']]} onChange={v => setSettings({ output: v as ForgeSettings['output'] })} />
                    </Field>
                    <Field label="Send with no step armed">
                        <Pick value={set.sendWithNoStep} options={[['block', 'Do nothing (toast)'], ['normal', 'Generate normally']]} onChange={v => setSettings({ sendWithNoStep: v as ForgeSettings['sendWithNoStep'] })} />
                    </Field>
                    <Field label="Retries on a bad answer">
                        <NumIn value={set.retries} min={0} max={3} onChange={v => setSettings({ retries: clamp(Math.round(v), 0, 3) })} />
                    </Field>
                </div>
                <div style={st.row}>
                    <Check checked={set.autoApply} onChange={v => setSettings({ autoApply: v })} label="Apply answers automatically (Undo is always there)" />
                    <Check checked={set.liveDoc} onChange={v => setSettings({ liveDoc: v })} label="Rewrite the document blocks after each step" />
                </div>
            </div>
            <Panel title="Hidden from menus" startOpen={false}>
                <span style={st.hint}>Tags the model is never offered (one per line; * is a wildcard). Typing them yourself still works.</span>
                <Area value={set.hide.join('\n')} rows={4} onChange={v => setSettings({ hide: v.split('\n').map(t => t.trim()).filter(Boolean) })} />
                <div style={st.row}>
                    <Btn onClick={() => setSettings({ hide: uniq([...set.hide, ...vocab().menuHide]) })}>Add Waifoundry's default hidden list</Btn>
                </div>
            </Panel>
            <Panel title="Script budget (background mode only)" startOpen={false} right={<Btn onClick={refreshBudget}>Refresh</Btn>}>
                {s.budget ? (
                    <span>
                        Input {s.budget.input} · output {s.budget.output} tokens available now. It refills over time while you use the script.
                    </span>
                ) : (
                    <span style={st.hint}>Press Refresh.</span>
                )}
            </Panel>
            <div style={st.row}>
                <Btn kind="danger" onClick={() => {
                        clearDocument().then(ok => {
                            if (ok) toast('Document cleared.', 'success')
                        })
                    }} title="Removes every paragraph in this story, including archived setups">
                    Clear the document
                </Btn>
            </div>
            <span style={st.hint}>
                Vocab: {vocab().source} · {VOCAB_DATA.artists.split('|').length} artists for count checks.
            </span>
        </div>
    )
}
