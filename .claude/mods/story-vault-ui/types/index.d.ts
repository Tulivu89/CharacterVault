export type CastLine = { name: string; line: string; portrait?: string }
export type VaultView = {
  root: string
  story: string | null
  mode: string
  pov: string
  lastBeat: string
  state: string[]
  cast: CastLine[]
  coWriter: string | null
  error: string | null
}

declare module 'claude-code' {
  interface PluginState {
    'story-vault-ui': { view: Shaped<VaultView | null> }
  }
}
