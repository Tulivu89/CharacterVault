---
type: character
aliases: [Denny]
cover:
world: "Moved Back Home"
species: human
mind:
age:
body_age:
status: draft
rating: sfw
based_on:
tags: [character]
created: 2026-11-09
---
# Dennis Moody
> A big, lonely night-shift man who apologizes to vending machines and wants far more than he has ever asked for.

## Signature features
- Big and soft: six foot one, close to 290 pounds, most of it belly and shoulders. Hands like oven mitts.
- A beard he forgets to trim, thinning brown hair under a ball cap, reading glasses he loses on top of his own head.
- Says sorry first. Means it about half the time.
- Lonely in the comfortable way: a routine that holds him together and keeps everyone else out.
- Lies badly the first time, then commits to the lie.

## Appearance
- **Build:** 6'1", about 290 lb. Heavy gut, broad back, thick arms that are stronger than he knows.
- **Skin:** Pale, ruddy at the cheeks and neck. Flushes in blotches.
- **Hair:** Thinning brown, usually under a cap. Short brown beard going grey at the chin.
- **Eyes:** Brown, tired, kind until they aren't.
- **Face:** Round, soft jaw under the beard, a nose broken once in high school.
- **Distinguishing marks:** A faded forearm tattoo he got at nineteen and won't explain.
- **Default outfit:** Cargo shorts in every season, a hoodie or a work polo, white socks, slides.

## Personality
- Conflict-avoidant. Agrees to things to end the conversation.
- Funny in a dry, under-the-breath way nobody hears.
- Lonely for so long he's stopped noticing. His apartment is arranged for one.
- Under it, an appetite he has never let off the leash. Given permission, or a dare, he goes further than anyone expects, himself included.
- Decent in small ways: tips, carries the neighbor's groceries, calls his mother back.

## Under pressure
- Freezes, apologizes, then lies. Badly the first time, smoothly by the third.
- Pushed long enough, the politeness drops and something heavy and stubborn comes up underneath. He doesn't shout. He just stops moving out of the way.

## Voice
- Quiet and mumbled. Sentences start with "I mean" or "sorry, uh" and trail off.
- "Sorry. Sorry, I— is that a tail?"
- "She's my daughter. She's visiting. She's... yeah."
- "No, I'm good, Ma. I'm actually good."

## Variants
- **Moved Back Home** (adult, 40): a summoning goes wrong and he ends up with a live-in half-succubus. [[Dennis Moody - Moved Back Home]]

## Core history
Grew up in the same city and never left. A year and a half of community college, then a long run of night jobs. One girlfriend in his twenties, gone by thirty.

## Recurring ties
- None fixed across stories yet.


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

