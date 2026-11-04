# Story Vault

A Claude Code setup for adult roleplay and fiction writing, built as an Obsidian vault. Obsidian is the viewer and editor; Claude Code reads and writes the same notes.

## What's here

| Path | What it is |
|---|---|
| `CLAUDE.md` | The base instructions: scope, craft, bracket controls, vault rules. Loaded every session. |
| `.claude/skills/rp-session/` | Starts, sets up, resumes, saves and logs stories; runs the cast scope check; keeps the style library. |
| `.claude/scripts/vault.py` | Creates notes from templates, loads notes without Obsidian-only blocks, prints cast and state, lints the vault. Python 3, standard library only. |
| `Templates/` | Character, roleplay profile, user persona, story bio, adult file, setting, story. |
| `Style/reference.md` | Your Keep and Avoid examples, logged in play with `[keep]` and `[avoid]`. |
| `story-profile.md` | Your defaults, style, kinks, limits and finished stories. Built on first use. |

## Setup

1. Make your own **private** copy of this repo. Vaults hold explicit material; keep them out of public repos.
2. Open the folder in Obsidian. Optional: set Settings → Templates → folder to `Templates`, and install Obsidian Git to sync.
3. Open the folder in Claude Code and send `prepare for fictional roleplay`, or `[setup]`.

## Moving an existing vault in

- Put your old templates in `Templates/Legacy/`. Notes made from them load cleanly, because the script strips guidance lines from every template it finds.
- Rename `universe` to `world` in frontmatter, and add `age` and `body_age` to profiles (and to character pages where they hold in every story). Nonhumans get a `mind` line.
- Run `python3 .claude/scripts/vault.py lint` and fix what it reports.

## In play

Bracket commands are listed in `CLAUDE.md`. The ones you'll use most: `[setup]`, `[save]`, `[rewind]`, `[tone: harsher]`, `[cast]`, `[state]`, `[keep]`.
