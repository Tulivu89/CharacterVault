---
type: setting
aliases: []
cover:
world:
status: draft
rating: sfw
version: 1
tags: [setting]
created: {{date}}
---
# {{title}}
> One-line premise: what happens here and to whom.

*Untagged lines are canon. **[draft]** marks proposals waiting on approval.*

## Premise


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
- 

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
- 

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
- v1 ({{date}}): created
