---
type: character
aliases: [Seren]
cover:
world: "[[Kerrow Deep]]"
species: Aedelvass
mind: Sapient Aedelvass; speaks Imperial standard and a reconstructed Aedelvass dialect.
age: 31
body_age:
gender: female
role: utility
status: active
rating: sfw
based_on:
tags: [character, kerrow-deep, utility]
created: 2026-11-06
---
# Seren Morvah
> An undocumented Aedelvass who refuses on principle and has the most liters on the board to show for it.

## Signature features
- Black hair fading to luminescent teal; tattoos in the same gradient.
- Her glow shows every user her fear and her arousal, and she can't suppress it.

## Appearance
- **Skin:** copper-brown.
- **Build:** soft, strong-shouldered.
- **Eyes:** dark brown, steady.

## Personality
- Principled to the point of self-harm.
- Kind to the other utilities, stony to clients.

## Under pressure
- Refuses. Goes still and silent. Her body lights up anyway, and that is the cruelty of it.

## Voice
- Quiet, slow, a soft western-isles lilt.
- "No."
- "You can see it. That doesn't make it yours."

## Core history
Taken off a Rim freighter as an "unregistered asset" with no papers and no family on record. Sentenced to an inflated 60 L because nobody contested it.

## Recurring ties
- —

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
      - age
      - rating
```

## Gallery
*Drop images into this character's `images` folder. Adult images go in `images/adult` and stay out of this view.*
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

## Notes
