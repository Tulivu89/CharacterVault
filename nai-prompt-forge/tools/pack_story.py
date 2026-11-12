#!/usr/bin/env python3
"""Pack dist/prompt-forge.js into a ready-to-import .story.

  python3 -I tools/pack_story.py <template.story> [out.story]

The template is any story exported from NovelAI with at least one script
attached (the script's contents don't matter). The packer finds that script
entry, puts Prompt Forge's code in the field that holds the code, renames the
script and the story, and writes dist/Prompt Forge.story (or `out.story`).

Why a template: the shape of a script entry inside a .story isn't documented,
so the packer copies a real one instead of guessing field names. Standard
library only.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def code_field(entry):
    """The string field that holds the script source: the longest string value."""
    best, size = None, -1
    for k, v in entry.items():
        if isinstance(v, str) and len(v) > size:
            best, size = k, len(v)
    return best


def main(argv):
    if len(argv) < 2:
        sys.exit(__doc__)
    template = Path(argv[1])
    out = Path(argv[2]) if len(argv) > 2 else ROOT / "dist" / "Prompt Forge.story"
    code = (ROOT / "dist" / "prompt-forge.js").read_text(encoding="utf-8")
    pkg = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))

    story = json.loads(template.read_text(encoding="utf-8"))
    content = story.get("content", {})
    scripts = content.get("userScripts")
    if not isinstance(scripts, list) or not scripts:
        sys.exit("The template has no attached script. Attach any script to a story in NovelAI, export it, and use that.")
    entry = next((s for s in scripts if isinstance(s, dict) and "forge" in json.dumps(s).lower()[:400]), scripts[0])
    field = code_field(entry)
    if not field:
        sys.exit("Couldn't find the script's code field in the template; send the template so the packer can learn its shape.")
    entry[field] = code
    for k in ("name", "title", "displayName"):
        if k in entry and isinstance(entry[k], str):
            entry[k] = pkg["displayName"]
    if isinstance(entry.get("description"), str):
        entry["description"] = pkg["description"]
    if isinstance(entry.get("version"), str):
        entry["version"] = pkg["version"]
    content["userScripts"] = [entry]

    meta = story.setdefault("metadata", {})
    meta["title"] = f'{pkg["displayName"]} {pkg["version"]}'
    meta["description"] = pkg["description"]

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(story, ensure_ascii=False), encoding="utf-8")
    kb = out.stat().st_size // 1024
    print(f"wrote {out} ({kb} KB); code went into the template script's '{field}' field")
    if kb > 2048:
        print("warning: over 2 MB")


if __name__ == "__main__":
    main(sys.argv)
