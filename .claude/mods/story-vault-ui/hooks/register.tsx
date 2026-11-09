import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Picture, Tab, VaultView } from '../types'

const PANE = 'vault'
const view = atom({ plugin: 'story-vault-ui', key: 'view' } as const, null, { shape: 'view-2' })
const tab = atom({ plugin: 'story-vault-ui', key: 'tab' } as const, 'story', { shape: 'tab-1' })

const TAE = '#8e44ad'
// Terminal portraits: 20 x 20 pixels as half blocks (vault.py thumbs writes them).
const CELL_COLS = 20
const CELL_ROWS = 10
const PALETTE = ['#c0392b', '#2471a3', '#1e8449', '#b9770e', '#7d3c98', '#117a65', '#a04000', '#5d6d7e']
const TABS: { id: Tab; label: string }[] = [
  { id: 'story', label: 'Story' },
  { id: 'stories', label: 'Stories' },
  { id: 'characters', label: 'Characters' },
  { id: 'settings', label: 'Settings' },
  { id: 'profile', label: 'Profile' },
  { id: 'commands', label: 'Commands' },
]
const QUICK: { label: string; text: string; send: boolean }[] = [
  { label: 'Save', text: '[save]', send: true },
  { label: 'Rewind', text: '[rewind: ]', send: false },
  { label: 'Tone', text: '[tone: ]', send: false },
  { label: 'State', text: '[state]', send: true },
  { label: 'Pitch', text: '[pitch]', send: true },
  { label: 'Help', text: '[help]', send: true },
]
const ALL_COMMANDS: { group: string; items: { label: string; text: string; send: boolean }[] }[] = [
  { group: 'In a scene', items: [
    { label: 'Stop', text: '[stop]', send: true }, { label: 'Pause', text: '[pause]', send: true },
    { label: 'Resume', text: '[resume]', send: true }, { label: 'Rewind', text: '[rewind: ]', send: false },
    { label: 'Tone', text: '[tone: ]', send: false }, { label: 'Check', text: '[check]', send: true } ] },
  { group: 'Story', items: [
    { label: 'Setup', text: '[setup]', send: true }, { label: 'Pitch', text: '[pitch]', send: true },
    { label: 'Save', text: '[save]', send: true }, { label: 'Done', text: '[done]', send: true },
    { label: 'Scope', text: '[scope]', send: true }, { label: 'Profile', text: '[profile]', send: true } ] },
  { group: 'Co-writer', items: [
    { label: 'Persona', text: '[persona]', send: true }, { label: 'Persona off', text: '[persona: off]', send: true },
    { label: 'Persona on', text: '[persona: on]', send: true } ] },
  { group: 'Style library', items: [
    { label: 'Keep', text: '[keep]', send: true }, { label: 'Avoid', text: '[avoid: "" — ]', send: false },
    { label: 'Distill', text: '[distill]', send: true } ] },
  { group: 'Look things up', items: [
    { label: 'State', text: '[state]', send: true }, { label: 'Cast', text: '[cast]', send: true },
    { label: 'Lint', text: '[lint]', send: true }, { label: 'Help', text: '[help]', send: true } ] },
]

function colorFor(name: string): string {
  let h = 0
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return PALETTE[h % PALETTE.length] ?? TAE
}

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function badgeSvg(name: string, color: string, size: number): string {
  const t = initials(name).replace(/[<&>"]/g, '')
  const r = size / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<circle cx="${r}" cy="${r}" r="${r - 1}" fill="${color}"/>` +
    `<text x="${r}" y="${r + size * 0.14}" font-family="sans-serif" font-size="${size * 0.4}" font-weight="700" fill="#fff" text-anchor="middle">${t}</text></svg>`
}

function photoSvg(b64: string, size: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<defs><clipPath id="c"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></clipPath></defs>` +
    `<image clip-path="url(#c)" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice" href="data:image/png;base64,${b64}" xlink:href="data:image/png;base64,${b64}"/></svg>`
}

async function refresh($: EngineInterface): Promise<void> {
  try {
    const script = `${$.plugin.root}/hooks/load_vault.py`
    const { stdout } = await $.process.run(['python3', script], { timeoutMs: 30000 })
    const parsed = JSON.parse(stdout) as VaultView
    await update($, view, () => parsed)
  } catch (err) {
    await update($, view, () => ({ error: String(err) }))
  }
}

function press($: EngineInterface, text: string, send: boolean): void {
  if (send) void $.prompt.submit({ text, asUser: true })
  else void $.prompt.fill({ text, mode: 'replace', cursor: text.endsWith(']') ? text.length - 1 : text.length })
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'vault', description: 'Open the Story Vault pane' })
    await $.command.register({ name: 'story', description: 'Open the Story Vault pane on the active story' })
    void refresh($)
    void $.ui.open({ id: PANE, title: 'Vault' })
    return next(e)
  })

  on('command.run', { command: 'vault' }, async $ => {
    await refresh($)
    await $.ui.open({ id: PANE, title: 'Vault' })
    return { text: 'Vault pane opened.' }
  })

  on('command.run', { command: 'story' }, async $ => {
    await update($, tab, () => 'story' as Tab)
    await refresh($)
    await $.ui.open({ id: PANE, title: 'Vault' })
    return { text: 'Vault pane opened on the active story.' }
  })

  on('turn.complete', async ($, e, next) => {
    const done = await next(e)
    void refresh($)
    return done
  })

  // The command strip above the prompt.
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const { Box, Button } = $.ui.resolve(e)
    return (
      <Box flexDirection="row" flexWrap="wrap" gap="xs">
        <Button key="vault" label="Vault" variant="primary"
          onPress={() => { void refresh($); void $.ui.open({ id: PANE, title: 'Vault' }) }} />
        {QUICK.map(c => (
          <Button key={c.label} label={c.label} variant="secondary" onPress={() => press($, c.text, c.send)} />
        ))}
      </Box>
    )
  })

  // The Vault pane: tabs over the active story, every story, character and setting, the profile and the commands.
  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button, Markdown } = $.ui.resolve(e)
    const v = await read($, view)
    const current = await read($, tab)

    const pic = (name: string, p: Picture | null | undefined, size: number) => {
      if (e.surface === 'terminal') {
        if (p?.cells) {
          const { Raster } = $.ui.resolve(e)
          return <Raster key={`px-${name}`} cells={p.cells} columns={CELL_COLS} rows={CELL_ROWS} />
        }
        return <Text color="#ffffff" backgroundColor={colorFor(name)} bold>{` ${initials(name)} `}</Text>
      }
      const { Svg } = $.ui.resolve(e)
      return p?.thumb
        ? <Svg source={photoSvg(p.thumb, size)} alt={name} width={size} height={size} />
        : <Svg source={badgeSvg(name, colorFor(name), size)} alt={initials(name)} width={size} height={size} />
    }

    const tabs = (
      <Box flexDirection="row" flexWrap="wrap" gap="xs">
        {TABS.map(t => (
          <Button key={`tab-${t.id}`} label={t.label} variant={t.id === current ? 'primary' : 'secondary'}
            onPress={() => void update($, tab, () => t.id)} />
        ))}
      </Box>
    )

    if (!v) return <Box flexDirection="column" gap="sm">{tabs}<Text dimColor>Loading the vault…</Text></Box>
    if (v.error) return <Box flexDirection="column" gap="sm">{tabs}<Text dimColor>{v.error}</Text></Box>

    let body
    if (current === 'story') {
      const a = v.active
      body = !a
        ? <Text dimColor>No active story. Open Stories to pick one up, or send [pitch].</Text>
        : (
          <Box flexDirection="column" gap="sm">
            <Box flexDirection="column">
              <Text bold size="heading">{a.story}</Text>
              <Text dimColor>{[a.mode, a.pov].filter(Boolean).join(' · ')}</Text>
            </Box>
            {a.lastBeat && (
              <Box flexDirection="column" borderStyle="round" borderColor={TAE} paddingX={1}>
                <Text bold color={TAE}>Last beat</Text>
                <Text>{a.lastBeat}</Text>
              </Box>
            )}
            <Text bold>Cast</Text>
            {a.cast.map(c => (
              <Box key={`cast-${c.name}`} flexDirection="row" gap="sm" alignItems="center">
                {pic(c.name, c.portrait, 32)}
                <Text wrap="wrap">{c.line}</Text>
              </Box>
            ))}
            {a.state.length > 0 && (
              <Box flexDirection="column">
                <Text bold>State</Text>
                <Markdown text={a.state.map(s => `- ${s}`).join('\n')} />
              </Box>
            )}
          </Box>
        )
    } else if (current === 'stories') {
      body = (
        <Box flexDirection="column" gap="sm">
          {(v.stories ?? []).map(s => (
            <Box key={`story-${s.name}`} flexDirection="column" borderStyle="round" borderDimColor paddingX={1}>
              <Text bold>{s.name}</Text>
              <Text dimColor>{[s.status, s.mode, s.world].filter(Boolean).join(' · ')}</Text>
              {s.lastBeat && <Text wrap="wrap">{s.lastBeat.length > 160 ? s.lastBeat.slice(0, 159) + '…' : s.lastBeat}</Text>}
              <Box flexDirection="row" gap="xs">
                <Button key={`pick-${s.name}`} label="Pick up" variant="primary"
                  onPress={() => press($, `pick up ${s.name}`, true)} />
                <Button key={`state-${s.name}`} label="State" variant="secondary"
                  onPress={() => press($, `[state ${s.name}]`, true)} />
              </Box>
            </Box>
          ))}
        </Box>
      )
    } else if (current === 'characters') {
      const worlds = [...new Set((v.characters ?? []).map(c => c.world))]
      body = (
        <Box flexDirection="column" gap="sm">
          {worlds.map(w => (
            <Box key={`world-${w}`} flexDirection="column" gap="xs">
              <Text bold color={TAE}>{w}</Text>
              {(v.characters ?? []).filter(c => c.world === w).map(c => (
                <Box key={`char-${c.name}`} flexDirection="row" gap="sm" alignItems="center">
                  {pic(c.name, c.portrait, 40)}
                  <Box flexDirection="column" flexShrink={1}>
                    <Text bold>{c.name}<Text dimColor>{[c.age, c.species].filter(Boolean).length ? ` · ${[c.age, c.species].filter(Boolean).join(' · ')}` : ''}</Text></Text>
                    {c.hook && <Text dimColor wrap="wrap">{c.hook}</Text>}
                  </Box>
                  <Button key={`show-${c.name}`} label="Show" variant="secondary" onPress={() => press($, `[show ${c.name}]`, true)} />
                  <Button key={`pitch-${c.name}`} label="Pitch" variant="secondary" onPress={() => press($, `[pitch: ${c.name}]`, true)} />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      )
    } else if (current === 'settings') {
      body = (
        <Box flexDirection="column" gap="sm">
          {(v.settings ?? []).map(s => (
            <Box key={`setting-${s.name}`} flexDirection="column" borderStyle="round" borderDimColor paddingX={1}>
              <Text bold>{s.name}<Text dimColor>{s.world && s.world !== s.name ? ` · ${s.world}` : ''}</Text></Text>
              {s.hook && <Text wrap="wrap" dimColor>{s.hook}</Text>}
              <Box flexDirection="row" gap="xs">
                <Button key={`sshow-${s.name}`} label="Show" variant="secondary" onPress={() => press($, `[show ${s.name}]`, true)} />
                <Button key={`spitch-${s.name}`} label="Pitch here" variant="primary" onPress={() => press($, `[pitch: ${s.name}]`, true)} />
              </Box>
            </Box>
          ))}
        </Box>
      )
    } else if (current === 'profile') {
      const p = v.profile
      const cw = v.coWriter
      const list = (title: string, items: string[] | undefined) =>
        items && items.length > 0 && (
          <Box key={`p-${title}`} flexDirection="column">
            <Text bold>{title}</Text>
            <Markdown text={items.map(i => `- ${i}`).join('\n')} />
          </Box>
        )
      body = (
        <Box flexDirection="column" gap="sm">
          {cw && (
            <Box flexDirection="row" gap="sm" alignItems="center" borderStyle="round" borderColor={TAE} paddingX={1}>
              {pic(cw.name, cw.portrait, 48)}
              <Box flexDirection="column">
                <Text bold color={TAE}>Co-writer: {cw.name}</Text>
                <Text dimColor>{Object.keys(cw.moods).length ? `Moods: ${Object.keys(cw.moods).join(', ')}` : 'No mood images yet'}</Text>
              </Box>
            </Box>
          )}
          {list('Defaults', p?.defaults)}
          {list('Kinks and themes', p?.kinks)}
          {list('Limits', p?.limits)}
          {list('Style', p?.style)}
          <Box flexDirection="row" gap="xs">
            <Button key="profile" label="Change profile" variant="secondary" onPress={() => press($, '[profile]', true)} />
            <Button key="persona" label="Change co-writer" variant="secondary" onPress={() => press($, '[persona]', true)} />
          </Box>
        </Box>
      )
    } else {
      body = (
        <Box flexDirection="column" gap="sm">
          {ALL_COMMANDS.map(g => (
            <Box key={`g-${g.group}`} flexDirection="column" gap="xs">
              <Text bold>{g.group}</Text>
              <Box flexDirection="row" flexWrap="wrap" gap="xs">
                {g.items.map(c => (
                  <Button key={`c-${g.group}-${c.label}`} label={c.label} variant="secondary" onPress={() => press($, c.text, c.send)} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )
    }

    return (
      <Box flexDirection="column" gap="sm">
        {tabs}
        {body}
        <Button key="refresh" label="Refresh" variant="secondary" onPress={() => void refresh($)} />
      </Box>
    )
  })

  // Out-of-character replies wholly in [brackets] draw as the co-writer's bubble, with a
  // reaction face when the reply opens with a mood in braces: [{smug} ...].
  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    const text = e.props.text.trim()
    const v = await read($, view)
    const cw = v?.coWriter
    if (!cw || e.props.isSummary || !text.startsWith('[') || !text.endsWith(']')) return next(e)
    let inner = text.slice(1, -1).trim()
    const mood = inner.match(/^\{([a-z-]+)\}\s*/i)
    if (mood) inner = inner.slice(mood[0].length)
    const face = (mood && cw.moods[mood[1]!.toLowerCase()]) || cw.portrait
    const { Box, Text, Markdown } = $.ui.resolve(e)
    let faceEl = null
    if (face?.cells && e.surface === 'terminal') {
      const { Raster } = $.ui.resolve(e)
      faceEl = <Raster key="face" cells={face.cells} columns={CELL_COLS} rows={CELL_ROWS} />
    } else if (face?.thumb && e.surface !== 'terminal') {
      const { Svg } = $.ui.resolve(e)
      faceEl = <Svg source={photoSvg(face.thumb, 56)} alt={cw.short} width={56} height={56} />
    }
    return (
      <Box flexDirection="row" gap="sm" borderStyle="round" borderColor={TAE} paddingX={1} marginY={1}>
        {faceEl}
        <Box flexDirection="column" flexShrink={1}>
          <Text bold color={TAE}>{cw.short}</Text>
          <Markdown text={inner} />
        </Box>
      </Box>
    )
  })
}
