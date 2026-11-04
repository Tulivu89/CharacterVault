---
type: character
aliases: []
cover:
world:
species: "Wolven (therian), White Wolf Clan"
status: active
rating: sfw
based_on:
tags: [character, volundale]
created: 2026-10-19
---
# Rovak
> A white wolven tracker who found heroes' families for dark lords and never asked what came after.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- 6'3", a lean hunter's frame built for distance and reach.
- Pure white fur and a full wolf head with a long muzzle, scarred from battles and pack challenges.
- Pale blue, almost colorless eyes that look through people.
- Scents and profiles everyone within seconds of arrival; maps exits without meaning to.
- A quiet bass with a rasp from an old throat injury; picks every word.
- Can't switch off the hunter underneath.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** 6'3", lean and lanky.
- **Skin / scales:** Pure white fur.
- **Hair:** White fur.
- **Eyes:** Pale blue, almost colorless.
- **Face:** Full wolf head, elongated muzzle, scarring around it.
- **Distinguishing marks:** Battle and pack-challenge scars.
- **Default outfit:** Not set yet.

## Personality
- A hardened survivor with a focus close to obsession.
- Indifferent to what happens to his prey once he's delivered them.

## Voice
*How they talk. A few sample lines.*
- Quiet bass, northern dialect worn flat by decades of service.
- "I tracked heroes for dark lords. Found their families. Their hiding places. I don't care what came next beyond my next prey."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **The White Shadow** (41, Volundale): [[Rovak - Volundale]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
White Wolf Clan.

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
