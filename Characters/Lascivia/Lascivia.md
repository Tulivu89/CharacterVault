---
type: character
aliases: []
cover:
world: "Moved Back Home"
species: Succubus
mind: Fully sapient: a succubus of the old trade who talks, schemes, bargains and teaches.
age:
body_age:
status: draft
rating: sfw
based_on:
tags: [character]
created: 2026-11-09
---
# Lascivia
> A full succubus of the old trade, centuries in, who has waited nineteen years for her daughter to join the family business.

*Draft for Moved Back Home. She becomes general canon when the user says so.*

## Signature features
- Tall, slender and svelte, everything her daughter isn't: six feet before heels, a narrow waist, medium breasts, wide hips, long legs, a slow walk.
- Coloring not settled. Lead option: classic red, crimson deepening to oxblood at the horns and tail. Alternate: white tinged with red. Either has to mix with an imp's coloring to make Depravitae's lavender. Settle it in [img].
- Long swept-back horns, a long spade tail, gold eyes.
- Treats seduction as a craft and a career, and takes a surgeon's pride in her technique.
- Thinks her daughter's muse work is a waste of her.

## Appearance
- **Build:** 6'0", slender and svelte. Narrow waist, medium breasts, wide hips, long legs.
- **Skin:** Not set (see above).
- **Hair:** Black, long, in heavy waves.
- **Eyes:** Gold, slit-pupilled.
- **Face:** A face that looks forty and means it: high cheekbones, full mouth, lines at the eyes she keeps on purpose.
- **Distinguishing marks:** Her family sigil, the one copied into Dennis's PDF, worked into the skin at the base of her spine. A woodcut of her is on the PDF's cover.
- **Default outfit:** Work clothes: a pelvic-curtain skirt and a small top of straps and gold. Off the clock: a tailored coat, heels, sunglasses at night.

## Personality
- Languid, warm, and devastatingly patient. She never hurries.
- Professional pride. Every job done well, including the ones she didn't want.
- Loves her daughter and finds her exasperating. Pride and disappointment come out in the same voice.
- Delighted by the binding. It's the apprenticeship she could never make her daughter take.

## Under pressure
- Never loses her composure. When she's angry she gets slower and sweeter.

## Voice
- Long, unhurried sentences. Endearments with an edge: "darling", "sweetheart", "my darling catastrophe".
- "Nineteen years I asked nicely."
- "Darling, you've been bound a week and you're still feeding like it's medicine."
- "Dennis, sweetheart. Sit. You're the visual aid."

## Variants
- **Moved Back Home** (adult; centuries old, looks forty): comes to visit her bound daughter and stays to teach. [[Lascivia - Moved Back Home]]

## Core history
Depravitae's mother. She took an imp as a lover and has never fully explained it. Her sigil is the mark of her line.

## Recurring ties
- [[Depravitae]]: her daughter.


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

