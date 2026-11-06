# Character Prompt Standard (v1)

Every prompt note (`type: prompt`) and every character box is built to this standard, so any character gets the same depth of detail without the user spelling it out. Face structure comes from `face-kits.md`, tags from the `tags/` files, and the rules for boxes from SKILL.md §11 and §16.

## Layout

- **One slot per line, head to toe.** Paste the lines in order into a character box. NovelAI reads line breaks as spaces.
- **Every line ends with punctuation:** a comma when it ends on a tag, a period when it ends on a sentence. Then any line can be swapped, dropped or reordered and the box still reads cleanly.
- **Within a line, tags come first,** then at most one short sentence for what tags can't place (where a scar sits, how a color fades, how a cut is shaped).
- **Leave out a slot with nothing distinctive.** Never pad.
- **Look and outfits are separate.** The base look is the body that doesn't change. An outfit is everything worn or carried: clothes, jewelry, restraints, glow kits, held props and the state of each.
- **In frontmatter, use block scalars** (`base_prompt: |`) so line breaks survive. A quoted string folds them into one line.

## Base look

| # | Slot | Contents |
|---|---|---|
| 1 | Identity | `girl` / `boy` / `other` first, then species or type, skin-tone tag, ONE frame tag (from a body kit below), age-shape lever (`0.4::mature female::` on every petite woman). `dark-skinned female`/`male` for dark skin. Sentence: skin tone when no tag fits. |
| 2 | Hair | length → style → color → color effects → bangs/sidelocks → ahoge. Sentence: the cut or color story. |
| 3 | Hair, hidden part | Anything that shows from one angle only: undercut, shaved nape, back braid, hair tie. Own line so front views can drop it. |
| 4 | Head extras | Animal ears + `animal ear fluff`, horns, halo, `pointy ears`. Nonhumans: muzzle or snout here. |
| 5 | Face shape | Face-kit tags (eye shape, lashes) + kit Sentence 1: outline, chin, eye shape and spacing, nose. |
| 6 | Face modeling | Kit Sentence 2: cheekbones, jaw, brow ridge, lips, eyebrow shape. Dropped at cowboy shot and wider. |
| 7 | Eyes and brows | Eye color, pupils, sclera, eyebrows, makeup or `no makeup` prose. |
| 8 | Face marks | Scars, freckles, moles, piercings, facial tattoos. Sentence gives the location. |
| 9 | Skin and markings | Fur, scale or chitin color and pattern for nonhumans; body tattoos, scars, brands, glow markings, each placed in a sentence. |
| 10 | Upper body | Shoulders, chest (breasts or pectorals), collarbone, arms, hands, nails. |
| 11 | Torso | Waist, abs, stomach, navel, back, shoulder blades. |
| 12 | Lower body | Hips, ass, thighs, legs, bare-foot features. Nonhumans: digitigrade legs, paws, hooves. |
| 13 | Tail and low extras | Tail type, color and fluff; low wings. |

**Explicit layer.** Genital, nipple and pubic-hair lines come from the character's adult file at image time and go into the box only for explicit images (SKILL.md §21). They are saved only in a prompt note whose `rating` is explicit, in an `adult_prompt` field.

## Outfits

One field per look, each line one layer, every garment typed and colored:

1. Head and neck: hats, hair ornaments, earrings, chokers, collars.
2. Top.
3. Outerwear.
4. Hands and wrists: gloves, bracelets, cuffs.
5. Bottom.
6. Legwear.
7. Footwear, or `barefoot`.
8. Held props.
9. State sentence: wet, torn, unzipped, glowing, what color the lights are.

A line that is likely to change from scene to scene (a glow color, an unzipped jacket) gets its own line so it can be swapped.

**Outfit negative:** what this look must not grow, such as garments from the character's other outfits or the wrong footwear.

## Character UC

One guard per line, each ending with a comma:

1. **Frame guard:** the body kit's counter-UC.
2. **Face counter-UC:** from the face kit.
3. **Color drift:** hair, eye and skin colors the model drifts toward. Include a hidden hair color here when the front view must not show it.
4. **Species guard:** `extra ears` for kemonomimi, `anthro` against fur creep on a human, and similar.
5. **Age guard:** `loli, child, aged down` for women, `shota, child, aged down` for men. Required in every suggestive or explicit setup, and kept permanently in the note for petite characters.
6. **Stabilizer** (optional): from `style-blocks.md`, kept only when an A/B on a locked seed shows it helps.

## Framing trims

| Framing | Keep | Drop |
|---|---|---|
| Portrait, close-up | 1, 2, 4–8 | 10–13, most of the outfit below the collar |
| Upper body | 1, 2, 4–10 | 12–13, legwear, footwear |
| Cowboy shot | 1, 2, 4, 5 (tags + Sentence 1), 7–11 | 6, feet, footwear |
| Full body, wide | 1, 2, 4, 5 (tags only), 7, 9–13 | 6, Sentence 1 when the face is small |
| From behind, head down | 1, 2, 3, 9–13 | 5–8 |

Claude applies these trims before delivering. Each framing variant goes out as a complete, already-trimmed box (SKILL.md §4); the user never edits lines out. Note dropped anchors in the setup's notes (SKILL.md §11).

## Body kits (v0, untested)

The face kits were bench-tested. These have not been: A/B them on a locked seed and promote a kit to v1 once it holds. Tags come from the `tags/` files only.

| Kit | Box tags and sentence | Counter-UC |
|---|---|---|
| **Hard petite** (soldier, gymnast) | `petite, 0.4::mature female::, toned, abs, obliques, small breasts,` Compact shoulders, hard flat stomach, lean muscular thighs. | `tall female, curvy, plump, wide hips, large breasts, flat chest,` |
| **Athletic** | `toned, muscular female, abs, broad shoulders, medium breasts, thick thighs,` Swimmer's shoulders, defined arms, strong legs. | `petite, skinny, plump,` |
| **Willowy** | `tall female, skinny, small breasts, long legs, narrow waist, collarbone,` Long limbs, narrow hips. | `petite, curvy, thick thighs, plump,` |
| **Curvy** | `curvy, large breasts, narrow waist, wide hips, thick thighs,` Soft hourglass figure. | `skinny, muscular, abs, flat chest,` |
| **Soft** | `plump, medium breasts, belly, wide hips, thick thighs,` Soft rounded stomach, full arms. | `abs, muscular, skinny, narrow waist,` |
| **Powerhouse** | `tall female, muscular female, abs, biceps, broad shoulders, thick thighs,` Heavy shoulders, thick muscled arms. | `petite, skinny, narrow waist,` |
| **Lean male** | `toned male, collarbone, narrow waist,` Long lean muscle. | `muscular male, fat, large pectorals,` |
| **Brawler** | `muscular male, broad shoulders, large pectorals, biceps, veiny arms,` Thick neck, heavy hands. | `skinny, toned male,` |
| **Heavy male** | `mature male, fat, broad shoulders, belly,` Heavy-set, thick hands, soft gut over old muscle. | `abs, skinny, toned male,` |
| **Big anthro** | `anthro, muscular anthro, big muscles, broad shoulders, musclegut,` Barrel chest, heavy forearms. | `slim, skinny,` |

Height goes on the taller character only (`tall female`, `tall male`). Never shrink the shorter one (SKILL.md §11).

## Emotion table

Every prompt note carries an emotion table. Cleo's note (`Characters/Cleo/Cleo - Prompt - Card Looks.md`) is the reference set. Trim and retune its rows to the character's `Under pressure` notes, and add the expressions their story uses.

## Reference examples

- `style-blocks.md` → Qiulong: a fully detailed box in the older single-line form. Its contents are right; only the layout predates this standard.
- Notes written before v1 (Cleo, Barghest and the other Card Looks notes) are single-line. Convert one to this layout the next time it's used.
