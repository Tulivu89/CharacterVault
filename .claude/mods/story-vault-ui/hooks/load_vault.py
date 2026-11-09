"""Prints the vault as JSON for the story-vault-ui mod. It reuses the browser index
(vault.py build_index) and adds what the mod draws locally: each picture's path,
its thumbnail as base64 (desktop and mobile) and its terminal cells (Termux and
other terminals, as half-block pixel art)."""
import base64
import json
import os
import sys
from pathlib import Path


def find_root():
    # Shipped in the vault at .claude/mods/story-vault-ui/hooks/: the vault is four levels up.
    cands = [str(Path(__file__).resolve().parents[4]), os.environ.get("CLAUDE_PROJECT_DIR"), os.getcwd()]
    cands += [str(p) for p in sorted(Path(os.getcwd()).glob("*")) if p.is_dir()]
    found = [Path(c) for c in cands if c and (Path(c) / ".claude/scripts/vault.py").exists()]
    with_profile = [f for f in found if (f / "story-profile.md").exists()]
    return (with_profile or found or [None])[0]


def local(root, pic):
    if not pic:
        return None
    thumb = root / pic["thumb"] if pic.get("thumb") else None
    cells = root / pic["cells"] if pic.get("cells") else None
    return {"file": str(root / pic["image"]),
            "thumb": base64.b64encode(thumb.read_bytes()).decode() if thumb and thumb.exists() and thumb.stat().st_size < 60000 else "",
            "cells": cells.read_text(encoding="ascii").strip() if cells and cells.exists() else ""}


def main():
    root = find_root()
    if not root:
        return {"error": "No Story Vault found."}
    sys.path.insert(0, str(root / ".claude/scripts"))
    import vault
    idx = vault.build_index()
    for c in idx["characters"]:
        c["portrait"] = local(root, c["portrait"])
    if idx["active"]:
        for c in idx["active"]["cast"]:
            c["portrait"] = local(root, c["portrait"])
    cw = idx["coWriter"]
    if cw:
        cw["portrait"] = local(root, cw["portrait"])
        cw["moods"] = {k: local(root, v) for k, v in cw["moods"].items()}
    return {**idx, "root": str(root), "error": None}


if __name__ == "__main__":
    try:
        result = main()
    except Exception as e:  # the pane shows the error instead of breaking
        result = {"error": str(e)}
    print(json.dumps(result))
