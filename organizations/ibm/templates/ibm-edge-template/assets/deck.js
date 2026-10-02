/**
 * Deck controller — IBM Presentation Factory
 * Vanilla JS, no dependencies. Keyboard + touch + wheel + fullscreen + TOC links.
 * Canonical source — keep every template copy identical to this file.
 */
class Deck {
  constructor() {
    this.slides  = [...document.querySelectorAll('.slide')];
    this.total   = this.slides.length;
    this.current = 0;

    this.$deck = document.querySelector('.deck');
    this.$dots = document.getElementById('navDots');
    this.$fill = document.getElementById('progressFill');
    this.$num  = document.getElementById('slideNum');
    this.$fs   = document.getElementById('fullscreenBtn');
    this.$prev = document.getElementById('prevBtn');
    this.$next = document.getElementById('nextBtn');

    // Each slide carries its own --i (inline in the HTML) and sits on a horizontal
    // track at (--i - --n) * 100% — moving between slides slides sideways, not a fade.
    this._buildDots();
    this._bind();
    this._render();
  }

  _buildDots() {
    this.slides.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'dot';
      btn.setAttribute('role', 'tab');
      const label = s.dataset.presentationName || s.dataset.title || `Slide ${i + 1}`;
      btn.setAttribute('aria-label', label);
      btn.addEventListener('click', () => this.goto(i));
      this.$dots.appendChild(btn);
    });
  }

  _bind() {
    document.addEventListener('keydown', e => this._key(e));
    this._initTouch();
    this._initWheel();
    this._initTocLinks();
    this._initCursorGlow();
    if (this.$fs) {
      this.$fs.addEventListener('click', () => this._toggleFullscreen());
    }
    if (this.$prev) this.$prev.addEventListener('click', () => this.prev());
    if (this.$next) this.$next.addEventListener('click', () => this.next());
    document.addEventListener('fullscreenchange', () => {
      const on = !!document.fullscreenElement;
      if (this.$fs) this.$fs.setAttribute('aria-pressed', String(on));
    });
  }

  _key(e) {
    const target = e.target;
    const tag = target && target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable) return;

    const actions = {
      ArrowRight : () => this.next(),
      ArrowDown  : () => this.next(),
      PageDown   : () => this.next(),
      ' '        : () => this.next(),
      ArrowLeft  : () => this.prev(),
      ArrowUp    : () => this.prev(),
      PageUp     : () => this.prev(),
      Home       : () => this.goto(0),
      End        : () => this.goto(this.total - 1),
      f          : () => this._toggleFullscreen(),
      F          : () => this._toggleFullscreen(),
      Escape     : () => document.fullscreenElement && document.exitFullscreen?.(),
    };
    if (actions[e.key]) { e.preventDefault(); actions[e.key](); }
  }

  _initTouch() {
    let startX = 0, startY = 0;
    document.addEventListener('touchstart', e => {
      startX = e.changedTouches[0].screenX;
      startY = e.changedTouches[0].screenY;
    }, { passive: true });
    document.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].screenX - startX;
      const dy = e.changedTouches[0].screenY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
        dx < 0 ? this.next() : this.prev();
      }
    }, { passive: true });
  }

  _initWheel() {
    let lastWheelTime = 0;
    document.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) < 15) return;
      const now = Date.now();
      if (now - lastWheelTime < 800) return;
      lastWheelTime = now;
      e.deltaY > 0 ? this.next() : this.prev();
    }, { passive: true });
  }

  _initTocLinks() {
    document.querySelectorAll('[data-go]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = parseInt(btn.dataset.go, 10);
        if (!isNaN(target)) this.goto(target - 1);
      });
    });
  }

  _toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  }

  _initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let raf = null;
    document.addEventListener('pointermove', e => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        glow.style.setProperty('--mx', `${e.clientX}px`);
        glow.style.setProperty('--my', `${e.clientY}px`);
        raf = null;
      });
    }, { passive: true });
  }

  goto(index) {
    if (index < 0 || index >= this.total || index === this.current) return;
    this.current = index;
    this._render();
  }
  next() { this.goto(this.current + 1); }
  prev() { this.goto(this.current - 1); }

  _render() {
    const n = this.current;

    if (this.$deck) this.$deck.style.setProperty('--n', n);

    this.slides.forEach((s, i) => {
      s.classList.toggle('active', i === n);
      s.setAttribute('aria-hidden', String(i !== n));
    });

    [...this.$dots.children].forEach((d, i) => {
      d.classList.toggle('active', i === n);
      d.setAttribute('aria-selected', String(i === n));
    });

    if (this.$fill) this.$fill.style.width = `${((n + 1) / this.total) * 100}%`;
    if (this.$num)  this.$num.textContent  = String(n + 1).padStart(2, '0');
    if (this.$prev) this.$prev.disabled = n === 0;
    if (this.$next) this.$next.disabled = n === this.total - 1;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity .4s ease';
    document.body.style.opacity    = '1';
  });

  const tot = document.getElementById('slideTot');
  if (tot) tot.textContent = String(document.querySelectorAll('.slide').length).padStart(2, '0');

  window._deck = new Deck();

  console.info('%cIBM Presentation Factory', 'font:700 16px/1 IBM Plex Sans,sans-serif;color:#0f62fe');
  console.info('→ / ← : navegar  |  F : tela cheia  |  Home / End : primeiro / último');
});
