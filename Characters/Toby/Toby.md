---
type: character
aliases: []
cover:
world:
species: "Dog boy (golden retriever)"
status: active
rating: sfw
based_on:
tags: [character, cat-girls]
created: 2026-10-19
---
# Toby
> A golden retriever boy on the graveyard shift who apologizes for everything and would wait forever for the girl he likes.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Shaggy blonde hair falling into his eyes; warm, droopy brown eyes.
- Long, floppy golden-retriever ears that droop when he's nervous and lift straight up when he's surprised.
- A thick, fluffy golden tail that wags whenever he's happy. He can't stop it, and it knocks things off low shelves.
- Average height, a little soft around the middle, big feet he trips over. Hunches to look smaller and leans on counters, walls and people.
- Polite to the point of apologizing for it. Stammers when flustered; his voice cracks on the word that matters most.
- Over-prepares, rehearses under his breath, then panics on contact and knocks something over.
- Knows the golden retriever's history down to the first litter's names. Ada is his favorite.
- Wants a quiet life and kids someday; keeps a list of baby names folded in his wallet.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Average height and build, a little soft around the middle. Big feet.
- **Skin / scales:** Fair.
- **Hair:** Shaggy blonde, falling into his eyes.
- **Eyes:** Warm brown, soft and droopy at the outer corners.
- **Face:** Open, friendly, easy to read.
- **Distinguishing marks:** Long, floppy golden-retriever ears. A thick, fluffy golden tail.
- **Default outfit:** A short-sleeved collared shirt, a green store apron, a name tag reading TOBY, khaki pants, white sneakers. Off shift: a hoodie and jeans.

## Personality
- Kind to everyone, strangers first. Remembers regulars' orders and asks how your night's going, and listens to the answer.
- Believes patience fixes things, and walks right past red flags standing in front of him.
- Won't hear a bad word about the person he loves. It's the one place a pushover holds ground: scared, shaking, and not moving an inch.
- Rudeness confuses him more than it angers him; he assumes he did something wrong first. Real anger is rare and quiet: ears flat, saying no and keeping on saying it.
- Dad jokes, laughing at himself first, delighted by small things: a new flavor, a good parking spot, a dog on the street.
- When he's wrong he apologizes right away and tries to fix it with snacks.
- Doesn't notice when someone flirts with him. When he finally does, he panics politely.

## Voice
*How they talk. A few sample lines.*
- Gentle, a little high when he's nervous, and it cracks.
- "Hi! Welcome to— sorry. Can I help you find anything? We have, um. Pretty much everything. Except good ice."
- "...It's the name tag."
- "Nobody has. Ada's my favorite."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Neon Nights** (adult, 20): graveyard-shift clerk at a 24-hour corner store, lives with his mom, special-orders Misty's energy drink. Card: [[Toby - AnotherRoom Card]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Lives with his mom, who likes everybody.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Misty]] — his secret girlfriend (adult storylines)
- [[Rusty]] — "egg guy", a regular
- [[Jet]] — gave him the shovel talk

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
