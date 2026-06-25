# Guia de HTML para decks

## Head

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="#ffffff">
  <meta name="description" content="Descrição objetiva">
  <title>Título da apresentação</title>
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
```

## Slide

```html
<section
  class="slide is-active"
  id="slide-1"
  data-slide="1"
  aria-labelledby="slide-1-title"
>
  <div class="slide__inner">
    <p class="eyebrow">01 — Abertura</p>
    <h1 id="slide-1-title">Mensagem principal</h1>
  </div>
</section>
```

Regras:

- ID único;
- número coerente;
- título visível;
- associação por `aria-labelledby`;
- apenas o primeiro ativo;
- slides inativos com `aria-hidden="true"` quando a arquitetura exige.

## Controles

```html
<nav aria-label="Controles da apresentação">
  <button id="btn-prev" type="button">Anterior</button>
  <button id="btn-next" type="button">Próximo</button>
  <button id="btn-fullscreen" type="button" aria-pressed="false">
    Tela cheia
  </button>
  <button id="btn-loop" type="button" aria-pressed="false">
    Loop
  </button>
</nav>
```

Não use `<div onclick>` para ações.

Todo deck deve oferecer:

- botão de tela cheia com atalho `F`;
- botão de loop/autoplay com atalho `L`;
- estado visível e `aria-pressed` para controles alternáveis.

## Índice

```html
<aside id="index-panel" hidden aria-hidden="true">
  <div role="dialog" aria-modal="true" aria-labelledby="index-title">
    <h2 id="index-title">Índice</h2>
    <button id="btn-index-close">Fechar</button>
    <button class="index-item" data-go="1">01 Abertura</button>
  </div>
</aside>
```

## Tabela

```html
<table>
  <caption class="sr-only">Itens necessários</caption>
  <thead>
    <tr><th scope="col">Item</th><th scope="col">Descrição</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Participantes</th><td>[A confirmar]</td></tr>
  </tbody>
</table>
```

## Imagens

- Informação: `alt` descreve a mensagem essencial.
- Decoração: `alt=""`.
- Use `width` e `height` para estabilidade.
- `loading="lazy"` em imagens fora do primeiro slide.
- Imagens, logos, pictogramas e SVGs devem vir da pasta `assets/` do deck final.
- A fonte original deve ser asset do owner ou
  `.bob/presentation-factory/assets/`; copie para o deck e use path relativo.
- Não use URL externa, caminho absoluto ou arquivo fora do mapa de assets sem
  pedido explícito.
- Paths devem apontar para assets do workspace.

## Semântica

- `<main>` para slides;
- `<header>` para cabeçalho;
- `<nav>` para navegação;
- `<section>` para slide;
- `<article>` para bloco autônomo;
- `<figure>` e `<figcaption>` para visual explicativo;
- `<ol>` para sequência;
- `<ul>` para conjunto sem ordem.
