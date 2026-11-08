export type Picture = { file: string; thumb: string }
export type CastLine = { name: string; line: string; portrait: Picture | null }
export type Active = { story: string; mode: string; pov: string; lastBeat: string; state: string[]; cast: CastLine[] }
export type StoryRow = { name: string; status: string; mode: string; world: string; lastBeat: string }
export type CharacterRow = { name: string; world: string; species: string; age: string; hook: string; portrait: Picture | null }
export type SettingRow = { name: string; world: string; status: string; hook: string }
export type Profile = { defaults: string[]; style: string[]; kinks: string[]; limits: string[] }
export type CoWriter = { name: string; short: string; portrait: Picture | null; moods: Record<string, Picture> }
export type VaultView = {
  root?: string
  error: string | null
  active?: Active | null
  stories?: StoryRow[]
  characters?: CharacterRow[]
  settings?: SettingRow[]
  profile?: Profile
  coWriter?: CoWriter | null
}
export type Tab = 'story' | 'stories' | 'characters' | 'settings' | 'profile' | 'commands'

declare module 'claude-code' {
  interface PluginState {
    'story-vault-ui': { view: Shaped<VaultView | null>; tab: Shaped<Tab> }
  }
}
