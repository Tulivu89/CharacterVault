// ============================================================================
// Small helpers shared by every module. No NovelAI API calls here, so the
// test bundle can run these under Node.
// ============================================================================

/** Emotes that keep their underscores (SKILL §7). */
const KEEP_UNDERSCORE = new Set(['@_@', '>_<', '^_^', 'o_o', '0_0', '=_=', '-_-', 'u_u', 'x_x', '+_+', '._.', ';_;', 't_t'])

/** Split a prompt field into comma-separated segments, keeping `a::b, c::` weight groups and `||a|b||` randomizers whole. */
function splitSegments(text: string): string[] {
    const out: string[] = []
    let buf = ''
    let inWeight = false
    let inRand = false
    for (let i = 0; i < text.length; i++) {
        const two = text.slice(i, i + 2)
        if (two === '||') {
            inRand = !inRand
            buf += two
            i++
            continue
        }
        if (two === '::') {
            // `1.2::` opens a group when the buffer ends in a number; a bare `::` closes it.
            const head = buf.trim()
            if (!inWeight && /(^|[\s,])-?\d*\.?\d+$/.test(head)) inWeight = true
            else if (inWeight) inWeight = false
            buf += two
            i++
            continue
        }
        const ch = text[i]
        if ((ch === ',' || ch === '\n') && !inWeight && !inRand) {
            if (buf.trim()) out.push(buf.trim())
            buf = ''
            continue
        }
        buf += ch
    }
    if (buf.trim()) out.push(buf.trim())
    return out
}

/** A segment is prose when it reads as a sentence: starts with a capital or holds a full stop between words. */
function isProse(seg: string): boolean {
    const s = seg.trim()
    if (!s) return false
    if (/^-?\d*\.?\d+::/.test(s)) return false
    if (/^(artist|character|copyright|species|rating|year|meta):/i.test(s)) return false
    if (/^[A-Z]/.test(s) && /\s/.test(s)) return true
    return /[a-z]\.\s+[A-Za-z]/.test(s) || /[a-z]\.$/.test(s) && s.split(/\s+/).length > 3
}

/** Split one slot line into its tags and its trailing prose (the standard: tags first, then at most one sentence). */
function splitLine(line: string): { tags: string[]; prose: string } {
    const segs = splitSegments(line)
    const tags: string[] = []
    const prose: string[] = []
    for (const s of segs) {
        if (prose.length) {
            prose.push(s)
            continue
        }
        // "colored tips. Red hair fades…": the last tag ends in a full stop and a sentence follows.
        const m = !/::/.test(s) && s.match(/^([^.]+)\.\s+([A-Z][\s\S]*)$/)
        if (m && !isProse(m[1])) {
            tags.push(m[1].trim())
            prose.push(m[2].trim())
            continue
        }
        if (isProse(s)) prose.push(s)
        else tags.push(s.replace(/\.$/, ''))
    }
    return { tags, prose: prose.join(', ') }
}

/** Basic tag normalisation: lowercase, underscores to spaces (except emotes), trimmed, single spaces. */
function normTag(tag: string): string {
    let t = tag.trim()
    if (!t) return t
    if (KEEP_UNDERSCORE.has(t.toLowerCase())) return t.toLowerCase()
    // keep weight syntax and prefixes intact, only touch the words
    t = t.replace(/_/g, ' ').replace(/\s+/g, ' ')
    return t.toLowerCase()
}

/** Strip a numeric weight wrapper: `1.2::tag::` → { weight: 1.2, inner: 'tag' }. */
function unweight(seg: string): { weight: number | null; inner: string } {
    const m = seg.match(/^(-?\d*\.?\d+)::([\s\S]*?)(::)?$/)
    if (!m) return { weight: null, inner: seg }
    return { weight: parseFloat(m[1]), inner: m[2].trim() }
}

function uniq<T>(arr: T[]): T[] {
    return Array.from(new Set(arr))
}

/** Join tag-ish segments into one prompt line: `a, b, c` with no doubled punctuation. */
function joinSegments(parts: (string | null | undefined | false)[]): string {
    const out: string[] = []
    for (const p of parts) {
        if (!p) continue
        const s = String(p).trim().replace(/^[,\s]+|[,\s]+$/g, '')
        if (s) out.push(s)
    }
    return out.join(', ')
}

/** Lines of a multi-line field, each kept, blank lines dropped. */
function lines(text: string | undefined | null): string[] {
    return String(text || '')
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
}

/** End a slot line with the punctuation the character standard wants: comma after tags, period after a sentence. */
function punctuateLine(line: string): string {
    const l = line.trim().replace(/[,\s]+$/, '')
    if (!l) return ''
    if (/[.!?]$/.test(l)) return l
    const { prose } = splitLine(l)
    return prose ? l + '.' : l + ','
}

/** Tags, then a sentence after a full stop: `red hair, colored tips. Red hair fades to white.` */
function tagsAndProse(tags: string, prose: string): string {
    const t = tags.trim().replace(/[,.\s]+$/, '')
    let p = prose.trim()
    if (p && !/[.!?]$/.test(p)) p += '.'
    if (t && p) return `${t}. ${p}`
    return t ? t + ',' : p
}

function clamp(n: number, lo: number, hi: number): number {
    return Math.max(lo, Math.min(hi, n))
}

function escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Levenshtein distance with an early exit above `max`. */
function editDistance(a: string, b: string, max = 3): number {
    if (Math.abs(a.length - b.length) > max) return max + 1
    const prev = new Array(b.length + 1)
    for (let j = 0; j <= b.length; j++) prev[j] = j
    for (let i = 1; i <= a.length; i++) {
        let diagonal = prev[0]
        prev[0] = i
        let rowMin = prev[0]
        for (let j = 1; j <= b.length; j++) {
            const tmp = prev[j]
            prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1))
            diagonal = tmp
            if (prev[j] < rowMin) rowMin = prev[j]
        }
        if (rowMin > max) return max + 1
    }
    return prev[b.length]
}

/** Rough token estimate for prompt-length warnings (the image model's tokenizer isn't exposed to scripts). */
function estimateTokens(text: string): number {
    const words = text.split(/[\s,]+/).filter(Boolean).length
    const punct = (text.match(/[,.:()]/g) || []).length
    return Math.round(words * 1.3 + punct * 0.5)
}

/** Strip reasoning blocks, code fences and chatty preambles from a model reply. */
function cleanModelText(text: string): string {
    let t = String(text || '')
    const end = t.lastIndexOf('</think>')
    if (end >= 0) t = t.slice(end + 8)
    t = t.replace(/<think>[\s\S]*$/g, '')
    t = t.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '')
    return t.trim()
}

function shortId(): string {
    return Math.random().toString(36).slice(2, 10)
}
