# RPG Maker MZ translation scope

## Result

All 155 JSON files in `translation/data.zip` parsed successfully. The archive contains 141 map files and 14 database/index files. It contains no JavaScript plugin sources, plugin configuration, images, fonts or audio, so this is a **data-folder estimate**, not a complete game localization quote.

The scan found **4,726 Japanese-bearing likely player-facing string occurrences**, containing **57,224 raw source characters**, across **137 files**. Exact deduplication gives **2,648 distinct strings / 42,431 raw characters**. These are source character counts, not Japanese words or Vietnamese output words. Punctuation, formatting codes, Latin characters and whitespace inside those strings count toward raw characters. Japanese-script characters alone total 47,477. Deduplication compares exact string content; contextual translations can still differ.

Repeated speaker-name fields account for 1,175 occurrences / 4,130 characters. Excluding these fields leaves 3,551 occurrences / 53,094 characters, with 2,589 distinct strings / 42,076 characters. Do not add this subtotal to the headline total.

## Files to translate

Only the player-facing fields below need translation, not whole JSON documents.

| File/group | Japanese-bearing occurrences | Raw characters | What to look for |
|---|---:|---:|---|
| `Map###.json` (126 of 141 maps have candidates) | 4,017 | 49,409 | Event dialogue, choices, speaker names, map `displayName`, plugin text |
| `CommonEvents.json` | 89 | 1,559 | Shared event dialogue and plugin text |
| `Troops.json` | 20 | 356 | Battle event dialogue and speaker names; not troop editor names |
| `Actors.json` | 8 | 50 | `name`, `nickname`, `profile` when populated |
| `Classes.json` | 1 | 6 | `name` |
| `Items.json` | 225 | 2,258 | `name`, `description` |
| `Weapons.json` | 8 | 161 | `name`, `description` |
| `Armors.json` | 35 | 646 | `name`, `description` |
| `Skills.json` | 133 | 1,401 | `name`, `description`, `message1`, `message2` |
| `Enemies.json` | 11 | 83 | `name` |
| `States.json` | 105 | 682 | `name`, battle messages |
| `System.json` | 74 | 613 | Game title, currency, menu and battle terms, displayed type/element names |

Within event `list` arrays, command **401** holds dialogue lines, **102** holds choices, and **101 parameter 4** holds speaker names. Commands **405** (scrolling text) and **320/324/325** (actor name/nickname/profile changes) are recognized by the scanner but yielded no Japanese-bearing candidates in this archive. One string is not necessarily one dialogue box: several 401 lines can belong to one box.

### Text in plugins

Command **357** is a plugin command. Identified likely displayed text:

- `DTextPicture` → `dText` → `text`: text drawn into pictures.
- `DestinationWindow` → `SET_DESTINATION` → `destination`: objective/destination text.
- `BattleLogOutput` → `OUTPUT_LOG` → `message`: battle log messages.

Together these contain 202 Japanese-bearing strings / 4,705 characters, already included above. Another six strings / 103 characters in `SoR_GabWindow_MZ_Right` → `PushGab` → `arg1` need confirmation against the plugin source before inclusion.

## Manual review before a fixed quote

These are separate review buckets, not confirmed extra dialogue:

| Review bucket | Occurrences | Raw characters | Why review |
|---|---:|---:|---|
| Other event parameters | 264 | 2,251 | Japanese strings in Control Variables (122); may feed displayed variables or act as internal identifiers |
| Gab-window arguments | 6 | 103 | Likely popup text, but plugin source is absent |
| Other plugin arguments | 15 | 135 | May be identifiers or configuration rather than text |
| Script command | 1 | 72 | Script continuation (655); inspect neighboring commands and translate only displayed string literals |
| Database/map note fields | 187 | 9,955 | Plugin tags, instructions and possible displayed text are mixed |
| Event comments | 1,922 | 19,022 | Usually developer annotations; some plugins interpret comments |
| `MapInfos.json` map names | 139 | 875 | Usually editor-only; plugins may display them |

Review plugin sources before assuming any bucket is fully translatable or fully irrelevant. `Animations.json` and `Tilesets.json` have no standard player-facing candidates in this scan; their asset names and configuration should not be translated automatically. Non-Japanese strings can still need localization: the inventory includes all nonempty string leaves it visits, and the summary includes an all-language candidate subtotal.

### Avoid double billing / accidental breakage

- **657** records are plugin editor mirrors: 4,167 Japanese-bearing strings / 54,173 characters. Do not count these as independent dialogue. If an editor-safe translation pipeline synchronizes them, they should agree with the real arguments rather than creating a second translation charge.
- **402** choice-branch labels mirror choices: 190 occurrences / 885 characters. The actual 102 choices are counted once. A translation pipeline may synchronize branch labels for editor consistency.
- Internal event/database names, switch/variable names, asset filenames, IDs and script identifiers are not ordinary translation targets. The inventory labels these conservatively; plugin inspection can reveal exceptions.
- Preserve JSON structure, numeric values, event command codes, references, plugin keys and escape codes such as `\\V[n]`, `\\N[n]`, `\\C[n]`, `\\I[n]`, plus `%1`/`%2` substitution tokens and plugin markup. Translate surrounding prose only.

## What is missing for a complete quote

Request the developer's full project or at least:

1. `js/plugins.js` and the referenced `js/plugins/*.js`: inspect plugin settings, custom menus, hardcoded UI text and tag/comment behavior. Ask whether core scripts were customized.
2. `img/` and any movies: Japanese embedded in title/menu art, signs, tutorials, credits or scene images needs a separate graphics/subtitle scope.
3. A playable build, access to all routes/scenes (or a walkthrough/test saves), and the target platform: needed for completeness and layout testing.
4. Font configuration and bundled fonts: verify Vietnamese diacritics, combining marks, line height, wrapping and text-picture sizing in game.

## Pricing basis

Use **about 57,200 raw Japanese-bearing source characters / 4,726 occurrences** as the currently identified data-text workload. The **42,400 exact-unique-character** subtotal is a reuse reference, not an automatic billable reduction: identical Japanese can need different Vietnamese by context. The manual review and missing assets can increase scope. Do not quote the ZIP's file size or a Japanese word count based on spaces.

Separate extraction/reinsertion engineering, AI-assisted translation, terminology/context review, native Vietnamese proofreading, and in-game QA. AI API cost alone does not cover these tasks. Since the translator cannot read either source Japanese or target Vietnamese, budget qualified Japanese-to-Vietnamese review and obtain the developer's agreement on quality expectations before committing to a fixed delivery price. Avoid an English pivot if direct Japanese-to-Vietnamese translation and bilingual review are available.

For AI budgeting, tokenize a representative sample with the actual model's tokenizer and include prompt/context, output and revision passes; these character counts do not establish token cost. Tool selection should later verify documented adult-content support, privacy/client authorization, RPG Maker MZ import/export support, and preservation of control codes. No translation provider was selected or tested in this audit.

## Deliverables and reproduction

- `files.csv`: per-file/category Japanese-bearing counts; filter categories starting `translate_` to obtain the candidate file list.
- `text_locations.csv`: JSON-pointer-style locations, classification, character counts, Japanese-bearing flag and SHA-256 of exact text. **No dialogue text is exported.** Array offsets are zero-based. Filter `japanese_bearing=True` and `category=translate_*` for the headline scope.
- `summary.json`: category totals, exact deduplication and archive fingerprint.
- `audit_scope.py`: repeatable read-only inventory script. Run `python3 translation/scope/audit_scope.py` from the repository root, or pass a ZIP path. It overwrites its own report CSV/JSON files only.

The original ZIP and game data were not changed. This is a structural audit; it does not establish that every candidate is reachable in normal gameplay, nor replace a playthrough or plugin/asset audit.
