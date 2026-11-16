#!/usr/bin/env python3
"""Read NovelAI generation metadata from images, and diff two runs.

NovelAI writes its settings twice: as PNG text chunks (lost when an image is
re-saved) and hidden in the lowest bit of the alpha channel ("stealth" data,
which survives lossless WebP conversion). This reads either.

    python3 tools/nai_meta.py IMG [IMG ...]        summary per image
    python3 tools/nai_meta.py --json IMG           full decoded JSON
    python3 tools/nai_meta.py --diff A B           settings and tag differences

PNG works on stock Python. WebP and JPEG need Pillow (pip install pillow);
JPEG never keeps the alpha data.
"""
import gzip
import json
import re
import struct
import sys
import zlib

MAGICS = (b"stealth_pngcomp", b"stealth_pnginfo")
SETTINGS = [
    ("model", None), ("sampler", "sampler"), ("noise", "noise_schedule"),
    ("steps", "steps"), ("guidance", "scale"), ("rescale", "cfg_rescale"),
    ("width", "width"), ("height", "height"), ("seed", "seed"),
    ("brownian", "prefer_brownian"), ("qt_hint", "tag_hint_qt"),
    ("uc_hint", "tag_hint_uc_preset"),
]


# --- pixel access ---------------------------------------------------------

def _png_chunks(data):
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    pos, chunks = 8, []
    while pos + 8 <= len(data):
        n, kind = struct.unpack(">I4s", data[pos:pos + 8])
        chunks.append((kind, data[pos + 8:pos + 8 + n]))
        pos += 12 + n
    return chunks


def _png_text(chunks):
    out = {}
    for kind, body in chunks:
        if kind == b"tEXt" and b"\0" in body:
            k, v = body.split(b"\0", 1)
            out[k.decode("latin-1")] = v.decode("utf-8", "replace")
        elif kind == b"iTXt" and b"\0" in body:
            k, rest = body.split(b"\0", 1)
            comp, _method = rest[0], rest[1]
            rest = rest[2:].split(b"\0", 2)[-1]
            out[k.decode("latin-1")] = (zlib.decompress(rest) if comp else rest).decode("utf-8", "replace")
    return out


def _png_alpha(chunks):
    """Alpha plane of an 8-bit RGBA PNG, stdlib only. None if not RGBA8."""
    ihdr = next(b for k, b in chunks if k == b"IHDR")
    w, h, depth, ctype, _c, _f, interlace = struct.unpack(">IIBBBBB", ihdr)
    if depth != 8 or ctype != 6 or interlace:
        return None
    raw = zlib.decompress(b"".join(b for k, b in chunks if k == b"IDAT"))
    bpp, stride = 4, w * 4
    prev = bytearray(stride)
    alpha = bytearray(w * h)
    pos = 0
    for y in range(h):
        f = raw[pos]
        row = bytearray(raw[pos + 1:pos + 1 + stride])
        pos += 1 + stride
        if f == 1:
            for i in range(bpp, stride):
                row[i] = (row[i] + row[i - bpp]) & 255
        elif f == 2:
            for i in range(stride):
                row[i] = (row[i] + prev[i]) & 255
        elif f == 3:
            for i in range(stride):
                left = row[i - bpp] if i >= bpp else 0
                row[i] = (row[i] + ((left + prev[i]) >> 1)) & 255
        elif f == 4:
            for i in range(stride):
                a = row[i - bpp] if i >= bpp else 0
                b = prev[i]
                c = prev[i - bpp] if i >= bpp else 0
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                pred = a if pa <= pb and pa <= pc else (b if pb <= pc else c)
                row[i] = (row[i] + pred) & 255
        alpha[y * w:(y + 1) * w] = row[3::4]
        prev = row
    return w, h, alpha


def _pil_alpha(path):
    try:
        from PIL import Image
    except ImportError:
        return None
    im = Image.open(path)
    if "A" not in im.getbands():
        return None
    a = im.convert("RGBA").getchannel("A")
    return im.width, im.height, a.tobytes()


def _stealth(w, h, alpha):
    """NovelAI writes the bits column by column, top to bottom."""
    def bits():
        for x in range(w):
            for y in range(h):
                yield alpha[y * w + x] & 1

    it = bits()

    def take(nbytes):
        out = bytearray()
        for _ in range(nbytes):
            v = 0
            for _ in range(8):
                v = (v << 1) | next(it)
            out.append(v)
        return bytes(out)

    magic = take(15)
    if magic not in MAGICS:
        return None
    n = struct.unpack(">I", take(4))[0] // 8
    body = take(n)
    if magic == b"stealth_pngcomp":
        body = gzip.decompress(body)
    return json.loads(body.decode("utf-8"))


def read(path):
    """Return NovelAI's top-level metadata dict (Comment parsed), or None."""
    data = open(path, "rb").read()
    chunks = _png_chunks(data)
    meta = None
    if chunks:
        text = _png_text(chunks)
        if "Comment" in text:
            meta = dict(text)
        else:
            plane = _png_alpha(chunks) or _pil_alpha(path)
            meta = _stealth(*plane) if plane else None
    else:
        plane = _pil_alpha(path)
        meta = _stealth(*plane) if plane else None
    if meta and isinstance(meta.get("Comment"), str):
        meta["Comment"] = json.loads(meta["Comment"])
    return meta


# --- views ---------------------------------------------------------------

def flatten(meta):
    c = meta.get("Comment", {})
    row = {"model": (meta.get("Source") or "").replace("NovelAI Diffusion ", "")}
    for name, key in SETTINGS[1:]:
        row[name] = c.get(key)
    caps = c.get("v4_prompt", {}).get("caption", {})
    ncaps = c.get("v4_negative_prompt", {}).get("caption", {})
    row["prompt"] = caps.get("base_caption", c.get("prompt", ""))
    row["uc"] = ncaps.get("base_caption", c.get("uc", ""))
    row["chars"] = [x.get("char_caption", "") for x in caps.get("char_captions", [])]
    row["char_ucs"] = [x.get("char_caption", "") for x in ncaps.get("char_captions", [])]
    row["centers"] = [x.get("centers") for x in caps.get("char_captions", [])]
    return row


WEIGHT = re.compile(r"(-?\d*\.?\d+)::(.*?)::", re.S)


def tags(text):
    """Split a field into {tag: weight}. Weighted groups apply to each inner tag."""
    out = {}

    def add(chunk, w):
        for part in re.split(r"[,\n]", chunk):
            for sent in re.split(r"(?<=[a-z0-9)])\.\s+", part):
                t = sent.strip().strip(".").strip().lower()
                if t:
                    out[t] = w

    pos = 0
    for m in WEIGHT.finditer(text or ""):
        add(text[pos:m.start()], 1.0)
        add(m.group(2), float(m.group(1)))
        pos = m.end()
    add((text or "")[pos:], 1.0)
    return out


def summary(path):
    meta = read(path)
    if not meta:
        return f"== {path}\n  no NovelAI metadata found"
    r = flatten(meta)
    lines = [f"== {path}"]
    lines.append("  " + " | ".join(f"{k} {r[k]}" for k, _ in SETTINGS if r.get(k) is not None))
    lines.append(f"  PROMPT: {r['prompt']}")
    lines.append(f"  UC: {r['uc']}")
    for i, (cp, cu) in enumerate(zip(r["chars"], r["char_ucs"] + [""] * 9), 1):
        lines.append(f"  CHAR {i} @ {r['centers'][i - 1]}: {cp}")
        lines.append(f"  CHAR {i} UC: {cu}")
    return "\n".join(lines)


def diff(a, b):
    ma, mb = read(a), read(b)
    if not ma or not mb:
        return "both images need NovelAI metadata"
    ra, rb = flatten(ma), flatten(mb)
    out = [f"A = {a}", f"B = {b}", "", "SETTINGS"]
    for k, _ in SETTINGS:
        if ra.get(k) != rb.get(k):
            out.append(f"  {k}: {ra.get(k)} -> {rb.get(k)}")
    fields = [("prompt", ra["prompt"], rb["prompt"]), ("uc", ra["uc"], rb["uc"])]
    for i in range(max(len(ra["chars"]), len(rb["chars"]))):
        g = lambda r, key: r[key][i] if i < len(r[key]) else ""
        fields.append((f"char {i + 1}", g(ra, "chars"), g(rb, "chars")))
        fields.append((f"char {i + 1} uc", g(ra, "char_ucs"), g(rb, "char_ucs")))
    for name, ta, tb in fields:
        A, B = tags(ta), tags(tb)
        only_a = [t for t in A if t not in B]
        only_b = [t for t in B if t not in A]
        rew = [t for t in A if t in B and A[t] != B[t]]
        if not (only_a or only_b or rew):
            continue
        out.append(f"\n{name.upper()}  ({len(set(A) & set(B))} shared)")
        out += [f"  - {t}" + (f"  @{A[t]:g}" if A[t] != 1 else "") for t in only_a]
        out += [f"  + {t}" + (f"  @{B[t]:g}" if B[t] != 1 else "") for t in only_b]
        out += [f"  ~ {t}  {A[t]:g} -> {B[t]:g}" for t in rew]
    return "\n".join(out)


def main(argv):
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__)
        return 0
    if argv[0] == "--json":
        for p in argv[1:]:
            print(json.dumps(read(p), indent=2, ensure_ascii=False))
        return 0
    if argv[0] == "--diff":
        if len(argv) != 3:
            print("usage: nai_meta.py --diff A B")
            return 2
        print(diff(argv[1], argv[2]))
        return 0
    print("\n\n".join(summary(p) for p in argv))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
