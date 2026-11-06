# V5 Character Positioning

## Format

Normalized floats in the range [0.0, 1.0].

- x — 0.0 is the left edge, 1.0 is the right edge
- y — 0.0 is the top edge, 1.0 is the bottom edge

V5 replaced V4.5's discrete 5×5 grid with free positioning, so arbitrary continuous values are accepted. You are not limited to the old five steps per axis.

## Prose → coordinate mapping

| Horizontal | x | Vertical | y |
|---|---|---|---|
| far left | 0.10 | top | 0.15 |
| left third | 0.25 | upper | 0.30 |
| left of center | 0.35 | slightly above center | 0.40 |
| center | 0.50 | middle | 0.50 |
| right of center | 0.65 | slightly below center | 0.60 |
| right third | 0.75 | lower | 0.70 |
| far right | 0.90 | bottom | 0.85 |

These are starting points, not fixed values. Interpolate freely.

## Anchor point

The coordinate lands roughly on the character's shoulders / upper body, not their center of mass or their face. This is a community testing finding, not documented by NovelAI — treat it as a working assumption.

Practical effect: for a full-body standing character you generally want y in the 0.3–0.45 range rather than 0.5, since the shoulder sits well above the vertical middle of the figure.

## Emitting positions

On the label line, give coordinates plus a prose gloss:

```
Character 1 — Position: x≈0.25 y≈0.55 (left third, mid-height)
Character 2 — Position: x≈0.72 y≈0.38 (right third, upper body)
```

Keep coordinate order consistent with character-box order — character 1's coordinates go in the first character slot in the UI.

Reinforce placement in natural language in the base prompt as well: "witch on left, boy kneeling on right." Positioning is a strong nudge, not a hard constraint, and the redundancy helps.

## API payload

For anyone driving the API directly rather than the web UI:

```json
{
  "params_version": 4,
  "v4_prompt": {
    "use_coords": true,
    "caption": {
      "base_caption": "1girl, 1boy, ...",
      "char_captions": [
        {
          "char_caption": "girl, witch, witch hat, blonde hair, ...",
          "centers": [{ "x": 0.28, "y": 0.40 }]
        },
        {
          "char_caption": "boy, armor, helmet, ...",
          "centers": [{ "x": 0.72, "y": 0.68 }]
        }
      ]
    }
  }
}
```

Notes:

- `params_version: 4` identifies V5. V4.5 and earlier use 3.
- The conditioning structure (`v4_prompt` / `char_captions` / `use_coords`) is otherwise the same family as V4.5 — V5 changed the UI and the granularity, not the payload shape.
- `use_coords: true` must be set for positions to apply at all. If any character has a position, the whole group uses positioning.
- `v4_negative_prompt` mirrors this structure for per-character undesired content.

## Legacy grid equivalence

V4.5's 5×5 grid (cells A1–E5) corresponds to cell centers at 0.1 / 0.3 / 0.5 / 0.7 / 0.9 on each axis. Columns A–E map left to right on x; rows 1–5 map top to bottom on y. So B2 ≈ (0.3, 0.3), C3 ≈ (0.5, 0.5), D4 ≈ (0.7, 0.7).

This mapping is inferred from standard cell-center math and SDK usage rather than confirmed from NovelAI source. It only matters if you're porting V4.5 prompts — for new V5 work, use precise values instead.

## Character count

NovelAI reports getting up to 22 distinct characters on screen at once in internal testing using positioning. That is their claim under favorable conditions, not a practical working ceiling. Start at 1–4 and add. Consistency degrades as character count rises, and small resolutions make it noticeably worse.
