# AGENTS.md

Start here when using this repository with Bob, Codex, Claude, Cursor or any
LLM coding agent.

## Role

You are creating or modifying HTML presentations using `presentation-factory`.
This repository is the source of truth for structure, design, assets and rules.

## Required Workflow

1. Read `README.md`.
2. Read `prompts/presentation-generation.md`.
3. Read the relevant design rules in `organizations/ibm/design-systems/carbon/`.
4. Inspect available templates and assets.
5. Explain which template you will use and why.
6. List the assets you will reuse.
7. Ask for missing information before implementing.
8. Only then create or modify files.

## Do Not

- Do not invent logos, colors, fonts, components, data or assets.
- Do not create new visual patterns unless the existing templates cannot serve.
- Do not use absolute paths.
- Do not treat `dist/` as source.
- Do not put executable deck HTML inside `presentations/`.

## Where Things Go

| Item | Location |
|---|---|
| Brief | `clients/<client>/presentations/<slug>/brief.md` |
| Manifest | `clients/<client>/presentations/<slug>/presentation.toml` |
| Template HTML | `clients/<client>/templates/<template>/` |
| Assets | `clients/<client>/assets/` or `organizations/ibm/assets/` |
| Prompt rules | `prompts/` |
| Builder code | `src/presentation_factory/` |
| Generated output | `dist/` |

## Before Implementing

Return:

1. narrative structure;
2. implementation plan;
3. selected template;
4. reused assets;
5. missing dependencies or questions.
