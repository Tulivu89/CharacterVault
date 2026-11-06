---
type: character
aliases: [Chuck]
cover:
world: "[[Kerrow Deep]]"
species: human
mind: 
age: 50
body_age:
gender: male
role: client
status: active
rating: sfw
based_on:
tags: [character, kerrow-deep, client]
created: 2026-11-06
---
# Chuck Brandt
> Ilse's father, a widowed smelter hand who tells his bowling league she's a second cousin.

## Signature features
- Dented steel thermos.
- Orange badge lanyard he's had her whole life.

## Appearance
- **Build:** heavy, thick-handed.
- **Hair:** grey stubble.
- **Default outfit:** ore-processing coverall unzipped to the waist.

## Personality
- Bitter, self-justifying; blames her for every choice.

## Under pressure
- Looks at the Commissary Board instead.

## Voice
- "Don't start."
- "Twenty-one years old and still the mouth."
- "Second cousin."

## Core history
Twenty-two years on Kerrow. His wife Maggie died before the conviction.

## Recurring ties
- [[Ilse Brandt]] — daughter.
- [[Charlie Brandt]] — son.

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
