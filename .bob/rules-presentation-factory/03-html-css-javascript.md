# HTML, CSS e JavaScript

## Arquitetura — escolha uma

1. **Slide ativo** — um slide visível; JS controla `.is-active`.
   Referência: templates em `organizations/ibm/templates/`.
2. **Sidebar com scroll** — todos os slides no fluxo; `IntersectionObserver`.
   Use apenas se o template real ou o pedido justificar.

Leia o template real mais próximo antes de criar ou alterar o deck.

Para apresentações IBM novas, use o catálogo completo em `.bob/presentation-factory/README.md`.
Os templates IBM são autocontidos: preserve CSS e JavaScript dentro de `index.html`.

## HTML

- Semântico, `lang` correto, IDs de slide únicos.
- `aria-labelledby` no slide apontando para o título visível.
- Botão fullscreen (atalho `F`) e botão loop (atalho `L`) obrigatórios.
- Ações como `<button>`; imagens com `alt`.

## CSS

- Tokens no `:root`; tema claro; base 18 px; responsivo (desktop/tablet/mobile).
- `prefers-reduced-motion`; `@media print` (uma página por slide).
- Todo elemento visível tem CSS intencional.
- **CSS de referência:** `organizations/ibm/assets/css/styles.css`.
  Para templates autocontidos, preserve o bloco `<style>` dentro de `index.html`.

## JavaScript

- Vanilla, sem build. Estado centralizado.
- Teclado: setas, PageUp/Down, Home, End, Espaço, Escape, `F`, `L`.
- Sincronizar slide, contador, hash, índice, ARIA, `aria-pressed`.
- Swipe horizontal. Console sem erros.
