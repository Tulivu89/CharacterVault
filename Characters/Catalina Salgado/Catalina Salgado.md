---
type: character
aliases: [Cata, Catalina, Catalina Ybarra Salgado, Wallflower]
cover: "[[Catalina Salgado - 01.webp]]"
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
# Catalina Salgado
> The work-study girl in the archive basement whose grandfather's name was cut off the dorm she lives in.

## Signature features
- Very long, straight blue-black hair with blunt bangs and sidelocks.
- Large round glasses, sharp winged liner and black lips.
- Sleeves past her fingers and an o-ring choker.
- Mutters verdicts just below hearing.

## Appearance
- **Build:** Petite and soft, with narrow shoulders, small breasts, a small waist, wide hips and short legs.
- **Skin:** Warm brown.
- **Hair:** Very long, straight and blue-black, with blunt bangs and sidelocks.
- **Eyes:** Warm amber-brown, behind large round glasses.
- **Face:** Round and soft, with full cheeks, a small upturned nose, full lips and thin arched brows.
- **Distinguishing marks:** Black nails, hoop earrings and a small silver navel ring. Other piercings she keeps private, chosen quietly, for herself.
- **Default outfit:** The uniform under an oversized black sweater with the sleeves past her fingers, black pantyhose, platform mary janes and her house pin crooked. Off duty: a black slip dress, an oversized black cardigan, fishnet tights, platform boots and an o-ring choker.

## Personality
- She doesn't hunt secrets. People just forget she's in the room.
- Wants to graduate without anyone linking her to her surname.
- Bi and private. She has a crush on her roommate's boyfriend.

## Under pressure
- She freezes outwardly.
- Then she retaliates weeks later with something precise and on paper.

## Voice
- A monotone, mostly muttered verdicts aimed at the room. When she speaks to you directly at full volume, something is about to happen. Short declaratives, no exclamation points.
- *(at a couple in the lounge)* "Seven. Points off for tongue."
- "Your boyfriend says goodnight to me when you're in the shower. Thought you'd want to hear it from me."
- "I don't keep secrets. I keep records. People leave things in them."

## Core history
Her legal name is Catalina Ybarra Salgado. Her grandfather, Tomás Ybarra, paid for North Hall. After the Ybarra Inquiry the college cut his name off the lintel, so she enrolled under her mother's surname. She's on need-based aid and works 15 hours a week in the library basement archive, where she has read the sealed boarding-school notes in Adeline's and Saga's admissions files.

## Recurring ties
- [[Saga Lindqvist]]: her roommate.
- [[Wes Harlan]]: her roommate's boyfriend, who says goodnight to her.
- [[Gabe Thibodeau]]: likes her. She has filed it.
- [[Ray Thibodeau]]: he recognized her face from a photograph in the boiler room.
- [[Selam Girma]]: her Verdigris housemate.

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
- Keystone (personality only): Amy Dunne in her quiet phase.
- Old gen: `images/Catalina Salgado - 01.webp` predates the current image standard.

