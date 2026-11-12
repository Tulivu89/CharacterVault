# Japanese → Vietnamese translation progress

## Current batch

**System.json: first pass complete for identified Japanese-bearing UI fields; awaiting review.**

Draft: `vi_draft/data/System.json`.

89 string fields changed. The ledger contains 90 entries including an unchanged currency symbol. All 74 Japanese-bearing candidate fields from the scope audit are covered. Additional English menu command labels were translated. HP/AP/SP and compact stat abbreviations remain as source abbreviations. Internal type names such as `armor1`, `kaijin`, and `kousoku1`, switch/variable names, paths, identifiers and unrelated settings remain unchanged; plugin inspection is required before deciding whether any need localization.

The title translation and “Saphiria” spelling are provisional, not approved branding. `怪人` is provisionally “Quái nhân”; approve this terminology using game context. The source uses custom AP/SP gauges but also MMP and other standard engine abbreviations, so their relationship should be checked in the playable game before expanding their names. Battle message substitution behavior should be checked in game as well.

**No file has passed human linguistic review or in-game QA.** “First pass” must not be read as release-ready.

## Files

| Status | Files | Meaning |
|---|---:|---|
| FIRST_PASS_UNREVIEWED | 1 | System UI draft produced; review and testing pending |
| NOT_STARTED | 136 | Likely displayed Japanese text exists; no translation produced |
| REVIEW_ONLY | 2 | No standard candidates, but notes/comments/editor labels need inspection |
| NO_STANDARD_TEXT_IDENTIFIED | 16 | No ordinary translation targets detected; not a guarantee that plugins expose no text |

`translation_progress.csv` lists every original JSON file with its status, English description, detected Japanese candidate count/character count, manual-review count and output location. Map descriptions give category counts rather than inventing an English plot summary. `system_translation_ledger.csv` records each worked-on field's JSON location, Japanese/English source text, Vietnamese draft and English meaning. These files are UTF-8 with BOM for spreadsheet compatibility.

## Validation performed

- Output JSON parses and preserves the source object keys, array lengths and value types.
- Only allowed System title/element/UI term fields changed; unrelated configuration is unchanged.
- Placeholder and RPG Maker escape-code token multisets match for every changed string.
- Every Japanese-bearing System UI candidate identified by the audit has a ledger entry.
- Original ZIP and other game files are unchanged.

No playable build was supplied. Vietnamese font rendering, wrapping, custom UI widths and actual runtime plugin behavior remain untested. Native Vietnamese proofreading and Japanese-source review remain pending.

## Using the draft

Keep the original project backed up. Copy `vi_draft/data/System.json` into the `data` folder of a **separate test copy** of the matching game version, replacing only that copy's System.json. This draft is a complete System.json with untranslated settings retained, not a standalone game. Do not overwrite the original ZIP or use the draft as a final release without testing.

## Continuing work

Suggested next batches: item/skill names and descriptions to establish terminology, character names and speaker-name glossary, then dialogue grouped by map/scene. Review plugin text and variable-held text alongside each scene. Keep speaker relationships/pronouns in a shared glossary as context becomes available.

For every later batch, update the translated copies, an auditable per-field ledger, and `translation_progress.csv` together. Use PARTIAL when only part of a file is translated; use FIRST_PASS_UNREVIEWED only after the agreed text fields are covered; record HUMAN_REVIEWED and IN_GAME_QA_PASSED as distinct milestones. Mark any skipped content explicitly rather than silently treating a file as complete.

`scope/start_translation.py` reproduces this initial batch and its tracker from the source ZIP. It is an initial-batch generator, **not an incremental updater**: do not rerun it over later progress, because it overwrites these outputs and resets statuses. The original structural audit remains under `scope/`.
