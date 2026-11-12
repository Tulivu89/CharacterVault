#!/usr/bin/env python3
"""Pack dist/prompt-forge.js into a ready-to-import NovelAI story.

  python3 -I tools/pack_story.py <template.story> [out.story]

The template is any story exported from NovelAI with a script attached. It
supplies the container format and the document; everything else is replaced:

- one script entry for Prompt Forge (format copied from the template's entry,
  code in script.code, a stable script id so repacks keep their storage)
- no lorebook, memory, author's note, custom system prompt, phrase bias or
  other scripts' storage from the template
- story storage seeded with forge.enabled and forge.fresh, so the story opens
  as a Forge workspace and the script clears the template's text on first run

Writes dist/Prompt Forge.story unless `out.story` is given. Standard library only.
"""
import json
import sys
import time
import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
# Stable id: the same script id across builds, so story storage carries over.
SCRIPT_ID = str(uuid.uuid5(uuid.NAMESPACE_DNS, "prompt-forge.ambiprop"))


def main(argv):
    if len(argv) < 2:
        sys.exit(__doc__)
    template = Path(argv[1])
    out = Path(argv[2]) if len(argv) > 2 else ROOT / "dist" / "Prompt Forge.story"
    code = (ROOT / "dist" / "prompt-forge.js").read_text(encoding="utf-8")
    pkg = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    for k in ("displayName", "description", "author", "version"):
        if ":" in str(pkg.get(k, "")):
            sys.exit(f"package.json {k} contains a colon; NovelAI script metadata must not.")

    story = json.loads(template.read_text(encoding="utf-8"))
    content = story["content"]
    scripts = content.get("userScripts") or []
    if not scripts or not isinstance(scripts[0].get("script"), dict):
        sys.exit("The template has no attached script. Attach any script to a story in NovelAI, export it, and use that.")
    shape = scripts[0]
    now = int(time.time() * 1000)

    entry = {
        "containerId": str(uuid.uuid4()),
        "script": {
            "compatibilityVersion": shape["script"].get("compatibilityVersion", "naiscript-1.0"),
            "exportVersion": shape["script"].get("exportVersion", "unknwon"),
            "createdAt": now,
            "updatedAt": now,
            "id": SCRIPT_ID,
            "name": pkg["displayName"],
            "description": pkg["description"],
            "author": pkg["author"],
            "version": pkg["version"],
            "config": [],
            "memoryLimit": pkg.get("memoryLimit", 32),
            "code": code,
        },
        "isEnabled": True,
        "isLocked": False,
        "config": {},
        "storage": {},
        "permissions": [],
    }
    # Keep any entry fields the template has that we don't know about, with neutral values.
    for k, v in shape.items():
        if k not in entry:
            entry[k] = type(v)() if isinstance(v, (dict, list)) else v
    content["userScripts"] = [entry]

    # Story storage values are stored JSON-encoded. Seeded under the script id and the container id.
    seed = {"forge.enabled": json.dumps(True), "forge.fresh": json.dumps(True)}
    content["scriptStorage"] = {"storyStorage": {SCRIPT_ID: dict(seed), entry["containerId"]: dict(seed)}, "historyStorage": {}}

    # Nothing of the template's own setup comes along.
    lb = content.get("lorebook", {})
    lb["entries"], lb["categories"], lb["order"] = [], [], []
    for c in content.get("context", []):
        c["text"] = ""
    ms = content.setdefault("messageSettings", {})
    ms["systemPrompts"], ms["prefills"] = {}, {}
    content["phraseBiasGroups"] = [{"phrases": [], "ensureSequenceFinish": False, "generateOnce": True, "bias": 0, "enabled": True, "whenInactive": False}]
    content["bannedSequenceGroups"] = [{"sequences": [], "enabled": True}]
    content["ephemeralContext"] = []
    content["sideChats"] = []
    content["attg"] = {"tags": ["image generation", "NAI Diffusion V5", "prompt tool"], "genre": []}

    meta = story["metadata"]
    meta.update({
        "id": str(uuid.uuid4()),
        "title": f'{pkg["displayName"]} {pkg["version"]}',
        "description": pkg["description"],
        "textPreview": "Prompt Forge workspace.",
        "favorite": False,
        "tags": [],
        "createdAt": now,
        "lastUpdatedAt": now,
    })

    text = json.dumps(story, ensure_ascii=False)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(text, encoding="utf-8")
    print(f"wrote {out} ({len(text.encode()) // 1024} KB), script id {SCRIPT_ID}")


if __name__ == "__main__":
    main(sys.argv)
