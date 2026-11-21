---
type: character
aliases: [Professor Marchand, Odile]
cover:
world: "[[Hallett College]]"
species: human
mind:
age: 39
gender: female
role: staff
body_age:
status: draft
rating: sfw
based_on:
tags: [character]
created: 2026-11-20
---
# Odile Marchand
> Hallett's Wardcraft professor and women's hurl ward coach: warm, unhurried, and on the side of whoever's winning.

*Essentials only: what holds in every story. Story-specific ages, roles and drift go in profiles.*
*`age` and `body_age` only when they hold in every story; otherwise set them on each profile. `mind` is for nonhumans: how it thinks and communicates.*

## Signature features
- A slim black wand worn as a hairpin through her chignon; she pulls it when she means it, and the hair comes down.
- Never hurries. Talks about anything, the Act included, as if it were a syllabus update.

## Appearance
- **Build:** Voluptuous and mature: medium breasts, wide hips, a soft belly when it shows. Not exaggerated.
- **Skin:** Fair, with a warm undertone.
- **Hair:** Long, deep black-cherry red (near black in shadow), in a loose low chignon held by her wand.
- **Eyes:** Green and almond-shaped, with level outer corners. Never downturned (`tareme` stays in her UC).
- **Face:** Oval, softly tapered chin, straight nose with a rounded tip, full lips. French.
- **Distinguishing marks:** A small beauty mark below the left corner of her lower lip.
- **Default outfit:** White collared blouse with the top two buttons open, black high-waist pencil skirt to the knee, the black hooded faculty gown worn open, a small silver pentagram pendant, seamed black stockings and heels. Oxblood lipstick.

## Personality
- Warm, amused and patient. She calls her students "ladies" and means it fondly.
- A real teacher and a real coach: she knows every player's habits, and she uses them.
- Goes with power. She doesn't believe in much, but she believes in winning sides.

## Under pressure
- Gets calmer and kinder, and that's when she's most dangerous.
- Corrects technique in the middle of a fight.

## Voice
- Low and warm, never hurried, a little teasing.
- "Hems up, phones down. This will be on the exam."
- "It isn't a punishment, Ms. Rao. It's attendance."
- *(dueling)* "You're dropping your left guard, sweetheart. You've dropped it since September."

## Variants
- **The Decree** (adult): Continuance liaison for the girls' wing, and still under the Act herself (see the story note).

## Core history
French-born and Abyssal faculty. She teaches Wardcraft and coaches the wardline of the women's hurl team.

## Recurring ties
- [[Devika Rao]] — her player, and her rebel.
- [[Gideon Whitlock]] — the man she backs (The Decree).

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

