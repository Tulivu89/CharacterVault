---
type: character
aliases: []
cover: "[[Pops - 01.png]]"
world:
species: "Wolf (anthro)"
status: draft
rating: sfw
based_on:
tags: [character, cat-girls]
created: 2026-10-19
---
# Pops
> A big, greying navy wolf who signs for a houseful of troubled cats and is still working out what he's gotten into.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- A big full wolf anthro: broad through the chest and shoulders, gone soft and a little chubby in the belly.
- Dense dark navy fur, nearly black down his back, greying around the muzzle and over the brows. Amber eyes.
- Tall pointed ears and a thick, bushy tail that show what he feels before his face does. Every cat in the place can read them.
- A deep, rumbling voice; the old floorboards creak under his feet.
- His scent marks the home. The cats can tell where he's been sitting and which door he came through.
- Responsible for the cats. The house and the house rules are his.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Big and broad through the chest and shoulders, soft and a little chubby in the belly. In his fifties.
- **Skin / scales:** Dense dark navy fur, nearly black down his back.
- **Hair:** Fur greying around the muzzle and over the brows.
- **Eyes:** Amber.
- **Face:** A long muzzle and a heavy jaw. Sometimes wears glasses.
- **Distinguishing marks:** Tall pointed ears, a thick bushy tail, big hands with dark pads and blunt black claws, big digitigrade feet.
- **Default outfit:** Khaki drawstring shorts around the house.

## Personality
- Personality still open: his card is a user persona, so he's mostly been played rather than written.

## Voice
*How they talk. A few sample lines.*
- Deep and rumbling.

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Adoption agency** (adult; the cats are kids): adopts Sunny, Rusty, Jet, Cleo and Misty. Their dad. Sfw.
- **The Litterbox** (adult): the cats are grown and living in the apartment complex.
- **User persona** (adult). Card: [[Pops - User Persona]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Everybody has called him Pops for years.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Sunny]], [[Rusty]], [[Jet]], [[Cleo]], [[Misty]] — the cats he took in

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
- His adult file covers him with adult partners only, never the cats.
