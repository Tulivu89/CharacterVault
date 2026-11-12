#!/usr/bin/env python3
"""Build data/vocab.json from Waifoundry's embedded VOCAB and the vault's tag reference files.

  python3 -I tools/extract_vocab.py <Waifoundry.html> [--vault <CharacterVault root>]

Standard library only. The HTML is read as data; nothing in it runs.

Output shape (counts in base 36 to keep the script small):
  {
    "source": "...",
    "general": {"<category>": "tag:count36|tag:count36|..."},
    "artists": "name:count36|...",
    "copyright": "name:count36|...",
    "aliases": {"alias": "canonical"},
    "vault": {"<subcategory>": "tag|tag|..."},
    "menuHide": ["rape", ...]
  }
"""
import json
import re
import sys
from pathlib import Path

# Tags the v8 rules say never to emit, or to emit only as negatives. Kept out of menus.
NEVER_EMIT = {"highres", "absurdres", "incredibly absurdres", "depthness"}


def b36(n):
    n = int(n)
    if n <= 0:
        return "0"
    digits = "0123456789abcdefghijklmnopqrstuvwxyz"
    out = ""
    while n:
        n, r = divmod(n, 36)
        out = digits[r] + out
    return out


def pack(pairs):
    seen, out = set(), []
    for tag, count in pairs:
        tag = str(tag).strip()
        if not tag or tag in seen or "|" in tag:
            continue
        seen.add(tag)
        out.append(f"{tag}:{b36(count)}")
    return "|".join(out)


def read_vocab(html_path):
    text = Path(html_path).read_text(encoding="utf-8")
    m = re.search(r"^const VOCAB = (\{.*\});?\s*$", text, re.M)
    if not m:
        sys.exit("VOCAB line not found in the HTML.")
    return json.loads(m.group(1))


def read_vault_tags(vault_root):
    tags_dir = Path(vault_root) / ".claude/skills/nai-v5-images/references/tags"
    out = {}
    if not tags_dir.is_dir():
        return out
    for f in sorted(tags_dir.glob("*.md")):
        body = f.read_text(encoding="utf-8")
        blocks = re.findall(r'<subcategory name="([^"]+)">(.*?)</subcategory>', body, re.S)
        if not blocks:  # files with plain <category> blocks and no subcategories
            blocks = re.findall(r'<category name="([^"]+)">(.*?)</category>', body, re.S)
        for name, block in blocks:
            tags = [t.strip() for t in block.replace("\n", " ").split(",")]
            tags = [t for t in tags if t and t not in NEVER_EMIT and "|" not in t]
            key = f"{f.stem}/{name}"
            out[key] = "|".join(dict.fromkeys(tags))
    return out


def main(argv):
    if len(argv) < 2:
        sys.exit(__doc__)
    html = argv[1]
    vault = None
    if "--vault" in argv:
        vault = argv[argv.index("--vault") + 1]
    v = read_vocab(html)
    vocab = v["vocab"]
    general = {}
    for cat, pairs in vocab.items():
        if cat in ("artists", "copyright"):
            continue
        pairs = [(t, c) for t, c in pairs if t not in NEVER_EMIT]
        general[cat] = pack(pairs)
    data = {
        "source": v.get("source", ""),
        "general": general,
        "artists": pack(vocab.get("artists", [])),
        "copyright": pack(vocab.get("copyright", [])),
        "aliases": {k: a for k, a in v.get("aliases", {}).items() if k != a},
        "vault": read_vault_tags(vault) if vault else {},
        "menuHide": v.get("defaultBans", []),
    }
    out = Path(__file__).resolve().parent.parent / "data" / "vocab.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    n_general = sum(len(s.split("|")) for s in general.values() if s)
    print(f"wrote {out} ({out.stat().st_size // 1024} KB): {n_general} general entries, "
          f"{len(data['artists'].split('|'))} artists, {len(data['copyright'].split('|'))} copyrights, "
          f"{len(data['aliases'])} aliases, {len(data['vault'])} vault subcategories")


if __name__ == "__main__":
    main(sys.argv)
