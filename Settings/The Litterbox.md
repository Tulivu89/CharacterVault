---
type: setting
aliases: []
cover:
world: "[[The Litterbox]]"
status: draft
rating: suggestive
version: 1
tags: [setting]
created: 2026-11-05
---
# The Litterbox
> An old wolf signs for five troubled cats through the agency and takes them home.

*Untagged lines are canon. **[draft]** marks proposals waiting on approval.*

## Premise
*Stub built from the character notes. Nothing here is new canon; the gaps are yours to fill.*

Pops, a wolf in his fifties, signed for five adult cats through the agency: Sunny, Rusty, Jet, Cleo and Misty. The apartment and the house rules are his, and the agency holds him responsible for every one of them.

## Tone


## Core rules
*How magic, power and the setting's key mechanics work.*
- 

## The wider world
*Only what presses on this setting. Leave the rest of the map alone.*
- 

## Places
- **The Litterbox.** The rough complex the cats came out of. Jet lived on its roof, and Barnaby filed to evict Misty.
- **The apartment.** Pops's place, under his rules.
- **Neon Nights.** A 24-hour corner store two blocks from the apartment, where Toby works graveyard.

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
- **Fixed:** the user plays [[Pops]], the sponsor.
- **Open:** where the story starts.

## Cast notes
*Who lives here and what they want. Full details go on character pages and profiles.*
- [[Pops]]: the wolf who signed for them, fifties.
- [[Sunny]]: 19, Rusty's littermate. Placed and sent back twice before.
- [[Rusty]]: 19, Sunny's littermate. Zero dating-app matches and dishwashing shifts at a diner.
- [[Jet]]: 21, placed instead of charges.
- [[Cleo]]: 20, a court-ordered placement.
- [[Misty]]: 20, placed after an eviction filing. Secretly seeing Toby.
- [[Toby]]: 20, golden retriever boy, clerk at Neon Nights.

## Lore entries
*One bullet each: a bold key, then a short entry. An entry loads into play when its key comes up; add more keys with slashes: **The Aedling Kingdom / gilts / chalks:***
- **The agency / placement / sponsor:** places cats with sponsors, and holds the sponsor responsible for them.
- **The Litterbox:** the rough complex the cats came out of.
- **Neon Nights:** a 24-hour corner store two blocks from the apartment.
- **Barnaby:** filed to evict Misty.

## Open questions
- Barnaby has no page.

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
