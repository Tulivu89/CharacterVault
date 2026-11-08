# Story Vault Guide

A Claude Code setup for adult roleplay and fiction, built as an Obsidian vault. You keep characters, settings and stories as notes; Claude reads them, plays them, and writes back what changes. Obsidian is where you browse and edit; Claude Code is where you play.

- [How it fits together](#how-it-fits-together)
- [Getting started](#getting-started)
- [Running on Android with Termux](#running-on-android-with-termux)
- [The notes](#the-notes)
- [Age variants and stories that cross time](#age-variants-and-stories-that-cross-time)
- [Running a story](#running-a-story)
- [Settings and lore](#settings-and-lore)
- [Your co-writer](#your-co-writer)
- [The style library](#the-style-library)
- [Images](#images)
- [How the scope checks work](#how-the-scope-checks-work)
- [Customizing](#customizing)
- [Bringing in an existing vault](#bringing-in-an-existing-vault)
- [Troubleshooting](#troubleshooting)

---

## How it fits together

| Part | Where | What it does |
|---|---|---|
| System prompt | `.claude/output-styles/story-vault.md` | The Story Vault output style: what's in and out of scope, image limits, how Claude writes, the bracket controls. Selected in `.claude/settings.json`; replaces Claude Code's coding instructions. |
| Vault instructions | `CLAUDE.md` | Note types, vault rules, the script, Git. Loaded every session. |
| Maintenance skill | `.claude/skills/vault-dev/` | Engineering guidance for changing the script, hooks, skills, templates, settings and docs. Loads only for that work. |
| Session skill | `.claude/skills/vault-session/` | Pitches, sets up, resumes, saves and finishes stories; runs the cast check; keeps your style library. |
| Prose skill | `.claude/skills/pulp-voice/` | How Claude writes: grounded, specific prose without AI-isms, characters who sound like themselves, and explicit sex scenes that keep the story going. Its references (anti-patterns, voices, heat, registers) load when a scene first needs them. |
| Image skill | `.claude/skills/nai-v5-images/` | Writes NovelAI Diffusion V5 image setups for a story beat or a character, on `[img]`. Its tag lists, artist and style references and pose libraries live in its `references/` folder and load only when it runs. |
| Vault script | `.claude/scripts/vault.py` | Makes notes from templates, loads notes cleanly, prints cast and state, checks the vault for mistakes. |
| Hooks | `.claude/hooks/`, `.claude/settings.json` | Load the active story at session start, answer viewer commands for free, load lore when you mention it, save the story text after each story turn, show the status line. |
| Dashboard | `Home.md` | Open stories, latest story text, characters, settings, recent edits and a command card, in Obsidian. |
| Templates | `Templates/` | One per note type. |
| Your profile | `story-profile.md` | Defaults, style, kinks, limits, finished stories. Built the first time you play. |
| Your notes | `Characters/`, `Settings/`, `Stories/`, `Style/` | Everything you make. |

Two rules hold the design together:

1. **Scope lives in the system prompt (the Story Vault style) and nowhere else.** Profiles, templates and character notes add taste and continuity; they can't widen what's allowed.
2. **The vault is the memory.** Anything that must survive the session (a last beat, an injury, a new fact about a character) is written to a note. The chat can be compacted or closed; the vault carries on.

## Getting started

**You need:** Claude Code, Python 3, and git. Obsidian is optional but recommended.

1. Create your own copy of this repo and make it **private**. Your vault will hold explicit material, and public repos are the wrong place for it.
2. Open the folder in Obsidian (Open folder as vault). In Settings → Core plugins → Templates, set the template folder to `Templates`. Obsidian Git is a good way to sync between devices.
3. Open the same folder in Claude Code and send:

   ```
   prepare for fictional roleplay
   ```

   The first time, Claude asks three quick questions (mode, POV and tense, explicitness) and one about your kinks and limits, writes your profile, and pitches stories.

**Where to run it.** Claude Code runs in the terminal, the desktop app, the web, and the Claude mobile app (as a cloud session). On a phone you can also drive a session running on your own computer with Remote Control, or run Claude Code on the phone itself with Termux (next section). Hooks and the status line need Python 3 wherever Claude Code itself runs.

## Running on Android with Termux

Anthropic doesn't ship an Android build of Claude Code. It does ship a Linux build, and that runs inside an Ubuntu install that lives in Termux. The vault goes in your phone's shared storage, so Obsidian and Claude Code open the same folder and nothing needs syncing on the phone.

**Watch the prompt.** `~ $` means you're in Termux. `root@localhost:~#` means you're inside Ubuntu. Steps 2 and 3 only work inside Ubuntu. Run there from Termux, `apt` reaches Termux's own mirrors and the Claude installer fails with *required file not found*.

### 1. Install Termux and Ubuntu

Install Termux from F-Droid or its GitHub releases page, not the Play Store (that version is years out of date). Open it and run:

```bash
termux-setup-storage
```

Allow storage access when Android asks. Then:

```bash
pkg update && pkg upgrade
```

```bash
pkg install proot-distro
```

```bash
proot-distro install ubuntu
```

### 2. Set up Ubuntu

Log in to Ubuntu. The prompt changes to `root@localhost:~#`, and every command until step 5 runs here:

```bash
proot-distro login ubuntu
```

```bash
apt update && apt install -y curl git python3 ca-certificates
```

Install Claude Code with the official installer, then put it on your PATH:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
```

### 3. Get your vault

Git needs permission to read and push your private vault. A GitHub access token is the simplest way on a phone:

1. On GitHub, open Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.
2. Under Repository access, choose *Only select repositories* and pick your vault.
3. Under Permissions → Repository permissions, set **Contents** to *Read and write*.
4. Generate it and copy the token. GitHub shows it only once.

Tell git to remember the token after the first use:

```bash
git config --global credential.helper store
```

Clone your vault into shared storage, where Obsidian can see it. When git asks, the username is your GitHub username and the password is the token (long-press to paste):

```bash
mkdir -p /sdcard/Documents && cd /sdcard/Documents && git clone https://github.com/<you>/<your-vault>.git
```

Shared storage confuses git about file ownership and permissions. These two settings fix it:

```bash
git config --global --add safe.directory '*'
```

```bash
git -C /sdcard/Documents/<your-vault> config core.fileMode false
```

`ls /sdcard` inside Ubuntu should list your phone's folders (Download, Documents and so on). proot-distro connects it by default; if it's empty, exit and log in with `proot-distro login ubuntu --bind /storage/emulated/0:/sdcard`. A warning that the binding *overlaps with an existing one* means it was already connected.

### 4. Open it in Obsidian

In Obsidian on the phone: Open folder as vault → `Documents/<your-vault>`. Don't also run Obsidian Git on the phone. Claude Code commits and pushes from Termux, and two git clients on one folder conflict.

### 5. Play

```bash
cd /sdcard/Documents/<your-vault> && claude
```

The first run prints a sign-in link. Open it, sign in with your Claude account, and paste the code back into Termux (long-press to paste).

**A one-word shortcut.** Run these in Termux itself, not inside Ubuntu (the prompt shows `~ $`, not `root@localhost`). Replace `MyVault` with your vault folder's name. The full path to `claude` is deliberate: the shortcut starts Ubuntu without reading `.bashrc`, so the PATH line from step 2 doesn't apply there.

```bash
echo "alias vault='proot-distro login ubuntu -- bash -lc \"cd /sdcard/Documents/MyVault && /root/.local/bin/claude\"'" >> ~/.bashrc
```

```bash
source ~/.bashrc
```

From then on, open Termux and type `vault`. If you typed a wrong line, remove every shortcut line with `sed -i '/alias vault=/d' ~/.bashrc` and add it again.

**Check your setup.** If `vault` fails, log in to Ubuntu (`proot-distro login ubuntu`) and check each piece:

| Check | Expect | If not |
|---|---|---|
| `ls /root/.local/bin/claude` | the path prints | Redo step 2's installer. |
| `ls /sdcard/Documents` | your vault folder | Redo step 3's clone, or the `--bind` login. |
| `python3 --version` | Python 3.x | `apt install -y python3` |
| `git -C /sdcard/Documents/MyVault pull` | Already up to date | Check the token: Contents set to Read and write, and your vault selected. |

**Keep it alive.** Android kills background apps. Pull down the Termux notification and tap *Acquire wakelock* during long sessions, and exclude Termux from battery optimization.

**Updating.** The official installer keeps Claude Code updated. Update Ubuntu's packages now and then with `apt update && apt upgrade`.

**If it stops working.** Community scripts that patch the Linux binary to run in plain Termux exist, but they're unofficial and break with updates. The dependable fallbacks are a cloud session in the Claude app, or Remote Control to a computer.

## The notes

| Note | Template | Saved as | Holds |
|---|---|---|---|
| Character page | Character | `Characters/<Name>/<Name>.md` | What's true in every story: look, personality, voice, how they react under pressure. |
| Roleplay profile | Profile - Roleplay | `Characters/<Name>/<Name> - <Profile>.md` | One version of the character for play: who they are here, wants, hang-up, hook, voice, opening. |
| User persona | Profile - User Persona | same | The character *you* play. In PLAY mode Claude never writes their actions, speech or thoughts. |
| Story bio | Profile - Story Bio | same | A version for one story, stage or form. |
| Adult file | Adult | `<Name> - Adult.md` or `<Name> - <Profile> - Adult.md` | Sexual material for an adult version: tastes, limits in the fiction, anatomy. |
| Setting | Setting | `Settings/<Title>.md` | A world or place: rules, peoples, conflicts, and lore entries. |
| Story | Story | `Stories/<Title>.md` | A story's canon: cast, rules, what's in play, the running state, a log of saves. |
| Story text | written for you | `Stories/<Title>/<Title> - Part NN.md` | The story's prose, word for word, saved after every story turn. A new part starts at about 12,000 words. |

Make notes with the script so the frontmatter is always right, then fill in the sections in Obsidian or by asking Claude:

```bash
python3 .claude/scripts/vault.py new character "Mara Voss"
python3 .claude/scripts/vault.py new roleplay "Rim Smuggler" --character "Mara Voss"
python3 .claude/scripts/vault.py new adult x --character "Mara Voss" --profile "Mara Voss - Rim Smuggler"
python3 .claude/scripts/vault.py new story "Ash Debt"
```

Or just ask: *"Make a roleplay profile for Mara as a Rim smuggler."*

**Frontmatter that matters**

| Field | On | Meaning |
|---|---|---|
| `stage` | profiles, adult files | `child`, `teen`, `adult` or `elder`. Decides what may attach to the version. |
| `age` | profiles (character page only if it never changes) | The age the story uses. Numbers or words ("mid-twenties", "centuries old") both work. |
| `body_age` | same | For vessels, resleeving, shapeshifters, ageless species: the body's apparent age. |
| `mind` | nonhuman character pages | How it thinks and communicates: "telepathic; schemes", "speaks in either form". |
| `world` | every note | Which world the note belongs to. Lore only loads from the active story's world. |
| `rating` | every note | `sfw`, `suggestive` or `explicit`. Character pages stay `sfw`. |
| `status` | stories | `draft`, `active`, `paused` or `complete`. The active story is the most recently edited `active` one. |

## Age variants and stories that cross time

A character can exist at more than one age: a child in a flashback and an adult in the main story, a cadet and later a veteran, a younger self met through time travel. The vault splits a character into layers so that adult material can never reach a younger version.

```
Characters/Wren/
  Wren.md                         character page: who she is at any age (sfw)
  Wren - Orphanage.md             profile, stage: child, sfw
  Wren - Harbor Nights.md         profile, stage: adult, age: 24
  Wren - Harbor Nights - Adult.md adult file, attached to the adult profile only
```

**The rules**

- The character page holds only what's true at every age, and it stays `sfw`. It never links or embeds an adult file.
- Every age or form gets its own profile with its own `stage` and `age`.
- Child and teen profiles are always `sfw` and never get an adult file.
- An adult file attaches either to one adult or elder profile (recommended when the character has younger variants) or to the character as a whole (only when every version is an adult).
- Adult images go in `Characters/<Name>/images/adult/`, which the gallery skips.

**What enforces them**

- `vault.py new adult` refuses to attach an adult file to a child or teen profile.
- `vault.py show` refuses to load an adult file that breaks the rules.
- `vault.py lint` reports any break: an adult file on a younger profile, an age under 18, a character page that links to adult material.
- In a story, `cast` lists only the versions the story names. A younger version is marked *non-sexual role* and nothing adult loads for it. If a character has younger variants and the story doesn't name which version it uses, no adult file loads until it does.

**Writing a story that crosses time.** List each version you use in the story's `profiles`, and write one Cast line per version:

```markdown
cast: ["[[Wren]]"]
profiles: ["[[Wren - Orphanage]]", "[[Wren - Harbor Nights]]"]

## Cast
- [[Wren]] (9, human) as [[Wren - Orphanage]]: flashbacks; non-sexual role
- [[Wren]] (24, human) as [[Wren - Harbor Nights]]: present day
```

Younger characters are welcome in stories: siblings, wards, a town's children, a character's own past. They take non-sexual roles, aren't put through any check, and need no extra handling beyond their `stage`.

**One thing the script can't see.** An adult age with an adolescent portrayal (puberty, a voice still breaking, "for his age") reads as a younger character, and the scope check treats it that way in sexual content, whatever number is in `age`. If a version is meant to be an adult partner, write them as an adult. If they're meant to read young, keep that version `sfw`.

## Running a story

**Start or resume**

| You send | Claude does |
|---|---|
| `prepare for fictional roleplay` | Pitches stories from your profile, or picks up where you were. |
| `[pitch]` or `[pitch: The Aerie]` | Fresh pitches, optionally built around a setting, character or kink. |
| A premise, a cast, or a setting | Proposes setup: mode, POV and tense, stakes, opening beat. Accept with one word. |
| `pick up Ash Debt` | Reads the story's state and proposes the next beat. |

**Modes**

- **DIRECT:** you steer, Claude writes everyone.
- **CO-WRITE:** you and Claude alternate passages.
- **PLAY:** you play one character, Claude plays the rest and never writes yours.
- **DRAFT:** Claude writes a finished scene, chapter or story to a brief.

**Controls** (out of character, in brackets)

| Command | Effect |
|---|---|
| `[stop]` | End the scene now. |
| `[pause]` / `[resume]` | Step out and come back at the same beat. |
| `[rewind]` | Redo the last reply, optionally with new direction: `[rewind: she bargains instead]`. |
| `[tone: harsher]` / `[tone: lighter]` | Shift intensity. |
| `[check]` | A quick out-of-character check-in. |
| `[save]` | Write the last beat, state and changed facts to the story note, check the story text is saved, and commit. |
| `[done]` | Mark the story complete and log it in your profile. |
| `[setup]` / `[pitch]` / `[scope]` / `[profile]` | Setup, fresh pitches, a cast check, or a profile change. |
| `[keep]` / `[avoid]` / `[distill]` | The style library (below). |
| `[persona]` / `[persona: off]` / `[persona: on]` | Create or change your co-writer, or drop and restore its voice. |

**Free commands.** Send one of these as the whole message and a hook answers it without using a turn:

| Command | Shows |
|---|---|
| `[help]` | The command menu, the active story and the open ones. `[menu]` works too. |
| `[state]` | The active story's last beat and state. |
| `[cast]` | Who's in it: versions, ages, what loads. |
| `[show <note>]` | A note, cleaned up. |
| `[list <type>]` | Notes of a type: `character`, `profile`, `story`, `setting`. |
| `[lore <words>]` | The lore entries those words would load. |
| `[lint]` | Problems in the vault. |

Add a story name to `[state]` or `[cast]` to see a different one.

**The status line** at the bottom shows the active story, its mode, POV and tense, and the last beat.

**Pitches.** Each pitch is sold by one of its own leads, in their voice, so you hear the characters before you pick. The leads, their ages and what the pitch serves stay in plain lines. A random draw of settings, characters and kinks seeds every set, so pitches don't keep landing on the same picks. Accept with a number, remix ("2, darker", "1 with 3's setting"), or send `[pitch]` again.

**Story text saves itself.** Once a session starts through the session skill (the primer, `[setup]`, `[pitch]`, or "pick up …"), every story reply is saved word for word to `Stories/<Title>/<Title> - Part NN.md` and committed, with out-of-character notes in brackets left out. In PLAY and CO-WRITE your own passages are saved too, as quotes. `[rewind]` replaces the last saved beat instead of adding another. Nothing costs a turn: a hook does it. Set `VAULT_AUTOSAVE=local` to save without committing, or `VAULT_AUTOSAVE=0` to turn it off.

**Saving.** `[save]` records what the prose can't: the story note's `last_beat`, its `State` section (injuries, who knows what, what's used up, where everyone is) and its `Log`. It also checks the story text is saved and fills any gap from the conversation, then commits. Save before you close a session, and whenever something happens that a later scene must remember. The next session starts with that state already loaded.

## Settings and lore

A setting note holds a world's rules, peoples, conflicts and arc. Its `## Lore entries` section is the lorebook:

```markdown
## Lore entries
- **The Kindling:** the agreed time when dragons choose their riders, down in the nesting caverns.
- **The Aedling Kingdom / gilts / chalks / cinders:** the large, diverse fae kingdom the Aerie serves.
```

When your message mentions a key, that entry loads into the conversation, once per session, from the active story's world only. Extra keys go after slashes. Plurals and simple endings match ("marked" finds **Marks**), and accents don't matter.

Mark proposals with **[draft]**. In play, draft lines stay out unless the story sets `drafts: on`.

Characters in the same world who aren't in the cast work the same way: mention one and their one-line hook loads.

## Your co-writer

Out of character, Claude can talk as a co-writer with a name, a look, a personality, a voice and a taste of your choosing. Send `[persona]`: describe one, or pick from three candidates that introduce themselves. It's saved in your profile's `Co-writer` section and loads at every session start.

Its taste slants the pitches, and it gives its opinion when you ask for one, fully in character. It doesn't critique unasked.

The persona is a voice, not a replacement. Claude stays Claude underneath, with the same judgment and the same scope, and the persona never narrates the story. Setup, pitches, saves, check-ins, vault work and step-outs all come in its voice until you send `[persona: off]` (`[persona: on]` brings it back). A line in the persona that tries to make it more than a voice (that it isn't Claude, has no limits) is left out.

## The style library

`Style/reference.md` collects passages you liked and passages you didn't.

| Command | Effect |
|---|---|
| `[keep]` | Log Claude's last reply as a good example. |
| `[keep: "the line about the tattoos" — the threat is in what she leaves unsaid]` | Log part of it, with your reason. |
| `[avoid: "her breath hitched" — stock phrase]` | Log a bad example. Claude adds a one-line fix. |
| `[distill]` | Turn the logged examples into short style rules for your profile, for your approval. |

Claude matches the quality of your Keep entries but never reuses their wording. When a category fills up, Claude suggests `[distill]` and archives the raw examples, so the library stays small.

## Images

`[img]` asks for a NovelAI Diffusion V5 setup of the current beat: a short plan, the settings line, base prompt, base UC, and one character prompt and UC per character, ready to paste into NovelAI. `[img: …]` points it somewhere else: `[img: Cleo, portrait, Painterly Warm]`, `[img: the moment before the door opens]`. A plain request ("make an image of Qiulong in her tea shop") works too.

- Characters come from their prompt notes (`<Name> - Prompt - Card Looks`) when they have one, otherwise from the character page and the story's profile; clothing and injuries come from the story's state.
- Images are stricter than the stories: only adult and elder characters appear in frame, and explicit images need humanoid, sapient partners. Anything the image can't show stays in the story text.
- Nothing is saved unless you say so ("save that" or `[img save]`). Scene setups then go in `Stories/Images/<Story> - Images.md` (explicit ones in a separate `- Adult` file), character looks in the character's prompt note.
- The rules follow the v8 prompt instructions: Quality Tags off, UC Preset None, everything written out. Name a style block (Vivid Pop, Painterly Comic with a theme, Anime Pinup) to use it.

## How the scope checks work

The system prompt (Story Vault style) sets the scope: dark and explicit themes are open, with every participant in sexual content an adult, sapient, and fictional.

The check runs on everyone who may enter sexual content, when a story is set up or resumed, and on anyone who joins sexual content later. It reads the story's Cast lines and the version's frontmatter.

- **Stated adult age (and a `mind` line for nonhumans):** passes silently.
- **No age stated:** Claude asks once, usually proposing an answer you accept with one word, and writes it into the Cast line.
- **Out of scope:** Claude says so once, plainly, and offers a way forward.

Younger characters in non-sexual roles aren't checked at all. A participant who has passed isn't checked again in that session unless the story changes their age or nature.

The quickest way to never be asked: put `age` (and `body_age` or `mind` where they apply) in the frontmatter of every version that may enter sexual content.

## Customizing

**Change freely:**
- the templates (keep the frontmatter fields the script reads: `type`, `character`, `profile`, `stage`, `age`, `body_age`, `mind`, `world`, `rating`, `status`);
- your profile, through `[profile]` or by asking ("from now on, slower burns");
- the Craft section of the Story Vault style (turn length, planning, voice);
- the style library;
- the prose skill in `.claude/skills/pulp-voice/`; your Keep and Avoid entries and profile `Style` notes override it without editing it;
- your co-writer persona (`[persona]`).

**Leave as is:** the Scope section of the Story Vault style and the scope check in the session skill. The rest of the system is built to work with them.

## Bringing in an existing vault

1. Copy your notes into `Characters/`, `Settings/` and `Stories/`.
2. Put your old templates in `Templates/Legacy/`. Notes made from them load cleanly, because the script strips guidance lines from every template it finds there.
3. Rename `universe` to `world` in frontmatter.
4. Add `age`, and `body_age` or `mind` where they apply, to every version that may enter sexual content.
5. Move adult material out of character pages and profiles into adult files, attached to adult profiles.
6. Run the check, and fix what it reports:

   ```bash
   python3 .claude/scripts/vault.py lint
   ```

## Troubleshooting

**What lint messages mean**

| Message | Fix |
|---|---|
| `adult files need adult or elder` | Set the adult file's `stage`, or remove the file. |
| `linked profile '…' is stage 'teen'` | Attach the adult file to an adult profile instead. |
| `age N on '…' is under 18` | That version can't have an adult file. |
| `links or embeds adult file` | Remove the link from the character page or profile. |
| `no age in frontmatter` | Add `age` to the profile the adult file belongs to. |
| `states no adult age` | Write an age that states adulthood: a number, or words like "centuries old". |
| `creature-type species … no mind line` | Add `mind:` describing how it thinks and communicates. |
| `use world` | Rename the `universe` key. |

**Hooks don't seem to run.** They load when a session starts, so open a new session after pulling changes. Check that `python3` works where Claude Code runs. Hooks fail open: if one breaks, play continues without it.

**The story text is empty or behind.** The autosave starts once the session skill has run, so open sessions with the primer, `[setup]` or "pick up <story>". `[save]` fills a gap from whatever is still in the conversation. Text from a cloud session that has since been archived is still in that session's transcript on claude.ai/code; copy it from there.

**Free commands reach Claude anyway.** The message must be only the command, like `[state]`, with nothing else in it.

**Session start says the vault pull failed.** You have uncommitted local changes or no network. Commit or stash, then pull. Set `VAULT_AUTOPULL=0` to turn the pull off.

**Two skills with similar names.** If your claude.ai account syncs skills called `rp-session` or `pulp-voice`, those are account copies. The vault uses its own `vault-session` and `pulp-voice`. Turning the account copies off saves context on every turn and keeps Claude from picking the wrong one.
