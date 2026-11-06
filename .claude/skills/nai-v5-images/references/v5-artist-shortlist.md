# V5 Artist Tag Shortlist

Well-attested artist tags for NovelAI Diffusion V5. Prefer these over arbitrary picks; treat anything outside this list as experimental.

**Syntax reminder:** emit as `artist:name` with the literal prefix. Keep parenthetical disambiguators. Underscores and spaces both work — spaces shown here to match V5 community convention.

**Confidence key**
- **V5** — appears in a V5-labelled gallery or comparison test
- **V4.5** — well-attested on V4.5, not yet verified on V5

Post counts are approximate magnitudes, not exact.

## V5-confirmed

| Tag | Style | Posts |
|---|---|---|
| `artist:yoshimizu kagami` | Simple clean moe (Lucky Star) | high |
| `artist:shiromanta` | Simple flat comedic (senpai/kouhai) | mid |
| `artist:mery (yangmalgage)` | Delicate detailed pretty-girl | mid |
| `artist:wagashi (dagashiya)` | Clean cute character style | mid |
| `artist:atahuta` | Painterly, detailed | mid |
| `artist:mx2j` | Soft rendered anime | mid |
| `artist:sumiyao (amam)` | Soft delicate illustration | mid |
| `artist:karameru` | Rendered social-media illustration style | mid |
| `artist:bee (deadflow)` | Detailed rendering | mid |
| `artist:ie (raarami)` | Soft clean anime | mid |

## V4.5-attested (likely carries to V5)

### Painterly / semi-realistic

| Tag | Style | Posts |
|---|---|---|
| `artist:wlop` | Painterly semi-realistic, cinematic soft glow | very high |
| `artist:ciloranko` | Vivid saturated, glossy rendering | high |
| `artist:ogipote` | Soft semi-realistic, muted watercolor feel | high |
| `artist:kawacy` | Western-influenced painterly, dramatic light | mid |
| `artist:kedama milk` | Lush painterly, rich color | mid |
| `artist:as109` | Glossy high-contrast, detailed | mid-high |
| `artist:cutesexyrobutts` | Bold thick-lined semi-realism | mid |
| `artist:tony taka` | Glossy semi-realistic bishoujo | high |

### Bright / vivid / pop

| Tag | Style | Posts |
|---|---|---|
| `artist:mika pikazo` | Bold neon color, pop character design | high |
| `artist:fuzichoco` | Bright fantasy, translucent color, sparkles | high |
| `artist:anmi` | Bright clean commercial illustration | high |
| `artist:atdan` | Flat vivid modern VTuber style | mid-high |
| `artist:wada arco` | Bright detailed (Fate) | high |

### Soft / moe / pastel

| Tag | Style | Posts |
|---|---|---|
| `artist:kantoku` | Soft moe, pastel light-novel | very high |
| `artist:hiten` | Delicate sparkly soft anime | high |
| `artist:ningen mame` | Detailed cute, warm painterly | high |
| `artist:mignon` | Soft glowing gradient shading | mid |
| `artist:kishida mel` | Soft translucent color | high |
| `artist:shigure ui` | Soft cute pastel | mid |
| `artist:rella` | Elegant flowing, soft-detailed | high |

### Clean lineart / modern anime

| Tag | Style | Posts |
|---|---|---|
| `artist:ask (askzy)` | Clean modern anime, crisp lineart | high |
| `artist:watanabe akio` | Distinctive rounded eyes (Monogatari) | high |
| `artist:40hara` | Retro-flavored clean anime | mid |
| `artist:tsukudani norio` | Soft comedic anime | mid |

### Manga / shounen / josei

| Tag | Style | Posts |
|---|---|---|
| `artist:murata yuusuke` | Detailed shounen realism (One Punch Man) | high |
| `artist:yokoyari mengo` | Glossy sharp josei (Scum's Wish) | high |
| `artist:kishiro yukito` | Detailed sci-fi manga (Gunnm) | mid |
| `artist:oda tomohito` | Rounded comedic shounen (Komi-san) | mid |
| `artist:yoneyama mai` | Sketchy expressive, melancholic | high |

### Rounded / slice-of-life / chibi

| Tag | Style | Posts |
|---|---|---|
| `artist:namori` | Soft rounded slice-of-life (Yuru Yuri) | high |
| `artist:aoki ume` | Chibi-soft rounded (Hidamari Sketch) | mid |
| `artist:pochi (pochi-goya)` | Soft rounded ecchi | mid |

## Community-reported on V5 — western, comic and toon styles (channel, Sep 16–21)

Single-user reports, not tested here. Several sit below the ~100-post artist threshold on Danbooru or are absent from it; the reporter says they work, mostly inside mixes. Treat them as experimental.

| Tag | Report | Danbooru posts |
|---|---|---|
| `artist:tarakanovich` | Named among comic/animation/toon favourites; many of these need mixing | 551 |
| `artist:nvl` | Style comes through with the `artist:` prefix (plus `year 2026`); fails as a bare name | 483 |
| `artist:incase` | Distinct, but looks odd alone — mix it | 423 |
| `artist:obj shep` | Distinct, but looks odd alone — mix it | 316 |
| `artist:krystopher decker` | Looks bad raw; "a nice touch" at `0.4::` in a mix | 192 |
| `artist:dan mora` | Named among comic/animation/toon favourites | 146 |
| `artist:marceline2174` | Named among comic/animation/toon favourites | 100 |
| `artist:lesly oh` | Named among comic/animation/toon favourites | 78 |
| `artist:aleksandra skiba` | Named among comic/animation/toon favourites | 61 |
| `artist:emmanuel viola`, `artist:po-ar` | Reported working; `po-ar` odd alone | not on Danbooru |

## Usage notes

*Updated 2026-10-05 to match the project instructions. Earlier versions of this doc said "blend 2–4" and "place early"; those predate the 2026-08-24 emphasis fix and no longer hold.*

- **Blends work post-fix** — users report stable mixes of 6+ artists. Set every artist's weight explicitly; **0.35–0.85** is the common band, with one lead near 1. Most artist emphasis is downward.
- **Equal weights are the classic mistake.** At `1, 1, 1` whichever artist is inherently stronger wins at random, and no `artist collaboration` negative fixes it. One regular's shape is a lead at `1::` with the rest around `0.7::`, de-weighted further as artists are added.
- **How high to go is contested.** Two regulars never exceed 1.0–1.2; others run a lead at 5, and one reports individual tags surviving 60–80. Treat anything above ~1.5 as a deliberate experiment on a locked seed, and remember that a tag needing an absurd weight is usually in conflict with another tag.
- **One regular's three breakpoints** (added 2026-10-15): `1::` for the artist carrying the style, `0.7::` for sub-elements, `0.4::` for basic design elements such as body shape. Anything between those he treats as magic numbers, and he advises against overweighting artist tags at all. To place a new artist, add it alone on a locked seed and walk the weight up until something visibly changes.
- **V5's weights bite harder than V4.5's** — one user's rule of thumb is that `1.3::artist:name::` on V5 carries more than `2::artist:name::` did on V4.5. Another reason not to port a V4.5 mix, and a reason to start low.
- **Build the mix one artist at a time.** One mixer merges two artists, settles that, then adds the third against the result, so every name's contribution is known. The counter-example is a third-party blend tool's output — thirty or forty names at scattered weights: one regular argues those converge on a single generic AI look and can't be refined, because nobody can say what any entry does. A second user half-agrees on the unrefinability but notes that stability across images is exactly why those blends get used. Another regular caps himself at three artists, or describes the style in words instead.
- **An artist that "refuses completely"** despite a solid Danbooru presence sometimes starts working when you add a few tags characteristic of that artist's own posts — their usual subject, medium or palette — before you raise emphasis further.
- **A list of artist tags can read as a list of people.** One user's mixes kept putting stray extra faces in the background until they added `solo` to the base prompt.
- **If the mix holds on one seed and flips on the next**, specify the style further — era, medium, lineart, shading — rather than raising emphasis.
- **Prefixes:** `artist:` by default, since a bare name can read as content. One heavy mixer says the prefix is unnecessary and hurts blending, so dropping it is a cheap test when a mix won't fuse.
- **Randomized mixing is a real workflow:** one user keeps a randomizer of ~300 favourite artists and repeats it six times to draw six at random.
- **Place late** in the base prompt, just before the quality tags — community practice, not a strength rule: per Anlatan there is no inherent "earlier tags are stronger" behaviour in V5. Order within a mix matters, but not in a fixed direction — test both ends. One user found a thin artist tag landed only when placed after the character tag. One regular's working model is that earlier *tends* to carry more but is outweighed by how much training data each artist has, so a heavily-represented artist dominates from either position; a second user cut one such artist's influence by moving it to the end of the list, while others (the same regular elsewhere) say order is a distraction and only weights are worth tuning.
- Use Danbooru's own spelling and word order, surname first for Japanese artists (`artist:takahashi rumiko`, not "rumiko takahashi"), and keep any parenthetical handle. An artist's tag is built from what they post themselves, so a famous mangaka can have a thin tag; stacking the series' copyright tag with the artist tag carries the look better than either alone. Some names also have a `<name> (style)` general tag with more posts than the artist tag — untested, but cheap to try.
- `artist collaboration` at negative weight is optional, not boilerplate (updated 2026-09-26). It fixed a V4.5 problem — different characters in one image each adopting a different artist's style — that V5 doesn't have. Some users still run `-6::artist collaboration::` in every mix; others argue it was never necessary. A/B it on a locked seed and keep it only if it changes something you wanted changed.
- Tune on a locked seed in 0.05 steps, then re-check on a different seed; mixes shift when the background changes.
- **Quality tags and the UC preset can overpower artist style.** Turn Add Quality Tags off; for western artists, one user also drops the UC preset (keep a short custom UC if you do).
- **Use numeric weights** (`1.5::artist:name::`, `0.5::artist:name::`) rather than brackets.
- **Complexity interacts with style:** `low complexity` for flat/stylized, `high complexity` for normal rendering.
- **Signature-character bleed:** an artist tag can summon that artist's recurring character. Negative-prompting the character name helps only weakly.
- **Curated vs Full:** Curated frequently recognizes characters and anime styles that Full misses — try both before concluding an artist is absent.
- **Furry mode:** most e621 artist tags reportedly don't work.

## Caveat on the evidence

The largest V5-specific artist comparison currently available is a single-seed, single-author test of roughly 1,900 tags, supplemented by community galleries. These establish relative tendencies, not definitive quality rankings. Everything marked V4.5 is an assumption that V5 inherited the same style knowledge — usually safe, occasionally not, since prompts tuned on V4.5 are widely reported to render differently on V5.
