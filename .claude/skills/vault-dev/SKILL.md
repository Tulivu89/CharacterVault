---
name: vault-dev
description: Maintain and extend the vault's machinery — vault.py, the hooks, settings.json, skills and their references, templates, the Story Vault output style, CLAUDE.md, GUIDE.md, README.md and module packaging. Use when the user asks to fix, change, add or debug any of these, when a hook or lint fails, or when adding a note type, command or module. Not for writing fiction, notes or image setups.
---

# Vault development

The Story Vault output style leaves out Claude Code's built-in software-engineering instructions. This skill brings back the part the vault needs. For a large job (a new subsystem, a refactor of `vault.py`), suggest the user switch to the full engineering prompt with `/output-style default` for that session, and back with `/output-style Story Vault` afterwards.

## Where things live

| Part | Path | Notes |
|---|---|---|
| Scope, craft, controls | `.claude/output-styles/story-vault.md` | The system prompt. The only place scope is written. |
| Vault facts and tools | `CLAUDE.md` | Note types, vault rules, script usage, Git. Loaded every session. |
| Script | `.claude/scripts/vault.py` | Python 3, standard library only. Notes, cast/state, show, list, lint. |
| Hooks | `.claude/hooks/*.py`, `.claude/settings.json` | Session start, prompt (viewer commands, lore), stop (story text autosave), status line. They fail open. |
| Skills | `.claude/skills/<name>/SKILL.md` + `references/` | References load only when the skill reads them. |
| Templates | `Templates/`, `Templates/Legacy/` | `vault.py new` reads them; frontmatter fields are load-bearing. |
| Docs | `GUIDE.md`, `README.md` | User-facing. Update them when behavior changes. |
| Modules | `Modules/<Name>/` | Drop-in settings for other vaults; they defer to the host vault's scope. |
| Shared template | `AmbiguousProphet/CiC-Vault` (public) | Gets the machinery and docs, never the user's notes, profile or style library. `nai-v5-images`, the output style's Images subsection, the `[img]` row and image lines in `CLAUDE.md` and `GUIDE.md` are personal and stay out. |

## How to work

1. **Pull first.** `git pull` on the current branch.
2. **Read before editing.** Read the file and whatever calls it: a script change means reading the hooks that import `vault.py`; a template change means reading the `vault.py` code that parses its fields; a skill change means reading its references and anything that points at it.
3. **Make the smallest change that does the job.** Match the existing style. No new dependencies: the script and hooks run on stock Python 3. Don't refactor what wasn't asked for.
4. **Keep scope in one place.** Never restate scope or content limits in a skill, template, note or doc. Point to the system prompt (the Story Vault style) instead.
5. **Hooks stay fast and fail open.** They have 20–30 s timeouts. An error must let the prompt through, never block the session.
6. **Skills:** the `description` decides when a skill triggers, so keep it precise. Put detail that's needed only sometimes in `references/`, and say in SKILL.md when to read it.
7. **When changes take effect.** Selecting an output style applies from the next message. An edit to a style file or to `CLAUDE.md` loads at the next session start. Say which applies when you change one.

## Verify

Run what you changed before you report it done:

- `python3 .claude/scripts/vault.py lint`. It must end with 0 errors.
- The command you touched, on a real note: `show`, `cast`, `state`, `list`, `new` (create a test note in the scratchpad, never in the vault).
- A hook: pipe sample JSON into it, e.g. `echo '{"prompt":"[cast]"}' | python3 .claude/hooks/prompt.py`, and check both the output and that an error passes through. Test `stop.py` only in a scratch copy of the vault with a fake transcript: it writes and commits story text.
- A skill: re-read the edited section against its checklist, and check that every file it names exists.

Report what changed, what you ran and the result. If something couldn't be tested, say so.

## Git

Commit with a message that says what changed: `Dev: <change>` for machinery, `Docs: <change>` for GUIDE/README, and the vault's own conventions for notes (`Save:`, `Profile:`, `Add <note>`, `Images:`, `Looks:`). Then push. Changes to scope, the output style or `CLAUDE.md` go on a branch for the user to review before they merge.
