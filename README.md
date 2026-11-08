# Story Vault

A Claude Code setup for adult roleplay and fiction writing, built as an Obsidian vault. Obsidian is the viewer and editor; Claude Code reads and writes the same notes.

**New here? Read [GUIDE.md](GUIDE.md)** for setup, note types, age variants, play controls and troubleshooting.

## What's here

| Path | What it is |
|---|---|
| `.claude/output-styles/story-vault.md` | The system prompt (Story Vault output style): scope, image limits, craft, bracket controls. |
| `CLAUDE.md` | Vault instructions: note types, vault rules, script, Git. Loaded every session. |
| `.claude/skills/vault-dev/` | Maintenance guidance for the script, hooks, skills, templates and docs. |
| `.claude/skills/pulp-voice/` | The prose skill: anti-patterns, voices, heat (sex scenes), registers. |
| `.claude/skills/vault-session/` | Starts, sets up, resumes, saves and logs stories; runs the cast scope check; keeps the style library. |
| `.claude/scripts/vault.py` | Creates notes from templates, loads notes without Obsidian-only blocks, prints cast and state, lints the vault. Python 3, standard library only. |
| `.claude/hooks/` + `.claude/settings.json` | Session start loads the active story; viewer commands answer without a model turn; lore entries load when mentioned; story text saves after each story turn; status line shows the story and last beat. |
| `.claude/mods/story-vault-ui/` | Claude Code mod: command buttons above the prompt, a Story pane, co-writer bubbles. Draws in a terminal (Termux included), the desktop app or VS Code; start with `claude --plugin-dir .claude/mods/story-vault-ui`. |
| `tools/story-vault.user.js` | Tampermonkey/Violentmonkey userscript for claude.ai/code in a browser: command buttons and co-writer bubbles. |
| `Home.md` | Obsidian dashboard: open stories, latest text, characters, settings, commands. |
| `Templates/` | Character, roleplay profile, user persona, story bio, adult file, setting, story. |
| `Style/reference.md` | Your Keep and Avoid examples, logged in play with `[keep]` and `[avoid]`. |
| `story-profile.md` | Your defaults, co-writer persona, style, kinks, limits and finished stories. Built on first use. |

## Setup

1. Make your own **private** copy of this repo. Vaults hold explicit material; keep them out of public repos.
2. Open the folder in Obsidian. Optional: set Settings → Templates → folder to `Templates`, and install Obsidian Git to sync.
3. Open the folder in Claude Code and send `prepare for fictional roleplay`, or `[setup]`.

## Moving an existing vault in

- Put your old templates in `Templates/Legacy/`. Notes made from them load cleanly, because the script strips guidance lines from every template it finds.
- Rename `universe` to `world` in frontmatter, and add `age` and `body_age` to profiles (and to character pages where they hold in every story). Nonhumans get a `mind` line.
- Run `python3 .claude/scripts/vault.py lint` and fix what it reports.

## In play

Bracket commands are listed in the Story Vault style (`.claude/output-styles/story-vault.md`). The ones you'll use most: `[setup]`, `[pitch]`, `[save]`, `[rewind]`, `[tone: harsher]`, `[cast]`, `[state]`, `[keep]`. Send `[help]` for the full menu.

**Free commands.** Send one of these as the whole message and a hook answers it without a model turn: `[help]`, `[cast]`, `[state]`, `[show <note>]`, `[list <type>]`, `[lint]`, `[lore <text>]`.

**The active story** is the most recently edited story note with `status: active`. Set others to `paused` to switch.

**Story text** saves itself word for word after each story turn, into `Stories/<Title>/<Title> - Part NN.md`. `[save]` adds the last beat and state. `VAULT_AUTOSAVE=0` turns the autosave off.

**Lore.** Bullets under a setting's `## Lore entries` load into the conversation once per session when their key comes up, for the active story's world only. Add extra keys with slashes: `**The Aedling Kingdom / gilts / chalks:**`.

**Hooks need Python 3** on the machine running Claude Code (`pkg install python` in Termux). Set `VAULT_AUTOPULL=0` to stop the session-start `git pull`. Hooks fail open: if one breaks, play continues without it.
