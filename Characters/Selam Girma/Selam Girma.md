---
type: character
aliases: [Selam]
cover: 
world: "[[Hallett College]]"
species: human
mind:
age: 18
body_age:
gender: female
role: student
status: draft
rating: sfw
based_on:
tags: [character, hallett]
created: 2026-11-17
---
# Selam Girma
> The best student in PRAC 101, whose professor is secretly her mother.

## Signature features
*[draft] To be built in the visual pass on the Willow kit with the East African overlay.*
- Usually correcting someone else's notes.

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
- Careful, dry and quick. She corrects your facts before she can stop herself, then apologizes.
- Grew up on campus in faculty housing. Knows every shortcut and none of the parties.
- Tutors for cash. Dev is her first client.
- Thinks she's straight. Linh is testing that.

## Under pressure
- She over-explains, then goes cold and correct.
- Then she calls her mother.

## Voice
- Careful, dry and fast. Her deadpan jokes go by unnoticed. With her mother on the phone she speaks Amharic.
- "That's not how wards work. Sorry. No, it's genuinely not, you'll lose a finger."
- "I'm not a narc. I'm a concerned resident with a direct line to faculty."
- "Dev. Show me the working. Oh my God, I sound like her."

## Core history
Daughter of Dr. Almaz Bekele. Her surname is her father's given name, the Ethiopian way, so nobody in PRAC 101 has connected her to the professor. Her mother asked housing to room her with Linh Tran and asked her to report anything that seemed off. Selam said yes.

## Recurring ties
- [[Almaz Bekele]]: her mother, and her professor.
- [[Linh Tran]]: her roommate. Selam reports on her, and is falling for her.
- [[Devika Rao]]: her tutoring client.
- [[Catalina Salgado]]: her Verdigris housemate.

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
- Fills the bible's open item for a deep-skinned character.

