# Guia de JavaScript para decks

## Responsabilidades

O controlador deve cuidar de:

- slide atual;
- botões anterior/próximo;
- contador;
- progresso;
- hash;
- índice;
- tela cheia;
- loop/autoplay;
- teclado;
- swipe;
- ARIA;
- inicialização.

Não coloque conteúdo de negócio no controlador.

## Estado

```javascript
var slides = Array.prototype.slice.call(
  document.querySelectorAll('.slide')
);
var total = slides.length;
var current = 1;
```

## Navegação

```javascript
function go(number) {
  number = Math.max(1, Math.min(total, number));

  slides.forEach(function (slide) {
    var slideNumber = parseInt(slide.dataset.slide, 10);
    var active = slideNumber === number;
    slide.classList.toggle('is-active', active);
    if (active) slide.removeAttribute('aria-hidden');
    else slide.setAttribute('aria-hidden', 'true');
  });

  current = number;
}
```

## Teclado

Suporte quando aplicável:

- ArrowRight, PageDown e Espaço: próximo;
- ArrowLeft e PageUp: anterior;
- Home: primeiro;
- End: último;
- Escape: índice;
- F: alternar tela cheia;
- L: alternar loop/autoplay;
- números: acesso direto.

Antes de agir, ignore:

```javascript
if (
  tag === 'INPUT' ||
  tag === 'TEXTAREA' ||
  tag === 'SELECT' ||
  target.isContentEditable
) return;
```

## Hash

Use `#slide-N` para deep links. Leia o hash na inicialização e responda a
`hashchange`. Prefira `history.replaceState` para não poluir o histórico a cada
avanço.

## Índice

- Atualize `.is-current`.
- Use `aria-current="page"`.
- Ao abrir, mova foco para fechar.
- Ao fechar, devolva foco ao botão que abriu.
- Clique no backdrop pode fechar.

## Progresso

```javascript
var percentage = (current / total) * 100;
bar.style.width = percentage + '%';
progress.setAttribute('aria-valuenow', Math.round(percentage));
```

## Tela cheia

Todo deck deve ter botão e atalho `F` para alternar tela cheia. Use a
Fullscreen API sobre `document.documentElement`, sincronize `aria-pressed` e
escute `fullscreenchange`. Se a API não existir, o botão deve falhar de forma
segura, sem quebrar navegação.

## Loop/autoplay

Todo deck deve ter botão e atalho `L` para ativar/desativar loop. O loop avança
automaticamente em intervalo definido, volta do último slide para o primeiro e
pausa avanço quando `document.hidden` estiver ativo. O botão deve expor estado
com `aria-pressed`.

## Swipe

- registre coordenadas no `touchstart`;
- calcule `dx` e `dy` no `touchend`;
- exija deslocamento horizontal mínimo;
- rejeite gesto predominantemente vertical;
- use listeners passivos.

## Inicialização

Inicialize após o DOM existir, normalmente com script no final do body. Faça
uma chamada forçada para sincronizar todos os estados.

O controlador real completo está em `examples/active-slide/deck.js`.
