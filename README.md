# IBM Presentation Factory

Framework leve para gerar e revisar apresentações HTML com IA, mantendo
templates, assets, prompts e regras visuais em uma única fonte versionada.

Clone o repositório, abra a pasta em agente de IA, Codex, Claude, Cursor ou outro agente
e peça para a IA usar os arquivos daqui como requisitos.

```mermaid
flowchart LR
    A["Clonar"] --> B["Abrir na IA"]
    B --> C["IA lê AGENTS, prompts, templates e assets"]
    C --> D["Usuário passa objetivo e materiais"]
    D --> E["IA propõe plano"]
    E --> F["IA gera ou modifica o deck"]
    F --> G["Usuário revisa"]
```

## Como Usar

```bash
git clone https://github.com/ce-bsb/presentation-factory.git
cd presentation-factory
```

Abra a pasta em agente de IA, Codex, Claude, Cursor ou outro agente.

Leia primeiro:

- [AGENTS.md](AGENTS.md)
- [QUICKSTART.md](QUICKSTART.md)
- [prompts/presentation-generation.md](prompts/presentation-generation.md)

Se a IA não acessa links externos, clone a wiki ao lado do repositório:

```bash
git clone https://github.com/ce-bsb/presentation-factory.wiki.git
```

## Estrutura

```text
presentation-factory/
├── README.md
├── prompts/                 # prompts-base para IA
├── clients/                 # organizações, assets, templates e apresentações
├── organizations/           # IBM, design systems e materiais corporativos
├── catalog/                 # aliases de modelos
├── src/presentation_factory/ # validação e builder
├── tests/
└── dist/                    # saída gerada, não é fonte
```

## Onde Colocar Cada Coisa

| Item | Local |
|---|---|
| Conteúdo da apresentação | `clients/<organização>/presentations/<slug>/brief.md` |
| Manifesto | `clients/<organização>/presentations/<slug>/presentation.toml` |
| Template HTML | `clients/<organização>/templates/<template>/` |
| Logos, CSS e imagens | `clients/<organização>/assets/` ou `organizations/ibm/assets/` |
| Prompt-base | `prompts/` |
| Código do builder | `src/presentation_factory/` |
| Saída gerada | `dist/` |

## Regras Essenciais

- A IA deve analisar antes de implementar.
- Não inventar logos, cores, fontes, componentes, dados ou assets.
- Usar caminhos relativos.
- Reutilizar templates e assets existentes.
- Manter tema claro e texto geral com pelo menos `18px`.
- Não tratar `dist/` como fonte.

## Validação Opcional

Requer Python 3.11+ e `make`.

```bash
make list
make validate
make test
make build PRESENTATION=<slug-da-apresentacao> MODEL=primary
```

Abra:

```text
dist/<slug-da-apresentacao>/primary/workspace/index.html
```

## Wiki

Documentação completa:

https://github.com/ce-bsb/presentation-factory/wiki
