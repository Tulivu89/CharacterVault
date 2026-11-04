---
type: prompt
character: "[[ ]]"
tool: waifoundry
stage: adult
outfit: []
framing:
preview:
rating: sfw
base_prompt: ""
base_negative: ""
avatar_prompt: ""
outfit_1_name: ""
outfit_1_prompt: ""
outfit_1_negative: ""
outfit_2_name: ""
outfit_2_prompt: ""
outfit_2_negative: ""
created: {{date}}
---
# {{title}}
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
`VIEW[{base_prompt}, {outfit_1_prompt}][text]`

### `VIEW[{outfit_2_name}][text]`
`VIEW[{base_prompt}, {outfit_2_prompt}][text]`

## Negative / undesired
**`VIEW[{outfit_1_name}][text]`**
`VIEW[{base_negative}, {outfit_1_negative}][text]`

**`VIEW[{outfit_2_name}][text]`**
`VIEW[{base_negative}, {outfit_2_negative}][text]`

## Emotion tags
| Emotion | Tags |
|---|---|
| neutral | |

## Waifoundry setup
*Paste the exported JSON. Use the copy button on the block to grab it back.*
```json
{}
```

## Results
*Embed favorite outputs. Set the best one as `preview` above. Adult outputs go in `images/adult`.*

