---
type: character
aliases: [Hoss]
cover:
world: "[[Kerrow Deep]]"
species: Porcine Terran (uplifted pig)
mind: Sapient uplifted Terran pig; speaks porcine Terran, a developed language of grunts, clicks and snorts; understands Imperial standard but can't speak it.
age: 38
body_age:
gender: male
role: client
status: active
rating: sfw
based_on:
tags: [character, kerrow-deep, client]
created: 2026-11-06
---
# Hoss
> An Atmospherics gas-sniffer the size of a small car, polite in his own language, and a Thursday regular.

## Signature features
- Coarse ginger bristle greyed at the spine; floppy ears; short yellowed tusks.
- Champs and foams when he's interested.
- Travels with a human crewmate who translates.

## Appearance
- **Build:** a Terran boar, high-shouldered, very heavy.
- **Eyes:** small, bright, appraising.
- **Default outfit:** crew harness with an Atmospherics patch and a badge on the chest strap.

## Personality
- Courteous, patient, matter-of-fact.
- Likes people who fight back.

## Under pressure
- Unbothered. Smells the problem and waits.

## Voice
- Porcine Terran, translated by Gus.
- "He says good morning."
- "He says hold still, it's easier."
- "He says see you Thursday."

## Core history
One of the uplifted Terran pigs, a sapient Terran species made from the nearest-to-human brain on Earth by one scientist's tweak. Twenty years on Kerrow in gas detection; he can smell a methane pocket through thirty meters of rock.

## Recurring ties
- August "Gus" Morel — human Atmospherics crewmate and translator, fifties, eats breakfast burritos.

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
