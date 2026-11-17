# Lara Translate batch

Sending one file to Lara covers the whole identified game text except System.json, which was translated by hand earlier.

| File | What it is |
|---|---|
| `for_lara.json` | **Upload this.** 1,933 unique player-facing Japanese strings, 41,857 characters of text, one `"ID":"text"` per line |
| `for_lara_sample.json` | 51 entries (833 characters of text, 1,320 for the whole file). Upload this first to see how Lara counts |
| `for_lara_part1.json`, `for_lara_part2.json` | The same content split into two halves of about 21k characters each, for use if one upload is too much |
| `glossary.csv` | Character names and their spellings. These are locked so Lara can't vary them |
| `lara_map.json` | Where each ID goes back in the game. Don't edit it |
| `lara.py` | `extract`, `apply`, `verify` |

ID prefixes: **B** database (items, skills, states, weapons, armour, enemies, actors), **M** map names, **N** speaker names, **P** plugin text (picture text, objectives, battle log), **C** choices, **D** dialogue boxes. A dialogue box's lines are sent as one entry, so Lara sees whole sentences. Each string is listed once however many times it appears, and its translation goes back to every place it occurs.

## Steps

1. **Check the count.** Upload `for_lara_sample.json` and see how much of your quota it used.
   - About 830 characters means Lara counts only the text. The full file will cost about **42k**, so upload `for_lara.json`.
   - About 1,320 characters means Lara counts the whole file. The full file would cost about **64k**, which is over 60k, so upload `for_lara_part1.json` now and `part2` when the quota resets.
2. **Download** the translated JSON Lara gives back and put it in `translation/lara/` (any name, e.g. `from_lara.json`).
3. **Apply** (from the repository root):

   ```bash
   python3 translation/lara/lara.py apply translation/lara/from_lara.json
   ```

   If you uploaded two parts, pass both: `apply …/part1_vi.json …/part2_vi.json`. This writes the translated game files to `vi_draft/data/`, writes `lara_translation_ledger.csv` (one row per ID: Japanese, Vietnamese, status) and updates `translation_progress.csv`.
4. **Verify:**

   ```bash
   python3 translation/lara/lara.py verify
   ```

   This checks every file against the original: same structure, same event commands, same escape codes. It also counts dialogue still in Japanese and boxes that ran over 4 lines.
5. **Test in game.** Copy `vi_draft/data/*.json` into the `data` folder of a **separate copy** of the game.

## Protected text

Before upload, these are replaced with numbered placeholders like `{0}`. Lara has nothing to translate or break there, and `apply` puts the originals back.

- RPG Maker escape codes (`\c[27]`, `\v[298]`, `\i[15]`, `\>`, `\vc\ac` …) and `%1`.
- Choice conditions such as `if(v[197]>=1)`.
- Alignment padding (runs of full-width spaces, blank lines).
- Names listed in `glossary.csv` that have a Vietnamese value.

Codes at the very start or end of a string are taken off before upload and put back afterwards, so most entries carry no placeholders at all.

If Lara loses or duplicates a placeholder, or leaves an ID out, `apply` **keeps the Japanese for that string** rather than risk breaking the game. The ledger marks it `KEPT_JAPANESE` and says why. Fix the line in Lara's returned file (or translate it by hand there) and run `apply` again. Rerunning is free: it always starts from the original `data.zip`.

## First result (from_lara.json)

The first apply kept 11 strings in Japanese. In each, Lara had dropped or repeated a name placeholder. Those 11 are retranslated by hand in `fixes.json`, which goes **last** on the command line so it overrides Lara's versions:

```bash
python3 translation/lara/lara.py apply translation/lara/from_lara.json translation/lara/fixes.json
```

Lara translates each line separately. Where the Japanese broke a line mid-sentence, it returned two half-sentences, often with part of the first half repeated (`Đó là mùi của xịt khử mùi\nkhông phải là mùi của xịt khử mùi đó sao?`). `lara.py resend` collects the 233 entries with such breaks into `for_lara_resend.json` (8,461 characters of text, 11,017 for the whole file), joining each broken sentence so Lara sees it whole. Translate it, save the result as e.g. `from_lara_resend.json`, and add it to the apply command before `fixes.json`.

## Names

`glossary.csv` sets one spelling per name: Ayako, Saphiria, Maya, Rio, Misaki, Kagehisa Kayato, Fukumi Shinta and so on. Spellings with furigana in the game data are reliable. The others are marked *provisional* in the note column. **To change a spelling, edit `glossary.csv` and run `apply` again; there's no need to send anything to Lara.** To lock a new name, add a row and run `extract` again **before** uploading. `ブラックメノー` has no spelling yet, so Lara will translate it freely until you add one.

## Dialogue line length

Vietnamese runs longer than Japanese. `apply` keeps Lara's line breaks when every line fits, and otherwise rewraps the box at **70 visible characters**. A box that ends up longer than 4 lines is split into extra boxes, each repeating the original speaker and face. If text overflows the window in game, rerun with a smaller width, e.g. `--width 60`. If lines are needlessly short, use a larger one.

## What this is not

This is a machine draft. Lara has no context for who's speaking to whom, so Vietnamese pronouns (anh/em/chị/cô/tôi/mình…) will often be wrong. A native Vietnamese reviewer needs to check them scene by scene. The game is adult content, so check Lara's terms and watch for lines it refused, skipped or softened. The ledger keeps the Japanese next to each Vietnamese line for that review. The items in `scope/TRANSLATION_SCOPE.md`'s manual-review buckets (variables set from text, gab windows, notes, comments) are not included.
