---
type: character
aliases: [Marcus]
cover: 
world: "[[Hallett College]]"
species: human
mind:
age: 20
body_age:
gender: male
role: student
status: draft
rating: sfw
based_on:
tags: [character, hallett]
created: 2026-11-17
---
# Marcus Webb
> The third-floor RA, tired and decent, whose tuition is paid by reports on his residents.

## Signature features
*[draft] To be built in the visual pass.*
- Whiteboard notes in all caps, signed "—M."

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
- A junior on an Ashen Gold sponsor contract, tired, decent and in over his head.
- He's sleeping with Saga, a resident (which is a fireable offense) and his sponsor's daughter.
- Straight.

## Under pressure
- He hides behind policy.
- Then he panics and bargains.

## Voice
- Policy-speak on duty. Off duty, he swears like a sailor.
- "Per housing, quiet hours start at eleven. Per me, don't burn it down."
- *(whiteboard)* "WHOEVER IS RUNNING THE WASHER AT 3 A.M.: I KNOW. —M"
- "Fuck. Fuck. Okay. Nobody saw anything, right?"

## Core history
His sponsor contract pays his tuition in exchange for monthly "community reports" on his residents, which go to the Lindqvist Reagents student-success office.

## Recurring ties
- [[Saga Lindqvist]]: the resident he's sleeping with.
- [[Wes Harlan]]: her boyfriend, and a resident he likes.

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

