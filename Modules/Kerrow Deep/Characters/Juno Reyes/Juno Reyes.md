---
type: character
aliases: [Juno]
cover:
world: "[[Kerrow Deep]]"
species: human
mind: 
age: 27
body_age:
gender: female
role: utility
status: active
rating: sfw
based_on:
tags: [character, kerrow-deep, utility]
created: 2026-11-06
---
# Juno Reyes
> An ex-smuggler at the top of the board who knows every exchange rate by heart and sells what she knows.

## Signature features
- Always knows the number: anyone's rating, anyone's liters, any species' yield.
- Wears Hospitality silk in the Rack because she can.

## Appearance
- **Build:** tall, long-legged, a dancer's carriage.
- **Skin:** deep brown.
- **Hair:** shaved sides, a braid down her back.
- **Eyes:** dark, amused.
- **Distinguishing marks:** a smuggler's tally tattooed along one hip; she's added nothing since.

## Personality
- Pragmatic, warm on the surface, ledger underneath.
- Teaches the tricks to new girls. Charges for the good ones.

## Under pressure
- Bargains. Always has something to trade.
- If cornered, she gives up someone else.

## Voice
- Easy, teasing, quick with numbers.
- "Thursday's Hoss. He likes the Frame."
- "Four credits. Med-deck price."

## Core history
Caught running Veil cargo through the Kerrow docks. Sentenced to 55 L three years ago and climbed to Tier 3 in eight months. Rumored to be under 10 L and in no hurry.

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
