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
    const header = `/*
${pkg.displayName} ${pkg.version}. ${pkg.description}
Author ${pkg.author}. Built from nai-prompt-forge/src by tools/build.mjs; edit the source and rebuild rather than this file.

Top-level code runs in file order at load. Only 99-main starts anything; every other file declares.

FILES (in order)
  00-vocab-data   tag vocab (generated from data/vocab.json)
  01-util         tag and line helpers
  02-vocab        vocab lookup, suggestions, menus
  03-rules        the v8 image rules as data
  04-model        setups, cast, characters, library types
  05-assemble     blocks and the pre-flight checks
  06-jobs         the model's five jobs: cards, examples, parsers
  07-library-data built-in style blocks and kits, Lorebook text formats
  08-store        app state, story storage, permissions
  09-library      Lorebook reads and writes
  10-engine       runs steps through Send, or the budgeted background path
  11-doc          the blocks rendered into the story
  20-21 ui        the JSX panel
  99-main         hooks, panel, window, first run

HOOKS    onGenerationRequested, onBeforeContextBuild, onContextBuilt, onResponse, onGenerationEnd.
         They act only on steps started from the panel, or on Send in a story set up as a Forge workspace.

STORAGE
  story     forge.setup  forge.saved  forge.settings  forge.enabled  forge.doc  forge.fresh  forge.sheets.fallback
  lorebook  Forge · Characters, Styles, Kits, Examples, Cards (categories created disabled)
*/
`
    mkdirSync(join(root, 'dist'), { recursive: true })
    const dist = join(root, 'dist/prompt-forge.js')
    writeFileSync(dist, header + body)
    // .naiscript: YAML frontmatter in a /*--- … ---*/ block, then the code (format from NovelAI's own exports).
    for (const k of ['displayName', 'description', 'author', 'version']) if (String(pkg[k]).includes(':')) throw new Error(`package.json ${k} contains a colon; script frontmatter values must not`)
    const front = [
        '/*---',
        'compatibilityVersion: naiscript-1.0',
        `id: ${pkg.scriptId}`,
        `name: ${pkg.displayName}`,
        `createdAt: ${pkg.createdAt}`,
        `updatedAt: ${Date.now()}`,
        `version: ${pkg.version}`,
        `author: ${pkg.author}`,
        `description: ${pkg.description}`,
        `memoryLimit: ${pkg.memoryLimit}`,
        '---*/',
        '',
    ].join('\n')
    writeFileSync(join(root, 'dist/Prompt Forge.naiscript'), front + header + body)
    const kb = n => (n / 1024).toFixed(0) + ' KB'
    console.log(`dist/prompt-forge.js and dist/Prompt Forge.naiscript, ${kb(Buffer.byteLength(header + body))} (vocab ${kb(Buffer.byteLength(vocab))})`)
    if (existsSync(join(root, 'tools/pack_story.py'))) console.log('Pack into a .story with: python3 -I tools/pack_story.py')
}
