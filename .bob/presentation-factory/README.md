# Guia operacional do Presentation Factory

Para pedidos claros: **não leia nada — informe em 2–3 linhas o que será feito e implemente.**
Aprofunde a leitura somente quando a tarefa pedir registro, build, redesign amplo ou decisões de narrativa.

## ⚠️ Regra principal: onde criar apresentações

**Toda apresentação nova vai FORA da pasta `presentation-factory/`.**

- Derive o slug kebab-case do nome fornecido.
- Crie `<workspace>/<slug>/` (pasta irmã de `presentation-factory/`).
- Escreva os arquivos do deck lá (`index.html`, `style.css`, `script.js`, assets).
- A factory serve apenas como **referência** de estrutura e CSS — nunca como destino de escrita.

## Localizar a factory

1. `./presentation-factory/`
2. Raiz atual (se contiver `catalog/models.toml` e `pyproject.toml`)
3. Diretórios irmãos com esses arquivos

## Referências reais (leitura, nunca destino de escrita)

- Templates registrados → `clients/*/templates/` e `organizations/*/templates/`
- Assets → `clients/*/assets/` e `organizations/ibm/assets/`
- Design system → `organizations/ibm/design-systems/carbon/`
- Builder → `src/presentation_factory/`
- Testes → `tests/`

## Assets IBM

Logos e imagens IBM ficam em `organizations/ibm/assets/`. Copie-os para dentro
da pasta da apresentação (`<workspace>/<slug>/assets/`) e referencie com path relativo.

## Roteamento

| Necessidade | Ação |
|---|---|
| Criar nova apresentação | Crie `<workspace>/<slug>/` fora da factory |
| Consultar estrutura/CSS de referência | Leia templates em `clients/*/templates/` |
| Regras visuais IBM | `organizations/ibm/design-systems/carbon/` |
| Registrar na factory (avançado) | `presentations/<slug>/presentation.toml` existente como modelo |
| Assets compartilhados | `organizations/ibm/assets/assets.yaml` |
| Builder ou validação | `src/presentation_factory/` e `tests/` |

## Guardrails rápidos

- Para paths, slugs e onde criar os arquivos, siga `.bob/rules-presentation-factory/01-arquitetura.md`.
- Para regras visuais e acessibilidade, siga `.bob/rules-presentation-factory/02-conteudo-e-design.md`.
- Para estrutura do deck e atalhos obrigatórios, siga `.bob/rules-presentation-factory/03-html-css-javascript.md`.
