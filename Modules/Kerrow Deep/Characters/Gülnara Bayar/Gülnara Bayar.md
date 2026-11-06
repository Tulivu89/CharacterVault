---
type: character
aliases: [Bayar, Overseer Bayar]
cover:
world: "[[Kerrow Deep]]"
species: Draxian
mind: Sapient Draxian; speaks Imperial standard and Draxian.
age: 44
body_age:
gender: female
role: overseer
status: draft
rating: sfw
based_on:
tags: [character, kerrow-deep, overseer]
created: 2026-11-06
---
# Gülnara Bayar
> An ex-military Draxian overseer who runs her caseload like a disciplinary barracks and has no pep talks at all.

## Signature features
- Horn-stubs filed flat, a veteran's choice.
- Slate and gold display striping, faded.

## Appearance
- **Build:** tall, heavy-shouldered.
- **Hair:** iron-grey braid.
- **Eyes:** amber.

## Personality
- By the book. Fair, cold, consistent.
- Respects defiance, punishes it anyway.

## Under pressure
- Writes it up.

## Voice
- Flat, formal, precise.
- "Violation logged."
- "You'll thank me. You won't mean it. I don't need you to."

## Core history
Twenty years in Imperial service before the Combine contracted her. Runs the station's most violent caseload, mostly male utilities.

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
