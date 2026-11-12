# Prompt Forge

A NovelAI script that turns an idea into a ready-to-paste **NovelAI Diffusion V5** setup: Model & Settings, Base Prompt, Base UC, and one prompt and UC per character, with positions.

It's built for GLM-4.6 (Xialong) with a 28k context, which can't search tag lists and loses the thread on long instructions. So the work is split:

| The script does (code, never sent to the model) | The model does (one small call each) |
|---|---|
| Settings block, count tag, tail (year, rating, complexity), Base UC | **Plan the shot**: idea → one frozen moment (who, where, when, light, camera, moment, mood) |
| Style blocks and artist mixes as saved presets | **Scene tags**: picks place/time/light tags from a menu of real tags |
| Tag cleanup: case, underscores, renamed and alias tags, banned tags | **Pose and face**: picks posture, gesture, expression, gaze and acts per character, from a menu |
| Checks every tag against a 45k-entry Danbooru/e621 vocab | **Prose**: 2–5 plain sentences on placement, who does what, and light |
| One tag per exclusive group; framing trims; hidden-anchor drops | **Build a look**: description → head, body and outfit slot lines, from menus |
| `source#`/`target#`/`mutual#`, positions, bleed-guard UC, age guard | |
| The pre-flight checklist from the vault's image rules (v8) | |

Each call is about 600–1,700 tokens: a short card, one or two examples, the input, and a menu of real tags when the step picks tags. The answer is parsed and checked. A bad answer gets one retry that names the exact problem (a pronoun, a missing line, tags not on the menu). Then it's applied, and Undo can take it back.

## Generation goes through Send

Script generations (`api.v1.generate`) come out of a token budget that refills slowly. Prompt Forge runs its steps as ordinary editor generations instead, the same as pressing Send. Its hooks swap the story context for the step's own messages and keep the reply out of the document. The budgeted background path is still there as a Settings option.

NovelAI caps how many editor generations a script can start without you touching anything. When the chain hits the cap, the panel says **Press Send to run this step**, and Send carries on. You can also **arm** any step with its ⏎ button, so every Send runs (and rerolls) that step.

## Install

1. In NovelAI, open a new story to use as the workspace. Open its scripts and add a script. Paste in `dist/prompt-forge.js`, or import `dist/Prompt Forge.story` if you've packed one (see below).
2. Open the **Prompt Forge** panel under the editor, or use the **Forge** toolbar button for a floating window.
3. Click **Use this story**. Stories that aren't Forge workspaces are never touched; there, the script only acts on steps you start from its panel.
4. Grant the permissions as they come up:
   - document editing writes the finished blocks into the story
   - clipboard copies blocks
   - Lorebook editing keeps the library
   - story edit sets each step's temperature and length, then restores yours
5. **Library → Seed built-in styles and kits** writes the vault's style blocks (Vivid Pop, Painterly Comic and its add-ons, Anime Pinup, Semirealistic) and the face and body kits into the Lorebook, where you can edit them.

## Use

- **Build** tab, top to bottom: write an idea → **Plan the shot** → camera and canvas → **Pick scene tags** → cast (saved looks, or blanks) → **Pick pose** per character → **Write prose**. Or press **Run all steps**.
- **Output** tab: the checks, every block with its own Copy button, **Copy all**, **Write to document**, and **Save setup**. Saving archives a dated copy in the story.
- **Characters** tab: reusable looks laid out to the character standard (head to toe, one slot per line, outfits kept separate). Describe a character in plain words and build the head, body and outfit one part at a time. Apply a face or body kit. **Save to Lorebook**.
- **Keep as example** on any good answer saves it to the Lorebook. The two closest examples (by rating, cast size and framing) replace the built-in example in that step's future calls. This is how the model learns your taste.
- **Library → Cards**: each step's card is visible. **Edit in Lorebook** copies it there, and from then on the script uses your text.

## The library lives in the Lorebook

Five categories: `Forge · Characters`, `Forge · Styles`, `Forge · Kits`, `Forge · Examples` and `Forge · Cards`. They're created **disabled**, so nothing in them reaches story context; the script reads them and puts in each call only what that call needs. Every entry is plain text you can edit by hand. The formats are in [docs/DESIGN.md](docs/DESIGN.md#library-formats).

## Files

| Path | What |
|---|---|
| `src/` | TypeScript/TSX source, concatenated in file-name order |
| `data/vocab.json` | Tag vocab from Waifoundry's merged Danbooru/e621 table, plus the vault's tag files (`tools/extract_vocab.py`) |
| `dist/prompt-forge.js` | The built script (about 1 MB, under the 2 MB account-script limit) |
| `docs/novelai/` | NovelAI's script typings and documentation, as supplied |
| `docs/DESIGN.md` | How it works and why, and what still needs checking in NovelAI |
| `test/` | Unit tests for the rules, assembler and job parsers; `test/smoke/` runs the built script against a mock API with real Preact |
| `tools/` | `build.mjs`, `extract_vocab.py`, `pack_story.py` |

## Build and test

Needs Node and the global `tsc` (TypeScript 6). No npm packages for the build.

```bash
node tools/build.mjs test
```

```bash
node tools/build.mjs
```

```bash
(cd test/smoke && npm install) && node test/smoke/harness.mjs dist/prompt-forge.js
```

To pack a `.story`, export any NovelAI story with a script attached, to use as a template:

```bash
python3 -I tools/pack_story.py path/to/template.story
```

Rebuilding the vocab needs the Waifoundry HTML:

```bash
python3 -I tools/extract_vocab.py path/to/Waifoundry.html --vault ..
```
