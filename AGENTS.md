# AGENTS.md

Use este repositório com Bob (modo **Presentation Factory**), agente de IA, Claude ou qualquer agente com acesso aos arquivos.

## Regra principal

Tarefa clara → leia o mínimo → implemente. Pergunte só se uma decisão ausente bloquear a execução.

## ⚠️ Onde criar apresentações novas

**Apresentações novas vão FORA desta pasta, como irmãs de `presentation-factory/`.**

- Derive o slug kebab-case do nome pedido (ex.: `proposta-acme-2025`).
- Crie `<workspace>/<slug>/` — nunca dentro de `presentation-factory/`.
- Copie o template escolhido para a nova pasta, preservando `index.html` e `assets/`.
- Esta pasta é **somente leitura** para o agente ao criar decks.

## O que ler antes de agir

1. Este arquivo.
2. Os arquivos reais do deck afetado (template HTML/CSS/JS).
3. Se precisar de referência visual: `organizations/ibm/design-systems/carbon/AGENT_RULES.md`.

Não leia tudo de uma vez. Localize o alvo e implemente.

## Onde cada coisa vai

| Item | Local |
|---|---|
| **Nova apresentação (deck HTML)** | **`<workspace>/<slug>/` — fora da factory** |
| Roteiro da apresentação (uso avançado) | `organizations/ibm/presentations/<slug>/brief.md` |
| Configuração da apresentação (uso avançado) | `organizations/ibm/presentations/<slug>/presentation.toml` |
| Templates IBM ativos | `organizations/ibm/templates/ibm-template/`, `ibm-brief-template/`, `ibm-edge-template/` |
| Saída gerada | `dist/` — nunca edite diretamente |

## Regras inegociáveis

- Não invente logos, cores, fontes, componentes, dados ou assets.
- Logo IBM: copie `organizations/ibm/assets/img/logo-dark.svg` (fundo claro) ou
  `logo-light.svg` (fundo escuro) para `<workspace>/<slug>/assets/ibm-logo.svg`
  e use `<img src="assets/ibm-logo.svg" alt="IBM">`. Regras completas em
  `.bob/rules-presentation-factory/02-conteudo-e-design.md`.
- Ícones: somente `@carbon/icons` oficiais, copiados para o deck. Nunca gere com IA, SVG manual, CSS ou emoji.
- Sem caminhos absolutos (`/Users/`, `Desktop`, `file://`).
- Não ponha HTML executável dentro de `presentations/`.
- Não edite `dist/` como fonte.
