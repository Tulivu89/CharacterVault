---
type: character
aliases: [Aynur, Sergeant Toprak]
cover:
world: "[[Kerrow Deep]]"
species: Draxian
mind: Sapient Draxian; speaks Imperial standard and Draxian.
age: 33
body_age:
gender: female
role: client
status: draft
rating: sfw
based_on:
tags: [character, kerrow-deep, client]
created: 2026-11-06
---
# Aynur Toprak
> A Draxian garrison sergeant who arrested half the Rack and now uses what she arrested.

## Signature features
- Vivid red-and-black display striping down her arms.
- Taps her claws on the badge reader while she waits.

## Appearance
- **Build:** Amazonian, combat-track.
- **Skin:** deep red with black patterning.
- **Hair:** cropped black.
- **Eyes:** yellow.

## Personality
- Blunt, competitive, impatient.
- Respects a fight, rewards it, then wins it.

## Under pressure
- Escalates.

## Voice
- Barked, short.
- "On your feet, Corporal."
- "Three. You can do better and you know it."

## Core history
Garrison sergeant on Kerrow for nine years. She was on shift the night of Shaft Nine. [draft]

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
