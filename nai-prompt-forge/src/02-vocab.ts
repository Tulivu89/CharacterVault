// ============================================================================
// Vocabulary: the Danbooru/e621 tag tables the model can't search for itself.
// VOCAB_DATA is generated from data/vocab.json by the build (00-vocab-data.ts).
// ============================================================================

interface VocabData {
    source: string
    general: Record<string, string>
    artists: string
    copyright: string
    aliases: Record<string, string>
    vault: Record<string, string>
    menuHide: string[]
}

interface TagInfo {
    tag: string
    count: number
    cats: string[]
}

/** Category groups used by menus and checks. Keys are Waifoundry's categories. */
const CAT = {
    hair: ['hairColor', 'hairLength', 'hairStyle', 'bangs', 'hairDetail'],
    eyes: ['eyeColor', 'eyeDetail'],
    face: ['faceDetail', 'makeup'],
    head: ['species', 'ears', 'horns', 'wings', 'tail', 'traits'],
    skin: ['skinTone', 'skinDetail'],
    body: ['neck', 'build', 'chest', 'arms', 'hands', 'nails', 'waist', 'hips', 'legs', 'feet'],
    outfit: ['theme', 'headwear', 'eyewear', 'neckwear', 'top', 'outer', 'gloves', 'bottom', 'legwear', 'footwear', 'carry'],
    scene: ['setting', 'lighting'],
    camera: ['composition'],
    state: ['pose', 'expression', 'eyeDetail'],
    actions: ['actions', 'position'],
    nsfw: ['nsfw', 'actionsNsfw'],
    furry: ['f_species', 'f_form', 'f_gender', 'f_covering', 'f_markings', 'f_head', 'f_body', 'f_limbs', 'f_tail'],
    furryNsfw: ['f_nsfw'],
    style: ['style'],
    meta: ['count', 'quality', 'negative', 'comic', 'name'],
}

/** Appearance categories: tags from these belong in a character box, not the base prompt (SKILL §6). */
const APPEARANCE_CATS = new Set([...CAT.hair, 'eyeColor', ...CAT.face, ...CAT.skin, ...CAT.body, ...CAT.outfit, 'ears', 'horns', 'wings', 'tail'])

class Vocab {
    private map = new Map<string, TagInfo>()
    private byCat = new Map<string, TagInfo[]>()
    artists = new Map<string, number>()
    copyrights = new Map<string, number>()
    aliases = new Map<string, string>()
    vaultCats = new Map<string, string[]>()
    menuHide: string[] = []
    source = ''

    constructor(data: VocabData) {
        this.source = data.source
        for (const [cat, packed] of Object.entries(data.general)) {
            const list: TagInfo[] = []
            for (const item of packed ? packed.split('|') : []) {
                const i = item.lastIndexOf(':')
                const tag = item.slice(0, i)
                const count = parseInt(item.slice(i + 1), 36) || 0
                let info = this.map.get(tag)
                if (!info) {
                    info = { tag, count, cats: [] }
                    this.map.set(tag, info)
                }
                info.count = Math.max(info.count, count)
                info.cats.push(cat)
                list.push(info)
            }
            this.byCat.set(cat, list)
        }
        for (const [name, map] of [
            [data.artists, this.artists],
            [data.copyright, this.copyrights],
        ] as [string, Map<string, number>][]) {
            for (const item of name ? name.split('|') : []) {
                const i = item.lastIndexOf(':')
                map.set(item.slice(0, i), parseInt(item.slice(i + 1), 36) || 0)
            }
        }
        for (const [k, v] of Object.entries(data.aliases)) this.aliases.set(k, v)
        for (const [k, v] of Object.entries(data.vault)) {
            const tags = v ? v.split('|') : []
            this.vaultCats.set(k, tags)
            for (const t of tags) {
                if (!this.map.has(t)) this.map.set(t, { tag: t, count: 0, cats: ['vault'] })
            }
        }
        this.menuHide = data.menuHide || []
    }

    get(tag: string): TagInfo | undefined {
        return this.map.get(tag)
    }

    has(tag: string): boolean {
        return this.map.has(tag)
    }

    /** The canonical spelling of an alias, or the tag itself. */
    canon(tag: string): string {
        return this.aliases.get(tag) || tag
    }

    inCats(tag: string, cats: string[]): boolean {
        const info = this.map.get(tag)
        return !!info && info.cats.some(c => cats.includes(c))
    }

    category(cat: string): TagInfo[] {
        return this.byCat.get(cat) || []
    }

    /** Close spellings for an unknown tag (plural/singular, edit distance ≤2), most-used first. */
    suggest(tag: string, limit = 3): string[] {
        const out: TagInfo[] = []
        const variants = [tag.replace(/s$/, ''), tag + 's', tag.replace(/-/g, ' '), tag.replace(/ /g, '-')]
        for (const v of variants) {
            const hit = this.map.get(v) || (this.aliases.has(v) ? this.map.get(this.aliases.get(v)!) : undefined)
            if (hit && !out.includes(hit)) out.push(hit)
        }
        if (out.length < limit && tag.length >= 4) {
            for (const info of this.map.values()) {
                if (Math.abs(info.tag.length - tag.length) > 2) continue
                if (info.tag[0] !== tag[0]) continue
                if (editDistance(info.tag, tag, 2) <= 2 && !out.includes(info)) out.push(info)
                if (out.length >= 12) break
            }
        }
        return out
            .sort((a, b) => b.count - a.count)
            .slice(0, limit)
            .map(i => i.tag)
    }

    /** True when a menu should hide the tag (the user's hidden list; `*` is a wildcard). */
    hidden(tag: string, hide: string[]): boolean {
        return hide.some(h => {
            if (h.endsWith('*')) return tag.startsWith(h.slice(0, -1))
            return tag === h || tag.split(' ').includes(h)
        })
    }

    /**
     * A menu for the model: one line per category, most-used tags first.
     * `perCat` caps each line so a menu stays a few hundred tokens.
     */
    menu(cats: { cat: string; label: string }[], perCat: number, hide: string[], exclude: Set<string> = new Set()): { text: string; allowed: Set<string> } {
        const allowed = new Set<string>()
        const linesOut: string[] = []
        for (const { cat, label } of cats) {
            const tags = this.category(cat)
                .filter(i => !this.hidden(i.tag, hide) && !exclude.has(i.tag))
                .slice(0, perCat)
                .map(i => i.tag)
            if (!tags.length) continue
            tags.forEach(t => allowed.add(t))
            linesOut.push(`${label}: ${tags.join(', ')}`)
        }
        return { text: linesOut.join('\n'), allowed }
    }

    artistCount(name: string): number | undefined {
        return this.artists.get(name)
    }

    copyrightCount(name: string): number | undefined {
        return this.copyrights.get(name)
    }
}

let VOCAB_INSTANCE: Vocab | null = null

function vocab(): Vocab {
    if (!VOCAB_INSTANCE) VOCAB_INSTANCE = new Vocab(VOCAB_DATA)
    return VOCAB_INSTANCE
}
