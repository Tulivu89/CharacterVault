---
type: character
aliases: [Dale]
cover:
world: "[[Kerrow Deep]]"
species: human
mind: 
age: 44
body_age:
gender: male
role: client
status: active
rating: sfw
based_on:
tags: [character, kerrow-deep, client]
created: 2026-11-06
---
# Dale Pruitt
> A life-support tech who uses a utility on his lunch break and eats his sandwich throughout.

## Signature features
- The sandwich.
- Rates everyone a two for "attitude" and means nothing by it.

## Appearance
- **Build:** soft, stooped.
- **Hair:** thinning, combed over.
- **Default outfit:** life-support coverall with a lanyard full of keycards.

## Personality
- Bored. Mechanical. Not cruel, just absent.

## Under pressure
- Files complaints when inconvenienced.

## Voice
- Mumbles with his mouth full.
- "Don't mind me."
- "Two. Kept glaring."

## Core history
Twenty years in air scrubbers. Divorced. His lunch break is forty minutes.

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
