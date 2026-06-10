# Especificação de Apresentação HTML — Padrão de Navegação e Visual

Documento de referência para os aspectos de navegação, tipografia, cores e dimensões. Independente de conteúdo ou tema.

---

## 1. Dimensões e Layout

A apresentação é um arquivo HTML único com duas áreas fixas:

```
<div class="layout">       <!-- display:flex; height:100vh -->
  <aside class="sidebar">  <!-- índice fixo lateral esquerdo -->
  <main class="viewer">    <!-- área de slides rolável -->
</div>
```

| Propriedade | Valor |
|---|---|
| Dimensão dos slides | 1280 × 720 px (proporção 16:9) |
| Largura da sidebar | 300 px |
| Fundo do viewer | `#393939` |
| Espaçamento entre slides | `margin-bottom: 32px` |
| Sombra dos slides | `box-shadow: 0 4px 24px rgba(0,0,0,.18)` |

---

## 2. Cores

| Token | Valor | Uso |
|---|---|---|
| `blue-60` | `#0f62fe` | Cor principal — sidebar, destaques, links |
| `blue-70` | `#0353e9` | Hover de elementos azuis |
| `blue-10` | `#edf5ff` | Fundos de cards informativos |
| `gray-100` | `#161616` | Texto principal |
| `gray-70` | `#525252` | Texto secundário e rodapés |
| `gray-30` | `#e0e0e0` | Bordas e divisores |
| `gray-20` | `#393939` | Fundo do viewer |
| `white` | `#ffffff` | Fundo dos slides |

---

## 3. Tipografia

**Família principal:** IBM Plex Sans (weights: 300, 400, 500, 600, 700)
**Família mono:** IBM Plex Mono (weights: 400, 500)

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

body {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  color: #161616;
}
```

---

## 4. Sidebar

### 4.1 Estrutura

```html
<aside class="sidebar">
  <h2>TÍTULO</h2>
  <div class="subtitle">Subtítulo</div>

  <div class="sidebar-nav">
    <div class="nav-group">SEÇÃO</div>
    <a class="nav-item" data-target="slide-1">
      <span class="num">01</span> Nome do Slide
    </a>
  </div>

  <div class="sidebar-controls">
    <button id="btn-all">↑ Início</button>
    <button id="btn-print">Imprimir / PDF</button>
  </div>
</aside>
```

### 4.2 CSS

```css
.sidebar {
  width: 300px;
  background: #0f62fe;
  color: #fff;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.nav-group {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .1em;
  opacity: .6;
  padding: 16px 24px 4px;
  text-transform: uppercase;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 24px;
  color: rgba(255,255,255,.8);
  text-decoration: none;
  font-size: 12.5px;
  cursor: pointer;
  transition: background .15s;
}

.nav-item:hover { background: rgba(255,255,255,.1); }

.nav-item.active {
  background: rgba(255,255,255,.18);
  border-left: 3px solid #fff;
  color: #fff;
  font-weight: 500;
}

.nav-item .num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  opacity: .6;
  flex-shrink: 0;
}

.sidebar-controls {
  padding: 14px 24px;
  border-top: 1px solid rgba(255,255,255,.2);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-controls button {
  background: rgba(255,255,255,.12);
  color: #fff;
  border: 1px solid rgba(255,255,255,.2);
  padding: 8px 14px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 2px;
  width: 100%;
  text-align: left;
  transition: background .15s;
}

.sidebar-controls button:hover { background: rgba(255,255,255,.22); }
```

---

## 5. Navegação — Scroll para Slide

Ao clicar em um item do índice, a página rola suavemente até o slide **centralizado na viewport** (`block: 'center'`). O item clicado recebe a classe `.active`.

```javascript
const slides = document.querySelectorAll('.slide');
const navItems = document.querySelectorAll('.nav-item');
const btnAll = document.getElementById('btn-all');
const btnPrint = document.getElementById('btn-print');

function scrollToSlide(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  navItems.forEach(n => n.classList.remove('active'));
  const activeNav = document.querySelector(`.nav-item[data-target="${id}"]`);
  if (activeNav) activeNav.classList.add('active');
}

navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    scrollToSlide(item.dataset.target);
  });
});

btnAll.addEventListener('click', () => {
  navItems.forEach(n => n.classList.remove('active'));
  window.scrollTo({ behavior: 'smooth', top: 0 });
});

btnPrint.addEventListener('click', () => window.print());
```

---

## 6. Efeito de Foco (Blur)

Slides fora da viewport ficam desfocados e com opacidade reduzida. O efeito é ativado via `IntersectionObserver` com threshold de 25%, garantindo que o slide em evidência fique nítido e os demais recuem visualmente.

A classe `blur-ready` é adicionada ao `<body>` com duplo `requestAnimationFrame` para evitar flash de blur no carregamento inicial — o observer precisa marcar o primeiro slide como `.in-view` antes que o CSS de blur seja ativado.

### 6.1 CSS

```css
.slide {
  transition: filter .6s ease, opacity .6s ease;
}

.blur-ready .slide:not(.in-view) {
  filter: blur(3px);
  opacity: 0.28;
}
```

### 6.2 JavaScript

```javascript
slides.forEach(s => s.classList.remove('hidden'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('in-view', entry.isIntersecting);
  });
}, { threshold: 0.25 });

slides.forEach(slide => observer.observe(slide));

requestAnimationFrame(() => requestAnimationFrame(() => {
  document.body.classList.add('blur-ready');
}));
```

---

## 7. Impressão / PDF

```css
@media print {
  .sidebar { display: none; }
  .viewer { padding: 0; background: #fff; }
  .slide {
    box-shadow: none;
    page-break-after: always;
    margin: 0;
    filter: none !important;
    opacity: 1 !important;
  }
}
```
