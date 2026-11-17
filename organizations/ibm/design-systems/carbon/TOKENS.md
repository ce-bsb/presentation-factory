# Tokens — Carbon v11

Canonical design tokens for IBM-aligned presentations.
Values sourced from Carbon v11 (https://carbondesignsystem.com/elements/color/tokens).

Source of truth: [`tools/template-assets/base.css`](../../../../tools/template-assets/base.css) `:root`.
`tools/sync_template_assets.py` prunes every custom property a template does not reference, so a
generated `assets/styles.css` only declares the tokens it uses. A token listed here may therefore
be absent from a given template — that is intended.

## Color

### Blue

| Token | CSS var | Value | Use |
|---|---|---|---|
| `blue-10` | `--ibm-blue-t`  | `#edf5ff` | Subtle blue background, tag fills |
| `blue-20` | `--ibm-blue-20` | `#d0e2ff` | Border on blue surfaces, hover fills |
| `blue-50` | `--ibm-blue-l`  | `#4589ff` | Interactive on dark backgrounds, hover dots |
| `blue-60` | `--ibm-blue`    | `#0f62fe` | Primary action, link, CTA, progress |
| `blue-70` | `--ibm-blue-h`  | `#0043ce` | Hover/active state on blue-60 |
| `blue-80` | `--ibm-blue-d`  | `#002d9c` | Dark accent, cover panel gradient |

### Gray

| Token | CSS var | Value | Use |
|---|---|---|---|
| `gray-100` | `--gray-100` | `#161616` | Primary text, headings |
| `gray-70`  | `--gray-70`  | `#525252` | Body text, secondary text |
| `gray-60`  | `--gray-60`  | `#6f6f6f` | Inactive nav indicators (5.0:1 on white) |
| `gray-30`  | `--gray-30`  | `#c6c6c6` | Stronger borders |
| `gray-20`  | `--gray-20`  | `#e0e0e0` | Borders, dividers |
| `gray-10`  | `--gray-10`  | `#f4f4f4` | Page background, subtle surface |
| `white`    | `--white`    | `#ffffff` | Slide background, card surfaces |

### Accent and status

| Token | CSS var | Value | Use |
|---|---|---|---|
| `cyan-60`  | `--ibm-cyan` | `#0072c3` | Secondary accent (edge template); 5.0:1 with white icons |
| `teal-60`  | `--ibm-teal` | `#007d79` | Third accent (edge template); 5.0:1 with white icons |
| `green-60` | `--up`       | `#198038` | Success / positive delta (brief template) |
| `red-60`   | `--down`     | `#da1e28` | Danger / negative delta (brief template) |

### Semantic aliases (Carbon `--cds-*` naming)

| Alias | Maps to | Use |
|---|---|---|
| `--cds-background`     | `--white`    | Slide background |
| `--cds-text-primary`   | `--gray-100` | Primary text |
| `--cds-text-secondary` | `--gray-70`  | Secondary text |
| `--cds-focus`          | `--ibm-blue` | Focus ring |

Components reference the palette tokens directly for borders and surfaces
(`--gray-20`, `--gray-10`); only add an alias when a template actually reads it.

## Typography

| Role | Font | Weight | Minimum size |
|---|---|---|---|
| heading-01 | IBM Plex Sans | 100–300 | — |
| body-01 | IBM Plex Sans | 300–400 | 18px |
| label / code | IBM Plex Mono | 400–600 | 12px |

IBM Plex fonts — canonical Google Fonts URL for all templates:
```
https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600&family=IBM+Plex+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap
```

## Type scale

| CSS var | rem | px |
|---|---|---|
| `--text-12` | `.75rem` | 12px |
| `--text-14` | `.875rem` | 14px |
| `--text-18` | `1.125rem` | 18px |
| `--text-20` | `1.25rem` | 20px |
| `--text-24` | `1.5rem` | 24px |
| `--text-32` | `2rem` | 32px |
| `--text-42` | `2.625rem` | 42px |
| `--text-54` | `3.375rem` | 54px |
| `--text-76` | `4.75rem` | 76px |

## Spacing — 8px grid

| Token | Value |
|---|---|
| `--u-1` | 4px |
| `--u-2` | 8px |
| `--u-3` | 12px |
| `--u-4` | 16px |
| `--u-5` | 24px |
| `--u-6` | 32px |
| `--u-8` | 48px |
| `--u-9` | 64px |

## Shape and layout

| Token | Value | Use |
|---|---|---|
| `--hairline`  | `.0625rem` (1px) | Borders, grid lines |
| `--radius-sm` | `.5rem`  | Small cards |
| `--radius-md` | `1rem`   | Panels |
| `--topbar-h`  | `3rem` + safe area | Fixed top bar |
| `--footer-h`  | `4rem` + safe area | Fixed navigation bar |
| `--page-pad`  | `clamp(24px, 4vw, 64px)` | Slide padding |

## Motion

| Token | Value | Use |
|---|---|---|
| `--ease`              | `cubic-bezier(.2, 0, .38, .9)` | Standard productive motion |
| `--motion-expressive` | `cubic-bezier(0, 0, .3, 1)`    | Reveal / entrance animations |
| `--motion-enter`      | `640ms` | Content reveal duration |

All animation is disabled under `prefers-reduced-motion: reduce` and in print.

## Elevation

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 .125rem .5rem rgb(22 22 22 / 6%)` | Default card elevation |

## Data visualization (Carbon charts)

Source: https://carbondesignsystem.com/data-visualization/color-palettes
(`building-blocks/data-visualization/color-palettes`). None of these are `:root` tokens yet; if a
template needs a chart color, add it to `base.css` first and document it here.

Categorical palette — apply **in this order**, never reorder (the sequence maximizes contrast
between neighbours):

| # | Color | Hex |
|---|---|---|
| 1 | Purple 70 | `#6929c4` |
| 2 | Cyan 50 | `#1192e8` |
| 3 | Teal 70 | `#005d5d` |
| 4 | Magenta 70 | `#9f1853` |
| 5 | Red 50 | `#fa4d56` |
| 6 | Red 90 | `#570408` |
| 7 | Green 60 | `#198038` |
| 8 | Blue 80 | `#002d9c` |

(The full palette has 14 colors; see the source for 9-14.)

Single-series charts use one hue: `--ibm-blue` (Blue 60) is the sequential default. Sequential
palettes run Blue 10 → 100; the darkest value is the largest in light themes.

Alert palette: Red 60 `#da1e28` (danger), Orange 40 `#ff832b` (serious warning),
Yellow 30 `#f1c21b` (warning), Green 60 `#198038` (success).
