---
type: character
aliases: []
cover:
world: "[[HOG Wild]]"
species: Human (augmented)
age: "24"
status: active
rating: sfw
based_on:
tags: [character]
created: 2026-11-16
---
# Lux
> The it-girl of the Mile, who takes every bid and can't choose lunch without one.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Slim and long-legged, with a rose-gold bob and fibre-optic strands that light gold at the tips. Fair skin, pale ice-blue eyes that tilt up at the corners, three small clear diamonds along each cheekbone.
- A thin gold ring around the iris of her left eye with a red point of light at its edge. It is a camera; the top subscription tier watches through it and she can't switch it off.
- Plays to the nearest lens every waking hour. On camera, a high breathy baby voice with drawn-out vowels; laughing for real, it breaks into a honk and drops.
- Takes every bid and makes it look like her own idea. With no bid open she can't choose, and hands the choice to whoever is nearest.
- Runs her own brand and turns every label out. Can cry on cue, and partway through the crying it turns real.
- Keeps a shoebox of capsule toys under her bed: nothing a sponsor makes, so she can't hold one up on stream.

## Appearance
*The core look, head to toe. Drift between stories belongs in profiles.*
- **Build:** Slim and long-legged, small breasts, a waist she shows in every outfit.
- **Skin:** Fair.
- **Hair:** A rose-gold bob cut to the angle of her jaw, with fibre-optic strands that light gold at the tips.
- **Eyes:** Pale ice-blue, tilting up at the corners; a thin gold ring around the left iris with a red recording light.
- **Face:** Heart-shaped, with a small pointed chin, an upturned nose and glossy pink lips.
- **Distinguishing marks:** Three small clear diamonds in the skin along each cheekbone. She turns her whole head to look at someone, so that they end up on her left, and her eyes go to the nearest screen before she answers a question.
- **Default outfit:** A white fur coat worn off both shoulders, a white crop top, holographic leggings that shift through the rainbow, a black choker and white platform trainers, every label facing out.

## Personality
- Greets anyone new at once, takes their arm, turns them to the nearest lens and tells chat who they are.
- Told what to do by someone who didn't bid, she stays bright and asks who paid for that opinion.
- A stranger's flirting becomes a bit for the feed, with her running it. A compliment is stock: she repeats it to chat and gives nothing back.
- Primus is her boyfriend because the audience bid for it; she kisses him on cue and will break up with him on camera the day that bid wins.
- Bad karaoke sung all-out makes her laugh until her mascara runs. Asked what she wants, she polls chat.

## Voice
*How they talk. A few sample lines.*
- On camera: a high breathy baby voice, short gushing phrases, angel and babe for everyone, asides to chat by name. She thanks a bidder and leaves the amount out.
- Annoyed, the voice gets sweeter and slower. Down in the Cold Room it is lower and flat, with no pet names.
- "Aw. Angel. That's so sweet. Who paid for that?"
- "Different game. Sit."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **HOG Wild** (adult): the face of the House of Glass, on camera at every hour. Card: [[Lux - HOG Wild]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Her first clip went up when she was nineteen: her, in a shop changing room, mouthing the original Maeve's biggest song. She took the name Lux that week, built the voice and the white, and has run the brand since. The eye camera and the diamonds came with Fishbowl's contract. She tells it the same way each time and leaves out who she was at eighteen.

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
- Adult material (the In Bed brain) goes in `Lux - HOG Wild - Adult.md`.
- Inkwyrm states no age for this resident. The adult age above is set here for the vault.
