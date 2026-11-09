---
type: prompt
character: "[[Lascivia]]"
tool: novelai
stage: adult
outfit: ["Work clothes", "Off duty"]
framing:
preview:
rating: suggestive
world: "Moved Back Home"
base_prompt: "girl, succubus, demon girl, colored skin, pink skin, tall female, 0.5::mature female::. Warm rose-pink skin. very long hair, wavy hair, black hair, parted bangs, curled horns, black horns, pointy ears, long eyelashes, eyeshadow, red lips, yellow eyes, slit pupils, mole under eye, medium breasts, black nails, sharp fingernails, narrow waist. Slender svelte figure. wide hips, long legs, demon tail, spade tail, long tail,"
base_negative: "petite, short, chibi, fat, plump, muscular, large breasts, huge breasts, flat chest, purple skin, red skin, blonde hair, small horns, wings, multiple tails, glasses, loli, child, aged down,"
avatar_prompt: "simple background, close-up, portrait, looking at viewer, half-closed eyes, smirk,"
outfit_1_name: "Work clothes"
outfit_1_prompt: "gold earrings, crop top, strapless. Black strapless crop top edged in gold trim. armlet, gold jewelry, pelvic curtain, black pelvic curtain, gold trim, revealing clothes, anklet, high heels, black high heels,"
outfit_1_negative: "coat, shirt, skirt,"
outfit_2_name: "Off duty"
outfit_2_prompt: "gold earrings, white shirt, collared shirt, coat, brown coat, long coat, open coat, pencil skirt, black skirt, high heels, black high heels,"
outfit_2_negative: "pelvic curtain, crop top, armlet, revealing clothes,"
created: 2026-11-09
---
# Lascivia - Prompt - Moved Back Home
*Edit in the boxes below (Meta Bind) or in the Properties panel. The copy-ready prompts rebuild themselves from these fields. For more looks, add `outfit_3_name`, `outfit_3_prompt` and `outfit_3_negative` and copy an Outfit block.*
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
*Long-press to select and copy.*

### `VIEW[{outfit_1_name}][text]`
`VIEW[{base_prompt} {outfit_1_prompt}][text]`

### `VIEW[{outfit_2_name}][text]`
`VIEW[{base_prompt} {outfit_2_prompt}][text]`

## Negative / undesired
**`VIEW[{outfit_1_name}][text]`**
`VIEW[{base_negative} {outfit_1_negative}][text]`

**`VIEW[{outfit_2_name}][text]`**
`VIEW[{base_negative} {outfit_2_negative}][text]`

## Emotion tags
| Emotion | Tags |
|---|---|
| neutral | half-closed eyes, closed mouth |
| amused | smirk, half-closed eyes |
| teaching | smile, looking at another |

## Style notes
- Tested in three styles: the Full.png mix (Depravitae's), Painterly Comic + Warm, Vivid Pop.
- In pairs with Depravitae: add her bleed guard (`hair bun, hair bow, frilled dress, thighhighs, colored inner hair`) to this UC. `tall female` stays on this side only.
- Pink skin won the coloring test over red and white-flushed-red.

## Results
*Embed favorite outputs. Set the best one as `preview` above. Adult outputs go in `images/adult`.*
