# Guia operacional do Presentation Factory

Para pedidos claros: leia o mínimo, informe em 2–3 linhas o que será feito, implemente.
Aprofunde a leitura somente quando a tarefa pedir registro, build, redesign amplo ou decisões de narrativa.

## ⚠️ Regra principal: onde criar apresentações

**Toda apresentação nova vai FORA da pasta `presentation-factory/`.**

- Derive o slug kebab-case do nome fornecido.
- Crie `<workspace>/<slug>/` (pasta irmã de `presentation-factory/`).
- Copie para lá o `index.html` autocontido e a pasta `assets/` do template.
- A factory serve apenas como **referência** de estrutura e CSS — nunca como destino de escrita.

## Localizar a factory

1. `./presentation-factory/`
2. Raiz atual (se contiver `catalog/models.toml` e `pyproject.toml`)
3. Diretórios irmãos com esses arquivos

## Catálogo de templates IBM

Ao criar uma apresentação IBM nova, escolha somente entre estes templates:

| Template | Quando usar |
|---|---|
| `organizations/ibm/templates/ibm-template/` | Padrão default: apresentação executiva, sóbria e orientada a negócio |
| `organizations/ibm/templates/ibm-brief-template/` | Dossiê, relatório técnico, diagnóstico ou conteúdo editorial denso |
| `organizations/ibm/templates/ibm-edge-template/` | Narrativa visual bold, assimétrica ou de alto impacto |
| `organizations/ibm/templates/ibm-team-template/` | Apresentação de time: cards de pessoas (manager/peer/intern), processo Discovery → Co-create → Entrega |

Qualquer outro template IBM foi descontinuado. Nunca tente localizar, recriar ou usá-los como fallback.

## Referências reais (leitura, nunca destino de escrita)

- Templates → `organizations/ibm/templates/`
- Assets IBM → `organizations/ibm/assets/`
- Design system → `organizations/ibm/design-systems/carbon/`
- Builder → `src/presentation_factory/`
- Testes → `tests/`

## Roteamento rápido

| Necessidade | Ação |
|---|---|
| Criar nova apresentação | Crie `<workspace>/<slug>/` fora da factory |
| Apresentação executiva IBM | Use `organizations/ibm/templates/ibm-template/` |
| Dossiê ou relatório técnico | Use `organizations/ibm/templates/ibm-brief-template/` |
| Apresentação visual de alto impacto | Use `organizations/ibm/templates/ibm-edge-template/` |
| Regras visuais IBM | `organizations/ibm/design-systems/carbon/` |
| Registrar na factory (avançado) | `organizations/ibm/presentations/<slug>/presentation.toml` |
| Assets compartilhados | `organizations/ibm/assets/assets.yaml` |
| Builder ou validação | `src/presentation_factory/` e `tests/` |

## Guardrails rápidos

- Paths, slugs e onde criar → `.bob/rules-presentation-factory/01-arquitetura.md`
- Logo IBM, ícones e regras visuais → `.bob/rules-presentation-factory/02-conteudo-e-design.md`
- Estrutura do deck e atalhos → `.bob/rules-presentation-factory/03-html-css-javascript.md`
