# Quickstart

## 1. Clone

```bash
git clone https://github.com/ce-bsb/presentation-factory.git
cd presentation-factory
```

## 2. Open in an AI Tool

Open this folder in agente de IA, Codex, Claude, Cursor or another agent.

Tell the agent:

```text
Read AGENTS.md and prompts/presentation-generation.md first.
Use this repository as the source of truth for the presentation.
Do not implement before proposing a narrative and implementation plan.
```

## 3. Provide the Request

```text
Objective:
Audience:
Organization:
Main messages:
Expected duration:
Reference materials:
Known gaps:
```

## 4. Optional Validation

```bash
make validate
make test
make build PRESENTATION=<slug> MODEL=primary
```

Open:

```text
dist/<slug>/primary/workspace/index.html
```
