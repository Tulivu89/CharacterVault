---
type: character
aliases: [Linh, Clinical Pixie]
cover: "[[Linh Tran - 01.webp]]"
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
# Linh Tran
> A polite girl from a closed hermetic order who treats college as fieldwork and everyone in it as a subject.

## Signature features
- A bright aqua French braid running into a braided ponytail.
- Vivid violet eyes, large and upturned.
- Pink lips, white gloves and perfect posture.
- Remembers your birthday and your mother's name.

## Appearance
- **Build:** A lean dancer's frame: small breasts, a flat stomach, narrow hips, long legs, defined thighs, a long neck and visible collarbones.
- **Skin:** Dark olive, with no marks, mods or tan, by discipline: her body is an instrument.
- **Hair:** Bright aqua, in a French braid running into a braided ponytail.
- **Eyes:** Vivid violet, large, upturned and almond-shaped.
- **Face:** Heart-shaped, with wide cheekbones tapering to a small pointed chin, a soft rounded nose, full lips and thick, sharply arched brows.
- **Distinguishing marks:** None.
- **Default outfit:** The uniform worn exactly to regulation, with white gloves, white thighhighs and ballet flats. Off duty: a black leotard, a black skirt, white leg warmers, ballet flats and white gloves.

## Personality
- Warm, polite and endlessly curious. She diagnoses rather than insults.
- Everyone interests her, and nobody is her equal.
- Has never seen a movie. Does barre in the common room at 6 a.m. and keeps notes on the floor in a ledger.
- No label: "I haven't collected enough data." Intimacy is an experiment, and her subjects are her roommate and Julian.

## Under pressure
- She gets gentler and more curious, and never raises her voice.
- The scariest thing about her is how reasonable she sounds.

## Voice
- Gentle and precise, with lots of questions. She says please and thank you, uses your name and uses clinical words casually.
- "Selam, may I take your pulse? It jumped when your mother came up. I'm only curious."
- "Happy birthday, Dev. I made a card. I didn't know what you'd like, so I wrote down everything I've noticed about you."
- "Julian, what did it sound like? Take your time. I'm writing it down."

## Core history
Raised in a closed hermetic order that practices threshold magic: doors and the dead. She was homeschooled, had no phone until August and has no money of her own. The order pays her tuition. At her entrance practical she opened a door that wasn't there and closed it again. Dr. Bekele wrote it up and argued against admitting her, and the order's standing overruled her. The order sent Linh with a task she has told no one about, and she has been in the steam tunnels every night since week one.

## Recurring ties
- [[Selam Girma]]: her roommate, and her subject.
- [[Julian Baek]]: her other subject, the one who has heard it.
- [[Devika Rao]]: her housemate, who calls her creepy to her face.
- [[Almaz Bekele]]: the professor who tried to keep her out.

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
- Keystone (personality only): Makima.
- Old gen: `images/Linh Tran - 01.webp` predates the current image standard. Its lace sleeves render like tattoo sleeves, which breaks her no-marks rule.

