# Presentation Factory Mode

Este diretório configura o Custom Mode de projeto `Presentation Factory`.

## Arquivos carregados automaticamente

- `custom_modes.yaml`
- `rules-presentation-factory/*.md`, em ordem alfabética

## Biblioteca consultada sob demanda

Toda a documentação detalhada fica em `presentation-factory/`.

```text
.bob/
├── custom_modes.yaml
├── rules-presentation-factory/
├── presentation-factory/
│   ├── README.md
│   ├── references/
│   ├── assets/
│   ├── examples/
│   ├── workflows/
│   ├── checklists/
│   └── brief-examples/
└── SMOKE_TEST.md
```

O modo deve começar pelo índice em
`.bob/presentation-factory/README.md` e carregar apenas os arquivos relevantes
à tarefa atual.
