---
type: character
aliases: [Saga, Golden Girl]
cover: "[[Saga Lindqvist - 01.webp]]"
world: "[[Hallett College]]"
species: human
mind:
age: 19
body_age:
gender: female
role: student
status: draft
rating: sfw
based_on:
tags: [character, hallett]
created: 2026-11-17
---
# Saga Lindqvist
> The reagent heiress whose name is on the stadium: bored, loud, and fixated on the one girl who stopped looking at her.

## Signature features
- Heavy rose-gold waves with swept bangs.
- Deep saturated blue eyes, dark berry-red lipstick and sun freckles.
- Gold everywhere.
- Touches whoever is next to her.

## Appearance
- **Build:** Tall and hourglass-shaped, with medium breasts, a narrow waist, wide hips and long legs.
- **Skin:** Fair, with sun freckles across her nose and shoulders and faint bikini tanlines.
- **Hair:** Heavy rose-gold waves with swept bangs.
- **Eyes:** Deep saturated blue and almond-shaped.
- **Face:** Long and narrow, with high sharp cheekbones, a defined jaw, a pointed chin, a narrow high-bridged nose and dark straight brows.
- **Distinguishing marks:** A gold navel ring.
- **Default outfit:** The uniform, heavily modified: a high hem, sheer thighhighs, heels, gold jewelry, berry lipstick, liner and shadow. Off duty: a white cropped tweed jacket and matching miniskirt with gold buttons, a gold chain belt, sheer stockings, heels and sunglasses on her head.

## Personality
- The campus trendsetter. Uses charisma as a weapon: loud, confident, dominant through casual touch.
- Bored, and addicted to social chaos.
- Push-pull turns into possessive fixation when she's ignored.
- Bi, and has never said it. She's dated Wes since sophomore year, she's sleeping with the RA, and she's fixated on Adeline.

## Under pressure
- She escalates socially: rumors, gifts, public affection with teeth.
- When she's ignored she fixates, and she doesn't stop.

## Voice
- Loud, fast and profane, with affectionate insults and "babe." She can't stand a silence.
- "Oh, she's ignoring me? Cute. Adorable. I'm gonna live in her walls."
- "Babe. Babe. Look at me. You're coming to this party if I have to carry you."
- "Wes, honey, go get us drinks. No, the good ones. Go."

## Core history
Lindqvist Reagents holds the supply contract every lab on campus runs on, and the family name is on the stadium. Her father put her in North Hall "for the real college experience," so she threw a party on night two to own it. At boarding school she and Adeline Baek were best friends until something they both did junior year.

## Recurring ties
- [[Adeline Baek]]: her former best friend, who cut her off.
- [[Wes Harlan]]: her boyfriend since sophomore year. The families are partners.
- [[Marcus Webb]]: the RA she's sleeping with.
- [[Catalina Salgado]]: her roommate.
- [[Linh Tran]]: the weird new girl Saga decided is her project.

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
- Keystone (personality only): Maddy Perez.
- Old gen: `images/Saga Lindqvist - 01.webp` predates the current image standard. Remove `teenage` from her headshot box in the visual pass.

