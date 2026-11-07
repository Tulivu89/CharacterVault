#!/usr/bin/env python3
"""UserPromptSubmit hook.

- A prompt that is only a viewer command ([cast], [state], [show X], [list ...],
  [lint], [lore text], [help] or [menu]) is answered here and blocked, so no
  model turn is spent.
- Any other prompt: lore entries whose keys it mentions are injected once per
  session, scoped to the active story's world.
Fails open: any error lets the prompt through untouched.
"""
import json
import re
import shlex
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE.parent / "scripts" / "vault.py"
STATE = HERE.parent / "state"
sys.path.insert(0, str(SCRIPT.parent))
import vault  # noqa: E402

VIEW = re.compile(r"^\s*\[(cast|state|show|list|lint|lore|help|menu)(?:[:\s]+([^\]]*))?\]\s*$", re.I)
MAX_LORE = 8


def run(args):
    r = subprocess.run([sys.executable, str(SCRIPT), *args], capture_output=True, text=True, timeout=20)
    return (r.stdout + r.stderr).strip() or "(no output)"


def viewer(cmd, arg):
    if cmd in ("cast", "state") and not arg:
        story = vault.active_story(vault.all_notes())
        if not story:
            return "No active story. Set `status: active` on a story note, or name one: [state <story>]."
        arg = story.name
    if cmd == "list":
        return run(["list", *shlex.split(arg)])
    if cmd in ("help", "menu"):
        return run(["help"])
    return run([cmd, arg] if arg else [cmd])


def lore(prompt, session_id):
    notes = vault.all_notes()
    story = vault.active_story(notes)
    if not story:
        return None
    STATE.mkdir(exist_ok=True)
    seen_file = STATE / f"lore-{session_id}.json"
    seen = set(json.loads(seen_file.read_text())) if seen_file.exists() else set()
    hits = vault.match_lore(prompt, vault.lore_index(notes, story), skip=seen)[:MAX_LORE]
    if not hits:
        return None
    seen.update(h["id"] for h in hits)
    seen_file.write_text(json.dumps(sorted(seen)))
    return "Lore from the vault, canon for this story:\n" + "\n".join(f"- [{h['source']}] {h['text']}" for h in hits)


def main():
    data = json.load(sys.stdin)
    prompt = data.get("prompt") or ""
    session_id = re.sub(r"[^\w-]", "", str(data.get("session_id") or "default")) or "default"
    m = VIEW.match(prompt)
    if m:
        out = viewer(m.group(1).lower(), (m.group(2) or "").strip())
        print(json.dumps({"decision": "block", "reason": out}))
        return
    ctx = lore(prompt, session_id)
    if ctx:
        print(json.dumps({"hookSpecificOutput": {"hookEventName": "UserPromptSubmit", "additionalContext": ctx}}))


if __name__ == "__main__":
    try:
        main()
    except Exception as e:  # never block play on a hook bug
        print(f"vault prompt hook: {e}", file=sys.stderr)
        sys.exit(0)
