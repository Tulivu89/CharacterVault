# Prompt Forge: design

How the script turns a limited model into a usable V5 prompt writer, and what still has to be confirmed inside NovelAI.

## The rule

**Anything a rule can decide is code. The model only does what needs language, one small thing per call.**

The vault's image skill (`nai-v5-images`, rules v8) is about 45 KB of guidance written for a model that can read reference files. GLM-4.6 with 28k context can't hold that, can't search a tag CSV, and copies examples more faithfully than it follows rules. So almost everything in v8 became code (`src/03-rules.ts`, `src/05-assemble.ts`), and the model got five narrow jobs (`src/06-jobs.ts`).

| v8 section | Where it lives now |
|---|---|
| §0 defaults, §5 settings | `settingsBlock`, `DEFAULT_IMAGE_SETTINGS`, Build → Image settings |
| §2 tiers, §3 plan | The **Plan the shot** job (idea → WHO/WHERE/WHEN/LIGHT/CAMERA/MOMENT/MOOD/RATING) |
| §4 output format, complete combos | `assemble` → `Blocks`; `blocksText`; the document render |
| §6 field division | `assemble`: appearance only in boxes; single-character state in the base, multi-character state in boxes; a shared `looking at another` stays in the base |
| §7 tag rules | `cleanTag`: lowercase, underscores, `RENAMED`, alias canonicalisation, `BANNED_POSITIVE`, no `|`; `checkUnknown` with near-spelling suggestions; artist/copyright post counts |
| §8 tags vs prose | Tag picks come from menus; the prose card and `checkProse` (pronouns, "camera", quotes, sequence words, senses, articles) |
| §9 exclusive groups | `EXCLUSIVE_GROUPS`, `checkExclusive`, `onePerGroup` on model picks; `-1::close-up::` for full body |
| §10 base order | `assemble`: datasets → count → objects → scene → background → camera → state → acts, `. ` prose, then extras → medium → style → tail |
| §11 character prompts | Character standard slots (`LOOK_SLOTS`, `OUTFIT_SLOTS`), `trimFor` framing trims, closed eyes drop eye colour, cowboy shot drops feet tags by vocab category |
| §12 multi-character | `countTag`, `autoPositions`, `positionGloss`, interactions → `source#`/`target#`/`mutual#`; sex-position tags go to the base |
| §14 artists and style | Style blocks pasted verbatim; `withRating` puts `rating:` before a block's own year tag |
| §15 tail | `year`, `rating:`, complexity, optional `very aesthetic, best quality` |
| §16 UC | Lean / Human Focus / the style block's UC; drops for comics, text and add-ons; tags the prompt asks for are removed from UC; `nsfw` only for general; bleed guard, `extra ears`, age guard, stabilizer |
| §17 weighting | `checkWeights`: unclosed `::`, emphasis budget, A1111/Midjourney syntax; the digit bug is fixed automatically |
| §20 visual filter | Mood → `EMOTION_CUES`; the prose card forbids feelings, backstory, sounds and smells |
| §21 explicit | Rating-aware tag checks, the explicit layer only in explicit setups, age-lowering tags removed and errored above general, age words in prose errored |
| §25 checklist | The Checks panel (errors, warnings, collapsible notes) |

Not ported: §13 copyright-character recipes, §18 text and comics layouts, §22–23 iteration and diagnostics (those are for a person at the image generator), and the long pose libraries (they belong in a future Poses category of the library).

## Generation path

```
panel click / Send
  └─ onGenerationRequested  bind the pending (or armed) step to this continuityId
     └─ onBeforeContextBuild   switch off story text, memory, A/N, prefill, system prompt, lorebook
        └─ onContextBuilt      replace the messages with the step's own (card + examples + input + menu)
           └─ onResponse       collect the reply; return empty text so nothing lands in the document
              └─ onGenerationEnd  parse → retry once with the named problem, or apply (Undo-able) → next queued step
```

- **Why Send:** script generations (`api.v1.generate`) are limited by the script's input and output token allowance (`api.v1.script.getAllowedOutput`), which only refills while the user interacts. An editor generation is the user's own generation. The background path is kept as an option, and checks the allowance before every call.
- **The cap:** script-started editor generations are limited without user action (three, per NovelAI's docs). A queued chain shows **Press Send to run this step** when it stops, and Send binds the waiting step. Arming (⏎) makes every Send run that step, which is also the reroll button.
- **Temperature and length per step:** with story-edit permission, `generationParameters.update` sets the step's temperature and max tokens before the generation, and the story's own values come back afterwards (also on Stop).
- **Output capture:** `onResponse` returns empty strings. If NovelAI ever objects to empty replies, Settings → Model reply → Scratch streams into a scratch paragraph that's removed afterwards.
- **Context viewer:** a dry-run context build with a step armed shows that step's messages, so NovelAI's context viewer displays exactly what the model gets.
- **Other stories:** with "Use this story" off, hooks only act on steps started from the panel. Send in other stories is never blocked or rewritten.

## Jobs

| Job | Temperature | Max tokens | Menu | Output format |
|---|---|---|---|---|
| Plan the shot | 0.7 | 320 | none | `WHO / WHERE / WHEN / LIGHT / CAMERA / MOMENT / MOOD / RATING` |
| Scene tags | 0.4 | 140 | setting + lighting (+ the vault's light and place lists, background options) | `TAGS: …` / `BACKGROUND: …` |
| Pose and face | 0.5 | 160 | pose, expression, eyes, gaze (+ acts, + sex acts at questionable/explicit) | `POSTURE / GESTURE / EXPRESSION / GAZE / ACT: tag > who` |
| Prose | 0.75 | 280 | none | 2–5 sentences |
| Look: head and face / body | 0.5 | 420 | hair, eyes, species, ears, horns, makeup, marks / skin, chest, waist, hips, legs, tail… | slot lines |
| Outfit | 0.5 | 320 | outfit categories | outfit slot lines |

Every message list is `system: preamble + card`, then example pairs as user/assistant turns, then `user: input + MENU`. Menus list real tags only, grouped by category, about 60–90 per category. Parsers accept markdown, preambles, wrapped lines and `-`/`none`. Tags off the menu are kept if they're real tags, otherwise reported; for the scene job they're passed on to the prose. The prose parser runs the same lint as the assembler and retries on pronouns, "camera", quotes, names or age words.

**Examples are the strongest lever.** A kept example (Keep as example) replaces the built-in one for that step, matched by rating, cast size and framing (or head/body for looks). The menu is stripped from a kept input so examples stay short.

## Library formats

All entries are plain text in disabled Lorebook categories. `[section]` headers, `key: value` lines. Characters, styles and kits start with an `id:` line; setups refer to them by it, so keep it when editing.

**Character** (`Forge · Characters`, entry name = character name, never emitted):

```
id: k3x9a1qz
gender: girl
label: tall fox girl in tank top

[look]
identity: fox girl, tall female, muscular female
hair: long hair, ponytail, red hair, colored tips. Red hair fades to white at tips.
headExtras: fox ears, animal ear fluff
eyes: green eyes, tsurime

[outfit: Garage]
headNeck: goggles on head
top: white tank top. Tank top smeared with grease.
footwear: black boots
uc: dress, skirt

[uc]
short hair, black hair

[explicit]
(used only in explicit setups)
```

Look keys: `identity, hair, hairHidden, headExtras, faceShape, faceModel, eyes, faceMarks, skin, upper, torso, lower, tail`. Outfit keys: `headNeck, top, outer, hands, bottom, legwear, footwear, props, state`.

**Style block** (`Forge · Styles`):

```
own tail: yes          (the block carries its own year/quality; rating goes in before its year)
guidance: 3
note: …

[base]
…verbatim…

[uc]
…verbatim…

[addon: Dark fantasy]
…
uc drop: dark, in shadows
```

**Kit** (`Forge · Kits`): `kind: face|body`, then `[identity]`, `[faceShape]`, `[faceModel]`, `[upper]`… sections with text added to those slots, and `[uc]`.

**Example** (`Forge · Examples`): `job: prose`, `tags: general, 2 characters, cowboy shot`, `[input]`, `[output]`.

**Card** (`Forge · Cards`): entry name `Card: <key>` (`brief, scene, pose, prose, look, lookBody, outfit`), text = the card.

## State

Story storage keys: `forge.fresh` (set in a packed story; the first run clears the template text), `forge.setup` (current setup), `forge.saved` (saved setups), `forge.settings`, `forge.enabled`, `forge.doc` (section IDs of the rendered blocks), `forge.sheets.fallback` (characters saved when Lorebook editing is refused). The store is one `createStore` shared by the panel and the floating window.

## Size

`dist/prompt-forge.js` is about 1 MB: 866 KB of vocab (3.7k curated general tags, 34k artists and 7k copyrights with post counts, 4k aliases, the vault's tag lists) and about 180 KB of code. That leaves room under the 2 MB account-script limit. If it gets tight, artists under 200 posts are the first cut (−300 KB). Compressing the vocab is the second.

## Build

`tools/build.mjs` type-checks every source file against NovelAI's own typings (`docs/novelai/`; the JSX typings get `declare` added on load) and concatenates them into one script with `tsc --outFile`, JSX compiled to `h()` calls. TypeScript 7 removes `--outFile`; when that lands, swap in esbuild or similar with the same file order.

## Tests

- `node tools/build.mjs test`: 107 checks on the pure modules. They cover the worked example from the image skill, framing trims, explicit-rating rules, prose lint, style tails, exclusive groups, every job parser fed messy answers, and library text round trips.
- `test/smoke/harness.mjs`: 36 checks running the built script with real Preact in jsdom against a mock API. The mock fires the hooks in NovelAI's order with canned GLM replies. Covered: the full chain with a retry and the cap, Send running an armed step, the background path, Stop, document render, Lorebook IO, seeding, kits, saving setups, persistence.

## To confirm inside NovelAI

These follow the typings and docs but haven't been run in the real app:

1. Editor generations started with `api.v1.editor.generate()` aren't counted against the script's token allowance.
2. Returning empty strings from `onResponse` keeps the reply out of the document without an error toast. If it doesn't, switch Settings → Model reply to Scratch.
3. `generationParameters.update` before `editor.generate` applies to that generation.
4. The `--theme-*` custom property names (`bg0`–`bg3`, `textMain`, `textHeadings`, `textHighlight`, `warning`, `textDisabled`) match what JSX parts receive. If not, the fallback colours apply.
5. `useStoreValue` re-renders on `STORE.set` inside JSX parts.
6. The packed story's seeded storage. `tools/pack_story.py` writes `forge.enabled` and `forge.fresh` JSON-encoded under the script id (and the container id), matching how other scripts' values appear in exported stories. If NovelAI keys story storage differently, the story simply opens with the "Use this story" banner and the template text stays until Settings → **Clear the document**.

## Next

- A Lorebook panel (`lorebookPanel` + `onLorebookEntrySelected`) that validates a Forge entry as you edit it.
- A Poses library category from the vault's pose modules, offered as picks in the pose step.
- Waifoundry convergence: its PNG metadata export (`makeNaiPng`) would let one drag fill every NovelAI box at once.
- Comics and text layouts (§18).
