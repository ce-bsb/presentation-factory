/** IBM Presentation Factory · dependency-free accessible deck controller.
 * Canonical source. Sync standalone copies with tools/sync_template_assets.py.
 */
class Deck {
  constructor() {
    this.slides = [...document.querySelectorAll('.slide')];
    this.total = this.slides.length;
    this.current = 0;
    this.$deck = document.querySelector('.deck');
    this.$dots = document.getElementById('navDots');
    this.$fill = document.getElementById('progressFill');
    this.$num = document.getElementById('slideNum');
    this.$fs = document.getElementById('fullscreenBtn');
    this.$prev = document.getElementById('prevBtn');
    this.$next = document.getElementById('nextBtn');
    if (!this.total || !this.$deck) return;
    this.slides.forEach((slide, i) => {
      slide.style.setProperty('--i', i);
      slide.id ||= `slide-${i + 1}`;
      slide.tabIndex = -1;
      slide.setAttribute('aria-roledescription', 'slide');
      const groups = '.stat-grid, .card-grid, .journey, .metric-row, .chain, .chain-row, .timeline, .capability-grid, .two-col';
      const candidates = [...slide.querySelectorAll('.slide-head, .hero-copy, .cover-main__head, .cover-main__foot, .cover-ledger, .closing-main, .statement, .slide-body > *, .cover-grid, .cover-grid__footer, .workshop, .checklist, .stat-grid > *, .card-grid > *, .journey > *, .metric-row > *, .chain-row > *, .timeline > *, .capability-grid > *, .two-col > *')]
        .filter(element => !element.matches(groups));
      candidates.filter(element => !candidates.some(parent => parent !== element && parent.contains(element)))
        .forEach((element, order) => {
          element.dataset.reveal = '';
          element.style.setProperty('--reveal-delay', `${Math.min(order, 5) * 60}ms`);
        });
    });
    const initial = this.slides.findIndex(slide => `#${slide.id}` === location.hash);
    if (initial >= 0) this.current = initial;
    this._buildDots();
    this._bind();
    this._render();
    document.fonts?.ready.then(() => this._layout());
    // Re-evaluate when images or user-supplied content change their intrinsic size.
    const observer = new ResizeObserver(() => this._layout());
    this.slides.forEach(slide => { if (slide.firstElementChild) observer.observe(slide.firstElementChild); });
    const total = document.getElementById('slideTot');
    if (total) total.textContent = String(this.total).padStart(2, '0');
  }

  _buildDots() {
    if (!this.$dots) return;
    this.$dots.replaceChildren();
    this.slides.forEach((slide, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'dot';
      const label = slide.dataset.presentationName || slide.dataset.title || `Slide ${i + 1}`;
      button.setAttribute('aria-label', `${i + 1} de ${this.total}: ${label}`);
      button.setAttribute('aria-controls', slide.id);
      button.title = label;
      button.addEventListener('click', () => this.goto(i));
      this.$dots.append(button);
    });
  }

  _bind() {
    document.addEventListener('keydown', event => this._key(event));
    this.$prev?.addEventListener('click', () => this.prev());
    this.$next?.addEventListener('click', () => this.next());
    this.$fs?.addEventListener('click', () => this._toggleFullscreen());
    if (this.$fs && !document.fullscreenEnabled) this.$fs.hidden = true;
    document.addEventListener('fullscreenchange', () => {
      const active = !!document.fullscreenElement;
      this.$fs?.setAttribute('aria-pressed', String(active));
      this.$fs?.setAttribute('aria-label', active ? 'Sair da tela cheia' : 'Entrar em tela cheia');
      this._layout();
    });
    window.addEventListener('resize', () => this._layout());
    window.addEventListener('hashchange', () => {
      const index = this.slides.findIndex(slide => `#${slide.id}` === location.hash);
      if (index >= 0) this.goto(index, false);
    });
    document.querySelectorAll('[data-go]').forEach(button => {
      button.addEventListener('click', event => {
        const index = Number(button.dataset.go) - 1;
        if (Number.isInteger(index) && index >= 0 && index < this.total) {
          event.preventDefault();
          this.goto(index);
        }
      });
    });
    let start = null;
    this.$deck.addEventListener('touchstart', event => {
      if (event.touches.length !== 1 || event.target.closest('a,button,input,select,textarea,video,[contenteditable],.compare-wrap')) {
        start = null;
        return;
      }
      const touch = event.touches[0];
      start = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });
    this.$deck.addEventListener('touchcancel', () => { start = null; }, { passive: true });
    this.$deck.addEventListener('touchend', event => {
      if (!start) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.5) dx < 0 ? this.next() : this.prev();
      start = null;
    }, { passive: true });
  }

  _key(event) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest('input,textarea,select,button,a,video,[contenteditable="true"],[role="textbox"]')) return;
    const actions = {
      ArrowRight: () => this.next(), ArrowLeft: () => this.prev(),
      Home: () => this.goto(0), End: () => this.goto(this.total - 1),
      f: () => this._toggleFullscreen(), F: () => this._toggleFullscreen(),
    };
    // In reading mode vertical keys keep their native page-scrolling behavior.
    if (!document.body.classList.contains('reading-mode')) Object.assign(actions, {
      ArrowDown: () => this.next(), ArrowUp: () => this.prev(),
      PageDown: () => this.next(), PageUp: () => this.prev(), ' ': () => this.next(),
    });
    if (actions[event.key]) { event.preventDefault(); actions[event.key](); }
  }

  async _toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen?.();
      else if (document.fullscreenEnabled) await document.documentElement.requestFullscreen?.();
    } catch {
      // Fullscreen may be denied by an embedding browser; normal navigation stays usable.
      this.$fs?.setAttribute('aria-pressed', 'false');
    }
  }

  _layout() {
    cancelAnimationFrame(this.layoutFrame);
    this.layoutFrame = requestAnimationFrame(() => {
      const headerHeight = document.querySelector('.topbar')?.getBoundingClientRect().height || 0;
      const footerHeight = document.querySelector('.nav-controls')?.getBoundingClientRect().height || 0;
      const available = window.innerHeight - headerHeight - footerHeight;
      const content = this.slides[this.current].firstElementChild;
      const needsReading = window.innerWidth < 1056 || window.innerHeight < 600 ||
        (content && content.scrollHeight > available + 2);
      document.body.classList.toggle('reading-mode', !!needsReading);
    });
  }

  goto(index, updateHash = true) {
    if (!Number.isInteger(index) || index < 0 || index >= this.total || index === this.current) return;
    const moveFocus = this.slides[this.current].contains(document.activeElement);
    this.current = index;
    this._render();
    if (updateHash) {
      try { history.replaceState(null, '', `#${this.slides[index].id}`); } catch { /* file:// restrictions */ }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (moveFocus) this.slides[index].focus({ preventScroll: true });
  }
  next() { this.goto(this.current + 1); }
  prev() { this.goto(this.current - 1); }

  _render() {
    this.$deck.style.setProperty('--n', this.current);
    this.slides.forEach((slide, i) => {
      const active = i === this.current;
      slide.classList.toggle('active', active);
      slide.inert = !active;
      slide.setAttribute('aria-hidden', String(!active));
    });
    [...(this.$dots?.children || [])].forEach((dot, i) => {
      dot.classList.toggle('active', i === this.current);
      if (i === this.current) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    const activeDot = this.$dots?.children[this.current];
    if (activeDot) this.$dots.scrollLeft = activeDot.offsetLeft - this.$dots.offsetLeft - this.$dots.clientWidth / 2 + activeDot.clientWidth / 2;
    if (this.$fill) this.$fill.style.width = `${(this.current + 1) / this.total * 100}%`;
    if (this.$num) this.$num.textContent = String(this.current + 1).padStart(2, '0');
    if (this.$prev) this.$prev.disabled = this.current === 0;
    if (this.$next) this.$next.disabled = this.current === this.total - 1;
    this._layout();
  }
}

document.addEventListener('DOMContentLoaded', () => { window._deck = new Deck(); });
