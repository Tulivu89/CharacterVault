#!/usr/bin/env python3
"""SessionStart hook.

- On startup, pulls the vault (fast-forward only) unless VAULT_AUTOPULL=0.
- On startup, clear and compact, resets this session's lore memory so lore
  entries can load again into the fresh context.
- Injects the active story's state and cast, so resuming needs no skill run
  and continuity survives compaction, and the profile's co-writer persona
  when one is set, with its on/off state (kept per session, so it survives
  compaction and resume; a fresh session or /clear starts with it on).
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


NOTE_DIRS = ["Characters", "Settings", "Stories", "Style", "Modules", "Co-writers", "story-profile.md"]


def sync():
    """Brings the vault up to date and returns warnings. With an upstream, a fast-forward pull. Without one
    (a cloud session's fresh branch), a fast-forward to the remote's default branch when this branch has no
    commits of its own. Then names remote branches holding note commits the default branch lacks: new
    sessions clone the default branch, so that work is invisible to them until it's merged."""
    out = []
    if vault.git("rev-parse", "--abbrev-ref", "@{u}").returncode == 0:
        r = vault.git("pull", "--ff-only", "-q", timeout=15)
        if r.returncode != 0:
            out.append("Vault pull failed (local changes or no network); notes may be behind the remote. "
                       + (r.stderr.strip().splitlines() or [""])[-1])
    elif vault.git("remote").stdout.strip():
        if vault.git("fetch", "-q", "origin", timeout=15).returncode != 0:
            return ["Vault fetch failed (no network?); notes may be behind the remote."]
    else:
        return out
    head = vault.git("symbolic-ref", "--short", "refs/remotes/origin/HEAD").stdout.strip() or "origin/main"
    if vault.git("rev-parse", "--abbrev-ref", "@{u}").returncode != 0 \
            and vault.git("merge-base", "--is-ancestor", "HEAD", head).returncode == 0:
        vault.git("merge", "--ff-only", "-q", head)
    current = "origin/" + vault.git("rev-parse", "--abbrev-ref", "HEAD").stdout.strip()
    stranded = []
    for b in vault.git("for-each-ref", "--format=%(refname:short)", "refs/remotes/origin").stdout.split():
        if b in (head, current, "origin/HEAD", "origin"):
            continue
        n = vault.git("rev-list", "--count", f"{head}..{b}", "--", *NOTE_DIRS).stdout.strip()
        if n.isdigit() and int(n):
            stranded.append(f"{b[len('origin/'):]} ({n} note commit{'s' if int(n) > 1 else ''})")
    if stranded:
        out.append(f"Vault work not merged into {head[len('origin/'):]}: " + ", ".join(stranded)
                   + ". New sessions and the vault UI don't see it until its pull request is merged. Mention this to "
                   "the user once, briefly, at the first out-of-character moment.")
    return out


def main():
    data = json.load(sys.stdin)
    source = data.get("source") or "startup"
    session_id = re.sub(r"[^\w-]", "", str(data.get("session_id") or "default")) or "default"
    lines = []

    if source == "startup" and os.environ.get("VAULT_AUTOPULL", "1") != "0" and (ROOT / ".git").exists():
        try:
            lines += sync()
        except Exception as e:
            lines.append(f"Vault pull skipped: {e}")

    if source in ("startup", "clear", "compact"):
        (STATE / f"lore-{session_id}.json").unlink(missing_ok=True)
    if source == "clear":
        (STATE / f"play-{session_id}").unlink(missing_ok=True)  # autosave waits for vault-session again
    if source in ("startup", "clear"):
        vault.clear_persona_state(session_id)  # a fresh session starts with the persona on

    # Resume and compact keep the session's on/off state; the full block is always re-sent here.
    # The "which co-writer?" question waits for the prompt hook, so a first message that is a viewer
    # command ([show], [cast]...) gets its plain answer instead of colliding with the question.
    persona = vault.persona_context(session_id, force_full=True, ask=False)
    if persona:
        lines.append(persona)

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
