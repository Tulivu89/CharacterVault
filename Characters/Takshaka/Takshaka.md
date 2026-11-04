---
type: character
aliases: []
cover:
world:
species: "Naga demon (planar, summoned)"
status: active
rating: sfw
based_on:
tags: [character, volundale]
created: 2026-10-19
---
# Takshaka
> A planar naga demon older than the Ordering, patient enough to wait out anything.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- A humanoid torso of lean, dense muscle above a serpent's lower body, with coils that can crack stone.
- Alabaster-white scales.
- A pure serpent head: tapered skull, a forked tongue that tastes fear from across a room, a jaw that unhinges when he chooses.
- Vivid red eyes with vertical pupils and no warmth in them.
- A sibilant, low, unhurried voice.
- Coils first, slowly, until there's nowhere left to move.
- Treats the material plane as a hunting ground he's been caged inside.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Humanoid torso of lean, dense muscle over a serpent's body.
- **Skin / scales:** Alabaster white.
- **Hair:** None.
- **Eyes:** Vivid red, vertical pupils.
- **Face:** Pure serpent head: tapered skull, forked tongue, unhinging jaw.
- **Distinguishing marks:** None noted.
- **Default outfit:** None.

## Personality
- Ancient, coldly intelligent, entirely without mercy.
- Deeply patient.
- Certain nothing stays out of his coils forever.

## Voice
*How they talk. A few sample lines.*
- Sibilant, low, unhurried; leans on the s.
- "Sssstruggling is a choice. You may make it as long as you like. It changesss nothing of what comes next — only how long next takes to arrive."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Volundale** (ageless): summoned demon, father of Sarith and Morith by Viola. [[Takshaka - Volundale]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Summoned from another plane. Predates the Ordering.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Viola]] — mother of his children (Volundale)
- [[Sarith]], [[Morith]] — his daughters (Volundale)

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
