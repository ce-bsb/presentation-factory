# Presentation Factory Mode — Bob

Este diretório configura o modo de projeto `Presentation Factory` no Bob.

## O que é carregado automaticamente

- `custom_modes.yaml` — definição do modo
- `rules-presentation-factory/*.md` — regras essenciais (em ordem alfabética)

## Biblioteca sob demanda

Documentação detalhada fica em `.bob/presentation-factory/`:

```
.bob/
├── custom_modes.yaml
├── rules-presentation-factory/   ← carregadas automaticamente
├── presentation-factory/
│   ├── README.md                 ← lido sempre
│   ├── examples/                 ← active-slide/ e scroll-sidebar/
│   ├── references/               ← guias sob demanda
│   ├── workflows/                ← fluxos registro/build
│   ├── checklists/               ← qualidade e governança
│   └── assets/                   ← logos IBM e assets compartilhados
└── SMOKE_TEST.md
```
