# IBM Presentation Factory

Repositório para montar pacotes reproduzíveis de apresentações HTML e servir
como base de referência para Bob ou qualquer IA gerar decks dentro dos padrões
do IBM Client Engineering.

O objetivo é concentrar em um só lugar:

- como clonar, validar e usar o repositório;
- como estruturar apresentações, templates, assets e briefs;
- quais cores, fontes, tamanhos, espaçamentos e regras responsivas seguir;
- quando reutilizar um template existente e quando criar outro;
- como pedir para uma IA usar esta pasta como base antes de gerar ou modificar
  uma apresentação.

A arquitetura organiza conteúdo por dono: cada cliente mantém suas
apresentações e seus assets; materiais corporativos ficam na organização
correspondente.

## Primeiro uso

### 1. Instale os pré-requisitos

- Git.
- Python 3.11 ou superior.
- Acesso ao repositório `ce-bsb/presentation-factory` no GitHub.

Confira as versões:

```bash
git --version
python3 --version
make --version
```

### 2. Clone o repositório

```bash
git clone https://github.com/ce-bsb/presentation-factory.git
cd presentation-factory
```

Se preferir usar SSH:

```bash
git clone git@github.com:ce-bsb/presentation-factory.git
cd presentation-factory
```

Se quiser contribuir em uma cópia própria antes de abrir pull request, faça um
fork no GitHub e clone a URL do seu fork.

### 3. Valide a instalação local

```bash
make list
make validate
make test
```

`make list` mostra as apresentações disponíveis. `make validate` confere
manifestos, templates, modelos e assets. `make test` executa a suíte de testes.

### 4. Gere uma apresentação

```bash
make build PRESENTATION=<slug-da-apresentacao> MODEL=primary
```

O pacote gerado fica em:

```text
dist/<slug-da-apresentacao>/primary/
├── brief.md
├── manifest.json
├── prompt.md
└── workspace/
```

### 5. Abra o resultado

Abra no navegador:

```text
dist/<slug-da-apresentacao>/primary/workspace/index.html
```

Esse `workspace` é autocontido: ele reúne o template, o roteiro, os assets e o
prompt preparados para uso por uma pessoa, runner ou agente.

### 6. Use com Bob ou outra IA

Depois de clonar, peça para a IA usar a pasta do repositório como base de
conhecimento e geração. Exemplo:

```text
Use esta pasta presentation-factory como referência. Leia a wiki, o README, os
templates, os assets e os padrões visuais. Gere ou modifique a apresentação
seguindo os padrões do repositório, sem inventar cores, fontes, tamanhos ou
estruturas fora do que está documentado.
```

Para uma apresentação nova, descreva também público, objetivo, mensagens
principais, cliente, duração esperada e materiais de referência.

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
    ├── templates/
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
- Toda pasta em `presentations/` deve conter `brief.md` e
  `presentation.toml`; apresentações HTML completas pertencem à camada
  `templates/`.

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
modelos inexistentes, assets ausentes, caminhos externos e pastas de
apresentação sem manifesto.

## Comandos

Requer Python 3.11 ou superior.

```bash
make list
make validate
make test
make build PRESENTATION=<slug-da-apresentacao> MODEL=primary
```

Uso direto:

```bash
PYTHONPATH=src python3 -m presentation_factory build \
  <slug-da-apresentacao> \
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
