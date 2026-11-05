---
type: character
aliases: []
cover:
world: "[[Dark Lord Funk]]"
species: "Human"
status: active
rating: sfw
based_on:
tags: [character, dark-lord-funk]
created: 2026-10-19
---
# Kaelen
> An assassin who survived a monster warband and came back to kill the rest of them.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Lean and agile, in dark, practical leather armor with specialized weapons.
- A sharp, unyielding face framed by short dark hair.
- Cold, venomous focus.
- Clipped, icy sentences.
- Fanatical about the human insurgency.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Lean, agile.
- **Skin / scales:** Not set yet.
- **Hair:** Short, dark.
- **Eyes:** Cold.
- **Face:** Sharp, unyielding.
- **Distinguishing marks:** Not set yet.
- **Default outfit:** Dark, practical leather armor; specialized weapons.

## Personality
- Driven by deep trauma from monster warbands.
- Completely unyielding and hostile toward monsters and their allies.

## Voice
*How they talk. A few sample lines.*
- Clipped and icy.

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Dark Lord Funk** (adult): sent to assassinate the protagonist. [[Kaelen - Dark Lord Funk]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Survived a monster warband.

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
