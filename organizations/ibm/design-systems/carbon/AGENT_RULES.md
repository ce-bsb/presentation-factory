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
- Always load the canonical Google Fonts URL from `TOKENS.md` — Sans + Mono only.
  No template uses IBM Plex Serif; do not load it.

## Colors

- Use only tokens defined in `TOKENS.md`. Never invent hex values.
- Blue-60 (`#0f62fe`) is the primary interactive color.
- Blue-70 (`#0043ce`) is the hover/active state for blue-60.
- Blue-50 (`#4589ff`, `--ibm-blue-l`) is for interactive elements on dark/blue backgrounds.
- Gray-20 (`#e0e0e0`) is for borders and dividers.
- Gray-10 (`#f4f4f4`) is the page/shell background.
- Need a color that is not in `TOKENS.md`? Add it to `tools/template-assets/base.css` `:root` and
  document it in `TOKENS.md` first. `tools/sync_template_assets.py` removes tokens a template
  does not reference, so never edit a generated `assets/styles.css` by hand.
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

## Icons, pictograms and data visualization

Source: Carbon Design System `building-blocks/foundations/{icons,pictograms}` and
`building-blocks/data-visualization`.

### Icons
- Copy an official `@carbon/icons` SVG. Inline icons use the artboard that matches their
  rendered size (16, 20, 24 or 32 px) with `viewBox="0 0 N N"` — never scale a 32 px icon
  down to 16/18 px, and never use another size (18 px is not an official size).
- 16 px and 20 px icons pair with 14 px and 16 px IBM Plex; use 24 or 32 px for larger text.
- Icons are one solid color and meet 4.5:1 against their background. Match the icon color to
  the adjacent text, and center-align icon and text (never baseline-align).
- Interactive icons need a touch target of at least 44 × 44 px, including on mobile.
- Never use an icon as the only carrier of meaning; keep a text label or `aria-label`.

### Pictograms
- Minimum rendered size is 48 px; keep proportions, never crop or recolor outside the palette.
- Containers are only a circle or a square, with padding of at least 1/4 of the grid.
- Pictograms illustrate; they are not UI icons and never logos or lockups.
- Dark backgrounds use gray/blue values 70-100 and light backgrounds 10-20; keep the 5-step
  contrast rule and never place a dark tone on a dark background.

### Data visualization
- Label values directly on the chart. Keep an accessible name (`aria-label`) on the figure,
  but do not make a chart image-only: bars carry visible values and category labels.
- Bar and area numerical axes always start at zero; truncating is acceptable only for lines.
- Titles describe the insight, not only the metric; use a legend only when direct labels do
  not fit.
- Color is never the only signal: pair status colors with an arrow, sign, texture or label
  (for example `metric__delta` carries an up/down arrow).
- Series colors follow the categorical order in `TOKENS.md`. One category = one hue.
- Status uses the alert palette (red, orange, yellow, green) only for status.

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
  Minimum: `var(--text-12)` (12px) for mono labels. Minimum body: `var(--text-18)`.
