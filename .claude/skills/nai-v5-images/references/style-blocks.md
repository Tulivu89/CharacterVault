# Style Block Library (snapshot)

Snapshot of the "Style Block Library" doc (master copy: https://claude.ai/artifact/KedmFGUyBYsoHDN2mVctbn), synced 2026-10-26. Blocks are verbatim and paste-ready. If the doc and this file disagree, the doc wins; update this file when it changes.

## How to use

| Block | Parts | Status | Use it for |
| --- | --- | --- | --- |
| Vivid Pop v1 | base + UC | Stable | Saturated pinup-comic look; the elf references' look (bm94199, calm, obj shep) |
| Painterly Comic v2 | base + 6 theme add-ons + UC | Stable | Western painterly look that holds faces best; one theme add-on per image |
| Painterly Comic v2 · Comic lean | base + the v2 add-ons + UC | Tested once (FB-02 ★) | Less paint, more comic line; holds tricky compositions better. Vault-only |
| Comic lean × Semireal (Lacquer · Tail) | Comic lean base + add-on + semireal tail + UC | Tested once (FB-11 ✓) | Comic line with semireal skin and highlights; flesh and close-ups. Vault-only. Pushes men muscular |
| Painterly Comic v3 · Occult v1 | base + 6 vibe sets + UC | Tested (HAL-04a/b ✓, Locker Room vibe) | The user's mix for dark occult Hallett work; the worm's-eye leg lift. Vault-only |
| Lacquer series | Tail · Cyber v1 · Occult v0 | Tail ✓, Cyber ✓, Occult WIP | Semi-real finish; best as a detail pass over Painterly v3. Vault-only |
| Vivid Pop · Arcane Night v1 | base + UC | Tested once (HAL-01 ✓) | The user's jewel-dark pinup comic with arcane glow. Vault-only |
| Anime Pinup v1 | base + UC | Stable | Gacha/Nikke polish; foundations for img2img and inpainting |
| Semirealistic mix v0 | base + UC | WIP | Semi-real pinup experiments |
| Cinematic Real v0 | base + UC | WIP | Photographic fantasy film still; artist slot before the tail |
| Cyber Comic (Style B) v1 | base + UC, color line per image | Vault-only | Cyberpunk comic look of the Castellane missionary set; not in the master doc yet |
| Cyber Comic · Occult Noir v0 | base + UC, color line per image | Tested (HAL-02, HAL-03 ✓) | Cyber Comic re-lit for candle, sigil and blood-circle horror. Vault-only |
| Toon Gloss v2 | base + frame add-on + UC | Tested ✓ | Western toon pinup: thick dark outlines, flat color, gloss highlights. Vault-only |

- **A style description is rendering only:** line weight, fills, shading, highlights, palette, finish, light quality. It never names a body part, garment or prop ("gloss on knees", "outlines down to toes"), because whatever it names gets drawn into every composition (the user's rule, 2026-11-25).
- Base Prompt order: subject → scene → camera → state → prose → style base → theme add-on (Painterly only) → tail. Vivid Pop and Anime Pinup carry their own year/quality tail; Painterly ends with `year 2026, rating:general, high complexity`.
- The block's UC replaces the lean Base UC. Quality Tags toggle off, UC Preset None.
- Changing a block: lock a seed, change one thing, keep it only if it helps, bump the version, add a Changelog row.
- Every block dated before 2026-11-20 was written under a false ~400-token cap (V5 allows 1471; `SKILL.md`, Less is more). When you revisit one, try fuller descriptive prose against the current text on a locked seed.

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

## Vivid Pop · Arcane Night — v1

Vault-only; the user's HAL-01 run (2026-11-19, ✓ seed 2022877119). Vivid Pop's artists re-weighted (bm94199 leads, calm and obj shep at 0.7), a pinup-comic sentence, a jewel-dark color line, then the arcane digital-fantasy prose. It carries its own tail.

Base (after the scene prose; swap `rating:explicit` for the image's rating)
```
pinup (style), western comics (style), 1::artist:bm94199 ::, 0.7::artist:calm (artist)::, 0.7::artist:obj shep::, -1::monochrome, sketch::, 1.5::digital illustration::, 0.25::gradient skin, body creases::, sharp highlights, two-tone shading, Pinup comic illustration with saturated color fills, clean confident ink edges and crisp specular highlights on skin. dark fantasy, high contrast, Low-key saturated color: deep black shadows with vivid jewel accents of teal, violet and amber, one warm light source carving form out of shadow, strong rim light on skin, heavy cast shadows. 

bloom, light particles. -1::sketch::, Sharp modern digital fantasy illustration blending crisp graphic-novel inking with luminous arcane color. Thin elegant ink lines with tapering strokes define forms, while polished airbrush gradients fill color. Glossy highlights and soft bloom catch on skin, fabric and hair, and crisp rim light separates figures from background. Shading falls in clear confident shapes with soft edges where light meets shadow. Cool cyan and violet arcane glow plays against warm amber window light. year 2026, rating:explicit, high complexity
```
UC
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou,  lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, 2::monochrome, sketch, lineart, steam, plastic skin, fake skin::, comic books, magazines, background faces, artist name, artist logo, white outline, character outer glow, aura, retro artstyle,
```
- Tested settings: Euler (not Ancestral), karras, 33 steps, Guidance 5.7, Rescale 0.4, 1024×1024, positions on.
- Swap the last color sentence ("Cool cyan and violet arcane glow…") per scene; it's the only line tied to HAL-01's window light.

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

## Painterly Comic v3 · Occult — v1

Vault-only; the user's mix (2026-11-19) on the Painterly prose, for The Decree and dark Hallett work. lesly oh leads at 1.5, skiba drops to 1.3, viola 1.2, dauterman 0.6, mora 0.8, and the medium group stays at 1.5. Order: scene prose → base → one vibe set → `year 2026, rating:<level>, high complexity`.

Base
```
1.5::artist:lesly oh::, 1.3::artist:aleksandra skiba::, 1.2::artist:emmanuel viola::, 0.6::artist:russell dauterman::, 0.8::artist:dan mora::, 1.5::painterly, cel shading, colored lineart, western comics (style), oil painting (medium)::, Dark occult fantasy illustration blending crisp graphic-novel inking with loose painterly color. Thin elegant ink lines with tapering strokes define forms, while visible brushstrokes texture color fills. Shading falls in clear confident shapes with soft painted edges where light meets shadow.
```
Vibe sets (pick one; each is a color and light line plus an occult texture line). Locker Room is verbatim from the tested run; the rest share its shape and are untested.

Locker Room ✓ · HAL-04a, HAL-04b
```
dark fantasy, high contrast, Low-key color: deep blacks and cold desaturated teal, one harsh caged bulb carving bodies out of shadow, heavy cast shadows. Oxblood red glow bleeds off lockers, shadows pool like wet black ink in corners, glossy highlights catch sweat-slick skin and sheer stockings.
```

Candle & Sigil · untested; HAL-02's light in paint
```
dark fantasy, high contrast, Low-key color: near-black shadows and warm candle amber, one small flame lighting faces from below, long sharp shadows climbing walls. Chalk sigils glow faint sickly green, shadows pool like wet black ink, warm highlights catch skin, lace and stockings.
```

Blood Circle · untested; HAL-03's light in paint
```
dark fantasy, high contrast, Low-key color: deep blacks lit from below by hellish red glow, cold blue moonlight edging hair and shoulders from tall windows, heavy cast shadows. Red light pools on sweat-slick skin, shadows bleed like wet black ink.
```

Gilded Dusk · untested; HAL-01's jewel line in paint
```
dark fantasy, high contrast, Low-key saturated color: deep black shadows with vivid jewel accents of teal, violet and amber, low sun raking through tall windows, strong rim light on skin, heavy cast shadows. Dust hangs gold in light beams, glossy highlights catch skin and lace.
```

Moonlit Ward · untested; dorm rooms
```
dark fantasy, high contrast, Low-key color: indigo and silver-blue, pale moonlight through dorm window edging forms, one red ward candle burning low, deep soft shadows. Shadows pool like wet black ink, highlights catch skin and rumpled sheets.
```

Iron Door · untested; the steam tunnels
```
dark fantasy, high contrast, Low-key color: wet black stone and verdigris green, one failing work light swinging overhead, heavy cast shadows. Rust and verdigris glint on iron pipes, shadows pool like wet black ink, cold sweat shines on skin.
```

UC (explicit; append `nsfw` for SFW)
```
1::artist:urushihara satoshi, artist:shirow masamune,::

lowres, worst quality, low quality, bad anatomy, bad hands, jpeg artifacts, watermark, signature, photorealistic, 3d, 2.5d, thick lineart, monochrome, greyscale, halftone, sketch, multiple views, sepia, colorful, censored, mosaic censoring, sex toy
```
- Tested settings (✓ HAL-04a seed 888962527, HAL-04b seed 1709982200): Euler (not Ancestral), karras, 20 steps, Guidance 5.0, Rescale 0.1, positions on, `prefer_brownian` off.
- `dark, in shadows` stays out of this UC; every vibe is low-key. `sex toy` answers a corner inset that rendered as an object. Speech bubbles: delete `watermark, signature`.
- Best finish so far: a detail pass with a Lacquer block (below) over the painterly gen (HAL-04b).
- Lens splatter and motion lines go in the scene prose and tags (`poses/layers.md`, Motion), not in the style.

## Lacquer series (semi-real finish) — WIP

The semi-real line built on fernando suarez 1.0, illyne cosplay 1.2, nekromaxxing 0.6 and ginsky2000 0.8, with `1.5::digital illustration::`, gradient and subsurface shading, and airbrushed skin. It lacquers a picture: wet skin, specular highlights and fluid detail. On its own it doesn't hold a dark scene yet, but over Painterly v3 it's the best finish so far (HAL-04b, Lacquer pass). The series is named for that job.

| Member | Status | What it is |
| --- | --- | --- |
| Lacquer · Tail | ✓ FB-11 | The semireal tail of **Comic lean × Semireal** (above), after a Painterly add-on |
| Lacquer · Cyber v1 | ✓ the user's pink-bob character art | The original: bright, even light, pearl and holographic sheen, transparent background |
| Lacquer · Occult v0 | WIP | The dark occult rewrite (HAL-04 Occult Gloss runs). Alone it came out flat and comic, not semi-real |

Lacquer · Cyber v1 (after the subject and pose tags; it carries its own tail)
```
science fiction, cyberpunk, transparent background. Soft neutral key light from front and slightly above lights face and body evenly. Faint cool rim light edges hair and shoulders. No cast shadows. High-finish semi-realistic cyberpunk character art, polished digital concept art rendering. Smooth airbrushed skin with warm subsurface glow, crisp tapered edges, form carried by value and light rather than heavy outline. Sharp specular highlights on glossy materials. Pearl white and holographic rainbow sheen against rose-gold and warm gold light. 

1.0::fernando suarez::, 1.2::illyne cosplay::, 0.6::nekromaxxing::, 0.8::ginsky2000 ::, best quality, very aesthetic, 1.5::digital illustration::, 0.25::gradient skin, body creases::, sharp highlights, gradient shading, semi-realistic, realistic shading, subsurface scattering, 0.3::colored lineart::, year 2026, rating:explicit, high complexity
```
UC
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou,

lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, 2::monochrome, sketch, lineart, steam, plastic skin, fake skin::, comic books, magazines, background faces, artist name, artist logo, white outline, character outer glow, aura, retro artstyle,
```
- Tested settings: Euler (not Ancestral), karras, 23 steps, Guidance 6.0, Rescale 0.1, 832×1216.

**Detail pass (HAL-04b ✓):** img2img Enhance over a Painterly v3 gen, with a Lacquer style text applied on top. Enhance weights and extra steps vary with the style added and the source image, so the block records no fixed recipe.

Lacquer · Occult v0 (after the scene prose)
```
horror (theme). High-finish semi-realistic dark occult fantasy art, polished modern digital concept art rendering with a horror film's mood. Smooth airbrushed skin with warm subsurface glow set against cold surroundings, crisp tapered edges, form carried by value and light rather than heavy outline. Hard low-key light carves bodies into sculpted planes, cold rim light knifes along hair, shoulders and thighs. Deep inky blacks pool in corners and swallow edges of frame, shadows bleeding outward like wet black ink. Sharp specular highlights on sweat-slick skin, sheer stockings, wet tile and gold jewelry. Faint haze hangs in light beams, catching drifting motes. Pearl-white skin and rose-gold glints against oxblood red light and deep teal shadow. 

1.0::fernando suarez::, 1.2::illyne cosplay::, 0.6::nekromaxxing::, 0.8::ginsky2000 ::, best quality, very aesthetic, 1.5::digital illustration::, 0.25::gradient skin, body creases::, sharp highlights, two-tone shading, gradient shading, semi-realistic, realistic shading, subsurface scattering, 0.3::colored lineart::, year 2026, rating:explicit, high complexity
```
UC
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou,

lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page, censored, mosaic censoring, 2::monochrome, sketch, line art, steam, plastic skin, fake skin::, comic books, magazines, background faces, artist name, artist logo, white outline, character outer glow, aura, retro artstyle, washed out colors, overexposed,
```
- Run settings: Euler, karras, 23 steps, Guidance 5.5, Rescale 0.1.

**Work list**
1. Alone: try the dragon-girl lean, `0.5::pinup (style)::, western comics (style)` at the head of the tail with `0.5::colored lineart::`, which held in FB-11.
2. Cut `horror (theme)` on a locked seed and check it does anything.
3. Length isn't the problem (V5 allows 1471 tokens, and HAL-04b's pass ran about 450). Test whether the Occult prose's two lighting sentences do anything alone, on a locked seed.

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

## Cyber Comic · Occult Noir — v0

Vault-only; Cyber Comic re-lit for dark occult horror (2026-11-19). `chromatic aberration` is dropped, and `horror (theme), high contrast, rim lighting` plus dark prose are added. ✓ HAL-02 (seed 3574758357) and HAL-03 (seed 164296462). Order: scene prose → base → a one-sentence color line → tail.

Base
```
1.2::artist:lesly oh::, 1.7::artist:aleksandra skiba::, 1::artist:dan mora::, 0.8::artist:emmanuel viola::, 2::cel shading, colored lineart, western comics (style), clip studio paint (medium)::, horror (theme), high contrast, rim lighting. -1::sketch::, Dark modern occult horror illustration blending crisp graphic-novel inking with polished digital color. Thin elegant ink lines with tapering strokes define forms, while smooth airbrush gradients fill color. Deep near-black shadows swallow edges of frame, and hard low light carves forms with sharp cast shadows. Glossy specular highlights catch on skin, hair and fabric, and thin cold rim light traces hair and shoulders. Faint haze and drifting dust motes hang in air.
```
Color lines (tested)
- `Warm candle amber against cold sickly green sigil glow, everything else sinks into black.` (HAL-02)
- `Hellish red glow from below against cold blue moonlight through tall windows.` (HAL-03)

UC (explicit; append `nsfw` for SFW)
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou,

lowres, worst quality, low quality, bad anatomy, bad hands, jpeg artifacts, watermark, signature, photorealistic, 3d, 2.5d, limited palette, thick lineart, monochrome, greyscale, simple background, halftone, sketch, multiple views, washed out colors, overexposed, white haze, censored, mosaic censoring
```
- Tested settings: Euler Ancestral, karras, 23 steps, Guidance 6.3 solo / 5.3 two bodies, Rescale 0.
- `dark, in shadows` is out of the Cyber Comic UC here, and `washed out colors, overexposed, white haze` come in, because V5 brightens dark scenes.

## Toon Gloss — v2

Western cartoon pinup built from the user's reference (2026-11-25): precise dark lines of varying weight, cel-shaded flat color with small crisp highlights, grounded expressive anatomy, and a pastel gradient panel inside a white inset border. v2 is the user's own fix of v1, cleaned so the prose doesn't repeat itself. Settings: Euler Ancestral, karras, 20 steps, Guidance 5.0, Rescale 0.12. Paste after the scene prose, before the tail (`year 2026, rating:<level>, medium complexity, no text`).

Base
```
1::artist:nayt layt::, 0.8::artist:olena minko::, 1.2::toon (style), western comics (style), thick lineart, cel shading::, shiny skin, 2d, illustration, lineart, distinct outlines, ink, flat color, flat shading, simple shading, matte color, low-contrast shading, limited palette, Digital 2D illustration in clean modern western comic and animated adventure style. Precise dark line art of varying weight defines every form, bold outer contours with thinner interior lines at folds and overlaps. Cel-shaded flat color with one hard-edged shadow tone per surface, gentle gradients, matte finish and small crisp white highlights give depth without looking painterly. Soft even lighting with natural ambient occlusion in creases, grounded expressive anatomy, articulate facial features, distinct natural contours. Crisp edges, vector-clean finish.
```
Frame add-on (optional; the reference's border. It replaces the background tag in the scene slot)
```
gradient background, white border, Pale pastel gradient from mint at top to sky blue at bottom inside thin white inset border, slate-blue margin around border.
```
UC (the user's)
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou, 2::lowres, artistic error, very displeasing::, too many watermarks, watermark, artist name, signature, blank page, anatomy error, 2.1::worst quality, low quality::, 1.2::jpeg (image quality), jpeg artifacts, dithering::, 1.2::bad anatomy, abomination, blurry, sloppy lines::, letterbox, pillarbox, sketchy, wip, unfinished, photorealistic, photorealism, toriyama akira (style), 3d, watercolor (medium), oil painting (medium), colored lineart
```
- Results: 2026-11-25 ✓ seed 2722854114 (the user's solo, prone with feet up from behind). v1 held the style on seeds 1708196603 and 2606416019.
- Cleaned from the user's text: the doubled `thick lineart` and `cel shading`, and "even weight" (it contradicted "varying line weight"). "Under the chin" and "fabric" came out of the ambient-occlusion line, because named parts get drawn in.
- `shiny skin` and `matte color` pull against each other. The user's run kept both; A/B on a locked seed before you drop either.
- Append `nsfw` to the UC for SFW images.

## Character UC templates

| Character has | Add to that character's UC |
| --- | --- |
| Petite frame | `tall female, muscular, fat, plump, inflation` |
| Tall or muscular frame | `petite, short, chibi` |
| Dark skin, even tone | `pale skin, tanlines` |
| Pale or white skin | `dark-skinned female, tan` |
| Grey or colored skin | `pale skin, tan` |
| Animal ears | `extra ears` |
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
| 2026-11-25 | Toon Gloss v2 | The user's fix: second tag set and prose, own UC, 20 steps, Guidance 5.0, Rescale 0.12; cleaned of duplicates (vault-only) |
| 2026-11-25 | Toon Gloss v1 | The user's artists (nayt layt, olena minko); the description now names rendering only (vault-only) |
| 2026-11-25 | Toon Gloss v0 | Added from the user's western toon reference (vault-only) |
| 2026-11-20 | Painterly Comic v3 · Occult v1 | Added: the user's mix, six vibe sets (Locker Room tested) (vault-only) |
| 2026-11-20 | Lacquer series | The semireal line named: Tail (Comic lean × Semireal), Cyber v1, Occult v0 WIP (vault-only) |
| 2026-11-20 | Cyber Comic · Occult Noir v0 | Added from HAL-02 and HAL-03 (vault-only) |
| 2026-11-20 | Vivid Pop · Arcane Night v1 | Added from the user's HAL-01 run (vault-only) |
| 2026-11-16 | Comic lean × Semireal | Added from the user's FB-11 run (vault-only) |
| 2026-11-11 | Painterly Comic v2 · Comic lean | Added from the user's FB-02 test (vault-only) |
| 2026-11-11 | Cyber Comic (Style B) v1 | Moved in from the missionary pose set (vault-only) |
| 2026-10-26 | All | Library started; blocks entered as supplied |
| Before 2026-10-26 | Painterly Comic v2 | Artist mix trimmed from 8 to 3 |
| Earlier | Painterly Comic v1 (retired) | atey ghailan 0.7, mike mignola 0.8, jamie hewlett 0.9, moebius 1, becky cloonan 1.1, lesly oh 1.2, aleksandra skiba 1.7, emmanuel viola 1; same medium group and prose |
