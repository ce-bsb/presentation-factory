# AGENTS.md

Use este repositório com Bob (modo **Presentation Factory**), agente de IA, Claude ou qualquer agente com acesso aos arquivos.

## Regra principal

Tarefa clara → leia o mínimo → implemente. Pergunte só se uma decisão ausente bloquear a execução.

## O que ler antes de agir

1. Este arquivo.
2. Os arquivos reais do deck afetado (template HTML/CSS/JS).
3. Se precisar de referência visual: `organizations/ibm/design-systems/carbon/AGENT_RULES.md`.

Não leia tudo de uma vez. Localize o alvo e implemente.

## Onde cada coisa vai

| Item | Local |
|---|---|
| Roteiro da apresentação | `clients/<org>/presentations/<slug>/brief.md` |
| Configuração da apresentação | `clients/<org>/presentations/<slug>/presentation.toml` |
| HTML do deck | `clients/<org>/templates/<template>/` ou `organizations/<org>/templates/<template>/` |
| Logos, CSS, imagens | `clients/<org>/assets/` ou `organizations/ibm/assets/` |
| Saída gerada | `dist/` — nunca edite diretamente |

## Regras inegociáveis

- Não invente logos, cores, fontes, componentes, dados ou assets.
- Sem caminhos absolutos (`/Users/`, `Desktop`, `file://`).
- Não ponha HTML executável dentro de `presentations/`.
- Não edite `dist/` como fonte.
