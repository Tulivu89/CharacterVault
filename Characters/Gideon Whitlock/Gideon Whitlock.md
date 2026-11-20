---
type: character
aliases: [Chancellor Whitlock, the Chancellor]
cover:
world: "[[Hallett College]]"
species: human
mind:
age: 61
gender: male
role: antagonist
body_age:
status: draft
rating: sfw
based_on:
tags: [character]
created: 2026-11-20
---
# Gideon Whitlock
> Chancellor of the Conclave: a soft-spoken statistician who has read the census and decided what women are for.

*Essentials only: what holds in every story. Story-specific ages, roles and drift go in profiles.*
*`age` and `body_age` only when they hold in every story; otherwise set them on each profile. `mind` is for nonhumans: how it thinks and communicates.*

## Signature features
- Never raises his voice and never leaves his desk. People are brought to him.
- Fingertips stained ink-black to the first knuckle. He signs with a black fountain pen.

## Appearance
- **Build:** Very tall and gaunt, with long thin hands.
- **Skin:** Pale.
- **Hair:** Long silver hair, slicked back and tied at the nape.
- **Eyes:** Pale grey, deep-set, with dark rings under them.
- **Face:** Long and gaunt: hollow cheeks under sharp cheekbones, a long high-bridged nose, thin lips, a close-trimmed silver beard. English.
- **Distinguishing marks:** The ink-black fingertips.
- **Default outfit:** A black high-collared robe-coat buttoned to the throat with fine oxblood embroidery at the collar, a heavy gold chain of office with oxblood enamel medallions, gold signet rings. A bone-black wand, usually lying on the desk.

## Personality
- Patient, courteous and certain. His cruelty is policy, and he speaks it in numbers.
- Takes no pleasure in chasing. He doesn't need to.

## Under pressure
- Gets quieter and more polite. He has people for everything else.

## Voice
- Soft and precise. Almost kind.
- "I don't hate you, Miss Rao. I've read the census."
- "Forty percent, in one generation. Sit down."

## Variants
- **The Decree** (elder): Chancellor; the Continuance Act is his.

## Core history
Head of the Conclave, the magical world's government. Backed by Lindqvist Reagents and Linh's hermetic order.

## Recurring ties
- [[Odile Marchand]] — his faculty voice in the girls' wing.

## Profiles
```base
filters:
  and:
    - 'type == "profile"'
    - file.hasLink(this.file)
views:
  - type: table
    name: Profiles
    order:
      - file.name
      - profile_type
      - stage
      - age
      - rating
```

## Gallery
*Drop images into this character's `images` folder. Adult images go in `images/adult` and stay out of this view.*
```base
formulas:
  pic: 'image(file.path)'
filters:
  and:
    - 'file.inFolder(this.file.folder + "/images")'
    - 'file.ext == "png" || file.ext == "jpg" || file.ext == "jpeg" || file.ext == "webp"'
    - not:
        - 'file.inFolder(this.file.folder + "/images/adult")'
views:
  - type: cards
    name: Gallery
    image: formula.pic
    imageFit: cover
    order:
      - file.name
    sort:
      - property: file.ctime
        direction: DESC
```

## Stories
```base
filters:
  and:
    - 'type == "story"'
    - file.hasLink(this.file)
views:
  - type: list
    name: Stories
    order:
      - file.name
      - status
      - rating
```

## Notes

