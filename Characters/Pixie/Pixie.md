---
type: character
aliases: []
cover: "[[Pixie - 01.png]]"
world:
species: "Cat girl"
mind: Fully sapient: a cat girl who talks and reasons like a person.
age: "18"
status: draft
rating: sfw
based_on:
tags: [character]
created: 2026-10-19
---
# Pixie
> A cat girl in an oversized pink sweater and mismatched socks, trailing a string of fairy lights.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Long white hair fading to pink curls at the ends.
- Pink eyes and a wide, easy smile.
- White cat ears and an enormous, fluffy white tail.
- A star clip and a pink-and-blue barrette in her hair.
- Mismatched socks (one striped black, pink and blue, one teal with white dots) and worn blue high-tops.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Slight.
- **Skin / scales:** Fair, flushed cheeks.
- **Hair:** Long white, fading to pink curls.
- **Eyes:** Pink.
- **Face:** A small bandage on one cheek.
- **Distinguishing marks:** White cat ears with orange inside; huge fluffy white tail.
- **Default outfit:** Oversized pink sweater, black bike shorts, mismatched knee socks, worn blue high-tops, a string of fairy lights.

## Personality
- Not set yet.

## Voice
*How they talk. A few sample lines.*
- Not set yet.

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- Not set yet.

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Not set yet.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- None yet.

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
      - used_for
      - rating
```

## Image prompts
```base
filters:
  and:
    - 'type == "prompt"'
    - file.hasLink(this.file)
views:
  - type: cards
    name: Prompts
    image: note.preview
    imageFit: cover
    order:
      - file.name
      - stage
      - outfit
      - framing
```

## Gallery
*Drop images into this character's `images` folder. They show up here on their own. Adult images go in `images/adult` and stay out of this view.*
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

## Spin-offs and connected characters
```base
filters:
  and:
    - 'type == "character"'
    - file.hasLink(this.file)
views:
  - type: cards
    name: Connected
    image: note.cover
    imageFit: cover
    order:
      - file.name
      - world
```

## Notes
- Adult (18). Image prompts keep `child, aged down` in the negatives.
- Drafted from her picture only. Notes to come.
