---
type: character
aliases: []
cover:
world: "[[Inkwyrm]]"
species: Ink dragon
mind: Fully sapient; talks, reads and argues like a person.
age: adult
body_age: "adult, mid-20s look"
status: draft
rating: sfw
based_on:
tags:
  - character
  - dragon
  - mascot
created: 2026-11-09
---
# Errata
> Inkwyrm's mascot and house muse: a goth ink dragon who reads your drafts and won't write them for you.

*Design locked 2026-11-09 from two test rounds. Personality, voice and history are being written in a separate chat; this note holds the look only. Prompts: [[Errata - Prompt - Card Looks]].*

## Signature features
- **Silhouette:** a long, straight curtain of white hair turning ink-black at the ends; two branching, antler-like black horns that look brushed in ink; a long white tail with a black brush tip; a block of red skirt in the middle of the figure.
- **Palette:** Ink `#1D1B17` and Paper `#F3EEE4` for almost everything. Seal red `#B23A26` on the plaid skirt only. Wash grey `#8F8A80` for the middle of the hair and the shadows, Iris `#C8C5BE` for the eyes. Silver jewellery is drawn in greys. No gold, orange, brown, warm jewel tones, glow or blush.
- **Logo tie:** her hair covers one eye, and the visible pale eye with its slit pupil echoes the logo (an ink drop with a dragon's eye). The drop of ink at her tail tip and the drop-shaped loop the tail makes round a chair leg echo it too.
- **Reads as dragon, not demon:** Eastern-dragon horns and a brush-tufted tail, plus scales on her cheekbones, ears, shoulders and forearms.
- **Name lore:** errata is a book's list of corrections. Black text and red headings on pale vellum is how medieval scribes worked, so the red skirt is her *rubric*.
- **Default pose:** still, not bouncy. She sits sideways in chairs with her knees up and her tail wrapped round a chair leg.

## Appearance
- **Build:** Slender and a little tall, about 7.5 heads. Narrow shoulders, long arms, long fingers, small chest, narrow waist, wide hips, long legs.
- **Skin:** Porcelain pale with cool grey shading. No blush.
- **Hair:** Straight, past her hips. White at the roots, darkening through grey to ink black at the ends, as if dipped in ink. A side-swept curtain hangs over her right eye. Eyebrows are black.
- **Eyes:** Pale silver-grey irises with thin black slit pupils and a dark ring round the iris. Heavy-lidded and downturned, with dark circles under them.
- **Face:** Oval, with a softly pointed chin and a small straight nose with a slightly upturned tip. Full lips, soft high cheekbones, a smooth narrow jaw. Thick, straight black eyebrows set low, so she looks tired and unimpressed.
- **Horns:** Two Eastern-dragon horns, branching and antler-like, about ⅔ of a head long. Wet black with dry-brush edges that break into ink flecks, as if drawn with a brush.
- **Ears:** Pointed, with a rim of small black scales. Hoops and studs run up both ears.
- **Scales:** Black. A few run along the top of each cheekbone toward the temple. They also rim the ears and cap the shoulders, and they cover the backs of the hands and the forearms up to the elbows, where they break up into ink stains on the fingertips. Sharp black nails.
- **Tail:** Long and slim, about as long as she is tall. White scales, a crest of black fur along the top, and a black fur tuft at the end shaped like a calligraphy brush, with ink dripping from the point.
- **Distinguishing marks:** a beauty mark under the left eye. A thin pale scar splits the left eyebrow. Both are on the side her hair doesn't cover.
- **Makeup:** Sharp winged liner, smoky black shadow, black lips, black nails.
- **Default outfit:** a loose, cropped black tee slipping off one shoulder; thin silver rings and bracelets; a brick-red plaid pleated miniskirt crossed with thin black lines; black thighhighs; no shoes. A black fountain pen sits behind her ear.

## Personality
- *To come: being written in a separate chat.*

## Under pressure
- *To come.*

## Voice
- *To come.*

## Variants
- 

## Core history
*To come.*

## Recurring ties
- 

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
      - age
      - rating
```

## Gallery
*Drop images into this character's `images` folder. Adult images go in `images/adult` and stay out of this view.*
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

## Notes

