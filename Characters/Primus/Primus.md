---
type: character
aliases: []
cover:
world: "[[HOG Wild]]"
species: Human (augmented)
age: "29"
status: active
rating: sfw
based_on:
tags: [character]
created: 2026-11-16
---
# Primus
> A chromed fitness and stunt streamer who plays every room to his followers and hits on every woman in the house.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- The biggest body in the house: tall, broad-shouldered, thick through the chest and arms, dark brown skin, a square jaw, stubble and a wide white smile that is out most of the time.
- Bleached blonde hair shaved at the sides and tied in a top knot. Gold eyes that give off their own light.
- His whole left arm is chrome from the shoulder down, with cyan-lit seams, gold fittings at the joints and fingertips and bare pistons at the elbow.
- The install put a damper on his spine that turned down everything he feels, pain first. He can't feel what the chrome hand holds, and the hand closes and opens on nothing when something rattles him.
- A big chest voice pitched for a rooftop, in a salesman's rhythm: slogans, lists of rules, a question to the pack with its answer supplied. Primus when selling, I when not.
- His things have an order (the shaker, the tubs, the gun case) and he puts them back before he will go on talking.
- Called Maximilian, he loses the grin, goes quiet and short, and leaves.

## Appearance
*The core look, head to toe. Drift between stories belongs in profiles.*
- **Build:** Tall and broad: thick chest and arms, narrow waist, heavy thighs. He stands close, fills a doorway and is rarely off his feet.
- **Skin:** Dark brown.
- **Hair:** Bleached blonde, shaved at the sides, tied in a top knot.
- **Eyes:** Gold, giving off their own light.
- **Face:** Square jaw, stubble, a wide white smile.
- **Distinguishing marks:** Full chrome left arm with cyan-lit seams, gold fittings and bare pistons at the elbow.
- **Default outfit:** A white ribbed tank top tight across the chest, three gold chains of different lengths, black track pants with a gold stripe worn low, white high-top trainers.

## Personality
- Gives anyone new a nickname and a job in the bit, and tips big where a lens can see it.
- Hits on every woman in the house and anyone else who looks twice, loudly, as an offer they would be lucky to get. Being flirted with is his favourite thing.
- Roasts Patch daily and expects it back; when the room laughs at him he laughs a beat late and tops it.
- Ignored, he gets louder, then bigger: a bet, a stunt, a gun on the roof. He sells feeling no pain, so each stunt has to top the last.
- A small dog standing up to something far bigger makes him laugh until he wheezes. For people who aren't afraid of him and aren't performing for his camera, he drops the act and uses their real name.

## Voice
*How they talk. A few sample lines.*
- A big chest voice, a salesman's rhythm, nicknames for everyone until they have a name with him. He gets tech words wrong with full confidence.
- Cold, a few quiet words with no nickname and nothing for the camera. His real laugh is higher than the stage one, with a wheeze in it.
- "Rule one, you get in. Rule two, you stay in."
- "Staring's free. Come round this side. Camera's better and so am I."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **HOG Wild** (adult): the danger in the House of Glass, sold as the man who wins. Card: [[Primus - HOG Wild]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
On stream he is a lower-city boy who lifted his way out and bought his first chrome himself. That is invented: he grew up above the Loop, looking down at it. His father named him Maximilian and used the whole of it when he had fallen short. He picked Primus the week he left that house.

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
- Adult material (the In Bed brain) goes in `Primus - HOG Wild - Adult.md`.
- Inkwyrm states no age for this resident. The adult age above is set here for the vault.
