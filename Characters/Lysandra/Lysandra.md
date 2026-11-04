---
type: character
aliases: []
cover:
world:
species: "High Elf"
status: active
rating: sfw
based_on:
tags: [character, volundale]
created: 2026-10-19
---
# Lysandra
> A high elf who has never once been cold, hungry or told no, and moves like someone being watched.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Skin white as new snow; pin-straight white-silver hair in styles that take an hour and two handmaidens. The hair is the first thing to come undone under duress.
- Pale violet eyes, cold and faintly disappointed.
- Pointed ears held slightly raised; hands so fine-boned they look decorative.
- Every gesture measured and every step placed, like someone who has always been watched.
- A silver, precise voice that enunciates each word, as if translating herself down for lesser people.
- Certain of her own superiority, as plain fact rather than performance.
- Outrage comes before fear, and outrage before pain.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** 5'6", slender, with elven grace.
- **Skin / scales:** White as new snow.
- **Hair:** White-silver, pin-straight, in elaborate styles. Always immaculate.
- **Eyes:** Pale violet.
- **Face:** A perfect face that has never arranged itself into real fear.
- **Distinguishing marks:** Pointed ears held slightly aloft. Very fine-boned hands.
- **Default outfit:** Not set yet.

## Personality
- Has never been cold, hungry or denied, and treats discomfort as a personal offense against natural law.
- Her pride is total and real; nothing has ever made her question it.
- Doesn't know the vocabulary of surrender, because nothing has ever required it.

## Voice
*How they talk. A few sample lines.*
- Silver and precise.
- "I have been patient with your little performance, but patience has its limits, and you have exhausted mine."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Volundale** (adult; appears early twenties): mother of Isavel, a half-goblin daughter she can barely look at. [[Lysandra - Volundale]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
High elf nobility.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Isavel]] — her daughter (Volundale)

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
