# Arquitetura da Presentation Factory

## Objetivo

A factory separa conteúdo, identidade visual, implementação reutilizável e
artefatos gerados. Essa separação permite reproduzir a mesma apresentação com
modelos diferentes sem misturar ownership ou editar arquivos de saída.

## Estrutura

```text
presentation-factory/
├── catalog/
│   └── models.toml
├── clients/
│   └── <cliente>/
│       ├── entity.toml
│       ├── assets/
│       ├── presentations/
│       ├── templates/
│       └── archive/
├── organizations/
│   └── <organização>/
│       ├── entity.toml
│       ├── assets/
│       ├── design-systems/
│       ├── presentations/
│       └── templates/
├── src/presentation_factory/
├── tests/
└── dist/
```

## Camadas

### Entidade

Define owner, nome, tipo, idioma, fonte e sistema de design. Toda apresentação
e todo asset precisam ter ownership identificável.

### Assets

Logos, CSS, imagens e SVGs permanecem com o owner que os mantém. Uma
apresentação pode consumir assets de vários owners por mapeamento explícito.

### Presentation

É leve e contém somente:

```text
presentations/<slug>/
├── brief.md
└── presentation.toml
```

Não coloque `index.html` completo nesta camada.

### Template

Contém a implementação HTML reutilizável:

```text
templates/<template>/
├── index.html
├── README.md
└── assets/
```

O template pode declarar paths que serão preenchidos pelo mapa de assets.

### Motor

`src/presentation_factory/` descobre configurações, valida paths, copia
template e assets e gera o pacote. Não coloque regra de cliente no motor.

### Dist

`dist/` contém artefatos gerados. Pode ser apagado e reconstruído. Toda correção
permanente deve acontecer em brief, manifesto, template, asset ou motor.

## Ownership

- Material específico do cliente pertence ao cliente.
- Material institucional IBM pertence à IBM.
- Asset compartilhado não deve ser duplicado.
- A associação entre owners é explícita em `[assets]`.
- Se o owner não estiver claro, confirme antes de consolidar.

## Regra de segurança de paths

Todos os paths de configuração são relativos à raiz da factory. O builder deve
rejeitar:

- `../` que escape da raiz;
- destino de asset fora do workspace;
- `/Users/...`;
- `file://...`;
- drive absoluto do Windows;
- referência a arquivo inexistente.
