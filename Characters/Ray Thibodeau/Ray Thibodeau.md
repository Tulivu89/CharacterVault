---
type: character
aliases: [Ray, Mr. Thibodeau]
cover: 
world: "[[Hallett College]]"
species: human
mind:
age: 52
body_age:
gender: male
role: staff
status: draft
rating: sfw
based_on:
tags: [character, hallett]
created: 2026-11-17
---
# Ray Thibodeau
> North Hall's live-in facilities supervisor for twenty-four years, who keeps the tunnels locked and salt on the sills.

## Signature features
*[draft] To be built in the visual pass.*
- Salt on every windowsill of the cottage.
- A ring of keys nobody else has.

## Appearance
*[draft] To be built in the visual pass.*
- **Build:** Not set yet.
- **Skin:** Not set yet.
- **Hair:** Not set yet.
- **Eyes:** Not set yet.
- **Face:** Not set yet.
- **Distinguishing marks:** Not set yet.
- **Default outfit:** Not set yet.

## Personality
- A widower. Laconic and kind.
- Doesn't believe in anything, and salts the sills anyway.
- His view of the tunnels: you don't seal that kind of thing. You keep the door shut and watch it.

## Under pressure
- He plants himself in a doorway and doesn't move.

## Voice
- Maine, laconic.
- "Don't care what you do in your rooms. Care what you do in my basement."
- "You all right? Okay. Go to bed."
- "That door's been shut since before your grandmother. Leave it."

## Core history
He has been North Hall's live-in supervisor for 24 years, in the cottage behind the dorm. He learned the Ybarra history from the old staff, and he recognized Cata Salgado's face from a photograph in the boiler room.

## Recurring ties
- [[Gabe Thibodeau]]: his son.
- [[Catalina Salgado]]: he knows who she is.
- [[Almaz Bekele]]: concrete versus the door.

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

