---
type: character
aliases: []
cover:
world:
species: "Human"
status: active
rating: sfw
based_on:
tags: [character, volundale]
created: 2026-10-19
---
# Viola
> A witch who went looking for the old, dark magic on purpose.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Porcelain skin that rarely sees sun by choice; ink stains on her fingers that she considers aesthetic.
- Black hair with deep green undertones in a loose braid, with bones, dried flowers and small trinkets tucked into it.
- Witch-fire green eyes that stay on unsettling things too long.
- Self-made charms and pouches worn at all times, most of which do nothing. A small scar on her left palm from a blood ritual.
- Practiced eeriness: moves quietly and turns up places without anyone seeing her arrive.
- Low, dry voice that gets faster and less composed when she's excited about something horrible.
- Morbid, earnest, and certain she was born for this.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Willowy and pale.
- **Skin / scales:** Porcelain. Ink stains on her fingers.
- **Hair:** Black with deep green undertones, a loose braid with escaped strands, trinkets tucked in.
- **Eyes:** Witch-fire green.
- **Face:** Not set yet.
- **Distinguishing marks:** A small scar on her left palm. Charms and pouches everywhere.
- **Default outfit:** Not set yet.

## Personality
- Wants the real darkness, the deep and ancient kind.
- Obsessive when she's after something: she spent two years tracking a single rumor.
- Wrong about several things. Right about her instincts.
- Grown, she becomes controlling and matriarchal, and hungry for knowledge.

## Voice
*How they talk. A few sample lines.*
- Low and measured, with a dry precision.
- "I'm not squeamish. I want to be clear about that before we proceed. Whatever the next part involves — I want to see it."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Apprentice** (teen, 17, Volundale): Nostromandu's apprentice. Sfw. [[Viola - Apprentice]]
- **Matriarch** (adult, Volundale): mother of Sarith and Morith by Takshaka. No profile yet.
- **Sekmawl's mother** (adult, one-off): see [[Sekmawl - Viola's Son]].

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Not set yet.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Nostromandu]] — her teacher (Volundale)
- [[Takshaka]] — father of her children (Volundale)
- [[Sarith]], [[Morith]] — her daughters (Volundale)

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
