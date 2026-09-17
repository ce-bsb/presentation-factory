  (function(){
    'use strict';
    var slides   = Array.prototype.slice.call(document.querySelectorAll('.slide'));
    var total    = slides.length;
    var bar      = document.getElementById('progress-bar');
    var counter  = document.getElementById('slide-counter');
    var btnPrev  = document.getElementById('btn-prev');
    var btnNext  = document.getElementById('btn-next');
    var btnIdx   = document.getElementById('btn-index');
    var btnClose = document.getElementById('btn-index-close');
    var btnFull  = document.getElementById('btn-fullscreen');
    var idxPanel = document.getElementById('index-panel');
    var goItems  = Array.prototype.slice.call(document.querySelectorAll('[data-go]'));
    var idxItems = Array.prototype.slice.call(document.querySelectorAll('.index-item'));
    var current  = 1;

    function pad(n){ return n < 10 ? '0' + n : '' + n; }

    function go(n, opts){
      opts = opts || {};
      if (n < 1) n = 1;
      if (n > total) n = total;
      if (n === current && !opts.force) return;
      slides.forEach(function(s){
        var sn = parseInt(s.getAttribute('data-slide'), 10);
        if (sn === n) { s.classList.add('is-active'); s.removeAttribute('aria-hidden'); s.scrollTop = 0; }
        else { s.classList.remove('is-active'); s.setAttribute('aria-hidden', 'true'); }
      });
      current = n;
      var pct = (n / total) * 100;
      if (bar) bar.style.width = pct + '%';
      var prog = document.querySelector('.progress');
      if (prog) prog.setAttribute('aria-valuenow', Math.round(pct));
      if (counter) counter.textContent = pad(n) + ' / ' + pad(total);
      idxItems.forEach(function(b){
        parseInt(b.getAttribute('data-go'), 10) === n ? b.classList.add('is-current') : b.classList.remove('is-current');
      });
      if (btnPrev) btnPrev.disabled = (n === 1);
      if (btnNext) btnNext.disabled = (n === total);
      var h = '#slide-' + n;
      if (window.location.hash !== h) history.replaceState(null, '', h);
    }
    function next(){ go(current + 1); }
    function prev(){ go(current - 1); }
    function openIdx(){  if (!idxPanel) return; idxPanel.hidden = false; idxPanel.setAttribute('aria-hidden', 'false'); if (btnClose) btnClose.focus(); }
    function closeIdx(){ if (!idxPanel) return; idxPanel.hidden = true;  idxPanel.setAttribute('aria-hidden', 'true');  if (btnIdx) btnIdx.focus(); }
    function toggleIdx(){ idxPanel && (idxPanel.hidden ? openIdx() : closeIdx()); }
    function toggleFullscreen(){ document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); }

    if (btnPrev)  btnPrev.addEventListener('click', prev);
    if (btnNext)  btnNext.addEventListener('click', next);
    if (btnIdx)   btnIdx.addEventListener('click', toggleIdx);
    if (btnClose) btnClose.addEventListener('click', closeIdx);
    if (btnFull)  btnFull.addEventListener('click', toggleFullscreen);
    if (idxPanel) idxPanel.addEventListener('click', function(e){ if (e.target === idxPanel) closeIdx(); });
    goItems.forEach(function(b){
      b.addEventListener('click', function(){
        var n = parseInt(b.getAttribute('data-go'), 10);
        if (!isNaN(n)) { closeIdx(); go(n); }
      });
    });

    document.addEventListener('keydown', function(e){
      var tag = e.target && e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
      var k = e.key;
      if (k === 'Escape') { e.preventDefault(); toggleIdx(); }
      else if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') { e.preventDefault(); next(); }
      else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); prev(); }
      else if (k === 'Home') { e.preventDefault(); go(1); }
      else if (k === 'End') { e.preventDefault(); go(total); }
      else if (k === 'f' || k === 'F') { e.preventDefault(); toggleFullscreen(); }
      else if (/^[1-9]$/.test(k)) { var n = parseInt(k, 10); if (n <= total) { e.preventDefault(); go(n); } }
    });

    var tx = null, ty = null;
    document.addEventListener('touchstart', function(e){ if (e.touches[0]) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; } }, { passive: true });
    document.addEventListener('touchend', function(e){
      if (tx === null) return;
      var t = e.changedTouches[0]; if (!t) return;
      var dx = t.clientX - tx, dy = t.clientY - ty;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) { dx < 0 ? next() : prev(); }
      tx = ty = null;
    }, { passive: true });

    var hash = (window.location.hash || '').replace('#', '');
    var m = /^slide-(\d+)$/.exec(hash);
    var init = m ? parseInt(m[1], 10) : 1;
    if (init < 1 || init > total) init = 1;
    go(init, { force: true });
  })();
  
