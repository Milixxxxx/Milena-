#!/usr/bin/env python3
"""Minifiziert die CSS- und JS-Dateien von Startseite (index.html) und Verkaufsseite (angebot.html).

So funktioniert es:
- Die lesbare Fassung liegt als NAME.src.css bzw. NAME.src.js daneben. Nur diese Datei bearbeiten.
- Danach dieses Skript starten:  python3 scripts/minify_assets.py
  Es schreibt aus jeder .src-Datei die verkleinerte NAME.css bzw. NAME.js, die die Seiten laden.
- Beim ersten Lauf wird die vorhandene NAME.css/NAME.js zuerst als .src-Datei gesichert.
- Nicht minifiziert: config.js (Preise, Checkout, Tracking; wird von Hand gepflegt) und
  chart.umd.min.js (schon minifiziert).
Benötigt: pip install rcssmin rjsmin
"""
import os
import subprocess
import sys

import rcssmin
import rjsmin

SITE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'UNBOND_claude_2026-11-22')

CSS = [
    'unbond-nothing', 'unbond-nothing-poppins', 'unbond-consent', 'unbond-bereich', 'unbond-footer',
    'site-v21', 'redesign-v32', 'glass-v33', 'reference-type', 'ux-refinement', 'prompt-v5', 'methodik-v6',
    'faq-chat-v7', 'unbond-preserve-v2', 'hero-program-v1', 'unbond-unified', 'unbond-focus',
    'unbond-below-hero', 'unbond-final-cta', 'unbond-nothing-buttons', 'unbond-painpoints',
    'unbond-index-fonts', 'unbond-index-typo',
]
JS = ['script', 'hybrid-sales', 'hero-program-v1', 'unbond-painpoints', 'video-wechsel']


def run(name, ext, minify):
    live = os.path.join(SITE, f'{name}.{ext}')
    src = os.path.join(SITE, f'{name}.src.{ext}')
    if not os.path.exists(src):
        os.replace(live, src)
    text = open(src, encoding='utf-8').read()
    out = minify(text).strip() + '\n'
    open(live, 'w', encoding='utf-8').write(out)
    return len(text.encode()), len(out.encode())


def main():
    before = after = 0
    for name in CSS:
        b, a = run(name, 'css', lambda t: rcssmin.cssmin(t, keep_bang_comments=False))
        before += b; after += a
        print(f'{name}.css: {b} -> {a} Bytes')
    for name in JS:
        b, a = run(name, 'js', lambda t: rjsmin.jsmin(t, keep_bang_comments=False))
        before += b; after += a
        live = os.path.join(SITE, f'{name}.js')
        check = subprocess.run(['node', '--check', live], capture_output=True, text=True)
        if check.returncode != 0:
            sys.exit(f'FEHLER: {name}.js ist nach dem Minifizieren kein gültiges JavaScript:\n{check.stderr}')
        print(f'{name}.js: {b} -> {a} Bytes')
    print(f'Gesamt: {before} -> {after} Bytes ({100 - after * 100 // before} % kleiner)')


if __name__ == '__main__':
    main()
