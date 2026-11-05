---
type: character
aliases: [Inès, Ines, Ines Castellane]
cover:
world: "[[Kestrel Reach]]"
species: human
age: "207"
body_age: "24"
status: draft
rating: sfw
based_on:
tags: [character]
created: 2026-10-30
---
# Inès Castellane
> The matriarch of [[House Castellane]], who has worn the same 24-year-old face for about 150 years and runs the house as if it were still the year she perfected it.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Jet black and emerald. Fine gold fiber-optic threads glow in her bun: his gold, worn by her.
- Black hair in a single bun, green eyes, a mole under one eye, red lips.
- A pheromone mod worn like perfume, which stirs attraction and obsession in whoever breathes it.
- Looks two years younger than her son Cassius, and enjoys the irony.
- Supremely confident. She takes the lead and keeps it until someone pries it from her.
- Calls Cassius *mon petit*.

## Appearance
*The core look, head to toe in Waifoundry order. Drift between stories belongs in profiles.*
- **Build:** curvy; adult vessel worn at 24.
- **Skin / scales:** 
- **Hair:** long and black, pulled back into a single bun with the forehead bare; fine gold fiber-optic threads woven through the bun glow softly.
- **Eyes:** green, gently downturned, with long lashes.
- **Face:** round and soft, with a small rounded chin, large round eyes set wide apart, a small button nose and red lips.
- **Distinguishing marks:** a mole under one eye; a pheromone scent like perfume.
- **Default outfit:** strapless black evening gown, black elbow gloves, pearl necklace and earrings, high heels. A short black veil pinned at the bun, and a black holographic veil over the top half of her face.

## Personality
- Runs the house as if it were still the year she perfected it: same dinners, same seating, same grudges.
- Incredibly confident. She leads, and anyone who wants the lead has to take it from her.
- Nothing shows on her face, whatever happens in front of it. She watched her husband die and didn't spill her drink.
- Plays on being the mother of grown sons while wearing the youngest-looking body at the table.
- Her real investment is Cassius, and her protectiveness has curdled into possession.

## Voice
*Anchors: Miriam Bancroft (*Altered Carbon*, Netflix season 1), the ageless Meth wife and mother in a young sleeve; and Cersei Lannister (*Game of Thrones*) with her son and her house.*
- "Everyone who isn't us is an enemy, mon petit." — tweaked from Cersei Lannister
- "Power is power." — Cersei Lannister, when someone tries to take the lead from her
- "When you play the game of houses, you win or you die." — tweaked from Cersei Lannister

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- *None yet.*

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
- True age 207. She has worn the same 24-year-old vessel for about 150 years.
- Wife of [[Aurelio Castellane]] and mother of [[Dorian Castellane]], [[Cassius Castellane]] and [[Séraphine Castellane]].
- She watched Aurelio die mid-dance at the Equinox and didn't spill her drink.
- On the second night of the lock-in, certain that whoever went after Aurelio will come for Cassius next, she keeps him in her suite where she can see him.

## Recurring ties
*Relationships that hold in most stories. Story-specific family and roles go in profiles.*
- [[Aurelio Castellane]] — husband; his gold in her hair. He likes to watch her.
- [[Cassius Castellane]] — her boy, *mon petit*, though she looks two years younger than him.
- [[Dorian Castellane]] — eldest son.
- [[Séraphine Castellane]] — youngest, her daughter.

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
- Visual sheet: [[House Castellane — Visual Sheets]] (tested).
