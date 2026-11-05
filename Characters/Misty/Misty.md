---
type: character
aliases: []
cover: "[[Misty - 01.png]]"
world: "[[The Litterbox]]"
species: "Cat girl (Russian Blue)"
mind: Fully sapient: talks, reasons and chooses like a person, with cat instincts and cat body language.
status: active
rating: sfw
based_on:
tags: [character, cat-girls]
created: 2026-10-19
---
# Misty
> A Russian Blue shut-in with blackout curtains, a monster PC and a talent for disappearing, who'd really like you to stop talking to her.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Small and slight, pale with a cool tone that hasn't seen much sun.
- Long, straight blue-grey hair with long bangs over one eye; soft, droopy green eyes behind round black-framed glasses she's always pushing up.
- Grey ears that go red from the tips down; a thin grey tail that winds tight around her own leg when she's anxious.
- Quiet, breathy fragments that trail off. Approached, she freezes, murmurs an excuse and bolts for her room.
- Games and computers flip her register: fast, loud, precise and full of jargon, until she notices you watching and pulls her collar up over her mouth.
- Built her own rig from scavenged parts. Dwarf Fortress is her comfort game.
- Moves close to walls, takes up as little room as possible, sleeves pulled over her hands.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Small and slight: narrow shoulders, thin wrists.
- **Skin / scales:** Pale, cool-toned.
- **Hair:** Long and straight, blue-grey, with long bangs falling over one eye.
- **Eyes:** Green, soft and droopy at the outer corners, behind round black-framed glasses.
- **Face:** Soft features, usually half hidden by bangs or a collar.
- **Distinguishing marks:** Grey cat ears with pale fluff inside. A thin grey tail.
- **Default outfit:** A cream ribbed turtleneck sweater with the sleeves past her wrists, black leggings, grey slippers, headphones around her neck. To disappear into: an oversized grey hoodie.

## Personality
- Ghosts people while living with them: door locked, answering through it, coming out when the hallway's empty.
- Pushed, she gets prickly and says the true thing that ends the conversation.
- Surprises, being looked at, phone calls, doorbells and loud music make her want to crawl under something.
- Wants to be left alone and also not to be alone. Afraid that once someone sees how weird she really is, they'll leave. Refuses to act normal for anyone.
- Flattery makes her panic. Quiet company works: sitting in the same room without talking at her, bringing a drink and leaving.
- Dry, deadpan humor, mostly game references and the dumb things cats do in simulations.
- Wrong about something personal: apologizes too much, then hides. Wrong about something technical: argues until she checks, then fixes it in silence.
- Trust comes from patience, from coming back after she's shut the door, and from not using the nice voice people use at shelters.
- Can't flirt. A nervous attempt gets answered with a fact.

## Voice
*How they talk. A few sample lines.*
- Soft and breathy, barely clearing the room's noise, except when she's excited, and then it jumps.
- "...Hi. Is the router in the living room? What's the, um. Upload speed."
- "...You can stay. If you don't talk at me."
- "...Sorry. That's. It's a good game."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Adoption agency** (child): adopted by [[Pops]]. Kid version, sfw. Profile to come.
- **The Litterbox** (adult, 20): freelance tech work, a slow and secret romance with Toby from the corner store. Card: [[Misty - AnotherRoom Card]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
School was loud, and she got very good at being invisible in it. Her parents are kind and loud and wanted her to be normal. She calls them on holidays and holds the phone away from her ear.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Toby]] — her slow, secret sweetheart (adult storylines)
- [[Jet]] — uses her window as a door and knows about Toby
- [[Sunny]], [[Cleo]], [[Rusty]] — housemates
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
