# Presentation Factory Mode — Bob

Este diretório configura o modo de projeto `Presentation Factory` no Bob.

## O que é carregado automaticamente

- `custom_modes.yaml` — definição do modo
- `rules-presentation-factory/*.md` — regras essenciais (em ordem alfabética)

## Índice sob demanda

`.bob/presentation-factory/README.md` é apenas um índice curto. O modo não
mantém cópias de templates, assets ou guias; ele usa os arquivos reais do
repositório.

```
.bob/
├── custom_modes.yaml
├── rules-presentation-factory/   ← carregadas automaticamente
├── presentation-factory/
│   └── README.md                 ← índice curto
└── SMOKE_TEST.md
```

Referências reais ficam em:

- `organizations/*/templates/`
- `organizations/ibm/assets/`
- `organizations/ibm/design-systems/carbon/`
