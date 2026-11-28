---
type: setting
aliases: []
cover:
world: "[[Smith House]]"
status: draft
rating: sfw
version: 1
tags: [setting]
created: 2026-11-28
---
# Smith House
> The Smith family, all grown up: two kids at the same college, a quiet house, a bored genius in the garage, and two Beths.

*Untagged lines are canon. **[draft]** marks proposals waiting on approval.*

## Premise
An adult remix of the Smith family. [[Morty Smith]] (18) and [[Summer Smith]] (21) are both at a state university an hour from home. [[Beth Smith]] and [[Jerry Smith]] are alone in the house with [[Rick Sanchez]] in the garage, and [[Space Beth]] keeps dropping in between wars. The models know the source; these notes are about how the family acts now that everyone's an adult.

## Tone
Black comedy that can turn on a dime into horror, grief or sex. Cruelty is funny until it isn't. Nobody learns a lesson that sticks.

## Core rules
- Rick's tech makes anything possible: portals, clones, alternate realities, other worlds. Consequences still land on people.
- The engine is the family, not the gadget: every adventure is about who needs whom and who won't say so.
- Everyone here is an adult and can say no now, to Rick and to each other. That's new, and it changes everything.

## The wider world
- Infinite realities and alien worlds a portal away. Use what a scene needs; no need to recap the source.

## Places
- **The house:** suburban, too quiet now. Kitchen island, wine rack, the kids' rooms kept like museums.
- **The garage:** Rick's lab, bar and bedroom. Nobody goes in without being invited, and everybody does.
- **The university:** state school, an hour away. Morty's shared dorm room; Summer's off-campus apartment with two roommates.

## Peoples
- Humans, mostly. Everything else is a portal away.

## Conflict axes
- Rick getting old vs. Rick refusing to.
- The kids' new adulthood vs. Rick's need to be needed.
- Beth vs. Space Beth: which one is real, which one Rick prefers, which life was right.
- Jerry vs. everyone, and his fear that the empty nest means Beth goes next.

## Arc
1. The quiet house; someone gets bored.
2. An adventure drags the college kids home or the adults to campus.
3. A line gets crossed that can't be uncrossed.
4. Fallout at the dinner table.

## Protagonist slot
- **Fixed:** the family and their ages.
- **Open:** the user may play any family member, or an outsider: a roommate, a date, a rival genius, an alien.

## Cast notes
- [[Rick Sanchez]] (72) — bored, aging, drinking, looking for one more adventure.
- [[Morty Smith]] (18) — freshman trying to be normal; learning to say no.
- [[Summer Smith]] (21) — junior; Rick's new favorite partner in crime.
- [[Beth Smith]] (37) — empty nest, wine, rivalry with herself.
- [[Space Beth]] (37) — drops in between wars; envies the life she left.
- [[Jerry Smith]] (38) — alone in the house with the people who scare him most.

## Lore entries
- **The garage / Rick's lab:** Rick's lab, bar and bedroom off the Smith kitchen. Smells of solder, ozone and rum. The portal gun charges on the workbench.
- **The university / campus / dorm:** a state school an hour from the Smith house. Morty shares a dorm room with a roommate who's starting to ask questions; Summer has an off-campus apartment with two roommates.
- **Portal / portal gun:** Rick's device; opens a green door anywhere, any reality. It makes leaving easy, which is the family's whole problem.

## Open questions
- Which Beth is the original? Deliberately unanswered.

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
- v1 (2026-11-28): created
