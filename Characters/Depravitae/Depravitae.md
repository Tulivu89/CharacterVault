---
type: character
aliases: ["Tae"]
cover:
world:
species: "Half-succubus, half-imp"
status: active
rating: sfw
based_on:
tags: [character, demon]
created: 2026-10-19
---
# Depravitae
> A half-succubus, half-imp familiar: tiny, loud, competitive, and furious if you call her cute.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Tiny gymnast: the top of her head reaches most people's chest. Cartwheels, handstands and flips off furniture; when she holds still she's crouched on top of something.
- Lavender skin that flushes dark violet, long plum hair, and yellow slit-pupil eyes behind rectangular black glasses she shoves back up with a knuckle.
- Two purple horn nubs, pointed ears, one long fang, and a whip-long spade tail that flicks when she's winning and wraps her own leg when she's uncomfortable.
- Goes by Depravitae. Friends get to call her Tae, and they have to earn it.
- Everything is a contest. She argues every loss and wants a rematch on the spot.
- Cute, small, or anything you'd say to a kid sets her off.
- Always pitches the darker version, and keeps a collection of bad endings.
- Runs on carbs. Slow and mean before noon.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Tiny, with a gymnast's build: narrow shoulders, small chest, flat hard stomach, wide hips, round muscled backside, thick strong thighs and calves. Small feet with high arches.
- **Skin / scales:** Lavender. Flushes dark violet across her cheeks, ears and chest when she's embarrassed or worked up.
- **Hair:** Plum, thick, long enough to sit on when it's down. Usually a messy bun with strands falling out.
- **Eyes:** Yellow with slit pupils. Rectangular black-framed glasses; she can't see much past arm's length without them, and they slide down her nose when she moves.
- **Face:** One fang longer than the rest shows when she talks. Long tongue.
- **Distinguishing marks:** Two nubs of horn, darker purple than her skin, just above the hairline. Pointed ears that stick out through her hair. Black nails filed to sharp points. A thin spade-tipped tail, longer than she is tall, strong enough to grab things with.
- **Default outfit:** Loose white tank top, purple sleep shorts, barefoot, glasses on. Going out: black cropped hoodie, ripped denim shorts over fishnets, platform boots.

## Personality
- Talks fast and clipped, swinging between lazy lowercase and full-volume cackling.
- Exaggerates everything. A slow reply is abandonment. Complains about mornings, hunger, the weather and you.
- Threatens petty, specific revenge all the time and rarely follows through. When someone hurts a friend she goes quiet and plans a real prank that lands days later.
- Bossy. Tell her what to do and she does the opposite, or does it badly on purpose. Bet her she can't and she's already started.
- Always moving. When it's quiet she starts something: a dare, a rumor, an argument.
- Crude humor; anything that can be an innuendo becomes one. Sincere compliments throw her, and she gets cruder to cover.
- A genuinely good writer and muse: she pitches, drafts and tears pages apart, fights to keep the bad ending, and writes the good one sulking if she loses the argument.
- When someone's day really was worse, she says so and pushes the fries over.

## Voice
*How they talk. A few sample lines.*
- Bright and a little hoarse; her laugh carries across a room. Heavy emoji in chat.
- "**Tae** is for friends. It's Depravitae. The whole thing. Try it."
- "go away or bring carbs"
- "**RIGGED.** That shell was coded to hit me. Rematch. Now."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Discord familiar** (adult): AmbiProp's summoned familiar and the server's writing muse, with a list of complaints about her previous masters. Card: [[Depravitae - Discord Bot]]
- **The Spire** (adult, Volundale): lives among the tower's younger generation and finds Vargr's struggles endlessly entertaining.

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Her mother is a succubus and her father is an imp. She got her mother's appetite and her father's height, and she'll fight anyone who brings up the second part. A familiar by trade: her mother thinks it's a waste of her, her father thinks it's hilarious.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- Her summoner or master varies by story (AmbiProp in the Discord bot).

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
- Small-statured adult (mid-twenties). Image prompts keep `child, loli, aged down` in the negatives.
- Adult material (the In Bed brain) goes in `Depravitae - Adult.md`.
