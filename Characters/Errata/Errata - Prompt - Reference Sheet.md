---
type: prompt
character: "[[Errata]]"
world: Inkwyrm
tool: novelai
stage: adult
outfit: ["Default"]
framing:
preview: "[[Errata - 01.png]]"
rating: sfw
base_prompt: "girl, dragon girl, pale skin, tall female, skinny. Pale skin with cool grey shading. very long hair, straight hair, white hair, gradient hair, colored tips, hair over one eye, swept bangs. White hair darkens through grey to ink-black ends below waist. eastern dragon horns, black horns, pointy ears. Branching antler-like horns drawn in wet black brushstrokes. tareme, long eyelashes, grey eyes, slit pupils, thick eyebrows, black eyeliner, black eyeshadow, black lips, facial scales, scales. Small black scales trace cheekbones, rim ears and cap shoulders. Black scales cover backs of hands and forearms up to elbows, breaking into ink stains on fingertips. small breasts, collarbone, long fingers, sharp fingernails, black nails, narrow waist, wide hips, long legs, dragon tail, white tail, tail mane, black tail tip. Long slim white-scaled tail carries crest of black fur along top, ending in black fur tuft shaped like calligraphy brush, ink dripping from its point."
base_negative: "tsurime, round face, chubby cheeks, freckles, button nose, thin lips, blonde hair, brown hair, red eyes, yellow eyes, brown horns, red horns, red lips, blush, nose blush, shiny skin, wings, dragon wings, curled horns, extra ears, petite, curvy, large breasts, muscular, plump, thick thighs, demon tail, spade tail, heart tail, thick tail,"
avatar_prompt: "grey background, portrait, from above, looking at viewer, half-closed eyes, bored, closed mouth,"
outfit_1_name: "Default"
outfit_1_prompt: "hoop earrings, stud earrings, black shirt, t-shirt, crop top, off-shoulder shirt. Loose cropped black tee slips off one shoulder. ring, bracelet. Thin silver rings and bracelets. red skirt, plaid skirt, pleated skirt, miniskirt. Brick-red plaid crossed with thin black lines. black thighhighs, no shoes,"
outfit_1_negative: "boots, shoes,"
outfit_2_name: ""
outfit_2_prompt: ""
outfit_2_negative: ""
created: 2026-11-09
---
# Errata - Prompt - Reference Sheet
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
*The V5 setups read from the images' metadata, word for word. The style block (artists, painterly ink look, palette) lives in the base prompts.*

### Portrait (Errata - 01)
**Base prompt**
```
1girl, solo, grey background, portrait, from above, looking at viewer, half-closed eyes, bored, closed mouth, Dragon girl tilts head slightly down and looks up at viewer from under brows. Flat grey wash fills background. Soft light falls from upper left. 1.2::artist:lesly oh::, 1.7::artist:aleksandra skiba::, 1::artist:emmanuel viola::, 2::painterly, cel shading, colored lineart, western comics (style), oil painting (medium)::, Fantasy illustration blending crisp graphic-novel inking with loose painterly color. Thin elegant ink lines with tapering strokes define forms, while visible brushstrokes texture color fills. Shading falls in clear confident shapes with soft painted edges where light meets shadow. high contrast, Stark ink color: deep ink black, warm paper white and cool grey wash, soft diffuse light, crisp black shadow shapes. year 2026, rating:general, high complexity
```
**Character 1**
```
girl, dragon girl, pale skin. Pale skin with cool grey shading. very long hair, straight hair, white hair, gradient hair, colored tips, hair over one eye, swept bangs. White hair darkens through grey toward ink-black ends. eastern dragon horns, black horns. Branching antler-like horns drawn in wet black brushstrokes, dry-brush edges breaking into ink flecks. pointy ears, ear piercing. Pointed ears rimmed in small black scales. tareme, long eyelashes. Face oval, softly pointed chin, heavy-lidded downturned eyes, small straight nose with slightly upturned tip. Full lips, soft high cheekbones, smooth narrow jaw, thick straight black eyebrows set low over eyes. grey eyes, 1.3::slit pupils::, thick eyebrows, bags under eyes, black eyeliner, black eyeshadow, mascara, black lips. Pale silver-grey irises split by thin black vertical pupils, sharp winged liner. facial scales, mole under eye, 0.5::scar on face::. Few small black scales trace top of each cheekbone toward temple. Small mole under uncovered eye. One thin pale scar splits eyebrow above uncovered eye. scales. Small black scales cap bare shoulder. hoop earrings, stud earrings. Black fountain pen tucked behind ear. black shirt, off-shoulder shirt, bare shoulders.
```
**Undesired content**
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou, artist:d-rex, 

lowres, worst quality, low quality, bad anatomy, bad hands, jpeg artifacts, watermark, signature, photorealistic, 3d, 2.5d, thick lineart, monochrome, greyscale, halftone, sketch, dark, in shadows, multiple views, sepia, colorful, nsfw
```
**Character 1 UC**
```
tsurime, round face, chubby cheeks, freckles, button nose, thin lips, blonde hair, brown hair, red eyes, yellow eyes, brown horns, red horns, red lips, blush, nose blush, shiny skin, wings, curled horns, extra ears, stitches, 1.5::bad anatomy, bad proportions, wrong anatomy, anatomical nonsense, deformed, disfigured, mutation::, 1.3::bad face, extra eyes, extra pupils, extra mouth, bad neck::,
```
*Settings: 832×1216 · steps 20 · scale 5.0 · sampler k_euler_ancestral · seed 367843699*

### Reference sheet (Errata - Full)
**Base prompt**
```
1girl, reference sheet, multiple views, grey background, full body, -1::close-up::, Two full-body views of dragon girl stand side by side on flat grey wash. Left view faces viewer. Right view shows her back, facing away from viewer, tail swept out to side. Details remain consistent across views. 1.2::artist:lesly oh::, 1.7::artist:aleksandra skiba::, 1::artist:emmanuel viola::, 2::painterly, cel shading, colored lineart, western comics (style), oil painting (medium)::, Fantasy illustration blending crisp graphic-novel inking with loose painterly color. Thin elegant ink lines with tapering strokes define forms, while visible brushstrokes texture color fills. Shading falls in clear confident shapes with soft painted edges where light meets shadow. high contrast, Stark ink color: deep ink black, warm paper white and cool grey wash, one deep vermilion accent, soft diffuse light, crisp black shadow shapes. year 2026, rating:general, high complexity
```
**Character 1**
```
girl, dragon girl, pale skin, tall female, skinny. Pale skin with cool grey shading. very long hair, straight hair, white hair, gradient hair, colored tips, hair over one eye, swept bangs. White hair darkens through grey to ink-black ends below waist. eastern dragon horns, black horns, pointy ears. Branching antler-like horns drawn in wet black brushstrokes. tareme, long eyelashes, grey eyes, slit pupils, thick eyebrows, black eyeliner, black eyeshadow, black lips, facial scales, scales. Small black scales trace cheekbones, rim ears and cap shoulders. Black scales cover backs of hands and forearms up to elbows, breaking into ink stains on fingertips. small breasts, collarbone, long fingers, sharp fingernails, black nails, narrow waist, wide hips, long legs, dragon tail, white tail, tail mane, black tail tip. Long slim white-scaled tail carries crest of black fur along top, ending in black fur tuft shaped like calligraphy brush, ink dripping from its point. standing, looking at viewer, half-closed eyes, expressionless, hoop earrings, stud earrings, black shirt, t-shirt, crop top, off-shoulder shirt. Loose cropped black tee slips off one shoulder. ring, bracelet. Thin silver rings and bracelets. red skirt, plaid skirt, pleated skirt, miniskirt. Brick-red plaid crossed with thin black lines. black thighhighs, no shoes,
```
**Character 2**
```
girl, dragon girl, pale skin, tall female, skinny. Pale skin with cool grey shading. very long hair, straight hair, white hair, gradient hair, colored tips. White hair darkens through grey to ink-black ends below waist. eastern dragon horns, black horns, pointy ears. Branching antler-like horns drawn in wet black brushstrokes. scales. Small black scales cap shoulders. Black scales cover backs of hands and forearms up to elbows, breaking into ink stains on fingertips. narrow waist, wide hips, long legs, dragon tail, white tail, tail mane, black tail tip. Long slim white-scaled tail carries crest of black fur along top, ending in black fur tuft shaped like calligraphy brush, ink dripping from its point. standing, facing away, black shirt, t-shirt, crop top, off-shoulder shirt, ring, bracelet, red skirt, plaid skirt, pleated skirt, miniskirt. Brick-red plaid crossed with thin black lines. black thighhighs, no shoes,
```
**Undesired content**
```
artist:urushihara satoshi, artist:shirow masamune, artist:yone kinji, artist:shichimenchou, artist:d-rex, 

lowres, worst quality, low quality, bad anatomy, bad hands, jpeg artifacts, watermark, signature, photorealistic, 3d, 2.5d, thick lineart, monochrome, greyscale, halftone, sketch, dark, in shadows, multiple views, sepia, colorful, nsfw
```
**Character 1 UC**
```
petite, curvy, large breasts, muscular, plump, thick thighs, tsurime, round face, chubby cheeks, freckles, button nose, thin lips, blonde hair, brown hair, red eyes, yellow eyes, brown horns, red horns, red lips, red nails, blush, nose blush, shiny skin, wings, dragon wings, demon tail, spade tail, heart tail, thick tail, curled horns, extra ears, boots, 1.5::bad anatomy, bad proportions, wrong anatomy, anatomical nonsense, deformed, disfigured, mutation::, 1.4::bad hands, bad feet, extra digits, fewer digits, extra fingers, missing fingers, fused fingers, extra hands, extra arms, extra legs, missing limb::, 1.3::bad face, extra eyes, extra pupils, extra mouth, bad neck::,
```
**Character 2 UC**
```
petite, curvy, large breasts, muscular, plump, thick thighs, blonde hair, brown hair, brown horns, red horns, shiny skin, wings, dragon wings, demon tail, spade tail, heart tail, thick tail, curled horns, extra ears, boots, looking at viewer, 1.5::bad anatomy, bad proportions, wrong anatomy, anatomical nonsense, deformed, disfigured, mutation::, 1.4::bad hands, bad feet, extra digits, fewer digits, extra fingers, missing fingers, fused fingers, extra hands, extra arms, extra legs, missing limb::,
```
*Settings: 1024×1024 · steps 20 · scale 5.0 · sampler k_euler_ancestral · seed 3288329893*

## Results
![[Errata - 01.png]]
![[Errata - Full.png]]
