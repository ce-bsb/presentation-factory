# IBM Presentation Factory

Repositório para montar pacotes reproduzíveis de apresentações HTML. A
arquitetura organiza conteúdo por dono: cada cliente mantém suas apresentações
e seus assets; materiais corporativos ficam na organização correspondente.

## Estrutura

```text
clients/
├── banco-do-brasil/
│   ├── assets/
│   ├── archive/
│   ├── presentations/
│   ├── templates/
│   └── entity.toml
└── caixa/
    ├── assets/
    └── entity.toml
organizations/
└── ibm/
    ├── assets/
    ├── design-systems/
    ├── presentations/
    └── entity.toml
catalog/models.toml
src/presentation_factory/
tests/
dist/
```

## Regra de ownership

- Conteúdo do Banco do Brasil fica em `clients/banco-do-brasil/`.
- Conteúdo da CAIXA fica em `clients/caixa/`.
- Logos, design systems e apresentações internas IBM ficam em
  `organizations/ibm/`.
- `src/` contém apenas o motor genérico.
- `dist/` contém pacotes gerados e não é versionado.

Uma apresentação pode usar assets de outra organização sem duplicá-los no
repositório. A associação é explícita:

```toml
[assets]
"assets/brand/logo.svg" = "clients/banco-do-brasil/assets/img/logo.svg"
"assets/partner/logo-dark.svg" = "organizations/ibm/assets/img/logo-dark.svg"
```

O builder copia esses arquivos para o workspace gerado. A origem continua na
pasta de seu proprietário.

## Arquivos de apresentação

Cada apresentação fica dentro do seu dono:

```text
clients/<cliente>/presentations/<slug>/
├── brief.md
└── presentation.toml
```

Exemplo:

```toml
name = "Nome da apresentação"
template = "clients/<cliente>/templates/<template>"
brief = "clients/<cliente>/presentations/<slug>/brief.md"
default_model = "primary"

[assets]
"assets/brand/styles.css" = "clients/<cliente>/assets/css/styles.css"
"assets/brand/logo.svg" = "clients/<cliente>/assets/img/logo.svg"
```

Os slugs devem ser únicos no repositório. O validador rejeita slugs ambíguos,
modelos inexistentes, assets ausentes e caminhos externos.

## Comandos

Requer Python 3.11 ou superior.

```bash
make list
make validate
make test
make build PRESENTATION=bb-dirco-workshop MODEL=primary
```

Uso direto:

```bash
PYTHONPATH=src python3 -m presentation_factory build \
  bb-dirco-workshop \
  --model alternate
```

Saída:

```text
dist/<apresentação>/<modelo>/
├── brief.md
├── manifest.json
├── prompt.md
└── workspace/
```

## Modelos

Os aliases ficam em `catalog/models.toml`. IDs e credenciais reais permanecem
em variáveis de ambiente ou secrets do runner e não são gravados no manifesto.

## GitHub Actions

O workflow executa validação e testes em pushes e pull requests. Na execução
manual, recebe apresentação e modelo e publica o pacote como artifact.
