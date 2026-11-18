# Vietnamese data folder: first draft for testing

`data_vi.zip` contains a complete RPG Maker MZ `data` folder for 蒼星のサフィーリア 体験版 ver1.0.2, with the Vietnamese draft applied: all 155 JSON files. The 138 files that contain text are translated. The other 17 are byte-for-byte originals.

## Install for testing

1. Make a **copy** of the game folder. Don't test in the original.
2. In the copy, replace the whole `data` folder with the `data` folder from `data_vi.zip`.
3. Start the game from the copy.

## What is translated

- **All dialogue, choices and speaker names.** Lara Translate did the machine draft, followed by a pass that rejoined sentences split across lines, plus 36 lines fixed by hand.
- **Database text:** item, skill, weapon, armour, enemy and state names and descriptions, and battle messages.
- **Map names, objective text, picture text** (TIPS, profiles, status pop-ups) and battle-log text.
- **Menus and UI terms** (System.json). The 15 command names that were English in the original (`attack`, `guard`, `item`, `skill`, `escape`, `equip`, `status`, `save`, `option` …) stay in English. The game's command plugin loads a picture for each one from `img/SoRBatCom/Com_<name>.png`, so translating them broke the battle menu ("Failed to load … Com_Tấn công.png"). Those buttons are pictures, so translating their labels means editing the images.
- **By hand:** outfit and underwear names, body-status values and recent-event lines on the status screen, NPC pop-up chatter, and one battle-log script line.

Every file was checked automatically against the original: same structure, same event commands, same RPG Maker escape codes (`\c[n]`, `\v[n]`, `\i[n]` …). Nothing has been tested in game yet.

## Please check while playing

1. **Text fit.** Dialogue was rewrapped at 70 characters a line, with at most 4 lines per box. Look for text running off windows, especially item descriptions, TIPS and profile pictures, and status pop-ups.
2. **Vietnamese letters.** The game's font (`MPLUSRounded1c`) may not have every Vietnamese accented letter. Look for boxes or letters drawn in a different font. If you see them, the font needs replacing.
3. **Anything still in Japanese.** It most likely comes from `js/plugins.js` (custom menus such as the outfit menu, plugin windows) or from images. Neither was part of the files we received, so neither is translated.
4. **The outfit and status screens.** Those values were translated inside game variables. If a menu shows something wrong there, report which screen.

## Known language issues (for the Vietnamese reviewer)

- **Pronouns.** This is a machine draft, and pronouns (anh/em/chị/cô/tôi/mình…) are often wrong for who is speaking to whom. Check them scene by scene.
- **怪人.** Menus and some lines say **"quái nhân"**; most dialogue says **"kẻ lạ mặt"**. Pick one.
- **The company コランダライズテック** appears as both "Corandrise Tech" and "Corandarize Tech".
- **Name spellings** (Ayako, Maya, Rio, Misaki, Touya, Shijiki, Kagehisa Kayato…) are provisional where the game gives no reading. Please confirm them or send corrections. They're set in one list, so a change applies everywhere.
- **Proper nouns translated freely.** The organisation ブラックメノー and the title wording are among them.

Please send corrections with the Japanese line, or the scene and roughly what the line says, so it can be found quickly.
