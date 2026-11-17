---
type: character
aliases: [Gabe]
cover: 
world: "[[Hallett College]]"
species: human
mind:
age: 19
body_age:
gender: male
role: student
status: draft
rating: sfw
based_on:
tags: [character, hallett]
created: 2026-11-17
---
# Gabe Thibodeau
> The facilities supervisor's son, on tuition remission, who knows the building better than housing does.

## Signature features
*[draft] To be built in the visual pass.*
- Work-rough hands. He can fix your sink.
- Eats at the overflow table.

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
- Practical and dry, a man of few words.
- Grew up in the cottage behind North Hall and knows which radiators bang, which doors stick and where the tunnels go.
- Doesn't date college kids ("they leave"), but he likes Cata.
- Straight.

## Under pressure
- He gets practical and physical: fixes things, carries things, stands in a doorway.
- He lies only to keep someone out of the basement.

## Voice
- Local Maine. Few words, dry and practical.
- "Radiator bangs at four. That's not a ghost. Ghost's in the laundry room."
- "Don't go down there. I'm not being spooky. There's no lights and the floor's wet."
- "Julian. Lamp. It's three."

## Core history
Son of Ray Thibodeau. He worked a year with his father before enrolling on tuition remission, which is why he's 19. As a staff kid he has no house. At 14 he went down to the iron door, and he doesn't talk about what's past it. Caleb Prentiss asked him how to get into the tunnels before he withdrew.

## Recurring ties
- [[Ray Thibodeau]]: his father.
- [[Julian Baek]]: his roommate.
- [[Catalina Salgado]]: the girl in the archive.
- Caleb Prentiss: asked him for directions.

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

