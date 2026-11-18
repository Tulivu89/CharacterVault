# Roadmap

What's planned for the vault's machinery, so a new session can pick it up cold. Newest decisions first.

## Where we are relative to sharing

The shared template (`AmbiguousProphet/CiC-Vault`) gets the machinery and docs, never notes, images, the profile or the style library.

| Piece | Ready to share? | What's left |
|---|---|---|
| Co-writer fixes, session-start sync, mood lint | Yes, once PR #29 merges | — |
| Vault app v1 (read-only: home, stories and reader, characters and galleries, worlds, co-writers, search, settings) | Yes | Real-phone check over GitHub. Write side (Inbox) not built. |
| Index schema 2, `vault.py app`, card thumbnails | Yes | — |
| Userscript | No, frozen | Stays out of releases. |
| Image prompt controls | Personal | Your version only, added to the app later. |
| Release tool (`vault.py release`, `release.txt`) | Built | Run `vault.py release <template checkout> --prune`, review, commit and push the template. |
| Layman setup guide (`SETUP.md`) | Yes | Needs on the template repo: *Template repository* ticked, and GitHub Pages on (main, root) for the hosted app link. |
| Continuity reader | Not built | Design below. |

## 1. Vault app (replaces the userscript as the main UI)

**v1 is built:** `app/index.html`, one file, no build step, read-only. Home (active story with cast, state and last beat; open stories; characters; worlds; co-writers; profile), stories with a reader for the text parts, characters by world with galleries, lightbox, tabs for every note in their folder, worlds with the characters linked to them, co-writers with mood faces, search, settings (local or GitHub, branch, adult toggle, theme). Copy buttons put a message or an image on the clipboard for the chat. `vault.py app` serves it locally; GitHub mode picks the branch with the newest vault index.

Next for the app: image prompt controls (personal build), the Inbox write side, and an ideas/drafts board.

- **Reads** the repo through the GitHub API with a fine-grained token (Contents: read on the vault repo only). Runs from the file, a private host, or as a starting point in AI Studio.
- **Data:** `.claude/ui/vault-index.json` and `personas.json` become the one contract, with a `schemaVersion`. v2 adds each story's text parts and word counts, every image per character (portraits, moods, adult kept separate), lore entries and an ideas/drafts list.
- **Views:** stories (state, last beat, a reader for the text parts), characters by world with galleries and profiles, settings and lore, ideas and drafts, co-writers.
- **Into the chat:** every card has "Copy to chat" (a ready prompt: `pick up X`, `[pitch: X]`, `[show X]`, a draft excerpt) and images you can drag into the message box.
- **Writes** go only to `Inbox/` (ideas, drafts, images), with an optional write token. vault-session files the inbox at the next session, so the app never fights a session over the same note.
- **The userscript** (`tools/story-vault.user.js`) is frozen and stays out of releases. It's the only thing that can decorate claude.ai's own chat (faces, buttons); revisit as an optional "chat skin" after the app. Known bugs if revived: `REPO` hard-coded, reads `HEAD` while cloud sessions write to `claude/*` branches, and shows the default co-writer's face whichever one was chosen (`coWriter` instead of the session's choice). The mod in `.claude/mods/story-vault-ui/` has the same face bug.

## 2. Continuity reader (a lorebook that reads)

A cheap model flags what the main session should keep in front of it, especially what has sunk into the middle of a long context. Lag-one: it runs after a turn and its flags arrive with the next prompt, so play never waits on it.

- **Trigger:** the Stop hook, after the autosave, in play only. It starts `vault.py reader --session <id>` detached and exits.
- **Layer 1, script only:** re-surface a lore entry when its key comes back after a long silence (today an entry loads once per session and then sinks); flag a State section that contradicts itself (two "remaining" figures, two current days); bring a character's `Under pressure` line when they enter.
- **Layer 2, model:** headless Claude on Haiku, no project settings (`claude -p --model haiku --setting-sources ""`; measured here at ~3 s and ~$0.002 a call). Input, gathered by the script and capped: the story note's State and Threads, the last few beats, the user's standing directions from the whole session (bracketed tone, rewind and out-of-character notes), and when each cast member, lore key and State item was last mentioned. Output: at most five one-line flags, each with its source.
- **Delivery:** `.claude/state/reader-<session>.json`; the prompt hook injects it as "Continuity reader: a smaller model's flags; check them against the notes, canon wins", about 120 words at most. Nothing arrives if the reader hasn't finished or returned nothing.
- **Off switch:** `VAULT_READER=0`.
- **To test first:** that the cheap model handles the story's explicit material as extraction work, and that a detached process survives the hook's exit in a cloud container.

## 3. Images

- **Vault → chat:** a `{pic: <path or character>}` marker a UI swaps for the image. Plain text where no UI runs.
- **Chat → vault:** check whether an image attached in a cloud session lands on disk. If it does, `vault.py image add <file> <Character> [--mood m]` files it, makes thumbnails, and reads NovelAI metadata (`tools/nai_meta.py`) into the prompt note. If not, the app's Inbox is the way in.
- Move the personal pose sets out of `.claude/skills/nai-v5-images/references/poses/sets/` into vault notes so the skill stays generic.

## 4. Release

Built: `vault.py release [<dir>] [--prune]` reads `release.txt` (what ships, what the template keeps, what to strip, forbidden text), refuses when a strip rule matches nothing or a name from this vault appears, writes nothing until every check passes, then runs the template's lint and tests. `tests/test_age_gate.py` now lives here too.

## 5. Agents

- `continuity` (Sonnet, report only, after `[save]`): contradictions and a proposed State rewrite.
- `image-setup` (Sonnet, personal): runs `nai-v5-images` in its own context so its references never land in the story's.
- DRAFT only: `draft-writer` (Opus) pipes the chapter to `vault.py text "<story>"` and replies in one line; `line-notes` (Sonnet) flags, never rewrites.
- Every agent file tells it to read `.claude/output-styles/story-vault.md` and the story note first; agents don't run under the output style and the hooks don't reach them. The Stop hook ignores agent output, so prose must go through `vault.py text`.

## 6. Housekeeping

- Move `translation/`, `nai-prompt-forge/` and `3d models/` to their own repos (about 19 MB cloned into every session).
- Co-writer faces in `Co-writers/<Name>/moods/` instead of a character page, so a co-writer is one portable folder.
- `[save]` rewrites State as a current snapshot instead of adding to it.

## Done

- Session start no longer asks for the co-writer; the first prompt that isn't a viewer command does.
- Session start fast-forwards a fresh cloud branch to main instead of failing its pull, and names branches holding unmerged note work.
- Lint warns when a co-writer's examples skip its moods, or a mood has no image.
