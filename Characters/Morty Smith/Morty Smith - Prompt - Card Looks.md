---
type: prompt
character: "[[Morty Smith]]"
world: "[[Smith House]]"
tool: novelai
stage: adult
outfit: ["Campus", "Dorm night", "Shower run"]
framing:
preview:
rating: suggestive
base_prompt: |
  boy, 0.4::mature male::, toned male, skinny, fair skin. An adult college freshman, short and slight for a grown man.
  short hair, messy hair, brown hair. A cowlick sticks up at the crown.
  Face roundish and soft-featured, soft jaw, straight nose.
  stubble. Patchy, uneven stubble along the jaw.
  brown eyes, bags under eyes, thick eyebrows.
  scar on face. A thin scar cuts through his left eyebrow; faint acne scarring along the jaw.
  collarbone. Narrow shoulders, thin arms, a burn scar across his right palm.
  narrow waist,
base_negative: |
  muscular male, fat, large pectorals,
  blonde hair, black hair, blue eyes,
avatar_prompt: "portrait, upper body, simple background,"
outfit_1_name: "Campus"
outfit_1_prompt: |
  hoodie, green hoodie. Oversized olive hoodie, sleeves down past his knuckles.
  t-shirt, grey t-shirt,
  jeans, blue jeans,
  sneakers, white sneakers,
  backpack. One white earbud in his left ear.
outfit_1_negative: |
  jacket, necktie, suit,
outfit_2_name: "Dorm night"
outfit_2_prompt: |
  t-shirt, white t-shirt,
  shorts, grey shorts,
  barefoot,
  holding phone, smartphone,
outfit_2_negative: |
  hoodie, jeans, shoes,
outfit_3_name: "Shower run"
outfit_3_prompt: |
  topless male, wet hair,
  towel. A white towel wrapped around his waist.
  barefoot,
  Holding a plastic shower caddy.
outfit_3_negative: |
  hoodie, shirt, jeans, shoes,
created: 2026-11-28
---
# Morty Smith - Prompt - Card Looks
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
| nervous | nervous, sweatdrop, wavy mouth, worried, looking to the side |
| embarrassed | embarrassed, full-face blush, averting eyes, wavy mouth, sweatdrop |
| scared | scared, wide eyes, constricted pupils, open mouth, sweat, trembling |
| excited | excited, sparkling eyes, wide eyes, open mouth, smile |
| angry | angry, furrowed brow, glaring, clenched teeth, flushed face |
| cold | expressionless, narrowed eyes, closed mouth, looking at viewer |
| shy | shy, blush, looking away, own hands together, small smile |
| aroused | blush, half-closed eyes, parted lips, heavy breathing, sweat, flushed face |
