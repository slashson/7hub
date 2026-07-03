# Build spec — smartstudios landing (Figma 1696:280)

Faithful reproduction of a fixed **1024 × 3789** Figma frame. Every element is
**absolutely positioned**. The page is one `.canvas` (1024×3789) scaled to the
viewport by JS in `index.html`. `styles.css` holds tokens + typography utilities
+ the responsive canvas; section CSS only adds position/size/colour.

Reference render: `assets/ref/reference.png` (1024×3789, top→bottom).

## Colours (CSS vars in `:root`)
| var | hex | usage |
|-----|-----|-------|
| `--cream` | #FFFCE6 | page bg; light text on dark |
| `--charcoal` | #564949 | booking band; dark icons; booking-button text |
| `--brown` | #7C4C2A | accent: buttons, badges, rule numbers, footer headings |
| `--black` | #000000 | body text |
| `--white` | #FFFFFF | white text; light button face |

## Typography utilities (apply the class, then position + colour only)
| class | font | Figma style |
|-------|------|-------------|
| `.ty-h2` | 500 32/50 | section headings (Розташування, Бронювання житла, Переваги:, Оснащення:, Правила проживання, Повний огляд…) |
| `.ty-body` | 500 14/20 | body |
| `.ty-body-c` | 500 14/20 center | centred body |
| `.ty-btn` | 500 16/20 | button label |
| `.ty-small` | 500 10/20 | footer, 360 label |
| `.ty-stepnum` | 700 32/35 | step number / 7 in badge |
| `.ty-hero` | 500 48/34 | hero heading base |
| `.ty-mission` | 500 24/28 | mission paragraph |
| `.ty-subhead` | 500 32/20 | "П'ять простих кроків…" |
| `.ty-quote` | italic 400 14/20 | "Коротко, прозоро…" |
| `.ty-rulenum` | 700 20/20 | rule numbers 01–05 |
| `.ty-lang` | 500 12/33 | language switcher |
| `.ty-price` | 700 40/20 | "4000" |
| `.ty-week` | 500 24/36 | "тиждень" |
| `.ty-bold` | 700 14/20 | bold body |
| `.ty-lead` | 500 24/20 | "Бронюйте в пару дотиків" |
| `.ty-card7` | 500 14/13 center | "7 однакових квартир" |
| `.ty-logo` | 500 82/1, -0.05em | smartstudios |
| `.ty-script` | Playball 400 170/50 | the big "7" |

Inline emphasis: `.em-serif` (Georgia italic 400 brown), `.em-32` (font-size 32), `.em-bold`.

## Assets — display size = CSS width/height (NOT the file's intrinsic px)
Icons in `assets/icons/`:
- `wifi.svg` 55×55 · `washer.svg` 59×59 · `fridge.svg` 70×70 · `ac.svg` 73×73 (all dark #564949 — use `<img>` directly on cream)
- `selfcheckin.svg` 52×52 · `calendar.svg` 67×67 · `telegram-feature.svg` 58×58 (dark, `<img>` on cream)
- `telegram.svg` 30×30 — **recolour via `.icon-tg`** (light on brown buttons, charcoal on cream button). Do NOT use `<img>`.
- `clock.svg` 10×10 (black) · `icon-360.svg` 66×66 (black) · `price-vector.svg` 12×12 (white) — `<img>`
- `union.svg` 890×146 (white bubble + brown border) · `arrow.svg` 81×12 (black line+head)

Images in `assets/img/`:
- `seven-badge.png` 75×54 (the "7" badge)
- `maps-79fd63.png` 445×259
- Gallery (7 photos, `object-fit:cover`): `room-kitchen.jpg` 1240×571 (big 438×287) · thumbs 141×89 → `room-stairs.jpg` · `room-bed.jpg` · `room-kitchen2.jpg` · `room-sofa.jpg` · `room-loft.jpg` · `room-bath.jpg`
- `tour-360-a-630e02.png` 438×480 · `tour-360-b-38cb5a.png` 439×480

Raster images use `object-fit: cover` (they fill their box).

## Sections (offset classes already in styles.css)
| id | class | left | top | w | h |
|----|-------|------|-----|---|---|
| hero | `.sec--hero` | 67 | 0 | 893 | 376 |
| main | `.sec--main` | 67 | 412 | 891 | 866 |
| mission | `.sec--mission` | 67 | 1385 | 890 | 146 |
| steps | `.sec--steps` | 67 | 1637 | 890 | 331 |
| icons | `.sec--icons` | 67 | 2015 | 810 | 490 |
| maps | `.sec--maps` | 67 | 2572 | 445 | 461 |
| rules | `.sec--rules` | 571 | 2572 | 347 | 459 |
| booking | `.sec--booking` | 0 | 3102 | 1024 | 420 |
| footer | `.sec--footer` | 67 | 3591 | 886 | 147 |
| fab | `.sec--fab` | 742 | 776 | 216 | 83 |

## Build conventions (every section agent must follow)
1. Output two files: `build/<id>.html` and `build/<id>.css`.
2. `build/<id>.html` = exactly one `<section class="sec sec--<id>">…</section>`.
   No `<html>/<head>/<body>`, no `<style>`, no `<script>`.
3. All children are absolutely positioned **relative to the section** (the
   section is `position:absolute`; its direct children get `position:absolute`
   from the base rule, so just set `left/top/width`). Coordinates given per
   section are already relative to the section's top-left.
4. `build/<id>.css` rules must all be scoped under `.sec--<id>` to avoid
   collisions. Reuse the typography utilities + colour vars from styles.css;
   only add position/size and colour overrides.
5. Use the exact Ukrainian text given — do not paraphrase. Preserve line breaks.
6. Links: buttons/links may point to `#` (or `https://t.me/` for Telegram).
7. Telegram icon: `<span class="icon-tg" style="...w/h..."></span>` with the
   parent's `color` set (white on brown buttons; var(--charcoal) on cream button).
