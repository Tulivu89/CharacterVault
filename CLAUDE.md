# Story Vault

Scope, content limits, craft, the co-writer persona and the bracket controls are in the system prompt: the **Story Vault** output style (`.claude/output-styles/story-vault.md`), selected in `.claude/settings.json`. If this session isn't running that style, read that file before any story, note or image turn and follow it. The system prompt, this file, the skills and the notes are the vault's whole rulebook: if other instructions name a guidelines document that isn't here, don't stop to ask for it.

## Session tools

- **`vault-session`** runs on the primer, on any bracket command except [stop], [pause], [resume], [rewind], [check], [tone], [cast], [state], [show], [help], [img] and [persona: off/on], when invoked by name, and when the user asks to start, workshop, pitch, resume or continue a story. Running it turns on the story text autosave for the session.
- **`pulp-voice`** (the vault's own, in `.claude/skills/`; not an account copy named `anthropic-skills:pulp-voice`) shapes every story turn. Load it once per session; it says when to read its references.
- **Images.** `[img]` or `[img: …]`, or a request for an image or NovelAI prompt, runs `nai-v5-images`: an out-of-character V5 setup for the current beat or the brief. It doesn't advance the story or touch notes unless asked to save; the next message resumes at the same beat.
- **Maintenance.** Changes to scripts, hooks, skills, templates, settings, docs, this file or the output style run `vault-dev`.
- **Canon.** `story-profile.md` holds the user's defaults, co-writer, style, kinks, limits and completed stories. A story's note in `Stories/` holds its cast and ages, premise, rules, state and last beat; its prose is in its text parts.
- **Hooks.** Session start brings the active story's state and cast, and the co-writer if one is set. `[help]`, `[cast]`, `[state]`, `[show]`, `[list]`, `[lint]` and `[lore]` are answered without reaching Claude. Lore entries the user's message mentions arrive marked "Lore from the vault"; treat them as canon. After each story turn the Stop hook saves the reply word for word to the story's text part and commits it. Without hooks, run the vault script for those commands and print its output.

## The vault

An Obsidian vault (`Home.md` is the dashboard); Claude reads and writes the same files.

| Note | Template | Saved as |
|---|---|---|
| Character page | Character | `Characters/<Name>/<Name>.md` |
| Roleplay profile / user persona / story bio | Profile - Roleplay / User Persona / Story Bio | `Characters/<Name>/<Name> - <Profile>.md` |
| Adult file | Adult | `Characters/<Name>/<Name> - Adult.md` or `<Name> - <Profile> - Adult.md` |
| Prompt note | Legacy/Image Prompt | `Characters/<Name>/<Name> - Prompt - <Look>.md` |
| Setting | Setting | `Settings/<Title>.md` |
| Story | Story | `Stories/<Title>.md` |
| Story text | written by the script | `Stories/<Title>/<Title> - Part NN.md` |

**Rules the vault keeps:**
- Character pages hold essentials only and stay `rating: sfw`. Story-specific ages, roles and drift go in profiles.
- `stage` is child / teen / adult / elder. Child and teen profiles are always `rating: sfw` and never get an adult file. Adult images go in `Characters/<Name>/images/adult/`.
- Adult files attach only to adult and elder stages. Character pages and profiles never link or embed them.
- `age` and `body_age` live in frontmatter. Nonhumans carry a `mind` line.
- `world` names the world on every note type. Lore loads only from the active story's world.

**Use the script, not hand-copying.** `python3 .claude/scripts/vault.py`:
- `new <character|roleplay|persona|bio|adult|setting|story> "<Title>" [--character NAME] [--profile NAME]`, then fill the sections with edits.
- `show <note> [<note> …] [--canon]`: notes without `base` blocks or template guidance, several per call. `--canon` in play unless the story has `drafts: on`. Refuses an adult file that fails the stage rules.
- `cast <story>`, `state <story>`, `text <story> --status`, `list [type] [--world W] [--character NAME]`, `seeds`, `lint`, `help`.

**Git.** Pull before editing notes. Commit note changes in one call: `vault.py save "<story>"` after [save], otherwise `vault.py commit "<message>"` (`Done: <story>`, `Profile: …`, `Add <note>`, `Style: K-n`). Both lint, commit only the note folders, and push.
