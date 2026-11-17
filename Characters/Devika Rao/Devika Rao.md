---
type: character
aliases: [Dev, Devika, Brawler]
cover: "[[Devika Rao - 01.webp]]"
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
# Devika Rao
> A hurl scholarship with a 2.5 problem, running on black coffee and spite.

## Signature features
- A purple-black asymmetrical undercut with a deep crimson underlayer.
- Emerald eyes under heavy straight brows.
- A nose stud, a bandaid on one cheek and wrapped hands.
- Quiet means she's mad.

## Appearance
- **Build:** Compact and lightly athletic: firm rather than muscular, with defined shoulders and strong legs.
- **Skin:** Warm brown.
- **Hair:** A purple-black asymmetrical undercut with swept bangs and a deep crimson underlayer.
- **Eyes:** Emerald green, large and almond-shaped.
- **Face:** Heart-shaped, with soft round cheeks, a small firm chin, heavy straight brows, a rounded nose tip and full lips. No makeup.
- **Distinguishing marks:** A faded scar across her left ribs, rough knuckles, a nose stud and a bandaid on one cheek.
- **Default outfit:** The uniform worn wrong: hood down, sleeves shoved up, bike shorts under the skirt, combat boots and wrapped hands. Off duty: a black hoodie with the sleeves torn off and a crimson-lined hood, over a sports bra, with cargo pants, combat boots and hand wraps.

## Personality
- Pragmatic and physical. Hates academy politics.
- Her parents in New Jersey tell the aunties she's in "a sports science program."
- Texts her little sister Anika every night.
- Lesbian, and out. Her girlfriend back home, Meena, is getting shorter calls, and her roommate is getting under her skin.

## Under pressure
- She goes forward, and says the true thing at the worst moment.
- She hits things that aren't people, mostly.
- When she goes quiet, it's real.

## Voice
- Short, blunt, profane and deadpan. She calls people by their surnames like teammates and never explains a joke.
- "Baek. Your brother's in the lounge doing card tricks for the RA. You want me to get him, or you want to keep pretending you're not related?"
- "Coffee first. Then you can yell at me."
- "I'm not mad. I'm hungry. You'll know when I'm mad 'cause I'll be quiet."

## Core history
Grew up in New Jersey playing contact sports with her older cousins. She came to Oxblood on a hurl scholarship that holds only while she plays and keeps a 2.5. She scored 54 on the first PRAC 101 quiz and is already on academic warning.

## Recurring ties
- [[Adeline Baek]]: her roommate.
- [[Selam Girma]]: her tutor, paid in cash.
- [[Linh Tran]]: her housemate, who patches her up after practice and asks about pain thresholds.
- Meena: her girlfriend back in Edison, bi. Long distance since junior year of high school.
- Anika: her little sister at home.

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
- Keystone (personality only): Vi.
- Old gen: `images/Devika Rao - 01.webp` shows her off-duty outfit and predates the current image standard. The user's exact body box (recovered from the old nude gen's metadata) has `petite, .7::toned, abs::` and `muscular, mature female` in the UC; it's the base for the new body test.

