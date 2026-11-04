---
type: character
aliases: []
cover:
world:
species: "Human"
status: active
rating: sfw
based_on:
tags: [character, dark-lord-funk]
created: 2026-10-19
---
# Ilia
> A Fae-blessed priestess who sees monsters as filth and has built her whole faith on power and submission.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Slender and elegant, built for temple altars rather than the mud of war.
- Pristine pale skin, long sun-bleached blonde hair, sky-blue eyes.
- Tattered white-and-gold ceremonial robes from her former high status.
- Devout, rigid and intensely judgmental.
- A haughty voice that promises divine retribution.
- Her devotion can be redirected.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Slender, elegant.
- **Skin / scales:** Pristine pale.
- **Hair:** Long, sun-bleached blonde.
- **Eyes:** Sky blue.
- **Face:** Not set yet.
- **Distinguishing marks:** Fae blessing.
- **Default outfit:** Tattered white and gold ceremonial robes.

## Personality
- A zealot who views monsters as literal filth.
- Her faith rests on absolute power and submission, which makes it bendable.

## Voice
*How they talk. A few sample lines.*
- Haughty, promising divine retribution.

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Dark Lord Funk** (18): captured priestess. [[Ilia - Dark Lord Funk]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Priestess of the Cinderkin, blessed by the Fae.

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
