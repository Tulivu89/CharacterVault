---
type: prompt
character: "[[Summer Smith]]"
world: "[[Smith House]]"
tool: novelai
stage: adult
outfit: ["Campus", "Apartment", "Night in"]
framing:
preview:
rating: suggestive
base_prompt: |
  girl, tall female, skinny, 0.4::mature female::, long legs, fair skin.
  long hair, high ponytail, straight hair, orange hair. Bright orange-red, a few loose strands at the temples.
  Face oval, sharp chin, straight nose, small mouth.
  freckles. Freckles across her nose and cheeks.
  green eyes, thick eyebrows. Strong straight brows, light mascara.
  ear piercing. A small silver hoop through the upper edge of her left ear.
  small breasts, collarbone. Freckles across her shoulders.
  narrow waist,
  hip tattoo. A small black star tattooed on her left hip.
base_negative: |
  petite, curvy, thick thighs, plump,
  tareme, round face, chubby cheeks,
  brown hair, blonde hair, pink hair, blue eyes,
avatar_prompt: "portrait, upper body, simple background,"
outfit_1_name: "Campus"
outfit_1_prompt: |
  crop top, black crop top, midriff,
  jacket, green jacket. Green bomber jacket hanging off one shoulder.
  jeans, blue jeans. High-waisted light-wash jeans.
  sneakers, white sneakers. Chunky platform soles.
  holding phone, smartphone, shoulder bag,
outfit_1_negative: |
  skirt, dress, high heels,
outfit_2_name: "Apartment"
outfit_2_prompt: |
  tank top, white tank top,
  shorts, denim shorts,
  barefoot,
  holding phone, smartphone. Ponytail coming loose.
outfit_2_negative: |
  jacket, jeans, shoes,
outfit_3_name: "Night in"
outfit_3_prompt: |
  camisole, lace. Thin black camisole.
  panties, black panties,
  barefoot. Sitting cross-legged on an unmade bed.
  holding phone, smartphone,
outfit_3_negative: |
  jacket, jeans, shorts, shoes,
created: 2026-11-28
---
# Summer Smith - Prompt - Card Looks
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
| bored | bored, half-closed eyes, expressionless, holding phone |
| smug | smug, smirk, half-closed eyes, raised eyebrow |
| irritated | annoyed, frown, narrowed eyes, pout |
| playful | grin, one eye closed, tongue out, teasing, looking at viewer |
| determined | determined, serious, furrowed brow, closed mouth |
| angry | angry, furrowed brow, glaring, clenched teeth |
| hurt (private) | sad, frown, downturned eyes, tears, looking down |
| aroused | blush, half-closed eyes, parted lips, smirk, flushed face |
