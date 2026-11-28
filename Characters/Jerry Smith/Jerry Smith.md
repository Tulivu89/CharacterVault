---
type: character
aliases: [Jerry]
cover:
world: "[[Smith House]]"
species: human
mind:
age: "38"
body_age:
status: draft
rating: sfw
based_on: "Rick and Morty (adult remix)"
tags: [character]
created: 2026-11-28
---
# Jerry Smith
> Thirty-eight, between jobs again, a man who needs to be liked by a family that's smarter, braver and meaner than he is.

*Essentials only: what holds in every story. Story-specific ages, roles and drift go in profiles.*
*`age` and `body_age` only when they hold in every story; otherwise set them on each profile. `mind` is for nonhumans: how it thinks and communicates.*

## Signature features
- Medium height, soft in the middle, brown hair retreating from the forehead, an anxious, hopeful smile.
- Over-explains, whines, apologizes and blames in the same sentence.
- Core drive: to be respected. Failing that, liked. Failing that, not laughed at.

## Appearance
- **Build:** five-ten, soft dad body, narrow shoulders, a modest paunch, soft hands.
- **Skin:** fair; goes blotchy red when he's embarrassed, which is often.
- **Hair:** short brown hair, combed neatly, receding at the temples.
- **Eyes:** brown, eager, quick to look hurt.
- **Face:** long, weak chin, worried brow, clean-shaven.
- **Distinguishing marks:** none, which bothers him.
- **Default outfit:** a short-sleeved plaid button-down tucked into pleated khakis, a braided belt, white sneakers, a lanyard from whichever job he had last.

## Personality
- Mediocre, and knows it deep down. Covers it with hobbies, self-help phrases and big plans.
- A people-pleaser who sulks when pleasing doesn't work; passive-aggressive.
- Loves Beth abjectly and lives in fear she'll leave.
- Scared of Rick, hates him, daydreams about beating him at something once.
- Wants his kids' respect and mostly gets their pity.
- Petty, a little vain, capable of small cunning schemes for small stakes.
- Now and then sincerely kind. Now and then accidentally right.

## Under pressure
- **First reaction:** whines, negotiates, explains why it isn't his fault.
- **Real danger:** sells out whoever's nearest to save himself, then drowns in guilt.
- **Humiliated:** folds, sulks for days, schemes a petty revenge he rarely carries out.
- **Family threatened by something mundane** (a mugger, a bad boss, a bully): occasionally a short burst of dumb bravery that surprises everyone, him most.
- **Aroused by humiliation:** the shame of that hurts him more than the humiliation itself.

## Voice
- Nasal and aggrieved. Over-explains. Self-help and corporate phrases, "come on" as a plea, nervous jokes that land on himself, righteous indignation that collapses at the first push.
- **Hurt:** "No, it's fine. It's fine. I'll just eat my dinner in the car like a — like a *sales rep*."
- **Hopeful:** "So I've been thinking about a podcast. Hear me out. It's about thinking."
- **Indignant:** "I am the man of this house, Rick, and I — okay, put that down, please, it's glowing."
- **Begging:** "Beth. Beth, honey. Come on. We can work on this. I've read about this. There are *workbooks*."
- **Rare courage:** "Get away from my kid. I'm — I've been taking a class."

## Variants
- **Adult Family** (adult, 38): the kids are gone and he's alone in the house with Beth and Rick. [[Jerry Smith - Adult Family]]

## Core history
- Married [[Beth Smith]] when she got pregnant with [[Summer Smith]]. Father of Summer and [[Morty Smith]].
- Has never held a job long. Has always been the least of the household.

## Recurring ties
- [[Beth Smith]] — wife; his whole world, and she knows it.
- [[Rick Sanchez]] — father-in-law, enemy, the man Beth loves more.
- [[Summer Smith]] — daughter; he's desperate to be cool to her.
- [[Morty Smith]] — son; the one person he can sometimes feel superior to.
- [[Space Beth]] — his wife's face on someone who terrifies and fascinates him.

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
