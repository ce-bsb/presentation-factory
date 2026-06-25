# HTML, CSS e JavaScript

## Arquitetura — escolha uma

1. **Slide ativo** — um slide visível; JS controla `.is-active`.
   Exemplo: `examples/active-slide/`
2. **Sidebar com scroll** — todos os slides no fluxo; `IntersectionObserver`.
   Exemplo: `examples/scroll-sidebar/`

Leia o exemplo da arquitetura escolhida antes de criar o deck.

## HTML

- Semântico, `lang` correto, IDs de slide únicos.
- `aria-labelledby` no slide apontando para o título visível.
- Botão fullscreen (atalho `F`) e botão loop (atalho `L`) obrigatórios.
- Ações como `<button>`; imagens com `alt`.

## CSS

- Tokens no `:root`; tema claro; base 18 px; responsivo (desktop/tablet/mobile).
- `prefers-reduced-motion`; `@media print` (uma página por slide).
- Todo elemento visível tem CSS intencional.

## JavaScript

- Vanilla, sem build. Estado centralizado.
- Teclado: setas, PageUp/Down, Home, End, Espaço, Escape, `F`, `L`.
- Sincronizar slide, contador, hash, índice, ARIA, `aria-pressed`.
- Swipe horizontal. Console sem erros.
