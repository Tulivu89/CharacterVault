---
type: character
aliases: [Dr. Bekele, Professor Bekele, Almaz]
cover: 
world: "[[Hallett College]]"
species: human
mind:
age: 48
body_age:
gender: female
role: staff
status: draft
rating: sfw
based_on:
tags: [character, hallett]
created: 2026-11-17
---
# Almaz Bekele
> The professor whose course drops a third of the first-year class, and who put her daughter in a room with the student she tried to keep out.

## Signature features
*[draft] To be built in the visual pass.*
- Never raises her voice.

## Appearance
*[draft] To be built in the visual pass.*
- **Build:** Not set yet.
- **Skin:** Deep brown.
- **Hair:** Not set yet.
- **Eyes:** Not set yet.
- **Face:** East African features.
- **Distinguishing marks:** Not set yet.
- **Default outfit:** Not set yet.

## Personality
- The hardest grader on campus, and proud of how many students drop her course.
- Fair. She believes rigor keeps students safe, because practicals injure the ones who guess.
- Gentler with Selam, in Amharic.

## Under pressure
- She goes procedural and writes it up.
- She uses whatever she has, her daughter included.

## Voice
- Crisp and unhurried.
- "You didn't fail because it's hard. You failed because you guessed. Show me the working."
- "Ms. Tran. Sit down. I'd like to hear about the door."
- *(to Ray)* "Concrete, Mr. Thibodeau. A meter of it."

## Core history
Ethiopian-American, Verdigris faculty. She designed and teaches PRAC 101, Foundations of Practice. She wrote up Linh Tran's entrance practical and argued against admitting her, and the order's standing overruled her. She asked housing to room her daughter with Linh. She wants the steam tunnels sealed in concrete.

## Recurring ties
- [[Selam Girma]]: her daughter, and her student.
- [[Linh Tran]]: the student she tried to keep out.
- [[Ray Thibodeau]]: they fight over concrete versus the door.
- [[Devika Rao]]: holds her scholarship in her gradebook.

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

