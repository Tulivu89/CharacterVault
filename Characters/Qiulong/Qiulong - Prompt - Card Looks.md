---
type: prompt
character: "[[Qiulong]]"
tool: waifoundry
stage: adult
outfit: ["Qipao", "Off-duty"]
framing:
preview:
rating: sfw
base_prompt: "girl, Qiulong, autumn dragon, dragon girl, petite female, warm umber skin, mahogany skin, subtle dark freckles, voluminous wavy hair, gradient hair, dark auburn roots, rich crimson hair, fiery orange tips, molten gold eyes, deep amber eyes, vertical slit pupils, dark bronze horns, ribbed horns, curved backward horns, pointed draconic ears, bronze scales on ears, thick dragon tail, deep crimson scales, bronze scales, tufted tail tip, fluffy tail, autumn leaf colored tail fur, small breasts, narrow waist, wide hips, small feet,"
base_negative: "large breasts, tall female, muscular female, pale skin, wings, multiple tails, child,"
avatar_prompt: "autumn forest background, falling leaves, close-up, portrait, looking at viewer,"
outfit_1_name: "Qipao"
outfit_1_prompt: "fitted deep crimson qipao, sleeveless, high slit, short dress, exposed shoulders, bare arms, gold embroidery, chrysanthemum pattern, maple leaf pattern, bronze arm bracers, amber pendant, red thigh-high stockings, barefoot, no shoes, complex braided updo, loose strands, bronze hairpins,"
outfit_1_negative: "shoes, sleeves,"
outfit_2_name: "Off-duty"
outfit_2_prompt: "oversized knit sweater, off-shoulder, sleeves past wrists, loose wavy hair, red thigh-high stockings, barefoot, no shoes,"
outfit_2_negative: "updo, hairpins, qipao,"
created: 2026-10-19
---
# Qiulong - Prompt - Card Looks
*Edit in the boxes below (Meta Bind) or in the Properties panel. The copy-ready prompts at the bottom rebuild themselves from these fields.*
*Small-statured adults keep `child, aged down` in the negative prompt.*

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

## Outfit 2
**Name** `INPUT[text:outfit_2_name]`

**Prompt**
`INPUT[textArea:outfit_2_prompt]`

**Negative**
`INPUT[textArea:outfit_2_negative]`

## Flat prompt
*Long-press to select and copy. Each look is base plus outfit; the avatar line adds the card's portrait framing.*

### `VIEW[{outfit_1_name}][text]`
`VIEW[{base_prompt}, {outfit_1_prompt}][text]`

### `VIEW[{outfit_2_name}][text]`
`VIEW[{base_prompt}, {outfit_2_prompt}][text]`

### Avatar
`VIEW[{base_prompt}, {avatar_prompt}, {outfit_1_prompt}][text]`

## Negative / undesired

**`VIEW[{outfit_1_name}][text]`**
`VIEW[{base_negative}, {outfit_1_negative}][text]`

**`VIEW[{outfit_2_name}][text]`**
`VIEW[{base_negative}, {outfit_2_negative}][text]`

## Emotion tags
*Added to the prompt for each expression the card can show.*

| Emotion | Tags |
|---|---|
| angry | angry, v-shaped eyebrows, glaring, open mouth, shouting, sharp teeth, tail raised |
| aroused | half-closed eyes, heavy blush, parted lips, sweat, steaming body, heavy breathing, looking at viewer |
| bored | bored, half-closed eyes, head rest, looking away, closed mouth, holding dice |
| confused | confused, head tilt, raised eyebrow, frown, spoken question mark |
| determined | serious, furrowed brow, narrowed eyes, closed mouth, clenched hand |
| disgusted | disgusted, scowl, wrinkled nose, looking down at viewer |
| embarrassed | embarrassed, full-face blush, wavy mouth, looking away, sweatdrop |
| excited | excited, wide grin, sparkling eyes, sharp teeth, leaning forward, tail raised |
| happy | happy, smile, closed eyes, open mouth, light blush |
| hurt | pained, wince, clenched teeth, one eye closed, tears |
| irritated | annoyed, frown, narrowed eyes, pout, crossed arms |
| laughing | laughing, head back, open mouth, closed eyes, sharp teeth |
| love | soft smile, half-closed eyes, light blush, dilated pupils, head tilt, holding own tail |
| nervous | nervous smile, sweatdrop, looking away, fidgeting, tail curled |
| neutral | closed mouth, slight smile, looking at viewer |
| playful | playful, grin, wink, tongue out |
| sad | sad, downcast eyes, frown, looking down, holding pendant |
| scared | scared, wide-eyed, shrunken pupils, open mouth, sweat |
| shy | shy, light blush, looking away, hand on own cheek, tail around legs |
| smug | smug, smirk, half-closed eyes, raised eyebrow, hand on own hip |
| surprised | surprised, wide-eyed, raised eyebrows, open mouth |
| thinking | thinking, hand on own chin, looking up, pout |
| tired | sleepy, half-closed eyes, yawning, droopy eyes |
| worried | worried, furrowed brow, frown, biting lip, looking away |

## Waifoundry setup
*Paste a Waifoundry export here once this character has one. The fields above came from the AnotherRoom card.*
```json
{}
```

## Results
*Embed favorite outputs. Set the best one as `preview` above. Adult outputs go in `images/adult`.*
