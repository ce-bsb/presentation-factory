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
| Templates IBM ativos | `organizations/ibm/templates/ibm-template/`, `ibm-brief-template/`, `ibm-edge-template/`, `ibm-febraban-template/` |
| Saída gerada | `dist/` — nunca edite diretamente |

## Modo feira / evento presencial (ibm-febraban-template)

Use `ibm-febraban-template` quando o pedido for para responder a **uma pergunta de visitante em feira ou evento** (Febraban, CIAB, etc.).

| Slide | Layout | Função |
|---|---|---|
| 01 | `slide--cover` | A pergunta do visitante em display grande + contexto |
| 02 | Branco (dois painéis) | Visão geral do tema + 3 pontos-chave numerados |
| 03 | `slide--cases` (fundo azul) | 3 cases reais IBM com tag, título, corpo e resultado |
| 04 | `slide--closing` (split) | "Quer saber mais?" + QR code WhatsApp do especialista |

**Fluxo de criação:**
1. Pergunte ao operador: tema, nome/cargo do especialista e número do WhatsApp.
2. Gere `https://wa.me/55XXXXXXXXXXX` e instrua a criar `assets/qr.png` (400×400 px, fundo branco).
3. Crie `<workspace>/<slug>/index.html` a partir do template, substituindo todos os `{{PLACEHOLDER}}`.
4. Copie `assets/` do template para `<workspace>/<slug>/assets/`.
5. O deck tem exatamente 4 slides — não adicione nem remova.

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
