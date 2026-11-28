---
type: prompt
character: "[[Rick Sanchez]]"
world: "[[Smith House]]"
tool: novelai
stage: elder
outfit: ["Garage", "Late night", "Bedroom"]
framing:
preview:
rating: suggestive
base_prompt: |
  boy, old man, tall male, skinny, fair skin. Gaunt and stooped, wiry old muscle under loose skin.
  short hair, spiked hair, messy hair, white hair. Dirty white going yellowish at the front, standing straight up.
  Face long and deeply lined, hooked nose, thin mouth, heavy furrowed brow.
  stubble. Short white stubble, never a beard.
  grey eyes, bags under eyes, thick eyebrows. Red-rimmed eyes with a flat, measuring stare.
  A small steel port set behind his right ear.
  Bony shoulders, ropey forearms with old burn scars, big knuckly liver-spotted hands.
base_negative: |
  muscular male, fat, large pectorals,
  round face, button nose,
  blonde hair, black hair, brown hair, blue hair, blue eyes,
avatar_prompt: "portrait, upper body, simple background,"
outfit_1_name: "Garage"
outfit_1_prompt: |
  lab coat, open lab coat, white lab coat. Stained and scorched at the cuffs.
  shirt, grey shirt. A faded charcoal henley, top buttons undone.
  brown pants, belt,
  boots, brown boots,
  A dented steel hip flask in one hand.
outfit_1_negative: |
  necktie, suit, sweater,
outfit_2_name: "Late night"
outfit_2_prompt: |
  tank top, white tank top. Stained and threadbare.
  brown pants,
  barefoot,
  Sitting on a cluttered workbench with a dented steel hip flask.
outfit_2_negative: |
  lab coat, jacket, shoes,
outfit_3_name: "Bedroom"
outfit_3_prompt: |
  topless male. Grey chest hair, a surgical scar along the left ribs.
  shorts. Loose striped boxer shorts.
  barefoot,
  A dented steel hip flask in one hand.
outfit_3_negative: |
  lab coat, shirt, pants, boots,
created: 2026-11-28
---
# Rick Sanchez - Prompt - Card Looks
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
| bored | bored, half-closed eyes, expressionless, head rest |
| contempt | disgust, narrowed eyes, frown, raised eyebrow |
| smug | smug, smirk, half-closed eyes, raised eyebrow |
| manic | grin, wide eyes, open mouth, teeth, sweat |
| drunk | blush, half-closed eyes, open mouth, flushed face |
| cold | expressionless, narrowed eyes, closed mouth, looking at viewer |
| angry | angry, furrowed brow, glaring, clenched teeth |
| sad (alone) | sad, downturned eyes, looking down, closed mouth |
