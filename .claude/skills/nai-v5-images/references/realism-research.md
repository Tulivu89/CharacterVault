# V5 Realism Research

Working notes for photographic and realistic looks on V5. Started 2026-11-16 from ten of the user's earlier tests, decoded from their metadata. Findings are from single seeds unless a round says otherwise; treat them as leads until the bench confirms them.

- **Bench:** "Realism Bench" artifact (https://claude.ai/artifact/Jgcpm4dcJDSVFbTt1XPWfh): drop NovelAI images in, it reads their settings, then score, tag rounds and diff runs side by side. Claude reads its `runs` and `rounds` collections with ArtifactData.
- **Decoder:** `python3 tools/nai_meta.py IMG…` prints settings, prompt, UC and character boxes; `--diff A B` lists setting changes and per-field tag adds, cuts and weight changes. PNG on stock Python; WebP needs Pillow.

## Metadata

- NovelAI stores the full request twice: PNG `tEXt` chunks (`Comment` holds the JSON) and the alpha channel's lowest bit, column by column, after the magic `stealth_pngcomp` (gzip) or `stealth_pnginfo`. Lossless WebP keeps the alpha copy; JPEG and screenshots keep nothing. Ask for original PNGs.
- Useful fields: `scale` (guidance), `cfg_rescale`, `sampler`, `noise_schedule`, `prefer_brownian`, `tag_hint_qt` / `tag_hint_uc_preset` (the toggle and preset the UI had), `v4_prompt.caption.char_captions[].centers`, `use_coords`. `Source` carries a model hash: `0ADF9AB7` on most V5 tests, `657484A5` on one (unidentified; probably Curated or Furry).

## Three kinds of realism

They're pulled by different levers and fight each other. Pick one per block.

| Read | Seen in | Levers |
|---|---|---|
| Photo | refs 3, 6, 7, 10 | Guidance 3.9–6.5, rescale 0–0.58; `photo (medium)`, `realistic`, `cosplay`; anti-anime negatives; optics prose |
| CG render | ref 4 | 3D-leaning artists positive (sakimichan, hydrafxx, fugtrup, naohiro ito), `blender (medium)` positive, large canvas, many steps |
| Painted / HDR | refs 5, 8, 9 (2 semi-real) | Guidance 13+ with rescale 0.8; "expert shading, fully rendered, highly finished" |

## Leads

- **Cosplay is the photo door.** Danbooru's real-human photos are mostly cosplay photos. `cosplay` with `photo (medium)` gives real skin; animal ears and costumes read as props.
- **Detailed optics prose works** (ref 7): which eye is sharp, what falls out of focus, exposure, grading. V5 reads it; it's the strongest photo result.
- **Inline negatives in the prompt** (`-1::anime::, -1::illustration::, -1::cgi::, -1::figure::, -1::plastic::`) held better than the same words in UC (ref 7).
- **CG artists in UC** strip the render look (ref 3); the same artists positive make it (ref 4).
- **Doll face:** `doll` (58k) is a real tag and the house face's look. Put it in UC with `figure, 3d`.
- **UCs that fight photos:** `film grain`, `chromatic aberration`, `blurry`, `out of focus` in UC subtract photographic signal; drop them for photo blocks.
- **Glamour makeup** pulls faces back to illustration; real makeup described precisely (ref 7) survives.
- **Shooting through a blurred foreground** (bars, glass, rain) sells "photo" (refs 1, 7).
- **Glow tags** (`absurdres`, `highres`, `incredibly absurdres`) and typo tokens turn up in old prompts; remove them.
- Real-person names are out of scope for the vault; the bench doesn't use that lever. That includes cosplayer "artist" tags from Gelbooru (mizuhara arisa, sweetie fox and the like): on photo posts the artist tag is the person photographed, so it summons her face. None of the ten checked are in the forge's Danbooru/e621 vocab either.
- `real life` is a copyright tag (18.2k): photos and photo-like posts. Test it as a medium anchor beside `photo (medium)`.
- The bare realism face drifts soft, round and East Asian (the cosplay-photo average). Counter it with a positive ethnicity overlay and a face kit, not with `asian` in UC alone.
- Age-lowering tags (`teenage`, `teenager`) stay out of suggestive or explicit setups; use the Doll kit with `0.4::mature female::` for a softer adult face.

## Tag counts (forge vocab, merged Danbooru+e621)

`realistic` 35.7k · `photorealistic` 1.5k · `3d` 25k · `photo background` 19k · `depth of field` 126k · `blurry background` 172k · `blurry foreground` 39k · `bokeh` 10k · `chromatic aberration` 39k · `backlighting` 45k · `overcast` 4.7k · `nose` 28.5k · `freckles` 142k · `mole under eye` 224k · `bags under eyes` 39k · `veins` 57k · `messy hair` 95k · `doll` 58k · `shiny skin` 148k. Missing from the vocab subset, so verify count: `photo (medium)`, `cosplay`, `film grain`, `blender (medium)`, `lips`.

## Bench rounds

One variable per round, three locked seeds per variant; each round's winner becomes the next control. Subject: Ilse Brandt (human, 21) on the Tomboy Vixen kit. The rounds and their variants live in the bench's Rounds view: Settings, Medium anchor, Undesired content, Quality and year, Skin, Face, Light and lens, Two-pass. Record findings there, and copy settled results here and into `style-blocks.md` as a Photoreal block.

## Findings log

| Date | Round | Finding |
|---|---|---|
| 2026-11-16 | References | Control v1 (ref 6: Euler A, CFG 4.5) reads as a real photo with human proportions; plain face with low appeal and waxy cheeks. |
| 2026-11-16 | Settings | Every variant aged Ilse into a gaunt older woman. The cause is the box, not the settings: in photo mode `toned` + `collarbone` + `0.4::mature female::` + a counter-UC that strips every softness cue (`round face, chubby cheeks, blush, pink lips`) + scars + muted color + `shiny skin` in UC add up to hollow cheeks, neck cords and sallow, dry skin. Anime face levers don't port to photo: `mature female` reads as actual age. Settings ranking: DPM++ 2M SDE 5.5 and Euler A 4.5 youngest; plain Euler and CFG 13/0.8 age most. Next: an Appeal floor round before anything else. |
| 2026-11-16 | Appeal floor | Dropping the aging cues fixed the age, but appeal words (`attractive`, "soft full cheeks", "soft natural glow", `light blush`) pulled to the cosplay-photo beauty average: generic East Asian idol face, anime-large eyes, fuzzy skin. Soft words render soft. Describe appeal through specific structure and expression. A subject near the default (black hair, grey eyes, petite) can't show drift; the bench moved to Juno Reyes (deep brown skin, long East African face, braid with shaved sides). |
