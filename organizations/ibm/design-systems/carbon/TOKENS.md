# Tokens — Carbon v11

Canonical design tokens for IBM-aligned presentations.
Values sourced from Carbon v11 (https://carbondesignsystem.com/elements/color/tokens).

## Color

### Blue

| Token | CSS var | Value | Use |
|---|---|---|---|
| `blue-10` | `--ibm-blue-t`  | `#edf5ff` | Subtle blue background, tag fills |
| `blue-20` | `--ibm-blue-20` | `#d0e2ff` | Border on blue surfaces, hover fills |
| `blue-40` | `--ibm-blue-40` | `#78a9ff` | Chart fills, decorative accents |
| `blue-50` | `--ibm-blue-l`  | `#4589ff` | Interactive on dark backgrounds, fullscreen dots |
| `blue-60` | `--ibm-blue`    | `#0f62fe` | Primary action, link, CTA, progress |
| `blue-70` | `--ibm-blue-h`  | `#0043ce` | Hover/active state on blue-60 |
| `blue-80` | `--ibm-blue-d`  | `#002d9c` | Dark accent, cover panel gradient |

### Gray

| Token | CSS var | Value | Use |
|---|---|---|---|
| `gray-100` | `--gray-100` | `#161616` | Primary text, headings |
| `gray-90`  | `--gray-90`  | `#262626` | Secondary heading, high-contrast text |
| `gray-80`  | `--gray-80`  | `#393939` | Topbar meta text |
| `gray-70`  | `--gray-70`  | `#525252` | Body text, secondary text |
| `gray-60`  | `--gray-60`  | `#6f6f6f` | Placeholders, slide footer |
| `gray-50`  | `--gray-50`  | `#8d8d8d` | Disabled text, muted labels |
| `gray-30`  | `--gray-30`  | `#c6c6c6` | Muted borders |
| `gray-20`  | `--gray-20`  | `#e0e0e0` | Borders, dividers |
| `gray-10`  | `--gray-10`  | `#f4f4f4` | Page background, subtle surface |
| `white`    | `--white`    | `#ffffff` | Slide background, card surfaces |

### Accent

| Token | CSS var | Value | Use |
|---|---|---|---|
| `cyan-50`    | `--ibm-cyan`     | `#1192e8` | Secondary gradient, accent fill |
| `cyan-10`    | `--ibm-cyan-t`   | `#d0e8fb` | Cyan tint — grid accents (ibm-template) |
| `teal-60`    | `--ibm-teal`     | `#009d9a` | Third accent (timeline, stat borders) |
| `purple-60`  | `--ibm-purple`   | `#8a3ffc` | Fourth accent (stat, card borders) |
| `purple-10`  | `--ibm-purple-t` | `#f6f2ff` | Purple tint — card hover bg (ibm-template) |
| `green-60`   | `--up`           | `#198038` | Success status |
| `green-10`   | `--up-t`         | `#defbe6` | Success tint (ibm-template) |
| `red-60`     | `--down`         | `#da1e28` | Danger / error status |
| `orange-40`  | `--warn`         | `#ff832b` | Warning icon background |
| `orange-10`  | `--warn-t`       | `#fff1e7` | Warning tint (ibm-template) |

> Note: tint tokens (`--ibm-cyan-t`, `--ibm-purple-t`, `--up-t`, `--warn-t`) are defined only in
> `ibm-template` where they are actively used. Do not add them to brief or edge templates unless needed.

### Semantic aliases (all templates)

| Alias | Maps to | Use |
|---|---|---|
| `--bg`          | `--white`    | Slide background |
| `--bg-2`        | `--gray-10`  | Subtle surface |
| `--ink`         | `--gray-100` | Primary text |
| `--ink-muted`   | `--gray-70`  | Secondary text |
| `--ink-faint`   | `--gray-50`  | Tertiary / label text |
| `--line`        | `--gray-20`  | Borders, dividers |
| `--line-strong` | `--gray-30`  | Stronger borders |
| `--line-soft`   | `rgba(22,22,22,.07)` | Very subtle surface divider |

## Typography

| Role | Font | Weight | Minimum size |
|---|---|---|---|
| heading-01 | IBM Plex Sans | 100–300 | — |
| body-01 | IBM Plex Sans | 300–400 | 18px |
| label / code | IBM Plex Mono | 400–600 | 11px |
| editorial serif | IBM Plex Serif italic | 300 | — |

IBM Plex fonts — canonical Google Fonts URL for all templates:
```
https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600&family=IBM+Plex+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap
```

> Note: IBM Plex Serif is only loaded when the template actively uses `var(--font-serif)`.
> The brief and edge templates do not use Serif — do not load it unnecessarily.

## Type scale

| CSS var | rem | px |
|---|---|---|
| `--text-10` | `.625rem` | 10px |
| `--text-11` | `.6875rem` | 11px |
| `--text-12` | `.75rem` | 12px |
| `--text-14` | `.875rem` | 14px |
| `--text-16` | `1rem` | 16px |
| `--text-18` | `1.125rem` | 18px |
| `--text-20` | `1.25rem` | 20px |
| `--text-24` | `1.5rem` | 24px |
| `--text-32` | `2rem` | 32px |
| `--text-42` | `2.625rem` | 42px |
| `--text-54` | `3.375rem` | 54px |
| `--text-76` | `4.75rem` | 76px |

> `--text-10` is defined only in `ibm-template`. Do not use in brief or edge templates.

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

## Elevation

| Token | Value | Use |
|---|---|---|
| `--shadow-xs`   | `0 1px 2px rgba(22,22,22,.05)` | Minimal lift (ibm-template only) |
| `--shadow-sm`   | `0 1px 2px … + 0 4px 12px blue` | Default card elevation |
| `--shadow-md`   | `0 2px 6px … + 0 16–36px blue` | Hover card elevation |
| `--shadow-lg`   | `0 8px 16px … + 0 32–72px blue` | Dramatic lift (ibm-template, edge-template) |
| `--shadow-glow` | `0 0 0 1px blue + 0 24px 64px blue` | Featured panel glow (ibm-template only) |
