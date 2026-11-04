---
type: character
aliases: []
cover:
world:
species: "Saurian (crocodilian)"
status: active
rating: sfw
based_on:
tags: [character, volundale]
created: 2026-10-19
---
# Sekmawl
> An old crocodilian who can sit still for days, and then isn't sitting anymore.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Huge: eleven feet nose to tail and over seven hundred pounds. Upright he stands seven-two, but he prefers all fours.
- Charcoal-black hide with grey scute.
- Molten orange eyes with vertical pupils and clicking inner eyelids.
- Something moves under his hide that isn't him.
- Smells of swamp, old blood and sulfur.
- Can go motionless for days, then strikes all at once.
- A deep bass voice, a hiss on every s, long pauses mid-sentence. He gets quieter as he gets more dangerous.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Eleven feet nose to tail, 700+ pounds; 7'2" upright.
- **Skin / scales:** Charcoal-black hide, grey scute.
- **Hair:** None.
- **Eyes:** Molten orange, vertical pupils, clicking inner eyelids.
- **Face:** Crocodilian.
- **Distinguishing marks:** Something moving under the hide.
- **Default outfit:** None.

## Personality
- Operates from an apex predator's confidence.
- Reads people as capability assessments and catalogues weaknesses without malice.
- Makes decisions without weighing how they land on others. Not cruel for sport.

## Voice
*How they talk. A few sample lines.*
- Deep bass like distant thunder.
- "You are..." A long pause. "...well made. Your proportions are pleasing."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Old crocodilian** (elder): his usual form.
- **Viola's son** (18, Volundale one-off): a teenager raised in the Spire with his father's size. [[Sekmawl - Viola's Son]]

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
