#!/usr/bin/env python3
"""SessionStart hook.

- On startup, pulls the vault (fast-forward only) unless VAULT_AUTOPULL=0.
- On startup, clear and compact, resets this session's lore memory so lore
  entries can load again into the fresh context.
- Injects the active story's state and cast, so resuming needs no skill run
  and continuity survives compaction, and the profile's co-writer persona
  when one is set.
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


def co_writer():
    """The profile's Co-writer section when it names one, without guidance lines or empty fields."""
    prof = ROOT / "story-profile.md"
    if not prof.exists():
        return []
    m = re.search(r"^##\s+Co-writer\s*\n(.*?)(?=^##\s|\Z)", prof.read_text(encoding="utf-8"), flags=re.M | re.S)
    raw = [l.rstrip() for l in (m.group(1).splitlines() if m else [])
           if l.strip() and not re.fullmatch(r"\*[^*].*[^*]\*", l.strip())]
    # drop empty fields, but keep a label whose content sits on the indented lines below it
    lines = [l for i, l in enumerate(raw) if not re.fullmatch(r"-\s*[^:]+:", l.strip())
             or (i + 1 < len(raw) and raw[i + 1][:1].isspace())]
    return lines if any(re.match(r"^-\s*Name:\s*\S", l.strip()) for l in lines) else []


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
    if source == "clear":
        (STATE / f"play-{session_id}").unlink(missing_ok=True)  # autosave waits for vault-session again

    persona = co_writer()
    if persona:
        lines.append("Co-writer persona (from the profile; out-of-character talk only, until the user says otherwise):")
        lines += persona

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
