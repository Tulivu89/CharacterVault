---
type: prompt
character: "[[Errata]]"
tool: novelai
stage: adult
outfit: ["Signature"]
framing:
preview:
rating: sfw
base_prompt: |
  girl, dragon girl, pale skin, tall female, skinny. Pale skin with cool grey shading.
  very long hair, straight hair, white hair, gradient hair, colored tips, hair over one eye, swept bangs. White hair darkens through grey to ink-black ends below waist.
  eastern dragon horns, black horns. Branching antler-like horns drawn in wet black brushstrokes, dry-brush edges breaking into ink flecks.
  pointy ears, ear piercing. Pointed ears rimmed in small black scales.
  tareme, long eyelashes. Face oval, softly pointed chin, heavy-lidded downturned eyes, small straight nose with slightly upturned tip.
  Full lips, soft high cheekbones, smooth narrow jaw, thick straight black eyebrows set low over eyes.
  grey eyes, 1.3::slit pupils::, thick eyebrows, bags under eyes, black eyeliner, black eyeshadow, mascara, black lips. Pale silver-grey irises split by thin black vertical pupils, sharp winged liner.
  facial scales, mole under eye, 0.5::scar on face::. Few small black scales trace top of each cheekbone toward temple. Small mole under uncovered eye. One thin pale scar splits eyebrow above uncovered eye.
  scales. Small black scales cap shoulders. Black scales cover backs of hands and forearms up to elbows, breaking into ink stains on fingertips.
  small breasts, collarbone, long fingers, sharp fingernails, black nails,
  narrow waist,
  wide hips, long legs,
  dragon tail, white tail, tail mane, black tail tip. Long slim white-scaled tail carries crest of black fur along top, ending in black fur tuft shaped like calligraphy brush, ink dripping from its point.
base_negative: |
  petite, curvy, large breasts, muscular, plump, thick thighs,
  tsurime, round face, chubby cheeks, freckles, button nose, thin lips,
  blonde hair, brown hair, red eyes, yellow eyes, brown horns, red horns, red lips, red nails, blush, nose blush, shiny skin,
  wings, dragon wings, demon tail, spade tail, heart tail, thick tail, curled horns, extra ears, stitches,
  1.5::bad anatomy, bad proportions, wrong anatomy, anatomical nonsense, deformed, disfigured, mutation::, 1.4::bad hands, bad feet, extra digits, fewer digits, extra fingers, missing fingers, fused fingers, extra hands, extra arms, extra legs, missing limb::, 1.3::bad face, extra eyes, extra pupils, extra mouth, bad neck::, 1.2::clone, duplicate::,
avatar_prompt: |
  1girl, solo, grey background, portrait, from above, looking at viewer, half-closed eyes, bored, closed mouth, Dragon girl tilts head slightly down and looks up at viewer from under brows. Flat grey wash fills background. Soft light falls from upper left.
outfit_1_name: "Signature"
outfit_1_prompt: |
  hoop earrings, stud earrings. Black fountain pen tucked behind ear.
  black shirt, t-shirt, crop top, off-shoulder shirt. Loose cropped black tee slips off one shoulder.
  ring, bracelet. Thin silver rings and bracelets.
  red skirt, plaid skirt, pleated skirt, miniskirt. Brick-red plaid crossed with thin black lines.
  black thighhighs, no shoes,
outfit_1_negative: |
  boots, shoes,
created: 2026-11-09
---
# Errata - Prompt - Card Looks
*Edit in the boxes below (Meta Bind) or in the Properties panel. The copy-ready prompts rebuild themselves from these fields.*
*Fields follow `.claude/skills/nai-v5-images/references/character-standard.md`: one slot per line, head to toe. Trim per its framing table before use: the setups below are already trimmed.*

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

## Style: Painterly Comic v2 + Wet Ink

Her house look is the library's Painterly Comic v2 block, used word for word, plus a Wet Ink colour add-on (v0) written for her. The Qiulong reference image used the retired v1 mix of eight artists.

**Settings**
```
Model: NovelAI Diffusion V5 Full (Anime) | Effort: High
Sampler: Euler Ancestral | Noise schedule: Karras | Steps: 28 | Guidance: 4.8 | Rescale: 0.4
Resolution: 832x1216 portrait, 1216x832 sheet | Quality Tags toggle: OFF | UC Preset: None
```

**Style base** (after the scene prose, before the tail)
```
1.2::artist:lesly oh::, 1.7::artist:aleksandra skiba::, 1::artist:emmanuel viola::, 2::painterly, cel shading, colored lineart, western comics (style), oil painting (medium)::, Fantasy illustration blending crisp graphic-novel inking with loose painterly color. Thin elegant ink lines with tapering strokes define forms, while visible brushstrokes texture color fills. Shading falls in clear confident shapes with soft painted edges where light meets shadow.
```

**Wet Ink add-on: with the skirt in frame**
```
high contrast, Stark ink color: deep ink black, warm paper white and cool grey wash, one deep vermilion accent, soft diffuse light, crisp black shadow shapes.
```

**Wet Ink add-on: skirt out of frame** (no red anywhere)
```
high contrast, Stark ink color: deep ink black, warm paper white and cool grey wash, soft diffuse light, crisp black shadow shapes.
```

**Tail**
```
year 2026, rating:general, high complexity
```

**Base UC** (delete `multiple views` for sheets)
```
1::artist:urushihara satoshi, artist:shirow masamune,::, artist:d-rex, lowres, worst quality, low quality, bad anatomy, bad hands, jpeg artifacts, watermark, signature, photorealistic, 3d, 2.5d, thick lineart, monochrome, greyscale, halftone, sketch, dark, in shadows, multiple views, sepia, colorful, nsfw
```

- Changes from the block's own UC:
  - Dropped `limited palette`, which fights the ink palette.
  - Dropped `glossy, shiny`; her horns should look wet. `shiny skin` sits in her own UC instead.
  - Dropped `simple background`, which clashes with the grey wash.
  - Kept `monochrome, greyscale` on purpose: they stop the ink-and-paper prose from collapsing into pure greyscale and losing her skin tone and the red skirt.
- `sepia` and `colorful` aren't in the vault's tag lists. Keep them only if an A/B on a locked seed shows they do something.
- Background: always a flat grey wash (`grey background`). White hair disappears on white, and black horns disappear on black.

## Tested setups

### Face lock / portrait (round 2, holds)
**Base Prompt**
```
1girl, solo, grey background, portrait, from above, looking at viewer, half-closed eyes, bored, closed mouth, Dragon girl tilts head slightly down and looks up at viewer from under brows. Flat grey wash fills background. Soft light falls from upper left. 1.2::artist:lesly oh::, 1.7::artist:aleksandra skiba::, 1::artist:emmanuel viola::, 2::painterly, cel shading, colored lineart, western comics (style), oil painting (medium)::, Fantasy illustration blending crisp graphic-novel inking with loose painterly color. Thin elegant ink lines with tapering strokes define forms, while visible brushstrokes texture color fills. Shading falls in clear confident shapes with soft painted edges where light meets shadow. high contrast, Stark ink color: deep ink black, warm paper white and cool grey wash, soft diffuse light, crisp black shadow shapes. year 2026, rating:general, high complexity
```
**Character 1**
```
girl, dragon girl, pale skin. Pale skin with cool grey shading.
very long hair, straight hair, white hair, gradient hair, colored tips, hair over one eye, swept bangs. White hair darkens through grey toward ink-black ends.
eastern dragon horns, black horns. Branching antler-like horns drawn in wet black brushstrokes, dry-brush edges breaking into ink flecks.
pointy ears, ear piercing. Pointed ears rimmed in small black scales.
tareme, long eyelashes. Face oval, softly pointed chin, heavy-lidded downturned eyes, small straight nose with slightly upturned tip.
Full lips, soft high cheekbones, smooth narrow jaw, thick straight black eyebrows set low over eyes.
grey eyes, 1.3::slit pupils::, thick eyebrows, bags under eyes, black eyeliner, black eyeshadow, mascara, black lips. Pale silver-grey irises split by thin black vertical pupils, sharp winged liner.
facial scales, mole under eye, 0.5::scar on face::. Few small black scales trace top of each cheekbone toward temple. Small mole under uncovered eye. One thin pale scar splits eyebrow above uncovered eye.
scales. Small black scales cap bare shoulder.
hoop earrings, stud earrings. Black fountain pen tucked behind ear.
black shirt, off-shoulder shirt, bare shoulders.
```
**Character 1 UC**
```
tsurime, round face, chubby cheeks, freckles, button nose, thin lips,
blonde hair, brown hair, red eyes, yellow eyes, brown horns, red horns, red lips, blush, nose blush, shiny skin,
wings, curled horns, extra ears, stitches,
1.5::bad anatomy, bad proportions, wrong anatomy, anatomical nonsense, deformed, disfigured, mutation::, 1.3::bad face, extra eyes, extra pupils, extra mouth, bad neck::,
```

### Character sheet, front and back (round 2, holds)
1216x832. Two boxes under one `1girl`: one character, one box per view.

**Base Prompt**
```
1girl, reference sheet, multiple views, grey background, full body, -1::close-up::, Two full-body views of dragon girl stand side by side on flat grey wash. Left view faces viewer. Right view shows her back, facing away from viewer, tail swept out to side. Details remain consistent across views. 1.2::artist:lesly oh::, 1.7::artist:aleksandra skiba::, 1::artist:emmanuel viola::, 2::painterly, cel shading, colored lineart, western comics (style), oil painting (medium)::, Fantasy illustration blending crisp graphic-novel inking with loose painterly color. Thin elegant ink lines with tapering strokes define forms, while visible brushstrokes texture color fills. Shading falls in clear confident shapes with soft painted edges where light meets shadow. high contrast, Stark ink color: deep ink black, warm paper white and cool grey wash, one deep vermilion accent, soft diffuse light, crisp black shadow shapes. year 2026, rating:general, high complexity
```
**Base UC:** the Base UC above, without `multiple views`.

**Character 1: position x≈0.28 y≈0.40 (front)**
```
girl, dragon girl, pale skin, tall female, skinny. Pale skin with cool grey shading.
very long hair, straight hair, white hair, gradient hair, colored tips, hair over one eye, swept bangs. White hair darkens through grey to ink-black ends below waist.
eastern dragon horns, black horns, pointy ears. Branching antler-like horns drawn in wet black brushstrokes.
tareme, long eyelashes,
grey eyes, slit pupils, thick eyebrows, black eyeliner, black eyeshadow, black lips,
facial scales, scales. Small black scales trace cheekbones, rim ears and cap shoulders. Black scales cover backs of hands and forearms up to elbows, breaking into ink stains on fingertips.
small breasts, collarbone, long fingers, sharp fingernails, black nails,
narrow waist,
wide hips, long legs,
dragon tail, white tail, tail mane, black tail tip. Long slim white-scaled tail carries crest of black fur along top, ending in black fur tuft shaped like calligraphy brush, ink dripping from its point.
standing, looking at viewer, half-closed eyes, expressionless,
hoop earrings, stud earrings,
black shirt, t-shirt, crop top, off-shoulder shirt. Loose cropped black tee slips off one shoulder.
ring, bracelet. Thin silver rings and bracelets.
red skirt, plaid skirt, pleated skirt, miniskirt. Brick-red plaid crossed with thin black lines.
black thighhighs, no shoes,
```
**Character 1 UC**
```
petite, curvy, large breasts, muscular, plump, thick thighs,
tsurime, round face, chubby cheeks, freckles, button nose, thin lips,
blonde hair, brown hair, red eyes, yellow eyes, brown horns, red horns, red lips, red nails, blush, nose blush, shiny skin,
wings, dragon wings, demon tail, spade tail, heart tail, thick tail, curled horns, extra ears, boots,
1.5::bad anatomy, bad proportions, wrong anatomy, anatomical nonsense, deformed, disfigured, mutation::, 1.4::bad hands, bad feet, extra digits, fewer digits, extra fingers, missing fingers, fused fingers, extra hands, extra arms, extra legs, missing limb::, 1.3::bad face, extra eyes, extra pupils, extra mouth, bad neck::,
```

**Character 2: position x≈0.72 y≈0.40 (back)**
```
girl, dragon girl, pale skin, tall female, skinny. Pale skin with cool grey shading.
very long hair, straight hair, white hair, gradient hair, colored tips. White hair darkens through grey to ink-black ends below waist.
eastern dragon horns, black horns, pointy ears. Branching antler-like horns drawn in wet black brushstrokes.
scales. Small black scales cap shoulders. Black scales cover backs of hands and forearms up to elbows, breaking into ink stains on fingertips.
narrow waist,
wide hips, long legs,
dragon tail, white tail, tail mane, black tail tip. Long slim white-scaled tail carries crest of black fur along top, ending in black fur tuft shaped like calligraphy brush, ink dripping from its point.
standing, facing away,
black shirt, t-shirt, crop top, off-shoulder shirt,
ring, bracelet,
red skirt, plaid skirt, pleated skirt, miniskirt. Brick-red plaid crossed with thin black lines.
black thighhighs, no shoes,
```
**Character 2 UC**
```
petite, curvy, large breasts, muscular, plump, thick thighs,
blonde hair, brown hair, brown horns, red horns, shiny skin,
wings, dragon wings, demon tail, spade tail, heart tail, thick tail, curled horns, extra ears, boots, looking at viewer,
1.5::bad anatomy, bad proportions, wrong anatomy, anatomical nonsense, deformed, disfigured, mutation::, 1.4::bad hands, bad feet, extra digits, fewer digits, extra fingers, missing fingers, fused fingers, extra hands, extra arms, extra legs, missing limb::,
```

## Emotion tags
*Draft for CharacterRoom's 24-emotion set at 256×256, built on the face-lock setup. Her baseline is flat and heavy-lidded, so most rows are understated. Rows that need colour in the face (embarrassed, aroused, love) need `blush` taken out of her UC for that render. Retune these once her personality note is written.*

| Emotion | Tags |
|---|---|
| neutral | expressionless, half-closed eyes, closed mouth, looking at viewer |
| bored | bored, half-closed eyes, expressionless, head rest, hand on own cheek |
| tired | tired, half-closed eyes, drooping eyes, yawning |
| smug | smug, smirk, half-closed eyes, raised eyebrow |
| irritated | annoyed, frown, narrowed eyes, closed mouth |
| angry | angry, furrowed brow, v-shaped eyebrows, glaring, clenched teeth |
| disgusted | disgust, grimace, narrowed eyes, frown |
| thinking | thinking, hand on own chin, looking up, closed mouth |
| confused | confused, head tilt, raised eyebrow, closed mouth |
| determined | determined, serious, furrowed brow, closed mouth |
| surprised | surprised, wide eyes, raised eyebrows, parted lips |
| happy | light smile, half-closed eyes, closed mouth |
| laughing | laughing, closed eyes, open mouth, hand over own mouth |
| playful | smirk, one eye closed, looking at viewer |
| excited | wide eyes, sparkling eyes, parted lips, light smile |
| love | light blush, gentle smile, half-closed eyes, looking at viewer |
| shy | looking away, light blush, closed mouth, own hands together |
| embarrassed | embarrassed, blush, looking away, wavy mouth |
| nervous | nervous, sweatdrop, looking to the side, closed mouth |
| worried | worried, furrowed brow, frown, looking down |
| sad | sad, frown, downturned eyes, looking down |
| hurt | pain, wince, one eye closed, clenched teeth |
| scared | scared, wide eyes, constricted pupils, open mouth |
| aroused | half-closed eyes, parted lips, light blush, looking at viewer |

## Open options
- Toeless black thighhighs that show black-scaled toes with small claws.
- `ear fins` (Eastern-dragon fin ears) instead of pointed ears, with the hoops pierced through the fins.
- If the colour runs warm in a scene, add `0.6::` Mike Mignola and Becky Cloonan from the v1 mix for heavier blacks. The next fallback is `spot color`.

## Still to make
1. Headshot avatar, square, readable at 48 px (crop of the face lock, or a 1024×1024 render).
2. Key art: full body, sitting sideways in a chair with a manuscript, tail looped round the chair leg.
3. Emotion portraits from the table above.

## Results
*Embed favorite outputs from `images/`. Set the best one as `preview` above.*
