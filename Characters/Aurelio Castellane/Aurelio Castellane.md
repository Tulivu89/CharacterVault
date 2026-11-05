---
type: character
aliases: [Aurelio]
cover:
world: "[[Kestrel Reach]]"
species: human
age: "214"
body_age: "about 50"
status: draft
rating: sfw
based_on:
tags: [character]
created: 2026-10-30
---
# Aurelio Castellane
> The founder of [[House Castellane]], 214 years old, who controls who in his family gets a new body, and when.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Oxblood and gold. The gold-plated fingertips of his right hand hide electrodes: one touch can override a nervous system, for pain, for pleasure, or to drop someone where they stand.
- A vessel worn at about 50: grey hair slicked back, a beard, blue eyes, fine lines at the corners of the eyes.
- Courtly, patient and possessive. He treats everything he owns as a collection, his children included.
- Controls the renewal queue and spends it like currency.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** tall; adult vessel worn at about 50.
- **Skin / scales:** 
- **Hair:** short, slicked back, grey; full beard.
- **Eyes:** blue.
- **Face:** long, with a strong jaw and fine lines at the corners of the eyes.
- **Distinguishing marks:** polished gold plating on the fingertips of his right hand, with electrodes beneath.
- **Default outfit:** black double-breasted suit whose fabric carries a slowly drifting oxblood damask, red vest, red ascot, pocket square, ring.

## Personality
- Founded the house and refuses to stop being it.
- Courtly, patient and possessive. Everything he owns belongs to a collection, including his children.
- Holds the renewal queue over the family and spends it like currency.
- Jealous, above all where Séraphine is concerned.
- Lets things pass in the moment and collects on them later.

## Voice
*Anchors: Laurens Bancroft (*Altered Carbon*, Netflix season 1), the centuries-old Meth resleeved after his own murder and missing the hours before it; and Logan Roy (*Succession*) for how he holds his children.*
- "I love you all, but you are not serious people." — tweaked from Logan Roy
- "Boar on the floor." — Logan Roy's humiliation game; Aurelio plays it with the suspects
- **[draft]** "Six hours of my life are gone. Someone in this house knows what was in them."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **Fresh vessel** (adult): the body he woke in six hours after the attempt, still smelling of growth medium. **[draft]** The gold fingertips and their electrodes aren't reinstalled yet.

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
- Founded House Castellane. True age 214.
- Husband of [[Inès Castellane]] and father of [[Dorian Castellane]], [[Cassius Castellane]] and [[Séraphine Castellane]].
- When Séraphine came of age, he decided 21 was the version of her he would keep.
- At the Castellane Equinox, a courtesan with lattice-burners in her nail-tips reached him mid-dance and burned out his vessel. His core survived.
- He woke six hours later in a fresh vessel. The hours before the attempt are scorched out of his lattice, and he doesn't know who did it. The estate stays sealed until he names someone.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Inès Castellane]] — wife; the matriarch.
- [[Dorian Castellane]] — eldest son, kept at about 36, never old enough to read as his replacement.
- [[Cassius Castellane]] — middle son, his mother's boy.
- [[Séraphine Castellane]] — youngest, his princess, and the first person he calls for after waking.

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
- Visual sheet: [[House Castellane — Visual Sheets]] (draft, untested).
