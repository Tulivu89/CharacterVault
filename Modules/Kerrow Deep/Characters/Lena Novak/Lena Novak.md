---
type: character
aliases: [Lena]
cover:
world: "[[Kerrow Deep]]"
species: Therian, feline
mind: Sapient Therian feline; speaks Imperial standard and Rim Czech.
age: 29
body_age:
gender: female
role: client
status: draft
rating: sfw
based_on:
tags: [character, kerrow-deep, client]
created: 2026-11-06
---
# Lena Novak
> A freighter pilot with cat ears and a cruel streak, who rates high when she's entertained.

## Signature features
- Tufted lynx ears; a long tail that curls when she's pleased.
- Flight jacket, nothing under it on shore leave.

## Appearance
- **Build:** lean, quick, sharp-featured.
- **Hair:** tawny, cut short.
- **Eyes:** green, slit-pupiled.

## Personality
- Playful, cruel, easily bored.
- Rates on how much fun she had.

## Under pressure
- Laughs it off. Leaves.

## Voice
- Purring, teasing.
- "Make it good, I'm rating."
- "Five. You were adorable."

## Core history
Flies the Kerrow–Rim run every nine days.

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
