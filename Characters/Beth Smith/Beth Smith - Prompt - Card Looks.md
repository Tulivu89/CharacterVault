---
type: prompt
character: "[[Beth Smith]]"
world: "[[Smith House]]"
tool: novelai
stage: adult
outfit: ["At home", "Surgery", "Third glass"]
framing:
preview:
rating: suggestive
base_prompt: |
  girl, slim, toned, 0.6::mature female::, fair skin. Lean from long shifts and barn work.
  medium hair, wavy hair, blonde hair. Shoulder-length loose waves.
  tsurime, long eyelashes. Face oval, defined chin, almond-shaped eyes, straight narrow nose.
  High defined cheekbones, thin arched eyebrows, thin lips pressed tight. Fine lines at the corners of her eyes.
  green eyes. Light makeup, faint shadows under her eyes.
  collarbone, medium breasts. Strong hands, a small crescent scar on the back of the left one.
  narrow waist,
base_negative: |
  petite, curvy, plump, large breasts,
  tareme, round face, chubby cheeks, button nose,
  brown hair, red hair, blue eyes,
avatar_prompt: "portrait, upper body, simple background,"
outfit_1_name: "At home"
outfit_1_prompt: |
  blouse, white blouse, sleeves rolled up. Cream silk blouse.
  cardigan, brown cardigan,
  pants, black pants. Dark tailored slacks, low flats.
  A glass of red wine in one hand.
outfit_1_negative: |
  dress, skirt, high heels,
outfit_2_name: "Surgery"
outfit_2_prompt: |
  Navy surgical scrubs and a navy surgical cap, a smear of blood at the hem.
  Latex gloves pulled down to her wrists.
outfit_2_negative: |
  blouse, cardigan, dress, jewelry,
outfit_3_name: "Third glass"
outfit_3_prompt: |
  lingerie, lace, bra, panties. Dark red lace under a short silk robe hanging open.
  barefoot,
  A glass of red wine in one hand.
outfit_3_negative: |
  blouse, cardigan, pants, shoes,
created: 2026-11-28
---
# Beth Smith - Prompt - Card Looks
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
| tight smile | smile, closed mouth, narrowed eyes, raised eyebrow |
| cutting | smirk, half-closed eyes, raised eyebrow, looking at viewer |
| focused | serious, determined, furrowed brow, closed mouth |
| irritated | annoyed, frown, narrowed eyes |
| drunk | blush, half-closed eyes, smile, flushed face |
| cold | expressionless, narrowed eyes, closed mouth |
| hurt | sad, frown, downturned eyes, tears, biting own lip |
| aroused | blush, half-closed eyes, parted lips, heavy breathing, flushed face |
