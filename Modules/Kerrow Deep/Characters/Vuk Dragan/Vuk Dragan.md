---
type: character
aliases: [Vuk, Dragan]
cover:
world: "[[Kerrow Deep]]"
species: Therian, canine
mind: Sapient Therian canine; speaks Imperial standard and Rim Serbian.
age: 35
body_age:
gender: male
role: client
status: active
rating: sfw
based_on:
tags: [character, kerrow-deep, client]
created: 2026-11-06
---
# Vuk Dragan
> The dock-crew foreman who walks like the floor belongs to him, and pays utilities back for his crew's grudges.

## Signature features
- Grey in his ruff.
- Smells everyone before he speaks to them.

## Appearance
- **Build:** huge, heavy, broad as a door.
- **Fur:** grey-brown.
- **Default outfit:** grease-black work vest.

## Personality
- Calm, territorial, fair by his own rules.
- Never hurries.

## Under pressure
- Doesn't get pressured. Applies it.

## Voice
- Low, unhurried, accented.
- "The front is for paying. This is for Marek."
- "She held. Five."

## Core history
Runs the 1300 dock shift. Pack alpha of the Kerrow Dragans.

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
