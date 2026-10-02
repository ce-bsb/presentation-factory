# Agent Rules — Carbon v11

Mandatory visual rules for Presentation Factory agents.

## Theme

- Use **light theme only** (`color-scheme: light`) — no dark-mode toggle, no
  `prefers-color-scheme` switching presentation colors or logos.
- "Light theme" is about the overall shell, not a ban on bold IBM blue. A full
  Blue-60/Blue-80 gradient background on a cover, closing, or dedicated impact slide
  is expected and encouraged — it is official IBM brand usage, not a dark theme. Swap
  to `logo-light.svg` and light-on-dark text variants on those slides (see Layout).

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
- Every content slide splits into `<header class="slide-head">` (eyebrow + title,
  optionally the lead/subtitle) and `<div class="slide-body">` (everything else:
  metrics, cards, images, charts, tables). `slide-head` is `flex-shrink: 0` — it
  always sits at the same position, regardless of how tall its text is. `slide-body`
  is `flex: 1` with `align-content: center` (it's the 16-col grid) — its content
  centers in whatever vertical space remains, instead of sticking to the top. Only
  bespoke hero-style slides (cover, a dedicated closing CTA) are exempt — they center
  their whole composition, title included, by design.
- Every content slide pairs its text/data with a visual on the opposite side (real
  image, official Carbon pictogram, or an animated/decorative graphic already in the
  template) — never a slide that is 100% text or table with nothing visual beside it.
  Full details in `COMPONENTS.md`.
- Every slide carries, at minimum, either a visible background pattern (dot-grid,
  already the default on `.theme-light`/`.slide`) or a full IBM-blue background — never
  a perfectly flat, pattern-less white slide. Patterns and blue backgrounds are not
  mutually exclusive; blue slides keep their own pattern overlay (see the templates'
  `.slide--blue` / `.cover-bar` / `.executive-panel` / `.closing-box` / `.cover-id`).
- A slide is a fixed page, not a scroll area (`.slide { overflow: hidden }`). If
  content does not fit, split it into another slide — never let a slide scroll
  internally to fit more content.
- Soft rounded corners (`--radius-sm/md/lg/full`), layered colored shadows
  (`--shadow-*`) and the gradient/glass surfaces already in the templates are part of
  the visual language — keep them when copying a template, don't flatten them back to
  square Carbon-default corners.
- Logo marks (IBM logo, client logo) in the topbar render with no border, background
  box or frame around them — just the mark, centered, with spacing. Do not add a
  bordered/boxed container around a logo.

## Interaction

- Preserve keyboard navigation: Arrow keys, Space, PageUp/Down, Home, End, F (fullscreen).
- Preserve touch swipe navigation (horizontal).
- Keep the visible prev/next arrow buttons (`.nav-arrow--prev` / `.nav-arrow--next`) on
  screen — they are the discoverable way to move between slides; swipe and keyboard
  shortcuts alone are not enough for a first-time viewer with a mouse.
- Slide changes are a literal horizontal slide (a carousel), not a fade/scale. Every
  slide carries `style="--i: N"` inline (its position in the deck) and `.deck` carries
  `--n` (the current index, set by `deck.js`); `.slide`'s `transform: translateX(calc((var(--i) - var(--n)) * 100%))`
  does the rest. Never reintroduce opacity/translateY/scale/clip-path as the main slide
  transition — that reads as a fade, not "sliding to the side," which was explicitly
  rejected once already.
- Do not remove `@media (prefers-reduced-motion: reduce)`, and never neutralize it by
  forcing `.slide { transform: none }` — that would stack every slide on top of each
  other, since `transform` is what positions slides, not just what animates them.

## Assets

- Use existing tokens, templates and assets before creating anything new.
- Do not invent colors, logos, fonts, components or assets.
- SVG icons must have `aria-hidden="true"` and `focusable="false"`.
- Pictograms for the "visual on the other side" rule above come from
  `organizations/ibm/assets/img/pictograms/` (official `@carbon/pictograms`) — pick the
  one closest to the slide's topic, never draw a new one.

## Code quality

- Never use `!important` in CSS — fix specificity instead.
- All CSS variables must be defined in `:root` before use.
- Dead CSS (unused classes) must not be added.
- HTML must be semantic with correct `lang`, unique IDs, and `aria-label` on slides.
