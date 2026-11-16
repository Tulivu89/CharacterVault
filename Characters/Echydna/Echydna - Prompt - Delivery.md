---
type: prompt
character: "[[Echydna]]"
world: Autumn's Leaves
tool: novelai
stage: adult
outfit: []
framing:
preview:
rating: explicit
base_prompt: |
  girl, monster girl, dark-skinned female, very dark skin, colored skin, tall female, 0.5::mature female::. Cold smooth dark indigo-black skin.
  very long hair, wavy hair, black hair. Thick waist-length wavy hair with teal sheen.
  horns, black horns, cow horns, pointy ears. Two thick smooth black bull horns curve out from temples and sweep up to forward-pointing tips. Pointed webbed fin ears with translucent teal ear fins. One glowing eye-glyph floats above head.
  blue eyes, no pupils, sharp teeth. Depthless dark indigo eyes with no pupils. Full dark-plum lips.
  freckles, body freckles, scales. Tiny pale freckles on shoulders, chest, breasts, ribs and hips glow faintly. Indigo, violet and teal scales on shoulders, forearms and outer thighs.
  medium breasts, sharp nails. Broad soft shoulders.
  curvy, narrow waist, navel, gills. Soft bare belly marked with pale mother-of-pearl stretchmarks. Gill-slits along ribs breathe dim teal light.
  wide hips, thick thighs, long legs, barefoot. Bare human legs ending in small high-arched feet.
  tail, fins. Heavy thick dark-scaled tail with iridescent scales and translucent webbed fins along ridge and tip.
base_prompt_b: |
  girl, monster girl, dark-skinned female, very dark skin, colored skin, tall female, 0.5::mature female::. Cold smooth dark indigo-black skin.
  very long hair, wavy hair, black hair. Thick waist-length wavy hair with teal sheen.
  horns, black horns, cow horns, pointy ears. Two thick smooth black bull horns curve out from temples and sweep up to forward-pointing tips. Pointed webbed fin ears with translucent teal ear fins. One glowing eye-glyph floats above head.
  blue eyes, no pupils, sharp teeth. Depthless dark indigo eyes with no pupils. Full dark-plum lips.
  freckles, body freckles, scales. Tiny pale freckles on shoulders, chest, breasts, ribs and hips glow faintly. Indigo, violet and teal scales on shoulders, forearms and outer thighs.
  medium breasts, sharp nails. Broad soft shoulders.
  curvy, narrow waist, navel, gills. Soft bare belly marked with pale mother-of-pearl stretchmarks. Gill-slits along ribs breathe dim teal light.
  wide hips, thick thighs, long legs, barefoot.
  tail, fins. Heavy thick dark-scaled tail with iridescent scales and translucent webbed fins along ridge and tip.
base_negative: |
  petite, skinny, muscular, abs, flat chest, short, pale skin, light skin, tan, blonde hair, white hair, red hair, wings, dragon wings, animal ears, ram horns, curled horns, spiral horns, antlers, thin horns, small horns, third eye, forehead mark, extra eyes, lamia, snake lower body, no legs, belly scales, scutes, star (symbol), pasties, star pasties,
adult_prompt: |
  nipples, dark nipples. Breasts and nipples are cold dark indigo, nipples smooth and plain.
  pussy, pussy juice. Dark-plum pussy lips.
avatar_prompt: ""
outfit_1_name: Bathhouse Robe
outfit_1_prompt: |
  robe, black robe. Heavy oil-dark silk bathhouse robe with wide sleeves on both arms and shawl collar hangs fully open from shoulders to mid-calf, belt untied and hanging loose, bare chest, belly and thighs showing through opening.
outfit_1_negative: |
  skirt, sarong, loincloth,
outfit_2_name:
outfit_2_prompt: ""
outfit_2_negative: ""
created: 2026-11-16
---
# Echydna - Prompt - Delivery
*Edit in the boxes below (Meta Bind) or in the Properties panel. The copy-ready prompts rebuild themselves from these fields.*
*The look behind the Delivery pose set (`.claude/skills/nai-v5-images/references/poses/sets/delivery.md`), laid out head to toe, one feature group per line, outfit separate and last.*
*Explicit layer: the nipple and pussy lines live in `adult_prompt`. Add them after the upper-body and lower-body lines only for explicit images.*

## Two versions to compare
- **A (`base_prompt`)** is the text as issued and rolled on DEL-01 to DEL-06, with the small-feet sentence.
- **B (`base_prompt_b`)** is A after the rolls: the "small high-arched feet" sentence is dropped (it clashed with her body) and `barefoot` stays. Nothing else differs, so a locked-seed A/B isolates the feet.
- **Large breasts.** This style pushes breasts smaller. Where it matters, swap `medium breasts` for `large breasts, natural breasts` (`bouncing breasts` for motion) and add `small breasts` to the negative (DEL-05).
- **Eye above her head.** `eye-glyph` gives an eye outline (DEL-05, 06). `eye-halo` gave an eye on one run and a flat ring on another. `third eye`, "above brow" and "between horns" can give a literal forehead eye, so `third eye, forehead mark, extra eyes` stay in the negative.
- **Horns.** Bull horns, not spirals: no `ammonite`, `ridged` or `curled horns` in the positive.

## Base
**Prompt**
`INPUT[textArea:base_prompt]`

**Prompt, version B**
`INPUT[textArea:base_prompt_b]`

**Negative**
`INPUT[textArea:base_negative]`

**Adult layer**
`INPUT[textArea:adult_prompt]`

**Avatar framing**
`INPUT[textArea:avatar_prompt]`

## Outfit 1
**Name** `INPUT[text:outfit_1_name]`

**Prompt**
`INPUT[textArea:outfit_1_prompt]`

**Negative**
`INPUT[textArea:outfit_1_negative]`

## Flat prompt
*Long-press to select and copy.*

### `VIEW[{outfit_1_name}][text]`
`VIEW[{base_prompt} {outfit_1_prompt}][text]`

## Negative / undesired
**`VIEW[{outfit_1_name}][text]`**
`VIEW[{base_negative} {outfit_1_negative}][text]`

## Framing trims
- **Cowboy shot:** drop lines 8 and 9 (use `wide hips, thick thighs.`), and `sharp teeth` with a closed mouth.
- **From behind:** drop the face and eye lines and the breasts.
- **Close-up of the join:** keep skin, belly, hips, thighs and tail; drop the face, hair, horns and `0.5::mature female::`.

## Emotion table
| Mood | Tags |
|---|---|
| Calm (default) | `expressionless, looking at another` |
| Surprised (the pin) | `surprised, raised eyebrow, parted lips` |
| Smug (the press) | `smirk, half-closed eyes, parted lips` |
| Coming under him | `female orgasm, surprised, open mouth, half-closed eyes, blush, heavy breathing` |
| Pleased (watching her belly) | `smile, closed mouth, half-closed eyes` |
