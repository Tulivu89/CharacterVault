# Browser extension: next steps

Not started. The userscript (`story-vault.user.js`) and the Claude Code mod (`.claude/mods/story-vault-ui/`) need real work on their own; this is what the co-writer change leaves for them.

- **Co-writer picker.** Read `.claude/ui/personas.json` (`personas`, `default`, `menu`) and show one button per co-writer plus None, sending `[persona: <name>]` / `[persona: none]`. With `default: ask`, show it at the start of a chat.
- **Per-session face.** `vault-index.json` has `coWriter` (the default or first co-writer) and `coWriters` (all of them, with `moods`). The reaction faces currently use `coWriter`, so they can show the wrong co-writer's faces after a switch. The extension should remember the last `[persona: <name>]` it sent (or read the chosen name from the reply) and use that co-writer's `moods`.
- **On/off.** `[{off} ...]` replies already draw a plain bubble. The persona buttons could show the current on/off state.
- **Gemini/AI Studio.** An app built from this vault can use the same `personas.json` (see GUIDE.md, "Using them in another app").
