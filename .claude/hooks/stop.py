#!/usr/bin/env python3
"""Stop hook: autosave story text.

After each story turn, appends the reply word for word to the active story's
text part (Stories/<Title>/<Title> - Part NN.md). In PLAY and CO-WRITE the
user's passage is saved too, as a quote. Then it commits the part and pushes
in the background, so nothing waits on the network and the repo is left clean.

It captures only in play: there is an active story, vault-session ran in this
session, and the turn wasn't maintenance or images. Bracketed out-of-character
lines are dropped, and [rewind] replaces the last captured beat.
VAULT_AUTOSAVE=0 turns it off; VAULT_AUTOSAVE=local writes without git.
Fails open: any error ends the turn untouched.
"""
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "scripts"))
import vault  # noqa: E402

MIN_WORDS = 40
SKIP_SKILLS = {"vault-dev", "nai-v5-images"}
EDIT_TOOLS = {"Edit", "Write", "MultiEdit", "NotebookEdit"}
PROSE_COMMANDS = {"rewind", "resume", "tone"}  # bracket commands whose reply is story text


TAIL = 4 * 1024 * 1024  # long sessions: the last turn is in the transcript's tail
STATE = HERE.parent / "state"


def entries(path, tail=True):
    out = []
    with open(path, "rb") as f:
        size = f.seek(0, 2)
        f.seek(max(0, size - TAIL) if tail else 0)
        data = f.read().decode("utf-8", "replace")
    lines = data.splitlines()
    if tail and size > TAIL:
        lines = lines[1:]  # first line may be cut
    for line in lines:
        try:
            e = json.loads(line)
        except ValueError:
            continue
        if e.get("type") in ("user", "assistant") and not e.get("isSidechain"):
            out.append(e)
    return out


def prompt_text(e):
    """The text of a real user prompt, or None for tool results and skill bodies."""
    if e.get("type") != "user" or e.get("isMeta"):
        return None
    c = e.get("message", {}).get("content")
    if isinstance(c, str):
        return c
    if isinstance(c, list) and c and all(b.get("type") == "text" for b in c):
        return "\n".join(b.get("text", "") for b in c)
    return None


def blocks(e, kind):
    c = e.get("message", {}).get("content")
    return [b for b in c if b.get("type") == kind] if isinstance(c, list) else []


def last_turn(path):
    es = entries(path)
    idx = max((i for i, e in enumerate(es) if prompt_text(e) is not None), default=None)
    if idx is None:
        return es, None, "", [], ""
    turn = [e for e in es[idx + 1:] if e.get("type") == "assistant"]
    reply = "\n\n".join(b.get("text", "") for e in turn for b in blocks(e, "text")).strip()
    tools = [b for e in turn for b in blocks(e, "tool_use")]
    return es, prompt_text(es[idx]), reply, tools, str(es[idx].get("uuid") or idx)


def skill_of(tool):
    return str((tool.get("input") or {}).get("skill", "")).split(":")[-1] if tool.get("name") == "Skill" else ""


def main():
    mode = os.environ.get("VAULT_AUTOSAVE", "1").lower()
    if mode in ("0", "off", "false", "no"):
        return
    data = json.load(sys.stdin)
    tpath = data.get("transcript_path")
    if data.get("stop_hook_active") or not tpath or not os.path.exists(tpath):
        return  # a second Stop for the same turn (another hook sent Claude back) is never prose

    es, prompt, reply, tools, turn_id = last_turn(tpath)
    for _ in range(3):  # the last message can land a moment after the hook starts
        if reply:
            break
        time.sleep(0.4)
        es, prompt, reply, tools, turn_id = last_turn(tpath)
    if prompt is None or not reply:
        return

    # In play only: vault-session ran this session; this turn wasn't maintenance or images.
    # The flag file marks the session as in play and holds the last captured turn.
    session = re.sub(r"[^\w-]", "", str(data.get("session_id") or "")) or "default"
    flag = STATE / f"play-{session}"
    if flag.exists():
        if flag.read_text(encoding="utf-8").strip() == turn_id:
            return
    else:
        def ran(rows):
            return any(skill_of(b) == "vault-session" for e in rows for b in blocks(e, "tool_use"))
        if not (ran(es) or (os.path.getsize(tpath) > TAIL and ran(entries(tpath, tail=False)))):
            return
        STATE.mkdir(exist_ok=True)
        flag.write_text("", encoding="utf-8")
    if any(skill_of(t) in SKIP_SKILLS for t in tools):
        return
    if any(t.get("name") in EDIT_TOOLS and "/.claude/" in str((t.get("input") or {}).get("file_path", "")) for t in tools):
        return
    cmd = re.fullmatch(r"\s*\[\s*([a-z]+)[^\]]*\]\s*", prompt, flags=re.I)
    if cmd and cmd.group(1).lower() not in PROSE_COMMANDS:
        return

    text = vault.strip_ooc(reply)
    if vault.word_count(text) < MIN_WORDS:
        return
    story = vault.active_story(vault.all_notes())
    if not story:
        return
    you = None
    if not cmd and str(story.fm.get("mode", "")).upper() in ("PLAY", "CO-WRITE"):
        you = vault.strip_ooc(prompt) or None
    rewind = bool(cmd and cmd.group(1).lower() == "rewind")
    changed = vault.append_text(story, text, you=you, rewind=rewind)
    flag.write_text(turn_id, encoding="utf-8")

    if mode == "local" or not (vault.ROOT / ".git").exists():
        return
    rel = [str(p.relative_to(vault.ROOT)) for p in changed]
    vault.git("add", "--", *rel)
    if vault.git("commit", "-q", "-m", f"Text: {story.name}", "--", *rel).returncode == 0 and vault.git("remote").stdout.strip():
        upstream = vault.git("rev-parse", "--abbrev-ref", "@{u}").returncode == 0
        push = ["git", "push", "-q"] if upstream else ["git", "push", "-q", "-u", "origin", "HEAD"]
        subprocess.Popen(push, cwd=vault.ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                         stdin=subprocess.DEVNULL, start_new_session=True)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:  # never block the session on a hook bug
        print(f"vault stop hook: {e}", file=sys.stderr)
    sys.exit(0)
