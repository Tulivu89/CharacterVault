// ============================================================================
// Small UI building blocks. JSX parts allow inline styles only (no <style>),
// so every look lives in the `st` object. Colors follow the NovelAI theme via
// its --theme-* custom properties, with fallbacks.
// ============================================================================

const th = (name: string, fallback: string) => `var(--theme-${name}, ${fallback})`

const C = {
    bg0: th('bg0', '#13151c'),
    bg1: th('bg1', '#1b1e28'),
    bg2: th('bg2', '#252a37'),
    bg3: th('bg3', '#323849'),
    text: th('textMain', '#e8e6f0'),
    head: th('textHeadings', '#f4e9c9'),
    dim: th('textDisabled', '#8a8fa3'),
    accent: th('textHighlight', '#f5c86b'),
    warn: th('warning', '#e0705c'),
}

const st = {
    app: { display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px', color: C.text, fontSize: '13px', lineHeight: '1.4', boxSizing: 'border-box', width: '100%' },
    row: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' },
    col: { display: 'flex', flexDirection: 'column', gap: '6px' },
    grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '6px 10px' },
    card: { background: C.bg1, border: `1px solid ${C.bg3}`, borderRadius: '6px', padding: '8px' },
    label: { fontSize: '11px', color: C.dim, textTransform: 'uppercase', letterSpacing: '0.04em' },
    hint: { fontSize: '11px', color: C.dim },
    input: { width: '100%', boxSizing: 'border-box', background: C.bg0, color: C.text, border: `1px solid ${C.bg3}`, borderRadius: '4px', padding: '5px 7px', font: 'inherit' },
    pre: { whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: C.bg0, border: `1px solid ${C.bg3}`, borderRadius: '4px', padding: '6px 8px', margin: 0, fontFamily: 'var(--theme-font-code, monospace)', fontSize: '12px', maxHeight: '260px', overflow: 'auto' },
    tab: (on: boolean) => ({ padding: '5px 10px', borderRadius: '4px 4px 0 0', border: `1px solid ${on ? C.bg3 : 'transparent'}`, borderBottom: 'none', background: on ? C.bg1 : 'transparent', color: on ? C.head : C.dim, cursor: 'pointer', font: 'inherit' }),
    btn: (kind: 'primary' | 'ghost' | 'danger' = 'ghost', disabled = false) => ({
        padding: '4px 10px',
        borderRadius: '4px',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        font: 'inherit',
        fontSize: '12px',
        border: `1px solid ${kind === 'primary' ? C.accent : kind === 'danger' ? C.warn : C.bg3}`,
        background: kind === 'primary' ? C.accent : 'transparent',
        color: kind === 'primary' ? C.bg0 : kind === 'danger' ? C.warn : C.text,
        whiteSpace: 'nowrap',
    }),
    level: (l: IssueLevel) => ({ color: l === 'error' ? C.warn : l === 'warn' ? C.accent : C.dim, fontWeight: l === 'info' ? 400 : 600 }),
}

function Btn(p: { onClick: () => void; children?: any; kind?: 'primary' | 'ghost' | 'danger'; disabled?: boolean; title?: string }) {
    return (
        <button type="button" style={st.btn(p.kind, p.disabled)} disabled={p.disabled} title={p.title} onClick={() => !p.disabled && p.onClick()}>
            {p.children}
        </button>
    )
}

function Field(p: { label: string; hint?: string; children?: any; wide?: boolean }) {
    return (
        <label style={{ ...st.col, gap: '2px', gridColumn: p.wide ? '1 / -1' : undefined }}>
            <span style={st.label}>{p.label}</span>
            {p.children}
            {p.hint ? <span style={st.hint}>{p.hint}</span> : null}
        </label>
    )
}

function TextIn(p: { value: string; onChange: (v: string) => void; placeholder?: string }) {
    return <input type="text" style={st.input} value={p.value || ''} placeholder={p.placeholder} onInput={e => p.onChange(String(e.target.value ?? ''))} />
}

function NumIn(p: { value: number; onChange: (v: number) => void; step?: number; min?: number; max?: number }) {
    return <input type="number" style={st.input} value={p.value} step={p.step ?? 1} min={p.min} max={p.max} onInput={e => p.onChange(parseFloat(String(e.target.value)) || 0)} />
}

function Area(p: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
    return <textarea style={{ ...st.input, resize: 'vertical' }} rows={p.rows ?? 3} value={p.value || ''} placeholder={p.placeholder} onInput={e => p.onChange(String(e.target.value ?? ''))} />
}

function Pick<T extends string>(p: { value: T; options: (T | [T, string])[]; onChange: (v: T) => void }) {
    return (
        <select style={st.input} value={p.value} onChange={e => p.onChange(String(e.target.value) as T)}>
            {p.options.map(o => {
                const [v, l] = Array.isArray(o) ? o : [o, o || '—']
                return (
                    <option value={v} selected={v === p.value}>
                        {l}
                    </option>
                )
            })}
        </select>
    )
}

function Check(p: { checked: boolean; onChange: (v: boolean) => void; label: string; title?: string }) {
    return (
        <label style={{ ...st.row, gap: '4px', cursor: 'pointer' }} title={p.title}>
            <input type="checkbox" checked={!!p.checked} onChange={e => p.onChange(!!e.target.checked)} />
            <span>{p.label}</span>
        </label>
    )
}

function Panel(p: { title: string; children?: any; right?: any; startOpen?: boolean; id?: string }) {
    const [open, setOpen] = useState(p.startOpen !== false)
    return (
        <div style={st.card}>
            <div style={{ ...st.row, justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setOpen(!open)}>
                <strong style={{ color: C.head }}>
                    {open ? '▾' : '▸'} {p.title}
                </strong>
                <span onClick={(e: any) => e?.stopPropagation?.()}>{p.right}</span>
            </div>
            {open ? <div style={{ ...st.col, marginTop: '8px' }}>{p.children}</div> : null}
        </div>
    )
}

function CopyBlock(p: { title: string; text: string; what: string }) {
    return (
        <div style={st.col}>
            <div style={{ ...st.row, justifyContent: 'space-between' }}>
                <span style={{ ...st.label, color: C.head }}>{p.title}</span>
                <Btn onClick={() => copyText(p.text, p.what)}>Copy</Btn>
            </div>
            <pre style={st.pre}>{p.text || '—'}</pre>
        </div>
    )
}

function Issues(p: { issues: Issue[]; filter?: (i: Issue) => boolean }) {
    const [showInfo, setShowInfo] = useState(false)
    const list = p.issues.filter(p.filter || (() => true))
    const shown = list.filter(i => showInfo || i.level !== 'info')
    const infos = list.filter(i => i.level === 'info').length
    if (!list.length) return <span style={st.hint}>No problems found.</span>
    return (
        <div style={st.col}>
            {shown.map(i => (
                <div>
                    <span style={st.level(i.level)}>{i.level === 'error' ? '✖' : i.level === 'warn' ? '▲' : '·'} </span>
                    <span style={st.hint}>{i.where}: </span>
                    {i.msg}
                </div>
            ))}
            {infos ? (
                <span style={{ ...st.hint, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setShowInfo(!showInfo)}>
                    {showInfo ? 'Hide' : 'Show'} {infos} note{infos === 1 ? '' : 's'}
                </span>
            ) : null}
        </div>
    )
}

/** 3×3 placement grid; the active cell is highlighted, a second click clears it. */
function PosGrid(p: { value: { x: number; y: number } | null; onChange: (v: { x: number; y: number } | null) => void }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 22px)', gap: '2px' }} title="Position in the frame (character box coordinates)">
            {GRID.y.map(y =>
                GRID.x.map(x => {
                    const on = !!p.value && Math.abs(p.value.x - x.v) < 0.05 && Math.abs(p.value.y - y.v) < 0.05
                    return (
                        <button
                            type="button"
                            title={`${x.l}, ${y.l}`}
                            style={{ width: '22px', height: '16px', padding: 0, borderRadius: '2px', border: `1px solid ${C.bg3}`, background: on ? C.accent : C.bg0, cursor: 'pointer' }}
                            onClick={() => p.onChange(on ? null : { x: x.v, y: y.v })}
                        />
                    )
                }),
            )}
        </div>
    )
}
