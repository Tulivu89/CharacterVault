---
type: character
aliases: [Bogdan]
cover:
world: "[[Kerrow Deep]]"
species: Therian, canine
mind: Sapient Therian canine; speaks Imperial standard and Rim Serbian.
age: 31
body_age:
gender: male
role: client
status: active
rating: sfw
based_on:
tags: [character, kerrow-deep, client]
created: 2026-11-06
---
# Bogdan Kral
> Vuk's packmate and second, a pace behind and to the left, who likes to watch a utility's face.

## Signature features
- Hands in his vest pockets.
- Short huffing laugh.

## Appearance
- **Build:** big, a little leaner than Vuk.
- **Fur:** sandy brown.
- **Default outfit:** grease-black work vest.

## Personality
- Follows Vuk's lead. Watchful, quiet, enjoys being looked at back.

## Under pressure
- Waits for Vuk's nod.

## Voice
- Few words.
- "It's fair."
- "She learns."
- "Show it."

## Core history
Came up through the Dragan pack under Vuk.

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
