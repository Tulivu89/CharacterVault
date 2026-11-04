#!/usr/bin/env python3
"""SessionStart hook.

- On startup, pulls the vault (fast-forward only) unless VAULT_AUTOPULL=0.
- On startup, clear and compact, resets this session's lore memory so lore
  entries can load again into the fresh context.
- Injects the active story's state and cast, so resuming needs no skill run
  and continuity survives compaction.
Fails open: any error starts the session without the extra context.
"""
import json
import os
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
SCRIPT = HERE.parent / "scripts" / "vault.py"
STATE = HERE.parent / "state"
sys.path.insert(0, str(SCRIPT.parent))
import vault  # noqa: E402


def run(args):
    r = subprocess.run([sys.executable, str(SCRIPT), *args], capture_output=True, text=True, timeout=20)
    return (r.stdout + r.stderr).strip()


def main():
    data = json.load(sys.stdin)
    source = data.get("source") or "startup"
    session_id = re.sub(r"[^\w-]", "", str(data.get("session_id") or "default")) or "default"
    lines = []

    if source == "startup" and os.environ.get("VAULT_AUTOPULL", "1") != "0" and (ROOT / ".git").exists():
        try:
            r = subprocess.run(["git", "pull", "--ff-only", "-q"], cwd=ROOT, capture_output=True, text=True, timeout=15)
            if r.returncode != 0:
                lines.append("Vault pull failed (local changes or no network); notes may be behind the remote. "
                             + (r.stderr.strip().splitlines() or [""])[-1])
        except Exception as e:
            lines.append(f"Vault pull skipped: {e}")

    if source in ("startup", "clear", "compact"):
        (STATE / f"lore-{session_id}.json").unlink(missing_ok=True)

    notes = vault.all_notes()
    story = vault.active_story(notes)
    others = [n.name for n in notes if n.type == "story" and n is not story
              and str(n.fm.get("status", "")).lower() in ("active", "paused")]
    if story:
        lines.append("Active story (from the vault; canon):")
        lines.append(run(["state", story.name]))
        lines.append(run(["cast", story.name]))
    else:
        lines.append("No active story in the vault.")
    if others:
        lines.append("Other open stories: " + ", ".join(others))

    print(json.dumps({"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "\n".join(lines)}}))


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"vault session hook: {e}", file=sys.stderr)
        sys.exit(0)
