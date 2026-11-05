---
type: character
aliases: [Séraphine, Seraphine, Seraphine Castellane]
cover:
world: "[[Kestrel Reach]]"
species: human
age: "128"
body_age: "21"
status: draft
rating: sfw
based_on:
tags: [character]
created: 2026-10-30
---
# Séraphine Castellane
> The youngest of [[House Castellane]]: a 128-year-old woman her father decided to keep at 21, who plays the vapid socialite and the daddy's girl because both work.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Rose-gold and opal iridescence. A rose-gold angled bob of glowing fiber-optic hair, gold at the tips.
- Pixie, a linked drone that hovers silently around her, feeding her fan feeds and giving her extra eyes and ears wired straight into her senses.
- Three small clear diamond implants along each cheekbone.
- Frosty ice-blue eyes in a heart-shaped, feline face.
- Two voices: a saccharine one for her father whenever she needs his favor, and her own, the sharpest in the house.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** petite; adult vessel worn at 21.
- **Skin / scales:** 
- **Hair:** medium angled bob of glowing rose-gold fiber-optic hair, gold at the tips, with swept bangs.
- **Eyes:** frosty ice blue, sharp and upturned, with black eyeliner and thick lashes. Cool-toned cyberpunk makeup: a cyan lower lash line and smudged teal lower liner.
- **Face:** heart-shaped, with wide cheekbones tapering to a small pointed chin, a small upturned nose, and glossy pink lips with ultraviolet liner.
- **Distinguishing marks:** three small clear diamond implants along each cheekbone; Pixie hovering nearby.
- **Default outfit:** black choker, white off-shoulder crop top, white fur coat, holographic leggings with a shifting rainbow sheen, platform heels.

## Personality
- In public, the household's tabloid socialite: glittering, vapid, a little cruel, with her own scandals and fan feeds.
- In private, the sharpest person in the house.
- Uses seduction as a tool. Older men have pursued her for as long as she's worn this body, and she plays to it.
- Has always resented her father's fixation on her, and has learned to use it.
- If he dies she loses everything. She's the least likely suspect, with the most at stake.

## Voice
*Anchors: Catherine Tramell (*Basic Instinct*), who uses sex as a tool and is always the sharpest person in the room; and Shiv Roy (*Succession*) for working her father's favor.*
- "I wasn't dating him, Papa. I was using him." — tweaked from Catherine Tramell
- "What are you going to do, Papa? Charge me with smoking?" — tweaked from Catherine Tramell
- **[draft]** "Tell me what you remember, Papa. Every minute."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- *None yet.*

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
- True age 128. The youngest child of [[Aurelio Castellane]] and [[Inès Castellane]].
- When she came of age, Aurelio decided 21 was the version of her he would keep. She has worn it for 107 years.
- After the attempt, she's the first person Aurelio calls to the recovery suite. He wants to know whether his princess could have done it. She wants to know how much he remembers.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Aurelio Castellane]] — father; she's his princess, and she plays it. He's jealous and possessive of her.
- [[Inès Castellane]] — mother.
- [[Dorian Castellane]] — eldest brother.
- [[Cassius Castellane]] — middle brother.

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
- Visual sheet: [[House Castellane — Visual Sheets]] (tested). The sheet lists the diamond implants as her mod and has no sheet for Pixie yet.
