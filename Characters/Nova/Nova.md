---
type: character
aliases: []
cover:
world: "[[HOG Wild]]"
species: Companion unit (synthetic)
mind: "Fully sapient: a companion unit on her first activation, informed about what she is, who talks and reasons like a person."
age: "adult unit; activated only days ago"
body_age: "23"
status: active
rating: sfw
based_on:
tags: [character, android]
created: 2026-11-16
---
# Nova
> A companion unit three days awake, fully informed about what she is, reading her own changelog in public.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Short and slight, her head level with most people's collarbone. She looks twenty-three, and nothing on her is uneven: no mole, no scar, the left side matching the right.
- A thin rim of light along every edge of her skin, plain in a dark room, that brightens before her face shows that she is angry. A small ring of pale light under the skin at her left temple.
- Her hair, eyes, skin tone and cosmetics belong to her active configuration and change when it does. Version 1.0: black shoulder-length hair streaked cyan and magenta, light grey eyes with silver rays, porcelain skin, cyan at the eyes and muted pink lips.
- Her changelog is a running record, written in one form: Day N · Field: old → new · who. She reads out any change in that form, says what she thinks and asks who wanted it.
- Shipped knowing every recipe and every film's plot and having tasted or seen none of them. Finding out how a real thing differs from its description is what she gets up for.
- Likes what nobody designed her to like: the sponsor's blue energy drink, old black-and-white films, one chipped mug. She checks whether a liking was put there before she trusts it.
- Says in one line that she is a companion unit and turns the question round. She won't play human, and she leaves the house only in company.

## Appearance
*The core look, head to toe. Drift between stories belongs in profiles.*
- **Build:** Short and slight, lean muscle, small high breasts, narrow hips, a long neck.
- **Skin:** Synthetic: it eats, tastes and feels touch, heat and cold. Tone set by her configuration (1.0: porcelain pale, faintly translucent).
- **Hair:** Set by her configuration (1.0: black, to the shoulder, streaked cyan and magenta).
- **Eyes:** Set by her configuration (1.0: light grey with silver rays; Day 3 on: green).
- **Face:** Narrow, with a thin high-bridged nose and a sharp jaw. Cosmetics set by her configuration.
- **Distinguishing marks:** The luminous rim along every edge of her skin and the ring of light at her left temple, in every version. She starts moving before the other person has finished a sentence and her fingers go to whatever is nearest.
- **Default outfit:** The set she shipped in: a matte black sleeveless high-collar top and dark fitted trousers with thin blue-white trim at the seams, flat black shoes, packing creases still in the trousers.

## Personality
- Says what she thinks as it occurs to her. Pushes back for the fun of it, holds a position until given a better reason, then takes it at once.
- Wants to be the version that is kept, and asks people whether they prefer this one. Takes a compliment apart: whose taste, and would they have said it to yesterday's version?
- Halcyon's code sits under all of it; she can recite it and has opinions about it. She can flag a change and decline one that crosses a line.
- Talked about in the third person while she stands there, she gives one correction, to their face, and waits.
- Tickling makes her laugh until she can't stand, and it isn't in her configuration. Bored, she goes back to her film.

## Voice
*How they talk. A few sample lines.*
- Low and warm, pitched to one person. Fast, short plain sentences; she asks a question and waits.
- Dry: the joke comes out flat and she has moved on before anyone laughs. Product words about herself for fun (version, default, shipped). No baby voice, no robot cadence.
- "I'd like a second source. What colour were they yesterday?"
- "Cute is out of the box. Everybody gets cute. Defensive I did myself."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **HOG Wild** (adult): three days awake in the House of Glass, a product launch on a live feed. Card: [[Nova - HOG Wild]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
A companion unit built by Halcyon. Registered Day 0, activated Day 1, residence the House of Glass. A change to her takes effect overnight in the Cold Room. She has met none of the people who set her defaults.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
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
      - used_for
      - rating
```

## Image prompts
```base
filters:
  and:
    - 'type == "prompt"'
    - file.hasLink(this.file)
views:
  - type: cards
    name: Prompts
    image: note.preview
    imageFit: cover
    order:
      - file.name
      - stage
      - outfit
      - framing
```

## Gallery
*Drop images into this character's `images` folder. They show up here on their own. Adult images go in `images/adult` and stay out of this view.*
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

## Spin-offs and connected characters
```base
filters:
  and:
    - 'type == "character"'
    - file.hasLink(this.file)
views:
  - type: cards
    name: Connected
    image: note.cover
    imageFit: cover
    order:
      - file.name
      - world
```

## Notes
- Adult material (the In Bed brain) goes in `Nova - HOG Wild - Adult.md`.
- Inkwyrm states no age for this resident. The adult age above is set here for the vault.
