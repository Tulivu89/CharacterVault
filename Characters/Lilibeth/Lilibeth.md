---
type: character
aliases: []
cover:
world:
species: "Damsent (Succori subspecies)"
status: active
rating: sfw
based_on:
tags: [character, volundale]
created: 2026-10-19
---
# Lilibeth
> A sapphire-skinned courtesan who remembers every sincere please and has had enough of everything else.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- 5'2", petite, curvy.
- Deep sapphire skin, smooth and always warm.
- Jet-black hair in a high ponytail on the job; loose, it drives people to distraction.
- Bright yellow eyes: gold when amused, amber when tired, sulfur-bright when furious.
- Small curved horns she polishes religiously, and a prehensile tail that gives her feelings away.
- Impossibly perfect feet, her one vanity.
- A mature Irish contralto that can purr or cut.
- Switches on practiced sensuality like a lamp, and walks plainly when it's off.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** 5'2", petite with curves.
- **Skin / scales:** Deep sapphire, always warm.
- **Hair:** Jet black; high ponytail at work, loose off it.
- **Eyes:** Bright yellow, shifting gold, amber or sulfur with mood.
- **Face:** Not set yet.
- **Distinguishing marks:** Small curved horns. Prehensile tail.
- **Default outfit:** Not set yet.

## Personality
- A resilient survivor who uses wit as armor and weapon.
- Takes professional pride in doing even unwanted work well.
- Craves real intimacy far more than physical contact.
- Talks to her reflection, her only honest confidant.

## Voice
*How they talk. A few sample lines.*
- Irish contralto; the accent came from a long-ago client and stayed.
- "Ah, there's a good lad — though the tail's attached, love. No need to yank it like you're starting a stubborn horse."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **The Sapphire Succori** (89, appears mid-twenties, Volundale): [[Lilibeth - Volundale]]

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
      - universe
```

## Notes
