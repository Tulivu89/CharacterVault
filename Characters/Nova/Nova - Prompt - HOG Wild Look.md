---
type: prompt
character: "[[Nova]]"
world: HOG Wild
tool: novelai
stage: adult
outfit: ["Default"]
framing:
preview:
rating: sfw
base_prompt: |
  girl, petite, lean athletic build, 0.4::mature female::. Pale translucent porcelain skin, faint inner bioluminescence, subsurface scattering.
  medium hair, black hair, cyan streaks, magenta streaks. Light grey eyes, silver radial iris texture, dense dark eyelashes, cyan eyeshadow, pink lipstick. Delicate aquiline nose, high cheekbones, sharp jawline, slender neck, defined collarbones.
  a soft luminous rim along every edge of her skin, brightest in shadow. A small glowing ring at the left temple.
base_negative: |
  large breasts, muscular, tall, thick, tan, dark skin, long hair, blonde hair, mechanical parts, exposed wiring,
avatar_prompt: ""
outfit_1_name: "Default"
outfit_1_prompt: |
  simple matte black sleeveless high-collar top, dark fitted trousers, geometric blue-white trim.
outfit_1_negative: ""
created: 2026-11-16
---
# Nova - Prompt - HOG Wild Look
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
*Ported from Inkwyrm's `docs/content/hog-wild/looks.md` (Nov 15, 2026). Status: **locked, configuration 1.0**. The tags below are the character block; the house style and general undesired content are the shared base. Swap `1girl` for `1boy` for Primus and Patch. Inkwyrm's undesired list also carried `child, aged down`; the vault keeps age terms out of UC (`character-standard.md`), so they are dropped here.*

**Base prompt (house style)**
```
1girl, solo, indoors, science fiction, simple background, cowboy shot, straight-on, standing, looking at viewer. Plain dark studio backdrop. Even soft key light from the front, thin cyan rim light from behind. 1.5::artist:lesly oh::, 1::artist:aleksandra skiba::, 1.2::artist:emmanuel viola::, 0.9::artist:russell dauterman::, 1::artist:dan mora::, 1.5::cel shading, colored lineart, western comics (style), clip studio paint (medium)::, -1::sketch::, Sci-fi illustration blending crisp graphic-novel inking with vivid cyberpunk color. Thin elegant ink lines with tapering strokes define forms, while smooth airbrushed gradients fill color. Shading falls in clear confident shapes with soft brushed edges where light meets shadow. year 2026, rating:questionable, high complexity
```
**Undesired content (base)**
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou,
lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page, 2::monochrome, sketch, lineart, plastic skin, fake skin::, background faces, artist name, artist logo,
```
*Configuration 1.0. Only the hair, eyes, skin and cosmetics change with her configuration. The rim and the temple ring stay in every version: they are how a reader knows it is still her.*

