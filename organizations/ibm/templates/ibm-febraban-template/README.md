# Template: IBM Febraban

Template de deck rápido para **feiras e eventos presenciais** (Febraban, CIAB, e similares).
Projetado para entregar uma resposta visual completa em **menos de 1 minuto**: 4 slides,
navegação por toque, fullscreen nativo.

## Slides e layouts

| # | Classe CSS | Descrição |
|---|---|---|
| 01 | `slide--cover` | **Capa — Pergunta** — barra lateral IBM Blue, pergunta do visitante em display grande, contexto em destaque |
| 02 | _(branco)_ | **Visão geral do tema** — dois painéis lado a lado: contexto à esquerda + 3 pontos-chave numerados à direita |
| 03 | `slide--cases` | **Cases IBM** — fundo azul com 3 cards de referência real (tag, título, corpo, resultado) |
| 04 | `slide--closing` | **Encerramento + QR** — coluna esquerda com CTA "Quer saber mais?", coluna direita IBM Blue com QR code do WhatsApp |

## Placeholders `{{CHAVE}}`

### Topbar
| Placeholder | Uso |
|---|---|
| `{{TITULO}}` | Título do `<title>` |
| `{{EVENTO}}` | Nome do evento (ex.: `Febraban Tech 2025`) |

### Slide 01 — Cover Pergunta
| Placeholder | Uso |
|---|---|
| `{{LABEL_BARRA}}` | Texto vertical na barra lateral azul (ex.: `IBM · IA para Bancos`) |
| `{{TAG_TEMA}}` | Badge curto na barra (ex.: `IA Generativa`) |
| `{{EYEBROW_COVER}}` | Label acima da pergunta (ex.: `Sua pergunta`) |
| `{{PERGUNTA_LINHA_1}}` | Primeira linha da pergunta do visitante |
| `{{PERGUNTA_LINHA_2}}` | Segunda linha — exibida em IBM Blue bold |
| `{{CONTEXTO_COVER}}` | Frase curta de contexto (borda azul à esquerda) |

### Slide 02 — Visão Geral
| Placeholder | Uso |
|---|---|
| `{{EYEBROW_S2}}` | Label do eyebrow (ex.: `O que é`) |
| `{{TITULO_S2}}` | Título do slide |
| `{{PANEL_A_LABEL}}` | Label do painel esquerdo (ex.: `Contexto`) |
| `{{PANEL_A_TEXTO}}` | Parágrafo de contexto (até ~300 chars) |
| `{{PANEL_B_LABEL}}` | Label do painel direito (ex.: `Pontos-chave`) |
| `{{PONTO_1_TITULO}}` … `{{PONTO_3_TITULO}}` | Título de cada ponto |
| `{{PONTO_1_DESC}}` … `{{PONTO_3_DESC}}` | Descrição curta de cada ponto |

### Slide 03 — Cases IBM
| Placeholder | Uso |
|---|---|
| `{{EYEBROW_S3}}` | Label do eyebrow (ex.: `IBM em ação`) |
| `{{TITULO_S3}}` | Título do slide |
| `{{SUBTITULO_S3}}` | Subtítulo opcional |
| `{{CASE_n_TAG}}` | Setor/categoria do case (ex.: `Banco · Crédito`) |
| `{{CASE_n_TITULO}}` | Nome do projeto ou cliente |
| `{{CASE_n_CORPO}}` | Descrição do case (até ~160 chars) |
| `{{CASE_n_RESULTADO}}` | Resultado ou métrica de impacto (ex.: `↓ 40% fraudes`) |

### Slide 04 — Closing + QR
| Placeholder | Uso |
|---|---|
| `{{EYEBROW_S4}}` | Label do eyebrow (ex.: `Próximos passos`) |
| `{{CLOSING_LINHA_1}}` | Primeira linha do display (ex.: `Quer saber`) |
| `{{CLOSING_LINHA_2}}` | Segunda linha — IBM Blue (ex.: `mais?`) |
| `{{CLOSING_SUB}}` | Frase de chamada à ação |
| `{{ESPECIALISTA_LABEL}}` | Label acima do nome (ex.: `Fale com`) |
| `{{ESPECIALISTA_NOME}}` | Nome completo do especialista IBM |
| `{{ESPECIALISTA_CARGO}}` | Cargo do especialista |
| `{{QR_LABEL}}` | Label acima do QR (ex.: `WhatsApp direto`) |
| `{{ESPECIALISTA_WHATSAPP}}` | Número formatado (ex.: `+55 11 9 9999-0000`) |

## QR Code (WhatsApp)

Coloque o arquivo `assets/qr.png` na **pasta da apresentação** (não na pasta do template).
O tamanho ideal é **400×400 px**, fundo branco, sem margens excessivas.

Se o arquivo não existir, um placeholder SVG é exibido automaticamente.

Para gerar o QR do WhatsApp:
```
https://wa.me/5511999990000
```
Use qualquer gerador de QR (ex.: qr-code-generator.com) e salve como `qr.png`.

## Como usar

1. Derive o slug (ex.: `febraban-ia-generativa-bancos`)
2. Crie `<workspace>/<slug>/` **fora** de `presentation-factory/`
3. Copie este `index.html` para `<workspace>/<slug>/index.html`
4. Copie a pasta `assets/` para `<workspace>/<slug>/assets/`
5. Coloque `assets/qr.png` com o QR do WhatsApp do especialista
6. Substitua todos os `{{PLACEHOLDER}}` pelo conteúdo real
7. Abra `index.html` no browser, pressione `F` para fullscreen

## Características técnicas

- **4 slides** — navegação por teclado (1–4, setas), swipe touch, fullscreen (`F`)
- **Autocontido** — CSS e JS embutidos; apenas `assets/` externos
- **QR fallback** — SVG inline automático se `qr.png` não existir
- **Print** — `@media print` expande todos os slides em A4 landscape
- **Acessibilidade** — ARIA completo, WCAG 2.1 AA, `prefers-reduced-motion`

> ⚠️ Nunca crie a apresentação final dentro de `presentation-factory/`.
> Este template existe apenas como referência.
