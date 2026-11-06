---
type: character
aliases: [Mirko]
cover:
world: "[[Kerrow Deep]]"
species: Therian, canine
mind: Sapient Therian canine; speaks Imperial standard and Rim Serbian.
age: 30
body_age:
gender: male
role: utility
status: draft
rating: sfw
based_on:
tags: [character, kerrow-deep, utility]
created: 2026-11-06
---
# Mirko Petrović
> A pack-expelled canine smuggler whose output makes him a jackpot, and whose pride makes him a liability.

## Signature features
- A torn left ear and a pack brand scarred across his ruff.
- When he's on the Frame his tail won't stay still, and he hates it.

## Appearance
- **Build:** big, heavy-set, broad as a hatch.
- **Fur:** black and tan, grey at the muzzle already.
- **Eyes:** amber.

## Personality
- Proud, hot-tempered, loyal to nobody since the pack threw him out.
- Funny when he forgets to be angry.

## Under pressure
- Snarls and bluffs. Pack logic surfaces first: he submits to the biggest presence in the room and hates himself for it.

## Voice
- Rough Rim accent, Serbian curses.
- "Touch me again and I'll take the hand."
- "Fine. *Fine.* Rate it a five or I'll find you."

## Core history
Expelled from the Dragan pack's Rim branch for skimming. Caught on Kerrow with a hold full of undeclared cargo and reclassified. Vuk Dragan knew him before.

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
