# IBM Presentation Factory

Framework para criar apresentações HTML com IA, mantendo templates, assets e regras visuais em um repositório versionado.

## Como usar

```bash
git clone https://github.com/ce-bsb/presentation-factory.git
cd presentation-factory
```

Abra a pasta no **Bob** (modo Presentation Factory) ou em qualquer agente de IA com acesso aos arquivos locais.

## Usando com Bob

Abra o workspace raiz (`/IBM`) no Bob e ative o modo **🏭 Presentation Factory**.

**Para criar uma nova apresentação, diga algo como:**

> "Cria uma apresentação sobre \<tema\> para o cliente \<nome\>"

O Bob irá:

1. Derivar um slug kebab-case do nome (ex.: `proposta-acme-2025`).
2. **Criar a pasta da apresentação fora do `presentation-factory/`**, como irmã dele — ex.: `/IBM/proposta-acme-2025/`.
3. Copiar o CSS e o JS de referência da factory para dentro da pasta criada.
4. Gerar o `index.html` completo com todos os slides, navegação e acessibilidade.

> ⚠️ **Nunca peça ao Bob para criar dentro de `presentation-factory/templates/` ou `dist/`.** A factory é somente referência de estilo e estrutura.

### Logo na topbar

- **Cliente ≠ IBM:** a topbar exibe `[logo IBM] × [logo cliente]`.
- **Cliente = IBM** (apresentação interna): a topbar exibe **apenas um logo IBM**. O Bob nunca renderiza "IBM × IBM".

## Estrutura

```text
presentation-factory/        ← referência de templates, assets e regras
├── clients/<org>/
│   ├── assets/              ← logos, CSS, imagens de referência
│   ├── templates/           ← HTML/CSS do deck
│   └── presentations/<slug>/← brief.md + presentation.toml
├── organizations/ibm/       ← assets e templates IBM
├── catalog/models.toml      ← aliases de modelos de IA
├── src/presentation_factory/← código do builder
└── dist/                    ← saída gerada (não é fonte)

<nome-da-apresentacao>/      ← apresentação criada pelo Bob (fora da factory)
├── index.html
└── assets/
    ├── css/styles.css
    ├── js/deck.js
    └── img/
```

## Comandos (builder, uso avançado)

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
