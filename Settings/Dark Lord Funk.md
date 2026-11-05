---
type: setting
aliases: []
cover:
world: "[[Dark Lord Funk]]"
status: draft
rating: suggestive
version: 1
tags: [setting]
created: 2026-11-05
---
# Dark Lord Funk
> A protagonist, a warband and a harem assembled from the people sent to stop them.

*Untagged lines are canon. **[draft]** marks proposals waiting on approval.*

## Premise
*Stub built from the character notes. Nothing here is new canon; the gaps are yours to fill.*

The protagonist leads a warband through a war with a human insurgency. Captives, allies and would-be assassins end up in the camp, and the harem grows out of it.

## Tone


## Core rules
*How magic, power and the setting's key mechanics work.*
- 

## The wider world
*Only what presses on this setting. Leave the rest of the map alone.*
- 

## Places
- 

## Peoples
*Species, kin and factions. For nonhumans, say how they think and communicate.*
- **Humans.** Their insurgency is the warband's enemy.
- **Cinderkin.** A people with a priesthood; the Fae bless their priestesses.
- **Beastkin.** Pantheren and Vulpen, among others.
- **Wolven.** Therians.

## Conflict axes
- 

## Arc
*Stages or beats a story here moves through.*
1. 

## Protagonist slot
*What's fixed for the user's character and what's left open.*
- **Fixed:** 
- **Open:** 

## Cast notes
*Who lives here and what they want. Full details go on character pages and profiles.*
- [[Ilia]]: captured Cinderkin priestess, whose faith can be turned toward the protagonist.
- [[Kaelen]]: assassin for the human insurgency.
- [[Maeve]]: merchant and quartermaster, who treats the harem as a business arrangement.
- [[Vigga]]: warband barbarian.
- [[Yumiko]]: the warband's thief, who treats the protagonist as a meat shield.

## Lore entries
*One bullet each: a bold key, then a short entry. An entry loads into play when its key comes up; add more keys with slashes: **The Aedling Kingdom / gilts / chalks:***
- **Human insurgency:** the human resistance. It sent Kaelen to kill the protagonist.
- **Cinderkin:** a people whose priestesses are blessed by the Fae.

## Open questions
- Who is the protagonist, and whose side are they on?
- Kaelen has no stated age.

## Characters
```base
filters:
  and:
    - 'type == "character"'
    - file.hasLink(this.file)
views:
  - type: cards
    name: Characters
    image: note.cover
    imageFit: cover
    order:
      - file.name
      - status
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


## Changelog
- v1 (2026-11-05): created
