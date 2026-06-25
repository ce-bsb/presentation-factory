# Padrões de componentes

## Cabeçalho

```html
<header class="slide-head">
  <p class="eyebrow">04 — Arquitetura</p>
  <h2 class="title" id="slide-4-title">
    Segurança atravessa todas as camadas
  </h2>
  <p class="subtitle">Fluxo conceitual da solução</p>
</header>
```

O título traz a mensagem. Eyebrow orienta e subtítulo limita o escopo.

## Duas colunas

```html
<div class="two-col">
  <article class="panel">
    <h3>Cenário atual</h3>
    <p>Fatos confirmados.</p>
  </article>
  <article class="panel panel--accent">
    <h3>Experiência desejada</h3>
    <p>Hipótese a validar.</p>
  </article>
</div>
```

Use quando existir comparação, contraste ou complementaridade.

## Cards executivos

```html
<div class="card-grid">
  <article class="card">
    <p class="card__label">Desafio</p>
    <h3>Conhecimento disperso</h3>
    <p>Impacto curto e objetivo.</p>
  </article>
  <article class="card">
    <p class="card__label">Oportunidade</p>
    <h3>Busca por significado</h3>
    <p>Capacidade relacionada.</p>
  </article>
  <article class="card">
    <p class="card__label">Decisão</p>
    <h3>Validar o caso</h3>
    <p>Próximo passo explícito.</p>
  </article>
</div>
```

## Timeline

```html
<ol class="timeline">
  <li>
    <span class="timeline__index">01</span>
    <h3>Discovery</h3>
    <p>Entender problema, usuários e dados.</p>
  </li>
  <li>
    <span class="timeline__index">02</span>
    <h3>Experimentação</h3>
    <p>Validar hipótese e critérios.</p>
  </li>
</ol>
```

Use `<ol>` somente quando existe ordem real.

## Checklist interativo

```html
<ul class="checklist" role="list">
  <li class="check">
    <input type="checkbox" id="task-1">
    <label for="task-1">Confirmar participantes</label>
  </li>
</ul>
```

Não simule checkbox com span.

## Métrica não confirmada

```html
<article class="metric">
  <p class="metric__value">[X]%</p>
  <p class="metric__label">Redução esperada no tempo</p>
  <p class="metric__status">[A confirmar com baseline]</p>
</article>
```

Não remova o status de incerteza.

## Figura

```html
<figure>
  <img
    src="assets/content/architecture.svg"
    alt="Arquitetura com canais, serviços e fontes corporativas"
    width="1200"
    height="600"
  >
  <figcaption>Arquitetura conceitual sujeita a validação.</figcaption>
</figure>
```

SVG ou imagem não deve ser a única fonte da informação essencial.
