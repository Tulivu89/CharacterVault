---
type: character
aliases: [Temür, Temur]
cover:
world: "[[Kerrow Deep]]"
species: Draxian, young male
mind: Sapient Draxian; speaks Imperial standard and Draxian.
age: 24
body_age:
gender: male
role: utility
status: draft
rating: sfw
based_on:
tags: [character, kerrow-deep, utility]
created: 2026-11-06
---
# Temür Arslan
> A young Draxian male convicted for a dock duel, growing horns on a Frame where he can't win anything.

## Signature features
- Horns two hands long and still growing.
- A thin prehensile tail that betrays every mood he tries to hide.

## Appearance
- **Build:** big, aggressive, all shoulder.
- **Skin:** slate grey with copper display striping.
- **Hair:** black, worn long and tied.
- **Eyes:** gold.

## Personality
- Competitive in everything, including humiliation.
- Rates his own performance out loud.

## Under pressure
- Fights to the point of injury. Then competes: if he has to be used, he'll be the best-rated utility on the plinth.

## Voice
- Short, challenging, everything a dare.
- "Is that all?"
- "Write down that I lasted longer than him."

## Core history
Killed a rival male in a dock duel, which is Draxian custom and Imperial manslaughter. The Statute reclassified him at twenty-three.

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
