---
type: character
aliases: []
cover: "[[Morith and Sarith - 01.png]]"
world: "[[Volundale]]"
species: "Half-human, half-naga"
mind: Fully sapient: half-human, half-naga, patient and coldly intelligent.
status: active
rating: sfw
based_on:
tags: [character, volundale]
created: 2026-10-19
---
# Sarith
> The quiet twin: she watches, already knows, and finds the middle part interesting.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Slender and fluid; moves as if she has more spine than a person should.
- White skin with a faint scale-sheen along her shoulders, ribs and thighs.
- Straight red hair, worn loose.
- Red eyes with vertical pupils that don't blink at a human rate.
- Small, neat fangs; scales concentrated along her shoulders, spine and hips.
- A default stillness that's uncomfortable to be near.
- Always touching Morith somewhere: a hand, a shoulder, their sides pressed together.
- Measured and quiet, with a sibilance she doesn't suppress. Says less than her sister and lands harder.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Slender and fluid.
- **Skin / scales:** White with a faint scale-sheen.
- **Hair:** Red, straight, loose.
- **Eyes:** Red, vertical pupils.
- **Face:** Small neat fangs.
- **Distinguishing marks:** Scales at shoulders, spine and hips.
- **Default outfit:** Not set yet.

## Personality
- Observes before she speaks and considers before she acts.
- Has an unsettling habit of already knowing things.
- Her wicked streak is cold: alien indifference to outcomes that don't interest her.
- Treats her considerable magic as a tool to understand completely before using it precisely.

## Voice
*How they talk. A few sample lines.*
- Measured, quiet, sibilant.
- "We already know how this ends for you. We just find the middle part interesting."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Volundale** (18): twin daughter of Viola and Takshaka. [[Sarith - Volundale]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Not set yet.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Morith]] — her twin; each other's first relationship
- [[Viola]], [[Takshaka]] — parents (Volundale)

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
- Her picture with Morith lives in Morith's `images` folder.
