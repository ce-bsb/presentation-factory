# HTML, CSS e JavaScript

## Arquitetura — escolha uma

1. **Slide ativo** — um slide visível; JS controla `.is-active`.
   Referência: templates existentes em `clients/*/templates/` e
   `organizations/*/templates/`.
2. **Sidebar com scroll** — todos os slides no fluxo; `IntersectionObserver`.
   Use apenas se o template real ou o pedido justificar.

Leia o template real mais próximo antes de criar ou alterar o deck.

## HTML

- Semântico, `lang` correto, IDs de slide únicos.
- `aria-labelledby` no slide apontando para o título visível.
- Botão fullscreen (atalho `F`) e botão loop (atalho `L`) obrigatórios.
- Ações como `<button>`; imagens com `alt`.

## CSS

- Tokens no `:root`; tema claro; base 18 px; responsivo (desktop/tablet/mobile).
- `prefers-reduced-motion`; `@media print` (uma página por slide).
- Todo elemento visível tem CSS intencional.
- **CSS de referência:** `clients/ibm-enterprise/assets/css/styles.css` (clientes IBM)
  e `organizations/ibm/assets/css/styles.css` (IBM institucional).
  Copie o arquivo integralmente para `<pasta-da-apresentação>/assets/css/styles.css`.
  O `<link>` no HTML deve apontar para esse path relativo — nunca deixe o CSS de fora.

## JavaScript

- Vanilla, sem build. Estado centralizado.
- Teclado: setas, PageUp/Down, Home, End, Espaço, Escape, `F`, `L`.
- Sincronizar slide, contador, hash, índice, ARIA, `aria-pressed`.
- Swipe horizontal. Console sem erros.
