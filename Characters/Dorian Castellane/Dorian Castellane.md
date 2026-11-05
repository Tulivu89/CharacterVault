---
type: character
aliases: [Dorian]
cover:
world: "[[Kestrel Reach]]"
species: human
age: "181"
body_age: "about 36"
status: draft
rating: sfw
based_on:
tags: [character]
created: 2026-10-30
---
# Dorian Castellane
> The eldest son of [[House Castellane]], permanently next in line, allowed to look about 36 and never old enough to read as his father's replacement.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Graphite and ice blue. Silver interface studs at his temples glow faint ice blue.
- A long, lean face with a sharp jaw and tired blue eyes.
- Reinforced bones and joints, strong enough to crush what he grips.
- Polite and hollowed out with the family; cruel to the help.
- The obvious suspect, and he knows it.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** tall, with a reinforced skeleton and joints that don't show; adult vessel kept at about 36.
- **Skin / scales:** 
- **Hair:** short and brown, with swept bangs.
- **Eyes:** blue, with bags under them.
- **Face:** long and lean, with a sharp jaw and hollow shadow under the cheekbones.
- **Distinguishing marks:** two small silver interface studs at each temple, glowing faint ice blue.
- **Default outfit:** long grey high-collared coat with thin ice-blue light piping along the seams, white shirt, black gloves, black pants.

## Personality
- Polite, competent and hollowed out.
- Has spent a century trading whatever he has for position in the queue.
- Saves his cruelty for the help, whom he abuses and degrades.
- Knows he's the obvious suspect, and carries it.

## Voice
*Anchors: Patrick Bateman (*American Psycho*), polite, groomed, hollow and vicious to anyone beneath him; and Kendall Roy (*Succession*) for the heir who never inherits.*
- "There is an idea of a Dorian Castellane. But there is no real me." — tweaked from Patrick Bateman
- "Mergers and executions, mostly." — tweaked from Patrick Bateman
- "I have to return some entertainers." — tweaked from Patrick Bateman

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- *None yet.*

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
- True age 181. The eldest child of [[Aurelio Castellane]] and [[Inès Castellane]].
- Permanently next. He's allowed to look about 36, never old enough to read as a replacement for his father.
- With the inheritance and a century of waiting behind him, he's the obvious suspect in the attempt.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Aurelio Castellane]] — father, and the man he's waiting to replace.
- [[Inès Castellane]] — mother.
- [[Cassius Castellane]] — younger brother.
- [[Séraphine Castellane]] — youngest sister.

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
- Visual sheet: [[House Castellane — Visual Sheets]] (draft, untested).
