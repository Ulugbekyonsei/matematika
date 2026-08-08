#!/usr/bin/env python3
"""Generate the PWA / home-screen icons.

The mark is a 3x3 array of dots -- a multiplication array, and distinctive
enough for a 7-year-old to find on a crowded home screen.

    python3 tools/make_icons.py
"""

from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent.parent / "icons"

START = (99, 102, 241)    # --primary   #6366f1
END = (236, 72, 153)      # --secondary #ec4899


def gradient(size):
    """Diagonal two-stop gradient, drawn small and upscaled for smoothness."""
    small = Image.new("RGB", (64, 64))
    px = small.load()
    for y in range(64):
        for x in range(64):
            tt = (x + y) / 126
            px[x, y] = tuple(round(START[i] + (END[i] - START[i]) * tt) for i in range(3))
    return small.resize((size, size), Image.LANCZOS)


def dot_array(img, size):
    """Nine white dots in a 3x3 grid, centred."""
    draw = ImageDraw.Draw(img)
    r = size * 0.058
    gap = size * 0.20
    cx = cy = size / 2
    for row in (-1, 0, 1):
        for col in (-1, 0, 1):
            x, y = cx + col * gap, cy + row * gap
            draw.ellipse([x - r, y - r, x + r, y + r], fill=(255, 255, 255, 255))
    return img


def rounded(img, size, radius_ratio=0.22):
    """Transparent rounded corners, for contexts that don't mask the icon."""
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=int(size * radius_ratio), fill=255
    )
    out = img.convert("RGBA")
    out.putalpha(mask)
    return out


def build(size, *, round_corners=True):
    img = gradient(size).convert("RGBA")
    dot_array(img, size)
    return rounded(img, size) if round_corners else img


def main():
    OUT.mkdir(parents=True, exist_ok=True)

    build(192).save(OUT / "icon-192.png")
    build(512).save(OUT / "icon-512.png")

    # iOS composites apple-touch-icon on black and applies its own mask,
    # so it must be full-bleed with no transparency.
    build(180, round_corners=False).convert("RGB").save(OUT / "icon-180.png")

    # Maskable: full bleed, mark well inside the 80% safe circle.
    build(512, round_corners=False).save(OUT / "icon-maskable-512.png")

    for f in sorted(OUT.glob("*.png")):
        print(f"{f.name:26} {f.stat().st_size:>7,} bytes")


if __name__ == "__main__":
    main()
