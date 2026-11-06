---
type: character
aliases: [Ysolde]
cover:
world: "[[Kerrow Deep]]"
species: Aedling
mind: Sapient Aedling; speaks Imperial standard and High Aedling.
age: 29
body_age:
gender: female
role: utility
status: active
rating: sfw
based_on:
tags: [character, kerrow-deep, utility]
created: 2026-11-06
---
# Ysolde Varre
> A fallen aristocrat sentenced for debt, still bewildered that the universe stopped accommodating her.

## Signature features
- Ivory skin, black sclera, gold pupils, gold hair.
- One inscription for her penal service, tattooed by custom on her inner thighs, worked into vines and filigree. Any Aedling can read what she is.

## Appearance
- **Build:** long-limbed and angular, built across generations to be looked at.
- **Default outfit:** the kit, and the posture of a woman wearing a gown.

## Personality
- Haughty without trying.
- Genuinely confused by resistance, her own included.
- Polite to clients the way a hostess is polite to bad guests.

## Under pressure
- Bewildered first, then furious.
- Retreats into etiquette when she can't do anything else.

## Voice
- Formal, precise, faintly amused.
- "This is not how one is *spoken* to."
- "I'm told I'm very good at this. I'm told a great many things."

## Core history
House Varre of Aurelle Prime lost everything in a Combine debt default. As the last asset on the ledger, Ysolde was sold into penal service to settle it. The inscription was applied at intake in the family's own script.

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
