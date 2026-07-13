<p align="center">
  <img src="assets/ce-bsb.svg" alt="BOB/presentation factory" width="100%">
</p>


# IBM Presentation Factory

Crie apresentações HTML bonitas com IA.

Gere apresentações HTML profissionais usando templates reutilizáveis, regras de design, assets versionados e IA.

[Quick Start](#quick-start) · [Documentação](https://github.com/ce-bsb/presentation-factory/wiki)

```text
clone → abra no Bob → peça → apresentação aparece → abra o index.html
```

## Quick Start

### 1. Instale o Git

**Windows:** https://git-scm.com/download/win

**macOS:** https://git-scm.com/download/mac

**Linux:** use o gerenciador de pacotes.

Verifique:

```bash
git --version
```

### 2. Clone

```bash
git clone https://github.com/ce-bsb/presentation-factory.git
```

### 3. Abra o Bob

Abra a pasta pai.

```text
IBM/
└── presentation-factory/
```

Abra **IBM/** como workspace.

O modo **Presentation Factory** aparecerá automaticamente.

### 4. Peça

> Crie uma apresentação sobre IA generativa para o Banco ABC.

O Bob gera:

```text
IBM/
├── presentation-factory/
└── abc-ia-generativa/
    ├── index.html
    └── assets/
```

Abra o **index.html** no navegador.

## Funcionalidades

- Gera apresentações HTML completas a partir de um prompt
- Usa templates reutilizáveis
- Segue regras de design embutidas
- Mantém assets versionados
- Cria layouts responsivos
- Funciona com IBM Bob
- Pode ser adaptado para outros assistentes de IA com acesso a arquivos locais

## Estrutura do Repositório

```text
presentation-factory/           ← templates, assets e regras
├── clients/<org>/
│   ├── assets/                 ← logos, CSS e imagens de referência
│   ├── templates/              ← index.html autocontido + assets
│   └── presentations/<slug>/   ← brief.md + presentation.toml
├── organizations/ibm/          ← assets e templates IBM
├── catalog/models.toml         ← aliases de modelos de IA
├── src/presentation_factory/   ← código do builder
└── dist/                       ← saída gerada, não é fonte

<nome-da-apresentacao>/         ← apresentação gerada fora da factory
├── index.html
└── assets/
```

## Avançado

O uso avançado do builder requer Python 3.11+ e `make`.

```bash
make list
make validate
make test
make build PRESENTATION=<slug> MODEL=primary
```

Abra o resultado gerado:

```text
dist/<slug>/primary/workspace/index.html
```

## Documentação

Documentação completa: https://github.com/ce-bsb/presentation-factory/wiki
