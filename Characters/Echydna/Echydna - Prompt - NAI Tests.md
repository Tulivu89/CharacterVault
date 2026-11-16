---
type: prompt
character: "[[Echydna]]"
world: Autumn's Leaves
tool: novelai
stage: adult
outfit: []
framing:
preview:
rating: explicit
base_prompt: |
  girl, dragon girl, mature female, tall female, voluptuous,
  || dark blue-grey slate skin, waist-length wavy midnight-blue hair, deep indigo undertones | deep bruised plum-charcoal skin, thick curled soot-black hair, faint violet sheen | dark abyssal indigo-black skin, heavy loose wavy black hair with subtle dark teal sheen ||,
  || black sclera, glowing pale pearl eyes, no pupils, heavy-lidded languid gaze | blank milky opalescent eyes, no pupils, dark lashes, eerie calm stare | deep abyssal indigo eyes, faint glowing crescent eclipse ring, no pupils, unblinking gaze ||,
  || heavy thick backward-sweeping dark horns, glowing halo crescent floating between horns | heavy thick curved dark obsidian ram horns, single glowing cosmic eye floating between horns | massive heavy ribbed dark pearl horns framing head, crescent-shaped dark halo arch between horns ||,
  || dark plum lips, subtle predatory smile | dark plum lips, serene unblinking expression, faint glowing gill-slits on outer ribs ||,
  pointed webbed fin-ears, translucent ear fins,
  body freckles, tiny pale glowing constellation freckles scattered across shoulders, chest, ribs, and hips, iridescent scales, multi-colored oil-slick scales along shoulders, outer thighs, and forearms,
  medium breasts, narrow waist, wide hips, thick thighs, soft belly, slight belly, curvy, bare skin stomach, faint iridescent pearl stretchmarks on lower belly and outer hips,
  human legs, barefoot, small high-arched feet, sharp dark nails,
  heavy thick dark-scaled dragon tail, thick tail, iridescent scales on tail, translucent webbed tail fins running along spine and tip,
  no pupils, looking at viewer,
base_negative: |
  pupils, slit pupils, normal human eyes, large breasts, huge breasts, gigantic breasts, small breasts, flat chest, petite, skinny, flat stomach, abs, muscular, scutes, dragon scutes, belly scales, armored belly, plated abdomen, snake tail lower body, lamia, no legs, wings, dragon wings, feathered wings, pale skin, white skin, auburn hair, crimson hair, white hair, antler horns, thin horns, small horns, furry tail, brush tail, thin tail, 1.5::bad anatomy, bad proportions, wrong anatomy, anatomical nonsense, deformed, disfigured, mutation::, 1.4::bad hands, bad feet, extra digits, fewer digits, extra fingers, missing fingers, fused fingers, extra hands, extra arms, extra legs, missing limb::, 1.3::bad face, extra mouth, bad neck::,
avatar_prompt: ""
outfit_1_name: ""
outfit_1_prompt: ""
outfit_1_negative: ""
adult_prompt: |
  nude, completely nude, nipples, pussy,
created: 2026-11-16
---
# Echydna - Prompt - NAI Tests
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
*Ported from Inkwyrm's `docs/content/dragons-resort/echydna-nai-v5-prompts.md` (Nov 14, 2026). Not a locked look: the `|| a | b | c ||` blocks are wildcards for rolling. The locked direction is dark skin with constellation freckles, iridescent scales, a soft belly with no scutes and pearlescent marks, no pupils, finned ears, a heavy finned tail and heavy horns carrying a crescent halo or a floating eye. The explicit layer (`adult_prompt`) goes in the box only for explicit images.*
*Settings: 1024×1024 (832×1216 portrait, 1216×832 two-view) · steps 20 · scale 5.0 · CFG rescale 0.1 · sampler k_euler_ancestral · noise schedule karras.*

### Two-view reference sheet
**Base prompt**
```
1girl, reference sheet, multiple views, grey background, full body, upper body, Two views of the same mature dragon woman stand side by side on flat grey wash. Left view shows full body head to toe, standing and facing viewer. Right view frames upper body and torso up close from hips to head, facing viewer. Details remain consistent across views. 1.2::artist:lesly oh::, 1.7::artist:aleksandra skiba::, 1::artist:emmanuel viola::, 2::painterly, cel shading, colored lineart, western comics (style), oil painting (medium)::, Fantasy illustration blending crisp graphic-novel inking with loose painterly color. Thin elegant ink lines with tapering strokes define forms, while visible brushstrokes texture color fills. Shading falls in clear confident shapes with soft painted edges where light meets shadow. high contrast, Deep abyssal palette, soft diffuse light, crisp black shadow shapes. year 2026, rating:nsfw, high complexity
```
**Undesired content**
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou, artist:d-rex,

lowres, worst quality, low quality, bad anatomy, bad hands, jpeg artifacts, watermark, signature, photorealistic, 3d, 2.5d, thick lineart, monochrome, greyscale, halftone, sketch, sepia, clothing, dress, shirt, skirt, lingerie, stockings, boots, shoes
```
**Tuning tips.** If the crescent or eye between the horns disappears, wrap it: `1.3::floating glowing crescent halo between horns::` or `1.3::single glowing cosmic eye between horns::`. If NovelAI resists `no pupils`, raise `1.4::no pupils::` in the positive and `1.3::pupils, iris::` in the negative. If scutes appear on her belly, add `1.3::smooth bare stomach, soft unscaled belly::`.

### Single frame (832×1216)
Keep the character block and negatives; swap only the base prompt.
```
1girl, solo, flat grey background, full body, standing, looking at viewer, 1.2::artist:lesly oh::, 1.7::artist:aleksandra skiba::, 1::artist:emmanuel viola::, 2::painterly, cel shading, colored lineart, western comics (style), oil painting (medium)::, Fantasy illustration blending crisp graphic-novel inking with loose painterly color. Thin elegant ink lines with tapering strokes define forms, while visible brushstrokes texture color fills. Shading falls in clear confident shapes with soft painted edges where light meets shadow. high contrast, Deep abyssal palette, soft diffuse light, crisp black shadow shapes. year 2026, rating:nsfw, high complexity
```

