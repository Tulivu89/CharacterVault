---
type: prompt
character: "[[Primus]]"
world: HOG Wild
tool: novelai
stage: adult
outfit: ["Default"]
framing:
preview:
rating: sfw
base_prompt: |
  boy, tall male, muscular, athletic, broad shoulders, narrow waist, young adult male. Dark brown skin.
  bleached blonde hair, top knot, shaved sides. stubble.
  gold eyes, glowing eyes. Face square, strong jaw, wide white smile.
  full chrome left arm, cyan light seams, gold fittings at the joints and fingertips, exposed pistons at the elbow.
base_negative: |
  bishounen, androgynous, slim, skinny, long eyelashes, makeup, long hair,
avatar_prompt: ""
outfit_1_name: "Default"
outfit_1_prompt: |
  gold rings, white tank top, gold chain, layered gold chains, track pants.
outfit_1_negative: ""
created: 2026-11-16
---
# Primus - Prompt - HOG Wild Look
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
*Ported from Inkwyrm's `docs/content/hog-wild/looks.md` (Nov 15, 2026). Status: **locked**. The tags below are the character block; the house style and general undesired content are the shared base. Swap `1girl` for `1boy` for Primus and Patch. Inkwyrm's undesired list also carried `child, aged down`; the vault keeps age terms out of UC (`character-standard.md`), so they are dropped here.*

**Base prompt (house style)**
```
1girl, solo, indoors, science fiction, simple background, cowboy shot, straight-on, standing, looking at viewer. Plain dark studio backdrop. Even soft key light from the front, thin cyan rim light from behind. 1.5::artist:lesly oh::, 1::artist:aleksandra skiba::, 1.2::artist:emmanuel viola::, 0.9::artist:russell dauterman::, 1::artist:dan mora::, 1.5::cel shading, colored lineart, western comics (style), clip studio paint (medium)::, -1::sketch::, Sci-fi illustration blending crisp graphic-novel inking with vivid cyberpunk color. Thin elegant ink lines with tapering strokes define forms, while smooth airbrushed gradients fill color. Shading falls in clear confident shapes with soft brushed edges where light meets shadow. year 2026, rating:questionable, high complexity
```
**Undesired content (base)**
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou,
lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page, 2::monochrome, sketch, lineart, plastic skin, fake skin::, background faces, artist name, artist logo,
```
*The roll, with the hair changed to a top knot at the owner's request. His roll put the chrome on the left arm; left is locked so every image agrees.*

