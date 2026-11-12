#!/usr/bin/env node
// Build Prompt Forge into one NovelAI script. No npm packages: uses the global `tsc`.
//
//   node tools/build.mjs          type-check + bundle → dist/prompt-forge.js
//   node tools/build.mjs test     type-check + bundle the pure modules with test/*.ts, then run them under Node
//
// The NovelAI typings in docs/novelai/ are used as-is, except jsx-typings.d.ts, whose
// top-level `function`/`namespace JSX` lines get `declare` so tsc accepts the file.

import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const build = join(root, 'build')
const mode = process.argv[2] || 'dist'
mkdirSync(join(build, 'types'), { recursive: true })

// 1. Typings
const jsx = readFileSync(join(root, 'docs/novelai/jsx-typings.d.ts'), 'utf8').replace(/^(function |namespace JSX)/gm, 'declare $1')
writeFileSync(join(build, 'types/jsx-typings.d.ts'), jsx)
const typings = [
    join(root, 'types/shims.d.ts'),
    join(root, 'docs/novelai/script-types.d.ts'),
    join(build, 'types/jsx-typings.d.ts'),
    join(root, 'docs/novelai/script-types-experimental.d.ts'),
]

// 2. Vocab data module
const vocab = readFileSync(join(root, 'data/vocab.json'), 'utf8')
writeFileSync(join(build, '00-vocab-data.ts'), `// Generated from data/vocab.json. Do not edit.\nconst VOCAB_DATA: VocabData = ${vocab}\n`)

// 3. Sources, in file-name order
const src = readdirSync(join(root, 'src'))
    .filter(f => /\.tsx?$/.test(f))
    .sort()
    .map(f => join(root, 'src', f))
const pure = src.filter(f => /\/0[1-7]-/.test(f)) // util, vocab, rules, model, assemble, jobs, library data: no API calls

const tscArgs = out => [
    '--target', 'es2020', '--lib', 'es2020', '--module', 'none', '--ignoreDeprecations', '6.0', '--strict', '--noEmitOnError',
    '--jsx', 'react', '--jsxFactory', 'h', '--jsxFragmentFactory', 'Fragment',
    '--removeComments', '--newLine', 'lf', '--outFile', out,
]

function tsc(files, out) {
    try {
        execFileSync('tsc', [...tscArgs(out), ...typings, ...files], { stdio: 'inherit', cwd: root, timeout: 300000 })
    } catch {
        process.exit(1)
    }
}

if (mode === 'test') {
    const tests = readdirSync(join(root, 'test')).filter(f => f.endsWith('.ts')).sort().map(f => join(root, 'test', f))
    const out = join(build, 'test.js')
    tsc([join(build, '00-vocab-data.ts'), ...pure, ...tests], out)
    execFileSync(process.execPath, [out], { stdio: 'inherit', cwd: root })
} else {
    const out = join(build, 'forge.js')
    tsc([join(build, '00-vocab-data.ts'), ...src], out)
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
    const body = readFileSync(out, 'utf8')
    const header = [
        `// ${pkg.displayName} ${pkg.version}`,
        `// ${pkg.description}`,
        '// Built from nai-prompt-forge/src. Edit the source and rebuild rather than this file.',
        '',
    ].join('\n')
    mkdirSync(join(root, 'dist'), { recursive: true })
    const dist = join(root, 'dist/prompt-forge.js')
    writeFileSync(dist, header + body)
    const kb = n => (n / 1024).toFixed(0) + ' KB'
    console.log(`dist/prompt-forge.js ${kb(Buffer.byteLength(header + body))} (vocab ${kb(Buffer.byteLength(vocab))})`)
    if (existsSync(join(root, 'tools/pack_story.py'))) console.log('Pack into a .story with: python3 -I tools/pack_story.py')
}
