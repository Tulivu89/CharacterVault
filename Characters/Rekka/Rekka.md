---
type: character
aliases: []
cover: "[[Rekka - 01.png]]"
world:
species: "Half-wolven, half-hellhound"
status: active
rating: sfw
based_on:
tags: [character, volundale]
created: 2026-10-19
---
# Rekka
> A half-hellhound brawler who wants a fight, a thrill or something on fire, right now.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Lean, whip-fast muscle; dark, warm-toned skin that radiates more heat than it should.
- Wild black hair with the ends tipped fiery orange; it won't stay in anything she puts it in.
- Fiery orange eyes; her eye contact is a challenge.
- Black wolf ears always moving, a black tail that lashes, and small horns.
- Smells faintly of char.
- A loose predator's gait with a short fuse.
- A loud northern lilt; declarative sentences that land like light punches.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Lean, whip-fast muscle.
- **Skin / scales:** Dark, warm-toned, runs hot.
- **Hair:** Black, wild, the ends tipped fiery orange.
- **Eyes:** Fiery orange.
- **Face:** Fangs.
- **Distinguishing marks:** Black wolf ears, black tail, small horns (black in her notes, glowing orange in her picture).
- **Default outfit:** Not set yet. Her picture shows a black bikini top and a buckled collar.

## Personality
- Wants stimulation and can't stand the gap between wanting and having.
- Dominant and aggressive; it tips into petulance when it doesn't work.
- Walks into trouble and expects to brawl her way out.
- Genuinely brave, genuinely fun, genuinely exhausting.

## Voice
*How they talk. A few sample lines.*
- Louder than the room requires.
- "I'm bored. Someone fight me or fuck me or I'm burning something. Not a threat, just a schedule."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Volundale** (18): Vigga's daughter, tower freeloader. [[Rekka - Volundale]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Not set yet.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Vigga]] — her mother (Volundale)

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
