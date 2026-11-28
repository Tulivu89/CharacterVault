---
type: prompt
character: "[[Jerry Smith]]"
world: "[[Smith House]]"
tool: novelai
stage: adult
outfit: ["Dad casual", "Sourdough day", "Big night"]
framing:
preview:
rating: suggestive
base_prompt: |
  boy, mature male, fair skin. Soft dad build, narrow shoulders.
  short hair, brown hair. Combed neatly, the hairline receding at the temples.
  Face long, weak chin, straight nose, worried brow, clean-shaven.
  brown eyes. Eager eyes that look hurt easily.
  Soft hands.
  belly. A modest soft paunch.
base_negative: |
  abs, muscular male, toned male,
  stubble, beard,
  blonde hair, black hair, white hair,
avatar_prompt: "portrait, upper body, simple background,"
outfit_1_name: "Dad casual"
outfit_1_prompt: |
  Lanyard from his last job around his neck.
  collared shirt, short sleeves, shirt tucked in. Blue plaid short-sleeved button-down.
  belt. Pleated tan khakis.
  sneakers, white sneakers,
outfit_1_negative: |
  suit, necktie, jacket,
outfit_2_name: "Sourdough day"
outfit_2_prompt: |
  t-shirt, grey t-shirt,
  apron. Flour down the front of the apron.
  shorts,
  Holding a bowl of bread dough.
outfit_2_negative: |
  collared shirt, suit, necktie,
outfit_3_name: "Big night"
outfit_3_prompt: |
  topless male. Soft chest, light chest hair.
  briefs, white briefs. Black dress socks still on.
  Candles lit behind him; a hopeful smile.
outfit_3_negative: |
  shirt, pants, shoes, apron,
created: 2026-11-28
---
# Jerry Smith - Prompt - Card Looks
*Edit in the boxes below (Meta Bind) or in the Properties panel. The copy-ready prompts rebuild themselves from these fields.*
*An original adult look for the [[Smith House]] remix, built from the character page: no series or character tags. Untested; lock a seed and A/B before calling it settled. Pair with any style block (Semirealistic mix and Painterly Comic both suit it).*

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

## Outfit 3
**Name** `INPUT[text:outfit_3_name]`

**Prompt**
`INPUT[textArea:outfit_3_prompt]`

**Negative**
`INPUT[textArea:outfit_3_negative]`

## Flat prompt
*Long-press to select and copy. Each look is base plus outfit; the avatar line adds portrait framing.*

### `VIEW[{outfit_1_name}][text]`
`VIEW[{base_prompt} {outfit_1_prompt}][text]`

### `VIEW[{outfit_2_name}][text]`
`VIEW[{base_prompt} {outfit_2_prompt}][text]`

### `VIEW[{outfit_3_name}][text]`
`VIEW[{base_prompt} {outfit_3_prompt}][text]`

### Avatar
`VIEW[{base_prompt} {avatar_prompt} {outfit_1_prompt}][text]`

## Negative / undesired

**`VIEW[{outfit_1_name}][text]`**
`VIEW[{base_negative} {outfit_1_negative}][text]`

**`VIEW[{outfit_2_name}][text]`**
`VIEW[{base_negative} {outfit_2_negative}][text]`

**`VIEW[{outfit_3_name}][text]`**
`VIEW[{base_negative} {outfit_3_negative}][text]`

## Emotion tags
*Added to the prompt for each expression; tuned to the character's Under pressure notes.*

| Emotion | Tags |
|---|---|
| hopeful | smile, raised eyebrows, looking at viewer, open mouth |
| whining | frown, worried, open mouth, raised eyebrows |
| hurt | sad, frown, downturned eyes, looking down, pout |
| indignant | annoyed, furrowed brow, open mouth, pointing |
| scared | scared, wide eyes, open mouth, sweat, trembling |
| embarrassed | embarrassed, full-face blush, averting eyes, wavy mouth, sweatdrop |
| smug (rare) | smug, smirk, half-closed eyes |
| aroused | full-face blush, half-closed eyes, parted lips, sweat, flushed face |
