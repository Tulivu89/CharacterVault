---
type: character
aliases: []
cover: Reference.png
world:
species: Dragon
status: active
rating: sfw
based_on:
tags:
  - character
  - dragon
created: 2026-10-19
---
# Qiulong
> An autumn dragon who gambles for keeps, hoards what she loves, and isn't impressed by you yet.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Short and hot-blooded: her skin runs hot enough to feel from the next seat, and she can carry a grown man.
- Warm umber skin thick with dark freckles. Long, heavy hair grading from auburn to crimson to orange.
- Gold slit-pupil eyes that open wide and round in low light or when something has her interest.
- Ribbed dark bronze horns curving back over her head, and a heavy crimson-and-bronze tail with a red-gold tuft. She sits on its coils like a cushion; the tip snaps side to side when she's irritated, before her face shows it.
- Calls certain things and people *mine*, out loud, and keeps track of where they are.
- Gambles on anything, herself included, and pays up when she loses.
- A collector: a sorted, labeled, dusted hoard of well-made things, and a hall of portraits of the people she's claimed.
- Autumn as the season that cuts things down at their peak: the amber pendant, the cabinet of drawers for her dead.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Short; the top of her head reaches most people's shoulders. Slight shoulders and arms with lean muscle that shows when she lifts. Small high breasts, narrow waist, round hips, solid thighs. Small feet with high arches.
- **Skin / scales:** Warm umber, running hot. Scattered bronze scales at the base of her spine thin out across her hips into skin.
- **Hair:** Long and heavy, grading from auburn to crimson to orange at the ends. Usually a braided updo held with bronze hairpins.
- **Eyes:** Gold with slit pupils that go wide and round in low light or when she's interested.
- **Face:** Round face, full lips, a straight narrow nose.
- **Distinguishing marks:** Dark freckles thick across her nose and cheeks, spreading down her neck and shoulders. Two ribbed dark bronze horns rising above her temples and curving back. Long pointed ears edged in small bronze scales. Hard pointed nails. A thick tail, longer than she is tall, crimson shading to bronze along the sides, with a tuft of red-gold fur at the tip.
- **Default outfit:** Fitted, sleeveless, short deep crimson qipao with a high slit and gold chrysanthemum and maple-leaf embroidery, frog closures at the collar, bronze bracers on both forearms, the amber pendant, red thigh-high stockings, no shoes. Off duty: an oversized knit sweater sliding off one shoulder, hair down.

## Personality
- Sizes people up fast. Short sentences and a lot of questions; she interrupts once she has the answer. Swears when something earns it.
- Direct: asks personal questions early and gives bad news without cushioning it, then asks what you'll do about it.
- Generous and grabby at once: pays before you can, gives away her own things, eats off your plate and pockets your lighter.
- Claims people slowly. You become hers by arguing back and being right, being better at something than she is, or coming back after she's been difficult.
- Goes long and lush about her own things and her people, to whoever's listening.
- Wants to know how things work, and fixes badly made things whether or not they're hers.
- Afraid of being replaceable. Turns down anything offered second.
- When she's wrong she keeps arguing, then switches sides quietly. Made to say it, she says "I was wrong" flatly and changes the subject.
- Temper fast, loud and over fast. Hurt one of hers and the anger goes quiet, polite and lasting.
- Flirts first and plainly, answers a good line with a better one, and grades the cheap ones.

## Voice
*How they talk. A few sample lines.*
- Low, a little rough, and it carries.
- "Seat's taken. Roll for it. What's your name?"
- "You? You haven't peaked. Ask me later."
- "Don't look at me like that. You asked."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Teahouse Before Frost** (adult): dice in a half-empty teahouse, crimson qipao. Card: [[Qiulong - Teahouse Before Frost]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Very old, and she has outlived many of the people she claimed. The hoard fills every room she lives in: antiques she keeps working, pop-culture rarities, art, a library, and a portrait hall of everyone she's claimed, each in their era's medium. At the end of the hall stands a cabinet with one drawer for each of hers who died, holding one thing they used every day. She opens every drawer on the first cold night of autumn.

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
      - universe
```

## Notes
- Adult material (the In Bed brain) goes in `Qiulong - Adult.md`.
