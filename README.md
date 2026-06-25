# IBM Presentation Factory

Framework para criar apresentações HTML com IA, mantendo templates, assets e regras visuais em um repositório versionado.

## Como usar

```bash
git clone https://github.com/ce-bsb/presentation-factory.git
cd presentation-factory
```

Abra a pasta no **Bob** (modo Presentation Factory) ou em qualquer agente de IA com acesso aos arquivos locais.

## Estrutura

```text
presentation-factory/
├── clients/<org>/            ← apresentações de clientes
│   ├── assets/               ← logos, CSS, imagens
│   ├── templates/            ← HTML/CSS do deck + template.toml opcional
│   └── presentations/<slug>/ ← brief.md + presentation.toml
├── organizations/ibm/        ← assets e templates IBM
├── catalog/models.toml       ← aliases de modelos de IA
├── src/presentation_factory/ ← código do builder
└── dist/                     ← saída gerada (não é fonte)
```

## Comandos

Requer Python 3.11+ e `make`.

```bash
make list
make validate
make test
make build PRESENTATION=<slug> MODEL=primary
```

Abra o resultado em `dist/<slug>/primary/workspace/index.html`.

## Contrato de assets

- `template.toml` declara assets necessários ao template, como runtime JS.
- `presentation.toml` declara assets específicos da apresentação, como logos,
  imagens e estilos de marca.
- O builder copia ambos para `workspace/`; assets da apresentação podem
  sobrescrever assets do template quando o destino é o mesmo.

## Documentação completa

https://github.com/ce-bsb/presentation-factory/wiki
