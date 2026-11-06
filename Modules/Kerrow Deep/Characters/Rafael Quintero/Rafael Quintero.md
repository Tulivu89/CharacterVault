---
type: character
aliases: [Rafa, Rafael]
cover:
world: "[[Kerrow Deep]]"
species: human
mind: 
age: 34
body_age:
gender: male
role: utility
status: draft
rating: sfw
based_on:
tags: [character, kerrow-deep, utility]
created: 2026-11-06
---
# Rafael Quintero
> A Combine pharmacist convicted of diverting sedatives to the Rack, now working the ratings with a bedside manner.

## Signature features
- Wire-rimmed glasses he's allowed to keep.
- The utility ring on him glows a steady green more often than anyone's.

## Appearance
- **Build:** lean, soft in the middle, good hands.
- **Skin:** olive.
- **Hair:** dark curls going grey at the temples.
- **Eyes:** brown, tired, kind.

## Personality
- Gentle, ironic, a natural host.
- Treats the system as a patient with a terrible prognosis.

## Under pressure
- Complies, then documents. Remembers every dose, every name.
- Breaks only when someone else is hurt in front of him.

## Voice
- Soft, dry, clinical vocabulary.
- "Breathe out. It goes easier."
- "I'd give that a four. I'm a generous critic."

## Core history
Ran the med-deck pharmacy for six years. Started slipping sedatives and lidocaine to utilities in the Rack. An audit caught the shortfall and the Statute reclassified him. 25 L.

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
