# HTML, CSS e JavaScript

## Arquitetura — escolha uma

1. **Slide ativo** — um slide visível; JS controla `.is-active`.
   Referência: templates existentes em `clients/*/templates/` e
   `organizations/*/templates/`.
2. **Sidebar com scroll** — todos os slides no fluxo; `IntersectionObserver`.
   Use apenas se o template real ou o pedido justificar.

Leia o template real mais próximo **apenas se o pedido envolver redesign amplo,
novo padrão de layout ou decisão de narrativa** — não para criações simples.

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
  No `<link>` do HTML, aponte para o path relativo a partir da pasta da apresentação
  (ex.: `../presentation-factory/clients/ibm-enterprise/assets/css/styles.css`).
  **Só copie o arquivo** para dentro da pasta da apresentação se o usuário pedir
  distribuição offline/standalone. Nunca leia o conteúdo completo do CSS antes de agir.

## JavaScript

- Vanilla, sem build. Estado centralizado.
- Teclado: setas, PageUp/Down, Home, End, Espaço, Escape, `F`, `L`.
- Sincronizar slide, contador, hash, índice, ARIA, `aria-pressed`.
- Swipe horizontal. Console sem erros.
