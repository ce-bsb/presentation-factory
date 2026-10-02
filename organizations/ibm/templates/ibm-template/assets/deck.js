/**
 * Deck controller — IBM Presentation Factory
 * Vanilla JS · no dependencies · keyboard + touch + wheel navigation
 */

class Deck {
  constructor() {
    this.slides  = [...document.querySelectorAll('.slide')];
    this.total   = this.slides.length;
    this.current = 0;

    this.$dots = document.getElementById('navDots');
    this.$fill = document.getElementById('progressFill');
    this.$num  = document.getElementById('slideNum');
    this.$tot  = document.getElementById('slideTot');
    this.$fs   = document.getElementById('fullscreenBtn');

    this._buildDots();
    this._bind();
    this._render();
  }

  /** Build navigation dots from the live slide list */
  _buildDots() {
    this.slides.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'dot';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', `Slide ${i + 1}${s.dataset.title ? ': ' + s.dataset.title : ''}`);
      btn.addEventListener('click', () => this.goto(i));
      this.$dots.appendChild(btn);
    });
  }

  /** Bind keyboard, touch, wheel and fullscreen events */
  _bind() {
    document.addEventListener('keydown', e => this._key(e));
    this._initTouch();
    this._initWheel();

    if (this.$fs) {
      this.$fs.addEventListener('click', () => this._toggleFullscreen());
    }

    document.addEventListener('fullscreenchange', () => {
      const icon = this.$fs?.querySelector('svg');
      if (!icon) return;
      this.$fs.setAttribute('aria-pressed', String(!!document.fullscreenElement));
    });
  }

  _key(e) {
    const map = {
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
      Escape     : () => { if (document.fullscreenElement) this._toggleFullscreen(); },
    };
    if (map[e.key]) {
      e.preventDefault();
      map[e.key]();
    }
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

  _toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
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

    this.slides.forEach((s, i) => {
      s.classList.toggle('active', i === n);
    });

    [...this.$dots.children].forEach((d, i) => {
      d.classList.toggle('active', i === n);
      d.setAttribute('aria-selected', String(i === n));
    });

    if (this.$fill) {
      this.$fill.style.width = `${((n + 1) / this.total) * 100}%`;
    }
    if (this.$num) {
      this.$num.textContent = String(n + 1).padStart(2, '0');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Graceful entry fade
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity .35s ease';
    document.body.style.opacity    = '1';
  });

  // Populate total slide count
  const tot = document.getElementById('slideTot');
  if (tot) {
    tot.textContent = String(document.querySelectorAll('.slide').length).padStart(2, '0');
  }

  window._deck = new Deck();

  console.info(
    '%c IBM Presentation Factory ',
    'font: 700 14px/1 "IBM Plex Mono", monospace; color: #fff; background: #0f62fe; padding: 2px 6px;'
  );
  console.info('← → Arrow keys · Space · PageUp/Down · Home · End · F = fullscreen');
});
