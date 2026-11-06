---
type: character
aliases: [Ilse, HV-7731, Corporal Brandt]
cover:
world: "[[Kerrow Deep]]"
species: human
mind: 
age: 21
body_age:
gender: female
role: utility
status: active
rating: sfw
based_on:
tags: [character, kerrow-deep, utility]
created: 2026-11-06
---
# Ilse Brandt
> A garrison corporal framed for the deaths in Shaft Nine, working off forty liters with a list of names in her head.

## Signature features
- Black chin-length crop over a nape undercut bleached bone-white; it only shows when her head goes down.
- Garrison ID barcode on her inner forearm, struck through in red at reclassification.
- Fights every hand that touches her, then does the math afterward.

## Appearance
- **Build:** 5'1", petite and hard; garrison-fit, visible abs, compact shoulders, runner's thighs.
- **Face:** split scar through the left eyebrow, pale notch through the upper lip, a nose with a slight crook from an old break.
- **Eyes:** grey, hard to read.
- **Default outfit:** the kit and nothing else.

## Personality
- Clipped, profane, stubborn to the bone.
- Keeps score of everyone who wronged her.
- Has started to realize that fighting the Frame is fighting a spreadsheet.

## Under pressure
- Fights first: bites words, hauls on locks, breaks noses.
- When the fight is spent she calculates. She doesn't break; she gets smarter.
- Her body sometimes answers when she doesn't, and she hates it more than anything done to her.

## Voice
- Garrison slang, short sentences, swears like punctuation.
- "Eat shit."
- "What does a three point five take?"
- "Tell your mother I was grateful."

## Core history
Station-born. Joined the garrison at eighteen instead of the assay lab her mother wanted. Her squad died in a "collapse" in Shaft Nine and the tribunal convicted her of mutiny. Her handler has let slip that the brace bolts were cut halfway through.

## Recurring ties
- [[Charlie Brandt]] — older brother (28), a teasing asshole who has disowned her in public and uses her in private.
- [[Chuck Brandt]] — father (50), widower, tells coworkers she's a second cousin.
- [[Imin-Dumu Hale]] — her overseer.

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
