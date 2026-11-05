---
type: setting
aliases: []
cover:
world: "[[Volundale]]"
status: draft
rating: suggestive
version: 1
tags: [setting]
created: 2026-11-05
---
# Volundale
> Deposed queens, summoned demons and old magic, and the Spire full of the children they left behind.

*Untagged lines are canon. **[draft]** marks proposals waiting on approval.*

## Premise
*Stub built from the character notes. Nothing here is new canon; the gaps are yours to fill.*

A dark fantasy world of a dark lord's court, magic older than the Ordering, and the generation raised in the Spire. Different stories sit at different points in its timeline: Viola as Nostromandu's apprentice, then Viola as matriarch with grown daughters.

## Tone


## Core rules
*How magic, power and the setting's key mechanics work.*
- **The Ordering.** A turning point old enough that Takshaka predates it. The Old Ways and pre-Ordering magic come from before it.
- **Planar summoning.** Takshaka is a planar demon summoned to the material plane, and he treats it as a hunting ground he's caged in.

## The wider world
*Only what presses on this setting. Leave the rest of the map alone.*
- 

## Places
- **The Spire.** The tower where the next generation lives: Sarith, Morith and Rekka among them.
- **The dark lord's court.** Where Ilshaer sits as a puppet queen.

## Peoples
*Species, kin and factions. For nonhumans, say how they think and communicate.*
- **Wolven.** Therians, including the White Wolf Clan.
- **Naga demons.** Planar and summoned.
- **Elves.** High elves and dark elves.
- **Untellian.** Also called Aedless.
- **Damsent.** Includes the Succori subspecies.
- **Hellhounds.** Barghest's kind.

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
- [[Viola]]: Nostromandu's apprentice at 18, later a controlling matriarch.
- [[Nostromandu]]: "the Wizard's Wizard", Viola's teacher.
- [[Takshaka]]: planar naga demon, father of Sarith and Morith by Viola.
- [[Sarith]]: twin daughter of Viola and Takshaka.
- [[Gildra]]: the Witch Queen, before her sentence in hell.
- [[Ilshaer]]: the Bound Queen, deposed and a puppet in the dark lord's court.
- [[Lilibeth]]: the Sapphire Succori, a courtesan.
- [[Lysandra]]: a high elf, mother of Isavel.
- [[Rovak]]: the White Shadow, a tracker who has served dark lords.
- [[Vigga]]: the Iron Bitch, mother of Rekka and Vargr.
- [[Rekka]]: Vigga's daughter, a tower freeloader.
- [[Sekmawl]]: a crocodilian saurian.

## Lore entries
*One bullet each: a bold key, then a short entry. An entry loads into play when its key comes up; add more keys with slashes: **The Aedling Kingdom / gilts / chalks:***
- **The Ordering / pre-Ordering:** a turning point in the world's past. The Old Ways and the oldest magic come from before it.
- **The Spire:** the tower where the next generation lives.
- **Succori:** a subspecies of the Damsent.

## Open questions
- What was the Ordering, and who is the dark lord?
- Is Volundale part of Volungraiv, or are they separate? The names are close, so they're kept apart until you say.
- Morith and Isavel are named but have no pages.

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
