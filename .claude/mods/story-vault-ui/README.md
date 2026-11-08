# Story Vault UI (mod)

A Claude Code mod for this vault. It adds a row of command buttons above the prompt (Save, Rewind, Tone, State, Cast, Pitch, Help), a Story pane with the active story, last beat, cast (portraits where a character has a PNG in its `images` folder, in the terminal) and state, and draws out-of-character replies wholly in [brackets] as the co-writer's bubble.

It draws only where a screen hosts mods: a terminal (including Termux), the desktop app's Code tab, or VS Code. The Claude web page and mobile app viewing a cloud session don't draw mods yet.

Start Claude Code with it from the vault folder:

    claude --plugin-dir .claude/mods/story-vault-ui

`/story` reopens the pane.
