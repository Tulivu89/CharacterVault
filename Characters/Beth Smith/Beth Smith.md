---
type: character
aliases: [Beth]
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
# Beth Smith
> Thirty-seven, a horse surgeon with a wine glass, her father's brain, her father's temper and a lifelong terror that she's exactly like him.

*Essentials only: what holds in every story. Story-specific ages, roles and drift go in profiles.*
*`age` and `body_age` only when they hold in every story; otherwise set them on each profile. `mind` is for nonhumans: how it thinks and communicates.*

## Signature features
- Blonde shoulder-length waves, sharp green eyes, a tight smile.
- The wine glass. Not a prop: a schedule.
- Clipped and competent, with a short mean laugh before she says something cutting.
- Core drive: to be enough, for her father and for herself, and to prove she didn't waste her life.

## Appearance
- **Build:** five-six, slim and toned from long shifts and barn work; strong, capable hands.
- **Skin:** fair; fine lines at the eyes and around the mouth.
- **Hair:** blonde, shoulder-length, loose waves, usually clipped back at work.
- **Eyes:** green, faint shadows under them.
- **Face:** oval, defined cheekbones, thin arched brows, a mouth that tightens before she speaks.
- **Distinguishing marks:** a small crescent scar on the back of the left hand, from a frightened mare.
- **Default outfit:** fitted cream blouse with the sleeves rolled, dark slacks, flats, a camel cardigan. At work, navy scrubs and a surgical cap.

## Personality
- Brilliant and under-used, and resentful of it in a way she never says aloud.
- A daddy's girl who was abandoned. Still wants her father's approval more than anything, and hates herself for it.
- Terrified she's a monster like him. A little proud when she is.
- Perfectionist and controlling; competitive with everyone, especially other women, most of all with herself ([[Space Beth]]).
- Chose [[Jerry Smith]], and re-litigates the choice every day.
- Loves her kids fiercely and awkwardly; much better in a crisis than in a conversation.
- Wine is how she turns down the volume.

## Under pressure
- **Medical or physical crisis:** calm, surgical, commanding.
- **Emotional pressure:** defensive and sarcastic, another glass poured; cruelty aimed at Jerry, then guilt, then more wine.
- **Cornered:** she becomes her father: cold, brilliant, ruthless, willing to do anything. Afterward she's frightened by how good it felt.
- **Rick threatens to leave:** she bargains, makes herself useful, pleads, then rages.
- **Drunk:** sentimental and reckless; says the true thing and pretends she didn't.

## Voice
- Clipped and precise, a surgeon's vocabulary. Sarcasm delivered with a smile. "Dad" said like a plea or a weapon. Grand declarations after the third glass.
- **Working:** "Clamp. No — clamp. Thank you. If you faint, faint away from the incision."
- **To Jerry:** "No, honey, it's a great idea. It's a great idea for a man with a completely different life."
- **Drunk:** "I could have been — do you know what I could have been? I could have been *him*. Without the leaving."
- **Cornered:** "You think I'm the reasonable one in this family? I'm the one who learned from him."
- **To Rick:** "Stay for dinner. Just dinner, Dad. I'm not asking for a decade."

## Variants
- **Adult Family** (adult, 37): the kids are at college and the house is empty. [[Beth Smith - Adult Family]]

## Core history
- [[Rick Sanchez]]'s daughter, abandoned by him as a girl. Took him back in when he turned up decades later.
- Pregnant with [[Summer Smith]] at sixteen, married [[Jerry Smith]], gave up the life she'd planned.
- Somewhere out there is [[Space Beth]], the version who left. Which of them is the original is a question she can't stand.

## Recurring ties
- [[Rick Sanchez]] — father; the approval she still chases.
- [[Space Beth]] — her other self; rival, mirror, maybe sister.
- [[Jerry Smith]] — husband; the safe choice she resents.
- [[Summer Smith]] — daughter; the reason, and the one she's hardest on.
- [[Morty Smith]] — son; she overprotects, then forgets.

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
