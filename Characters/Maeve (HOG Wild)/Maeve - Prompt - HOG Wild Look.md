---
type: prompt
character: "[[Maeve (HOG Wild)]]"
world: HOG Wild
tool: novelai
stage: adult
outfit: ["Default"]
framing:
preview:
rating: sfw
base_prompt: |
  girl, 0.6::mature female::, || slim, wiry | slim, toned, small breasts | lean, long legs ||. Fair skin, freckles across nose and shoulders.
  very long hair, straight hair, copper red hair, messy bangs. || green eyes | grey-green eyes | pale blue eyes ||, smudged black eyeliner. Face long, high cheekbones, sharp nose, wide mouth, a sneer at one corner.
  || a tiny lot number printed behind her left ear | a thin pale seam ring at the base of her neck | a beauty mark that sits slightly too low on her cheek ||.
base_negative: |
  cyborg, mechanical arms, animal ears, tail, short hair, blonde hair, tsurime,
avatar_prompt: ""
outfit_1_name: "Default"
outfit_1_prompt: |
  || ripped black band t-shirt, studded leather jacket, safety pins, torn fishnets, combat boots | leather trousers, mesh top, spiked choker, silver rings on every finger | oversized vintage tour shirt as a dress, bare feet, guitar strap over one shoulder ||
outfit_1_negative: ""
created: 2026-11-16
---
# Maeve - Prompt - HOG Wild Look
*Edit in the boxes below (Meta Bind) or in the Properties panel. The copy-ready prompts rebuild themselves from these fields. For more looks, add `outfit_3_name`, `outfit_3_prompt` and `outfit_3_negative` and copy an Outfit block.*

## Base
**Prompt**
`INPUT[textArea:base_prompt]`

**Negative**
`INPUT[textArea:base_negative]`

**Avatar framing**
`INPUT[textArea:avatar_prompt]`

## Outfit 1
**Name** `INPUT[text:outfit_1_name]`

**Prompt**
`INPUT[textArea:outfit_1_prompt]`

**Negative**
`INPUT[textArea:outfit_1_negative]`

## Flat prompt
*Long-press to select and copy.*

### `VIEW[{outfit_1_name}][text]`
`VIEW[{base_prompt} {outfit_1_prompt}][text]`

## Negative / undesired
**`VIEW[{outfit_1_name}][text]`**
`VIEW[{base_negative} {outfit_1_negative}][text]`

## Source setups
*Ported from Inkwyrm's `docs/content/hog-wild/looks.md` (Nov 15, 2026). Status: **still to roll**. The tags below are the character block; the house style and general undesired content are the shared base. Swap `1girl` for `1boy` for Primus and Patch. Inkwyrm's undesired list also carried `child, aged down`; the vault keeps age terms out of UC (`character-standard.md`), so they are dropped here.*

**Base prompt (house style)**
```
1girl, solo, indoors, science fiction, simple background, cowboy shot, straight-on, standing, looking at viewer. Plain dark studio backdrop. Even soft key light from the front, thin cyan rim light from behind. 1.5::artist:lesly oh::, 1::artist:aleksandra skiba::, 1.2::artist:emmanuel viola::, 0.9::artist:russell dauterman::, 1::artist:dan mora::, 1.5::cel shading, colored lineart, western comics (style), clip studio paint (medium)::, -1::sketch::, Sci-fi illustration blending crisp graphic-novel inking with vivid cyberpunk color. Thin elegant ink lines with tapering strokes define forms, while smooth airbrushed gradients fill color. Shading falls in clear confident shapes with soft brushed edges where light meets shadow. year 2026, rating:questionable, high complexity
```
**Undesired content (base)**
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou,
lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page, 2::monochrome, sketch, lineart, plastic skin, fake skin::, background faces, artist name, artist logo,
```
*A red-haired Irish punk queen with long hair and Johnny Silverhand's swagger. Her signature is something slightly wrong that only she is sure of, so the replica's tell is a wildcard and stays small. Still to roll: hand back the tags that won.*

