/**
 * Deck controller — Template IBM executivo
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
    this.$side = document.getElementById('sideNav');
    this.$fs   = document.getElementById('fullscreenBtn');

    this._buildDots();
    this._buildSideNav();
    this._bind();
    this._render();
  }

  _buildDots() {
    this.slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'dot';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', `Slide ${i + 1}`);
      btn.addEventListener('click', () => this.goto(i));
      this.$dots.appendChild(btn);
    });
  }

  _buildSideNav() {
    if (!this.$side) return;

    this.slides.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'side-nav-item';
      btn.setAttribute('role', 'listitem');
      const label = s.dataset.title || `Slide ${i + 1}`;
      btn.innerHTML = `<span>${String(i + 1).padStart(2, '0')}</span>${label}`;
      btn.addEventListener('click', () => this.goto(i));
      this.$side.appendChild(btn);
    });
  }

  _bind() {
    document.addEventListener('keydown', e => this._key(e));
    this._initTouch();
    if (this.$fs) this.$fs.addEventListener('click', () => this._toggleFullscreen());
  }

  _key(e) {
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
      Escape     : () => this._toggleFullscreen(),
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

    this.slides.forEach((s, i) => s.classList.toggle('active', i === n));

    [...this.$dots.children].forEach((d, i) => {
      d.classList.toggle('active', i === n);
      d.setAttribute('aria-selected', String(i === n));
    });

    if (this.$side) {
      [...this.$side.children].forEach((b, i) => b.classList.toggle('active', i === n));
    }

    this.$fill.style.width = `${((n + 1) / this.total) * 100}%`;
    this.$num.textContent  = String(n + 1).padStart(2, '0');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity .4s ease';
    document.body.style.opacity    = '1';
  });

  document.getElementById('slideTot').textContent =
    String(document.querySelectorAll('.slide').length).padStart(2, '0');

  window._deck = new Deck();

  console.info('%cTemplate de apresentação', 'font:700 18px/1 IBM Plex Sans,sans-serif;color:#0f62fe');
  console.info('→ / ← : navegar | Esc : fullscreen | Home / End : primeiro / último');
});
