# Style Block Library (snapshot)

Snapshot of the "Style Block Library" doc (master copy: https://claude.ai/artifact/KedmFGUyBYsoHDN2mVctbn), synced 2026-10-26. Blocks are verbatim and paste-ready. If the doc and this file disagree, the doc wins; update this file when it changes.

## How to use

| Block | Parts | Status | Use it for |
| --- | --- | --- | --- |
| Vivid Pop v1 | base + UC | Stable | Saturated pinup-comic look; the elf references' look (bm94199, calm, obj shep) |
| Vivid Pop v2 (candidate) | base + UC + theme lines | Untested. Vault-only | v1 after a standards review: weighted lead artist, trimmed shading stack, style sentence, fuller UC. Test it against v1 on a locked seed |
| Vivid Pop v2 · Dark fantasy | v2 base + dark color line + UC | Untested. Vault-only | The swap-in for dark scenes, to compare with Painterly v2 · Dark fantasy |
| Painterly Comic v2 | base + 6 theme add-ons + UC | Stable | Western painterly look that holds faces best; one theme add-on per image |
| Painterly Comic v2 · Comic lean | base + the v2 add-ons + UC | Tested once (FB-02 ★) | Less paint, more comic line; holds tricky compositions better. Vault-only |
| Comic lean × Semireal | Comic lean base + add-on + semireal tail + UC | Tested once (FB-11 ✓) | Comic line with semireal skin and highlights; flesh and close-ups. Vault-only. Pushes men muscular |
| Anime Pinup v1 | base + UC | Stable | Gacha/Nikke polish; foundations for img2img and inpainting |
| Semirealistic mix v0 | base + UC | WIP | Semi-real pinup experiments |
| Cinematic Real v0 | base + UC | WIP | Photographic fantasy film still; artist slot before the tail |
| Cyber Comic (Style B) v1 | base + UC, color line per image | Vault-only | Cyberpunk comic look of the Castellane missionary set; not in the master doc yet |

- Base Prompt order: subject → scene → camera → state → prose → style base → theme add-on (Painterly only) → tail. Vivid Pop and Anime Pinup carry their own year/quality tail; Painterly ends with `year 2026, rating:general, high complexity`.
- The block's UC replaces the lean Base UC. Quality Tags toggle off, UC Preset None.
- Changing a block: lock a seed, change one thing, keep it only if it helps, bump the version, add a Changelog row.

## Vivid Pop — v1

Base
```
pinup (style), western comics (style), realistic shading, 1::artist:bm94199 ::, 1::artist:calm (artist)::, 1::artist:obj shep::, -2::monochrome, sketch, lineart::, 1.5::digital illustration::, 0.25::gradient skin, body creases::, vivid colors, sharp highlights, high contrast, two-tone shading, subsurface scattering, year 2026, high complexity, best quality, very aesthetic
```
UC
```
artist:yone kinji, artist:shichimenchou, lowres, adversarial noise, jpeg artifacts, photograph, flat color, worst quality, very displeasing,
```
- Add `rating:general` (or matching rating) before `year 2026`. Append `nsfw` to UC for SFW.

## Vivid Pop v2 (candidate)

Vault-only, untested; from the 2026-11-16 review of v1 against SKILL.md §14–17. v1 stays as written above until a locked-seed A/B shows a change helps.

**What the review found in v1**
- **Equal artist weights.** `bm94199`, `calm (artist)` and `obj shep` are all at `1::`, so whichever is strongest wins at random (§14). Lead one and drop the others to `0.7::`; the existing Review notes row already says so.
- **A contradiction inside the negation.** `-2::monochrome, sketch, lineart::` removes line art while `western comics (style)` asks for it (§7, contradictory tags smear). The `-2` is also the hardest weight in the block. Drop `lineart` from the group and soften it to `-1`.
- **A shading stack that argues with itself.** `realistic shading` and `subsurface scattering` (soft, volumetric) sit beside `two-tone shading` and `sharp highlights` (hard, graphic), plus `vivid colors` and `high contrast`. Six lighting words is the Semirealistic note's problem too (`two-tone` vs `gradient`). Keep the graphic pair and test the soft pair as an A/B.
- **Tags only, no anchor sentence.** Painterly v2 carries a short medium sentence that fixes the inking and shading. Vivid Pop has none, so its look depends on three artists alone.
- **No theme mechanism.** `vivid colors, high contrast` are baked in, which fights any dark or moody scene. Painterly v2's one-line add-ons (color and light, one per image) are the model; a dark scene needs its own swap.
- **Emphasis budget.** The block uses three weighted content groups (`-2::…::`, `1.5::digital illustration::`, `0.25::gradient skin, body creases::`), and a scene's own emphasis (`size difference`) makes four (§17, at most two or three). Cut the `0.25::` group first if a render smears.
- **UC is thin.** It lacks the lean default's `multiple views`, `artistic error`, `bad quality` and `too many watermarks`, and has nothing against the plastic skin that `subsurface scattering` and high gloss invite. `adversarial noise` is the odd entry: keep it only if you have seen it help.
- **Missing the tail's rating.** The block already notes "add `rating:general`"; v2 puts the rating in the tail so it can't be forgotten. Quality tags are kept at the two allowed (`best quality, very aesthetic`, last).
- **Not verified:** `verify count: bm94199, calm (artist), obj shep`. V5 trained on Danbooru and e621 only up to mid-2026, and the counts aren't in the vault.

**What other blocks could lend it**
- **Painterly v2:** the one-sentence medium anchor, and the theme-line mechanism (done below).
- **Comic lean:** a weighted lead plus a comic-line artist that "holds tricky compositions better". Test `0.6::artist:dan mora::` for two-body scenes.
- **Comic lean × Semireal:** `0.5::colored lineart::` in the tail to keep a line under the saturation, and the `2::plastic skin, fake skin::` negative if skin goes waxy. It also warns the style pushes men muscular, so keep a muscular guard in his UC.

Base (no theme)
```
pinup (style), western comics (style), 1::artist:bm94199 ::, 0.7::artist:calm (artist)::, 0.7::artist:obj shep::, -1::monochrome, sketch::, 1.5::digital illustration::, 0.25::gradient skin, body creases::, vivid colors, sharp highlights, high contrast, two-tone shading, Pinup comic illustration with saturated color fills, clean confident ink edges and crisp specular highlights on skin.
```
Tail (paste after the base or after a theme line)
```
year 2026, rating:explicit, high complexity, best quality, very aesthetic
```
UC (explicit; append `nsfw` for SFW)
```
artist:yone kinji, artist:shichimenchou, lowres, artistic error, adversarial noise, jpeg artifacts, photograph, flat color, worst quality, bad quality, very displeasing, multiple views, too many watermarks, plastic skin,
```
- Settings to start from: Euler Ancestral, karras, 20 steps, Guidance 5.0, Rescale 0.1 (the tested comic settings). If it over-sharpens or smears hands, try Guidance 3.5–4.5 (§5). Panels or split views: delete `multiple views`.

**Test ladder (lock a seed, change one thing, keep it only if it helps)**
1. Weights: `calm` and `obj shep` from `1::` to `0.7::`.
2. Negation: `-2::monochrome, sketch, lineart::` to `-1::monochrome, sketch::`.
3. Shading stack: drop `realistic shading` and `subsurface scattering` (A); or keep `0.5::subsurface scattering::` only (B).
4. Add the style sentence.
5. UC: the added entries.
6. Optional: `0.6::artist:dan mora::`; `0.5::colored lineart::` in the tail.

## Vivid Pop v2 · Dark fantasy

Vault-only, untested; the swap-in for the Delivery set's dark frames to compare with Painterly v2 · Dark fantasy on the same seed. It drops `vivid colors` (it fights a low-key scene) and `high contrast` moves into the dark line, so the saturation comes from jewel accents against deep black.

Base
```
pinup (style), western comics (style), 1::artist:bm94199 ::, 0.7::artist:calm (artist)::, 0.7::artist:obj shep::, -1::monochrome, sketch::, 1.5::digital illustration::, 0.25::gradient skin, body creases::, sharp highlights, two-tone shading, Pinup comic illustration with saturated color fills, clean confident ink edges and crisp specular highlights on skin. dark fantasy, high contrast, Low-key saturated color: deep black shadows with vivid jewel accents of teal, violet and amber, one warm light source carving form out of shadow, strong rim light on skin, heavy cast shadows.
```
Tail: `year 2026, rating:explicit, high complexity, best quality, very aesthetic`. UC: the Vivid Pop v2 UC above (it has no `dark, in shadows` to remove).
- Swap the jewel colors for the scene's own (for Echydna: teal, violet, amber; for a red-lit scene: crimson and gold).
- To test it on the Delivery frames: DEL-05, 07 and 08a with their own rolled seeds, only the style block and UC swapped.

## Painterly Comic — v2

Base
```
1.2::artist:lesly oh::, 1.7::artist:aleksandra skiba::, 1::artist:emmanuel viola::, 2::painterly, cel shading, colored lineart, western comics (style), oil painting (medium)::, Fantasy illustration blending crisp graphic-novel inking with loose painterly color. Thin elegant ink lines with tapering strokes define forms, while visible brushstrokes texture color fills. Shading falls in clear confident shapes with soft painted edges where light meets shadow.
```
Theme add-ons (pick one)

Jewel
```
high contrast, backlighting, light particles, depth of field, Saturated luminous color: rich jewel tones, warm light against cool shadow, glowing highlights, strong rim light separating figure from background.
```
Warm
```
Warm gentle color: honey, cream and soft terracotta, low contrast, warm light bouncing softly off nearby surfaces, light airy shadows.
```
Dark fantasy
```
dark fantasy, high contrast, Low-key color: deep blacks and cold desaturated blues, one warm light source carving form out of shadow, heavy cast shadows.
```
Court muted
```
Muted color: slate, pewter and bone with one rich accent color, soft diffuse light, gentle shadows.
```
Moonlit
```
Cool nocturnal color: indigo and silver-blue, pale moonlight edging forms, deep soft shadows.
```
Golden hour
```
Golden-hour color: amber, rose and violet, low sunlight raking across forms, warm highlights with purple shadows.
```
UC
```
1::artist:urushihara satoshi, artist:shirow masamune,::, lowres, worst quality, low quality, bad anatomy, bad hands, jpeg artifacts, watermark, signature, photorealistic, 3d, 2.5d, limited palette, thick lineart, monochrome, greyscale, simple background, halftone, sketch, glossy, shiny, dark, in shadows, multiple views, nsfw
```
- With Dark fantasy or Moonlit, delete `dark, in shadows` from the UC. For transparent-background assets, delete `simple background`.

## Painterly Comic v2 · Comic lean

Vault-only; the user's variant, read from the FB-02 test image (2026-11-11). It turns the painterly down and the comic line up: lesly oh leads, skiba drops from 1.7 to 1, russell dauterman and dan mora come in, and the medium group drops to 1.5. Use the Painterly Comic v2 theme add-ons after it.

Base
```
1.5::artist:lesly oh::, 1::artist:aleksandra skiba::, 1.2::artist:emmanuel viola::, 0.9::artist:russell dauterman::, 1::artist:dan mora::, 1.5::painterly, cel shading, colored lineart, western comics (style), oil painting (medium)::, Fantasy illustration blending crisp graphic-novel inking with loose painterly color. Thin elegant ink lines with tapering strokes define forms, while visible brushstrokes texture color fills. Shading falls in clear confident shapes with soft painted edges where light meets shadow.
```
UC (explicit; append `nsfw` for SFW)
```
1::artist:urushihara satoshi, artist:shirow masamune,::

lowres, worst quality, low quality, bad anatomy, bad hands, jpeg artifacts, watermark, signature, photorealistic, 3d, 2.5d, thick lineart, monochrome, greyscale, halftone, sketch, dark, in shadows, multiple views, sepia, colorful
```
- Tested settings: Euler (not Ancestral), karras, 20 steps, Guidance 5.0, Rescale 0.1, 832×1216, character positions off.
- With Dark fantasy or Moonlit, delete `dark, in shadows` from the UC. Speech bubbles: delete `watermark, signature`.

## Comic lean × Semireal

Vault-only; the user's FB-11 run (2026-11-16). The Comic lean base, then a Painterly v2 theme add-on, then a blank line and this semireal tail, which carries its own year, complexity and rating, so no separate tail follows.

Semireal tail (swap `rating:explicit` for the image's rating)
```
0.5::pinup (style)::, western comics (style), 1.0::fernando suarez::, 1.2::illyne cosplay::, 0.6::nekromaxxing::, 0.8::ginsky2000 ::, best quality, very aesthetic, year 2026, 1.5::digital illustration::, 0.25::gradient skin, body creases::, high complexity, sharp highlights, two-tone shading, gradient shading, semi-realistic, 0.5::colored lineart::, rating:explicit,
```
UC
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou,

lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page, censored, mosaic censoring, 2::monochrome, sketch, line art, steam, plastic skin, fake skin::, comic books, magazines, background faces, artist name, artist logo, white outline, character outer glow, aura, retro artstyle,
```
- Tested settings: Euler Ancestral, karras, 20 steps, Guidance 5.0, Rescale 0.1, 1024×1024, character positions off.
- It firms bodies up: a fat man came out beefy (big pecs, small belly). Put `muscular, large pectorals` in his UC and give the belly a sentence.
- Panels and split views: delete `multiple views` and `comic books` from the UC.

## Anime Pinup — v1

Base
```
0.8::copyright:brown dust 2 ::, 0.6::copyright:goddess of victory: nikke ::, 1.::artist:zd 1995 ::, year 2026, 2::masterpiece::, semi-realistic, 

A very high-quality anime screenshot style, smooth cel-shaded animation with vibrant colors and clean, confident lineart, professional digital art.
```
UC
```
lowres, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, dithering, halftone, screentone, multiple views, logo, too many watermarks, negative space, blank page, @_@, mismatched pupils, glowing eyes, bad anatomy, company name, copyright name, 
```
- Remove `glowing eyes` from UC for characters with glowing eyes or markings. Append `nsfw` for SFW.

## Semirealistic mix — v0 (WIP)

Base
```
pinup (style), western comics (style), 1.0::fernando suarez::, 1.2::illyne cosplay::, 0.6::nekromaxxing::, 0.8::ginsky2000 ::., best quality, very aesthetic, masterpiece, detailed, amazing quality, year 2026, colored, 1.5:: digital illustration,   ::, 0.25::gradient skin, body creases, ::, high complexity, vivid colors, sharp highlights, high contrast, two-tone shading, gradient shading, semi-realistic, 0.5::colored lineart::,
```
UC
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou,

lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page, censored, mosaic censoring, 2::monochrome, sketch, line art, steam, plastic skin, fake skin::, comic books, magazines, background faces, artist name, artist logo,
```

## Cinematic Real — v0 (WIP)

Photographic fantasy: a film still with practical creature features. Started 2026-11-16 from the Realism Bench (see `realism-research.md`). Settings: DPM++ 2M SDE, guidance 5.5, rescale 0, 23 steps. Paste after the scene prose. The artist slot sits between the block and the tail; start any artist at `0.3::`–`0.4::`.

Base
```
Cinematic film still from big-budget fantasy film, shot on full-frame camera with 85mm lens, sharp focus on eyes. Real skin with fine pores and natural color variation across cheeks, nose and lips. Hair falls in fine separate strands that catch light. Horns, scales and fur share same light as skin, with real weight and surface wear. Rich film color grading, deep shadows, clean highlights, subtle film grain. photo (medium), -1::anime::, -1::illustration::, -1::3d render::, -1::doll::,
```
UC
```
doll, figure, 3d, anime coloring, cel shading, lineart, painterly, lowres, artistic error, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, artist:sakimichan, nsfw
```
- Character boxes: describe appeal through structure and expression, never "attractive", "soft" or "glow". Leave out `mature female`, `toned` and `collarbone` (they age the face in photo mode), and art-medium words in prose ("drawn", "brushstrokes", "inked").
- Drop `nsfw` from the UC for explicit setups.

## Cyber Comic (Style B) — v1

Vault-only: moved here from the missionary pose set on 2026-11-11 and not yet in the master doc. Pastes after the scene prose; a one-sentence color line follows it (the pose set names one), then the tail.

Base
```
chromatic aberration, 1.2::artist:lesly oh::, 1.7::artist:aleksandra skiba::, 1::artist:dan mora::, 0.8::artist:emmanuel viola::, 2::cel shading, colored lineart, western comics (style), clip studio paint (medium)::. -1::sketch::, Sci-fi illustration blending crisp graphic-novel inking with cyberpunk vivid color. Thin elegant ink lines with tapering strokes define forms, while airbrush texture color fills. Shading falls in clear confident shapes with soft brushed edges where light meets shadow.
```
UC (explicit; add `nsfw` for SFW)
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou,

lowres, worst quality, low quality, bad anatomy, bad hands, jpeg artifacts, watermark, signature, photorealistic, 3d, 2.5d, limited palette, thick lineart, monochrome, greyscale, simple background, halftone, sketch, dark, in shadows, multiple views
```
- Settings: Euler Ancestral, karras, 23 steps, Guidance 6.3 for solo portraits; 5.0–5.5 when two bodies touch and anatomy smears. With the extended mix (Obj Shep, Calm): Guidance 4.9, Rescale 0.1.
- Targeted additions: `censored, mosaic censoring, bar censor` if the model censors; `comic` if Dan Mora pulls a single image into panels; drop `multiple views` for comic pages.

## Character UC templates

| Character has | Add to that character's UC |
| --- | --- |
| Petite frame | `tall female, muscular, fat, plump, inflation` |
| Tall or muscular frame | `petite, short, chibi` |
| Dark skin, even tone | `pale skin, tanlines` |
| Pale or white skin | `dark-skinned female, tan` |
| Grey or colored skin | `pale skin, tan` |
| Animal ears | `extra ears` |
| Softer face wanted | `0.4::mature female::` |
| Sharper face wanted | `0.4::teenage::` |
| Other characters in frame | their signature hair color, ears, garment |

Stabilizer (A/B on a locked seed)
```
1.5::bad anatomy, bad proportions, wrong anatomy, anatomical nonsense, deformed, disfigured, mutation::, 1.4::bad hands, bad feet, extra digits, fewer digits, extra fingers, missing fingers, fused fingers, extra hands, extra arms, extra legs, missing limb::, 1.3::bad face, extra eyes, extra pupils, extra mouth, bad neck::, 1.2::clone, duplicate::,
```

Worked example, Qiulong — character prompt
```
girl, dragon girl, dark-skinned female, petite, big hair, wavy hair, updo, braided bun, sidelocks, gradient hair, red hair, colored tips, hair stick, dragon horns, curled horns, brown horns, pointy ears, yellow eyes, slit pupils, freckles, dragon tail, thick tail, scales, fluffy tail. Hair fades from dark auburn roots through crimson to orange tips. Warm umber skin. Horns are ridged dark bronze. Crimson-scaled tail carries ridge of flame-orange fur. china dress, red dress, sleeveless dress, short dress, side slit, bare shoulders, gold trim, floral print, bracer, pendant, red thighhighs, no shoes. Gold chrysanthemum and maple leaf embroidery covers dress.
```
Qiulong — character UC
```
tall female, muscular, fat, inflation, plump, old, pale skin, tanlines, extra ears, bad anatomy, bad proportions, wrong anatomy, anatomical nonsense, deformed, disfigured, mutation, bad arm, bad leg, bad knees, bad neck, bad hands, bad feet, long fingers, extra digits, fewer digits, extra fingers, missing fingers, extra hands, extra arms, extra legs, missing limb, amputee, bad face, bad expression, extra eyes, extra pupils, extra mouth, missing eye, missing nose, clone, figurine, bad skin, smudge, aliasing, unfinished, blurry
```

## Review notes (not yet applied)

| Block | Issue | Suggested fix |
| --- | --- | --- |
| Painterly Comic UC | `dark, in shadows` fights Dark fantasy and Moonlit | Drop both words with a dark add-on |
| Semirealistic base | `ginsky2000 ::.` ends in a period | `0.8::ginsky2000 ::,` |
| Anime Pinup base | `1.::artist:zd 1995 ::` bare decimal | `1::artist:zd 1995 ::` |
| Semirealistic base | Five quality tags | Keep `best quality, very aesthetic` |
| Semirealistic base | `two-tone shading` vs `gradient shading` | A/B, keep one |
| Semirealistic base | No `artist:` prefixes | Add unless bare fuses better. verify count: fernando suarez, illyne cosplay, nekromaxxing, ginsky2000 |
| Semirealistic UC | `line art` | `lineart` |
| Anime Pinup base | `2::masterpiece::` and "anime screenshot" prose push a samey look | First to cut; try "anime coloring" |
| Vivid Pop base | All artists at `1::` | If it drifts, lead bm94199 at 1, others 0.7 (applied in the v2 candidate) |
| Vivid Pop base | `-2::…lineart::` vs `western comics (style)`; `realistic shading` and `subsurface scattering` vs `two-tone shading`; no style sentence; thin UC | See Vivid Pop v2 (candidate) and its test ladder |
| Painterly Comic base | skiba at 1.7, above ~1.5 | Re-check when switching add-ons |

## Changelog

| Date | Block | Change |
| --- | --- | --- |
| 2026-11-16 | Vivid Pop v2 (candidate) and v2 · Dark fantasy | Added from a review of v1 against the standards (vault-only, untested) |
| 2026-11-16 | Comic lean × Semireal | Added from the user's FB-11 run (vault-only) |
| 2026-11-11 | Painterly Comic v2 · Comic lean | Added from the user's FB-02 test (vault-only) |
| 2026-11-11 | Cyber Comic (Style B) v1 | Moved in from the missionary pose set (vault-only) |
| 2026-10-26 | All | Library started; blocks entered as supplied |
| Before 2026-10-26 | Painterly Comic v2 | Artist mix trimmed from 8 to 3 |
| Earlier | Painterly Comic v1 (retired) | atey ghailan 0.7, mike mignola 0.8, jamie hewlett 0.9, moebius 1, becky cloonan 1.1, lesly oh 1.2, aleksandra skiba 1.7, emmanuel viola 1; same medium group and prose |
