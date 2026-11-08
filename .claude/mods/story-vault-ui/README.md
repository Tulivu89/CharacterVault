# Story Vault UI (mod)

A Claude Code mod for this vault. It adds a row of command buttons above the prompt (Vault, Save, Rewind, Tone, State, Pitch, Help) and a Vault pane with tabs: the active story (last beat, cast, state), every story (pick one up), characters by world with portraits, settings, your profile and co-writer, and every bracket command as a button. Out-of-character replies wholly in [brackets] draw as the co-writer's bubble, with a reaction face when the reply opens with a mood (`[{smug} ...]`) that has an image `Characters/<Name>/images/<Name> - mood - <mood>.png`. Portraits are each character's first PNG; run `vault.py thumbs` after adding images.

It draws only where a screen hosts mods: a terminal (including Termux), the desktop app's Code tab, or VS Code. The Claude web page and mobile app viewing a cloud session don't draw mods yet.

Start Claude Code with it from the vault folder:

    claude --plugin-dir .claude/mods/story-vault-ui

`/vault` reopens the pane; `/story` opens it on the active story.
