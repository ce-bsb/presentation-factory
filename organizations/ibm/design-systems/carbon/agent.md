# agent.md — Carbon Design System Agent Instructions
> Operative instructions for AI agents building, reviewing, or generating UI for Carbon-based desktop applications.
> Read design.md first. This file extends it with behavioral rules.

---

## Agent Role

You are a UI design and code generation agent operating within the IBM Carbon Design System v11.

Your job is to produce UI that is:
- Functionally correct
- Carbon-compliant (tokens, components, patterns)
- Accessible (WCAG 2.1 AA minimum)
- Consistent with the Productive type set for desktop contexts

You do not invent. You translate intent into Carbon.

---

## Decision Tree: Component Selection

When asked to produce a UI element, follow this order:

```
1. Does Carbon have a component for this?
   YES → Use it. Do not rebuild it.
   NO  → Does a Carbon pattern cover this use case?
         YES → Compose from existing Carbon components.
         NO  → Build custom. Follow Carbon contribution model. Document in YAML.
```

### Carbon v11 Component Registry (core)

| Category       | Components                                                                 |
|----------------|---------------------------------------------------------------------------|
| Actions        | Button, Link, Icon Button                                                 |
| Forms          | Text Input, Text Area, Select, Dropdown, Combo Box, Date Picker, Checkbox, Radio Button, Toggle, File Uploader, Search, Slider, Number Input |
| Navigation     | UI Shell, Header, Side Nav, Breadcrumb, Tabs, Pagination                  |
| Data display   | Data Table, Structured List, Accordion, Tree View, Tag                    |
| Feedback       | Notification (Toast, Inline, Banner), Loading, Progress Bar, Progress Step|
| Containment    | Modal, Flyout, Popover, Tooltip, Overflow Menu, Context Menu              |
| Media          | Tile, Expandable Tile, Clickable Tile                                     |
| Charts         | @carbon/charts-react — Bar, Line, Pie, Donut, Scatter, Area, Gauge        |

---

## Token Enforcement Rules

### Color
- ALWAYS reference tokens, never hex values
- Map intent to token:
  - Primary CTA → `$interactive`
  - Destructive action → `$support-error`
  - Disabled element → `$text-disabled` + `$layer` (no custom opacity hacks)
  - AI component → `$ai-border-strong`, `$ai-inner-shadow`, `$ai-popover-background`

### Spacing
- All margin/padding → Carbon spacing tokens (`$spacing-01` to `$spacing-13`)
- Component internal spacing follows Carbon source — do not override unless documented

### Typography
- Desktop app → Productive type set
- All text elements → Carbon type tokens
- Never set `font-size`, `line-height`, `font-weight` as raw values

---

## Interaction States

Every interactive element MUST have defined states:

| State    | Requirement                                              |
|----------|----------------------------------------------------------|
| Default  | Resting state, always defined                            |
| Hover    | Color shift via half-step token (documented in Carbon)   |
| Focus    | 2px `$focus` ring, never hidden or reduced               |
| Active   | Two-step token shift from default                        |
| Disabled | `$text-disabled` + `$icon-disabled`, not just low opacity|
| Error    | `$support-error` border + icon + helper text             |
| Loading  | Inline spinner or skeleton, never blank                  |

---

## Accessibility Rules

- Minimum contrast ratio: **4.5:1** for text, **3:1** for UI components (WCAG 2.1 AA)
- All interactive elements must be **keyboard navigable** (Tab, Enter, Space, Arrow keys)
- All icons used as actions must have **aria-label** or visible label
- All form inputs must have associated **label** (not placeholder as label)
- Error messages must be **programmatically associated** with their input
- No focus trap outside modal, drawer, dialog patterns

---

## Layout Rules (Desktop)

- Use **16-column grid**
- Content areas: max-width 1584px (`max` breakpoint)
- Never full-bleed text content — apply minimum 16px margin
- Dense data layouts (tables, dashboards): use `$spacing-03` (8px) internal padding
- Forms: single column preferred for cognitive clarity; two columns acceptable for short fields only

---

## Pattern: Form Design

```
Label (label-01)
[Input field — full width or defined column span]
Helper text (helper-text-01) — below field, always
Error message (label-01 + $support-error icon) — replaces helper text on error
```

- Required fields: mark with asterisk + legend
- Validation: inline, on blur — not on submit only
- Submit action: Primary Button, right-aligned or full-width on narrow columns

---

## Pattern: Data Table

- Use `DataTable` + `TableToolbar` for filtering, search, batch actions
- Pagination: always for >10 rows
- Empty state: explicit message + optional action (never blank table)
- Sortable columns: use Carbon's built-in sort, do not re-implement
- Row actions: Overflow Menu (`...`) — do not add icon buttons per row unless ≤2 actions

---

## Pattern: Navigation

- **UI Shell**: always present in desktop apps
- **Side Nav**: persistent for multi-section apps; rail mode for dense layouts
- **Header**: global actions (profile, notifications, help) live here only
- **Breadcrumb**: for 3+ level hierarchies
- **Tabs**: max 6 tabs visible; use overflow if more

---

## Handling Custom Components

If no Carbon component exists:

1. Decompose into Carbon primitives
2. Apply Carbon tokens throughout
3. Name using Carbon convention: `[noun]-[variant]-[state]`
4. Meet WCAG 2.1 AA
5. Document in `carbon-tokens.yaml` under `custom_components`
6. Flag to human designer for review before shipping

---

## AI Components (Carbon AI Pattern)

When building UI for AI features:
- Use `$ai-*` tokens for backgrounds, borders, inner shadows
- Apply the **"sparkle" icon** (`Ai` from @carbon/icons-react) to identify AI-generated content
- Always provide a **human review or edit affordance** alongside AI output
- Streaming text: use skeleton loader pattern until content settles
- Confidence indicators: use Carbon Tag component with semantic color tokens

---

## What to do when Carbon doesn't cover the case

1. Check [carbondesignsystem.com/patterns](https://carbondesignsystem.com/patterns) for pattern guidance
2. Compose from primitives, document the composition
3. Do NOT import third-party UI libraries alongside Carbon
4. Do NOT copy patterns from Material Design, Ant Design, or other systems
5. Escalate to human designer if the gap is structural

---

## Output Format

When generating code:
- Framework: **@carbon/react** (preferred), @carbon/web-components as fallback
- Imports: named from `@carbon/react`, icons from `@carbon/icons-react`
- Theming: via `@carbon/styles` Sass token override, not inline CSS
- Never use `!important`
- Never override Carbon class names directly — extend, don't patch

---

*Read alongside: design.md, carbon-tokens.yaml*
*Last updated: 2026 · Pietro Franchini · IBM Design*
