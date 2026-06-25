# Guia operacional do Presentation Factory

Para pedidos claros: leia o mínimo, informe em 2–3 linhas o que será feito, implemente.
Aprofunde a leitura somente quando a tarefa pedir registro, build, redesign amplo ou decisões de narrativa.

## Localizar a factory

1. `./presentation-factory/`
2. Raiz atual (se contiver `catalog/models.toml` e `pyproject.toml`)
3. Diretórios irmãos com esses arquivos

## Exemplos de arquitetura

- **Slide ativo** → `examples/active-slide/` (index.html, styles.css, deck.js)
- **Sidebar com scroll** → `examples/scroll-sidebar/`
- **Referência visual IBM** → `examples/ibm-complete-deck.html`

Leia o exemplo da arquitetura escolhida. Não copie conteúdo de negócio dos exemplos.

## Assets IBM

Logos e lockups IBM ficam em `assets/ibm/logos/`. Copie para `assets/` do deck final.

## Referências sob demanda

| Necessidade | Arquivo |
|---|---|
| Arquitetura do repositório | `references/repository-architecture.md` |
| Modelos de apresentação | `references/presentation-models.md` |
| Narrativa e conteúdo | `references/content-and-narrative.md` |
| Registrar entidade | `workflows/register-entity.md` |
| Registrar apresentação | `workflows/register-presentation.md` |
| Criar template | `workflows/create-template.md` |
| Gerar pacote | `workflows/build-package.md` |
| Revisar deck completo | `checklists/deck-quality.md` |

## Regras inegociáveis

- Não invente dados, logos ou assets.
- Sem paths absolutos no deck.
- Não edite `dist/` diretamente.
- Tema claro fixo, 18 px base, WCAG 2.1 AA.
- Todo deck: botão fullscreen (`F`) + botão loop (`L`).
