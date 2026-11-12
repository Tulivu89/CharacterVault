// Tests for the pure modules (util, vocab, rules, assemble). Run with `node tools/build.mjs test`.

declare const process: { exitCode: number }
declare const console: { log(...a: any[]): void }

let failures = 0
let passes = 0
function check(name: string, cond: boolean, detail?: any) {
    if (cond) passes++
    else {
        failures++
        console.log(`FAIL ${name}`, detail === undefined ? '' : JSON.stringify(detail, null, 1))
    }
}
function eq(name: string, a: any, b: any) {
    check(name, JSON.stringify(a) === JSON.stringify(b), { got: a, want: b })
}

function emptyLib(): Library {
    return { sheets: [], styles: [], kits: [], examples: [], cards: {} }
}

// ---------------------------------------------------------------- util
eq('splitSegments weights', splitSegments('a, 1.2::b, c::, d'), ['a', '1.2::b, c::', 'd'])
eq('splitSegments negative weight', splitSegments('-2::monochrome, sketch::, x'), ['-2::monochrome, sketch::', 'x'])
eq('splitSegments randomizer', splitSegments('||red|blue||, hat'), ['||red|blue||', 'hat'])
eq('splitLine prose', splitLine('long hair, red hair, colored tips. Red hair fades to white at tips.'), { tags: ['long hair', 'red hair', 'colored tips'], prose: 'Red hair fades to white at tips.' })
eq('splitLine comma in sentence', splitLine('toned, abs, Swimmer\'s shoulders, defined arms, strong legs.').tags, ['toned', 'abs'])
eq('punctuateLine tags', punctuateLine('red hair'), 'red hair,')
eq('punctuateLine prose', punctuateLine('red hair, Fades to white'), 'red hair, Fades to white.')
eq('cleanModelText', cleanModelText('<think>hmm</think>\n```\nsitting, smile\n```'), 'sitting, smile')

// ---------------------------------------------------------------- vocab
const V = vocab()
check('vocab has 1girl', V.has('1girl'))
check('vocab cats', V.inCats('red hair', ['hairColor']))
eq('alias elf ears', V.canon('elf ears'), 'pointy ears')
check('artist count', (V.artistCount('dairi') || 0) > 1000)
check('suggest plural', V.suggest('twintail').includes('twintails'), V.suggest('twintail'))

// ---------------------------------------------------------------- rules
eq('count 1 girl', countTag(['girl']), '1girl, solo')
eq('count mixed', countTag(['girl', 'girl', 'boy']), '2girls, 1boy')
eq('count none', countTag([]), 'no humans')
eq('withRating', withRating('vivid colors, year 2026, high complexity', 'explicit'), 'vivid colors, rating:explicit, year 2026, high complexity')

// ---------------------------------------------------------------- tag cleaning
{
    const ctx = newCtx(blankSetup(), emptyLib())
    eq('clean underscores+alias', cleanTags('Elf_Ears, highres, v, white_thighhighs', ctx, 'X'), 'pointy ears, peace sign, white thighhighs')
    check('highres note', ctx.notes.some(n => n.includes('highres')), ctx.notes)
    eq('digit bug', cleanTag('1.4::artist:name3008::', ctx, 'X', true), '1.4::artist:name3008 ::')
}

// ---------------------------------------------------------------- worked example (SKILL §24)
function garage(): Setup {
    const s = blankSetup()
    s.canvas = 'landscape'
    s.objects = 'motorcycle'
    s.scene = 'indoors, garage, evening, sunset, backlighting, light rays'
    s.background = 'detailed background'
    s.framing = 'cowboy shot'
    s.hAngle = 'from side'
    s.medium = 'cel shading'
    const fox = castFromSheet(null, 'girl')
    fox.name = 'Rusty'
    fox.label = 'fox girl in tank top'
    fox.look = {
        identity: 'fox girl, tall female, muscular female',
        hair: 'long hair, ponytail, red hair, colored tips. Red hair fades to white at tips.',
        headExtras: 'fox ears, animal ear fluff',
        eyes: 'green eyes, tsurime',
        faceMarks: 'freckles',
        tail: 'fox tail, fluffy tail',
    }
    fox.outfit = { headNeck: 'goggles on head', top: 'white tank top. Tank top smeared with grease.', hands: 'fingerless gloves', bottom: 'black pants', footwear: 'work boots' }
    fox.state = { posture: 'standing', gesture: '', expression: 'grin', gaze: 'looking at another', extra: '' }
    fox.position = { x: 0.3, y: 0.38 }
    const jk = castFromSheet(null, 'girl')
    jk.name = 'Sunny'
    jk.label = 'girl in yellow jacket'
    jk.look = { hair: 'short hair, bob cut, black hair, blunt bangs', eyes: 'brown eyes' }
    jk.outfit = { top: 'white shirt', outer: 'yellow jacket, cropped jacket', bottom: 'blue shorts', footwear: 'sneakers', props: 'White motorcycle helmet rests in lap.' }
    jk.state = { posture: 'sitting', gesture: 'sitting sideways', expression: 'pout', gaze: 'looking at another', extra: '' }
    jk.position = { x: 0.68, y: 0.45 }
    s.cast = [fox, jk]
    s.interactions = [{ id: 'i1', actor: fox.id, act: 'headpat', target: jk.id, mutual: false }]
    s.prose = 'Fox girl in tank top stands on left beside motorcycle, ruffling hair of girl in yellow jacket. Girl in yellow jacket sits sideways on motorcycle seat on right.'
    return s
}
{
    const b = assemble(garage(), emptyLib())
    check('base starts with count', b.base.startsWith('2girls, motorcycle, indoors, garage'), b.base)
    check('shared gaze in base', b.base.includes('looking at another'), b.base)
    check('tail', b.base.endsWith('cel shading, year 2026, rating:general, high complexity'), b.base)
    check('char1 first line', b.chars[0].prompt.startsWith('girl, fox girl, tall female, muscular female,'), b.chars[0].prompt)
    check('char1 source act', b.chars[0].prompt.includes('source#headpat'), b.chars[0].prompt)
    check('char2 target act', b.chars[1].prompt.includes('target#headpat'), b.chars[1].prompt)
    check('gaze not in boxes', !b.chars[0].prompt.includes('looking at another'), b.chars[0].prompt)
    check('footwear dropped', !b.chars[0].prompt.includes('work boots') && !b.chars[1].prompt.includes('sneakers'), b.chars)
    check('drop noted', b.notes.some(n => n.includes('footwear')), b.notes)
    check('position title', b.chars[0].title === 'Character 1 — Position: x≈0.30 y≈0.38 (left third, upper body)', b.chars[0].title)
    check('bleed guard 1', b.chars[0].uc.includes('black hair') && b.chars[0].uc.includes('yellow jacket'), b.chars[0].uc)
    check('bleed guard 2', b.chars[1].uc.includes('red hair') && b.chars[1].uc.includes('fox ears'), b.chars[1].uc)
    check('extra ears', b.chars[0].uc.includes('extra ears') && !b.chars[1].uc.includes('extra ears'), b.chars.map(c => c.uc))
    check('lean uc + nsfw', b.baseUc.startsWith('lowres, artistic error') && b.baseUc.endsWith('nsfw'), b.baseUc)
    check('no age guard in general', !b.chars[0].uc.includes('aged down'), b.chars[0].uc)
    check('no errors', !b.issues.some(i => i.level === 'error'), b.issues)
    check('prose kept', b.base.includes('Fox girl in tank top stands on left'), b.base)
    check('prose after full stop', b.base.includes('looking at another. Fox girl') && b.base.includes('on right. cel shading'), b.base)
    check('box sentence after full stop', b.chars[0].prompt.includes('colored tips. Red hair fades to white at tips.'), b.chars[0].prompt)
    check('real tag missing from lists is info', b.issues.filter(i => i.msg.includes('"garage"')).every(i => i.level === 'info'), b.issues)
    check('settings landscape', b.settings.includes('1216x832'), b.settings)
}

// ---------------------------------------------------------------- framing trims
{
    const s = garage()
    s.framing = 'portrait'
    const b = assemble(s, emptyLib())
    check('portrait drops pants', !b.chars[0].prompt.includes('black pants'), b.chars[0].prompt)
    check('portrait drops tail', !b.chars[0].prompt.includes('fox tail'), b.chars[0].prompt)
    check('portrait keeps tank top', b.chars[0].prompt.includes('white tank top'), b.chars[0].prompt)
    s.framing = 'full body'
    const f = assemble(s, emptyLib())
    check('full body neg close-up', f.base.includes('full body, -1::close-up::'), f.base)
    check('full body keeps boots', f.chars[0].prompt.includes('work boots'), f.chars[0].prompt)
}

// ---------------------------------------------------------------- explicit rules
{
    const s = garage()
    s.rating = 'explicit'
    s.cast[0].look.identity = 'fox girl, petite, loli'
    s.cast[0].explicit = 'nipples'
    s.prose = 'Fox girl kneels. The child watches.'
    const b = assemble(s, emptyLib())
    check('loli removed', !b.chars[0].prompt.includes('loli'), b.chars[0].prompt)
    check('loli error', b.issues.some(i => i.level === 'error' && i.msg.includes('loli')), b.issues)
    check('age guard added', b.chars[0].uc.includes('loli, child, aged down'), b.chars[0].uc)
    check('explicit layer in', b.chars[0].prompt.includes('nipples'), b.chars[0].prompt)
    check('nsfw out of uc', !/\bnsfw\b/.test(b.baseUc), b.baseUc)
    check('rating tail', b.base.includes('rating:explicit'), b.base)
    check('age word in prose', b.issues.some(i => i.where === 'Base prose' && i.level === 'error'), b.issues)
}

// ---------------------------------------------------------------- prose lint + names
{
    const s = garage()
    s.prose = 'Rusty stands near the camera while she smiles at her friend.'
    const b = assemble(s, emptyLib())
    check('pronoun warn', b.issues.some(i => i.msg.startsWith('Pronouns')), b.issues)
    check('camera warn', b.issues.some(i => i.msg.includes('viewer')), b.issues)
    check('name error', b.issues.some(i => i.level === 'error' && i.msg.includes('Rusty')), b.issues)
}

// ---------------------------------------------------------------- single character + style block
{
    const s = garage()
    s.cast = [s.cast[1]]
    s.interactions = []
    s.cast[0].mood = 'flustered'
    s.cast[0].state.expression = ''
    s.styleId = 'vp'
    s.ucMode = 'style'
    const lib = emptyLib()
    lib.styles.push({ id: 'vp', name: 'Vivid Pop', base: 'pinup (style), 1::artist:bm94199 ::, vivid colors, year 2026, high complexity, best quality, very aesthetic', uc: 'lowres, worst quality, very displeasing,', addons: [], ownTail: true, note: '' })
    const b = assemble(s, lib)
    check('solo', b.base.startsWith('1girl, solo'), b.base)
    check('state in base', b.base.includes('sitting, sitting sideways, blush, wavy mouth, sweatdrop, looking at another'), b.base)
    check('no state in box', !b.chars[0].prompt.includes('sitting'), b.chars[0].prompt)
    check('own tail rating', b.base.includes('rating:general, year 2026, high complexity, best quality, very aesthetic'), b.base)
    check('no double tail', (b.base.match(/year 2026/g) || []).length === 1, b.base)
    check('style uc', b.baseUc.startsWith('lowres, worst quality, very displeasing') && b.baseUc.endsWith('nsfw'), b.baseUc)
    check('no position for single', b.chars[0].title === 'Character 1', b.chars[0].title)
}

// ---------------------------------------------------------------- exclusive groups and unknown tags
{
    const s = garage()
    s.camera = 'upper body'
    s.scene = 'indoors, garage, simple background, sparkly unicorn mist'
    const b = assemble(s, emptyLib())
    check('two framings', b.issues.some(i => i.msg.includes('framing')), b.issues)
    check('two backgrounds', b.issues.some(i => i.msg.includes('background')), b.issues)
    check('unknown tag', b.issues.some(i => i.msg.includes('sparkly unicorn mist')), b.issues)
}

console.log(`${passes} passed, ${failures} failed`)
if (failures) process.exitCode = 1
