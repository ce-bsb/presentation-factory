/* Static slide deck controller
   Pure ES2015. No frameworks. Keyboard + buttons + hash routing + index. */

(function () {
  'use strict';

  var slides    = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var total     = slides.length;
  var bar       = document.getElementById('progress-bar');
  var counter   = document.getElementById('slide-counter');
  var btnPrev   = document.getElementById('btn-prev');
  var btnNext   = document.getElementById('btn-next');
  var btnIdx    = document.getElementById('btn-index');
  var btnFullscreen = document.getElementById('btn-fullscreen');
  var btnLoop   = document.getElementById('btn-loop');
  var btnIdxClose = document.getElementById('btn-index-close');
  var idxPanel  = document.getElementById('index-panel');
  var idxItems  = Array.prototype.slice.call(document.querySelectorAll('.index-item'));
  var goLinks   = Array.prototype.slice.call(document.querySelectorAll('[data-go]'));
  var current   = 1;
  var loopEnabled = false;
  var loopTimer = null;
  var loopDelay = 8000;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function readInitial() {
    var hash = (window.location.hash || '').replace('#', '');
    var match = /^slide-(\d+)$/.exec(hash);
    if (match) {
      var n = parseInt(match[1], 10);
      if (n >= 1 && n <= total) return n;
    }
    var qs = new URLSearchParams(window.location.search);
    var s = parseInt(qs.get('slide'), 10);
    if (s >= 1 && s <= total) return s;
    return 1;
  }

  function setHash(n) {
    var newHash = '#slide-' + n;
    if (window.location.hash !== newHash) {
      history.replaceState(null, '', newHash);
    }
  }

  function go(n, opts) {
    opts = opts || {};
    if (n < 1) n = 1;
    if (n > total) n = total;
    if (n === current && !opts.force) return;

    slides.forEach(function (s) {
      var sn = parseInt(s.getAttribute('data-slide'), 10);
      if (sn === n) {
        s.classList.add('is-active');
        s.removeAttribute('aria-hidden');
        s.scrollTop = 0;
      } else {
        s.classList.remove('is-active');
        s.setAttribute('aria-hidden', 'true');
      }
    });

    current = n;
    var pct = (n / total) * 100;
    if (bar) bar.style.width = pct + '%';
    var progress = document.querySelector('.progress');
    if (progress) progress.setAttribute('aria-valuenow', Math.round(pct));
    if (counter) counter.textContent = pad(n) + ' / ' + pad(total);

    idxItems.forEach(function (b) {
      var bn = parseInt(b.getAttribute('data-go'), 10);
      if (bn === n) b.classList.add('is-current');
      else b.classList.remove('is-current');
    });

    if (btnPrev) btnPrev.disabled = (n === 1 && !loopEnabled);
    if (btnNext) btnNext.disabled = (n === total && !loopEnabled);

    setHash(n);
  }

  function next() {
    if (current >= total && loopEnabled) go(1);
    else go(current + 1);
  }
  function prev() {
    if (current <= 1 && loopEnabled) go(total);
    else go(current - 1);
  }

  function syncLoopButton() {
    if (!btnLoop) return;
    btnLoop.setAttribute('aria-pressed', loopEnabled ? 'true' : 'false');
    btnLoop.classList.toggle('is-active', loopEnabled);
    btnLoop.querySelector('span').textContent = loopEnabled ? 'Loop ativo' : 'Loop';
  }

  function stopLoop() {
    loopEnabled = false;
    if (loopTimer) window.clearInterval(loopTimer);
    loopTimer = null;
    syncLoopButton();
    go(current, { force: true });
  }

  function startLoop() {
    loopEnabled = true;
    if (loopTimer) window.clearInterval(loopTimer);
    loopTimer = window.setInterval(function () {
      if (document.hidden) return;
      if (current >= total) go(1);
      else go(current + 1);
    }, loopDelay);
    syncLoopButton();
    go(current, { force: true });
  }

  function toggleLoop() {
    if (loopEnabled) stopLoop();
    else startLoop();
  }

  function isFullscreen() {
    return Boolean(
      document.fullscreenElement ||
      document.webkitFullscreenElement
    );
  }

  function syncFullscreenButton() {
    if (!btnFullscreen) return;
    var active = isFullscreen();
    btnFullscreen.setAttribute('aria-pressed', active ? 'true' : 'false');
    btnFullscreen.classList.toggle('is-active', active);
    btnFullscreen.querySelector('span').textContent = active ? 'Sair' : 'Tela cheia';
  }

  function toggleFullscreen() {
    var root = document.documentElement;
    if (isFullscreen()) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      return;
    }
    if (root.requestFullscreen) root.requestFullscreen();
    else if (root.webkitRequestFullscreen) root.webkitRequestFullscreen();
  }

  /* ---- Keyboard ---- */
  document.addEventListener('keydown', function (e) {
    // Ignore if user is typing in a form control
    var target = e.target;
    var tag = target && target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable) return;

    var key = e.key;

    if (key === 'Escape') {
      e.preventDefault();
      toggleIndex();
      return;
    }
    if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
      e.preventDefault(); next(); return;
    }
    if (key === 'ArrowLeft' || key === 'PageUp') {
      e.preventDefault(); prev(); return;
    }
    if (key === 'Home') { e.preventDefault(); go(1); return; }
    if (key === 'End')  { e.preventDefault(); go(total); return; }
    if (key === 'f' || key === 'F') {
      e.preventDefault();
      toggleFullscreen();
      return;
    }
    if (key === 'l' || key === 'L') {
      e.preventDefault();
      toggleLoop();
      return;
    }
    // Number keys 1-9
    if (/^[1-9]$/.test(key)) {
      var n = parseInt(key, 10);
      if (n >= 1 && n <= total) {
        e.preventDefault();
        go(n);
      }
    }
  });

  /* ---- Buttons ---- */
  if (btnPrev) btnPrev.addEventListener('click', prev);
  if (btnNext) btnNext.addEventListener('click', next);
  if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);
  if (btnLoop) btnLoop.addEventListener('click', toggleLoop);

  goLinks.forEach(function (el) {
    el.addEventListener('click', function (e) {
      var n = parseInt(el.getAttribute('data-go'), 10);
      if (!isNaN(n)) {
        e.preventDefault();
        closeIndex();
        go(n);
      }
    });
  });

  /* ---- Index ---- */
  function openIndex() {
    if (!idxPanel) return;
    idxPanel.hidden = false;
    idxPanel.setAttribute('aria-hidden', 'false');
    if (btnIdxClose) btnIdxClose.focus();
  }
  function closeIndex() {
    if (!idxPanel) return;
    idxPanel.hidden = true;
    idxPanel.setAttribute('aria-hidden', 'true');
    if (btnIdx) btnIdx.focus();
  }
  function toggleIndex() {
    if (!idxPanel) return;
    if (idxPanel.hidden) openIndex();
    else closeIndex();
  }
  if (btnIdx) btnIdx.addEventListener('click', toggleIndex);
  if (btnIdxClose) btnIdxClose.addEventListener('click', closeIndex);
  if (idxPanel) {
    idxPanel.addEventListener('click', function (e) {
      if (e.target === idxPanel) closeIndex();
    });
  }

  /* ---- Hashchange ---- */
  window.addEventListener('hashchange', function () {
    var n = readInitial();
    if (n !== current) go(n);
  });
  document.addEventListener('fullscreenchange', syncFullscreenButton);
  document.addEventListener('webkitfullscreenchange', syncFullscreenButton);

  /* ---- Touch swipe ---- */
  var touchX = null, touchY = null;
  document.addEventListener('touchstart', function (e) {
    if (e.touches && e.touches[0]) {
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    }
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var t = e.changedTouches && e.changedTouches[0];
    if (!t) return;
    var dx = t.clientX - touchX;
    var dy = t.clientY - touchY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next(); else prev();
    }
    touchX = touchY = null;
  }, { passive: true });

  /* ---- Init ---- */
  syncLoopButton();
  syncFullscreenButton();
  go(readInitial(), { force: true });
})();
