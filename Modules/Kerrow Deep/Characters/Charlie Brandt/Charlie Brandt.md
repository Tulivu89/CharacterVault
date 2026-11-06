---
type: character
aliases: [Charlie]
cover:
world: "[[Kerrow Deep]]"
species: human
mind: 
age: 28
body_age:
gender: male
role: client
status: active
rating: sfw
based_on:
tags: [character, kerrow-deep, client]
created: 2026-11-06
---
# Charlie Brandt
> Ilse's older brother, a teasing asshole who disowned her in public and badges her Frame in private.

## Signature features
- Always grinning.
- Never goes slow at anything.

## Appearance
- **Build:** stocky.
- **Hair:** sandy, buzzed.
- **Default outfit:** Line Three cargo-rigger jacket.

## Personality
- Mocking, careless, thinks everything is a joke on someone else.

## Under pressure
- Laughs, then deflects to Dad.

## Voice
- "Morning, Ilsy."
- "It's literally my tax money."
- "Kinda bitchy. Two."

## Core history
Cargo rigger. Has told everyone his sister is a cousin.

## Recurring ties
- [[Ilse Brandt]] — sister.
- [[Chuck Brandt]] — father.

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
