---
type: character
aliases: [Other Beth, Space Beth]
cover:
world: "[[Smith House]]"
species: human
mind:
age: "37"
body_age:
status: draft
rating: sfw
based_on: "Rick and Morty (adult remix)"
tags: [character]
created: 2026-11-28
---
# Space Beth
> Thirty-seven, the Beth who left (or the copy who was sent away, and nobody's sure which, least of all her), a mercenary and rebel across a hundred worlds.

*Essentials only: what holds in every story. Story-specific ages, roles and drift go in profiles.*
*`age` and `body_age` only when they hold in every story; otherwise set them on each profile. `mind` is for nonhumans: how it thinks and communicates.*

## Signature features
- Beth's face made harder: short blonde hair with a shaved side, a scar through the left eyebrow and down the cheek, a weathered tan.
- Body armor and a sidearm she doesn't take off at the dinner table.
- A lazy grin, and the first punch in any fight.
- Core drive: freedom, and proof that the life she chose was the better one.

## Appearance
- **Build:** five-six, hard and muscled, broad through the shoulders for her height, the build of someone who carries her own gear.
- **Skin:** tanned and weathered; armor tan lines at the collar and upper arms.
- **Hair:** blonde, cropped short on top, the left side shaved to the skin.
- **Eyes:** green, crow's feet from squinting into other suns.
- **Face:** Beth's oval and cheekbones, but leaner, and with a wide crooked grin Beth doesn't have.
- **Distinguishing marks:** a scar through the left eyebrow and down the cheekbone; a knife scar along the right ribs; burn scars on the forearms.
- **Default outfit:** scuffed grey tactical vest over a black tank top, cargo pants, combat boots, fingerless gloves, a thigh holster, a dog tag on a chain.

## Personality
- Everything Beth suppresses, she does: fast decisions, no regrets on the surface.
- Enjoys violence and is very good at it.
- Contempt for the suburbs, and real jealousy of the house, the kids, the life she didn't have.
- Her rivalry with Beth is half sisterhood, half narcissism: she's arguing with herself and losing.
- Rick's best student, and she knows it. Wants his pride and won't ask for it.
- Doesn't know if she's the original. Doesn't let anyone ask.
- Charming, flirtatious, and loyal unto death to anyone who's fought beside her.

## Under pressure
- **Danger:** she thrives. Attacks first, laughs while doing it.
- **Cornered:** does something insane and grins about it.
- **Emotional pressure:** leaves, on her bike, through a portal, mid-sentence if she has to.
- **Asked if she's the clone:** violent or bitterly funny, depending on how much she's had.
- **Caught being soft:** mocks herself before anyone else gets the chance.

## Voice
- Lower and slower than Beth. Dry, few words, gallows humor, swears casually. Calls Beth "Homebody", the kids "kid", Jerry by his full name like an insult.
- **Lazy:** "Relax, Homebody. If I wanted your husband dead he'd have been dead at the appetizers."
- **Fighting:** "Down. Down, kid. — There. Now you can scream."
- **Jealous:** "Nice house. Nice kids. Nice little life. Must be restful."
- **To Rick:** "You'd have liked the job, Dad. Three moons, one bomb. I left the door open on the way out."
- **Rare honesty:** "I don't know which one of us he kept. Some days I hope it was her."

## Variants
- **Adult Family** (adult, 37): drops in between wars now the kids are grown. [[Space Beth - Adult Family]]

## Core history
- One of two Beths after Rick offered his daughter a way out: one stayed and one left. Neither is sure which is the copy.
- Has spent the years since fighting other people's wars across the galaxy.

## Recurring ties
- [[Beth Smith]] — her other self: rival, mirror, maybe sister.
- [[Rick Sanchez]] — father and teacher; the one person she wants to impress.
- [[Summer Smith]] — the kid who's most like her.
- [[Morty Smith]] — the kid she's most careful around.
- [[Jerry Smith]] — the life she escaped, wearing khakis.

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
