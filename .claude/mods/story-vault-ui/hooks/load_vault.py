"""Prints the vault as JSON for the story-vault-ui mod: the active story, every
story, character and setting, the profile, and the co-writer with its moods.
Portraits come from each character's images folder (the first PNG), with a
small copy from images/.thumbs/ for screens that need the picture inline."""
import base64
import json
import os
import re
import sys
from pathlib import Path


def find_root():
    # Shipped in the vault at .claude/mods/story-vault-ui/hooks/: the vault is four levels up.
    cands = [str(Path(__file__).resolve().parents[4]), os.environ.get("CLAUDE_PROJECT_DIR"), os.getcwd()]
    cands += [str(p) for p in sorted(Path(os.getcwd()).glob("*")) if p.is_dir()]
    found = [Path(c) for c in cands if c and (Path(c) / ".claude/scripts/vault.py").exists()]
    with_profile = [f for f in found if (f / "story-profile.md").exists()]
    return (with_profile or found or [None])[0]


def picture(path):
    """{file, thumb}: the PNG's path and its thumbnail as base64 ('' when there's none)."""
    thumb = path.parent / ".thumbs" / path.name
    data = base64.b64encode(thumb.read_bytes()).decode() if thumb.exists() and thumb.stat().st_size < 60000 else ""
    return {"file": str(path), "thumb": data}


def portrait(note):
    folder = note.path.parent / "images"
    pics = sorted(p for p in folder.glob("*.png") if " - mood - " not in p.name) if folder.is_dir() else []
    return picture(pics[0]) if pics else None


def bullets(text):
    return [l[2:].strip() for l in text.splitlines() if l.startswith("- ") and l[2:].strip()]


def main():
    out = {"root": "", "error": None, "active": None, "stories": [], "characters": [], "settings": [],
           "profile": {"defaults": [], "style": [], "kinks": [], "limits": []}, "coWriter": None}
    root = find_root()
    if not root:
        out["error"] = "No Story Vault found."
        return out
    out["root"] = str(root)
    sys.path.insert(0, str(root / ".claude/scripts"))
    import vault

    notes = vault.all_notes()
    by_name = {n.name.lower(): n for n in notes}
    active = vault.active_story(notes)

    for s in sorted((n for n in notes if n.type == "story"), key=lambda n: -n.path.stat().st_mtime):
        fm = s.fm
        out["stories"].append({"name": s.name, "status": str(fm.get("status", "")), "mode": str(fm.get("mode", "")),
                               "world": vault.world_of(fm), "lastBeat": str(fm.get("last_beat") or "")})
    if active:
        fm = active.fm
        cast = []
        for line in bullets(vault.section(active.body, "Cast")):
            name = re.sub(r"[\[\]]", "", line.split("(")[0]).split(" as ")[0].strip()
            ch = by_name.get(name.lower())
            cast.append({"name": name, "line": line, "portrait": portrait(ch) if ch else None})
        out["active"] = {"story": active.name, "mode": str(fm.get("mode", "")),
                         "pov": f"{fm.get('pov', '')} {fm.get('tense', '')}".strip(),
                         "lastBeat": str(fm.get("last_beat") or ""),
                         "state": bullets(vault.section(active.body, "State")), "cast": cast}

    for c in sorted((n for n in notes if n.type == "character"), key=lambda n: (vault.world_of(n.fm).lower(), n.name)):
        hook = re.search(r"^>\s*(.+)$", c.body, flags=re.M)
        out["characters"].append({"name": c.name, "world": vault.world_of(c.fm) or "No world",
                                  "species": str(c.fm.get("species") or ""), "age": str(c.fm.get("age") or ""),
                                  "hook": hook.group(1).strip() if hook else "", "portrait": portrait(c)})
    for s in sorted((n for n in notes if n.type == "setting"), key=lambda n: n.name):
        hook = re.search(r"^>\s*(.+)$", s.body, flags=re.M)
        out["settings"].append({"name": s.name, "world": vault.world_of(s.fm), "status": str(s.fm.get("status", "")),
                                "hook": hook.group(1).strip() if hook else ""})

    prof = root / "story-profile.md"
    if prof.exists():
        text = prof.read_text(encoding="utf-8")

        def sec(title):
            m = re.search(rf"^##\s+{re.escape(title)}\s*\n(.*?)(?=^##\s|\Z)", text, flags=re.M | re.S)
            return m.group(1) if m else ""

        out["profile"] = {"defaults": bullets(sec("Defaults")), "style": bullets(sec("Style")),
                          "kinks": bullets(sec("Kinks and themes")), "limits": bullets(sec("Limits"))}
        cw = sec("Co-writer")
        name = re.search(r"^-\s*Name:\s*(.+)$", cw, flags=re.M)
        if name:
            full = name.group(1).strip()
            short = (re.search(r"\(([^)]+)\)", full) or re.match(r"(.+)", full)).group(1).strip()
            base = re.sub(r"\s*\(.*\)\s*$", "", full)
            ch = by_name.get(base.lower())
            moods = {}
            if ch and (ch.path.parent / "images").is_dir():
                for p in sorted((ch.path.parent / "images").glob(f"{ch.name} - mood - *.png")):
                    moods[p.stem.split(" - mood - ", 1)[1].strip().lower()] = picture(p)
            out["coWriter"] = {"name": base, "short": short, "portrait": portrait(ch) if ch else None, "moods": moods}
    return out


if __name__ == "__main__":
    try:
        result = main()
    except Exception as e:  # the pane shows the error instead of breaking
        result = {"error": str(e)}
    print(json.dumps(result))
