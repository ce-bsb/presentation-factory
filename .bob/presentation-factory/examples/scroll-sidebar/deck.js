(function () {
  'use strict';
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var items = Array.prototype.slice.call(document.querySelectorAll('.nav-item'));
  var btnFullscreen = document.getElementById('btn-fullscreen');
  var btnLoop = document.getElementById('btn-loop');
  var currentIndex = 0;
  var loopEnabled = false;
  var loopTimer = null;
  var loopDelay = 8000;

  function mark(id) {
    items.forEach(function (item) {
      var active = item.dataset.target === id;
      item.classList.toggle('active', active);
      if (active) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
    currentIndex = Math.max(0, slides.findIndex(function (slide) {
      return slide.id === id;
    }));
  }

  function go(id) {
    var target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    history.replaceState(null, '', '#' + id);
    mark(id);
  }

  function goByIndex(index) {
    if (!slides.length) return;
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    go(slides[index].id);
  }

  items.forEach(function (item) {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      go(item.dataset.target);
    });
  });

  document.getElementById('btn-all').addEventListener('click', function () {
    go('slide-1');
  });
  document.getElementById('btn-print').addEventListener('click', function () {
    window.print();
  });

  function syncLoopButton() {
    if (!btnLoop) return;
    btnLoop.setAttribute('aria-pressed', loopEnabled ? 'true' : 'false');
    btnLoop.textContent = loopEnabled ? 'Loop ativo' : 'Loop';
  }

  function stopLoop() {
    loopEnabled = false;
    if (loopTimer) window.clearInterval(loopTimer);
    loopTimer = null;
    syncLoopButton();
  }

  function startLoop() {
    loopEnabled = true;
    if (loopTimer) window.clearInterval(loopTimer);
    loopTimer = window.setInterval(function () {
      if (document.hidden) return;
      goByIndex(currentIndex + 1);
    }, loopDelay);
    syncLoopButton();
  }

  function toggleLoop() {
    if (loopEnabled) stopLoop();
    else startLoop();
  }

  function isFullscreen() {
    return Boolean(document.fullscreenElement || document.webkitFullscreenElement);
  }

  function syncFullscreenButton() {
    if (!btnFullscreen) return;
    var active = isFullscreen();
    btnFullscreen.setAttribute('aria-pressed', active ? 'true' : 'false');
    btnFullscreen.textContent = active ? 'Sair da tela cheia' : 'Tela cheia';
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

  if (btnLoop) btnLoop.addEventListener('click', toggleLoop);
  if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', syncFullscreenButton);
  document.addEventListener('webkitfullscreenchange', syncFullscreenButton);
  document.addEventListener('keydown', function (event) {
    var target = event.target;
    var tag = target && target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable) return;
    if (event.key === 'f' || event.key === 'F') {
      event.preventDefault();
      toggleFullscreen();
    }
    if (event.key === 'l' || event.key === 'L') {
      event.preventDefault();
      toggleLoop();
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
      if (entry.isIntersecting) mark(entry.target.id);
    });
  }, { threshold: 0.25, rootMargin: '-15% 0px -15% 0px' });

  slides.forEach(function (slide) { observer.observe(slide); });
  syncLoopButton();
  syncFullscreenButton();
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add('blur-ready');
    });
  });
})();
