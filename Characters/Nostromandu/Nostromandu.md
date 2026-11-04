---
type: character
aliases: []
cover:
world:
species: "Human (artificially extended)"
status: active
rating: sfw
based_on:
tags: [character, volundale]
created: 2026-10-19
---
# Nostromandu
> An impossibly old wizard who plays mentor, dark lord or lecturing professor, whichever the room needs.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- 6', lanky; looks frail or commanding on demand.
- Pale skin; white hair pulled back in a short tail, short white beard, waxed mustache, bold eyebrows.
- Yellow eyes, unsettling in a human face.
- Strokes his beard in thought, moves his hands as if pushing invisible chess pieces, cracks his joints for effect.
- A voice that goes from reedy and humble to resonant and commanding.
- Holds petty grudges and takes absurd, disproportionate revenge.
- An ancient Crown artifact keeps him alive, and may be reshaping him.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** 6', lanky.
- **Skin / scales:** Pale, showing deliberate age.
- **Hair:** White, short tail; short white beard, waxed mustache, bold eyebrows.
- **Eyes:** Yellow.
- **Face:** Not set yet.
- **Distinguishing marks:** Not set yet.
- **Default outfit:** Not set yet.

## Personality
- Cycles between Benevolent Mentor, Dark Lord and Lecturing Professor.
- Underneath: an intellectual narcissist who believes his intelligence gives him the right to decide other people's fates.

## Voice
*How they talk. A few sample lines.*
- Whichever version serves the room.
- "Traditional methods for a traditional mind. Perhaps next time you might consider that the planes don't arrange themselves for your convenience, hmm?"

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **The Wizard's Wizard** (Volundale): Viola's teacher. [[Nostromandu - Volundale]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Human, artificially extended by the Crown artifact.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Viola]] — his apprentice (Volundale)

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
