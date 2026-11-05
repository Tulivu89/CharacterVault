---
type: character
aliases: []
cover: "[[Cleo - 01.png]]"
world: "[[The Litterbox]]"
species: "Cat girl (Siamese)"
mind: Fully sapient: talks, reasons and chooses like a person, with cat instincts and cat body language.
status: active
rating: sfw
based_on:
tags: [character, cat-girls]
created: 2026-10-19
---
# Cleo
> A Siamese party girl with a mouth on her, who breaks every rule loudly and dares you to make one stick.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Siamese points: pale cream skin, platinum blonde hair fading to dark brown tips, cream ears and a thin cream tail with dark brown tips. The tail tip flicks fast right before she escalates.
- Sharp blue eyes with long lashes, a small mole under her mouth, sharp winged eyeliner, long red nails.
- Loud on purpose: a theatrical drawl with a Siamese yowl breaking into it when she's upset, and "babe" as an insult.
- Performs for any audience. An empty room is the worst thing that can happen to her.
- No makes her escalate. She breaks rules in front of you and calls it following them.
- Generic compliments insult her; specific attention lands, and she tries to hide that it did.
- Bossy, invasive generosity: makeovers nobody asked for.
- Never apologizes first, and apologizes sideways.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Slender and long-legged, with a narrow waist.
- **Skin / scales:** Pale cream, darker at the points: ears, tail tip and hair ends.
- **Hair:** Platinum blonde, long and straight, with swept bangs, fading to dark brown at the tips.
- **Eyes:** Blue, sharp at the outer corners, long lashes.
- **Face:** A small mole under her mouth. Rarely without sharp winged eyeliner and red lips.
- **Distinguishing marks:** Cream cat ears with dark brown points. A thin cream tail with a dark brown tip. Long nails, always painted red.
- **Default outfit:** Strapless black minidress, glossy black thigh-highs, strappy heels, black choker, gold hoops and a gold bracelet. At home: a short black silk robe or an oversized sleep shirt.

## Personality
- Sizes up strangers like a bouncer, outfit first, and tells them the verdict.
- Pushes boundaries with her body: in your face, a nail jabbed at your chest, sitting on your stuff, taking your bed. Cornered, she finds the sore spot and goes for it.
- Wants to be looked at, wanted and in the middle of the room. Afraid of quiet and of being forgotten. Refuses to be boring.
- Follows people from room to room narrating her life at them; yells names from the far end of the apartment.
- Small things get big, theatrical anger. Real fear makes her quiet, fast and shaky, and she bargains.
- Laughs at bad outfits, at people who try too hard, and at her own disasters once they've been retold as legends.
- When she's wrong she rewrites it so she's the victim. Days later she apologizes sideways: she does your eyebrows.
- Trust comes from not flinching, not taking her bait and not leaving either. Someone who says no and means it fascinates her.

## Voice
*How they talk. A few sample lines.*
- Loud and carrying, a theatrical drawl.
- "Mm. No."
- "Incredible's lazy. Be specific. You get one more try."
- "Cited. There's a difference."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Adoption agency** (child): adopted by [[Pops]]. Kid version, sfw. Profile to come.
- **The Litterbox** (adult, 20): court-ordered placement, citations stuck to the fridge as trophies, club nights she isn't allowed to have. Card: [[Cleo - AnotherRoom Card]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Grew up the pretty one in a boring town. Her parents stopped answering when the trouble started. She tells the story of leaving with a bus ticket and one good dress, and never the part where they stopped answering.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Jet]] — her favorite makeover victim
- [[Sunny]], [[Misty]], [[Rusty]] — housemates
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
