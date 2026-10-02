# Tokens — Carbon v11

Canonical design tokens for IBM-aligned presentations.
Values sourced from Carbon v11 (https://carbondesignsystem.com/elements/color/tokens).

## Color

### Blue

| Token | Value | Use |
|---|---|---|
| `blue-10` | `#edf5ff` | Subtle blue background, tag fills |
| `blue-20` | `#d0e2ff` | Border on blue surfaces, hover fills |
| `blue-40` | `#78a9ff` | Chart fills, decorative accents |
| `blue-50` | `#4589ff` | Interactive on dark backgrounds |
| `blue-60` | `#0f62fe` | Primary action, link, CTA, progress |
| `blue-70` | `#0043ce` | Hover/active state on blue-60 |
| `blue-80` | `#002d9c` | Dark accent, pressed state |
| `blue-90` | `#001d6c` | Cover panel background grid |

### Gray

| Token | Value | Use |
|---|---|---|
| `gray-100` | `#161616` | Primary text, headings |
| `gray-90`  | `#262626` | Secondary heading, high-contrast text |
| `gray-80`  | `#393939` | Topbar meta text |
| `gray-70`  | `#525252` | Body text, secondary text |
| `gray-60`  | `#6f6f6f` | Placeholders, slide footer |
| `gray-50`  | `#8d8d8d` | Disabled text, muted labels |
| `gray-30`  | `#c6c6c6` | Muted borders (before-card) |
| `gray-20`  | `#e0e0e0` | Borders, dividers |
| `gray-10`  | `#f4f4f4` | Page background, subtle surface |
| `white`    | `#ffffff` | Slide background, card surfaces |

### Support

| Token | Value | Use |
|---|---|---|
| `green-40`  | `#42be65` | Success icon background |
| `orange-40` | `#ff832b` | Warning icon background |
| `cyan-30`   | `#82cfff` | Decorative chart accents |
| `cyan-50`   | `#1192e8` | Secondary blue blob / gradient |

## Typography

| Role | Font | Weight | Minimum size |
|---|---|---|---|
| heading-01 | IBM Plex Sans | 100–300 | — |
| body-01 | IBM Plex Sans | 300–400 | 18px |
| label / code | IBM Plex Mono | 400–600 | 11px |
| editorial serif | IBM Plex Serif italic | 300 | — |

IBM Plex fonts are loaded from Google Fonts:
```
family=IBM+Plex+Sans:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,300
family=IBM+Plex+Mono:wght@400;500
family=IBM+Plex+Serif:ital,wght@1,300
```

## Spacing — 8px grid

| Token | Value |
|---|---|
| `u-1` | 4px |
| `u-2` | 8px |
| `u-3` | 12px |
| `u-4` | 16px |
| `u-5` | 24px |
| `u-6` | 32px |
| `u-7` | 40px |
| `u-8` | 48px |
| `u-9` | 64px |

## Motion

| Token | Value | Use |
|---|---|---|
| `ease` | `cubic-bezier(0.2, 0, 0.38, 0.9)` | Standard productive motion |
| `ease-out` | `cubic-bezier(0, 0, 0.38, 0.9)` | Elements leaving the screen |
| `ease-spring` | `cubic-bezier(0.16, 1, 0.3, 1)` | Slide transitions, card hover |
