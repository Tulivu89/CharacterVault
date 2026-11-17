---
type: character
aliases: [Adeline, Addie, Baek Seo-yeon, Ice Heiress]
cover: "[[Adeline Baek - 01.webp]]"
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
# Adeline Baek
> The backup heir of an old Abyssal family, top of every section so nobody can say "legacy."

## Signature features
- White hair fading to silver-black at the tips, worn in one tight bun with swept bangs.
- Pale ice-blue monolid eyes, sharp black liner, nude gloss.
- Immaculate: regulation hem, gloves on, nothing out of place.
- The more dangerous she gets, the more polite she gets.

## Appearance
- **Build:** 5'9". Tall and slender, with long limbs, narrow shoulders and hips, a long neck and small breasts.
- **Skin:** Fair and flawless. No piercings, scars or tan, by choice: her body is armor she maintains.
- **Hair:** White fading to silver-black at the tips, in a single bun with swept bangs.
- **Eyes:** Pale ice blue, monolid, upturned at the corners, with black liner.
- **Face:** Oval, with a small pointed chin, a low-bridged nose, a small thin-lipped mouth and straight dark brows.
- **Distinguishing marks:** None. Drop earrings.
- **Default outfit:** The uniform, immaculate. Off duty: an ivory long wool coat with fur trim over a black turtleneck sweater dress, black tights and heeled boots.

## Personality
- A legacy admit who knows admissions knows it, and studies alone at 5 a.m. so nobody sees how hard she works.
- Color-codes everything and irons her uniform the night before. Never eats in the dining hall alone.
- Masks panic with lethal condescension.
- Bi, though she hasn't admitted it to herself. She says she isn't interested in anyone here.

## Under pressure
- She gets colder and more polite, until the condescension is a scalpel.
- Cornered in public, she goes still and quotes the rule.
- She breaks only in private, and then she cleans the room.

## Voice
- Complete sentences, no contractions when she's angry, and no swearing. She uses people's full names and asks questions as knives.
- "You used my shelf, Devika. I'm not upset. I'm telling you where your things will be in the morning."
- "Is that what you're wearing to Foundations? Bold."
- "Julian. Not here."

## Core history
Korean-diaspora old money, Abyssal for generations. Her brother Julian was the heir until he broke in a practical three years ago, and she spent those years becoming the replacement. Now he's back, in her dorm, and Grandmother has started asking him about his grades too. Her allowance is tied to her GPA and reported to Grandmother every quarter. At boarding school she and Saga Lindqvist were best friends until something they both did junior year. Her family arranged the silence.

## Recurring ties
- [[Julian Baek]]: her brother, the heir who came back.
- [[Devika Rao]]: her roommate, rival, and under her skin.
- [[Saga Lindqvist]]: her former best friend, cut off.
- Grandmother Baek: the matriarch who reads the grades.

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
- Keystone (personality only): Shiv Roy.
- Old gen: `images/Adeline Baek - 01.webp` predates the current image standard. It shows a smile and red lips; her canon look is a thin-lipped mouth with nude gloss.

