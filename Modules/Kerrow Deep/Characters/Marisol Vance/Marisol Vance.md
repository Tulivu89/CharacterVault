---
type: character
aliases: [Marisol, Overseer Vance]
cover:
world: "[[Kerrow Deep]]"
species: human
mind: 
age: 39
body_age:
gender: female
role: overseer
status: draft
rating: sfw
based_on:
tags: [character, kerrow-deep, overseer]
created: 2026-11-06
---
# Marisol Vance
> A former utility who served sixty liters, came out the other side, and took a contract running the caseload she used to be.

## Signature features
- Her old inventory number still on her choker-line scar.
- Never stands on the plinth; always at the foot of it.

## Appearance
- **Build:** compact, strong.
- **Skin:** tan, freckled.
- **Hair:** auburn, pinned up.
- **Eyes:** hazel, unreadable.

## Personality
- Pragmatic, unsentimental, quietly protective.
- Teaches ratings like a survival skill.

## Under pressure
- Goes cold. Bargains with the Combine, not with utilities.

## Voice
- Low, plain, no jargon.
- "Smile at the auditors."
- "I know exactly how much that hurt. Get up."

## Core history
Sentenced to 60 L at twenty-four. Volunteered for the Yield Program in her fourth year; the Combine owns the offspring contract. She took the overseer job to stay on the station. [draft]

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
