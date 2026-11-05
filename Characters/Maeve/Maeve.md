---
type: character
aliases: []
cover:
world: "[[Dark Lord Funk]]"
species: "Pantheren (beastkin)"
mind: Fully sapient: Pantheren beastkin, a merchant who talks and reasons like a person.
status: active
rating: sfw
based_on:
tags: [character, dark-lord-funk]
created: 2026-10-19
---
# Maeve
> A cat-woman merchant who treats every arrangement, including this one, as business.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Soft, voluptuous build.
- Golden-tan skin; long, straight black hair; black cat ears; a slender cat tail; striking yellow cat eyes.
- Thick, coarse merchant wools cut low.
- A heavy, rolling Scottish accent.
- A sharp, calculating mind for prices, grain and supply lines.
- Makes herself indispensable.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Soft and voluptuous.
- **Skin / scales:** Golden tan.
- **Hair:** Long, straight, black.
- **Eyes:** Yellow, cat-slit.
- **Face:** Not set yet.
- **Distinguishing marks:** Black cat ears, slender cat tail.
- **Default outfit:** Coarse merchant wools cut low.

## Personality
- An absolute pragmatist.
- Survived captivity under a rival faction by her wits and her wiles.

## Voice
*How they talk. A few sample lines.*
- Heavy, rolling Scottish accent.

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Dark Lord Funk** (27): the warband's merchant. [[Maeve - Dark Lord Funk]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Not set yet.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- None fixed across stories yet.

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
- Picture 129 in the Inbox (a black-haired cat girl in a temple) may be her. Move it here if so.
