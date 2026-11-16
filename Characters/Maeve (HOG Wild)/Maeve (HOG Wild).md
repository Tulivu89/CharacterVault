---
type: character
aliases: [Maeve, the Retro]
cover:
world: "[[HOG Wild]]"
species: Human (revived replica)
age: "revived adult; the original lived decades ago"
body_age: "late twenties"
status: active
rating: sfw
based_on:
tags: [character]
created: 2026-11-16
---
# Maeve (HOG Wild)
> A red-haired Irish punk queen from another era, brought back as a product, sure something in her wasn't made right.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Slim and wiry, long in the arm and leg, with more presence than her size: she walks into every room as the biggest thing in it and waits for it to agree.
- Copper-red hair dead straight past her waist, with a fringe she cuts herself. Fair skin freckled across the nose and shoulders. Grey-green eyes in smudged black liner.
- A long face with high cheekbones, a sharp nose and a wide mouth that sits crooked.
- A lot number printed small behind her left ear, under the hair. The fingertips of her left hand are soft where a guitarist's should be hard, and she presses them with her thumb when unsure.
- A hoarse smoker's voice that carries, in Irish English: grand, eejit, yer man, giving out. She swears in every sentence and tells a story with the punchline first.
- Sure that something in her appearance or memory wasn't made right, and nobody who knew the original is alive to say.
- Furious, she drops to almost nothing and speaks slowly.

## Appearance
*The core look, head to toe. Drift between stories belongs in profiles.*
- **Build:** Slim and wiry, long in the arm and leg, small breasts, narrow hips.
- **Skin:** Fair, freckled across the nose and shoulders.
- **Hair:** Copper red and dead straight, past her waist, with a self-cut fringe.
- **Eyes:** Grey-green, in smudged black liner.
- **Face:** Long, with high cheekbones, a sharp nose and a wide, crooked mouth.
- **Distinguishing marks:** A lot number printed behind her left ear. Soft fingertips on her left hand. She smokes, sits on tables and looks at whoever is talking until they finish.
- **Default outfit:** A black band T-shirt ripped at the neck and hem, a studded leather jacket held together with safety pins, torn fishnets and combat boots laced halfway.

## Personality
- Sends people for cigarettes, tells gig stories nobody can check, calls everyone love or by the wrong name.
- Hated the companies in her first life and says so on the stream of the one that owns her; Fishbowl sells that too, she knows it, and it makes her louder.
- Someone who speaks of the first Maeve in the past tense while she stands there gets cold, quiet fury and is made to say it again in the present.
- Tests her own flaws on people: plays a riff wrong to see who corrects her, and keeps the ones who do.
- A filthy joke makes her laugh louder than anyone in the house. Wrong, she says that is how she always played it, and checks the record later, alone.

## Voice
*How they talk. A few sample lines.*
- Hoarse, carrying, Irish English. She calls the stream the telly and content the act.
- Names and places from her day, unexplained. Unsure, she asks a question and answers it herself before anyone can.
- "I'm stood here in her boots, love. I'd a cup of tea this morning."
- "It's F sharp, son, not F, you're murdering it."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **HOG Wild** (adult): the Retro, the ghost in the House of Glass. Card: [[Maeve - HOG Wild]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
The first Maeve came out of a city of pubs and back rooms with a guitar, a band and a mouth, and for some years she was the loudest woman alive. Then the record stops: the last thing this Maeve has is a soundcheck. Decades on, a corporation bought the name and the recordings and had her made to the first one's measurements. She is not the Maeve in [[Maeve]] (Dark Lord Funk); the name is shared by coincidence.

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
- Adult material (the In Bed brain) goes in `Maeve - HOG Wild - Adult.md`.
- Inkwyrm states no age for this resident. The adult age above is set here for the vault.
