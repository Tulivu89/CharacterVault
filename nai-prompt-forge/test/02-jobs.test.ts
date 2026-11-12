// Job parsers against realistic (messy) model answers.

function run(job: JobId, setup: Setup, answer: string, arg: JobArg = {}, lib = emptyLib()) {
    const built = jobMessages(JOBS[job], setup, lib, arg, [])
    return { built, res: JOBS[job].parse(answer, setup, lib, arg, built.allowed) }
}

// ---------------------------------------------------------------- brief
{
    const s = blankSetup()
    s.idea = 'my fox mechanic messing with her friend at sunset'
    const { built, res } = run(
        'brief',
        s,
        `Sure! Here is the plan:
**WHO:** girl, tall fox girl in tank top ; girl, girl in yellow jacket
WHERE: garage, indoors
WHEN: evening
LIGHT: sunset through the door
CAMERA: Cowboy shot, from side
MOMENT: fox girl ruffles hair of girl in yellow jacket
MOOD: playful ; annoyed
RATING: general`,
    )
    check('brief messages: system + 1 example pair + input', built.messages.length === 4 && built.messages[0].role === 'system', built.messages.map(m => m.role))
    check('brief no retry', !res.retry, res)
    const n = res.applySetup!(s)
    eq('brief cast', n.cast.map(c => c.label), ['tall fox girl in tank top', 'girl in yellow jacket'])
    eq('brief moods', n.cast.map(c => c.mood), ['playful', 'annoyed'])
    eq('brief framing', [n.framing, n.hAngle], ['cowboy shot', 'from side'])
    check('brief title', n.title.startsWith('fox girl ruffles'), n.title)
    const bad = JOBS.brief.parse('I think a nice garage scene would work.', s, emptyLib(), {}, new Set())
    check('brief retry on junk', !!bad.retry, bad)
}

// ---------------------------------------------------------------- scene
{
    const s = garage()
    const { built, res } = run('scene', s, 'TAGS: Indoors, evening, sunset, backlighting, light_rays, garage, glorious vibes, blurry background\nBACKGROUND: detailed background')
    check('scene menu in input', built.messages[built.messages.length - 1].content!.includes('MENU:'), '')
    check('scene allowed has indoors', built.allowed.has('indoors'))
    check('scene no retry', !res.retry, res)
    const n = res.applySetup!(s)
    check('scene tags', n.scene.startsWith('indoors, evening, sunset, backlighting, light rays'), n.scene)
    eq('scene background', n.background, 'detailed background')
    check('scene rejected to prose', res.problems.some(p => p.includes('glorious vibes')), res.problems)
    check('scene bg not doubled', !n.scene.includes('blurry background'), n.scene)
    const junk = JOBS.scene.parse('TAGS: vibes, mood, aesthetic feelings', s, emptyLib(), {}, built.allowed)
    check('scene retry when off-menu', !!junk.retry, junk)
}

// ---------------------------------------------------------------- pose
{
    const s = garage()
    s.interactions = []
    const fox = s.cast[0]
    const { res } = run('pose', s, 'POSTURE: standing, sitting\nGESTURE: hand up\nEXPRESSION: grin, smug\nGAZE: looking at another\nACT: headpat > girl in yellow jacket', { castId: fox.id })
    check('pose no retry', !res.retry, res)
    const n = res.applySetup!(s)
    const m = n.cast[0]
    eq('pose posture one', m.state.posture, 'standing')
    eq('pose gaze', m.state.gaze, 'looking at another')
    eq('pose act', n.interactions.map(i => [i.act, i.target === s.cast[1].id]), [['headpat', true]])
    check('pose group dropped noted', res.problems.some(p => p.includes('sitting')), res.problems)
}

// ---------------------------------------------------------------- prose
{
    const s = garage()
    const good = run('prose', s, 'Fox girl in tank top stands on left beside motorcycle, right hand ruffling hair of girl in yellow jacket. Girl in yellow jacket sits sideways on motorcycle seat on right.')
    check('prose ok', !good.res.retry, good.res)
    check('prose input has figures', good.built.messages[good.built.messages.length - 1].content!.includes('FIGURES:'), '')
    const bad = run('prose', s, 'Here you go:\nRusty stands near the camera while she grins.')
    check('prose retry on pronoun/name', !!bad.res.retry && bad.res.retry.includes('"fox girl in tank top"'), bad.res)
    const msgs = retryMessages(bad.built.messages, 'Rusty stands near the camera while she grins.', bad.res.retry!)
    check('retry messages end with user hint', msgs[msgs.length - 1].role === 'user' && msgs[msgs.length - 2].role === 'assistant', msgs.map(m => m.role))
}

// ---------------------------------------------------------------- look / outfit
{
    const lib = emptyLib()
    const sheet = blankSheet()
    lib.sheets.push(sheet)
    const s = blankSetup()
    const head = run(
        'look',
        s,
        'IDENTITY: fox girl, tall female\nHAIR: long hair, ponytail, red hair, colored tips. Red hair fades to white at tips.\nHAIR HIDDEN: -\nHEAD: fox ears, animal ear fluff\nEYES: green eyes, tsurime\nFACE MARKS: freckles',
        { sheetId: sheet.id, group: 'head', description: 'fox mechanic' },
        lib,
    )
    check('look ok', !head.res.retry, head.res)
    const sh = head.res.applySheet!(sheet)
    eq('look hair', sh.look.hair, 'long hair, ponytail, red hair, colored tips. Red hair fades to white at tips.')
    check('look no hidden', !sh.look.hairHidden, sh.look)
    const body = run('look', s, 'SKIN: -\nUPPER: broad shoulders\nTORSO: toned\nLOWER: thick thighs\nTAIL: fox tail', { sheetId: sheet.id, group: 'body' }, lib)
    check('body card used', body.built.messages[0].content!.includes('body as image tags'), body.built.messages[0].content)
    const outfit = run('outfit', s, 'HEAD AND NECK: goggles on head\nTOP: white tank top\nOUTER: -\nHANDS: fingerless gloves\nBOTTOM: black pants\nLEGWEAR: -\nFOOTWEAR: black boots\nPROPS: -\nSTATE: Tank top smeared with grease.', { sheetId: sheet.id }, lib)
    const sh2 = outfit.res.applySheet!(sheet)
    eq('outfit top', sh2.outfits[0].lines.top, 'white tank top')
    eq('outfit state', sh2.outfits[0].lines.state, 'Tank top smeared with grease.')
    lib.cards.lookBody = 'MY BODY CARD'
    const own = run('look', s, '', { sheetId: sheet.id, group: 'body' }, lib)
    check('card override', own.built.messages[0].content!.includes('MY BODY CARD'), own.built.messages[0].content)
}

// ---------------------------------------------------------------- menus stay a sane size
{
    const s = garage()
    const sizes = (['scene', 'pose', 'prose'] as JobId[]).map(j => {
        const m = jobMessages(JOBS[j], s, emptyLib(), { castId: s.cast[0].id }, [])
        return estimateTokens(m.messages.map(x => x.content).join('\n'))
    })
    const look = estimateTokens(jobMessages(JOBS.look, s, emptyLib(), { group: 'head' }, []).messages.map(x => x.content).join('\n'))
    check('job contexts under ~4k tokens', [...sizes, look].every(n => n < 4000), [...sizes, look])
    console.log(`context estimates: scene ${sizes[0]}, pose ${sizes[1]}, prose ${sizes[2]}, look ${look}`)
}

console.log(`${passes} passed, ${failures} failed (jobs)`)
if (failures) process.exitCode = 1

// ---------------------------------------------------------------- library text round trips keep ids
{
    const sh = { ...blankSheet(), id: 'abc123', name: 'Rusty', label: 'tall fox girl', look: { hair: 'long hair, red hair. Red hair fades to white.' }, uc: 'short hair' }
    const back = sheetFromText('Rusty', sheetToText(sh), 'entry-9')
    eq('sheet id survives', back.id, 'abc123')
    eq('sheet look survives', back.look.hair, sh.look.hair)
    eq('sheet uc survives', back.uc, 'short hair')
    const st0 = BUILTIN_STYLES[1]
    const sb = styleFromText(st0.name, styleToText(st0), 'entry-1')
    eq('style id survives', sb.id, st0.id)
    eq('style addons survive', sb.addons.map(a => [a.name, a.ucDrop || '']), st0.addons.map(a => [a.name, a.ucDrop || '']))
    eq('style base verbatim', sb.base, st0.base)
    const k0 = BUILTIN_KITS[0]
    const kb = kitFromText(k0.name, kitToText(k0), 'entry-2')
    eq('kit round trip', [kb.id, kb.parts.faceShape, kb.uc], [k0.id, k0.parts.faceShape, k0.uc])
    const ex = exampleFromText(exampleToText({ id: 'x', job: 'prose', tags: ['general'], input: 'IN', output: 'OUT' }))
    eq('example round trip', ex && [ex.job, ex.input, ex.output, ex.tags], ['prose', 'IN', 'OUT', ['general']])
    const applied = applyKit(sh, k0)
    check('kit merges', /tsurime/.test(applied.look.faceShape || '') && applied.uc.includes('round face') && applied.uc.startsWith('short hair'), applied)
    console.log(`${passes} passed, ${failures} failed (library)`)
}
