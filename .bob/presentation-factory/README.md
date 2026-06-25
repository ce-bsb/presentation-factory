# Guia operacional do Presentation Factory

Para pedidos claros: leia o mínimo, informe em 2–3 linhas o que será feito, implemente.
Aprofunde a leitura somente quando a tarefa pedir registro, build, redesign amplo ou decisões de narrativa.

## Localizar a factory

1. `./presentation-factory/`
2. Raiz atual (se contiver `catalog/models.toml` e `pyproject.toml`)
3. Diretórios irmãos com esses arquivos

## Referências reais

- Templates registrados → `clients/*/templates/` e `organizations/*/templates/`
- Assets → `clients/*/assets/` e `organizations/ibm/assets/`
- Design system → `organizations/ibm/design-systems/carbon/`
- Builder → `src/presentation_factory/`
- Testes → `tests/`

Use templates reais como referência. Não mantenha cópias paralelas em `.bob`.

## Assets IBM

Logos e imagens IBM ficam em `organizations/ibm/assets/`. Copie para o pacote
final via `[assets]` no `presentation.toml`.

## Roteamento

| Necessidade | Arquivo |
|---|---|
| Criar ou alterar deck | template HTML/CSS/JS real |
| Regras visuais IBM | `organizations/ibm/design-systems/carbon/` |
| Registrar apresentação | `presentations/<slug>/presentation.toml` existente como modelo |
| Assets compartilhados | `organizations/ibm/assets/assets.yaml` |
| Builder ou validação | `src/presentation_factory/` e `tests/` |

## Regras inegociáveis

- Não invente dados, logos ou assets.
- Sem paths absolutos no deck.
- Não edite `dist/` diretamente.
- Tema claro fixo, 18 px base, WCAG 2.1 AA.
- Todo deck: botão fullscreen (`F`) + botão loop (`L`).
