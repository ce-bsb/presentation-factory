const labels = ['Cover','Agenda','Os caminhos da humanidade','Mensagem central','Inteligência artificial','Sinergia humano + IA','Aplicação no ambiente corporativo','Futuro do trabalho','Encerramento'];
    let current = 1;
    const total = document.querySelectorAll('.slide').length;
    const counter = document.getElementById('counter');
    const sectionLabel = document.getElementById('section-label');

    function pad(n){return String(n).padStart(2,'0');}

    function goToSlide(n){
      const prev = document.querySelector('.slide.active');
      const next = document.querySelector(`.slide[data-slide="${n}"]`);
      if (prev) prev.classList.remove('active');
      if (next){ next.classList.add('active'); animateMeters(next); }
      current = n;
      counter.textContent = pad(current) + ' / ' + pad(total);
      sectionLabel.textContent = labels[current-1] || '';
    }
    function changeSlide(dir){
      let next = current + dir;
      if (next < 1) next = total;
      if (next > total) next = 1;
      goToSlide(next);
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); changeSlide(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); changeSlide(-1); }
      if (e.key === 'Home') { goToSlide(1); }
      if (e.key === 'End') { goToSlide(total); }
    });
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
    document.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) changeSlide(diff > 0 ? 1 : -1);
    });

    function animateMeters(slide){
      slide.querySelectorAll('.meter > span[data-w]').forEach((bar, i) => {
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = bar.dataset.w + '%';
        }, 120 + i * 80);
      });
    }

    // Init
    counter.textContent = '01 / ' + pad(total);
    animateMeters(document.querySelector('.slide.active'));
