import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { VaultView } from '../types'

const PANE = 'story'
const view = atom({ plugin: 'story-vault-ui', key: 'view' } as const, null, { shape: 'view-1' })

// Colors that read on light and dark themes.
const PALETTE = ['#c0392b', '#2471a3', '#1e8449', '#b9770e', '#7d3c98', '#117a65', '#a04000', '#5d6d7e']
const TAE = '#8e44ad'

function colorFor(name: string): string {
  let h = 0
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return PALETTE[h % PALETTE.length] ?? TAE
}

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function badgeSvg(name: string, color: string): string {
  const t = initials(name).replace(/[<&>"]/g, '')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">` +
    `<circle cx="14" cy="14" r="13" fill="${color}"/>` +
    `<text x="14" y="18.5" font-family="sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">${t}</text></svg>`
}

const COMMANDS: { label: string; text: string; send: boolean }[] = [
  { label: 'Save', text: '[save]', send: true },
  { label: 'Rewind', text: '[rewind: ]', send: false },
  { label: 'Tone', text: '[tone: ]', send: false },
  { label: 'State', text: '[state]', send: true },
  { label: 'Cast', text: '[cast]', send: true },
  { label: 'Pitch', text: '[pitch]', send: true },
  { label: 'Help', text: '[help]', send: true },
]

async function refresh($: EngineInterface): Promise<void> {
  try {
    const script = `${$.plugin.root}/hooks/load_vault.py`
    const { stdout } = await $.process.run(['python3', script], { timeoutMs: 20000 })
    const parsed = JSON.parse(stdout) as VaultView
    await update($, view, () => parsed)
  } catch (err) {
    await update($, view, () => ({
      root: '', story: null, mode: '', pov: '', lastBeat: '', state: [], cast: [], coWriter: null,
      error: String(err),
    }))
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'story', description: 'Open the Story Vault pane' })
    void refresh($)
    void $.ui.open({ id: PANE, title: 'Story' })
    return next(e)
  })

  on('command.run', { command: 'story' }, async $ => {
    await refresh($)
    await $.ui.open({ id: PANE, title: 'Story' })
    return { text: 'Story pane opened.' }
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
        {COMMANDS.map(c => (
          <Button
            key={c.label}
            label={c.label}
            variant="secondary"
            onPress={() => {
              if (c.send) void $.prompt.submit({ text: c.text, asUser: true })
              else void $.prompt.fill({ text: c.text, mode: 'replace', cursor: c.text.length - 1 })
            }}
          />
        ))}
      </Box>
    )
  })

  // The Story pane: active story, last beat, cast, state.
  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const ui = $.ui.resolve(e)
    const { Box, Text, Button, Markdown } = ui
    const v = await read($, view)
    if (!v) return <Text dimColor>Loading the vault…</Text>
    if (v.error && !v.story) return <Text dimColor>{v.error}</Text>
    if (!v.story) return <Text dimColor>No active story. Send [pitch] or [setup].</Text>

    const badge = (name: string, color: string, portrait?: string) => {
      if (e.surface === 'terminal' && portrait) {
        const { Image } = $.ui.resolve(e)
        return <Image key={name} source={{ file: portrait, format: 'png' }} columns={6} rows={3} alt={initials(name)} />
      }
      if (e.surface === 'terminal') {
        return <Text color="#ffffff" backgroundColor={color} bold>{` ${initials(name)} `}</Text>
      }
      const { Svg } = $.ui.resolve(e)
      return <Svg source={badgeSvg(name, color)} alt={initials(name)} width={28} height={28} />
    }

    return (
      <Box flexDirection="column" gap="sm">
        <Box flexDirection="column">
          <Text bold size="heading">{v.story}</Text>
          <Text dimColor>{[v.mode, v.pov].filter(Boolean).join(' · ')}</Text>
        </Box>
        {v.lastBeat && (
          <Box flexDirection="column" borderStyle="round" borderColor={TAE} paddingX={1}>
            <Text bold color={TAE}>Last beat</Text>
            <Text>{v.lastBeat}</Text>
          </Box>
        )}
        <Box flexDirection="column" gap="xs">
          <Text bold>Cast</Text>
          {v.cast.map(c => (
            <Box key={c.name} flexDirection="row" gap="sm" alignItems="center">
              {badge(c.name, colorFor(c.name), c.portrait)}
              <Text wrap="wrap">{c.line}</Text>
            </Box>
          ))}
        </Box>
        {v.state.length > 0 && (
          <Box flexDirection="column">
            <Text bold>State</Text>
            <Markdown text={v.state.map(s => `- ${s}`).join('\n')} />
          </Box>
        )}
        <Box flexDirection="row" gap="xs">
          <Button key="refresh" label="Refresh" variant="secondary" onPress={() => void refresh($)} />
          <Button key="save" label="Save" variant="primary" onPress={() => void $.prompt.submit({ text: '[save]', asUser: true })} />
        </Box>
      </Box>
    )
  })

  // Out-of-character replies wholly in [brackets] draw as the co-writer's bubble.
  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    const text = e.props.text.trim()
    const v = await read($, view)
    if (!v?.coWriter || e.props.isSummary || !text.startsWith('[') || !text.endsWith(']')) return next(e)
    const { Box, Text, Markdown } = $.ui.resolve(e)
    const name = v.coWriter.replace(/\s*\(.*\)\s*$/, '')
    const short = (v.coWriter.match(/\(([^)]+)\)/)?.[1] ?? name)
    return (
      <Box flexDirection="column" borderStyle="round" borderColor={TAE} paddingX={1} marginY={1}>
        <Text bold color={TAE}>{short}</Text>
        <Markdown text={text.slice(1, -1).trim()} />
      </Box>
    )
  })
}
