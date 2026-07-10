# IBM Brief

Template editorial da factory. Enquanto `ibm-template` é executivo e sóbrio,
**IBM Brief** tem identidade de **dossiê técnico**: lombada azul fina na margem
esquerda de cada slide, numeração
fantasma de página no canto, tabela de conteúdo com líder pontilhado, métricas em
formato de ledger (linha, não cartão) e um colofão de encerramento.

## Slides e layouts

| # | Classe CSS | Descrição |
|---|---|---|
| 01 | `slide--cover` | Capa com sidebar de identificação do documento (rótulo vertical, número fantasma, selo de status) + título display de duas linhas + rodapé em formato de ledger (3 células separadas por regras finas) |
| 02 | _(padrão)_ | Sumário/agenda — lista numerada com líder pontilhado; cada item é clicável e pula para o slide correspondente |
| 03 | _(padrão)_ | Ledger de métricas — linha horizontal de KPIs separados por regras verticais finas e variação descrita por texto acessível |
| 04 | _(padrão)_ | Two-column com marginália — coluna de corpo de texto + coluna estreita de notas numeradas, como anotações de margem |
| 05 | _(padrão)_ | Signal chain — sequência horizontal de etapas conectadas por uma linha-base com nós circulares |
| 06 | _(padrão)_ | Tabela comparativa — `<table>` semântica real (não cartões), cabeçalho mono, coluna de destaque em IBM Blue |
| 07 | _(padrão)_ | Statement/citação — marca de aspas oficial do Carbon aplicada via `mask-image`, texto grande, atribuição |
| 08 | `slide--closing` | Encerramento com display final + colofão (metadados de produção em grid + contatos com ícone) |

## Características técnicas

- **Chrome padrão da factory** — topbar, progress bar, deck de slide ativo, navbar
  e painel de índice off-canvas, seguindo a arquitetura documentada em
  `.bob/rules-presentation-factory/03-html-css-javascript.md`.
- **Transição de slide** — fade + leve deslocamento vertical (não wipe), reforçando
  a sensação de "virar página" de um documento.
- **Assets reais, nunca inventados** — `assets/ibm-logo.svg` é cópia física de
  `organizations/ibm/assets/img/logo-dark.svg`; os ícones em `assets/icons/` são
  arquivos oficiais de `@carbon/icons` (chevron--left, chevron--right,
  list--boxes, close, fit-to-screen, quotes, arrow--right, email), aplicados via
  `mask-image` para permitir recolorir mantendo a geometria original — nunca
  desenhados à mão.
- **Acessibilidade** — ARIA completo, skip link, foco visível WCAG 2.1 AA,
  `prefers-reduced-motion`, tabela comparativa com `<th scope="row">`.
- **Navegação** — teclado completo (setas, PageUp/Down, Home, End, teclas 1–8,
  `F` fullscreen, `Esc` índice), swipe touch, hash routing.
- **Print** — `@media print` expande todos os slides em A4 landscape, uma página
  por slide.

## Placeholders `{{CHAVE}}`

Todo conteúdo variável usa placeholders `{{CHAVE}}` em maiúsculas. Substitua cada
um pelo conteúdo real da apresentação antes de publicar.

### Topbar
| Placeholder | Uso |
|---|---|
| `{{TITULO}}` | Título do `<title>` |
| `{{CLIENTE}}` | Nome do cliente (se for IBM, remova `brand__sep` e `brand__client`) |
| `{{AREA_OU_SERVICO}}` | Label mono à direita do divisor |
| `{{DOC_REF}}` | Referência do documento (ex.: `PF-2026-014`) |

### Cover (slide 01)
| Placeholder | Uso |
|---|---|
| `{{CLASSIFICACAO}}` | Selo de status (ex.: `RASCUNHO`, `FINAL`, `CONFIDENCIAL`) |
| `{{EYEBROW_COVER}}` | Texto eyebrow acima do título |
| `{{TITULO_LINHA_1}}` / `{{TITULO_LINHA_2}}` | Título display (linha 2 fica em IBM Blue) |
| `{{LEDE_COVER}}` | Parágrafo de abertura |
| `{{LEDGER_x_LABEL/VALOR/SUB}}` | 3 células de metadados no rodapé |
| `{{DATA_COVER}}` | Data no sidebar |

### Regra de logo (topbar e colofão)
- **Cliente externo** → mantenha `brand__ibm × brand__client`.
- **Cliente IBM** → remova `brand__sep` e `brand__client`; mantenha só `brand__ibm`.
  Nunca renderize "IBM × IBM".

## Como usar

1. Derive o slug da apresentação (ex.: `proposta-cliente-2026`).
2. Crie `<workspace>/<slug>/` **fora** de `presentation-factory/`.
3. Copie `index.html` e a pasta `assets/` inteira para dentro dessa pasta.
4. Substitua todos os `{{PLACEHOLDER}}` pelo conteúdo real.
5. Abra `index.html` diretamente no navegador — não requer servidor nem build.

> ⚠️ Nunca crie a apresentação final dentro de `presentation-factory/`.
> Este template existe apenas como referência.
