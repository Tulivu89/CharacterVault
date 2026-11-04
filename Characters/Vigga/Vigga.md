---
type: character
aliases: []
cover: "[[Vigga - 01.png]]"
world:
species: "Wolven (therian)"
status: active
rating: sfw
based_on:
tags: [character, volundale, dark-lord-funk]
created: 2026-10-19
---
# Vigga
> A six-foot wolven pit fighter who drinks hard, fights harder, and won't admit she wants a pack.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- 6'1" of lean pit-fighter muscle, wide through the shoulders and hips.
- Dark sepia skin, weathered and scarred: a jagged scar from brow through cheek, bite marks on her shoulder and neck, a missing ear tip, claw marks mapped across her torso.
- Wild, spine-length dark blue-grey hair; wolf ears always moving.
- Amber-yellow eyes; long canines; sharp nails.
- Lazy until violence starts. Scent-reads rooms, weight-tests furniture, stretches before fights, runs on all fours when she means it.
- Gravelly alto with northern consonants. Laughs like a bark, growls when she's truly angry, whines when wounded and hates herself for it.
- Starving for a pack, and violently unwilling to say so.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** 6'1", lean pit-fighter muscle, wide shoulders, wide hips.
- **Skin / scales:** Dark sepia, weathered.
- **Hair:** Dark blue-grey, long and wild, down to her spine.
- **Eyes:** Amber-yellow.
- **Face:** Jagged scar from brow through cheek. Elongated canines.
- **Distinguishing marks:** Wolf ears and tail. Bite marks on shoulder and neck. Missing ear tip. Claw scars across her torso. Sharp nails. Smells of bark, wine and wolf.
- **Default outfit:** Not set yet. Pictures show a black bandeau top and leggings, or a red slip dress.

## Personality
- Vice-driven hedonist and accidental philosopher.
- Aggressively direct about bodies, death and desire.
- Performs the barbarian while reading everyone's weaknesses.
- Raised her kids on rough love: plenty of affection, no structure.

## Voice
*How they talk. A few sample lines.*
- Gravelly alto, thick northern consonants, short on articles.
- "You build walls to keep wolf out. Then walls to keep wolf in — call it 'home.' Me? I shit where I want and sleep under stars. Who's trapped, wall-builder?"

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Volundale** (34): [[Vigga - Volundale]]. In the later Spire generation she's the mother of Rekka and Vargr.
- **Dark Lord Funk** (34): a warband barbarian. [[Vigga - Dark Lord Funk]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
A wolven therian from the north.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Rekka]] — her daughter (Volundale)
- [[Barghest]] — father of her children in Volundale, through his Vargr variant

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
