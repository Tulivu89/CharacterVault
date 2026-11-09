#!/usr/bin/env python3
"""Vault helper for the story engine. Standard library only.

  vault.py new <template> "<Title>" [--character NAME] [--profile NAME]
  vault.py show <note> [<note> ...] [--canon] [--full]
  vault.py list [type] [--world W] [--character NAME]
  vault.py cast <story>
  vault.py state <story>
  vault.py text <story> --status | [--you] [--rewind] < text
  vault.py save <story>            lint, commit "Save: <story>", push
  vault.py commit "<message>"      lint, commit note changes, push
  vault.py seeds [--n 3] [--focus TEXT]   random pitch seeds
  vault.py thumbs                  thumbnails and terminal portraits of character images (needs Pillow)
  vault.py index                   rebuild .claude/ui/vault-index.json for the browser userscript
  vault.py lint
  vault.py help

Notes are found by file name or by an entry in `aliases`.
"""
import argparse
import datetime
import re
import subprocess
import sys
import time
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TEMPLATES = ROOT / "Templates"
SKIP_DIRS = {".git", ".obsidian", ".trash", ".claude", "Templates", "node_modules"}
ADULT_STAGES = {"adult", "elder"}
MINOR_STAGES = {"child", "teen"}
ADULT_WORDS = re.compile(r"twent|thirt|fort|fift|sixt|sevent|eight|ninet|hundred|centur|millenn|adult|elder|ancient", re.I)
PERSON_WORDS = re.compile(r"anthro|therian|kin\b|girl|boy|folk|elf|human", re.I)
CREATURE_WORDS = re.compile(r"feral|beast|monster|creature|animal|hound|wolf|dragon|tentacl|insect|hive|drone|serpent|eldritch", re.I)

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
    """Show one or more notes; several in one call saves a tool round trip."""
    notes = all_notes()
    failed = False
    for i, name in enumerate(args.note):
        if i:
            print("\n" + "-" * 40 + "\n")
        note = find(notes, name)
        if not note:
            print(f"No note '{name}'.")
            failed = True
            continue
        if note.type == "adult":
            probs = adult_problems(note, notes)
            if probs:
                print(f"Refused to load {note.name}: " + "; ".join(probs))
                failed = True
                continue
        print(f"# {note.rel()}")
        print(f"[{compact_fm(note.fm)}]")
        print()
        print(clean_body(note.body, canon=args.canon, full=args.full))
    if failed:
        sys.exit(1)


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


def active_story(notes):
    """The most recently edited story with status: active."""
    act = [n for n in notes if n.type == "story" and str(n.fm.get("status", "")).lower() == "active"]
    return max(act, key=lambda n: n.path.stat().st_mtime) if act else None


def fold(s):
    """Lowercase and strip accents, so Séraphine matches Seraphine."""
    return "".join(c for c in unicodedata.normalize("NFKD", s) if not unicodedata.combining(c)).lower()


LORE_BULLET = re.compile(r"^\s*-\s+\*\*([^*]+?)\*\*\s*:?\s*(.*)$")


def lore_index(notes, story):
    """Lore entries for a story's world: setting `Lore entries` bullets, plus a
    one-line entry for each world character who isn't in the cast."""
    drafts = str(story.fm.get("drafts", "off")).lower() in ("on", "true", "yes")
    setting = find(notes, story.fm.get("setting")) if link_name(story.fm.get("setting", "")) else None
    world = world_of(story.fm) or (world_of(setting.fm) if setting else "")
    cast = {link_name(c).lower() for c in as_list(story.fm.get("cast"))}
    entries = []
    for n in notes:
        in_world = bool(world) and fold(world_of(n.fm)) == fold(world)
        if n.type == "setting" and (in_world or n is setting):
            m = re.search(r"^##\s+Lore entries\s*\n(.*?)(?=^##\s|\Z)", n.body, flags=re.M | re.S)
            for line in (m.group(1).splitlines() if m else []):
                bm = LORE_BULLET.match(line)
                if not bm:
                    continue
                key, text = bm.group(1).strip().rstrip(":").strip(), bm.group(2).strip()
                if not text or (not drafts and "[draft]" in line):
                    continue
                keys = [k.strip() for k in key.split("/") if k.strip()]
                entries.append({"id": f"{n.name}#{keys[0]}", "keys": keys,
                                "text": f"**{key}:** {text}", "source": n.name})
        elif n.type == "character" and in_world and n.name.lower() not in cast:
            hook = re.search(r"^>\s*(.+)$", n.body, flags=re.M)
            if hook:
                keys = [n.name] + [str(a) for a in as_list(n.fm.get("aliases"))]
                entries.append({"id": f"char#{n.name}", "keys": keys,
                                "text": f"**{n.name}:** {hook.group(1).strip()}", "source": "character"})
    return entries


def key_pattern(key):
    k = re.sub(r"^the\s+", "", fold(key).strip())
    if k.endswith("s") and len(k) > 3:
        k = k[:-1]
    return re.compile(r"(?<!\w)" + re.escape(k) + r"(?:s|es|ed|ing|'s)?(?!\w)")


def match_lore(text, entries, skip=()):
    t = fold(text)
    return [e for e in entries if e["id"] not in skip and any(key_pattern(k).search(t) for k in e["keys"])]


def cmd_lore(args):
    notes = all_notes()
    story = story_note(notes, args.story) if args.story else active_story(notes)
    if not story:
        sys.exit("No active story; pass --story.")
    hits = match_lore(args.text, lore_index(notes, story))
    print("\n".join(f"- [{h['source']}] {h['text']}" for h in hits) or "No lore matches.")


def cmd_cast(args):
    notes = all_notes()
    story = story_note(notes, args.story)
    print(f"# {story.name}: cast")
    stated = section(story.body, "Cast")
    print("Story cast lines (the scope check reads these first):")
    print(stated or "  (none written)")
    print()
    profiles = [p for p in (find(notes, x) for x in as_list(story.fm.get("profiles"))) if p]
    for member in as_list(story.fm.get("cast")):
        c = find(notes, member)
        if not c:
            print(f"- {link_name(member)}: no character page")
            continue
        # A story that crosses time can list several versions of one character.
        mine = [p for p in profiles if link_name(p.fm.get("character", "")).lower() == c.name.lower()]
        for p in mine or [None]:
            print(describe_member(c, p, notes))


def describe_member(c, p, notes):
    src = p.fm if p else {}
    age = src.get("age") or c.fm.get("age") or "not stated"
    body_age = src.get("body_age") or c.fm.get("body_age") or ""
    stage = str(src.get("stage") or "")
    species = c.fm.get("species") or "unspecified"
    mind = c.fm.get("mind") or ""
    adult = [n.name for n in notes if n.type == "adult" and link_name(n.fm.get("character", "")).lower() == c.name.lower()
             and (not link_name(n.fm.get("profile", "")) or (p and link_name(n.fm.get("profile")).lower() == p.name.lower()))]
    note = ""
    if stage.lower() in MINOR_STAGES:
        adult, stage = [], f"{stage} (non-sexual role; no adult files load)"
    elif not p:
        minor = [v.name for v in notes if v.type == "profile" and link_name(v.fm.get("character", "")).lower() == c.name.lower()
                 and str(v.fm.get("stage", "")).lower() in MINOR_STAGES]
        if minor:
            adult = []
            note = f" · has younger variants ({', '.join(minor)}): name the profile this story uses before any adult file loads"
    bits = [f"age {age}"]
    if body_age:
        bits.append(f"body {body_age}")
    if stage:
        bits.append(f"stage {stage}")
    bits.append(f"species {species}")
    if mind:
        bits.append(f"mind: {mind}")
    return (f"- {c.name}" + (f" as {p.name}" if p else "") + ": " + " · ".join(bits)
            + (f" · adult file: {', '.join(adult)}" if adult else "") + note)


def cmd_state(args):
    notes = all_notes()
    story = story_note(notes, args.story)
    fm = story.fm
    print(f"# {story.name} · {fm.get('mode', '')} · {fm.get('pov', '')} {fm.get('tense', '')} · {fm.get('status', '')}")
    print(f"Last beat: {fm.get('last_beat') or '(none)'}")
    st = section(story.body, "State")
    print("State:")
    print(st or "  (empty)")


# ---------- story text ----------
# A story's prose lives in text parts beside its note:
# Stories/<Title>/<Title> - Part NN.md, type: text. The Stop hook appends each
# story turn word for word; `vault.py text` does the same from stdin when hooks
# aren't running.

PART_WORDS = 12000
BEAT_MARK = re.compile(r"^<!-- (beat|you) (\d{4}-\d\d-\d\d) (\d\d:\d\d) -->$", re.M)


def strip_ooc(text):
    """Drop out-of-character material: fenced code, and [bracketed] spans that
    start a line or end one. Brackets inside a prose line stay."""
    text = re.sub(r"```.*?```", "", text, flags=re.S)
    out, i, n = [], 0, len(text)
    while i < n:
        ch = text[i]
        if ch == "[":
            depth, j = 0, i
            while j < n:
                if text[j] == "[":
                    depth += 1
                elif text[j] == "]":
                    depth -= 1
                    if depth == 0:
                        break
                j += 1
            if j < n:
                line_start = text.rfind("\n", 0, i) + 1
                nl = text.find("\n", j)
                rest = text[j + 1: nl if nl != -1 else n]
                if not text[line_start:i].strip() or not rest.strip():
                    i = j + 1
                    continue
        out.append(ch)
        i += 1
    text = "".join(out)
    text = "\n".join(l.rstrip() for l in text.splitlines())
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def word_count(text):
    text = BEAT_MARK.sub("", text)
    text = re.sub(r"^#.*$", "", text, flags=re.M)
    return len(re.findall(r"[\w'’-]+", text))


def text_parts(notes, story):
    parts = [n for n in notes if n.type == "text" and link_name(n.fm.get("story", "")).lower() == story.name.lower()]
    return sorted(parts, key=lambda n: first_int(n.fm.get("part")) or 0)


def _set_fm(text, key, value):
    return re.sub(rf"^{key}:.*$", f"{key}: {value}", text, count=1, flags=re.M)


def _link_part(story, part_name):
    """Add `- Text: [[part]]` under the story note's ## Story heading."""
    text = story.path.read_text(encoding="utf-8")
    line = f"- Text: [[{part_name}]]"
    if line in text:
        return False
    lines = text.splitlines()
    head = next((i for i, l in enumerate(lines) if re.match(r"^##\s+Story\s*$", l)), None)
    if head is None:
        lines += ["", "## Story", line]
    else:
        at = head + 1
        texts = [i for i in range(head + 1, len(lines)) if lines[i].startswith("- Text: [[")]
        if texts:
            at = texts[-1] + 1
        elif at < len(lines) and re.fullmatch(r"\*[^*].*[^*]\*", lines[at].strip()):
            at += 1
        lines.insert(at, line)
    story.path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return True


def append_text(story, text, you=None, rewind=False, now=None):
    """Append one story turn to the story's latest text part, starting a new
    part when the latest passes PART_WORDS. With rewind, the last captured beat
    is removed first. Returns the paths written."""
    now = now or datetime.datetime.now()
    day, clock = now.strftime("%Y-%m-%d"), now.strftime("%H:%M")
    notes = all_notes()
    parts = text_parts(notes, story)
    changed = []
    body = parts[-1].path.read_text(encoding="utf-8") if parts else ""
    if rewind and parts:
        marks = [m for m in BEAT_MARK.finditer(body) if m.group(1) == "beat"]
        if marks:
            body = body[:marks[-1].start()].rstrip() + "\n"
            parts[-1].path.write_text(body, encoding="utf-8")
            changed.append(parts[-1].path)
    if parts and word_count(body) < PART_WORDS:
        path = parts[-1].path
    else:
        num = (first_int(parts[-1].fm.get("part")) or len(parts)) + 1 if parts else 1
        name = f"{story.name} - Part {num:02d}"
        path = story.path.parent / story.name / f"{name}.md"
        path.parent.mkdir(parents=True, exist_ok=True)
        src = story.path.read_text(encoding="utf-8")
        copied = [m.group(0) for k in ("world", "rating") for m in [re.search(rf"^{k}:.*$", src, flags=re.M)] if m]
        body = (f"---\ntype: text\nstory: \"[[{story.name}]]\"\npart: {num}\n"
                + "".join(l + "\n" for l in copied) + "words: 0\n---\n"
                f"# {story.name} · Part {num:02d}\n")
        if _link_part(story, name):
            changed.append(story.path)
    days = re.findall(r"^### (\d{4}-\d\d-\d\d)\s*$", body, flags=re.M)
    add = []
    if not days or days[-1] != day:
        add.append(f"### {day}")
    if you:
        quoted = "\n".join(("> " + l) if l.strip() else ">" for l in you.strip().splitlines())
        add.append(f"<!-- you {day} {clock} -->\n{quoted}")
    if text.strip():
        add.append(f"<!-- beat {day} {clock} -->\n{text.strip()}")
    body = body.rstrip() + "\n\n" + "\n\n".join(add) + "\n"
    body = _set_fm(body, "words", word_count(body.split("\n---", 1)[-1]))
    path.write_text(body, encoding="utf-8")
    if path not in changed:
        changed.append(path)
    return changed


def text_status(notes, story):
    parts = text_parts(notes, story)
    if not parts:
        return "Text: none saved yet."
    lines = []
    for p in parts:
        lines.append(f"- {p.name}: {p.fm.get('words', '?')} words")
    body = parts[-1].path.read_text(encoding="utf-8")
    marks = list(BEAT_MARK.finditer(body))
    if marks:
        last = marks[-1]
        snippet = " ".join(body[last.end():].split())[:100]
        lines.append(f"Last captured: {last.group(2)} {last.group(3)} · {snippet}…")
    return "Text:\n" + "\n".join(lines)


def cmd_text(args):
    notes = all_notes()
    story = story_note(notes, args.story)
    if args.status:
        print(text_status(notes, story))
        return
    raw = sys.stdin.read()
    text = strip_ooc(raw)
    if not text:
        sys.exit("No story text on stdin.")
    changed = append_text(story, "", you=text) if args.you else append_text(story, text, rewind=args.rewind)
    for p in changed:
        print(p.relative_to(ROOT).as_posix())


# ---------- git ----------
# Note commits only stage the note folders, never the machinery.

NOTE_PATHS = ["Characters", "Settings", "Stories", "Style", "Modules", "story-profile.md", "Home.md", ".claude/ui"]


def git(*args, timeout=30):
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, timeout=timeout)


def git_push(retries=4):
    """Push the current branch, with backoff on failure. Returns a status line."""
    if not git("remote").stdout.strip():
        return "no remote; not pushed"
    upstream = git("rev-parse", "--abbrev-ref", "@{u}").returncode == 0
    cmd = ["push", "-q"] if upstream else ["push", "-q", "-u", "origin", "HEAD"]
    for attempt in range(retries + 1):
        r = git(*cmd, timeout=60)
        if r.returncode == 0:
            return "pushed"
        if attempt < retries:
            time.sleep(2 ** (attempt + 1))
    return "push failed: " + (r.stderr.strip().splitlines() or ["unknown error"])[-1]


def commit_notes(message, paths=None):
    """Stage note changes (or the given paths), commit, push. Returns status lines."""
    try:
        write_index()
    except Exception as e:  # the index is a convenience; never block a commit on it
        print(f"UI index not rebuilt: {e}", file=sys.stderr)
    targets = [str(p) for p in (paths or NOTE_PATHS) if (ROOT / p).exists()]
    if not targets:
        return ["nothing to commit"]
    git("add", "-A", "--", *targets)
    if git("diff", "--cached", "--quiet", "--", *targets).returncode == 0:
        return ["nothing to commit", git_push()]
    r = git("commit", "-q", "-m", message, "--", *targets)
    if r.returncode != 0:
        return ["commit failed: " + (r.stderr.strip().splitlines() or ["unknown error"])[-1]]
    return [f"committed: {message}", git_push()]


def lint_errors():
    r = subprocess.run([sys.executable, __file__, "lint"], capture_output=True, text=True, timeout=60)
    return [l for l in r.stdout.splitlines() if l.startswith("ERROR")], r.stdout.strip().splitlines()[-1:]


def cmd_commit(args):
    errors, summary = lint_errors()
    if errors:
        print("\n".join(errors))
        sys.exit("Lint errors; nothing committed.")
    print("\n".join(summary + commit_notes(args.message)))


def cmd_save(args):
    notes = all_notes()
    story = story_note(notes, args.story)
    print(text_status(notes, story))
    errors, summary = lint_errors()
    if errors:
        print("\n".join(errors))
        sys.exit("Lint errors; nothing committed.")
    print("\n".join(summary + commit_notes(f"Save: {story.name}")))


# ---------- pitch seeds ----------

def adult_capable(c, notes):
    """A character who can lead an adult pitch: an adult or elder profile, or an adult age on the page."""
    age = str(c.fm.get("age") or "")
    if (first_int(age) or 0) >= 18 or ADULT_WORDS.search(age):
        return True
    return any(n.type == "profile" and link_name(n.fm.get("character", "")).lower() == c.name.lower()
               and str(n.fm.get("stage", "")).lower() in ADULT_STAGES for n in notes)


def cmd_seeds(args):
    """Random setting, character and kink combinations for the Pitch arm, so
    pitches don't drift to the same picks."""
    import random
    notes = all_notes()
    rng = random.Random(args.seed)
    settings = [n for n in notes if n.type == "setting"]
    chars = [n for n in notes if n.type == "character" and adult_capable(n, notes)]
    prof = ROOT / "story-profile.md"
    kinks = []
    if prof.exists():
        m = re.search(r"^##\s+Kinks and themes\s*\n(.*?)(?=^##\s|\Z)", prof.read_text(encoding="utf-8"), flags=re.M | re.S)
        kinks = [l.strip()[2:].strip() for l in (m.group(1).splitlines() if m else []) if l.strip().startswith("- ") and l.strip()[2:].strip()]
    used = {}
    for s in notes:
        if s.type == "story":
            used.setdefault(fold(world_of(s.fm)), []).append(f"{s.name} ({s.fm.get('status', '')})")
    focus = find(notes, args.focus) if args.focus else None
    if focus is not None and focus.type == "setting":
        pool = [focus] * args.n
    elif focus is not None and focus.type == "character" and any(fold(world_of(s.fm)) == fold(world_of(focus.fm)) for s in settings):
        home = [s for s in settings if fold(world_of(s.fm)) == fold(world_of(focus.fm))]
        pool = [rng.choice(home) for _ in range(args.n)]
    else:
        pool = rng.sample(settings, min(args.n, len(settings))) if settings else []
    rng.shuffle(kinks)
    print("Pitch seeds (random; use them unless the user's request overrides):")
    if args.focus and (focus is None or focus.type not in ("setting", "character")):
        print(f"Focus from the user: {args.focus}")
    for i, s in enumerate(pool or [None] * args.n):
        world = fold(world_of(s.fm)) if s else ""
        here = [c for c in chars if world and fold(world_of(c.fm)) == world]
        picks = rng.sample(here, min(2, len(here)))
        if focus is not None and focus.type == "character":
            picks = [focus] + [c for c in picks if c is not focus][:1]
        k = kinks[i * 2:(i * 2) + 2] or kinks[:2]
        line = f"{i + 1}. setting: {s.name if s else 'new'}"
        line += f" · characters: {', '.join(c.name for c in picks) or 'new'}"
        line += f" · kinks: {', '.join(k) or 'from the profile'}"
        if s and used.get(world):
            line += f" · stories already in this world: {', '.join(used[world])}"
        print(line)


# ---------- thumbnails ----------

CELL_PX = 20  # terminal portraits: 20 x 20 pixels, drawn as 20 columns x 10 rows of half blocks


def _cells(im, px):
    """A picture as terminal cells: base64 of little-endian u32 triplets [char, fg, bg] per
    cell, two pixels per cell (upper half block), transparent pixels left to the terminal."""
    import base64
    import struct
    side = max(im.size)
    square = im.crop(((im.width - side) // 2, 0, (im.width - side) // 2 + side, side)) if im.width < im.height else im
    square = square.resize((px, px))
    pix = square.load()
    default = 0x01000000
    words = []
    for row in range(0, px, 2):
        for x in range(px):
            top, bottom = pix[x, row], pix[x, row + 1]
            rgb = lambda c: (c[0] << 16) | (c[1] << 8) | c[2]
            t_on, b_on = top[3] >= 128, bottom[3] >= 128
            if t_on and b_on:
                words += [0x2580, rgb(top), rgb(bottom)]
            elif t_on:
                words += [0x2580, rgb(top), default]
            elif b_on:
                words += [0x2584, rgb(bottom), default]
            else:
                words += [0x20, default, default]
    return base64.b64encode(struct.pack(f"<{len(words)}I", *words)).decode()


def cmd_thumbs(_args):
    """Small copies of character images in images/.thumbs/, for the UI mod and userscript."""
    try:
        from PIL import Image
    except ImportError:
        sys.exit("Needs Pillow: pip install pillow (or apt install python3-pil).")
    made = 0
    for img in sorted(ROOT.glob("Characters/*/images/*.png")):
        out = img.parent / ".thumbs" / img.name
        if out.exists() and out.stat().st_mtime >= img.stat().st_mtime:
            continue
        out.parent.mkdir(exist_ok=True)
        im = Image.open(img).convert("RGBA")
        small = im.copy()
        im.thumbnail((160, 160))
        im.quantize(colors=128, method=Image.Quantize.FASTOCTREE).save(out, optimize=True)
        out.with_suffix(".cells").write_text(_cells(small, CELL_PX), encoding="ascii")
        made += 1
    print(f"{made} thumbnail(s) made.")


# ---------- UI index ----------
# .claude/ui/vault-index.json: what the browser userscript reads from the repo (through the
# person's GitHub login) to show the vault. Rebuilt on every commit the vault makes.

UI_INDEX = ROOT / ".claude" / "ui" / "vault-index.json"


def _picture(path):
    thumb = path.parent / ".thumbs" / path.name
    cells = thumb.with_suffix(".cells")
    rel = lambda p: p.relative_to(ROOT).as_posix()
    return {"image": rel(path), "thumb": rel(thumb) if thumb.exists() else "",
            "cells": rel(cells) if cells.exists() else ""}


def _portrait(note):
    folder = note.path.parent / "images"
    pics = sorted(p for p in folder.glob("*.png") if " - mood - " not in p.name) if folder.is_dir() else []
    return _picture(pics[0]) if pics else None


def _bullets(text):
    return [l[2:].strip() for l in text.splitlines() if l.startswith("- ") and l[2:].strip()]


def build_index(notes=None):
    notes = notes if notes is not None else all_notes()
    by_name = {n.name.lower(): n for n in notes}
    out = {"stories": [], "characters": [], "settings": [], "active": None, "coWriter": None,
           "profile": {"defaults": [], "style": [], "kinks": [], "limits": []}}
    for s in sorted((n for n in notes if n.type == "story"), key=lambda n: n.name):
        fm = s.fm
        out["stories"].append({"name": s.name, "status": str(fm.get("status", "")), "mode": str(fm.get("mode", "")),
                               "world": world_of(fm), "lastBeat": str(fm.get("last_beat") or "")})
    act = active_story(notes)
    if act:
        cast = []
        for line in _bullets(section(act.body, "Cast")):
            name = re.sub(r"[\[\]]", "", line.split("(")[0]).split(" as ")[0].strip()
            ch = by_name.get(name.lower())
            cast.append({"name": name, "line": line, "portrait": _portrait(ch) if ch else None})
        out["active"] = {"story": act.name, "mode": str(act.fm.get("mode", "")),
                         "pov": f"{act.fm.get('pov', '')} {act.fm.get('tense', '')}".strip(),
                         "lastBeat": str(act.fm.get("last_beat") or ""),
                         "state": _bullets(section(act.body, "State")), "cast": cast}
    for c in sorted((n for n in notes if n.type == "character"), key=lambda n: (world_of(n.fm).lower(), n.name)):
        hook = re.search(r"^>\s*(.+)$", c.body, flags=re.M)
        out["characters"].append({"name": c.name, "world": world_of(c.fm) or "No world",
                                  "species": str(c.fm.get("species") or ""), "age": str(c.fm.get("age") or ""),
                                  "hook": hook.group(1).strip() if hook else "", "portrait": _portrait(c)})
    for s in sorted((n for n in notes if n.type == "setting"), key=lambda n: n.name):
        hook = re.search(r"^>\s*(.+)$", s.body, flags=re.M)
        out["settings"].append({"name": s.name, "world": world_of(s.fm), "status": str(s.fm.get("status", "")),
                                "hook": hook.group(1).strip() if hook else ""})
    prof = ROOT / "story-profile.md"
    if prof.exists():
        text = prof.read_text(encoding="utf-8")

        def sec(title):
            m = re.search(rf"^##\s+{re.escape(title)}\s*\n(.*?)(?=^##\s|\Z)", text, flags=re.M | re.S)
            return m.group(1) if m else ""

        out["profile"] = {"defaults": _bullets(sec("Defaults")), "style": _bullets(sec("Style")),
                          "kinks": _bullets(sec("Kinks and themes")), "limits": _bullets(sec("Limits"))}
        name = re.search(r"^-\s*Name:\s*(.+)$", sec("Co-writer"), flags=re.M)
        if name:
            full = name.group(1).strip()
            short = (re.search(r"\(([^)]+)\)", full) or re.match(r"(.+)", full)).group(1).strip()
            base = re.sub(r"\s*\(.*\)\s*$", "", full)
            ch = by_name.get(base.lower())
            moods = {}
            if ch and (ch.path.parent / "images").is_dir():
                for p in sorted((ch.path.parent / "images").glob(f"{ch.name} - mood - *.png")):
                    moods[p.stem.split(" - mood - ", 1)[1].strip().lower()] = _picture(p)
            out["coWriter"] = {"name": base, "short": short, "portrait": _portrait(ch) if ch else None, "moods": moods}
    return out


def write_index(notes=None):
    """Rewrites the UI index when it changed. Returns its path, or None when unchanged."""
    import json
    text = json.dumps(build_index(notes), indent=1, ensure_ascii=False) + "\n"
    if UI_INDEX.exists() and UI_INDEX.read_text(encoding="utf-8") == text:
        return None
    UI_INDEX.parent.mkdir(parents=True, exist_ok=True)
    UI_INDEX.write_text(text, encoding="utf-8")
    return UI_INDEX


def cmd_index(_args):
    path = write_index()
    print(f"Wrote {path.relative_to(ROOT).as_posix()}" if path else "UI index unchanged.")


# ---------- help ----------

def cmd_help(_args):
    notes = all_notes()
    story = active_story(notes)
    out = ["Story Vault · commands", ""]
    if story:
        fm = story.fm
        out.append(f"Active story: {story.name} · {fm.get('mode', '')} · {fm.get('pov', '')} {fm.get('tense', '')}")
        if fm.get("last_beat"):
            out.append(f"Last beat: {fm.get('last_beat')}")
    else:
        out.append("No active story. Send `prepare for fictional roleplay` or [setup].")
    others = [n.name for n in notes if n.type == "story" and n is not story
              and str(n.fm.get("status", "")).lower() in ("active", "paused")]
    if others:
        out.append("Other open stories: " + ", ".join(others))
    groups = [
        ("In a scene", "[stop] · [pause] / [resume] · [rewind] or [rewind: new direction] · [tone: harsher / lighter] · [check]"),
        ("Story", "[setup] · [pitch] or [pitch: a setting, character or kink] · [save] · [done] · [scope] · [profile]"),
        ("Co-writer", "[persona] to create or change one · [persona: <name>] to switch to a saved one · [persona: off] / [persona: on]"),
        ("Style library", "[keep] · [keep: \"…\" — why] · [avoid: \"…\" — why] · [distill]"),
    ]
    if (ROOT / ".claude" / "skills" / "nai-v5-images").exists():
        groups.append(("Images", "[img] · [img: a character, look or moment]"))
    groups += [
        ("Free (no turn used)", "[help] · [state] · [cast] · [show <note>] · [list <type>] · [lore <words>] · [lint]"),
        ("New notes", "ask, or: vault.py new character|roleplay|persona|bio|adult|setting|story \"<Title>\""),
    ]
    out.append("")
    for head, line in groups:
        out.append(f"{head}: {line}")
    out += ["", "Story text saves itself after each story turn; [save] also records the state."]
    if (ROOT / "Home.md").exists():
        out.append("Dashboard: Home.md in Obsidian. Guide: GUIDE.md.")
    print("\n".join(out))


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
            srcs = [s for s in (n, find(notes, fm.get("profile", "")) if link_name(fm.get("profile", "")) else None,
                                find(notes, fm.get("character", ""))) if s]
            if not link_name(fm.get("profile", "")):
                # A general adult file covers every version, so any profile's age counts.
                cname = link_name(fm.get("character", "")).lower()
                srcs += [v for v in notes if v.type == "profile" and link_name(v.fm.get("character", "")).lower() == cname]
            ages = [str(s.fm.get("age") or "").strip() for s in srcs]
            ages = [a for a in ages if a]
            if not ages:
                warns.append(f"{n.rel()}: no `age` in frontmatter on this file, its profile or its character")
            elif not any(first_int(a) is not None or ADULT_WORDS.search(a) for a in ages):
                warns.append(f"{n.rel()}: age '{ages[0]}' states no adult age; the scope check will ask")
            char = find(notes, fm.get("character", ""))
            species = str(char.fm.get("species", "")) if char else ""
            if char and CREATURE_WORDS.search(species) and not PERSON_WORDS.search(species) and not char.fm.get("mind"):
                warns.append(f"{char.rel()}: creature-type species with an adult file but no `mind` line")
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
    p = sub.add_parser("show"); p.add_argument("note", nargs="+")
    p.add_argument("--canon", action="store_true", help="leave out [draft] lines")
    p.add_argument("--full", action="store_true", help="keep the Changelog"); p.set_defaults(fn=cmd_show)
    p = sub.add_parser("list"); p.add_argument("type", nargs="?")
    p.add_argument("--world"); p.add_argument("--character"); p.set_defaults(fn=cmd_list)
    p = sub.add_parser("cast"); p.add_argument("story"); p.set_defaults(fn=cmd_cast)
    p = sub.add_parser("state"); p.add_argument("story"); p.set_defaults(fn=cmd_state)
    p = sub.add_parser("lint"); p.set_defaults(fn=cmd_lint)
    p = sub.add_parser("lore"); p.add_argument("text"); p.add_argument("--story"); p.set_defaults(fn=cmd_lore)
    p = sub.add_parser("text"); p.add_argument("story")
    p.add_argument("--status", action="store_true", help="list parts and the last captured beat")
    p.add_argument("--you", action="store_true", help="stdin is the user's passage (PLAY, CO-WRITE)")
    p.add_argument("--rewind", action="store_true", help="replace the last captured beat"); p.set_defaults(fn=cmd_text)
    p = sub.add_parser("save"); p.add_argument("story"); p.set_defaults(fn=cmd_save)
    p = sub.add_parser("commit"); p.add_argument("message"); p.set_defaults(fn=cmd_commit)
    p = sub.add_parser("help"); p.set_defaults(fn=cmd_help)
    p = sub.add_parser("thumbs"); p.set_defaults(fn=cmd_thumbs)
    p = sub.add_parser("index"); p.set_defaults(fn=cmd_index)
    p = sub.add_parser("seeds"); p.add_argument("--n", type=int, default=3)
    p.add_argument("--focus", help="a setting, a character, or a theme from [pitch: …]")
    p.add_argument("--seed", type=int, help="repeatable output for tests"); p.set_defaults(fn=cmd_seeds)
    args = ap.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
