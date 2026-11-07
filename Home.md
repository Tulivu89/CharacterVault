# Story Vault

> [!tip] In Claude
> Send `[help]` for the command menu. It's answered without using a turn.
> Start with `prepare for fictional roleplay`, `[pitch]`, or `pick up <story>`.

## Open stories
```base
filters:
  and:
    - 'type == "story"'
    - 'status == "active" || status == "paused"'
views:
  - type: table
    name: Open stories
    order:
      - file.name
      - status
      - mode
      - last_beat
    sort:
      - property: file.mtime
        direction: DESC
```

## Latest story text
```base
filters:
  and:
    - 'type == "text"'
views:
  - type: table
    name: Story text
    order:
      - file.name
      - story
      - words
    sort:
      - property: file.mtime
        direction: DESC
    limit: 8
```

## Characters
```base
filters:
  and:
    - 'type == "character"'
views:
  - type: cards
    name: Characters
    image: note.cover
    imageFit: cover
    order:
      - file.name
      - world
    sort:
      - property: world
        direction: ASC
  - type: table
    name: By world
    order:
      - file.name
      - world
      - age
      - species
    sort:
      - property: world
        direction: ASC
```

## Settings
```base
filters:
  and:
    - 'type == "setting"'
views:
  - type: table
    name: Settings
    order:
      - file.name
      - world
      - status
```

## Recently edited
```base
filters:
  or:
    - 'file.inFolder("Characters")'
    - 'file.inFolder("Settings")'
    - 'file.inFolder("Stories")'
views:
  - type: table
    name: Recent
    order:
      - file.name
      - type
      - file.mtime
    sort:
      - property: file.mtime
        direction: DESC
    limit: 10
```

## Commands

| | |
|---|---|
| **In a scene** | `[stop]` · `[pause]` / `[resume]` · `[rewind]` or `[rewind: new direction]` · `[tone: harsher]` · `[check]` |
| **Story** | `[setup]` · `[pitch]` or `[pitch: a setting, character or kink]` · `[save]` · `[done]` · `[scope]` · `[profile]` |
| **Co-writer** | `[persona]` · `[persona: off]` / `[persona: on]` |
| **Style library** | `[keep]` · `[keep: "…" — why]` · `[avoid: "…" — why]` · `[distill]` |
| **Free** (no turn used) | `[help]` · `[state]` · `[cast]` · `[show <note>]` · `[list <type>]` · `[lore <words>]` · `[lint]` |

Story text saves itself after each story turn into `Stories/<Title>/`. `[save]` also records the last beat and state. The full guide is [[GUIDE]].
