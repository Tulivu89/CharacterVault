# MIS — Missionary set (Castellane)

Missionary-family pose blocks built on Séraphine and Aurelio in Cyber Comic (Style B). Every module is ○ untested as a module; the style itself is tested. Each module is one frozen moment with its own camera, canvas and both partners' state. Characters are assembled from the kits below; scene, light and style come from the shared blocks. Swap the kits to reuse any module with another pair.

Module order follows a scene's arc: entry, slow rhythm, leg variants, heat, climax, after, then POV and a second location. Story beats from *The Recovery Suite* (Part III–IV) are marked where a module illustrates one.

---

## Settings

```
Model: NovelAI Diffusion V5 Full (Anime) | Effort: High
Sampler: Euler Ancestral | Noise schedule: karras | Steps: 23 | Guidance: 6.3 | Rescale: 0
Resolution: per module | Seed: random
Quality Tags toggle: OFF | UC Preset: None
```

* Guidance 6.3 is the tested Style B value for solo portraits. Two bodies in contact are harder: if anatomy smears or limbs merge, drop to 5.0–5.5 before changing anything else.
* With the extended mix (Obj Shep, Calm), use Guidance 4.9 and Rescale 0.1, as tested.
* Landscape 1216×832 for side views of lying bodies; portrait 832×1216 for overhead, close-up and vertical stacks.

## Base UC and style

`[UC: Cyber Comic]` and `[STYLE B]` are the **Cyber Comic (Style B)** block in `style-blocks.md`, pasted whole. A module's color line follows the style base.

---

## Shared blocks

### Color lines
* **[WARM]** (bedroom default): `Warm color: oxblood, amber and gold against magenta and cyan neon, deep soft shadows.`
* **[CLINIC]** (recovery suite): `Cool clinical white from above, amber accent from door strip, deep soft shadows.`

### Tail
```
year 2026, rating:explicit, high complexity
```

### Bedroom light logic
Aurelio's bedroom: oxblood walls and sheets, a warm amber bedside lamp, rain-streaked window with magenta and cyan neon, and Séraphine's fiber-optic hair as a gold practical light. In every bedroom module the amber lamp keys the man's back, the neon rims the woman's profile, and her hair throws gold onto the pillow and onto his face when they're close. That gold underlight is the scene's signature; keep it.

---

## Character kits

### Séraphine

**SÉRA·FACE** — face-readable shots (her face is a main subject). Tested sheet, outfit removed.
```
girl, petite, 0.4::mature female::, medium hair, angled bob, rose-gold hair, glowing hair, swept bangs, frosty ice-blue eyes, tsurime, black eyeliner, thick eyelashes, heart-shaped face, wide cheekbones tapering to small pointed chin, upturned eyes, small upturned nose, fiber-optic hair glowing gold at the tips, three small clear diamond implants along each cheekbone, cool-toned cyberpunk eye makeup, cyan lower lash line, thin smudged teal lower liner, ultraviolet lip liner, glossy pink lips, luminous organic glow,
```

**SÉRA·SHORT** — two-shots where faces are mid-size. A full face kit in a two-shot forces a close-up.
```
girl, petite, 0.4::mature female::, medium hair, angled bob, rose-gold hair, glowing hair, swept bangs, frosty ice-blue eyes, tsurime, black eyeliner, glossy pink lips. Fiber-optic hair glows gold at tips. Three small clear diamond implants along each cheekbone.
```

**SÉRA·BODY** — face and hair out of frame.
```
girl, petite, 0.4::mature female::,
```

**Outfit close:** `nude, black choker` (she keeps the choker on). Drop `black choker` when the neck is out of frame.
**Feet detail** (only when feet are in frame): `Thin red strap marks cross tops of both feet.`
**Closed eyes:** remove `frosty ice-blue eyes` from the kit.

**SÉRA UC**
```
tareme, round face, chubby cheeks, button nose, thick eyebrows, dark skin, tan, long hair, tall female, grey hair, facial hair, beard, loli, child, aged down, teenage
```

### Aurelio

**AURE·FACE**
```
boy, tall male, 0.6::mature male::, short hair, slicked back hair, grey hair, facial hair, beard, blue eyes. Face long, strong jaw, fine lines at corners of eyes. Fingertips of right hand plated in polished gold.
```

**AURE·BODY** — face out of frame. Keep the gold sentence only when the right hand is visible.
```
boy, tall male, 0.6::mature male::. Fingertips of right hand plated in polished gold.
```

**Outfit close:** `nude`, or `open robe, black robe` for the prelude and the recovery suite.

**AURE UC**
```
bishounen, androgynous, long hair, black hair, cyborg, mechanical arms, rose-gold hair, glowing hair, angled bob, choker, shota, child, aged down
```

### Hand trick
Left/right is unreliable for hands. His gold fingertips solve it: give the **gold-tipped hand** one job and the **bare hand** another, and V5 has a visible way to tell them apart. Every two-hand module below uses it.

### Box assembly
`[KIT], <anatomy>, <state>. <prose>. <outfit close>`. Anatomy goes only in its owner's box and only when visible.

---

# I. ENTRY

## MIS-01 — Arch Kiss (prelude)
`prelude · foot worship · full body · from side · 1216×832` · ○ untested
*Part III: he lifts her ankles and kisses the strap marks before he kneels between her knees.*
Both legs up, him kneeling at the foot of the bed with one ankle in each hand, mouth on her arch. She's laughing. The tone-setter before the act.

**Canvas:** 1216×832

**Base Prompt**
```
1girl, 1boy, hetero, foot worship, indoors, bedroom, night, on bed, pillow, window, cityscape, neon lights, rim lighting, detailed background, full body, from side. Rose-gold-haired woman lies on back on left side of bed, both legs raised. Grey-haired man kneels at foot of bed on right, holding woman's ankles up and kissing arch of one foot. Woman's toes curl against man's cheek. Oxblood walls and oxblood sheets. Warm amber lamp behind man. Magenta neon through window edges woman's raised legs. [STYLE B] [WARM] year 2026, rating:questionable, high complexity
```

**Character 1 — Position: x≈0.32 y≈0.58 (left, lying)**
```
[SÉRA·SHORT], on back, legs up, target#foot worship, laughing, covering own mouth, looking at another, blush. Thin red strap marks cross tops of both feet. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.72 y≈0.40 (right, kneeling)**
```
[AURE·FACE], kneeling, source#foot worship, closed eyes. Gold-tipped hand holds one ankle, bare hand holds other ankle. open robe, black robe
```
Character 2 UC: AURE UC

**Notes:**
- `rating:questionable` because no act is shown; raise to explicit if her pose exposes her.
- `foot focus` in base pushes the arches to center and crops tighter. Strong tag; test it before keeping it.
- If both legs float stiffly, change `legs up` to `leg up` and lift only the kissed foot.

---

## MIS-02 — Guided Tip ("Look at me")
`entry · imminent vaginal · cowboy shot · from above · 832×1216` · ○ untested
*Part III: gold hand on himself, tip running through her, eye contact before the push.*
He kneels upright between her knees; she's on her back looking up the length of her body at him. Camera above, looking down her body.

**Canvas:** 832×1216

**Base Prompt**
```
1girl, 1boy, hetero, imminent vaginal, guided penetration, missionary, eye contact, indoors, bedroom, night, on bed, pillow, neon lights, rim lighting, detailed background, cowboy shot, from above. Rose-gold-haired woman lies on back, thighs spread around kneeling grey-haired man. Man kneels upright between woman's knees, gold-tipped hand holding penis, tip pressed against pussy. Faint blue light runs under gold fingertips. Woman's head on pillow at top of frame, man's hips at bottom. Glowing rose-gold hair lights pillow gold. Warm amber lamp from right, magenta neon from left. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.50 y≈0.30 (top, lying)**
```
[SÉRA·SHORT], pussy, pussy juice, nipples, on back, spread legs, knees up, sheet grab, parted lips, blush, heavy breathing. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.50 y≈0.68 (bottom, kneeling)**
```
[AURE·FACE], erection, penis, veiny penis, testicles, kneeling, hand on own penis. nude
```
Character 2 UC: AURE UC

**Notes:**
- `eye contact` sits in base and replaces per-box gaze tags.
- From above, the man's face can turn away from the viewer. If it does and you want it, add `from side` (angle pair: `from side, from above`).
- The blue thread under the gold is the electrodes waking. Drop the sentence if it turns into a glowing glove.

---

## MIS-03 — Entry Close-Up (cumulative)
`entry · close-up · from above · cumulative variants` · ○ untested
Tight anatomical crop, hips and thighs only. Gold fingers hold her open while the bare hand guides him in. Three variants walk the entry from tip to hilt.

**Canvas:** 832×1216 or 1024×1024

**Base Prompt**
```
1girl, 1boy, hetero, imminent vaginal, spreading another's pussy, missionary, on bed, close-up, from above. Only woman's hips, thighs and lower belly visible, lying on oxblood sheets. Man's gold-tipped fingers hold pussy open while bare hand guides penis tip to entrance. Magenta neon rims inner thighs, warm amber light on man's hands. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.50 y≈0.55**
```
[SÉRA·BODY], pussy, pussy juice, clitoris, spread legs, trembling. Inner thighs glisten. nude
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.50 y≈0.30**
```
[AURE·BODY], erection, penis, veiny penis. nude
```
Character 2 UC: AURE UC

**Variants:**
- *Halfway:* replace `imminent vaginal, spreading another's pussy` with `sex, vaginal`. Prose: `Penis half inside pussy, thick vein visible along exposed shaft. Gold fingertips rest on woman's hip.`
- *Hilted:* add `deep penetration` to base. Prose: `Man's hips flush against woman's, penis buried to base, testicles resting against woman's ass.` Optional `stomach bulge` in her box.

**Notes:**
- No faces, so no face kits. Positions barely matter at this crop; prose carries placement.
- Built without blood or defloration tags. The reset lives in the story text.

---

# II. SLOW RHYTHM

## MIS-04 — Forearm Cradle
`rhythm · cowboy shot · from side` · ○ untested
*Part III: slow strokes, his weight on his forearms, faces close, the conversation about Marchetti.*
Side profile of both bodies. Her knees up around his hips, his face just above hers, gold hand resting on her hip.

**Canvas:** 1216×832

**Base Prompt**
```
1girl, 1boy, hetero, sex, vaginal, missionary, boy on top, eye contact, indoors, bedroom, night, on bed, pillow, headboard, window, cityscape, neon lights, rim lighting, detailed background, cowboy shot, from side. Rose-gold-haired woman lies on back, head on pillow at left. Grey-haired man lies over woman, weight on both forearms, face close above woman's face. Woman's knees bent up around man's hips. Man's gold-tipped hand rests on woman's hip. Man's hips drawn back mid-stroke. Warm amber lamp lights man's back from right, magenta neon edges woman's profile from window at left, gold glow from woman's hair under both faces. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.36 y≈0.60 (left, lying)**
```
[SÉRA·SHORT], nipples, on back, knees up, spread legs, hand on another's back, half-closed eyes, parted lips, blush. Fingers spread across man's shoulder blades. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.58 y≈0.42 (center-right, on top)**
```
[AURE·FACE], on top, half-closed eyes, sweat. Forearms planted on either side of woman's head. nude
```
Character 2 UC: AURE UC

**Notes:**
- Genitals are hidden by her thigh from this side; no anatomy tags.
- "Hips drawn back" reads as a slow stroke. For the hold at the bottom, swap to `Man's hips pressed flush, still.`
- The gold underlight on his beard is what makes this read as this pair. If it vanishes, move the hair-glow sentence earlier in the prose.

---

## MIS-05 — Diamond Kisses
`rhythm · kiss · close-up · from above` · ○ untested
*Part III: he kisses the implants along her cheekbone one by one.*
Close-up on two heads. Her face turned on the pillow, his mouth on the diamonds, gold hair light on his beard.

**Canvas:** 832×1216

**Base Prompt**
```
1girl, 1boy, hetero, sex, missionary, indoors, bedroom, night, pillow, neon lights, close-up, from above. Grey-haired man kisses diamond implants along rose-gold-haired woman's cheekbone. Woman's head turned on pillow, eyes half-closed. Woman's fingertips trail through man's grey hair. Gold light from woman's glowing hair underlights man's beard. Magenta neon glints on diamonds. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.45 y≈0.55**
```
[SÉRA·FACE], on back, target#kissing cheek, looking to the side, half-closed eyes, smile, blush, parted lips. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.55 y≈0.35**
```
boy, tall male, 0.6::mature male::, short hair, slicked back hair, grey hair, facial hair, beard. Face long, strong jaw, fine lines at corners of eyes. source#kissing cheek, closed eyes. nude
```
Character 2 UC: AURE UC

**Notes:**
- His box is AURE·FACE minus eye color (closed) and minus the gold sentence (hand out of frame).
- *French kiss variant:* replace the kissing-cheek tags with `mutual#french kiss` in both boxes, add `saliva trail` to base, prose `Mouths open, tongues touching, thin saliva trail between lips.` Swap her gaze to `closed eyes` and drop her eye color.

---

## MIS-06 — Overhead Fan (Pixie view)
`rhythm · overhead · from above` · ○ untested
Straight down onto the bed. Her hair fanned gold across the dark sheet, fists in the pillow above her head, looking up into the drone's lens. His broad back covers her torso.

**Canvas:** 832×1216

**Base Prompt**
```
1girl, 1boy, hetero, sex, vaginal, missionary, boy on top, indoors, bedroom, night, on bed, pillow, neon lights, from above. View straight down onto bed. Rose-gold-haired woman lies on back, glowing hair fanned across oxblood sheet, looking up at viewer. Grey-haired man's broad back and shoulders cover woman's torso, face buried in woman's neck. Woman's arms raised above head, fists in pillow. Woman's legs bent around man's hips at bottom of frame. Man's gold-tipped hand grips woman's thigh. Glowing hair lights sheet gold around woman's head. Amber lamp light across man's back. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.50 y≈0.30 (top, head and arms)**
```
[SÉRA·FACE], on back, arms up, pillow grab, hair spread out, looking at viewer, half-closed eyes, parted lips, blush, sweat. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.50 y≈0.55 (center, back to viewer)**
```
[AURE·BODY], short hair, slicked back hair, grey hair, on top, back focus, sweat. Broad back fills center of frame. nude
```
Character 2 UC: AURE UC

**Notes:**
- `looking at viewer` is her looking into Pixie. The viewer *is* the drone, so don't add a `drone` tag here.
- His face is hidden; only hair and back go in his box.
- `back focus` is weak by design; it just keeps his back from turning into a chest.

---

# III. LEG VARIANTS

## MIS-07 — Leg Lock: Low Rear (Pixie feed)
`rhythm · leg lock · lower body · from behind · from below` · ○ untested
*Part IV: Pixie drops behind him; her ankles crossed over the small of his back, the strap marks, his ass clenching.*
Viewer low behind him at the foot of the bed. Her legs locked around his waist, soles toward the viewer, the connection below his testicles.

**Canvas:** 832×1216

**Base Prompt**
```
1girl, 1boy, hetero, sex, vaginal, missionary, deep penetration, indoors, bedroom, night, on bed, neon lights, rim lighting, lower body, from behind, from below. Viewer low behind man at foot of bed. Grey-haired man's buttocks clench mid-thrust at center of frame. Woman's legs wrap around man's waist, ankles crossed over small of man's back, soles toward viewer. Penis buried in pussy below man's testicles. Gold light from woman's out-of-frame hair spills across oxblood sheet. Amber lamp rims man's hips, magenta neon on woman's calves. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.50 y≈0.35**
```
[SÉRA·BODY], pussy, leg lock, crossed ankles, soles. Toes curled. Thin red strap marks cross tops of both feet. nude
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.50 y≈0.55**
```
boy, tall male, 0.6::mature male::, penis, testicles, ass, sweat. nude
```
Character 2 UC: AURE UC

**Notes:**
- `lower body` keeps both heads out. If heads appear anyway, add `head out of frame` to base.
- *Heel pull:* prose `Woman's heels drag man deeper.` Swap `crossed ankles` for prose if the ankles lock into one fused foot.
- `toe scrunch` is a possible tag for the curled toes; unverified, so the prose carries it.

---

## MIS-08 — Ankles Held High
`legs up · ankles held · full body · from side` · ○ untested
Him kneeling upright, one ankle in each hand, her legs spread high in a V, head pressed back into the pillow. Side silhouette.

**Canvas:** 1216×832

**Base Prompt**
```
1girl, 1boy, hetero, sex, vaginal, missionary, indoors, bedroom, night, on bed, pillow, headboard, window, neon lights, rim lighting, detailed background, full body, from side. Rose-gold-haired woman lies on back at left, legs raised high and spread in V. Grey-haired man kneels upright between woman's thighs at right, gold-tipped hand gripping one ankle, bare hand gripping other ankle. Woman's head pressed back into pillow. Magenta neon through window edges woman's raised legs, amber lamp on man's chest. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.30 y≈0.62 (left, lying)**
```
girl, petite, 0.4::mature female::, medium hair, angled bob, rose-gold hair, glowing hair, swept bangs, tsurime, black eyeliner, glossy pink lips. Fiber-optic hair glows gold at tips. Three small clear diamond implants along each cheekbone. pussy, nipples, on back, legs up, spread legs, target#ankle grab, head back, open mouth, closed eyes, blush, sweat. Thin red strap marks cross tops of both feet. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.66 y≈0.38 (right, kneeling)**
```
[AURE·FACE], penis, kneeling, source#ankle grab, looking down, sweat. nude
```
Character 2 UC: AURE UC

**Notes:**
- Her box is SÉRA·SHORT with eye color removed (closed eyes).
- *Wrist hold:* replace the ankle grip with `Man grips woman's forearm, holding woman's arm out straight; woman's legs over man's arms.` Her box `target#holding another's wrist`, his `source#holding another's wrist`.
- *Ankles to shoulders:* prose `Woman's ankles rest on man's shoulders, man's hands on woman's thighs.`

---

## MIS-09 — Leg Over Shoulder, Cradled Head
`legs up · leg over shoulder · cowboy shot · from side` · ○ untested
One leg up over his shoulder, the other bent by his hip. He leans in close, bare hand cradling the back of her head, gold hand on her raised thigh. Faces inches apart.

**Canvas:** 832×1216

**Base Prompt**
```
1girl, 1boy, hetero, sex, vaginal, missionary, indoors, bedroom, night, on bed, pillow, neon lights, rim lighting, blurry background, cowboy shot, from side. Rose-gold-haired woman lies back on pillows at right, one leg raised over grey-haired man's shoulder, other leg bent beside man's hip. Man leans in from left, bare hand cradling back of woman's head, gold-tipped hand gripping raised thigh. Faces inches apart. Gold glow from woman's hair lights man's face. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.62 y≈0.45 (right)**
```
[SÉRA·SHORT], pussy, nipples, on back, leg up, looking at another, parted lips, blush, sweat. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.38 y≈0.35 (left)**
```
[AURE·FACE], penis, source#hand on another's head, hand on another's head, looking at another. nude
```
Character 2 UC: AURE UC

**Notes:**
- `leg over shoulder` is unverified; `leg up` plus the prose carries it.
- The most intimate leg variant. Load her face; it's the read.

---

## MIS-10 — Deep Fold
`deep fold · mating press · full body · from side` · ○ untested
Knees pressed to her chest, soles up beside his head, his weight driving straight down while he leans over her folded legs to kiss her. The position tag changes to `mating press`.

**Canvas:** 1216×832

**Base Prompt**
```
1girl, 1boy, hetero, sex, vaginal, mating press, deep penetration, indoors, bedroom, night, on bed, pillow, neon lights, rim lighting, detailed background, full body, from side. Rose-gold-haired woman folded on back at left, knees pressed toward shoulders, soles up beside grey-haired man's head. Man's full weight bears straight down, hips driving down into woman. Man leans over folded legs to kiss woman. Amber lamp on man's back, gold hair glow between faces. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.34 y≈0.60 (left, folded)**
```
girl, petite, 0.4::mature female::, medium hair, angled bob, rose-gold hair, glowing hair, swept bangs, glossy pink lips. Fiber-optic hair glows gold at tips. pussy, knees to chest, legs up, soles, mutual#kiss, closed eyes, blush, sweat, heavy breathing. Thin red strap marks cross tops of both feet. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.55 y≈0.40 (center, over her)**
```
boy, tall male, 0.6::mature male::, short hair, slicked back hair, grey hair, facial hair, beard, penis, testicles, mutual#kiss, closed eyes, sweat. nude
```
Character 2 UC: AURE UC

**Notes:**
- `mating press` replaces `missionary`; never both.
- *Rear fold:* change camera to `from behind, from below`, drop faces and the kiss, and use MIS-07's body kits. Prose: `Woman's soles point up past man's shoulders, testicles pressed to woman's ass.`
- *Depth:* add `stomach bulge` to her box.

---

# IV. HEAT

## MIS-11 — Wrist Pin (the taunt)
`heat · wrist pin · upper body · from above` · ○ untested
*Part IV: "He was nicer." She's smirking; he's furious.*
His gold hand pins both her wrists to the pillow above her head. She smirks up at him; he glares down. Upper bodies only.

**Canvas:** 832×1216

**Base Prompt**
```
1girl, 1boy, hetero, sex, vaginal, missionary, boy on top, pinned, indoors, bedroom, night, on bed, pillow, neon lights, rim lighting, upper body, from above. Grey-haired man pins both of rose-gold-haired woman's wrists above head with gold-tipped hand, pressing wrists into pillow. Blue spark flickers under gold fingertips. Man's bare hand braced on mattress beside woman's ribs. Woman smirks up at man, man glares down. Gold hair glow lights man's face from below. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.50 y≈0.55 (lower, lying)**
```
[SÉRA·FACE], nipples, on back, arms up, target#holding another's wrist, looking at another, smirk, half-closed eyes, blush, sweat. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.50 y≈0.30 (upper, over her)**
```
[AURE·FACE], on top, source#holding another's wrist, looking at another, glaring, clenched teeth, sweat. nude
```
Character 2 UC: AURE UC

**Notes:**
- Smirk against glare is the whole beat. For the second after it, swap her to `open mouth, laughing`.
- The blue spark is optional color; cut it if it turns into lightning.

---

## MIS-12 — Driven Up the Bed
`heat · rough · full body · from side · dutch angle` · ○ untested
*Part IV: "Again. Again." Headboard knocking, her giggling and gasping.*
Hard strokes shove her up the bed, pillow knocked askew, her heels skidding on the rumpled sheet. Tilted camera, motion lines.

**Canvas:** 1216×832

**Base Prompt**
```
1girl, 1boy, hetero, sex, vaginal, missionary, rough sex, deep penetration, motion lines, indoors, bedroom, night, on bed, pillow, headboard, neon lights, rim lighting, detailed background, full body, from side, 2::dutch angle::. Grey-haired man drives hips hard into rose-gold-haired woman, shoving woman up bed toward headboard. Pillow knocked askew. Woman's heels slide on rumpled oxblood sheet. Man's face pressed into woman's neck, gold-tipped hand braced on headboard. Woman's nails rake man's back. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.32 y≈0.55 (left, lying)**
```
girl, petite, 0.4::mature female::, medium hair, angled bob, rose-gold hair, glowing hair, swept bangs, tsurime, black eyeliner, glossy pink lips. Fiber-optic hair glows gold at tips. Three small clear diamond implants along each cheekbone. nipples, on back, spread legs, bouncing breasts, head back, open mouth, smile, closed eyes, blush, sweat. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.55 y≈0.40 (center, on top)**
```
boy, tall male, 0.6::mature male::, short hair, slicked back hair, grey hair, facial hair, beard. Fingertips of right hand plated in polished gold. on top, clenched teeth, sweat. nude
```
Character 2 UC: AURE UC

**Notes:**
- `2::dutch angle::` is this module's one content emphasis. Remove it before raising anything else.
- `motion lines` can smear the whole image; A/B it on a locked seed.
- `smile` plus `open mouth` keeps her reading as giggling, which is what keeps this frame on the right side of rough.

---

# V. CLIMAX

## MIS-13 — Root Close-Up (cumulative)
`climax · root close-up · from behind · from below · pulse/x-ray/spill variants` · ○ untested
*Part IV: Pixie fills the feed with where they're joined.*
Extreme close from behind and below. Her thighs frame the shot, heels crossed at the top, his testicles drawn tight. Four variants run through the climax.

**Canvas:** 832×1216 (1024×1024 for the x-ray variant)

**Base Prompt**
```
1girl, 1boy, hetero, sex, vaginal, deep penetration, missionary, on bed, close-up, from behind, from below. Only joined hips visible. Penis buried to base in pussy, pussy stretched wide and glistening around shaft. Man's testicles drawn tight and high against body. Woman's thighs frame both sides of image, heels crossed at top. Oxblood sheet below. Amber rim light on man's skin, gold glow on woman's thighs. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.50 y≈0.40**
```
[SÉRA·BODY], pussy, pussy juice, spread legs, leg lock, trembling. nude
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.50 y≈0.60**
```
boy, tall male, 0.6::mature male::, penis, veiny penis, testicles. nude
```
Character 2 UC: AURE UC

**Variants (cumulative):**
- *Pulse:* add `internal cumshot, cum in pussy` to base; add `ejaculation` to his box. Prose: `Hard throb at root of penis, cum beading at edge of stretched pussy.`
- *X-ray:* on top of Pulse, add `cross-section, x-ray` to base. Prose: `Cross-section inset shows penis deep inside, cum filling womb.` If the inset doesn't appear, try `x-ray` alone.
- *Spill:* replace `sex, deep penetration` with `after vaginal`; base adds `cum in pussy, cumdrip, cum pool`. Prose: `Man half-soft inside woman, cum sliding out around shaft onto oxblood sheet, dark wet patch spreading.`

**Notes:**
- Built without the red streak from the story; blood stays in the text.
- Drawn-up testicles are the "about to" signal for the base frame; keep that sentence in every variant except Spill.

---

## MIS-14 — The Arch
`climax · her peak · arched back · full body · from side` · ○ untested
*Part IV: her back clear off the bed, toes curled against his spine, hands on his shoulders.*
Her orgasm in side profile. His face buried in her glowing hair, hips ground deep and still.

**Canvas:** 1216×832

**Base Prompt**
```
1girl, 1boy, hetero, sex, vaginal, missionary, deep penetration, female orgasm, indoors, bedroom, night, on bed, pillow, neon lights, rim lighting, detailed background, full body, from side. Rose-gold-haired woman's back arches clear off bed, ankles locked behind grey-haired man's back, toes curled hard against man's spine. Woman's hands grip man's shoulders. Man grinds deep and holds still, face buried in woman's glowing hair. Hair flares bright gold around both heads. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.36 y≈0.55 (left, arched)**
```
girl, petite, 0.4::mature female::, medium hair, angled bob, rose-gold hair, glowing hair, swept bangs, glossy pink lips. Fiber-optic hair glows gold at tips. Three small clear diamond implants along each cheekbone. nipples, on back, arched back, leg lock, crossed ankles, head back, open mouth, closed eyes, tears, trembling, blush, sweat. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.58 y≈0.42 (center, on top)**
```
boy, tall male, 0.6::mature male::, short hair, slicked back hair, grey hair, facial hair, beard, on top, closed eyes, clenched teeth, sweat. nude
```
Character 2 UC: AURE UC

**Notes:**
- `tears` reads as overwhelm here. Drop it for a cleaner, prouder orgasm.
- *Mutual finish:* add `ejaculation` to his box and `internal cumshot` to base. It's hidden from the side, so it mostly changes his expression and tension.

---

# VI. AFTER

## MIS-15 — Collapse
`after · collapse` · ○ untested
*Part IV end: he sags onto her, the electrodes gone cool.*
From above. His weight sprawled across her, face in her hair. She looks past his shoulder straight into Pixie. One arm around his back, the other limp, palm up.

**Canvas:** 832×1216

**Base Prompt**
```
1girl, 1boy, hetero, after sex, after vaginal, missionary, boy on top, indoors, bedroom, night, on bed, pillow, neon lights, from above. Grey-haired man sprawled heavy across rose-gold-haired woman, face in woman's hair, both slick with sweat. Gold-tipped hand rests on woman's hip, fingertips dark. Woman stares up at viewer over man's shoulder, one arm around man's back, other arm limp on sheet palm up. Hair fanned across rumpled oxblood sheet, glow dimmed. [STYLE B] [WARM] year 2026, rating:explicit, medium complexity
```

**Character 1 — Position: x≈0.50 y≈0.30 (top, head)**
```
[SÉRA·FACE], on back, looking at viewer, half-closed eyes, parted lips, blush, sweat, heavy breathing. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.50 y≈0.55 (center, sprawled)**
```
[AURE·BODY], short hair, slicked back hair, grey hair, lying on person, sweat. nude
```
Character 2 UC: AURE UC

**Notes:**
- `medium complexity`: a still scene; high complexity over-fills the sheets.
- Her look into the drone carries the story's after-taste. For something emptier, add `empty eyes`.

---

# VII. POV & LOCATION

## MIS-16 — POV: Gold Hands
`POV · hands` · ○ untested
Viewer is the man. His gold-tipped right hand and bare left hand grip her hips; she looks up into the viewer's face.

**Canvas:** 832×1216

**Base Prompt**
```
1girl, 1boy, hetero, pov, pov hands, sex, vaginal, missionary, penis, indoors, bedroom, night, on bed, pillow, neon lights, rim lighting, from above. Viewer kneels between rose-gold-haired woman's thighs, hands gripping woman's hips. Fingertips of viewer's right hand plated in polished gold, faint blue light under gold. Woman lies on back looking up at viewer, glowing hair fanned on pillow. Amber lamp light falls from behind viewer, magenta neon rims woman's body. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.50 y≈0.40**
```
[SÉRA·FACE], pussy, nipples, on back, spread legs, sheet grab, looking at viewer, parted lips, blush, heavy breathing, sweat. nude, black choker
```
Character 1 UC: SÉRA UC

**One box only.** The POV man gets no character box (a box spawns a visible person); his anatomy goes in base. `1boy` stays in the count.

**Variants:**
- *Taunt:* her expression `smirk, half-closed eyes`.
- *Sweet face:* her expression `smile, blush`, prose `Woman gazes up sweetly at viewer.`
- *Ankle up:* add `leg up` to her box; prose `Viewer's gold-tipped hand holds one of woman's ankles up beside viewer's head.` Add the strap-mark sentence.

---

## MIS-17 — Cradle Edge (recovery suite)
`second location · edge of surface · cowboy shot · from side` · ○ untested
*Back in the clinic.* She lies back across the edge of the medical cradle, one leg up, the other hooked behind his thigh. He stands between her legs in the open black robe, leaning down to kiss her.

**Canvas:** 832×1216

**Base Prompt**
```
1girl, 1boy, hetero, sex, vaginal, missionary, indoors, hospital, hospital bed, ceiling light, detailed background, cowboy shot, from side. Rose-gold-haired woman lies back across edge of white medical cradle, one leg raised high, other foot hooked behind grey-haired man's thigh. Man stands between woman's legs in open black robe, leaning down to kiss woman. Gold-tipped hand grips woman's raised thigh, bare hand braced on cradle. White clinic room, steel cabinets. Amber privacy strip glows over door. Empty velvet case on steel tray. [STYLE B] [CLINIC] year 2026, rating:explicit, high complexity
```

**Character 1 — Position: x≈0.35 y≈0.45 (left, reclined)**
```
girl, petite, 0.4::mature female::, medium hair, angled bob, rose-gold hair, glowing hair, swept bangs, glossy pink lips. Fiber-optic hair glows gold at tips. Three small clear diamond implants along each cheekbone. pussy, nipples, on back, leg up, mutual#kiss, closed eyes, blush. nude, black choker
```
Character 1 UC: SÉRA UC

**Character 2 — Position: x≈0.60 y≈0.35 (right, standing)**
```
[AURE·FACE], penis, standing, leaning forward, mutual#kiss, closed eyes. open robe, black robe
```
Character 2 UC: AURE UC

**Notes:**
- Drop `blue eyes` from AURE·FACE here (closed eyes).
- `hospital bed` is the closest tag to the cradle; the prose corrects the shape. If it comes out as a ward bed with rails, add `bed rail` to Base UC.
- The empty velvet case dates the frame to after the fittings.

---

# COMIC PAGES

Per the comic method: base establishes the comic and shared details; each panel gets its own character slot that describes that panel's composition and both characters as shown in it. Base UC drops `multiple views`.

### Example — 3-panel page (MIS-02 → MIS-11 → MIS-07)

**Canvas:** 832×1216

**Base Prompt**
```
1girl, 1boy, hetero, sex, comic, 3 panel comic, indoors, bedroom, night, on bed, neon lights, rim lighting. Wide first panel across top, two panels side by side below. Oxblood walls and oxblood sheets. Warm amber lamp, magenta and cyan neon through window. Glowing rose-gold hair lights pillow gold. Details remain consistent across all panels. [STYLE B] [WARM] year 2026, rating:explicit, high complexity
```

**Panel 1 — Position: x≈0.50 y≈0.18 (top, wide)**
```
girl, boy, cowboy shot, from above, imminent vaginal, eye contact. Petite rose-gold-haired woman with angled bob and diamond implants on cheekbones lies on back, thighs spread. Tall grey-haired bearded man kneels upright between woman's knees, gold-tipped hand holding penis to pussy.
```

**Panel 2 — Position: x≈0.25 y≈0.68 (bottom left)**
```
girl, boy, upper body, from above, pinned. Grey-haired bearded man pins rose-gold-haired woman's wrists above head with gold-tipped hand. Woman smirks up, man glares down, both sweating.
```

**Panel 3 — Position: x≈0.75 y≈0.68 (bottom right)**
```
girl, boy, lower body, from behind, from below, deep penetration. Woman's legs locked around man's waist, ankles crossed over small of man's back, soles toward viewer, thin red strap marks on feet. Man's buttocks clench mid-thrust.
```

**Panel UC (all slots)**
```
loli, shota, child, aged down, teenage, tareme, round face, chubby cheeks, long hair, black hair, bishounen, cyborg, mechanical arms
```

**Notes:**
- Panel order and count are suggestions; V5 may rearrange. For controlled pages, generate each module separately on one locked seed and assemble.
- Keep each panel slot short. Full kits in three slots blow the token ceiling and the style tail gets dropped.

---

# REFERENCE MAP

| Reference | Module |
|---|---|
| 5ff6d907 (side, leg up, head cradled) | MIS-09 |
| 5e52769d (ankles held, V) | MIS-08 |
| nick_and_kaitlyn (arm held, legs up) | MIS-08 wrist-hold variant |
| df5ebde0 (overhead, arms up) | MIS-06 |
| guinaifen (folded kiss) | MIS-10 |
| calm-artist (rear fold, overflow) | MIS-10 rear fold, MIS-13 Spill |
| dabe7848 (from behind, legs up) | MIS-07 |
| 6fd6920c (edge of surface, kiss) | MIS-17 |
| 87f7807d (oral, couch) | held for the oral library |

---

# EXPANSION OPTIONS

- **Pixie in frame:** add `drone` to base with prose placing the drone above the headboard, lens toward the bed. Pairs with any wide module.
- **Window press:** missionary against the rain-streaked window, her back on the glass, neon behind.
- **Robe still on:** MIS-04 or 12 with his open robe draped over both of them.
- **Other pairs:** the modules take any kits. Swap SÉRA/AURE for another sheet and keep the scene, light and style blocks.
- **Cowgirl and doggystyle libraries** in the same structure, then oral (the couch reference is saved for it).
