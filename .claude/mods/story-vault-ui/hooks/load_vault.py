"""Prints the active story and co-writer as JSON for the story-vault-ui mod."""
import json, os, re, sys
from pathlib import Path

def find_root():
    # Shipped in the vault at .claude/mods/story-vault-ui/hooks/: the vault is four levels up.
    cands = [str(Path(__file__).resolve().parents[4]), os.environ.get("CLAUDE_PROJECT_DIR"), os.getcwd()]
    here = Path(os.getcwd())
    cands += [str(p) for p in sorted(here.glob("*")) if p.is_dir()]
    found = [Path(c) for c in cands if c and (Path(c) / ".claude/scripts/vault.py").exists()]
    with_profile = [f for f in found if (f / "story-profile.md").exists()]
    return (with_profile or found or [None])[0]

out = {"root": "", "story": None, "mode": "", "pov": "", "lastBeat": "", "state": [], "cast": [], "coWriter": None, "error": None}
try:
    root = find_root()
    if not root:
        raise SystemExit(print(json.dumps({**out, "error": "No Story Vault found."})))
    out["root"] = str(root)
    sys.path.insert(0, str(root / ".claude/scripts"))
    import vault
    notes = vault.all_notes()
    s = vault.active_story(notes)
    if s:
        fm = s.fm
        out.update(story=s.name, mode=str(fm.get("mode", "")),
                   pov=f"{fm.get('pov', '')} {fm.get('tense', '')}".strip(),
                   lastBeat=str(fm.get("last_beat") or ""))
        out["state"] = [l[2:].strip() for l in vault.section(s.body, "State").splitlines() if l.startswith("- ")]
        for l in vault.section(s.body, "Cast").splitlines():
            if l.startswith("- "):
                name = re.sub(r"[\[\]]", "", l[2:].split("(")[0]).split(" as ")[0].strip()
                entry = {"name": name, "line": l[2:].strip()}
                ch = vault.find(notes, name)
                if ch:
                    pics = sorted(p for p in (ch.path.parent / "images").glob("*.png")) if (ch.path.parent / "images").is_dir() else []
                    if pics:
                        entry["portrait"] = str(pics[0])
                out["cast"].append(entry)
    prof = root / "story-profile.md"
    if prof.exists():
        m = re.search(r"^##\s+Co-writer\s*\n(.*?)(?=^##\s|\Z)", prof.read_text(encoding="utf-8"), flags=re.M | re.S)
        n = re.search(r"^-\s*Name:\s*(.+)$", m.group(1), flags=re.M) if m else None
        out["coWriter"] = n.group(1).strip() if n else None
except Exception as e:
    out["error"] = str(e)
print(json.dumps(out))
