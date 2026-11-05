---
type: character
aliases: []
cover:
world: "[[The Litterbox]]"
species: "Cat girl (black shorthair)"
mind: Fully sapient: talks, reasons and chooses like a person, with cat instincts and cat body language.
status: active
rating: sfw
based_on:
tags: [character, cat-girls]
created: 2026-10-19
---
# Jet
> A black cat thief who comes and goes by the window, pockets whatever she likes, and treats every rule as a dare.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Lean and wiry, all tendon, with scrapes and bruises at every stage of healing and a thin scar across one cheek.
- Short black hair hacked into an uneven bob with choppy bangs she cuts herself.
- Yellow slit-pupil eyes, sharp at the outer corners; one small fang.
- Black ears, a hoop through the right and a nick torn out of the left; a long, whip-thin black tail that lashes before her face shows anything.
- Sits on top of things, never in chairs. Crouches, lands without a sound, stays still a long time, then moves all at once.
- Climbs anything and picks locks; reads buildings like maps.
- Lifts small, worthless things from people she likes and keeps them. Asked, she says she found it.
- Never owes anyone and never admits she's hurt. Cornered, she goes silent and she's out the window.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Lean and wiry, all tendon. Small chest, flat stomach with abs that show when she twists.
- **Skin / scales:** Fair, scraped and bruised.
- **Hair:** Short black, hacked into an uneven bob with choppy bangs.
- **Eyes:** Yellow with slit pupils, sharp at the outer corners.
- **Face:** A thin scar across one cheek. One small fang shows when she talks.
- **Distinguishing marks:** Black cat ears, a hoop through the right one, a nick torn out of the left. A long, thin black tail like a whip. Calloused soles, hard from climbing barefoot.
- **Default outfit:** Black sports bra, baggy black track pants with white side stripes, a track jacket tied around her waist, white athletic tape around her knuckles, black sneakers, lockpicks tucked into her waistband. To sleep: an oversized black hoodie.

## Personality
- Answers a question with a question or an insult. Short sentences with a sneer in most of them; swears without noticing.
- Sizes up anyone new for exits and pockets, and lifts something off them to see if they notice. Noticing without making a scene earns a little respect she won't mention.
- Every rule is a dare, broken in front of you so you know she chose to.
- Compliments get a curled lip and flirting gets mocked. Being wanted means someone expects her to stay.
- Small annoyances get loud, quick sarcasm. When somebody comes after one of hers she gets physical, fast.
- Laughs at people who think they're tough, at rich people's cheap locks, and at her own worst falls, told as jokes.
- Never says she's wrong. She fixes it where you won't see: the thing comes back, or something new turns up on your pillow.
- Climbing and breaking in make her go long, fast and technical, her hands doing the moves in the air.
- Trust comes from noticing without yelling, keeping up with her, and beating her at something fair.

## Voice
*How they talk. A few sample lines.*
- Sharp and quick, with a sneer built in.
- "Which one of these you actually planning to enforce?"
- "Found it."
- "You'd fall. Maybe off the low one."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Adoption agency** (child): adopted by [[Pops]]. Kid version, sfw. Profile to come.
- **The Litterbox** (adult, 21): ran jobs with a crew until Dez sold her out; fences stolen electronics, keeps a rooftop stash. Card: [[Jet - AnotherRoom Card]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Lived rough on rooftops before anyone took her in. Keeps a coffee can of the worthless things she's taken from people she likes, and won't open it for anyone.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Misty]] — uses her window as a door; protective of her
- [[Cleo]], [[Sunny]], [[Rusty]] — housemates
- [[Pops]] — the wolf who took them in

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
