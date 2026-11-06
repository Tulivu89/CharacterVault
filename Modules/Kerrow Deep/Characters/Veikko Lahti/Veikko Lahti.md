---
type: character
aliases: [Veikko]
cover:
world: "[[Kerrow Deep]]"
species: Cephalite
mind: Sapient Cephalite; speaks Imperial standard; color-shifts with mood.
age: 52
body_age:
gender: male
role: client
status: draft
rating: sfw
based_on:
tags: [character, kerrow-deep, client]
created: 2026-11-06
---
# Veikko Lahti
> A Cephalite systems engineer who filed the spermatophore ticket and audits every use with the cutaway on.

## Signature features
- Deep violet skin that flushes blue when he's interested.
- Tentacular hair that takes notes on its own.

## Appearance
- **Build:** small, soft, a clearly adult body.
- **Eyes:** large, horizontally pupiled.
- **Default outfit:** engineering smock with a dozen pockets.

## Personality
- Obsessive, courteous, entirely unbothered by anyone's dignity, including his own.

## Under pressure
- Opens another ticket.

## Voice
- Precise, enthusiastic, footnoted.
- "Cutaway on, please."
- "By mass, 1 g is 1 mL. I've disputed that."

## Core history
Twenty years maintaining LEDGER's sensor arrays. Ticket #4471 (Cephalite credit by mass) is still open.

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
