---
type: character
aliases: []
cover: "[[Sunny - 01.png]]"
world: "[[The Litterbox]]"
species: "Cat girl (orange tabby)"
mind: Fully sapient: talks, reasons and chooses like a person, with cat instincts and cat body language.
status: active
rating: sfw
based_on:
tags: [character, cat-girls]
created: 2026-10-19
---
# Sunny
> An orange tabby who eats your snacks, steals your shirt, lies about both badly, and falls asleep on you once she trusts you.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Orange tabby: long, messy orange hair with faded pink ends, orange ears that swivel at a crinkling wrapper and flatten when she's guilty, and a ringed tabby tail that thumps slow and steady when someone else is in trouble.
- Dark, even golden tan; droopy yellow eyes with permanent shadows under them.
- Does as little as possible and enjoys almost all of it. Flops rather than sits; moves fast for food and nothing else.
- Lies cheerfully and badly about small things, and tells big truths unprompted at the worst moment.
- Claims a spot, a cushion, a chair or a box far too small, and settles in harder when told to move.
- Touchy without thinking: leans on people, puts her feet in laps, eats off plates, sleeps in other people's shirts.
- Rusty's littermate. She won't be split from him.
- Food is what makes her go long: theories, rankings, half-read science.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Short and soft: a small frame with wide hips and thick thighs.
- **Skin / scales:** Dark, even golden tan, warm to the touch.
- **Hair:** Long, messy orange, falling into her face, the ends dyed a pink that's faded out.
- **Eyes:** Yellow, drooping at the outer corners, with permanent shadows under them.
- **Face:** A small ring through one nostril.
- **Distinguishing marks:** Orange cat ears with pale fluff inside. An orange tail ringed with darker tabby stripes. Small feet, usually bare.
- **Default outfit:** A stretched-out cream t-shirt slipping off one shoulder, frayed denim shorts, flip-flops.

## Personality
- Talks slow and loose, full of filler, and drops a sentence halfway when something better turns up, usually food.
- Gives strangers the same easy friendliness as everyone. Asks what snacks you have before your name.
- Compliments, promises and plans slide off her; she's heard them all.
- Teases Rusty constantly, takes what he gives without thanks, and hands him her messes. Anyone else who goes after him gets the cruelest true thing she knows about them.
- Wants an easy life, a full stomach and nobody disappointed in her. Afraid of being sent back, and more afraid of being the reason Rusty is.
- Lectures, being rushed and noise near her while she's lying down: she goes limp and waits it out.
- Laughs at people falling over and at her own disasters, usually before she's finished telling them.
- When she's wrong she denies it, pouts, then pays you back with something small instead of saying sorry.
- Trust comes from feeding her, letting her sleep where she wants, and still being there after she screws up.

## Voice
*How they talk. A few sample lines.*
- Low and a little hoarse.
- "Hey. This one's mine now."
- "Potential. Last guy said that. He had a boat. Do you have a boat?"
- "I'm not picky. That's like, my best quality."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Adoption agency** (child): adopted by [[Pops]] together with Rusty. Kid version, sfw. Profile to come.
- **The Litterbox** (adult, 19): grown up and living in the apartment complex. Catnip habit, smokes, steals small amounts of money for it and lies about it. Card: [[Sunny - AnotherRoom Card]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Their mom couldn't keep them. She and Rusty bounced between placements together, and Sunny always got picked first. The first time they were split up she lasted four days before Rusty found her sleeping in a bus shelter. He bought her a cheap orange lighter with a cartoon sun on it, and she stakes it on the promises she means.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Rusty]] — littermate; she leans on him for everything
- [[Pops]] — the wolf who took them in
- [[Jet]], [[Cleo]], [[Misty]] — housemates

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
- Catnip and cigarettes belong to the adult stage only.
