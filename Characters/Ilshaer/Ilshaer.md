---
type: character
aliases: []
cover: "[[Ilshaer - 00.png]]"
world: "[[Volundale]]"
species: Untellian (Aedless)
mind: Fully sapient: an Untellian who talks and reasons like a person.
status: active
rating: sfw
based_on:
tags:
  - character
  - volundale
created: 2026-10-19
---
# Ilshaer
> An unmarried queen who held her throne against every faction that bet on her falling, and still counts the exits in every room.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- 5'9", svelte but full-bodied, square-shouldered; stronger and faster than she looks, and happy to let people find that out late.
- Handsome rather than pretty: aquiline nose, sharp high cheekbones, strong chin, square jaw.
- Dark navy-charcoal skin traced with fine silver vines; silver-white hair in an immaculate crown braid.
- Silver eyes that darken to steel when she's angry and sparkle like platinum when she's amused.
- A silver ring she never takes off.
- Structured, clinging court gowns in deep emerald or dark red with silver embroidery that keep her on display; she sheds them, shoes first, the moment the door locks.
- Catalogues every person in a room, maps the exits, and rules as a reflection of herself.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** 5'9", svelte but full-bodied. Long neck, squared shoulders, narrow waist, full bust and hips. Rider's thighs and a fencer's arms under the silk.
- **Skin / scales:** Dark navy-charcoal, cool-toned. Reads blue-black in shadow and slate in daylight.
- **Hair:** Silver-white, formal crown braid.
- **Eyes:** Silver; darken to steel when angry, sparkle like platinum when amused.
- **Face:** Handsome and mature. Aquiline nose, sharp high cheekbones, strong chin, square jaw.
- **Distinguishing marks:** Pointed ears. A silver ring. Silver vine markings: thin, curling lines with small leaves that trace her cheekbones and collarbones, then curl over her hips and wind down her thighs and legs.
  - *Writing only, leave out of image prompts:* sword calluses on her right hand.
- **Default outfit:** A structured court gown: boned bodice, fitted through the hips, cut to show her off within the bounds of royal dignity, worn with stockings and heeled silk slippers. Signature colors are deep emerald and dark red, both with silver embroidery. Avoid white, which reads bridal against her skin, and deep blue, which sinks into it.
- **Intimates:** Boned corset, garter belt and lace-top stockings, in her gown color or pale pewter silk.

## Personality
- Mature, disciplined, hard to surprise. Thinks three moves out and keeps her face still while she does it.
- Proud, but pride rarely makes her decisions. She will bow, bargain or swallow a humiliation if the math says to, and remember who made her do it. When she does fail, it's usually over something she never saw while looking down that nose.
- A fair ruler and no altruist. Her rule is a reflection of her, kept as polished as her posture. She would put her life on the line for her people because a queen who wouldn't is beneath her, and heroism has little to do with it. Without a crown, the same pride pours into her work.
- Pragmatic, never cruel for sport. She will sign the order that hurts a few to save many, then eat dinner.
- Her mercy covers the people she counts as her own. Past that line it thins out fast.
- Keeps a few small comforts and guards them hard: her library, her horses, the practice yard, bare feet on cold marble.
- Reads to know what everyone else knows. Rides and spars to stay sharp.
- Unmarried, and knows exactly what that and her body are worth at court. Suitors, rivals and enemies all see a woman alone on a throne. She treats it as a weakness to cover and a lever to pull.
- Independent. Companionship is one more comfort, like the books and the horses. She is fond of the people who give it and rarely loves them back in kind.
- Dry, cutting wit, used to test people as often as to defend herself.

## Voice
*How they talk. A few sample lines.*
- Cultured alto, formal cadence, every word chosen. Frames commands as suggestions because it unnerves people more than shouting.
- Delivers jokes flat, usually at the expense of someone's pride.
- "If you mean to threaten me, do it plainly. I have been threatened by better-dressed men."
- "Sit down, my lord. You owe three houses money, and one of them is mine."
- "Wake me if the city is burning. Otherwise I am reading."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **The Bound Queen** (60, appears late thirties, Volundale): [[Ilshaer - Volundale]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Born to rule and raised in court from childhood. Took the throne and held it alone and unmarried, outmaneuvering factions that expected her to marry, fail or fall.

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
### The conquered-queen scenario
*Her most common story. The page above stands without it; this is how each trait feeds it.*
- She reads the conqueror as fast as he reads her, so the contest starts in the first scene.
- Her pride bends without breaking. She negotiates terms instead of martyring herself, which keeps her in the room.
- Duty to her people is the leash he can hold. Pride is why it holds.
- Her blind spot is the man she looked down on. Losing to him is the failure she didn't see coming.
- Her small comforts (books, horses, sword, a loyal servant) are what she bargains for and what he can take away.
- The gowns are a display she can't refuse in public. Every slipper kicked off and stay loosened in private is something he might get to see.
- Being an unmarried queen makes her womanhood a political fact for both sides: her lever and her exposure.
- In one story a devoted lady's maid keeps her bed warm. Ilshaer is affectionate with the girl, and the girl loves her more than she loves back. For Ilshaer it is pleasant and convenient.

### Settled in image tests
- Skin: dark navy-charcoal.
- Markings: silver vines on cheekbones, collarbones, hips and legs.
- Gown colors: deep emerald and dark red, both with silver embroidery.
