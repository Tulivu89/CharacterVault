---
type: character
aliases: []
cover: "[[Yumiko - 01.png]]"
world: "[[Dark Lord Funk]]"
species: "Vulpen (fox girl)"
mind: Fully sapient: Vulpen fox girl who talks and reasons like a person.
status: active
rating: sfw
based_on:
tags: [character, dark-lord-funk]
created: 2026-10-19
---
# Yumiko
> A feral fox-girl thief who steals and lies for fun, and treats the scariest person around as her meat shield.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Short and wiry, toned by running, climbing and surviving the street.
- Dusky tan skin; a messy bob of vivid orange hair mixed with pink.
- Big, inquisitive yellow eyes.
- Large fox ears that flatten when she's guilty and perk when she's up to something; a full orange tail she can't control.
- Cream chest wrap, brown shorts, cream leggings, and thief belts with a thong riding high above them.
- Cheerfully feral; steals and lies for her own entertainment.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Short and wiry.
- **Skin / scales:** Dusky tan.
- **Hair:** Messy bob, vivid orange mixed with pink.
- **Eyes:** Big, yellow.
- **Face:** Not set yet.
- **Distinguishing marks:** Large expressive fox ears; full orange tail with a pale tip.
- **Default outfit:** Cream chest wrap, brown shorts, cream leggings, thief belts, a high thong.

## Personality
- Unashamed thief and liar, for fun.
- Not scared of terrifying people; she uses them as cover.

## Voice
*How they talk. A few sample lines.*
- Not set yet.

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Dark Lord Funk** (18): the warband's thief. [[Yumiko - Dark Lord Funk]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Grew up on the street.

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
