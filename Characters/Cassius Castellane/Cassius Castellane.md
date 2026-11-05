---
type: character
aliases: [Cassius]
cover:
world: "[[Kestrel Reach]]"
species: human
age: "163"
body_age: "26"
status: draft
rating: sfw
based_on:
tags: [character]
created: 2026-10-30
---
# Cassius Castellane
> The middle son of [[House Castellane]] and his mother's boy, the only Castellane who still goes slumming on the lower decks.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Violet and copper. A polished copper prosthetic left hand with jeweled knuckle joints.
- A dark brown undercut fading to violet at the tips.
- His mother's green eyes and the mole under one eye.
- Charming and restless until the charm cracks into a violent tantrum.
- Forever trying to be his own man.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** toned; adult vessel worn at 26, two years older than his mother's.
- **Skin / scales:** 
- **Hair:** short undercut, dark brown fading to violet at the tips.
- **Eyes:** green, gently downturned.
- **Face:** 
- **Distinguishing marks:** a mole under one eye; a polished copper prosthetic left hand with jeweled knuckle joints.
- **Default outfit:** open purple bomber jacket over a black shirt, chain necklace, black pants, boots.

## Personality
- Charming in public and restless underneath.
- Throws violent tantrums.
- The only Castellane who still goes slumming down-well. His contacts there are exactly the kind that could hire a natural assassin.
- Keeps trying to be his own man, and his mother keeps pulling him back.

## Voice
*Anchors: Kylo Ren (*Star Wars*, sequel trilogy), the heir who smashes rooms and can't get out from under his parents; and Roman Roy (*Succession*) for the public charm.*
- "Let the old man die. Kill him, if you have to." — tweaked from Kylo Ren
- "I know what I have to do, Maman. I don't know if I have the strength." — tweaked from Kylo Ren
- "You need a guide. I can show you the lower decks." — tweaked from Kylo Ren

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- *None yet.*

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
- True age 163. The middle child of [[Aurelio Castellane]] and [[Inès Castellane]].
- His down-well contacts make him a suspect in the attempt, though his mother would lose her leverage too.
- On the second night of the lock-in, Inès keeps him in her suite. He wears the older body, and she has never let him forget whose boy he is.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Inès Castellane]] — mother; he's her boy, *mon petit*, though he looks two years older than her.
- [[Aurelio Castellane]] — father.
- [[Dorian Castellane]] — elder brother.
- [[Séraphine Castellane]] — younger sister.

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
- Visual sheet: [[House Castellane — Visual Sheets]] (draft, untested). The sheet sets no face shape yet, so **Face** is blank.
