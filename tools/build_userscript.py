#!/usr/bin/env python3
"""Fills the userscript's MOODS block with the co-writer's reaction faces, embedded
as small images, so the web page can show them without reaching the vault.

    python3 tools/build_userscript.py        (run vault.py thumbs first)
"""
import base64
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
script = ROOT / "tools" / "story-vault.user.js"
text = (ROOT / "story-profile.md").read_text(encoding="utf-8")
sec = re.search(r"^##\s+Co-writer\s*\n(.*?)(?=^##\s|\Z)", text, flags=re.M | re.S)
name = re.search(r"^-\s*Name:\s*(.+)$", sec.group(1) if sec else "", flags=re.M)
moods = {}
label = "Co-writer"
if name:
    full = name.group(1).strip()
    label = (re.search(r"\(([^)]+)\)", full) or re.match(r"(.+)", full)).group(1).strip()
    base = re.sub(r"\s*\(.*\)\s*$", "", full)
    thumbs = ROOT / "Characters" / base / "images" / ".thumbs"
    for p in sorted(thumbs.glob("*.png")):
        uri = "data:image/png;base64," + base64.b64encode(p.read_bytes()).decode()
        if " - mood - " in p.stem:
            moods[p.stem.split(" - mood - ", 1)[1].lower()] = uri
        elif "default" not in moods and "Full" not in p.stem:
            moods["default"] = uri
block = f"const CO_WRITER = {json.dumps(label)};\n  const MOODS = {json.dumps(moods)};"
src = script.read_text(encoding="utf-8")
src = re.sub(r"// MOODS-START.*?// MOODS-END", "// MOODS-START (filled by tools/build_userscript.py)\n  " + block + "\n  // MOODS-END", src, flags=re.S)
script.write_text(src, encoding="utf-8")
print(f"{label}: {', '.join(moods) or 'no faces'} embedded ({len(src) // 1024} KB script).")
