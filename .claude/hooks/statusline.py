#!/usr/bin/env python3
"""Status line: active story · mode · POV and tense │ last beat."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
try:
    import vault
    sys.stdin.read()
    story = vault.active_story(vault.all_notes())
    if not story:
        print("Vault · no active story")
    else:
        fm = story.fm
        beat = str(fm.get("last_beat") or "").strip()
        if len(beat) > 70:
            beat = beat[:69] + "…"
        parts = [story.name, str(fm.get("mode", "")), f"{fm.get('pov', '')} {fm.get('tense', '')}".strip()]
        print(" · ".join(p for p in parts if p) + (f" │ {beat}" if beat else ""))
except Exception:
    print("Vault")
