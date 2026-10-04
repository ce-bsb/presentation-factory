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
- Always load the canonical Google Fonts URL from `TOKENS.md` — Sans + Mono only.
  Load Serif separately only when `var(--font-serif)` is actively used in the CSS.

## Colors

- Use only tokens defined in `TOKENS.md`. Never invent hex values.
- Blue-60 (`#0f62fe`) is the primary interactive color.
- Blue-70 (`#0043ce`) is the hover/active state for blue-60.
- Blue-50 (`#4589ff`, `--ibm-blue-l`) is for interactive elements on dark/blue backgrounds.
- Gray-20 (`#e0e0e0`) is for borders and dividers.
- Gray-10 (`#f4f4f4`) is the page/shell background.
- Orange-40 (`#ff832b`, `--warn`) is for warning icons and highlights.
- Tint tokens (`--ibm-cyan-t`, `--ibm-purple-t`, `--up-t`, `--warn-t`) are defined only in
  `ibm-template` — do not use them in brief or edge templates unless you add them to `:root` first.
- Never use hardcoded `px` or `#hex` values directly in CSS — always use a defined token.

## Layout

- Keep slide layouts responsive, with **1280 × 720** as the primary review target.
- The 16-column grid is the base layout unit.
- Spacing follows the 8px grid (tokens `u-1` through `u-9`).
- Every content slide splits into `<header class="slide-head">` (eyebrow + title,
  optionally the lead/subtitle) and `<div class="slide-body">` (everything else:
  metrics, cards, images, charts, tables). `slide-head` is `flex-shrink: 0` — it
  always sits at the same position, regardless of how tall its text is. `slide-body`
  is `flex: 1` with `justify-content: center` (it's the 16-col grid) — its content
  centers in whatever vertical space remains, instead of sticking to the top. Only
  bespoke hero-style slides (cover, a dedicated closing CTA) are exempt — they center
  their whole composition, title included, by design.
- Every content slide pairs its text/data with a visual on the opposite side (real
  image, official Carbon pictogram, or an animated/decorative graphic already in the
  template) — never a slide that is 100% text or table with nothing visual beside it.
  Full details in `COMPONENTS.md`.
- Every slide carries, at minimum, either a visible background pattern (dot-grid,
  already the default on `.slide`) or a full IBM-blue background — never a perfectly
  flat, pattern-less white slide.
- Desktop presentation mode uses fixed pages (`.slide { overflow: hidden }`).
  On narrow/short viewports, zoom, or content overflow, the controller activates
  `reading-mode`: the active slide grows with content and the document scrolls
  naturally. Never create nested slide scrolling or shrink body text to fit.
  Prefer splitting long content into more slides for projected presentations.
- Soft rounded corners (`--radius-sm/md/lg/full`), layered colored shadows
  (`--shadow-*`) and the gradient/glass surfaces already in the templates are part of
  the visual language — keep them when copying a template, don't flatten them back to
  square Carbon-default corners.
- Logo marks (IBM logo, client logo) in the topbar render with no border, background
  box or frame around them — just the mark, centered, with spacing.

## Interaction

- Preserve keyboard navigation: Left/Right, Home, End, F (fullscreen). In fixed
  presentation mode also support Up/Down, Space and PageUp/Down. In reading mode,
  vertical keys scroll naturally. Never intercept native controls or editable fields.
- Preserve touch swipe navigation (horizontal).
- Keep the visible prev/next arrow buttons (`.nav-arrow--prev` / `.nav-arrow--next`) on
  screen — they are the discoverable way to move between slides.
- Slide changes are a literal horizontal slide (a carousel), not a fade/scale. Every
  slide carries `style="--i: N"` inline (its position in the deck) and `.deck` carries
  `--n` (the current index, set by `deck.js`); `.slide`'s
  `transform: translateX(calc((var(--i) - var(--n)) * 100%))` does the rest.
  Never reintroduce opacity/translateY/scale/clip-path as the main slide transition.
- Do not remove `@media (prefers-reduced-motion: reduce)`, and never neutralize it by
  forcing `.slide { transform: none }` — that would stack every slide on top of each
  other, since `transform` is what positions slides, not just what animates them.

## Assets

- Use existing tokens, templates and assets before creating anything new.
- Do not invent colors, logos, fonts, components or assets.
- SVG icons must have `aria-hidden="true"` and `focusable="false"`.
- Pictograms come from `organizations/ibm/assets/img/pictograms/` (official
  `@carbon/pictograms`) — pick the closest to the slide topic, never draw a new one.

## Code quality

- Never use `!important` in CSS — fix specificity instead.
  Exception: `@media (prefers-reduced-motion: reduce)` overrides and `@media print` resets
  may use `!important` to guarantee override behavior for safety.
- Design tokens belong in `:root`; per-slide runtime values (`--i`, `--n`) and
  per-chart data (`--value`) are defined on their owning elements.
- Dead CSS (unused classes or vars) must not be added.
- Never add a CSS variable to `:root` that is not used in that template's CSS.
- HTML must be semantic with correct `lang`, unique IDs, and `aria-label` on slides.
- Never use hardcoded pixel font sizes — use `var(--text-*)` tokens.
  Minimum: `var(--text-11)` (11px) for mono labels. Minimum body: `var(--text-18)`.
