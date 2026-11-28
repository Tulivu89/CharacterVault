---
type: prompt
character: "[[Space Beth]]"
world: "[[Smith House]]"
tool: novelai
stage: adult
outfit: ["Kit", "Downtime", "After a fight"]
framing:
preview:
rating: suggestive
base_prompt: |
  girl, toned, muscular female, 0.6::mature female::, tan. Hard muscle, weathered by other suns.
  very short hair, blonde hair. Cropped short on top.
  undercut. The left side shaved to the skin.
  thick eyebrows. Face oval with lean hollows, strong angular jaw, deep-set eyes, straight nose.
  Prominent cheekbones, straight heavy eyebrows, a wide crooked grin. Crow's feet from squinting.
  green eyes. No makeup.
  scar across eye, scar on cheek. A scar runs through her left eyebrow and down the cheekbone.
  tanlines. Pale armor tan lines at the collar and upper arms; old burn scars on the forearms.
  broad shoulders, medium breasts,
  abs. A knife scar along her right ribs.
  thick thighs,
base_negative: |
  petite, skinny, plump,
  tareme, long eyelashes, makeup, round face, button nose,
  long hair, brown hair, pale skin,
avatar_prompt: "portrait, upper body, simple background,"
outfit_1_name: "Kit"
outfit_1_prompt: |
  Dog tag on a ball chain.
  tank top, vest, grey vest. Scuffed armored tactical vest over a black tank top.
  fingerless gloves, black gloves,
  pants. Olive cargo pants.
  holster. Pistol in a thigh holster.
  boots, black boots. Laced combat boots.
outfit_1_negative: |
  dress, skirt, high heels, jewelry,
outfit_2_name: "Downtime"
outfit_2_prompt: |
  Dog tag on a ball chain.
  tank top. Black tank top.
  pants. Olive cargo pants.
  barefoot. A bottle of beer in one hand, feet up on the kitchen table.
outfit_2_negative: |
  vest, gloves, boots,
outfit_3_name: "After a fight"
outfit_3_prompt: |
  sports bra. Black sports bra and boy shorts.
  holster. Holster still strapped to one thigh.
  barefoot,
  Bruised ribs, a fresh bandage around her upper arm, split knuckles.
outfit_3_negative: |
  vest, pants, boots, dress,
created: 2026-11-28
---
# Space Beth - Prompt - Card Looks
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
| lazy grin | grin, half-closed eyes, smirk, looking at viewer |
| smug | smug, smirk, half-closed eyes, raised eyebrow |
| fighting | angry, grin, teeth, furrowed brow, v-shaped eyebrows |
| bored | bored, half-closed eyes, expressionless |
| jealous | frown, narrowed eyes, looking to the side, closed mouth |
| laughing | laughing, closed eyes, open mouth |
| hurt (hidden) | expressionless, downturned eyes, looking down, closed mouth |
| aroused | blush, half-closed eyes, smirk, heavy breathing, sweat |
