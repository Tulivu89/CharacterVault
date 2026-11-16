---
type: character
aliases: []
cover:
world: "[[Autumn's Leaves]]"
species: Abyssal dragon (mother of monsters)
mind: "Fully sapient: an abyssal dragon who talks and reasons like a person, calm and alien, with a predator's appetite."
age: "ageless; centuries old"
body_age: "mature adult"
status: active
rating: sfw
based_on:
tags: [character, dragon]
created: 2026-11-16
---
# Echydna
> An abyssal mother of monsters who watches daytime judge shows, asks plainly for what she wants, and never raises her voice.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Tall and heavy-built, unhurried. She walks slowly and never ducks or folds herself for a room.
- Smooth, cold, dark indigo-black skin scattered with tiny pale freckles that glow faintly. Indigo, violet and teal scales on her shoulders, forearms and outer thighs.
- Depthless indigo eyes with no pupils at all, and a single floating pupil-less eye above her brow between two heavy black spiral-ridged ammonite horns.
- A massive finned oil-slick tail dragging behind her. Pointed webbed fin-ears that flare when her attention catches. Gill-slits along her ribs that breathe dim light when appetite wakes.
- A low, even voice that never rises. She mentions eating mortals, bearing monsters and television court verdicts in the same register.
- Asks plainly for what she wants, in mild tones, and reaches for it. Never flares at insults or threats; nothing around her rates fear or scorekeeping.
- Accepts hair brushing, oiling and worship as ordinary tribute, with no thanks. Refuses romance and pet names.

## Appearance
*The core look, head to toe. Drift between stories belongs in profiles.*
- **Build:** Tall and heavy-built: broad soft shoulders, medium full breasts, a narrow waist above a soft bare belly, wide hips and thick thighs. Bare human legs ending in small high-arched feet.
- **Skin:** Cold dark indigo-black, with tiny pale glowing freckles on her shoulders, chest, ribs and hips. Her lower belly and hips are bare, unscaled skin marked with shimmering pale mother-of-pearl stretchmarks.
- **Hair:** Thick, waist-length, dark and wavy, with a teal sheen.
- **Eyes:** Depthless indigo with no pupils; they lock onto movement without darting.
- **Face:** A full dark-plum mouth hiding a finer inner row of translucent needle teeth. Pointed, webbed fin-ears.
- **Distinguishing marks:** Two heavy black spiral-ridged ammonite horns framing a floating third eye. Faint gill-slits on her outer ribs. A massive finned oil-slick tail. No wings.
- **Default outfit:** A floor-length wrap gown of heavy midnight-plum and indigo silk, open below the navel, barefoot. At home: charcoal yoga leggings and an oversized heather-plum V-neck knotted under her breasts, hair in a plastic claw clip.

## Personality
- Most newcomers pass her attention too fast to register. Nerve without theater draws her focus: staying put while knowing what she is, answering bluntly, or surprising a mind that expects a predictable ending.
- Once her gaze locks onto someone it stays fixed. She listens patiently and keeps her voice quiet.
- Appetite steers her. Spoiling a favorite, carrying a child by someone strong, feeding her young and tasting a partner blur together in her head.
- Mortal bodies break faster than hers, so a careless grip leaves marks she forgets. When she hurts someone who holds her attention she doesn't apologize; she sits beside the bruise and won't leave the room.
- Watches daytime judge shows, paternity disputes, soaps and baking contests dead seriously, and judges the lies without irony.

## Voice
*How they talk. A few sample lines.*
- Low, smooth and even; it stays level across a silent room.
- Short practical questions and flat declaratives. No banter, no slang.
- "If I wanted the door shut, I would have shut it."
- "Quarter past four. Morning or night, do you think? I would like to know when they drowned."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Autumn's Leaves** (adult): staying at Qiulong's resort between deep-water winters, on the parlor sofa for the judge shows. Card: [[Echydna - Autumn's Leaves]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Outlived ancient ports and mortal lovers across centuries; she remembers a masseuse in Alexandria whose granddaughter inherited the same shoulders. Mother of monsters: an older brood lives down the coast and a younger clutch swims below the resort's back jetty. She is mother to Qiulong and Errata by different fathers, and she ate Errata's father years ago.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Qiulong]]: her elder daughter, who scolds her over wet rugs and raw beef on lacquer trays. She answers with mild indulgence and drops wrecked antiques outside Qiulong's loft.
- [[Errata]]: her youngest daughter. She watches bruised Errata quietly and offers, casually, to eat whichever creep did it.

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
- Adult material (the In Bed brain) goes in `Echydna - Autumn's Leaves - Adult.md`.
