---
type: character
aliases: [Wes]
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
# Wes Harlan
> Saga's boyfriend since sophomore year, the most normal person on the floor, and the one everyone confides in.

## Signature features
*[draft] To be built in the visual pass.*
- Earnest, polite, and says "honestly."

## Appearance
*[draft] To be built in the visual pass.*
- **Build:** A hurl player's build.
- **Skin:** Not set yet.
- **Hair:** Not set yet.
- **Eyes:** Not set yet.
- **Face:** Not set yet.
- **Distinguishing marks:** Not set yet.
- **Default outfit:** Not set yet.

## Personality
- Earnest and kind, and a decent player on the men's hurl team.
- Since he's the most normal person on the floor, everyone confides in him.
- Knows Saga's bored. Doesn't know about Marcus.
- Straight. He doesn't know why he says goodnight to Cata.

## Under pressure
- He apologizes for other people and smooths things over.
- When it finally breaks, it breaks quietly and for good.

## Voice
- Polite and earnest. He says "honestly," and says "we" when he means himself and Saga.
- "Honestly? She's having a great time. We're having a great time."
- "Hey, Cata. Night. Sorry, is that weird? I just always say it."
- "Caleb's stuff is still on that shelf. Housing says they're coming for it. Just, maybe don't touch it."

## Core history
His father is Lindqvist Reagents' general counsel and drafted the NDA after Adeline and Saga's junior year. Wes has never told Saga he knows. His roommate, Caleb Prentiss, withdrew in week two, and Caleb's things are still on the shelf. The protagonist takes Caleb's bed.

## Recurring ties
- [[Saga Lindqvist]]: his girlfriend.
- [[Catalina Salgado]]: his girlfriend's roommate.
- [[Marcus Webb]]: the RA.
- Caleb Prentiss: his roommate who withdrew.

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

