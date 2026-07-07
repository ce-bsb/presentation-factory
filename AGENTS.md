# AGENTS.md

Use este repositório com Bob (modo **Presentation Factory**), agente de IA, Claude ou qualquer agente com acesso aos arquivos.

## Regra principal

Tarefa clara → leia o mínimo → implemente. Pergunte só se uma decisão ausente bloquear a execução.

## ⚠️ Onde criar apresentações novas

**Apresentações novas vão FORA desta pasta, como irmãs de `presentation-factory/`.**

- Derive o slug kebab-case do nome pedido (ex.: `proposta-acme-2025`).
- Crie `<workspace>/<slug>/` — nunca dentro de `presentation-factory/`.
- Coloque `index.html`, `assets/css/styles.css`, `assets/js/deck.js` e assets lá.
- Esta pasta (`presentation-factory/`) é **somente leitura** para o agente ao criar decks: use-a como referência de CSS, JS e estrutura, nunca como destino de escrita.

## O que ler antes de agir

1. Este arquivo.
2. Os arquivos reais do deck afetado (template HTML/CSS/JS).
3. Se precisar de referência visual: `organizations/ibm/design-systems/carbon/AGENT_RULES.md`.

Não leia tudo de uma vez. Localize o alvo e implemente.

## Onde cada coisa vai

| Item | Local |
|---|---|
| **Nova apresentação (deck HTML)** | **`<workspace>/<slug>/` — fora da factory** |
| Roteiro da apresentação (uso avançado) | `clients/<org>/presentations/<slug>/brief.md` |
| Configuração da apresentação (uso avançado) | `clients/<org>/presentations/<slug>/presentation.toml` |
| CSS e JS de referência | `clients/<org>/assets/` ou `organizations/ibm/assets/` — apenas leitura |
| Saída gerada | `dist/` — nunca edite diretamente |

## Regras inegociáveis

- Não invente logos, cores, fontes, componentes, dados ou assets.
- Sem caminhos absolutos (`/Users/`, `Desktop`, `file://`).
- Não ponha HTML executável dentro de `presentations/`.
- Não edite `dist/` como fonte.
- Nunca crie o deck dentro de `presentation-factory/templates/` ou `presentation-factory/dist/`.
