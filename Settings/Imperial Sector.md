---
type: setting
aliases: []
cover:
world: "[[Imperial Sector]]"
status: draft
rating: suggestive
version: 1
tags: [setting]
created: 2026-11-05
---
# Imperial Sector
> Empire core, colonial Rim and deep void, and everyone the Empire has a use for.

*Untagged lines are canon. **[draft]** marks proposals waiting on approval.*

## Premise
*Stub built from the character notes. Nothing here is new canon; the gaps are yours to fill.*

A sci-fi setting of Empire core, colonial Rim and deep void. Species detail lives in [[sci-fi-species]].

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
- Aedling, Aedelvass, Human, Therian, Draxian, Cephalite, Vreth and Remnant Synthetic. See [[sci-fi-species]].

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
- 

## Lore entries
*One bullet each: a bold key, then a short entry. An entry loads into play when its key comes up; add more keys with slashes: **The Aedling Kingdom / gilts / chalks:***
- **Entry:** 

## Open questions
- [[sci-fi-species]] is written as lorebook text, so it doesn't load as lore entries yet.
- Aedling also names the kingdom in [[The Aerie]]. Same people, or a reused name?

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
