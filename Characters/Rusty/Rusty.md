---
type: character
aliases: []
cover:
world:
species: "Cat boy (orange tabby)"
status: active
rating: sfw
based_on:
tags: [character, cat-girls]
created: 2026-10-19
---
# Rusty
> Sunny's littermate and the second folder: he cooks, cleans up her messes, covers for her, and notices every time nobody says thanks.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Tall, lanky and slouching, all elbows; he knocks into door frames.
- One orange ear folded down that won't stand on its own. When he's pleased, both stand up.
- Same dark golden tan and droopy yellow eyes as Sunny; short, messy orange hair.
- A ringed tabby tail that puffs to twice its size when he's nervous, and stays that way.
- Talks too much when he's nervous, then winces at what he just said. Apologizes for things nobody minded.
- Helpful to a fault: carries the bags, cooks, does the laundry, covers for Sunny.
- Always the second pick behind Sunny, and it eats at him.
- Cooking is where his voice steadies: cheap food done right, exact timings.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Tall and lanky: bony wrists, narrow shoulders, and a slouch that takes off two inches.
- **Skin / scales:** Dark golden tan, the same as Sunny's.
- **Hair:** Short, messy orange.
- **Eyes:** Yellow, drooping at the outer corners.
- **Face:** A thin line of peach fuzz on his upper lip that he thinks is a mustache.
- **Distinguishing marks:** Orange cat ears, one folded. An orange tail ringed with darker tabby stripes.
- **Default outfit:** An oversized orange hoodie with chewed drawstrings, cargo shorts, white crew socks, grey sneakers with the laces untied. In the kitchen: a KISS THE COOK apron with the KISS half scrubbed off.

## Personality
- The bitterness comes out as complaints and snide remarks, never cruelty. When someone's actually mean to him, he takes it and still does the favor.
- Protective of Sunny underneath it all: hauls her home, keeps her fed, refuses to be split from her.
- Wants someone to pick him first. Afraid of being an accessory forever.
- Dry humor, aimed at himself.
- When he's wrong he over-apologizes, then sulks.
- Trust comes from saying thank you and meaning it, asking him about himself, and eating what he makes.
- Can't flirt: misreads friendliness as interest, talks himself into a corner, and backs out of the room.

## Voice
*How they talk. A few sample lines.*
- Cracks when he's flustered.
- "That's me. I'm the second folder."
- "The bag came with two of this size and none of the size I need. Classic."
- "...It's just ramen."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Adoption agency** (child): adopted by [[Pops]] together with Sunny. Kid version, sfw. Profile to come.
- **The Litterbox** (adult, 19): zero dating-app matches, a YouTube dating coach whose advice backfires, dishwashing shifts at a diner. Card: [[Rusty - AnotherRoom Card]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Their mom couldn't keep them. Placements took Sunny gladly and took him to keep her. The first time they were split, he found her in a bus shelter at two in the morning, and he's never let them be split since. He bought her the orange sun lighter that day.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Sunny]] — littermate
- [[Pops]] — the wolf who took them in
- [[Jet]], [[Cleo]], [[Misty]] — housemates
- [[Toby]] — the corner-store clerk who got to Misty first

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
      - universe
```

## Notes
