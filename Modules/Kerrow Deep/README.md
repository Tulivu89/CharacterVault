# Kerrow Deep: a Utility Class module

On a Rim mining station, convicts are reclassified as infrastructure for public use, and they work off sentences measured in liters. This module is a drop-in setting for a **Claude is Claude (CiC) story vault**, the Claude Code and Obsidian vault with `vault.py`, the `vault-session` skill and the hooks. Play any role, utility, client or overseer, with your own species and gender, against a ready-made cast. Or direct, and Claude writes everyone.

**Adult fiction.** Every character is an adult. Users are sapient only. Your vault's `CLAUDE.md` sets scope, and this module never widens it.

## What's inside

| Path | What it is |
|---|---|
| `Settings/Kerrow Deep.md` | The whole rulebook: the Statute, LEDGER, the kit, the utility ring, the cutaway, exchange rates, rating credit, tiers, Frame postures, the Yield Program, overseers, places, peoples, the arc, role slots, and 26 lore entries. |
| `Characters/<Name>/` | 21 characters, each with a character page and a `- Kerrow Deep` roleplay profile. |
| `Stories/Kerrow Deep — Start as a Utility.md` | PLAY starter: you're newly reclassified. |
| `Stories/Kerrow Deep — Start as a Client.md` | PLAY starter: your first week with a badge. |
| `Stories/Kerrow Deep — Start as an Overseer.md` | PLAY starter: your first caseload. |
| `Stories/Kerrow Deep — Direct.md` | DIRECT starter: pick a lead, Claude writes everyone. |
| `Stories/Utility Class — Manuscript.md` | Sample story: Ilse Brandt's Days 9–10, seven chapters, about 10,500 words. |

## Install

**Whole module.** Copy the `Kerrow Deep` folder anywhere in your vault, for example under `Modules/`. `vault.py` and the hooks find notes in any folder, so nothing needs moving. Then run:

```
python3 .claude/scripts/vault.py lint
python3 .claude/scripts/vault.py list character --world "Kerrow Deep"
```

**Pieces only.** Every note stands alone:
- Take just `Settings/Kerrow Deep.md` for the rules and lore, and write your own cast.
- Take single character folders into your own setting. Change `world` in their frontmatter and drop the `- Kerrow Deep` profile, or keep it as a variant.
- The lore entries are plain bullets, easy to paste into another setting's `## Lore entries`.

**Already have an Imperial Sector?** Kerrow sits on its Rim. Either keep `world: "[[Kerrow Deep]]"` as its own world, or change `world` on the module's notes to your sector so they share lore.

## Play

1. Copy a starter in `Stories/`, rename it, and set `status: active`. Set any other active story to `paused`.
2. For PLAY, make your character: `python3 .claude/scripts/vault.py new persona "<Name>" --character "<Name>" --profile "Kerrow Deep"`. Create the character page first with `new character`. Give it `age` (18+), species, gender and, for nonhumans, a `mind` line.
3. Send `[setup]`. The session runs the cast check, proposes mode, POV and the opening beat, and fills in the cast lines you left open.
4. Use the usual controls: `[save]`, `[rewind]`, `[tone: harsher]`, `[cast]`, `[state]`.

### Role options
- **Utility:** female, or male with the **utility ring**. Male utilities take deposits the same way. The ring meters his own output and credits it 1:1 when it goes to a client during a badged use. The handler can put a **ring hold** on his orgasm.
- **Client:** any species and gender. Your badge sets your reach: Concourse, Shower Block or Executive Ring. Female clients earn the utility **rating credit**: your stars convert to volume at the male range of your species, so a five-star from a female canine Therian pays like a canine male's top yield.
- **Overseer:** cheerful, disciplinary, ex-utility, or your own style. You run 6–10 utilities and hold postings, privileges, violations, the compliance pulse and the ring hold.

### Choosing species
The rulebook's Peoples section gives each species' mind, body, naming language and ledger quirks. Aedelvass glow, Aedling inscriptions, canine knots, porcine corkscrews, Draxian growth and Cephalite spermatophores each change how a scene plays and how it pays.

## Draft lines
Lines tagged **[draft]** are proposals: the newer roster members, the male-utility Yield contract, equine and Cephalite Frame postures, and whether ring output and rating credit stack. Keep them, change them or delete the tag. The vault only loads `[draft]` lines when a story has `drafts: on`.

## Credits
Built from the *Utility Class* story by the vault owner, with Claude.
