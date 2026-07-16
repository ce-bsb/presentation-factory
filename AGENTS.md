# AGENTS.md

Use este repositório com Bob (modo **Presentation Factory**), agente de IA, Claude ou qualquer agente com acesso aos arquivos.

## Regra principal

Tarefa clara → leia o mínimo → implemente. Pergunte só se uma decisão ausente bloquear a execução.

## ⚠️ Onde criar apresentações novas

**Apresentações novas vão FORA desta pasta, como irmãs de `presentation-factory/`.**

- Derive o slug kebab-case do nome pedido (ex.: `febraban-ia-generativa-bancos`).
- Crie `<workspace>/<slug>/` — nunca dentro de `presentation-factory/`.
- Copie o template para a nova pasta, preservando `index.html` e `assets/`.
- Esta pasta é **somente leitura** para o agente ao criar decks.

## O que ler antes de agir

1. Este arquivo.
2. O `index.html` do template para entender os `{{PLACEHOLDER}}`.

Não leia tudo de uma vez. Localize o alvo e implemente.

## Onde cada coisa vai

| Item | Local |
|---|---|
| **Nova apresentação (deck HTML)** | **`<workspace>/<slug>/` — fora da factory** |
| Template ativo | `organizations/ibm/templates/ibm-febraban-template/` |
| Roteiro de referência | `organizations/ibm/presentations/febraban-ia-generativa-bancos/brief.md` |
| Logo IBM | `organizations/ibm/assets/img/logo-dark.svg` → copie para `<slug>/assets/ibm-logo.svg` |

## Template único: ibm-febraban-template

4 slides fixos para responder a **uma pergunta de visitante em feira ou evento** (Febraban, CIAB, etc.) em menos de 1 minuto.

| Slide | Layout | Função |
|---|---|---|
| 01 | `slide--cover` | Pergunta do visitante em display grande + contexto |
| 02 | Branco (dois painéis) | Visão geral do tema + 3 pontos-chave numerados |
| 03 | `slide--cases` (fundo azul) | 3 cases reais IBM com tag, título, corpo e resultado |
| 04 | `slide--closing` (split) | "Quer saber mais?" + QR code WhatsApp do especialista |

**Fluxo de criação:**
1. Pergunte ao operador: tema, nome/cargo do especialista e número do WhatsApp.
2. Gere `https://wa.me/55XXXXXXXXXXX` — instrua a salvar como `assets/qr.png` (400×400 px, fundo branco).
3. Crie `<workspace>/<slug>/index.html` substituindo todos os `{{PLACEHOLDER}}`.
4. Copie `organizations/ibm/templates/ibm-febraban-template/assets/` para `<workspace>/<slug>/assets/`.
5. O deck tem exatamente 4 slides — não adicione nem remova.

## Regras inegociáveis

- Não invente logos, cores, fontes ou dados.
- Logo IBM: copie `organizations/ibm/assets/img/logo-dark.svg` para `<slug>/assets/ibm-logo.svg`.
- Sem caminhos absolutos (`/Users/`, `Desktop`, `file://`).
- Não ponha HTML executável dentro de `presentations/`.
