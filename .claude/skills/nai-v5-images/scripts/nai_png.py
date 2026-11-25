#!/usr/bin/env python3
"""Write blank PNGs that carry NovelAI V5 generation metadata, for drag-and-drop import.

Usage: python3 nai_png.py <setups.json> [--out DIR]

setups.json is one setup or a list of them:
  {"name": "Izzy - Toon Gloss - Solo",          # file name, no extension
   "prompt": "<Base Prompt>", "uc": "<Base UC>",
   "chars": [{"prompt": "<box>", "uc": "<box UC>", "x": 0.5, "y": 0.5}, ...],
   "width": 832, "height": 1216, "steps": 24, "scale": 4.5, "rescale": 0,
   "sampler": "k_euler_ancestral", "noise_schedule": "karras",
   "seed": 123}                                    # optional; random if left out

The Comment schema is copied from the user's own V5 text-to-image exports (model hash
0ADF9AB7). There is no signed_hash, so NovelAI treats the file as hand-made settings;
the image itself is flat grey. Standard library only.
"""
import json
import random
import struct
import sys
import zlib
from pathlib import Path


def chunk(kind, data):
    return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data) & 0xFFFFFFFF)


def text(key, value):
    return chunk(b"tEXt", key.encode("latin-1") + b"\0" + value.encode("utf-8"))


def comment(s):
    chars = s.get("chars", [])
    coords = any("x" in c for c in chars)
    seed = s.get("seed", random.randrange(1, 2**32 - 1))

    def captions(field, base):
        return {"base_caption": base, "char_captions": [
            {"char_caption": c.get(field, ""),
             "centers": [{"x": c.get("x", 0.5), "y": c.get("y", 0.5)}]} for c in chars]}

    return {
        "prompt": s["prompt"], "steps": s.get("steps", 24),
        "height": s.get("height", 1216), "width": s.get("width", 832),
        "scale": s.get("scale", 4.5), "uncond_scale": 0.0, "cfg_rescale": s.get("rescale", 0.0),
        "seed": seed, "n_samples": 1, "noise_schedule": s.get("noise_schedule", "karras"),
        "legacy_v3_extend": False,
        "reference_information_extracted_multiple": [], "reference_strength_multiple": [],
        "v4_prompt": {"caption": captions("prompt", s["prompt"]),
                      "use_coords": coords, "use_order": True, "legacy_uc": False},
        "v4_negative_prompt": {"caption": captions("uc", s.get("uc", "")),
                               "use_coords": False, "use_order": False, "legacy_uc": False},
        "quality_boost": False, "sampler": s.get("sampler", "k_euler_ancestral"),
        "controlnet_strength": 1.0, "controlnet_model": None, "dynamic_thresholding": False,
        "dynamic_thresholding_percentile": 0.999, "dynamic_thresholding_mimic_scale": 10.0,
        "sm": False, "sm_dyn": False, "skip_cfg_above_sigma": None, "skip_cfg_below_sigma": 0.0,
        "lora_unet_weights": None, "lora_clip_weights": None,
        "deliberate_euler_ancestral_bug": False, "prefer_brownian": True,
        "cfg_sched_eligibility": "enable_for_post_summer_samplers", "explike_fine_detail": False,
        "minimize_sigma_inf": False, "uncond_per_vibe": True, "wonky_vibe_correlation": True,
        "tag_hint_uc_preset": 0, "tag_hint_qt": 0, "version": 1,
        "uc": s.get("uc", ""), "request_type": "PromptGenerateRequest",
        "model_name": "NovelAI Diffusion V5", "model_hash": "0ADF9AB7",
    }


def png(s):
    w, h = s.get("width", 832), s.get("height", 1216)
    row = b"\0" + b"\x80\x80\x80" * w
    out = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0))
    for key, value in (("Title", "NovelAI generated image"), ("Description", s["prompt"]),
                       ("Software", "NovelAI"), ("Source", "NovelAI Diffusion V5 0ADF9AB7"),
                       ("Comment", json.dumps(comment(s), ensure_ascii=False))):
        out += text(key, value)
    return out + chunk(b"IDAT", zlib.compress(row * h, 9)) + chunk(b"IEND", b"")


def main(argv):
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__)
        return 0
    setups = json.loads(Path(argv[0]).read_text(encoding="utf-8"))
    setups = setups if isinstance(setups, list) else [setups]
    out = Path(argv[argv.index("--out") + 1]) if "--out" in argv else Path(argv[0]).parent
    out.mkdir(parents=True, exist_ok=True)
    for s in setups:
        path = out / (s.get("name", "setup") + ".png")
        path.write_bytes(png(s))
        print(path)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
