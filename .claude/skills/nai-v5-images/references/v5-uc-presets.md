# Undesired Content Presets

Verbatim preset strings for NovelAI's built-in Undesired Content options. This vault's default is **UC Preset: None** with the UC written out by hand (SKILL.md §16); the strings here are what you paste when a setup calls for one of them.

## How presets behave

Presets **stack** with user-typed Undesired Content. Selecting a preset injects it *in addition* to whatever the user writes — typing your own does not replace it unless the preset is set to "None."

Practical consequence: when the user has a preset active, only emit UC tags that aren't already in it. Duplicating preset tags is harmless but wasteful.

## Status of V5 presets

NovelAI's documentation has **not** been updated with V5-specific presets. The strings below are the documented V4.5 ones. A single community capture of the live V5 UI showed Heavy and Human Focus matching V4.5 Full exactly, which suggests V5 inherited them at launch.

**Default to the V4.5 Full strings.** They are the safest known-good baseline.

---

## V4.5 Full — documented

### Heavy

```
lowres, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, dithering, halftone, screentone, multiple views, logo, too many watermarks, negative space, blank page
```

### Light

```
lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page
```

### Human Focus

```
lowres, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, dithering, halftone, screentone, multiple views, logo, too many watermarks, negative space, blank page, @_@, mismatched pupils, glowing eyes, bad anatomy
```

Human Focus is Heavy plus four eye/anatomy tags: `@_@, mismatched pupils, glowing eyes, bad anatomy`.

---

## V4.5 Curated — documented

Curated presets add `blurry` and `upscaled` and drop `dithering` / `screentone`.

### Heavy

```
blurry, lowres, upscaled, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, halftone, multiple views, logo, too many watermarks, negative space, blank page
```

### Light

```
blurry, lowres, upscaled, artistic error, scan artifacts, jpeg artifacts, logo, too many watermarks, negative space, blank page
```

### Human Focus

```
blurry, lowres, upscaled, artistic error, film grain, scan artifacts, bad anatomy, bad hands, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, halftone, multiple views, logo, too many watermarks, @_@, mismatched pupils, glowing eyes, negative space, blank page
```

---

## V5 live-app capture — unverified, single source

A community reviewer captured what the V5 UI displayed on launch day. Heavy and Human Focus matched the V4.5 Full strings above. **Light was reported differently:**

```
lowres, bad hands, bad anatomy, artistic error, sepia, white haze, worst quality, very displeasing, jpeg artifacts, 0::ai-generated
```

This conflicts with documented V4.5 Light and introduces tags (`sepia`, `white haze`, `0::ai-generated`) that appear nowhere in the documented sets. Treat as unconfirmed. Use it only if the user says it matches what they see in their app.

No V5 Curated-specific variants have been captured.

---

## Notes

- **Never paste a preset string into the custom UC while that preset is active.** The two concatenate.
- **Add only what you've watched go wrong**, and keep it only if an A/B test shows it fixes the problem. Start from the smallest UC possible. Even eye-related entries can backfire on eyes.
- **Avoid Heavy.** It imposes a noticeable style, and its `watermark` / `logo` entries suppress wanted text.
- **Negative weights inside UC are contested** — one user reports they just produce odd results, another runs `-50::` there as a deliberate double negative. Default to plain entries here and put inversions in the prompt.
- **Medium Effort has no UC field** (added 2026-10-15). Per NovelAI's Effort-toggle announcement, on Medium "there is no way to specify a custom Undesired Content prompt, or change its preset" — a preset still runs, you just can't write to it or swap it, and which one is unconfirmed (one user infers the default Heavy, the preset to avoid). Everything in this document therefore applies to High Effort only. On Medium, move anything essential into negative emphasis in the prompt (`-3::hat::` is NovelAI's own example) and keep it short.
- **Don't leave UC completely empty.** With the preset on None, keep a short custom UC.
- **Comics, reference sheets, multi-view images:** Heavy and Human Focus (and documented V4.5 Light) contain `multiple views`. Worth ruling out when panels or views won't form.
- **Scene/landscape work with no characters:** the eye/anatomy entries in Human Focus are irrelevant there; Light is the lighter option.
- **Against the empty-space halo** — subject marooned in a white circle or vignette, most often on square canvases — Anlatan's own suggestion is `diorama` in UC. Aimed at V4.5, but the effect appears on V5 too.
- **UC is a bigger lever in V5 than in V4.5.** Several experienced users treat it as a soft second prompt for style and direction, and some things (a stray white border) respond to it poorly while responding to a prompt-side negative. The people running 500-token UCs built them entry by entry on locked seeds; another regular caps his at ~50 tokens because past that you can't tell what is doing what. Grow it by testing, never by inheriting someone else's list.

---

## Recheck trigger

If NovelAI publishes V5-specific presets in the official docs, replace everything above.
