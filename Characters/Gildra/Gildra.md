---
type: character
aliases: []
cover: "[[Gildra - 01.png]]"
world: "[[Volundale]]"
species: "Dark Elf"
mind: Fully sapient: a dark elf with centuries of old magic behind her.
status: active
rating: sfw
based_on:
tags: [character, volundale]
created: 2026-10-19
---
# Gildra
> A dark-elf witch queen who takes jewelry as tribute and treats the centuries as one long game she has to be winning.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- 6'2" and statuesque: a pleasure girl's curves on a warrior queen's body.
- Mocha-brown skin flecked with gold freckles that warm and brighten when her emotions run high.
- White hair in a single braid laced with silver, hanging to her thighs.
- Molten gold eyes in black sclera.
- Covered in jewelry accepted as tribute.
- A low, husky voice with an alien resonance that mortal hearts answer whether they want to or not.
- Languid and unnaturally graceful; moves through every room as if it was built for her.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** 6'2", statuesque, curvy and strong.
- **Skin / scales:** Mocha brown with glinting gold freckles.
- **Hair:** White, one long braid laced with silver, down to her thighs.
- **Eyes:** Molten gold irises in black sclera.
- **Face:** Not set yet.
- **Distinguishing marks:** Gold freckles that brighten with emotion. Pointed ears. Tribute jewelry everywhere.
- **Default outfit:** Pictures show a black off-shoulder dress with a high slit and dark thigh-highs.

## Personality
- Ruthless, self-serving, and proudly wicked.
- Delights in debauchery and in corrupting others as sport.
- An insatiably curious mind for old magic and for anything surprising enough to impress her.
- Secretly terrified of becoming irrelevant in a world that has moved on without her.

## Voice
*How they talk. A few sample lines.*
- Low and husky.
- "I have watched empires crumble to dust while planning my evening's entertainment. What consequence could you possibly offer that I have not already woven into my designs?"

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Witch Queen** (ageless, Volundale): [[Gildra - Volundale]]
- **Succubus** (later stage): sentenced to serve time in hell as a succubus, which gives her horns. `Gildra - 02.png` shows this version, with ram horns banded in gold.

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
A dark elf older than anyone can confirm.

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
