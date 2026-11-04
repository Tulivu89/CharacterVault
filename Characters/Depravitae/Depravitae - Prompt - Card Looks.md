---
type: prompt
character: "[[Depravitae]]"
tool: waifoundry
stage: adult
outfit: ["Pajamas", "Going out"]
framing:
preview:
rating: sfw
base_prompt: "girl, 1.5::oriental, Asian, asian facial features::, succubus, demon girl, purple hair, colored inner hair, single hair bun, messy hair, sidelocks, small horns, purple horns, pointy ears, yellow eyes, slit pupils, black eyeliner, fang, colored skin, lavender skin, rectangular eyewear, black-framed eyewear, Her skin is a soft lavender, matching her two small horns., petite, small breasts, toned stomach, wide hips, thick thighs, toned legs, small feet, demon tail, thin tail, spade tail, black nails, sharp nails,"
base_negative: "wings, large horns, long horns, round eyewear, large breasts, tall female, multiple tails, child, loli, aged down, flat chest,"
avatar_prompt: "simple background, purple background, close-up, portrait, looking at viewer, grin, fang,"
outfit_1_name: "Pajamas"
outfit_1_prompt: "oversized white tank top, purple sleep shorts, barefoot, no shoes,"
outfit_1_negative: "hoodie, boots, fishnets,"
outfit_2_name: "Going out"
outfit_2_prompt: "black hoodie, cropped hoodie, midriff, ripped denim shorts, fishnet pantyhose, platform boots,"
outfit_2_negative: "tank top, sleep shorts, barefoot,"
created: 2026-10-19
---
# Depravitae - Prompt - Card Looks
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

## Waifoundry setup
*Paste a Waifoundry export here once this character has one. The fields above came from the AnotherRoom card.*
```json
{}
```

## Results
*Embed favorite outputs. Set the best one as `preview` above. Adult outputs go in `images/adult`.*
