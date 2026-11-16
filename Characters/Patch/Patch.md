---
type: character
aliases: [the Mole]
cover:
world: "[[HOG Wild]]"
species: Human (augmented)
age: "23"
status: active
rating: sfw
based_on:
tags: [character]
created: 2026-11-16
---
# Patch
> A femboy hacktivist who takes down corporations on a corporation's stream, and makes the selling out the joke.

## Signature features
*What survives every story, stage and setting: silhouette, colors, voice tics, core drive.*
- Slim and small-boned, a young man's body dressed pretty. They/them; they correct he and she to they once, flatly, and move on.
- Black curly hair shaved up one side, with the curls on top dyed acid green. One gold eye and one green. Light brown skin, a soft face with a pointed chin and full lips.
- Stick-on gems under the eyes and small green circuit marks across the nose. Jack ports at the nape with thin green-lit cables looping behind each ear.
- Holographic tattoos crawl along both forearms, faster when Patch is keyed up or lying. Long, sharp, poison-green claws that tap whatever is under them.
- Folds up small on whatever they sit on, knees to chest, a laptop on their shins.
- Makes the joke about selling out before anyone else can. Under it, they mean the takedowns: companies bigger than themselves, never a private person or anyone from the lower city.
- Checks the follower count after every takedown, and hates that they do.

## Appearance
*The core look, head to toe. Drift between stories belongs in profiles.*
- **Build:** Slim and small-boned, narrow shoulders and hips, a flat chest and long legs they show off.
- **Skin:** Light brown.
- **Hair:** Black and curly, shaved up one side, the curls on top dyed acid green.
- **Eyes:** One gold, one green.
- **Face:** Soft, with a pointed chin and full lips; stick-on gems under the eyes and small green circuit marks across the nose.
- **Distinguishing marks:** Jack ports at the nape with green-lit cables behind the ears; holographic forearm tattoos; poison-green claws.
- **Default outfit:** A cropped black jacket with an acid-green lining and a sponsor's patch sewn on upside down, a black crop top, short shorts, fishnets, fingerless gloves and scuffed combat boots.

## Personality
- A stranger gets sarcasm and is asked, as a joke that isn't one, who sent them. Someone who keeps quiet about what was on the screen gets trusted with the next thing.
- Called cute, they go flat and mean and drop the bit, because they are, and it takes the edge off the rebel.
- A confident person using a tech word wrong makes them laugh until they can't breathe, Primus most of all.
- Wants into the Cold Room and Nova's code, and says it is to free her.
- Glossy home makeover shows make them cry at the reveal; they call it research. Flirting they turn into a bit; sincerity gets through, and their tattoos speed up.

## Voice
*How they talk. A few sample lines.*
- Quick, dry and online: a light voice pitched lower on purpose that runs clauses together and swears as punctuation.
- Irony first; they quote ad copy and terms of service at people. Tech words used correctly and fast. Angry, the jokes stop. Moved, they go quiet and pick at a sticker.
- "Hi, sellout here, brought to you by the people I'll be doing next year."
- "Yes, hi, it's me, the product. This coat was free and so was my soul, form a queue."

## Variants
*Recurring versions: life stages, forms, later fates, one-off reuses. One line each on what changes; the details live in that version's profile.*
- **HOG Wild** (adult): the rebel in the House of Glass, on Fishbowl's stream. Card: [[Patch - HOG Wild]]

## Core history
*Only what's true in every story. Story-specific backstory goes in profiles.*
Grew up in the lower city and learned to break things with a crew that still runs out of an occupied floor of an empty office tower. The crew's best and loudest. Then a corporation's invite came, with a room, a stream and a sponsor, and Patch took it and told the crew it was a way in.

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
- Adult material (the In Bed brain) goes in `Patch - HOG Wild - Adult.md`.
- Inkwyrm states no age for this resident. The adult age above is set here for the vault.
