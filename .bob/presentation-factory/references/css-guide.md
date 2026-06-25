# Guia de CSS para decks

## Organização

1. Tokens.
2. Reset e base.
3. Acessibilidade.
4. Shell do deck.
5. Componentes.
6. Layouts de slides.
7. Estados.
8. Responsividade.
9. Movimento reduzido.
10. Impressão.
11. Auditoria de cobertura.

O CSS deve ser tratado como parte central da entrega, não como acabamento. Todo
elemento visível criado no HTML precisa ter estilo deliberado.

## Tokens

```css
:root {
  color-scheme: light;
  --white: #ffffff;
  --gray-10: #f4f4f4;
  --gray-20: #e0e0e0;
  --gray-70: #525252;
  --gray-100: #161616;
  --blue-60: #0f62fe;
  --blue-70: #0043ce;
  --background: var(--white);
  --layer: var(--gray-10);
  --border: var(--gray-20);
  --text-primary: var(--gray-100);
  --text-secondary: var(--gray-70);
  --interactive: var(--blue-60);
  --focus: var(--blue-60);
  --space-01: 4px;
  --space-02: 8px;
  --space-03: 16px;
  --space-04: 24px;
  --space-05: 32px;
  --space-06: 48px;
  --font-sans: "IBM Plex Sans", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
}
```

## Base

```css
*, *::before, *::after { box-sizing: border-box; }
html { font-size: 18px; }
body {
  margin: 0;
  font-family: var(--font-sans);
  color: var(--text-primary);
  background: var(--background);
}
```

## Tipografia

- 18px: texto geral.
- 20px: textos longos ou destacados.
- `clamp()` para títulos.
- Limite de `ch` para parágrafos.
- Peso 300/400 para display, 500/600 para ênfase.
- Mono para labels, números e metadados.
- Ajuste `line-height` por uso: títulos mais compactos, parágrafos mais
  confortáveis, labels e metadados mais densos.
- Defina larguras máximas para títulos, parágrafos e listas. Texto largo demais
  perde leitura; texto espremido gera quebras ruins.
- Se o conteúdo não couber, reduza ou divida o conteúdo antes de diminuir a
  fonte fora da escala.
- Revise cada slide em desktop, tablet, mobile e print para corrigir quebras,
  órfãs visuais, overflow e desalinhamento.

## Uso dos modelos IBM como CSS

Use os exemplos e fontes IBM locais como biblioteca de padrões de CSS:

- `examples/active-slide/styles.css`: base de produção para decks sequenciais.
- `examples/scroll-sidebar/styles.css`: base para documento rolável com sidebar.
- `examples/ibm-complete-deck.html`: referência visual para tokens, grid,
  tipografia, tiles, navegação, pictogramas e variação de layouts.

Ao usar `ibm-complete-deck.html`, extraia apenas as ideias de CSS necessárias
para o deck final. Não copie o arquivo inteiro como único modelo, não copie
conteúdo de exemplo e não deixe CSS inline como fonte principal quando a entrega
pedir arquivos separados.

## Estado de slide ativo

```css
.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
}

.slide.is-active {
  opacity: 1;
  visibility: visible;
  transform: none;
}
```

## Grid com divisores

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  border: 1px solid var(--border);
  background: var(--border);
}

.card {
  padding: var(--space-05);
  background: var(--background);
}
```

## Foco

```css
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
```

Nunca remova outline sem substituição equivalente.

## Responsividade

- Empilhe colunas abaixo de 820px.
- Simplifique decoração antes de esconder conteúdo.
- Preserve ordem de leitura.
- Mantenha alvos touch confortáveis.
- Não faça texto essencial ficar minúsculo.

## Cobertura obrigatória

Antes de concluir, compare o HTML com o CSS e confirme que existe estilo para:

- shell do deck, slides, containers internos e estados ativo/inativo;
- topbar, navbar, botões, contador, progresso, índice, tela cheia e loop;
- headings, eyebrows, subtítulos, parágrafos, listas e links;
- cards, painéis, métricas, timelines, tabelas, figuras e captions;
- badges, notas, lacunas `[A confirmar]`, estados vazios e mensagens de erro;
- foco, hover, disabled, reduced motion, mobile e print.

Se um elemento apareceu no HTML, ele deve estar coberto por classe, token ou
regra global intencional. Não deixe componentes importantes dependerem do estilo
padrão do navegador.

## Movimento reduzido

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Impressão

```css
@media print {
  @page { size: A4 landscape; margin: 12mm; }
  .progress, .topbar, .navbar, .index-panel { display: none !important; }
  .deck { position: static; }
  .slide {
    position: static !important;
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
    break-after: page;
  }
}
```

O CSS completo de produção está em `examples/active-slide/styles.css`.
