# V5 Face Kits — reference

Distinct faces in V5 come from coherent feature clusters plus a counter-UC, not single tags. Tested on a bare oil-painting bench (2026-10-19): strong in semi-real, partial in comic, light in toon. Full doc with test bench and pairings: "V5 Face Kits — Distinct Character Faces" in the user's artifacts.

## Method

- A kit pushes every feature one way (all long/sharp or all round/soft); the character UC holds the opposite cluster. Together they move the face off V5's house face further than either alone.
- Three layers, trimmed by style and framing:
  - Tags: frame tag, eye shape, lashes, makeup, marks. Survive every style.
  - Sentence 1, silhouette: face outline, chin, eye shape and spacing, nose type. Toon keeps this.
  - Sentence 2, modeling: cheekbones, jaw, brow ridge, lips, eyebrow shape. Semi-real yes, comic partly, toon drop.
- Box placement: frame/skin tags after `girl`; eye/lash/makeup/mark tags in the face slot; both sentences in the detail slot before the outfit.
- Framing: portrait/upper body = full kit; cowboy = tags + Sentence 1; full body/wide = tags only, `-1::close-up::` if it crops in.
- Hair: blunt bangs and sidelocks hide the kit; parted, swept or tied-back hair shows it.
- Expression reshapes faces; heavy brows read as a frown.
- Lead artist's face template is the main override: lead to `0.7::` first; counter-UC survives mixes better than the positive side.
- Age tags are shape levers, not ages (all characters 18+). `mature female` (`0.4::`–`0.6::`) sharpens and lengthens; `teenage` or `aged down` (`0.3::`–`0.5::`) soften and round features a style pushes older. Age-lowering tags only in non-suggestive `rating:general` images, and never in a UC: there they push faces younger (tested 2026-11-11).
- Prose UC entries not confirmed as tags (A/B first if a UC seems inert): `round face`, `chubby cheeks`, `long face`, `sharp cheekbones`, `pointed chin`, `thin lips`, `broad nose`, `double eyelids`, `high nose bridge`, `light skin`.
- Never `thick lips` (deforms); full lips = `lips` + prose.

## Structure kits

Bench hair/outfit shown (`long hair, low ponytail, brown hair, brown eyes`, `grey tank top`); swap for the character's own.

Willow (tall, long, angular)
```
girl, tall female, 0.6::mature female::, long hair, low ponytail, brown hair, brown eyes, tsurime, long eyelashes, eyeliner, collarbone. Face long and narrow, pointed chin, almond-shaped eyes, long straight nose. High sharp cheekbones, defined jawline, thin straight eyebrows, narrow lips. grey tank top
```
UC: `tareme, petite, round face, chubby cheeks, button nose, thick eyebrows`

Doll (petite, round, soft) — always keep the mature female anchor
```
girl, petite, 0.4::mature female::, small breasts, long hair, low ponytail, brown hair, brown eyes, tareme, long eyelashes, pink lips. Face round and soft, small rounded chin, large round eyes set wide apart, small button nose. Full rounded cheeks, gently arched eyebrows, small full mouth with pronounced cupid's bow. grey tank top
```
UC: `tsurime, tall female, long face, sharp cheekbones, pointed chin`

Vixen (petite, sharp, feline)
```
girl, petite, long hair, low ponytail, brown hair, brown eyes, tsurime, black eyeliner, thick eyelashes. Face heart-shaped, wide cheekbones tapering to small pointed chin, upturned eyes, small upturned nose. Sharp arched eyebrows, angular cheekbones, wide mouth with full lower lip. grey tank top
```
UC: `tareme, round face, button nose, freckles, chubby cheeks`

Siren (slender voluptuous, sultry oval)
```
girl, curvy, long hair, low ponytail, brown hair, brown eyes, tareme, long eyelashes, eyeshadow, mole under eye, lips, red lips. Face oval, softly tapered chin, heavy-lidded downturned eyes, straight nose with rounded tip. Full lips, softly defined cheekbones, smooth gently curved jaw, dark arched eyebrows. grey tank top
```
UC: `tsurime, petite, freckles, pointed chin, thin lips`

Ranger (athletic, strong-featured)
```
girl, toned, long hair, low ponytail, brown hair, brown eyes, thick eyebrows, freckles, tan. Face squarish, strong angular jaw, deep-set wide eyes, straight nose with slight bump on bridge. Prominent brow ridge, broad flat cheekbones, wide mouth, straight heavy eyebrows. grey tank top
```
UC: `tareme, petite, long eyelashes, makeup, round face, button nose, furrowed brow, frown, sweat, shiny skin`

Tomboy Vixen (petite, sharp, unmade-up) — v0, untested
```
girl, petite, 0.4::mature female::, toned, medium hair, straight hair, black hair, grey eyes, tsurime. Face heart-shaped, wide cheekbones tapering to small pointed chin, upturned eyes, small straight nose. Straight dark eyebrows, clean angular cheekbones, wide mouth with full lower lip, no makeup. grey tank top
```
UC: `tareme, round face, chubby cheeks, button nose, freckles, makeup, eyeliner, eyeshadow, long eyelashes, lipstick, thick eyebrows`

Vixen with the glamour removed: no eyeliner or lashes, straight brows instead of arched. Built for Ilse Brandt after Ranger read too severe in a semi-real mix.

## Ethnicity overlays

Skin tag in identity slot, hair texture in hair slot, descriptor sentence where Sentence 1 sits. Western/e621-heavy artists respond best; anime leads pull back toward their average.

West African
```
girl, dark-skinned female, very dark skin, long hair, low ponytail, curly hair, black hair, dark brown eyes. West African features, broad nose, full lips, high rounded cheekbones, round dark eyes. grey tank top
```
UC: `pale skin, straight hair, light skin`

East African
```
girl, dark-skinned female, long hair, low ponytail, curly hair, black hair, dark brown eyes. Deep brown skin. East African features, long oval face, narrow straight nose, high cheekbones, large almond eyes. grey tank top
```
UC: `pale skin, straight hair, broad nose`

South Asian
```
girl, dark-skinned female, long hair, low ponytail, black hair, dark brown eyes. Warm brown skin. South Asian features, large dark almond eyes, thick dark eyebrows, defined nose with rounded tip, full lips. grey tank top
```
UC: `pale skin, light eyes, blonde hair`

East Asian
```
girl, long hair, low ponytail, straight hair, black hair, dark brown eyes. Fair skin. East Asian features, monolid eyes, low nose bridge, soft flat cheeks, small mouth. grey tank top
```
UC: `double eyelids, freckles, high nose bridge`

Middle Eastern
```
girl, long hair, low ponytail, wavy hair, black hair, dark brown eyes. Light olive skin. Middle Eastern features, large dark almond eyes, thick arched eyebrows, prominent straight nose, full lips. grey tank top
```
UC: `pale skin, button nose, blonde hair`

Northern European
```
girl, pale skin, long hair, low ponytail, straight hair, blonde hair, grey eyes. Nordic features, narrow high-bridged nose, light freckling, high forehead, pale thin eyebrows. grey tank top
```
UC: `dark skin, tan, black hair, thick eyebrows`

Caricatured result: cut the descriptor to region word + one feature.

## Merging a kit with an overlay

1. Keep the kit's silhouette: outline, chin, jaw, frame tag, eye-shape tag.
2. Overlay replaces the kit's nose, lip and eye-shape clauses where they clash.
3. Shared features written once.
4. Merge both UCs; drop any UC entry that contradicts the merged box.

Example, Willow + West African:
```
girl, tall female, 0.6::mature female::, dark-skinned female, very dark skin, long hair, low ponytail, curly hair, black hair, dark brown eyes, tsurime, long eyelashes, eyeliner, collarbone. Face long and narrow, pointed chin, almond-shaped eyes. West African features, broad nose, full lips, high sharp cheekbones, defined jawline, thin straight eyebrows. grey tank top
```
UC: `pale skin, straight hair, tareme, petite, round face, chubby cheeks, button nose`

Natural pairings: Willow + East African, Siren + Middle Eastern, Doll + East Asian, Ranger + Northern European, Vixen + South Asian.

## To revisit

| Date | Finding | Next step |
| --- | --- | --- |
| 2026-11-06 | Ranger and Willow overshoot in realistic and semi-real mixes (Semirealistic, pinup + photoreal skin): gaunt, severe, heavy brow and jaw. | Bench each kit per style family. Try Sentence 2 at reduced strength or dropped in semi-real; tie a kit strength to each style block. |
| 2026-11-06 | "Deep-set" eyes plus cold overhead light gives dark under-eye bands in every style. | Front fill light in face tests; A/B `bags under eyes` in UC (not in the tag files). |
| 2026-11-06 | `scar on face` renders crossed or stitched slashes, sometimes several. | `0.5::scar on face::` plus a prose sentence naming one thin faded line; `stitches` in UC. Bench a proper scar recipe. |

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Gaunt, older (Willow) | no hollow cheeks; `mature female` at `0.6::` |
| Reads too young (Doll) | `0.4::mature female::` in box, never in UC |
| Scowl, sweat-shine (Ranger) | `furrowed brow, frown, sweat, shiny skin` in UC |
| Kit vanishes under artists | lead `0.7::`; keep counter-UC; face traits to a `0.3::` sub-artist |
| Bangs appear on every kit | name a parted/swept style; `blunt bangs` in UC |
| Close-up forced | drop Sentence 2; `-1::close-up::` |
| Two characters share a face | different kits, each with its counter-UC |
