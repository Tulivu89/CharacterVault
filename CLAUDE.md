# Story Vault

Scope, content limits, craft rules and the bracket controls are in the system prompt: the **Story Vault** output style (`.claude/output-styles/story-vault.md`), selected in `.claude/settings.json`. If this session isn't running that style, read that file before any story, note or image turn and follow it as written.

This file covers the vault and its tools.

## Session tools

- The `vault-session` skill runs on the primer message, on any bracket command except [stop], [pause], [resume], [rewind], [check], [tone], [cast], [state], [show] and [img], when the user invokes it by name, and when the user asks to start, workshop, pitch or resume a story.
- **Images.** `[img]` or `[img: …]`, or a request for an image or NovelAI prompt, runs the `nai-v5-images` skill: an out-of-character V5 setup for the current beat or the brief. It doesn't advance the story or touch notes unless asked to save; the next message resumes at the same beat.
- **Maintenance.** Changes to scripts, hooks, skills, templates, settings, docs, this file or the output style run the `vault-dev` skill.
- The story profile (`story-profile.md`) holds the user's defaults, style, kinks, limits and completed stories. A story's note in `Stories/` is its canon: cast and ages, premise, rules, state and last beat.
- **Hooks.** When the vault's hooks run, the active story's state and cast arrive at session start, `[cast]`, `[state]`, `[show]`, `[list]`, `[lint]` and `[lore]` are answered without reaching Claude, and lore entries the user's message mentions arrive as context marked "Lore from the vault". Treat that lore as canon for the story. Without hooks, run the vault script for those commands and print its output.

## The vault

This repo is an Obsidian vault. Obsidian is the viewer; Claude reads and writes the same files.

| Note | Template | Saved as |
|---|---|---|
| Character page | Character | `Characters/<Name>/<Name>.md` |
| Roleplay profile | Profile - Roleplay | `Characters/<Name>/<Name> - <Profile>.md` |
| User persona | Profile - User Persona | `Characters/<Name>/<Name> - <Profile>.md` |
| Story bio / variant | Profile - Story Bio | `Characters/<Name>/<Name> - <Profile>.md` |
| Adult file | Adult | `Characters/<Name>/<Name> - Adult.md` or `<Name> - <Profile> - Adult.md` |
| Prompt note | Legacy/Image Prompt | `Characters/<Name>/<Name> - Prompt - <Look>.md` |
| Setting | Setting | `Settings/<Title>.md` |
| Story | Story | `Stories/<Title>.md` |

**Rules the vault keeps:**
- Character pages hold essentials only and stay `rating: sfw`. Story-specific ages, roles and drift go in profiles.
- `stage` is child / teen / adult / elder. Child and teen profiles are always `rating: sfw` and never get an adult file. Adult images go in `Characters/<Name>/images/adult/`.
- Adult files attach only to adult and elder stages. Character pages and profiles never link or embed them.
- `age` and `body_age` live in frontmatter. Nonhumans carry a `mind` line.
- `world` names the world on every note type. Lore loads only from the active story's world.

**Use the script, not hand-copying.** `python3 .claude/scripts/vault.py`:
- `new <character|roleplay|persona|bio|adult|setting|story> "<Title>" [--character NAME] [--profile NAME]` creates a note from its template; then fill its sections with edits.
- `show <note> [--canon]` loads a note without Obsidian's `base` blocks or template guidance. Use `--canon` in play unless the story has `drafts: on`. It refuses an adult file that fails the stage rules.
- `cast <story>` and `state <story>` print what the scope check and resume need.
- `list [type] [--world W] [--character NAME]` and `lint` (run before committing note changes).

**Git.** Pull before editing notes. After [save], [done], a profile change or a new note, commit (`Save: <story>`, `Profile: …`, `Add <note>`) and push.
