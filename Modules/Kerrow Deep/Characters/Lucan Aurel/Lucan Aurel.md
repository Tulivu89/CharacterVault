---
type: character
aliases: [Lucan, the auditor]
cover:
world: "[[Kerrow Deep]]"
species: Aedling
mind: Sapient Aedling; speaks Imperial standard and High Aedling.
age: 26
body_age:
gender: male
role: client
status: active
rating: sfw
based_on:
tags: [character, kerrow-deep, client]
created: 2026-11-06
---
# Lucan Aurel
> A junior Combine auditor, entitled and bewildered by any resistance, who audits utilities hands-on.

## Signature features
- Good grey suit; oxblood loafers from Aurelle.
- Ivory skin, black sclera, gold eyes and gold hair combed with water.

## Appearance
- **Build:** slim, tall, soft hands.
- **Default outfit:** the suit, the tablet, the handkerchief with the family crest.

## Personality
- Earnest, condescending, procedural.
- Thinks gratitude is a feature utilities are missing.

## Under pressure
- Bewildered first. Then files a complaint, carefully, from the dropdown.

## Voice
- Collegium diction.
- "I want to be clear this isn't personal."
- "That was *mine*."

## Core history
Nineteen months out of the Collegium on Aurelle Prime. His mother's house kept three indentures.

## Recurring ties
- —

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
