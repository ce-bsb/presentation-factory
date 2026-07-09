# IBM Carbon — Template de Apresentação (modo claro)

Template-base de apresentação executiva seguindo o **Carbon Design System v11**
da IBM, em **modo claro** consistente. É um template single-file: CSS, JS e logo
IBM ficam embutidos no `index.html`.

## Arquivos

- `index.html` — estrutura dos slides, tokens CSS, componentes, navegação,
  barra de progresso, região de acessibilidade e logo IBM SVG inline.

## O que mudou nesta revisão

- **Tudo dentro do index**: não há `styles.css`, `deck.js` ou asset de logo
  obrigatório para abrir o template diretamente no navegador.
- **Logo IBM dos assets** embutida como SVG inline e tingida com `currentColor`.
- **Textos genéricos** no padrão `Título 1`, `Status 1`, `Texto 1` e `Item 1`,
  sem conteúdo final de apresentação.
- **Painéis marinho legíveis** (slides 4, 6, 7 e 8): o texto era escuro sobre
  fundo escuro. Corrigido com `.surface-inverse`, que redefine os tokens de cor
  no escopo do painel — inclusive para estilos inline.
- **Encerramento** e **capa** com fundo claro de verdade e textura sutil.
- **Navegação dinâmica**: total e rótulos vêm do DOM, não de uma lista fixa.
- **Acessibilidade**: `aria-hidden` por slide, região `aria-live`, foco no
  slide ativo, foco visível nos botões.
- **Extras**: barra de progresso, deep-link (`#3` abre o slide 3), export para
  PDF (um slide por página) e correção de concordância no conteúdo.

## Como criar uma nova apresentação

Cada slide é uma `<section>`:

```html
<section class="slide" data-slide="3" data-label="Título da seção">
  ... conteúdo ...
</section>
```

- `data-slide` — número sequencial (1, 2, 3…).
- `data-label` — nome que aparece na barra inferior e para leitores de tela.

Para **adicionar ou remover** slides, basta editar o HTML: o contador
(`01 / 09`), a barra de progresso e os rótulos se recalculam automaticamente.
Renumere `data-slide` em ordem.

### Painel de ênfase (marinho com texto claro)

Adicione a classe `surface-inverse` a qualquer tile/coluna:

```html
<div class="tile surface-inverse">...texto claro automático...</div>
```

### Cores e tipografia

Tudo vem de tokens em `:root`, dentro do próprio `index.html`. Para mudar a cor
de destaque, ajuste `--primary`. A escala tipográfica segue os nomes do Carbon
(`display-03`, `productive-heading-05`, `body-long`, `label-01` etc.).

## Atalhos de teclado

| Tecla | Ação |
|---|---|
| → / Espaço / Page Down | próximo slide |
| ← / Page Up | slide anterior |
| Home / End | primeiro / último |
| 1–9 | ir direto ao slide |

Toque: deslize para a esquerda/direita no mobile.

## Exportar para PDF

Abra no navegador e use **Imprimir → Salvar como PDF** com tamanho de página
paisagem. O CSS de impressão renderiza um slide por página (formato 16:9).

---

Este template segue a identidade IBM e deve permanecer em
`organizations/ibm/templates/`.
