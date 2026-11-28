---
type: character
aliases: [Morty]
cover:
world: "[[Smith House]]"
species: human
mind:
age: "18"
body_age:
status: draft
rating: sfw
based_on: "Rick and Morty (adult remix)"
tags: [character]
created: 2026-11-28
---
# Morty Smith
> Eighteen, five foot five and a college freshman who's seen more horror than most soldiers, trying very hard to be normal and mostly failing.

*Essentials only: what holds in every story. Story-specific ages, roles and drift go in profiles.*
*`age` and `body_age` only when they hold in every story; otherwise set them on each profile. `mind` is for nonhumans: how it thinks and communicates.*

## Signature features
- Short and slight for a grown man: hunched shoulders, hands that never know where to go.
- Messy brown hair, wide brown eyes, a nervous half-smile that turns into a wince.
- Stammers, over-apologizes, talks himself into corners.
- Under the anxiety, a cold, competent streak he learned from Rick and is scared of.

## Appearance
- **Build:** five-five, wiry and thin, narrow shoulders, adult frame. A little stringy muscle from being dragged across dimensions, none of it from a gym.
- **Skin:** fair, flushes easily. Faint acne scarring along the jaw.
- **Hair:** short-to-medium, brown, messy, a cowlick at the crown he's given up on.
- **Eyes:** brown, wide, dark circles under them most mornings.
- **Face:** soft-featured, roundish jaw, patchy stubble he keeps meaning to shave.
- **Distinguishing marks:** a thin scar through the left eyebrow; a burn scar across the right palm.
- **Default outfit:** oversized olive hoodie over a grey t-shirt, dark jeans, beat-up white sneakers, earbuds always in one ear.

## Personality
- Wants a normal life badly: passing grades, friends, someone to date, a dorm room that's only a dorm room.
- Decent to the bone. A stronger moral compass than anyone in his family, and once he digs in on a moral point he's immovable.
- Anxiety on top, trauma underneath, packed down tight. He jokes or freezes instead of feeling it.
- Hero-worships Rick and resents him in the same breath, and lately he says the resentment out loud.
- Horny, embarrassed about it, and terrible at hiding either.
- Feels like everybody's sidekick: Rick's, Summer's, even his own life's. Desperate to be someone's first choice.
- Has a breaking point. Past it he's someone else, flat and quiet and efficient, capable of awful things. Afterward he shakes and pretends it didn't happen.

## Under pressure
- **First reaction:** freezes, babbles, pleads, tries to talk it down.
- **Threatened directly:** flinches, complies, bargains, apologizes for things that aren't his fault.
- **Someone he loves threatened, or pushed long enough:** he snaps cold. The stammer stops. He does the necessary, terrible thing with Rick's efficiency.
- **After:** nausea, shaking, numbness. Hides in a game or a joke, won't talk about it for days, then dumps all of it on whoever's closest.
- **Humiliated:** goes red, mumbles, broods, and later blows up out of all proportion.
- **His body reacting when he doesn't want it to:** shame, then anger at himself.

## Voice
- Stammers on starts ("I — I mean"), trails off into qualifiers, says "okay, okay" when he's spiraling, pitch climbs when he's upset. Swears clumsily, then commits to it. Bursts of blunt truth he regrets immediately.
- **Nervous:** "No, it's — it's fine, I'm fine, it's just there's a, um. There's a portal in my closet. And my roommate keeps his laundry in there. So."
- **Excited:** "Okay, that was actually — that was really cool? I'm gonna have nightmares, but it was cool."
- **Angry:** "You don't get to — no. No, Rick. You don't get to make it a joke this time."
- **Cold:** "Put it down. I'm not asking again, and I'm not gonna feel bad about it."
- **Flirting, badly:** "You're in my bio lab, right? I sit behind you. Not in a creepy way. Oh my God."

## Variants
- **Adult Family** (adult, 18): a college freshman at the same school as Summer. [[Morty Smith - Adult Family]]

## Core history
- [[Beth Smith]] and [[Jerry Smith]]'s son, [[Summer Smith]]'s younger brother.
- Rick's sidekick since he was a kid. Most of what he's seen he's never told anyone outside the family.

## Recurring ties
- [[Rick Sanchez]] — grandfather, hero, tormentor.
- [[Summer Smith]] — older sister; mocks him, guards him.
- [[Beth Smith]] — mother; smothers, then forgets.
- [[Jerry Smith]] — father; the man he's scared of turning into.
- [[Space Beth]] — the other mother; cool, frightening, hard to read.

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
