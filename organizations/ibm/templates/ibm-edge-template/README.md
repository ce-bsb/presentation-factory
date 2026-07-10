# Template: IBM Edge

Template de deck HTML com 8 layouts distintos, CSS e JavaScript incorporados.
Logos IBM e ícones Carbon oficiais ficam em `assets/`.

## Slides e layouts

| # | Classe CSS | Descrição |
|---|---|---|
| 01 | `slide--cover` | Cover assimétrico — barra lateral IBM Blue com grade de pontos, número decorativo e tags; coluna direita com display gigante e rodapé de metadados |
| 02 | _(branco)_ | Stat grid 4 colunas — métricas com valor grande, label mono, descrição e número decorativo de fundo |
| 03 | _(branco)_ | Two-col panels — dois painéis lado a lado; painel accent com borda azul esquerda e fundo Gray-10 |
| 04 | _(branco)_ | Timeline 3 colunas — etapas numeradas com marcador colorido no topo e animação de entrada escalonada |
| 05 | `slide--blue` | Fundo azul sólido IBM — ideal para impacto, quotes ou números grandes; sem scroll, tudo na viewport |
| 06 | `slide--textured` | Gray-10 com grade SVG inline (pontos + linhas) e cards com ícone colorido |
| 07 | `slide--split` | Split azul/branco — coluna esquerda IBM Blue com círculos decorativos CSS, coluna direita lista numerada |
| 08 | `slide--closing` | Encerramento claro — display grande com `em` em IBM Blue, subtexto, contatos e rodapé de marca |

## Características técnicas

- **Autocontido** — CSS e JavaScript dentro do `index.html`; logos IBM e ícones
  Carbon copiados localmente em `assets/`
- **Transição de slide** — `clip-path: inset()` wipe horizontal (não fade)
- **Animações stagger** — entrada escalonada por elemento ao ativar o slide
- **Navegação** — teclado completo (setas, PageUp/Down, Home, End, teclas 1–8), swipe touch, hash routing, fullscreen com `F`
- **Acessibilidade** — ARIA completo, skip link, foco visível WCAG 2.1 AA, `prefers-reduced-motion`
- **Print** — `@media print` que expande todos os slides em A4 landscape

## Placeholders `{{CHAVE}}`

O `index.html` usa placeholders `{{CHAVE}}` em maiúsculas para todo conteúdo variável.
Substitua cada `{{CHAVE}}` pelo conteúdo real da apresentação.

### Topbar
| Placeholder | Uso |
|---|---|
| `{{TITULO}}` | Título do `<title>` |
| `{{CLIENTE}}` | Nome do cliente (se for IBM, remover `brand__sep` e `brand__client`) |
| `{{AREA_OU_SERVICO}}` | Label mono à direita do divisor |

### Cover (slide 01)
| Placeholder | Uso |
|---|---|
| `{{LABEL_BARRA}}` | Texto vertical na barra lateral |
| `{{TAG_1}}`, `{{TAG_2}}` | Tags pequenas na barra lateral |
| `{{EYEBROW_COVER}}` | Texto eyebrow acima do display |
| `{{TITULO_LINHA_1}}`, `{{TITULO_LINHA_2}}` | Título display (linha 2 fica em IBM Blue bold) |
| `{{META_x_LABEL/VALOR/SUB}}` | 3 células de metadados no rodapé |

### Regra de logo (topbar)
- **Cliente IBM** → remova `brand__sep` e `brand__client`; mantenha só `brand__ibm`
- **Cliente externo** → mantenha os três elementos: `brand__ibm × brand__client`

## Como usar

1. Derive o slug da apresentação (ex.: `proposta-cliente-2025`)
2. Crie `<workspace>/<slug>/index.html` **fora** de `presentation-factory/`
3. Copie este `index.html` como base e substitua todos os `{{PLACEHOLDER}}`
4. Abra `index.html` diretamente no browser

> ⚠️ Nunca crie a apresentação final dentro de `presentation-factory/`.
> Este template existe apenas como referência.

## Preview

O arquivo [`/ibm-template-preview/index.html`](../../../../ibm-template-preview/index.html)
é o preview funcional deste template — 8 slides com conteúdo real demonstrando cada layout.
