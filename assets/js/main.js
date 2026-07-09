/* ==========================================================================
   NOVR STUDIO — MAIN JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- header scroll state ---------- */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ---------- mobile menu ---------- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- hero background word parallax ---------- */
  const heroWord = document.getElementById('heroWord');
  if (heroWord) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          heroWord.style.transform = `translate(-50%, calc(-50% + ${y * 0.18}px))`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ---------- custom cursor ---------- */
  const cursor = document.getElementById('cursor');
  const cursorLabel = document.getElementById('cursorLabel');
  if (cursor && matchMedia('(hover:hover)').matches) {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      cursor.classList.add('active');
    });
    (function loop() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, .service-item, button').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    document.querySelectorAll('.work-item.is-live').forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursorLabel) cursorLabel.textContent = 'VIEW';
        cursor.classList.add('label-visible');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('label-visible');
      });
    });
  }

  /* ---------- work item preview follows cursor vertically ---------- */
  document.querySelectorAll('.work-item.is-live').forEach(item => {
    const preview = item.querySelector('.work-preview');
    if (!preview) return;
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const relY = e.clientY - rect.top - rect.height / 2;
      preview.style.transform = `translateY(calc(-50% + ${relY * 0.15}px)) scale(1)`;
    });
  });

  /* ---------- work item click -> navigate to case study ---------- */
  document.querySelectorAll('.work-item[data-href]').forEach(item => {
    item.addEventListener('click', () => {
      window.location.href = item.getAttribute('data-href');
    });
  });

  /* ---------- loader ---------- */
  const loader = document.getElementById("loader");
  if(loader){
      window.addEventListener("load",()=>{
          setTimeout(()=>{
              loader.classList.add("hide");
          },1400);
      });
  }

});