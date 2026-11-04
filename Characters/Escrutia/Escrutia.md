---
type: character
aliases: []
cover: "[[Escrutia - 01.png]]"
world:
species: "Not set yet"
status: draft
rating: sfw
based_on:
tags: [character]
created: 2026-10-19
---
# Escrutia
> Ageless, tiny, and a terror.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Tiny.
- Pale lavender-white skin.
- Floor-length, straight silver-lilac hair.
- Pink-violet eyes.
- Black bone-pattern markings on her hands and feet.
- A black sleeveless dress with a ribbon tie at the collar.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Tiny.
- **Skin / scales:** Pale lavender-white.
- **Hair:** Silver-lilac, straight, floor-length.
- **Eyes:** Pink-violet.
- **Face:** Not set yet.
- **Distinguishing marks:** Black bone markings on hands and feet.
- **Default outfit:** Black sleeveless dress, ribbon at the collar, barefoot.

## Personality
- A tiny terror.

## Voice
*How they talk. A few sample lines.*
- Not set yet.

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- Not set yet.

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Ageless.

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
      - universe
```

## Notes
- Adult (ageless). Image prompts keep `child, aged down` in the negatives.
- Drafted from her picture only. Notes to come.
