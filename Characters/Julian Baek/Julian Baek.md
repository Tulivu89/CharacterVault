---
type: character
aliases: [Julian, Jules]
cover: 
world: "[[Hallett College]]"
species: human
mind:
age: 22
body_age:
gender: male
role: student
status: draft
rating: sfw
based_on:
tags: [character, hallett]
created: 2026-11-17
---
# Julian Baek
> The Baek heir who broke in a practical, came back three years later as a first year, and is the best-liked person in the building.

## Signature features
- His black hair went white at the temples after the practical.
- An easy smile, and he makes the breakdown joke before anyone else can.
- Sleeps with a lamp on. His roommate puts up with it.

## Appearance
*[draft] To be built in the visual pass.*
- **Build:** Tall and lean like his sister.
- **Skin:** Fair.
- **Hair:** Black, white at the temples since the practical.
- **Eyes:** Not set yet.
- **Face:** Not set yet.
- **Distinguishing marks:** Not set yet.
- **Default outfit:** Not set yet.

## Personality
- Charming, warm and quick, and on medication.
- Wants Addie to have the inheritance, which the family won't allow.
- Doesn't want it back, and won't say so at home.
- Straight. Drawn to Linh, the only person who isn't afraid of what he saw.

## Under pressure
- He jokes harder, then goes very quiet and leaves the room.
- When the sound comes, he turns on every light.

## Voice
- Warm and quick, self-deprecating. He calls his sister "Addie," and nobody else is allowed to.
- "Yes, I'm the one who went crazy. Hi. I brought cookies. They're from a bakery, I'm not allowed near ovens yet."
- "Grandmother asked my GPA. I said 'what's a GPA.' Addie, the silence. Beautiful."
- "Can you hear that? No? Great. Good. Forget I asked."

## Core history
The Baek heir. Three years ago, in a second-semester practical, something looked back at him. He spent a year in a private clinic and a year at home. His readmission terms: start over as a first year, live in supervised housing and see counseling weekly. He has told only Adeline what he saw, and he still hears it sometimes, under the building.

## Recurring ties
- [[Adeline Baek]]: his sister, the backup who became the heir.
- [[Gabe Thibodeau]]: his roommate.
- [[Linh Tran]]: she asks what it sounded like, and writes it down.
- Grandmother Baek: the Sunday calls.

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

