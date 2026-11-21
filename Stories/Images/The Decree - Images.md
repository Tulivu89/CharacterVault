---
type: images
story: "[[The Decree]]"
world: "[[Hallett College]]"
rating: general
created: 2026-11-21
---
# The Decree - Images
*The comic's look kit: style, locations, lighting and the compositing pipeline. Explicit runs are in [[Hallett College - Images - Adult]] (DEM run) and the pose library's Hallett set.*

## Style
- **Comic (the look):** Painterly Comic v3 · Occult **v2c** (`style-blocks.md`). V5 Full, Euler, karras, 20 steps, Guidance 5.0, Rescale 0.1, prefer_brownian off, Quality Tags off, positions on for multi-character panels. No `nsfw` in UCs.
- **Semi-real:** Lacquer is the img2img detail pass over finished comic gens; it isn't good enough alone yet.

## Locations (set sentence + light line, used word for word in every panel there)
- **K1 · Wardcraft classroom: Gilded Classroom ✓.** Layout (from panel 6, the canon): tall arched windows on the left wall (the light always comes from the left); big chalkboard of chalk ward diagrams and hexagonal sigils on the front wall, with the massive carved gothic oak teacher's desk before it (the user's desk plate: pointed-arch and quatrefoil tracery panels, pillar corners, high-backed carved chair) and a chalk ward circle on the floor; the paneled door on the right wall with the Register clipboard on a nail. Dark wainscoting, teal plaster, alchemy charts, brass sconces, pendulum clock.
  Light: `dark fantasy, high contrast, Low-key saturated color: deep black shadows with jewel accents of teal, violet and amber. Low sun rakes through tall arched window from left, laying long gold bars of light across floor and walls, strong warm rim light on hair, shoulder and hip. Dust hangs gold in light beams. Right side of room sinks into cool teal shade.` (Never write "desks" in it.)
- **K2 · North Hall stairs and corridors: Overcast.** Old stone stairwell, dark oak banisters, worn treads; a narrow corridor of numbered dorm doors with a clipboard on a nail by each; tall leaded windows.
  Light: `dark fantasy, high contrast, Low-key color: wet slate grey and cold sea blue, flat overcast daylight through tall leaded windows, deep shadow in stairwells and doorways. Oxblood accents on clipboards and house banners. Rain streaks glass, cold highlights catch wet hair and stockings.`
- **K3 · The quad: Overcast.** Wide stone quadrangle, gothic brick halls with tall arched windows, bare autumn elms, wet flagstones.
  Light: `dark fantasy, high contrast, Low-key color: slate grey sky and cold sea-blue shadow, fallen leaves in rust and oxblood, flat overcast daylight with soft shadows, wet flagstones reflecting sky.`
- **K4 · Chancellor's office: Lamp Office ✓.** Wide dark walnut desk with an open ledger and signed paper; tall rain-streaked windows behind; shelves of leather ledgers. `green clothes` in Whitlock's UC (the lamp tints his coat).
  Light: `dark fantasy, high contrast, Low-key color: near-black shadows and warm lamp amber. Green-shaded banker's lamp at left lights face and hands from low and to side. Cold blue night light from rain-streaked windows edges hair and shoulders. Shadows pool like wet black ink in corners of room, warm highlights catch gold chain, rings and polished wood.`
- **K5 · Girls' wing bathroom: Caged Bulb.** Old tiled bathroom, subway tile gone grey, porcelain sinks under a long mirror, stalls with oxblood doors, cracked tile floor, a clipboard by the door.
  Light: `dark fantasy, high contrast, Low-key color: deep blacks and cold desaturated teal, one harsh caged bulb carving bodies out of shadow, heavy cast shadows. Oxblood red glow bleeds off stall doors, shadows pool like wet black ink in corners, glossy highlights catch sweat-slick skin and sheer stockings.`
- **K6 · The Halloween hallway:** to build with the showdown shot plan.

## What breaks, and the fixes
- **Crowds:** vague crowds mush (and can turn male). Name a small number in set rows with varied hair, or keep them out of frame; `multiple boys, male focus, crowd` in the UC for women-only rooms.
- **Furniture:** only single named pieces hold. Put `school desk, chair` in the Base UC when only the teacher's desk belongs.
- **Compositing pipeline:** (1) NAI cutout on `transparent background` with a body-only light line; (2) the room plate and set pieces from another model, in the same layout and light (prompts in the 2026-11-21 session); (3) composite; (4) NAI img2img harmonize with the panel's in-scene prompt (untested start: strength 0.35–0.45, noise 0); (5) optional Lacquer pass.

## Page 1 · the announcement (K1)
- **P1 establishing** ✓ (panel 6; Odile inpainted back in for detail): wide from the back row, students' backs in the foreground, Odile at the front reading the Act.
- **P2 Odile at the Register:** full body ✓ (panel 7, desks mushed) → 2A closer (cropped below the knee) with no furniture, or 2B as a cutout for compositing.
- **P3 reaction template:** portrait, the room dissolved to blur, hand over mouth. Base prompt holds framing, pose and light; swap the girl's face lines from the face bench, keep the uniform line.

## Character looks (locked)
- **Odile:** `voluptuous, mature female, medium breasts, wide hips` (soft belly when visible), `fat, chubby, plump, obese` in UC; level almond green eyes (`tareme` in UC); black-cherry chignon with the wand as a hair stick; the faculty military tunic, pencil skirt, seamed stockings, heels. `swastika, iron cross, peaked cap` and `green jacket, brown jacket, khaki` in UC.
- **Whitlock:** as the 2026-11-20 look test (✓ comic); never draw his shadow as a figure.
