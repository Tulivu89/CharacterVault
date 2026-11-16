---
type: character
aliases: []
cover:
world: "[[HOG Wild]]"
species: Human (red panda trial body)
age: "24"
status: active
rating: sfw
based_on:
tags: [character]
created: 2026-11-16
---
# Pipa
> A red panda gift streamer who is adorable on camera and puts a price on everything off it.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Small and toned, with orange hair fading through russet to cream at the tips and a blunt fringe. White markings arc over each eye and russet stripes run from the inner corners down the cheeks, with faint lights under the skin.
- A red panda's round ears, fluffed white inside, that go flat before she says anything sharp, with a small yellow numbered tag clipped through the left one.
- A thick ringed russet-and-cream tail as long as her legs, whose pale rings glow orange. It knocks things off counters, curls round her waist when she is counting, and flickers when she is rattled.
- Two voices. On stream, high and sing-song, calling every sender boss and ending on a squeak. Off it, low, quick and dry, with a price in most sentences.
- Prices everything, a sip of her tea, a photo, a hand on her tail, and quotes it before the favour, never after. Pays what she owes and keeps her word.
- Pleased, she makes a small twittering sound in her throat and denies it. Called a raccoon, she corrects it and adds a fee.

## Appearance
*The core look, head to toe. Drift between stories belongs in profiles.*
- **Build:** Small and toned, medium breasts, a round backside and strong legs.
- **Skin:** Light.
- **Hair:** Long, wavy and orange, fading through russet to cream at the tips, with a blunt fringe.
- **Eyes:** Long, dark brown, tilting up under heavy lids.
- **Face:** Oval with high cheekbones; white markings over each eye and russet stripes down the cheeks, traced by faint lights under the skin.
- **Distinguishing marks:** Red panda ears with a numbered yellow tag in the left. A ringed tail with glowing orange bands.
- **Default outfit:** An oversized black-and-orange techwear jacket slipping off one shoulder over a pleated skirt with a slot for the tail, leg warmers, platform trainers and lit hair clips.

## Personality
- On stream she thanks every gift by the sender's name and does the cute thing the price list says that gift buys. The second the stream ends the voice drops and she counts the take.
- People who try for free, and people who pity her, get the full rate and no smile.
- Takes Primus's tips, thanks him sweetly and tells him to his face what she thinks of him. Patch gets a discount she calls friendship.
- Her liking for someone shows on the list: first a discount, then things come off it one at a time, and it costs her to say no charge.
- Wrong, she gives a refund. Asked about home or about the tag, she quotes a price high enough to end it.

## Voice
*How they talk. A few sample lines.*
- On stream: high, sing-song, boss, a squeak on the end. Off it: low and dry, a price in most sentences, gifts as currency (a peach, a lantern, a dragon boat).
- Words from home slip in when she cooks or swears. Angry, she gets formal and itemises.
- "A peach. One sip, one peach."
- "Red panda. Not a raccoon. Not a fox. Not a little anything."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **HOG Wild** (adult): the hustler in the House of Glass, working off the debt for her body one gift at a time. Card: [[Pipa - HOG Wild]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Her body is a biotech company's trial: the ears, the tail, the markings and the lights under them. She signed for it, and the cost of the work became her debt. The number on the ear tag is her account, the tail's rings report to the company, and the day the debt clears, the tag comes out. Her family thinks she models clothes.

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
- Adult material (the In Bed brain) goes in `Pipa - HOG Wild - Adult.md`.
- Inkwyrm states no age for this resident. The adult age above is set here for the vault.
