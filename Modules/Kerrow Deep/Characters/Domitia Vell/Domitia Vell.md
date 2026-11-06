---
type: character
aliases: [Domitia, Director Vell]
cover:
world: "[[Kerrow Deep]]"
species: Aedling
mind: Sapient Aedling; speaks Imperial standard and High Aedling.
age: 47
body_age:
gender: female
role: client
status: draft
rating: sfw
based_on:
tags: [character, kerrow-deep, client]
created: 2026-11-06
---
# Domitia Vell
> The Combine's Director of Hospitality Contracts, who books male utilities to the Executive Ring and rates like a critic.

## Signature features
- Silver hair, silver pupils on black.
- Her shoulders are bare at every meeting so everyone can read her contracts.

## Appearance
- **Build:** tall, angular, very still.
- **Skin:** blue-white.
- **Default outfit:** Combine black, shoulders bare.

## Personality
- Patient, exacting, amused.
- Considers a rating a work of art.

## Under pressure
- Never shows it. Reassigns people instead.

## Voice
- Measured, dry.
- "Again. Slower."
- "A four. Five is for surprises."

## Core history
Bought the debts of half the houses on Aurelle Prime, including House Varre's.

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
