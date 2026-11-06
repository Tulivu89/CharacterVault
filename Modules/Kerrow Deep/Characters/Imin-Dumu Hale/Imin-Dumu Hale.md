---
type: character
aliases: [Hale, Overseer Hale, Agent Imin-Dumu]
cover:
world: "[[Kerrow Deep]]"
species: Vreth agent (human donor)
mind: Fully sapient Vreth agent, separated from the queen's directive; human social modeling from his donor; speaks Imperial standard.
age: 41
body_age:
gender: male
role: overseer
status: active
rating: sfw
based_on:
tags: [character, kerrow-deep, overseer]
created: 2026-11-06
---
# Imin-Dumu Hale
> A chipper Vreth Utility Compliance Officer who calls a broken nose a learning moment and means it.

## Signature features
- Glossy bottle-green chitin, compound eyes, a disturbingly human mouth with a customer-service smile.
- Two working arms and a vestigial pair that twitch when he's excited.
- Combine lanyard.

## Appearance
- **Build:** 6'4", insectile, very strong.
- **Default outfit:** the lanyard and a tablet.

## Personality
- Sincere, upbeat, metric-driven.
- Never cruel on purpose. The cruelty is in how much he means it.

## Under pressure
- Goes very still, mandibles shifting. Then the smile comes back.

## Voice
- Pep talks, coaching jargon.
- "Big one."
- "Personal best!"
- "You didn't hurt him. You hurt *you*."

## Core history
The seventh offspring of a Vreth queen bred with a human donor; *Imin-Dumu* is Sumerian for "seventh offspring." He took *Hale* from a hospitality manual because it sounded healthy. He knows more about Shaft Nine than he should.

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
