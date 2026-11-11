# Style Block Library (snapshot)

Snapshot of the "Style Block Library" doc (master copy: https://claude.ai/artifact/KedmFGUyBYsoHDN2mVctbn), synced 2026-10-26. Blocks are verbatim and paste-ready. If the doc and this file disagree, the doc wins; update this file when it changes.

## How to use

| Block | Parts | Status | Use it for |
| --- | --- | --- | --- |
| Vivid Pop v1 | base + UC | Stable | Saturated pinup-comic look; the elf references' look (bm94199, calm, obj shep) |
| Painterly Comic v2 | base + 6 theme add-ons + UC | Stable | Western painterly look that holds faces best; one theme add-on per image |
| Painterly Comic v2 · Comic lean | base + the v2 add-ons + UC | Tested once (FB-02 ★) | Less paint, more comic line; holds tricky compositions better. Vault-only |
| Anime Pinup v1 | base + UC | Stable | Gacha/Nikke polish; foundations for img2img and inpainting |
| Semirealistic mix v0 | base + UC | WIP | Semi-real pinup experiments |
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
| Vivid Pop base | All artists at `1::` | If it drifts, lead bm94199 at 1, others 0.7 |
| Painterly Comic base | skiba at 1.7, above ~1.5 | Re-check when switching add-ons |

## Changelog

| Date | Block | Change |
| --- | --- | --- |
| 2026-11-11 | Painterly Comic v2 · Comic lean | Added from the user's FB-02 test (vault-only) |
| 2026-11-11 | Cyber Comic (Style B) v1 | Moved in from the missionary pose set (vault-only) |
| 2026-10-26 | All | Library started; blocks entered as supplied |
| Before 2026-10-26 | Painterly Comic v2 | Artist mix trimmed from 8 to 3 |
| Earlier | Painterly Comic v1 (retired) | atey ghailan 0.7, mike mignola 0.8, jamie hewlett 0.9, moebius 1, becky cloonan 1.1, lesly oh 1.2, aleksandra skiba 1.7, emmanuel viola 1; same medium group and prose |
