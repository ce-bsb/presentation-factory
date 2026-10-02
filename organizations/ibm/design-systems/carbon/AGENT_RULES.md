# Agent Rules — Carbon v11

Mandatory visual rules for Presentation Factory agents.

## Theme

- Use **light theme only** (`color-scheme: light`).
- Do not use `prefers-color-scheme` to change presentation colors or logos.

## Fonts

- Use **IBM Plex Sans** for UI and body text (minimum 18px).
- Use **IBM Plex Mono** for code, labels, kickers, and technical metadata.
- Use **IBM Plex Serif** (italic) only for editorial emphasis in hero headings.
- Always load all three font families from Google Fonts using the canonical URL in `TOKENS.md`.

## Colors

- Use only tokens defined in `TOKENS.md`. Never invent hex values.
- Blue-60 (`#0f62fe`) is the primary interactive color.
- Blue-70 (`#0043ce`) is the hover/active state for blue-60.
- Gray-20 (`#e0e0e0`) is for borders and dividers.
- Gray-10 (`#f4f4f4`) is the page/shell background.
- Orange-40 (`#ff832b`) replaces the old `accent-orange` for warning icons.

## Layout

- Keep slide layouts responsive, with **1280 × 720** as the primary review target.
- The 16-column grid is the base layout unit.
- Spacing follows the 8px grid (tokens `u-1` through `u-9`).

## Interaction

- Preserve keyboard navigation: Arrow keys, Space, PageUp/Down, Home, End, F (fullscreen).
- Preserve touch swipe navigation (horizontal).
- Do not remove `@media (prefers-reduced-motion: reduce)`.

## Assets

- Use existing tokens, templates and assets before creating anything new.
- Do not invent colors, logos, fonts, components or assets.
- SVG icons must have `aria-hidden="true"` and `focusable="false"`.

## Code quality

- Never use `!important` in CSS — fix specificity instead.
- All CSS variables must be defined in `:root` before use.
- Dead CSS (unused classes) must not be added.
- HTML must be semantic with correct `lang`, unique IDs, and `aria-label` on slides.
