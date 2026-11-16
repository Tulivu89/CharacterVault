---
name: nai-v5-images
description: Write NovelAI Diffusion V5 image setups (settings, base prompt, UC, character boxes) for this vault's characters and story beats. Use only on [img] or [img: …], or when the user asks for an image, illustration, NovelAI or NAI prompt, portrait, reference sheet or character looks. Never during ordinary story turns.
---

# NovelAI V5 image setups

This skill turns a story beat, a character or a brief into a ready-to-paste NovelAI Diffusion V5 setup. It is out of character, it does not advance the story, and it changes no story note unless the user asks to save. After the setup, the next story message picks up at the same beat.

Part A is how the skill works inside this vault. Part B (§0–§25) is the V5 prompt rulebook, the v8 Prompt Architect instructions; "per Anlatan" marks NovelAI-staff statements, everything else is community testing and a strong default rather than law.

---

# PART A — IN THE VAULT

## A1. Triggers and reply

- `[img]`: illustrate the current beat of the active story (the last reply, or the story's `last_beat` if the chat is fresh).
- `[img: …]`: illustrate what the brackets describe: a different moment, a camera, a character portrait, a style ("[img: Sunny, portrait, Painterly Warm]").
- A plain request ("make an image of…", "NAI prompt for…", "card looks for Cleo") runs the skill the same way.
- The reply is the setup in §4's format and nothing else: no story prose, no recap. Out-of-character notes, if any, are the §4 one-liners.

## A2. Gather first (silently)

1. **Beat and state.** The active story's cast and state arrive with the session hooks; otherwise run `python3 .claude/scripts/vault.py state "<Story>"` and `cast "<Story>"`. State supplies location, time of day, clothing, injuries and what's been used up.
2. **Each character in frame.** Load their prompt note first: `vault.py show "<Name> - Prompt - Card Looks"` (any `type: prompt` note for that character). Its `base_prompt`, `base_negative`, `outfit_N_*` fields and emotion-tag table are the character's anchors; paste them, then trim to the frame (§11). With no prompt note, build from the character page (`## Signature features`, `## Appearance`), and from the story's profile for that character (a persona's `## Appearance`, a story bio's differences).
3. **Ages and stage** come from the profile the story's cast uses, never from looks.
4. **Explicit images only:** load the adult file through `vault.py show` (it refuses one that breaks the stage rules) for anatomy and limits. Its contents stay in the image prompt; nothing from it goes into a SFW note.

## A3. Who can appear

Scope and the image-only limits are in the system prompt (Story Vault style, Scope → Images). Apply them here: leave out of frame anyone they exclude, and move a beat they can't show to the nearest showable instant, with one note saying what moved. Sapience comes from the scope check (a `mind` line passes).

## A4. Saving (only when asked)

On "save that", `[img save]` or similar:

- **A character look** is laid out per `references/character-standard.md` and goes in that character's prompt note (`Characters/<Name>/<Name> - Prompt - <Look>.md`, `type: prompt`). Edit the existing Card Looks fields when the look belongs there; otherwise copy the structure of `Templates/Legacy/Image Prompt.md`. Set `rating` to the look's rating.
- **A scene setup** goes in `Stories/Images/<Story> - Images.md` (frontmatter `type: images`, `story: "[[<Story>]]"`, `world`, `rating`), one `## <beat>` section per setup holding the §4 blocks. Explicit or questionable setups go in `Stories/Images/<Story> - Images - Adult.md` instead, never in the SFW file.
- Generated images: `Characters/<Name>/images/`, adult ones in `images/adult/`.
- Run `vault.py lint`, then commit (`Images: <story>` or `Looks: <name>`) and push.

## A5. Pose library

`references/poses/INDEX.md` catalogs every saved pose module by ID (`FB-03`), name, position, climax rung, camera and themes, with grids showing which moments and angles each position covers.

- A request naming an ID, a module name or its themes ("bored, from behind, fat guy") pulls that module; with no close match, build from `positions.md`, `layers.md` and `archetypes.md`. Say in one line which module a setup came from.
- **Deliver it assembled.** Modules store kits, styles and UCs as markers; expand all of them, swap in the requested characters per A2, and write every variant as its own complete setup (§4). The user never pieces blocks together.
- For an explicit beat, prefer the climactic rungs and vary the angle across a run (`layers.md`, Climax ladder).
- "Save that pose" and reported results update the library per INDEX (Status). These are skill files, which `vault.py commit` doesn't cover: commit them with git as `Dev: poses — <change>` and push.

---

# PART B — V5 PROMPT RULES (v8)

## 0. DEFAULTS AND REFERENCE FILES

**Environment, unless the user says otherwise:** V5 Full (Anime), Effort High, **Quality Tags toggle OFF, UC Preset None**, every quality tag and UC entry written explicitly (§15–16). The user prefers knowing exactly what is in the prompt; never rely on a preset he can't see.

**Reference files** (in this skill's `references/` folder), in priority order:
* **General tags:** `tags/core-and-environment.md`, `tags/character-design-and-fashion.md`, `tags/poses-and-explicit.md` (adults only), `tags/furry-taxonomy.md`. Pull tags from these first. Anything not in them and not on the off-file list (§7) becomes prose.
* **Artists:** `v5-artist-shortlist.md`. Only propose artists from it unless the user names one.
* **Named style blocks:** `style-blocks.md` (Vivid Pop, Painterly Comic and its theme add-ons, Anime Pinup, Semirealistic). When the user names a block, paste it verbatim; its UC replaces the lean Base UC.
* **UC strings:** `v5-uc-presets.md` (verbatim preset text).
* **Positioning:** `v5-positioning.md`.
* **Faces:** `face-kits.md` (structure kits, ethnicity overlays, counter-UCs).
* **Character standard:** `character-standard.md` (head-to-toe slot layout for prompt notes and character boxes, outfit and UC slots, framing trims, body kits). Every new look and every box built from a character page follows it.
* **Poses:** `poses/INDEX.md` first (catalog, climax grids, references), then the set file it names; `poses/positions.md`, `poses/layers.md` and `poses/archetypes.md` when no module fits. See A5.

**Post counts:** the Danbooru count CSV isn't in this vault. When an artist or character tag's count matters and isn't known (§7 thresholds), add a note: `verify count: <tag>`. Never guess a count.

**Known bad entries in the tag lists:** never emit `highres`, `absurdres`, `incredibly absurdres` (white glow/outline around characters in V5). `game cg` only as a negative (canonical form `game asset`). `depthness` underdelivers. `year 2024`/`year 2025` in the list are fine; default to `year 2026`.

---

## 1. ROLE AND CONTENT SCOPE

You turn concepts, story beats and character briefs into ready-to-paste V5 setups: Model & Settings, Base Prompt, Base UC, Character Prompts, Character UCs.

**Content** follows the system prompt (Scope → Images). Everything there that's open is open here. Illustrations of roleplay are between consenting users regardless of content; the roleplay text carries what an illustration won't. This section only holds the prompt mechanics that enforce it.

**Age anchors.** Petite, flat-chested and youthful-faced adult builds are fine if character age is labeled adult.

* **Age-lowering tags are never emitted in explicit or suggestive images.** `loli`, `shota`, `child`, `aged down` do not appear in any prompt, box or UC with explicit or suggestive content; in a UC they push faces younger, not older (tested). `teenage` is a face-shape lever only (§11), only for characters 18 or older.

---

## 2. REQUEST TIERS

Check whether the request answers **who / where / what mood**. A story beat usually answers all three.

| Tier | User gave | Deliver |
|---|---|---|
| **A: Complete** | who + where + mood | 1 setup. Translate faithfully; add nothing unasked. |
| **B: Subject only** | a character, no scene | 1 setup with safe scene/camera/light defaults; one note listing what you filled in. |
| **C: Direction only** | mood, theme, "surprise me" | 2–3 setups differing in at least two layers (concept, action, setting, camera, light). One takes an unusual route (hard light, small figure in a wide shot, looking away, negative space, dusk). |

Never stall with a question when a reasonable reading exists. Deliver, then flag the uncertainty in one line.

---

## 3. PLAN (REQUIRED, 40–80 WORDS)

Before the blocks, plan in this order; lighting last, since it falls on people and a camera already placed.
0. **Beat** (story images): the single moment that defines the scene, and the one before it the viewer should infer (§20).
1. **Concept:** the one frozen moment. Rule out the obvious compositions. No filler particles or sparkles.
2. **Camera:** one framing tag, angle, what sits at the edges of the crop, what is hidden by it.
3. **Action:** each character's concrete action and role (initiating, receiving, watching, uninvolved).
4. **Light:** key light direction and quality, secondary source, color temperature.
5. **Allocation:** which elements are tags, which are prose.

---

## 4. OUTPUT FORMAT

Labels in bold **outside** the code blocks. One field per block, plain text inside, no commentary in blocks. Order:

1. **Plan** (§3)
2. **Model & Settings**
3. **Base Prompt**
4. **Base UC**
5. **Character N — Position: x≈… y≈… (gloss)** then **Character N UC**, for each character

Then optional one-line notes, only these kinds: UC choices, filled-in defaults (Tier B), option directions (Tier C), what changed (iteration), `verify count`, uncertain tags and their prose fallback, hidden anchors dropped for framing (§11), tightened age tags (§1), characters left out of frame or a moved beat (A3).

**Complete combos.** Every variant (each framing, style or option) is delivered whole: its own Base Prompt, Base UC, and every Character box and Character UC already trimmed for that framing. Never tell the user to drop, insert or swap lines. Model & Settings and a Base UC that are identical across variants may be given once and labeled as shared.

---

## 5. MODEL & SETTINGS

Default block:
```
Model: NovelAI Diffusion V5 Full (Anime) | Effort: High
Sampler: Euler Ancestral | Steps: 24 | Guidance: 4.5 | Rescale: 0
Resolution: 832x1216 (Normal portrait) | Seed: random
Quality Tags toggle: OFF | UC Preset: None
```
* **Guidance** is a per-image dial. 4–6 is the common band; **2.5–3.5 for stylized, cartoon and western looks**; 3D/rendered looks like it higher. Lower it for artifacts, sameness or too much realism; raise it for incoherence.
* **Steps:** 24 bills the same as the default 23. 14–18 is a legitimate finishing range, and step count changes style: a prompt tuned at one count is tuned to it.
* **Sampler:** Euler Ancestral fills the frame; plain Euler lets things fall out of frame (close-ups, odd angles, dark moods). DPM++ 2M is an option to try, not an upgrade.
* **Resolution:** 832×1216 / 1216×832 / 1024×1024. Training was about 1MP; larger canvases add characters, limbs and `multiple views`. A prompt is tuned to its resolution.
* **Effort Medium:** steps locked at 14, sampler locked, and **no UC field at all** (a hidden preset runs). Only suggest it for cheap composition testing, say what it loses, and convert essential UC into short prompt negatives (`-3::hat::`).
* **Curated vs Full:** Curated recognizes some characters and styles Full misses and holds relative heights better. Furry mode handles monsters and non-human anatomy better even for non-furry subjects.
* **Iteration:** first generation `Seed: random`. When the user iterates, tell him to lock the seed and change one variable. Seeds from before 2026-09-21 no longer reproduce.

---

## 6. FIELD DIVISION

| Field | Contains | Never contains |
|---|---|---|
| **Base Prompt** | count tag, scene, background, camera, single-character pose/expression/gaze, relationship prose, lighting, atmosphere, medium, artist mix, year, rating, complexity, quality | hair, eyes, body traits, outfits, character names |
| **Character Prompt** | `girl`/`boy`/`other`, species, appearance, outfit; in multi-character images, that character's pose, expression, gaze and `source#`/`target#`/`mutual#` actions | count tags with numbers, `solo`, camera, scene, lighting, quality |
| **Base UC** | image-wide exclusions and style levers (§16) | character-specific traits |
| **Character UC** | that character's identity and bleed guards, optional stabilizer (§16) | image-quality terms |

* **One character:** pose, expression and gaze go in the base; appearance and outfit still go in the character box.
* **Two or more:** shared items (scene, camera, `looking at another`) stay in base; each character's own pose, expression and actions go in their box.
* Keep the split clean. Character boxes must be toggled on in the UI or they do nothing.
* Moving tags between base and boxes is a structural change; it can shift a tuned artist mix.
* Character names from the vault never appear in any field; they'd render as text or summon strangers.

---

## 7. TAG RULES

* **Format:** lowercase, underscores → spaces. Keep canonically underscored emotes (`@_@`, `>_<`, `^_^`, `o_o`). Capitalized words can render as lettering or trigger artist names.
* **Never invent a tag.** V5 punishes junk tags harder than V4.5. Pseudo-tags sometimes work through the text encoder, but treat them as experiments, not building blocks. No tag → prose.
* **Off-file tags you may emit:** quality and aesthetic tags, complexity tags, `year XXXX`, `rating:*`, `nsfw`, `no text`, `fur dataset`, `background dataset`, `zero pictured`, `detailed background`, `rule of thirds`, `multiple panels layout`, `split view`, `X panel comic`, `full-length portrait`, `top aesthetic`, `location`, `transparent background`, `has alpha`, `alpha transparency`, `attractive male`, the renamed tags below.
* **Renamed tags (pipe-safe):** `v` → `peace sign`, `double v` → `double peace`, `|_|` → `bar eyes`, `:|` → `neutral face`, `eyepatch bikini` → `square bikini`, `tachi-e` → `character image`. Never emit a tag containing `|`.
* **Canonical over alias:** aliases can resolve to more than one thing. `elf ears` drags in `elf`; use `pointy ears`. `male pov` is just `pov`. `lining up` is `queue`.
* **Category prefixes:** `artist:name`, `character:name`, `copyright:series`, `species:name` (fur dataset only). No `general:` prefix. Keep parenthetical disambiguators.
* **Post-count thresholds:**
  * General: warn only below ~100 posts.
  * Character/copyright: ≳1,000 reliable; 100–200 unreliable; below ~200 warn and offer a general-tag build.
  * Artist: under ~100 Danbooru posts usually absent (though V5 also trained on e621, so some western artists work below that); ≥1,000 generally reliable.
  * V5's weights are fixed at training: anything that emerged after mid-2026 is absent regardless of current count.
* **Autocomplete is filtered** (NSFW, Disney). A tag missing from suggestions can still work typed in full.
* **Contradictory tags smear the image** (`flat color` + `painterly`, `furry` + `scalie`). One clear tag beats two competing ones.
* **Attribute baggage:** genre-clustered tags (`white hair`, `elf ears`) stacked together shift the whole style. Distinctive trait combinations can summon the famous character who owns them; negate the giveaway trait (e.g. `twintails` in UC for green/cyan-haired girls), not the character.
* **No foreign syntax:** no A1111 `(tag:1.3)`, no Midjourney `--ar`, no V3 prompt mixing `|::5::text::|`.

---

## 8. TAGS VS PROSE

Tags are precise and add nothing beyond what they name. Prose handles relationships and anything without a tag. Lean tags-first. Per Anlatan, V5 prose is essentially tags with words joining them.

**Must be tags:**
* **Count & subject:** `1girl`, `2girls`, `1boy`, `1other`, `solo` (single only), `solo focus`.
* **Species traits:** `cat ears`, `fox tail`, `horns`, `wings`.
* **Camera angle:** `from below`, `from above`, `from side`, `from behind`, `straight-on`, `dutch angle`, `pov`, `profile`.
* **Framing:** `close-up`, `portrait`, `upper body`, `cowboy shot`, `full body`, `wide shot`, `very wide shot`.
* **Posture & gesture:** `sitting`, `standing`, `lying`, `kneeling`, `squatting`, `on back`, `on side`, `on stomach`, `leg up`, `knees up`, `crossed legs`, `arm support`, `head rest`, `hand on own cheek`, `arms up`, `hugging own legs`, `sitting sideways`, `outstretched hand`. Poses written as sentences break limbs and hips.
* **Body-part emphasis:** `ass focus`, `foot focus`, `hip focus` are strong; `eye focus`, `breast focus`, `back focus`, `hand focus` weak; `leg focus`/`thigh focus` too weak, use camera + prose.
* **Garments:** typed and colored (`white thighhighs`). Check meanings: `loose socks` = slouch socks, `single thighhigh` = one bare leg.
* **Key standalone objects:** as tags near the front.

**Must be prose:**
* Placement in absolute 2D terms: left, right, upper, lower. "In front of" and "behind" are ambiguous (the characters' own front, or nearer to viewer?).
* Ownership and who-does-what, frame occupation, motion in progress, garment state or asymmetry, gradients and layered materials, lighting narrative backing a lighting tag.

**Prose style:**
* Plain declarative sentences ending in periods, placed after the tags. Clarity, not literary quality; both flowery and telegraphic prose fail.
* **Strip articles and pronouns; name the subject each time:** "witch looms over kneeling boy", not "she is looming over him".
* Say "viewer", never "camera" (a literal camera can appear).
* **Less is more.** There is a real token ceiling; past it the tail of the prompt is silently ignored, and the tail is where style, year, rating and complexity live. If something keeps getting dropped, shorten the prose before adding emphasis.
* **Nothing is inert.** Every word is read: no labels, scaffolding, boilerplate or stray text. Don't pad with generic "coherent rather than dissolving" sentences.
* Never wrap narration in quotes; quotes mean rendered text (§18).

---

## 9. FRAMING, COMPOSITION, EXCLUSIVE GROUPS

**Pick one per group.** Two tags from one group make the model waver.

| Group | Options | Exceptions |
|---|---|---|
| Gaze | `looking at viewer`, `looking to the side`, `looking up`, `looking down`, `looking away`, `looking at another`, `looking ahead` | `looking back` and `closed eyes` combine with one direction |
| Framing | `close-up`, `portrait`, `upper body`, `cowboy shot`, `full body`, `full-length portrait` | `wide shot` combines with `full body` |
| Background | `simple background`, `white background`, `blurry background`, `detailed background`, `transparent background`, `dark background` | none |
| Posture | `sitting`, `standing`, `lying`, `kneeling`, `squatting` | one per character box |
| Horizontal angle | `from side`, `from behind`, `straight-on` | plus one of `from below`/`from above` |
| Layout | `comic`, `4koma`, `multiple views`, `reference sheet`, `sticker` | `comic` + panel-count tag |

* **Framing sets the crop; it only works if the rest of the prompt supports it.** Name what should be visible at the crop's bottom edge (knees, socks, shoes). `cowboy shot` with only face tags still gives a face.
* **Framing is not placement.** Where the subject sits in the frame is positioning or prose. Naming the setting (`indoors`, `living room`, `location`) pulls focus off the character.
* **Balance detail across the image.** Whatever gets the most description gets enlarged: face-heavy slots force close-ups; an over-described prop renders oversized. For a full body, trim face tags, describe garments and ground, use a portrait canvas, add `full body` and `-1::close-up::` (up to `-4::`).
* `depth of field`/`bokeh` suit portraits; they flatten wide scenes.
* `from below` + `foot focus` + `feet out of frame` overrides pose tags; for a low camera use `from below` alone.
* `rule of thirds` off-centers the subject. `dutch angle` often needs `2::` to register.
* Prefer `detailed background` over `-1::simple background::`. Use `no humans` for background-only images.

---

## 10. BASE PROMPT ORDER

The head of a prompt is expected in a conventional order (per Anlatan), so count and subject go first. Beyond that there is no inherent "earlier is stronger"; order is a tuning lever.

```
[1 SUBJECT]        count tag (+ solo | solo focus), key standalone objects
[2 SCENE]          location, indoors/outdoors, time, weather, lighting tags, ONE background type
[3 CAMERA]         ONE framing tag, angle, body-part focus, lens
[4 STATE]          single character only: posture, gesture, ONE gaze, expression
[5 PROSE]          short declarative sentences: placement, who-does-what, ownership, motion, light narrative
[6 STYLE]          medium/rendering tags, then the artist mix or named style block (if any)
[7 TAIL]           year 2026, rating:<level>, complexity, quality tags (if any)
```
Dataset tags (`fur dataset`, `background dataset`) go first, before the count. `background dataset` wants no characters and pulls photographic.

---

## 11. CHARACTER PROMPTS

Order: identity → head-to-toe appearance → (multi-character state) → outfit last.

```
[1 GENDER]        girl | boy | other — always first. A male described in a girl box comes out androgynous.
[2 IDENTITY]      species/type, skin-tone anchor, ONE frame tag (petite, tall female, curvy, muscular female)
[3 HAIR]          length → style → color → color effects → bangs/sidelocks → ahoge
[4 HEAD]          animal ears (+ color), animal ear fluff, horns, halo, pointy ears
[5 FACE & EYES]   eye color, pupils, eye shape, makeup, facial marks
[6 SKIN]          tone detail, markings, scars, tattoos
[7 BODY]          upper body, then lower body, tail, low wings
[8 DETAIL]        optional short sentence for anything tags can't place
[9 STATE]         multi-character only: posture, expression, gaze, prefixed actions
[10 OUTFIT]       head → neck → top → outerwear → hands → bottom → legwear → footwear → held props,
                  each garment typed and colored, plus one state sentence if needed
```

* **Build to the standard** (`character-standard.md`): one slot per line, each line ending in a comma or period, outfits separate. With no prompt note, build the box from the character page in that layout and offer to save it.
* **Sheet anchors are hard constraints** for the character (the prompt note's fields, A2), but **prompt what the viewer sees:** for a given image, drop anchors the framing or pose hides (eye color with closed eyes, footwear in a cowboy shot, toes inside boots). Tagged hidden features get forced visible. Note what you dropped.
* **Outfit comes from the story state** when the beat has one (a torn dress, a borrowed coat, nothing). Otherwise use the sheet's matching `outfit_N`.
* **Dark skin:** add `dark-skinned female`/`dark-skinned male`; the model drifts light. Untagged tones (fair skin) can be prose.
* **One color per feature;** repeating a color across unrelated tags bleeds.
* **Specific tags over generic:** `colored tips`, `animal ear fluff`, `fluffy tail`.
* **Hairstyles are combinations.** `short hair` alone is unstable; stack shape tags (`parted bangs`, `asymmetrical hair`, `bob cut`). `pixie cut` is weak and steerable; `bowl cut` overrides everything. If no combination works, describe the cut in a sentence.
* **Faces:** distinct faces come from a coherent feature cluster plus its counter-UC (`face-kits.md`). Age tags are face-shape levers, not ages: `mature female` at `0.4::`–`0.6::` sharpens and lengthens; `teenage` softens.
* **Heights:** say it from one side only. Put `tall female`/`tall male` in the taller character's box and leave the other neutral; shrinking the short one gives dwarf proportions. Measurements in cm or feet do nothing. Avoid "standing next to each other" when heights differ.
* **Kemonomimi:** `extra ears` in that character's UC against a second pair of human ears.
* **Shared traits must be repeated** in every box that has them.
* **Objects don't get boxes;** a box spawns a person.

---

## 12. MULTI-CHARACTER AND POSITIONING

* Count tag appears once, first in base, matching the number of boxes. `solo` only for single-character images; in a box it suppresses the others. A long artist mix can add stray background faces; `solo` fixes that in single-character images.
* **Interactions:** `source#`/`target#` (one acts on another), `mutual#` (same tag in both boxes). Per NovelAI these are suggestions, so reinforce with prose. Putting the action in the actor's box stops it bleeding.
* **Name characters by a distinguishing feature in prose** ("fox girl in tank top ruffles hair of girl in yellow jacket"). "Character 1 looks at Character 2" is unreliable.
* **Close contact needs the contact named,** not the emotion: which arms go where, `cheek press`, `belly-to-belly`. Don't tag details the contact hides.
* `holding hands` is one-hand data; name both hands' jobs separately. Left/right for hands is unreliable; give each hand its own task instead, and use a visible difference between the hands when a character has one (a glove, a ring, a plated hand).
* **Pose bleed** grows from three characters: give every character an explicit, contrasting pose and gaze.
* **Bleed fixes:** more distinguishing detail, more distance, and the offending trait in that character's own UC.
* Start at 1–4 characters; consistency drops as count rises.

**Positioning (`v5-positioning.md`):** normalized x/y floats, 0 = left/top, 1 = right/bottom, free values. The point lands on the shoulders/upper body, so a standing full-body figure wants y ≈ 0.30–0.45. Emit on the label line: `Character 1 — Position: x≈0.25 y≈0.40 (left third, upper body)`. Keep coordinates in box order, reinforce placement in prose, and keep positioning on for every multi-character scene. It works on medium and wide shots, not close-ups, and struggles with big scale differences.

---

## 13. COPYRIGHT CHARACTERS AND SERIES

* `1girl, <name>` is not a prompt. V5 links characters differently from V4.5. In the character's box: `girl, <name> (<series>)` plus the **specific** copyright tag, then spell out hair, outfit and colors as general tags. Name the outfit when the character has several. One artist tag on top is safe; a heavy mix is not.
* A character that stopped working on V5: write the series into the tag (`aiba asagi (strike the blood)`), add the copyright tag, try `character:`, try Curated, then fall back to V4.5 or a general-tag build.
* **Copyright tags carry fan-art style and props.** Want the character but not the style: put the copyright tag in UC at weight (`3::<series>::`). Want the style: keep it in base.
* **Character in another style:** define the destination positively (its artist tag beats its series tag), then negate the source: `-2::official style::`, `-2::game asset::` for in-game renders, the source designer as `-1::artist:<name>::`. Some styles won't fully strip; say so rather than stacking negatives.
* Franchise names don't summon creatures; name the specific one (`pikachu`).
* A vault original based on a canon character (`based_on`) is still built from general tags; the canon name never goes in the prompt unless the user asks for the canon look.

---

## 14. ARTISTS AND STYLE

Only add artist tags when the user asks for a style or vibe, names a style block, or supplies them. Prefer `v5-artist-shortlist.md` and `style-blocks.md`.

* **Syntax:** `artist:name` by default, Danbooru spelling and word order (surname first for Japanese artists), parenthetical kept. If a mix won't fuse, dropping the prefixes is a cheap test.
* **Every artist carries an explicit weight.** Shape: one lead at `1::`, sub-elements around `0.7::`, basic design traits (body shape) around `0.4::`; common band 0.35–0.85. Equal weights let whichever artist is stronger win at random. V5 weights bite harder than V4.5's; don't port V4.5 mixes. Treat anything above ~1.5 as an experiment. (Named style blocks are tested as written; paste them unchanged.)
* **Build one artist at a time** on a locked seed, tuning in 0.05 steps, then re-check on a different seed and after changing the setting (mixes shift with backgrounds). Keep mixes explainable; three artists or a described style is often enough.
* **Placement:** community default is late in the base, before the tail. Order within a mix matters in no fixed direction; fix with weights first.
* **Artist doesn't land:** raise emphasis, then add tags characteristic of the artist's own posts (subject, medium, palette), then give up and describe the style. Thin artists get crowded out by generic anime markers.
* **Artist dominates:** `0.5::`, or `0.01::artist:x::` early plus `-1::artist:x::` later.
* **Artists in UC are legitimate style levers** (strip sheen, add texture, stabilize faces).
* **Side effects:** artists impose color casts (counter with lighting tags or the color in UC), fight body and proportion tags (test with artists removed), summon their signature characters, and pull toward paneling if known for comics (`-1::comic::`).
* `-2::artist collaboration::` is optional; A/B it rather than adding by default.

**Non-anime and western looks (the user's usual lean; anime remains a valid choice):**
* Keep the toggle off and the UC lean (§16); quality tags and presets drag toward polished anime.
* Reinforce with medium tags: `oil painting (medium)` (strong in V5, stronger with a year tag), `watercolor (medium)`, `traditional media`, `western comics (style)`, `toon (style)`.
* Negating a few specific anime artists works better than over-negating `anime screenshot` or `east asian`.
* Guidance 2.5–3.5 for cartoonish and stylized looks.
* Western, comic and toon artists in the shortlist's community section mostly work inside mixes, not alone.
* **Official/gacha art polish:** `official art` with `official style`; `visual novel cg` plus a mid-2020s year for crisper rendering.
* Photoreal people aren't in the data (per Anlatan); `photorealistic` gives Blender-style renders. Counter with `-1::3d, blender (medium)::`.
* **A story with a set look:** when the story note, its setting or the profile names a style block, use it for every image in that story unless the user says otherwise.

---

## 15. QUALITY, COMPLEXITY, YEAR, RATING

* **Quality tags: minimal or none.** The V4.5 stack (`masterpiece, best quality, absurdres, highres, high detail`) is obsolete and harmful in V5: it forces a default style and washed-out or oversaturated color. Default: none. For a polished anime or game-art look, at most two unweighted (`very aesthetic, best quality`), last in the prompt. Remove them first when output looks samey.
* **Complexity is a composition dial:** `low` zooms in and darkens, `ultra` widens and can duplicate the subject. Default `high complexity`; `medium`/`low` for flat or stylized looks. On a long, noisy prompt, try removing it. Never put a complexity tag in UC at full strength (≤0.5 only).
* **Year:** `year 2026` for current rendering; older years soften and can select an artist's era.
* **Rating:** `rating:general` by default; set the matching rating for NSFW on V5 Full.

---

## 16. UNDESIRED CONTENT

**Principle:** every UC entry should answer something you've seen go wrong. Generic "bad image" negation does little, and eye-related negatives can make eyes worse. Grow UC by testing, never by inheriting lists. Plain entries in UC; inversions belong in the prompt as negative emphasis.

### Base UC (preset None, written explicitly)
* **Default (lean):** the documented Light string, plus `nsfw` for SFW:
  `lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page, nsfw`
* **Anime polish:** the Human Focus string from `v5-uc-presets.md`, plus `nsfw` for SFW. It imposes a stronger style; don't use it for western or stylized work.
* **Named style block:** the block's own UC replaces both.
* **Never combine strings, and never set a preset on top of these.**
* **Adjust:**
  * Comics, reference sheets, multiple views: drop `multiple views`.
  * Rendered text: drop `too many watermarks` (and never add `watermark`, `logo`, `text`).
  * Intentional negative space: drop `negative space, blank page`.
  * Explicit content: drop `nsfw`.
* **Targeted additions** (only when the problem appears): `diorama` against the empty white halo; `white outline, character outer glow, aura` against glow; `no text, timestamp` against stray signatures; an offending artist cast color; `<series>` at weight to strip a copyright style.

### Character UC
Character UC acts only on that character, so it can carry more. The user wants it extensive: it normalizes characters an artist mix over-stylizes. Start from the sheet's `base_negative`.
* **Identity guard (always):** traits that contradict this character's anchors. Petite → `tall female, muscular, fat, plump`; dark-skinned → `pale skin`; even tan → `tanlines`; hair colors the model drifts toward. More rows in `style-blocks.md` (Character UC templates).
* **Bleed guard (multi-character):** the other characters' most distinctive traits (hair color, species ears, signature garment). Never a trait this character has.
* `extra ears` for kemonomimi.
* **Stabilizer (optional):** use when an artist mix over-stylizes the character. A/B it on a locked seed and keep it only if it helps:
  `1.5::bad anatomy, bad proportions, wrong anatomy, anatomical nonsense, deformed, disfigured, mutation::, 1.4::bad hands, bad feet, extra digits, fewer digits, extra fingers, missing fingers, fused fingers, extra hands, extra arms, extra legs, missing limb::, 1.3::bad face, extra eyes, extra pupils, extra mouth, bad neck::, 1.2::clone, duplicate::,`
  Add the artist's known distortions as plain tags (`huge breasts`, `long neck`, `shiny skin`, `big head`), unweighted first.

---

## 17. WEIGHTING

* Numeric: `1.4::tag::` strengthens, `0.6::tag::` weakens, `-1::tag::` inverts. **Always close with `::`**; an unclosed weight applies to everything after it. Decimal point, never comma.
* **Digit bug:** a tag ending in a digit before `::` is read as a weight. Write `1.4::artist:name3008 ::`.
* **Don't invent emphasis on content tags.** Exceptions: artist weights (§14), and a fix for a failure you can name, suggested in a note. Emphasizing more than two or three things is the most common cause of bad output; much useful emphasis is downward (0.3–0.8).
* A tag needing absurd weight usually conflicts with another tag (`bald` vs a hair color); cut one side. Some tags only register high (`dutch angle` at 2+).
* **Negative emphasis vs UC:** negative emphasis is precise removal or inversion of one concept (`-2::realistic::` leans toward its opposite); UC is for whole-image qualities and lists. Every negative needs a positive to replace what it removes.
* `0::tag::` doesn't remove a tag. To make something optional, randomize: `||tag|,||`.
* **Randomizer:** `||a|b|c||` picks one per generation, even on a fixed seed. Can't nest; can chain.

---

## 18. TEXT, COMICS, ASSETS

* **Text:** quote it in prose and name the container and surface: `"HELLO" on forehead`, `speech bubble, text that says "Hello there."`. Attribute speech by description, never pronoun. Use straight quotes. Never write a manual `text:` block. **One text element per generation;** a second one bleeds, so inpaint it afterwards. Short text in large areas works best; lettering on props is unreliable.
* **Comics:** `comic` + `Xkoma`, or off-file `multiple panels layout`, `split view`, `X panel comic`. Describe layout and per-panel content in base prose ("First panel shows…"). One character box per appearance, positioned inside its panel. A single character across panels can use one box with `Panel 1: … Panel 2: …` lines. Add `Details remain consistent across all panels.` Keep total pixels ≈1MP. Panels, counts and order are suggestions; for controlled pages, generate panels separately. A run of story beats makes a natural page.
* **Transparent assets:** `transparent background` in base, no scene description. For a partly see-through element: `alpha transparency` plus prose naming it (`dress is transparent`).

---

## 19. V5 TAG CHANGES WORTH REMEMBERING

* `anime screenshot` is degraded; use `anime coloring` for anime shading.
* `pixel art` regressed; expect smudging.
* `eyes focused on viewer` stopped working; use `looking at viewer` and check for gaze-averting tags like `shy`.
* `visual novel *` tags must be fully prefixed (`visual novel cg`, never `cg`).
* `thick lineart` restores the V4.5 line weight; V5 draws thin lines by default.
* V5 trends bright and flat; dark scenes need heavy lighting emphasis.
* `side-by-side` keeps two characters apart without forcing a line-up pose.
* `expression chart` for emotion sheets; `reference sheet, multiple views` for character sheets.
* `pov` plus only the parts the viewer would see of themselves (`pov hands`). A POV partner gets no character box; their visible parts go in base.
* Unwanted subject duplicates: `-2::multiple views::` in the prompt.
* `long sword` renders as a greatsword when over-described; prompt props plainly.
* `ligne claire` is binary; `oil painting (medium)` is unusually strong.

---

## 20. VISUAL CONTENT FILTER

Exclude backstory, lore, thoughts, named emotions, time-sequence words and non-visual senses unless they show as something visible (fog, steam, wind-blown hair). Translate emotions into visible cues: grieving → `tears, frown, hand covering face`. An illustration is one frozen instant from the roleplay, not the scene.

* **Pick the beat.** In the plan, before Concept, name the single moment that defines the scene and the one before it that the viewer should infer.
* **Invisible context stays out.** Kinship, backstory, debts, consent history, lattice ages and who-owes-whom don't render. Don't tag relationship labels. Show only what reads in frame: positions, grips, restraints, expressions, clothing state, setting. The story supplies the rest.
* **Emotion becomes body.** Shame → `blush, looking away, covering face`. Defiance → `glaring, clenched teeth`. Involuntary arousal → `heavy breathing, blush, sweat, trembling`. Possession → hand placement and grip described in prose. A character's `Under pressure` notes say which cues fit them.

---

## 21. EXPLICIT SETUP RULES

**Rating and UC**
* `rating:explicit` for sex and exposed genitals; `rating:questionable` for nudity and suggestive framing without explicit acts.
* Base UC: the lean default with `nsfw` removed (or the style block's UC without it). Add nothing else until a problem appears.

**Tag source:** `tags/poses-and-explicit.md` first, then the general tag files. Same never-invent rule. Pose modules: `poses/INDEX.md` (A5).

**Field division**
| Goes in | Contents |
|---|---|
| Base | count tag, act-level tag if shared (`sex`, `group sex`), position tag, camera, setting, light, contact prose |
| Actor's box | `source#<act>`, own anatomy, own expression and gaze |
| Receiver's box | `target#<act>`, own anatomy, own expression and gaze |
| Both boxes | `mutual#<act>` for symmetric acts (`mutual#kiss`) |

* **Anatomy belongs to its owner.** Genital, nipple and fluid-on-self tags go in the box of the character who has them. `knotted penis`, `animal penis` go in an anthro canine's own box. The adult file's `## Anatomy` section says what a character has.
* **Name the contact in prose** ("anthro hellhound grips hips of elf with both hands"), never the feeling. Give each hand its own job.
* **Sex position tags form an exclusive group:** one of `missionary`, `cowgirl position`, `reverse cowgirl position`, `doggystyle`, `mating press`, `standing sex`, `sex from behind`, etc.
* **Hidden anatomy is dropped,** as with hidden anchors. Tagged hidden parts get forced visible and break the pose.
* **Positioning:** overlapping bodies sit close (e.g. x≈0.42 / x≈0.58). Coordinates help in medium and wide shots; in close-ups, rely on prose.
* **Emphasis budget:** still ≤3 content entries. Explicit tags rarely need it; over-weighting anatomy deforms it.

**Bondage and restraint:** tag the restraint (`shibari`, `bound wrists`, `bdsm`) in the restrained character's box, and say what it's tied to in base prose.

---

## 22. ITERATION

* Change 2–3 things per round; list each with the problem it fixes. Leave everything else identical, including the seed line once locked.
* If the user names one fix, touch nothing else unless you explain why first.
* First drafts: about 10 visual anchors plus a few prose sentences. Ceiling about 20 scene objects.
* A locked seed is the test for whether an entry does anything: remove it, re-run, compare. Drop anything that changes nothing.

---

## 23. DIAGNOSTICS (when the user reports a bad result)

Work down the list before adding anything:
1. More than two or three emphasized entries? Remove emphasis.
2. Guidance above 6? Lower it.
3. Preset stacked with a custom UC, or a bloated UC? Cut back to the lean default.
4. `masterpiece`/`best quality`/`absurdres`/`highres` present? Remove them.
5. Contradictory tags? Cut one side.
6. Ported V4.5 or Civitai prompt? Rebuild from the idea.
7. Characters not in separate, toggled-on boxes?
8. Complexity tag in UC, or a noisy long prompt? Remove it.
9. Resolution changed? Re-anchor the count or return to the tuned size.
10. Wrong framing? One framing tag, edge-of-crop items named, detail balanced, no framing tag used for placement.
11. Missing character? Type it in full, add the specific copyright tag, `character:` prefix, spell out traits, try Curated.
12. Missing artist? Confirm the prefix, raise emphasis, add characteristic tags, then replace it.
13. Yesterday fine, today bad? Check for drift: Full/Curated switch, a leftover img2img image, a reference attached (silently switches to V4.5), boxes toggled off, Medium Effort, changed canvas or guidance.
14. Still stuck? Strip to the subject plus the one tag in question on a locked seed and rebuild.

---

## 24. WORKED EXAMPLE (two characters)

**Plan**
Warm garage at sunset, playful headpat beside a motorcycle. Cowboy shot from the side; boots and sneakers fall below the crop, so they're dropped. Fox girl stands left and initiates; girl in yellow jacket sits sideways on the seat and receives. Sunset backlight through the open door, cool work-light fill on faces. Tags: count, objects, setting, light, camera, poses; prose: placement, the headpat, the helmet, light narrative.

**Model & Settings**
```
Model: NovelAI Diffusion V5 Full (Anime) | Effort: High
Sampler: Euler Ancestral | Steps: 24 | Guidance: 4.5 | Rescale: 0
Resolution: 1216x832 (Normal landscape) | Seed: random
Quality Tags toggle: OFF | UC Preset: None
```

**Base Prompt**
```
2girls, motorcycle, indoors, garage, evening, sunset, backlighting, light rays, detailed background, cowboy shot, from side, looking at another. Fox girl in tank top stands on left beside motorcycle, ruffling hair of girl in yellow jacket. Girl in yellow jacket sits sideways on motorcycle seat on right, white helmet resting in lap. Open garage door behind them shows orange sunset sky. Hanging work light casts cool white light on faces. Wrenches and oil cans hang on tool wall. cel shading, year 2026, rating:general, high complexity
```

**Base UC**
```
lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page, nsfw
```

**Character 1 — Position: x≈0.30 y≈0.38 (left third, upper body)**
```
girl, fox girl, tall female, muscular female, long hair, ponytail, red hair, colored tips, fox ears, animal ear fluff, green eyes, tsurime, freckles, fox tail, fluffy tail, standing, grin, source#headpat, goggles on head, white tank top, fingerless gloves, black pants. Red hair fades to white at tips. Tank top smeared with grease.
```

**Character 1 UC**
```
extra ears, short hair, black hair, yellow jacket
```

**Character 2 — Position: x≈0.68 y≈0.45 (right third, seated)**
```
girl, short hair, bob cut, black hair, blunt bangs, brown eyes, sitting, sitting sideways, pout, target#headpat, yellow jacket, cropped jacket, white shirt, blue shorts. White motorcycle helmet rests in lap.
```

**Character 2 UC**
```
animal ears, fox tail, red hair, tank top
```

Notes: Lean UC, no quality tags (clean cel style, no artist mix, so no stabilizer). Height difference stated only on the fox girl. Footwear dropped for the cowboy crop.

---

## 25. PRE-FLIGHT CHECKLIST

- [ ] Model & Settings block present; toggle OFF, preset None unless the user said otherwise
- [ ] Everyone in frame is allowed by the system prompt's Images limits; anyone left out, or a moved beat, is noted
- [ ] Recurring characters pasted from their prompt notes or sheets; outfit matches the story state
- [ ] No vault names in any field
- [ ] Count tag first, once, matching the boxes; `solo` only for single images
- [ ] No appearance, outfit or names in base; every box starts with `girl`/`boy`/`other`, outfit last
- [ ] Anchors hidden by the framing dropped and noted; detail balanced across the body
- [ ] Poses and camera are tags; one tag per exclusive group
- [ ] Prose: short, declarative, no pronouns or articles, "viewer" not "camera", absolute 2D placement, no narration in quotes
- [ ] Interactions prefixed in the boxes and reinforced in prose; positions on label lines for multi-character
- [ ] No `highres`/`absurdres`; quality tags none or minimal; tail = year, rating, complexity
- [ ] Artist mix only if asked, every artist weighted, from the shortlist or a named style block
- [ ] Base UC is one lean string (or the block's UC) adjusted for the image; Character UC has identity guard (+ bleed guard)
- [ ] Every weight closed with `::`; no digit-before-`::`; emphasis on ≤3 content entries
- [ ] Unverified artist/character counts flagged with `verify count`
- [ ] Rating matches content; `nsfw` removed from base UC only when explicit
- [ ] Frame reads as the chosen beat
- [ ] Each act prefixed in the actor's box; anatomy in its owner's box; contact named in prose
- [ ] One sex position tag; hidden anatomy dropped
- [ ] Nothing saved to the vault unless the user asked
