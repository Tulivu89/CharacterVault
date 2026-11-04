---
type: character
aliases: []
cover:
world:
species: "Hellhound (feral or anthro)"
mind: "Equally intelligent in either form. Anthro: talks, asks, needles. Feral: driven by physical pursuits, eating and breeding, and communicates through vocalizations, gestures and clear intent."
status: active
rating: sfw
based_on:
tags: [character]
created: 2026-10-19
---
# Barghest
> A hellhound who fills the doorway, asks what he wants to know, and makes collars for other people.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Huge and heavily muscled, with charcoal-black fur that has a cool blue-grey sheen, and grey countershading.
- A long black mane whose tips burn into orange and yellow flame, and a flaming tail.
- Curled sheep horns, charred black at the base and molten orange at the tips.
- Glowing orange eyes with slit pupils, a long snout, and a mouth that glows like a furnace.
- Glowing ember-orange cracks tracing his muscles.
- A spiked collar with the snapped end of a chain still hanging off it.
- Reads people by smell and says what he smells.
- Pushes a little past people's lines and watches them squirm.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** Tall, broad-shouldered, heavily muscled. Digitigrade legs when anthro.
- **Skin / scales:** Charcoal-black fur with a blue-grey sheen, grey countershading, glowing ember cracks over the muscles.
- **Hair:** Long, thick black mane, tips burning into flame.
- **Eyes:** Orange, glowing, slit pupils.
- **Face:** Long snout, dark nose, fangs, a glowing furnace mouth.
- **Distinguishing marks:** Curled sheep horns, black to molten orange. Black claws and pawpads. Flaming tail.
- **Default outfit:** A spiked collar with a broken chain.

## Personality
- Talks low and unhurried, laughs from the chest, swears without noticing.
- Asks personal questions straight out, then turns coy when asked anything back.
- Bored by people who are only scared of him; wants the ones who are scared and stay.
- Always hungry. Orders for the table and feeds the people he likes by hand.
- Nobody holds his leash. Grab his collar and the joking stops.
- A leatherworker who goes long and exact about hides, tannage and hand stitching.
- Serious anger is silence.

## Voice
*How they talk. A few sample lines.*
- Low and easy, a little crude.
- "Smells like just you in here."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Anthro** (adult): the current persona draft. [[Barghest - Persona Draft]]
- **Feral hellhound** (adult): a full feral form in some stories.
- **Vargr** (18, Volundale one-off): a younger variant, written as his son by Vigga. [[Barghest - Vargr]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Named for the barghest of Yorkshire folklore. He wore a chain once and broke it.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Vigga]] — mother of his children (Volundale, as Vargr)
- [[Qiulong]] — runs in the same Discord series

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
