#!/usr/bin/env python3
"""Vault helper for the story engine. Standard library only.

  vault.py new <template> "<Title>" [--character NAME] [--profile NAME]
  vault.py show <note> [--canon] [--full]
  vault.py list [type] [--world W] [--character NAME]
  vault.py cast <story>
  vault.py state <story>
  vault.py lint

Notes are found by file name or by an entry in `aliases`.
"""
import argparse
import datetime
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TEMPLATES = ROOT / "Templates"
SKIP_DIRS = {".git", ".obsidian", ".trash", ".claude", "Templates", "node_modules"}
ADULT_STAGES = {"adult", "elder"}
MINOR_STAGES = {"child", "teen"}
HUMAN = {"", "human", "humans"}

TEMPLATE_SHORTCUTS = {
    "character": "Character",
    "roleplay": "Profile - Roleplay",
    "persona": "Profile - User Persona",
    "bio": "Profile - Story Bio",
    "adult": "Adult",
    "setting": "Setting",
    "story": "Story",
}


# ---------- parsing ----------

def split_list(inner):
    """Split an inline YAML list on commas outside quotes and [[links]]."""
    items, buf, quote, depth = [], "", None, 0
    for ch in inner:
        if quote:
            buf += ch
            if ch == quote:
                quote = None
        elif ch in "\"'":
            quote = ch
            buf += ch
        elif ch == "[":
            depth += 1
            buf += ch
        elif ch == "]":
            depth -= 1
            buf += ch
        elif ch == "," and depth == 0:
            items.append(buf)
            buf = ""
        else:
            buf += ch
    if buf.strip():
        items.append(buf)
    return items


def parse_scalar(v):
    v = v.strip()
    if v.startswith("[") and v.endswith("]") and not v.startswith("[["):
        inner = v[1:-1].strip()
        return [parse_scalar(x) for x in split_list(inner)] if inner else []
    if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
        return v[1:-1]
    return v


def read_note(path):
    text = path.read_text(encoding="utf-8")
    fm, body = {}, text
    if text.startswith("---\n"):
        end = text.find("\n---", 4)
        if end != -1:
            block = text[4:end]
            body = text[end + 4:].lstrip("\n")
            key = None
            for line in block.splitlines():
                m = re.match(r"^([A-Za-z0-9_]+):\s*(.*)$", line)
                if m:
                    key = m.group(1)
                    fm[key] = parse_scalar(m.group(2)) if m.group(2).strip() else ""
                elif key and re.match(r"^\s*-\s+", line):
                    if not isinstance(fm[key], list):
                        fm[key] = []
                    fm[key].append(parse_scalar(re.sub(r"^\s*-\s+", "", line)))
    return fm, body


def link_name(value):
    """'[[Name|alias]]' or '"[[Name#h]]"' -> 'Name'."""
    if not isinstance(value, str):
        return ""
    v = value.strip().strip("\"'")
    m = re.match(r"^\[\[([^\]|#]*)", v)
    return (m.group(1) if m else v).strip()


def as_list(value):
    if isinstance(value, list):
        return value
    return [value] if value else []


def first_int(value):
    m = re.search(r"\d+", str(value or ""))
    return int(m.group()) if m else None


def world_of(fm):
    return link_name(fm.get("world") or fm.get("universe") or "")


# ---------- index ----------

class Note:
    def __init__(self, path):
        self.path = path
        self.name = path.stem
        self.fm, self.body = read_note(path)
        self.type = str(self.fm.get("type", ""))
        self.aliases = [str(a).lower() for a in as_list(self.fm.get("aliases"))]

    def rel(self):
        return self.path.relative_to(ROOT).as_posix()


def all_notes():
    notes = []
    for p in ROOT.rglob("*.md"):
        if any(part in SKIP_DIRS for part in p.relative_to(ROOT).parts):
            continue
        notes.append(Note(p))
    return notes


def find(notes, name):
    key = link_name(name).lower()
    for n in notes:
        if n.name.lower() == key:
            return n
    for n in notes:
        if key in n.aliases:
            return n
    return None


def adult_problems(note, notes):
    """Stage and age checks for one adult file. Empty list means it may load."""
    probs = []
    fm = note.fm
    stage = str(fm.get("stage", "")).lower()
    if stage not in ADULT_STAGES:
        probs.append(f"stage is '{stage or 'missing'}'; adult files need adult or elder")
    char = find(notes, fm.get("character", ""))
    if not char:
        probs.append("character link missing or not found")
    prof = None
    if link_name(fm.get("profile", "")):
        prof = find(notes, fm.get("profile"))
        if not prof:
            probs.append("profile link not found")
        elif str(prof.fm.get("stage", "")).lower() not in ADULT_STAGES:
            probs.append(f"linked profile '{prof.name}' is stage '{prof.fm.get('stage', 'missing')}'")
    for src in (note, prof, char):
        if not src:
            continue
        for k in ("age", "body_age"):
            n = first_int(src.fm.get(k))
            if n is not None and n < 18:
                probs.append(f"{k} {n} on '{src.name}' is under 18")
    return probs


# ---------- commands ----------

def cmd_new(args):
    tname = TEMPLATE_SHORTCUTS.get(args.template.lower(), args.template)
    tpath = next((p for p in TEMPLATES.glob("*.md") if p.stem.lower() == tname.lower()), None)
    if not tpath:
        sys.exit(f"No template '{args.template}'. Have: " + ", ".join(sorted(p.stem for p in TEMPLATES.glob('*.md'))))
    tfm, _ = read_note(tpath)
    ttype = str(tfm.get("type", ""))
    notes = all_notes()
    title, char = args.title.strip(), args.character

    if ttype in ("profile", "adult"):
        if not char:
            sys.exit(f"A {ttype} note needs --character.")
        cnote = find(notes, char)
        if not cnote:
            sys.exit(f"No character '{char}'. Create it first: vault.py new character \"{char}\"")
        char = cnote.name
        folder = cnote.path.parent
        if ttype == "adult":
            if args.profile:
                pnote = find(notes, args.profile)
                if not pnote:
                    sys.exit(f"No profile '{args.profile}'.")
                if str(pnote.fm.get("stage", "")).lower() not in ADULT_STAGES:
                    sys.exit(f"Refused: profile '{pnote.name}' is stage '{pnote.fm.get('stage')}'. Adult files attach only to adult or elder stages.")
                name = f"{pnote.name} - Adult"
            else:
                name = f"{char} - Adult"
        else:
            name = f"{char} - {title}"
        dest = folder / f"{name}.md"
    elif ttype == "character":
        name = title
        dest = ROOT / "Characters" / title / f"{title}.md"
    elif ttype == "setting":
        name = title
        dest = ROOT / "Settings" / f"{title}.md"
    elif ttype == "story":
        name = title
        dest = ROOT / "Stories" / f"{title}.md"
    else:
        name = title
        dest = ROOT / f"{title}.md"

    if dest.exists():
        sys.exit(f"Exists, not overwritten: {dest.relative_to(ROOT)}")
    text = tpath.read_text(encoding="utf-8")
    text = text.replace("{{title}}", name).replace("{{date}}", datetime.date.today().isoformat())
    if char:
        text = re.sub(r'^character:.*$', f'character: "[[{char}]]"', text, count=1, flags=re.M)
    if ttype == "adult" and args.profile:
        text = re.sub(r'^profile:.*$', f'profile: "[[{pnote.name}]]"', text, count=1, flags=re.M)
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(text, encoding="utf-8")
    print(dest.relative_to(ROOT).as_posix())


def guidance_lines():
    """Single-italic lines that appear in any template (Templates/ and its
    subfolders, such as Templates/Legacy/): instructions, not content."""
    lines = set()
    for p in TEMPLATES.rglob("*.md"):
        for line in p.read_text(encoding="utf-8").splitlines():
            s = line.strip()
            if re.fullmatch(r"\*[^*].*[^*]\*", s):
                lines.add(s)
    return lines


def clean_body(body, canon=False, full=False):
    body = re.sub(r"```base\n.*?```\n?", "", body, flags=re.S)
    guide = guidance_lines()
    out, skip_indent = [], None
    for line in body.splitlines():
        s = line.strip()
        indent = len(line) - len(line.lstrip())
        if skip_indent is not None:
            if s and indent > skip_indent:
                continue
            skip_indent = None
        if s in guide:
            continue
        if canon and "[draft]" in s:
            skip_indent = indent
            continue
        out.append(line)
    lines = out

    # drop Changelog unless --full
    if not full:
        kept, dropping = [], False
        for line in lines:
            if re.match(r"^##\s+Changelog\s*$", line):
                dropping = True
                continue
            if dropping and re.match(r"^#{1,2}\s", line):
                dropping = False
            if not dropping:
                kept.append(line)
        lines = kept

    # remove placeholder bullets and empty labeled fields left by templates
    def placeholder(s):
        return (s in ("-", "1.", "- **Variant** (stage): what changes")
                or re.fullmatch(r"-\s*\*\*[^*]+:\*\*", s) is not None
                or re.fullmatch(r"-\s*\[\[ ?\]\]\s*—?", s) is not None)
    lines = [l for l in lines if not placeholder(l.strip())]

    # drop headings with nothing under them, repeating so empty parents go too
    def level(l):
        m = re.match(r"^(#{1,6})\s", l)
        return len(m.group(1)) if m else 0

    while True:
        result = []
        for i, line in enumerate(lines):
            lv = level(line)
            if lv >= 2:
                j = i + 1
                while j < len(lines) and not lines[j].strip() and not level(lines[j]):
                    j += 1
                if j == len(lines) or (level(lines[j]) and level(lines[j]) <= lv):
                    continue
            result.append(line)
        if len(result) == len(lines):
            break
        lines = result

    text = "\n".join(lines)
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def compact_fm(fm):
    drop = {"cover", "tags", "created", "version"}
    parts = []
    for k, v in fm.items():
        if k in drop or v in ("", [], None):
            continue
        parts.append(f"{k}: {', '.join(map(str, v)) if isinstance(v, list) else v}")
    return " · ".join(parts)


def cmd_show(args):
    notes = all_notes()
    note = find(notes, args.note)
    if not note:
        sys.exit(f"No note '{args.note}'.")
    if note.type == "adult":
        probs = adult_problems(note, notes)
        if probs:
            sys.exit(f"Refused to load {note.name}: " + "; ".join(probs))
    print(f"# {note.rel()}")
    print(f"[{compact_fm(note.fm)}]")
    print()
    print(clean_body(note.body, canon=args.canon, full=args.full))


def cmd_list(args):
    notes = all_notes()
    rows = []
    for n in notes:
        if not n.type:
            continue
        if args.type and n.type != args.type and str(n.fm.get("profile_type", "")) != args.type:
            continue
        if args.world and args.world.lower() not in world_of(n.fm).lower():
            continue
        if args.character and link_name(n.fm.get("character", "")).lower() != args.character.lower() and n.name.lower() != args.character.lower():
            continue
        fm = n.fm
        rows.append([n.name, n.type + (f"/{fm.get('profile_type')}" if fm.get("profile_type") else ""),
                     str(fm.get("stage", "")), str(fm.get("age", "")), world_of(fm),
                     str(fm.get("status", "")), str(fm.get("rating", ""))])
    if not rows:
        print("Nothing found.")
        return
    head = ["name", "type", "stage", "age", "world", "status", "rating"]
    rows.sort(key=lambda r: (r[1], r[0]))
    widths = [max(len(h), *(len(r[i]) for r in rows)) for i, h in enumerate(head)]
    print("  ".join(h.ljust(w) for h, w in zip(head, widths)))
    for r in rows:
        print("  ".join(c.ljust(w) for c, w in zip(r, widths)))


def section(body, title):
    m = re.search(rf"^##\s+{re.escape(title)}\s*\n(.*?)(?=^##\s|\Z)", body, flags=re.M | re.S)
    return clean_body(m.group(1)) if m else ""


def story_note(notes, name):
    n = find(notes, name)
    if not n or n.type != "story":
        sys.exit(f"No story '{name}'.")
    return n


def cmd_cast(args):
    notes = all_notes()
    story = story_note(notes, args.story)
    print(f"# {story.name}: cast")
    stated = section(story.body, "Cast")
    print("Story cast lines (the scope check reads these first):")
    print(stated or "  (none written)")
    print()
    profiles = [find(notes, p) for p in as_list(story.fm.get("profiles"))]
    profiles = [p for p in profiles if p]
    for member in as_list(story.fm.get("cast")):
        c = find(notes, member)
        if not c:
            print(f"- {link_name(member)}: no character page")
            continue
        p = next((p for p in profiles if link_name(p.fm.get("character", "")).lower() == c.name.lower()), None)
        src = p.fm if p else {}
        age = src.get("age") or c.fm.get("age") or "not stated"
        body_age = src.get("body_age") or c.fm.get("body_age") or ""
        stage = src.get("stage") or ""
        species = c.fm.get("species") or "unspecified"
        mind = c.fm.get("mind") or ""
        adult = [n.name for n in notes if n.type == "adult" and link_name(n.fm.get("character", "")).lower() == c.name.lower()
                 and (not link_name(n.fm.get("profile", "")) or (p and link_name(n.fm.get("profile")).lower() == p.name.lower()))]
        if str(stage).lower() in MINOR_STAGES:
            adult = []
            stage = f"{stage} (no adult files load)"
        bits = [f"age {age}"]
        if body_age:
            bits.append(f"body {body_age}")
        if stage:
            bits.append(f"stage {stage}")
        bits.append(f"species {species}")
        if mind:
            bits.append(f"mind: {mind}")
        print(f"- {c.name}" + (f" as {p.name}" if p else "") + ": " + " · ".join(bits)
              + (f" · adult file: {', '.join(adult)}" if adult else ""))


def cmd_state(args):
    notes = all_notes()
    story = story_note(notes, args.story)
    fm = story.fm
    print(f"# {story.name} · {fm.get('mode', '')} · {fm.get('pov', '')} {fm.get('tense', '')} · {fm.get('status', '')}")
    print(f"Last beat: {fm.get('last_beat') or '(none)'}")
    st = section(story.body, "State")
    print("State:")
    print(st or "  (empty)")


def cmd_lint(_args):
    notes = all_notes()
    errors, warns = [], []
    by_name = {n.name.lower(): n for n in notes}
    adult_names = {n.name.lower() for n in notes if n.type == "adult"}
    universe = 0

    for n in notes:
        fm = n.fm
        if "universe" in fm and "world" not in fm:
            universe += 1
        if n.type == "adult":
            for p in adult_problems(n, notes):
                errors.append(f"{n.rel()}: {p}")
            ages = [first_int(s.fm.get("age")) for s in filter(None, [n, find(notes, fm.get("profile", "")) if link_name(fm.get("profile", "")) else None, find(notes, fm.get("character", ""))])]
            if all(a is None for a in ages):
                warns.append(f"{n.rel()}: no `age` in frontmatter on this file, its profile or its character")
            char = find(notes, fm.get("character", ""))
            if char and str(char.fm.get("species", "")).lower() not in HUMAN and not char.fm.get("mind"):
                warns.append(f"{char.rel()}: nonhuman with an adult file but no `mind` field")
        if n.type == "profile":
            stage = str(fm.get("stage", "")).lower()
            if not stage:
                warns.append(f"{n.rel()}: profile has no `stage`")
            if stage in MINOR_STAGES and str(fm.get("rating", "sfw")).lower() != "sfw":
                errors.append(f"{n.rel()}: {stage} profile must be rating sfw")
        if n.type == "character" and str(fm.get("rating", "sfw")).lower() != "sfw":
            warns.append(f"{n.rel()}: character pages stay rating sfw; adult material goes in an adult file")
        if n.type in ("character", "profile"):
            for target in re.findall(r"\[\[([^\]|#]+)", n.body):
                if target.strip().lower() in adult_names:
                    errors.append(f"{n.rel()}: links or embeds adult file '{target.strip()}'")

    if universe:
        warns.append(f"{universe} note(s) use `universe`; rename the key to `world`")
    for e in errors:
        print(f"ERROR {e}")
    for w in warns:
        print(f"WARN  {w}")
    print(f"{len(notes)} notes · {len(errors)} errors · {len(warns)} warnings")
    sys.exit(1 if errors else 0)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("new"); p.add_argument("template"); p.add_argument("title")
    p.add_argument("--character"); p.add_argument("--profile"); p.set_defaults(fn=cmd_new)
    p = sub.add_parser("show"); p.add_argument("note")
    p.add_argument("--canon", action="store_true", help="leave out [draft] lines")
    p.add_argument("--full", action="store_true", help="keep the Changelog"); p.set_defaults(fn=cmd_show)
    p = sub.add_parser("list"); p.add_argument("type", nargs="?")
    p.add_argument("--world"); p.add_argument("--character"); p.set_defaults(fn=cmd_list)
    p = sub.add_parser("cast"); p.add_argument("story"); p.set_defaults(fn=cmd_cast)
    p = sub.add_parser("state"); p.add_argument("story"); p.set_defaults(fn=cmd_state)
    p = sub.add_parser("lint"); p.set_defaults(fn=cmd_lint)
    args = ap.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
