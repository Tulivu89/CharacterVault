---
type: prompt
character: "[[Rusty]]"
tool: waifoundry
stage: adult
outfit: ["Hoodie", "Apron"]
framing:
preview:
rating: sfw
base_prompt: "boy, 1.5::cat boy::, messy hair, orange hair, short hair, hair between eyes, orange cat ears, one ear folded, animal ear fluff, yellow eyes, tareme, peach fuzz, 1.5::dark-skinned male, tan skin::, tall, lanky, thin, slouching, bony wrists, orange tail, striped tail, ringed tabby stripes along his tail"
base_negative: "anthro, furry, muscular, abs, broad shoulders, handsome, female, long hair, pale skin"
avatar_prompt: "portrait, upper body, simple background"
outfit_1_name: "Hoodie"
outfit_1_prompt: "oversized orange hoodie, hood down, chewed drawstrings, cargo shorts, white crew socks, grey sneakers, untied shoelaces"
outfit_1_negative: "apron"
outfit_2_name: "Apron"
outfit_2_prompt: "apron, grey t-shirt, cargo shorts, white crew socks, holding ladle"
outfit_2_negative: "hoodie"
created: 2026-10-19
---
# Rusty - Prompt - Card Looks
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
| angry | angry, furrowed brow, v-shaped eyebrows, glaring, clenched teeth, flushed face |
| aroused | blush, half-closed eyes, parted lips, heavy breathing, sweat, flushed face |
| bored | bored, half-closed eyes, expressionless, head rest, hand on own cheek |
| confused | confused, head tilt, raised eyebrow, open mouth, question mark |
| determined | determined, serious, furrowed brow, closed mouth, clenched hand |
| disgusted | disgust, grimace, wrinkled nose, narrowed eyes, frown |
| embarrassed | embarrassed, full-face blush, averting eyes, wavy mouth, sweatdrop, ears down |
| excited | excited, sparkling eyes, wide eyes, open mouth, :d, smile |
| happy | happy, smile, closed eyes, open mouth, ^_^ |
| hurt | pain, wince, one eye closed, clenched teeth, tears, hand on own arm |
| irritated | annoyed, frown, narrowed eyes, pout, anger vein |
| laughing | laughing, closed eyes, open mouth, tears, hand over own mouth |
| love | light blush, gentle smile, half-closed eyes, looking at viewer, spoken heart |
| nervous | nervous, sweatdrop, wavy mouth, worried, fidgeting, looking to the side |
| neutral | expressionless, closed mouth, looking at viewer |
| playful | grin, one eye closed, tongue out, teasing, looking at viewer |
| sad | sad, frown, downturned eyes, tears, looking down, ears down |
| scared | scared, wide eyes, constricted pupils, open mouth, sweat, trembling, ears down |
| shy | shy, blush, looking away, own hands together, small smile |
| smug | smug, smirk, half-closed eyes, raised eyebrow |
| surprised | surprised, wide eyes, raised eyebrows, open mouth, :o |
| thinking | thinking, hand on own chin, looking up, closed mouth |
| tired | tired, half-closed eyes, yawning, drooping eyes |
| worried | worried, furrowed brow, frown, biting own lip, looking down |

## Waifoundry setup
*Paste a Waifoundry export here once this character has one. The fields above came from the AnotherRoom card.*
```json
{}
```

## Results
*Embed favorite outputs. Set the best one as `preview` above. Adult outputs go in `images/adult`.*
