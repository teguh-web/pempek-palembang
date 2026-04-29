/* ============================================
   PEMPEK SELAMAT — main.js
   Animasi: scroll reveal, navbar, hero, cards
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. NAVBAR — solid on scroll
     ========================================== */

    // Navbar
  document.addEventListener("scroll", () => {
  document.querySelectorAll(".navbar").forEach(navbar => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
});
document.querySelectorAll('.dropdown > a').forEach(menu => {
  menu.addEventListener('click', function (e) {
    e.preventDefault();

    const dropdown = this.nextElementSibling;

    // tutup semua dropdown lain
    document.querySelectorAll('.dropdown-menu').forEach(item => {
      if (item !== dropdown) item.style.display = 'none';
    });

    // toggle dropdown
    dropdown.style.display =
      dropdown.style.display === 'block' ? 'none' : 'block';
  });
});

// klik di luar = nutup
document.addEventListener('click', function (e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.style.display = 'none';
    });
  }
});
  /* ==========================================
     2. HERO — staggered text entrance
     ========================================== */
  const heroH1 = document.querySelector('.hero__content h1');
  const heroP  = document.querySelector('.hero__content p');

  if (heroH1) {
    heroH1.style.opacity  = '0';
    heroH1.style.transform = 'translateY(30px)';
    heroP.style.opacity   = '0';
    heroP.style.transform  = 'translateY(30px)';

    setTimeout(() => {
      animate(heroH1, { opacity: 1, translateY: 0 }, 700, 'easeOut');
    }, 200);
    setTimeout(() => {
      animate(heroP, { opacity: 1, translateY: 0 }, 700, 'easeOut');
    }, 480);
  }

  /* ==========================================
     3. SCROLL REVEAL — generic fade-up
     ========================================== */
  const revealTargets = [
    '.dishes__header',
    '.dish-card',
    '.contacts__info',
    '.contacts__map',
    '.instagram h2',
    '.instagram__dots',
    '.instagram__btn',
  ];

  // const allReveal = [];
  // revealTargets.forEach(sel => {
  //   document.querySelectorAll(sel).forEach(el => {
  //     el.style.opacity   = '0';
  //     el.style.transform = 'translateY(40px)';
  //     el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  //     allReveal.push(el);
  //   });
  // });

  // Dish cards — stagger delay
  document.querySelectorAll('.dish-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 120}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  allReveal.forEach(el => observer.observe(el));

  /* ==========================================
     4. DISH CARDS — hover parallax tilt
     ========================================== */
  document.querySelectorAll('.dish-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(600px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  /* ==========================================
     5. NAVBAR — smooth underline on menu items
     ========================================== */
  document.querySelectorAll('.navbar__menu a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.textDecoration = 'none';
    });
  });

  /* ==========================================
     6. CONTACTS — counter-up on phone number
     ========================================== */
  const phoneEl = document.querySelector('.contacts__item p');
  let phoneAnimated = false;

  const phoneObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !phoneAnimated) {
      phoneAnimated = true;
      const original = phoneEl.textContent.trim();
      let i = 0;
      const interval = setInterval(() => {
        phoneEl.textContent = original.slice(0, i) + '_';
        i++;
        if (i > original.length) {
          phoneEl.textContent = original;
          clearInterval(interval);
        }
      }, 40);
    }
  }, { threshold: 0.5 });

  if (phoneEl) phoneObserver.observe(phoneEl);

  /* ==========================================
     7. INSTAGRAM DOTS — auto-cycle
     ========================================== */
  const dots = document.querySelectorAll('.dot');
  let activeDot = 1;

  setInterval(() => {
    dots.forEach(d => d.classList.remove('dot--active'));
    activeDot = (activeDot + 1) % dots.length;
    dots[activeDot].classList.add('dot--active');
  }, 2000);

  /* ==========================================
     8. SHARE MORE BUTTON — ripple effect
     ========================================== */
  const btn = document.querySelector('.instagram__btn');
  if (btn) {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('btn-ripple');
      const rect = btn.getBoundingClientRect();
      ripple.style.left   = `${e.clientX - rect.left}px`;
      ripple.style.top    = `${e.clientY - rect.top}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  /* ==========================================
     9. HERO — Ken Burns subtle zoom
     ========================================== */
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundSize = '110%';
    hero.style.transition = 'background-size 8s ease';
    setTimeout(() => {
      hero.style.backgroundSize = '100%';
    }, 100);
  }

  /* ==========================================
     10. FOOTER LINKS — stagger fade-in
     ========================================== */
  document.querySelectorAll('.footer__links li').forEach((li, i) => {
    li.style.opacity = '0';
    li.style.transform = 'translateY(12px)';
    li.style.transition = `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`;
  });

  const footerObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.footer__links li').forEach(li => {
        li.style.opacity   = '1';
        li.style.transform = 'translateY(0)';
      });
      footerObserver.disconnect();
    }
  }, { threshold: 0.3 });

  const footer = document.querySelector('.footer');
  if (footer) footerObserver.observe(footer);


  /* ==========================================
     HELPER — lightweight animate function
     ========================================== */
  function animate(el, props, duration, easing) {
    el.style.transition = `opacity ${duration}ms ${easing === 'easeOut' ? 'cubic-bezier(0.22,1,0.36,1)' : 'ease'}, transform ${duration}ms ${easing === 'easeOut' ? 'cubic-bezier(0.22,1,0.36,1)' : 'ease'}`;
    if (props.opacity   !== undefined) el.style.opacity   = props.opacity;
    if (props.translateY !== undefined) el.style.transform = `translateY(${props.translateY}px)`;
  }

});
/* ============================================
   MAIN COURSE PAGE — main-course.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* Navbar sticky blur (sama seperti halaman utama) */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  });

  /* Scroll reveal untuk product cards dengan stagger */
  const cards = document.querySelectorAll('.mc-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger berdasarkan posisi kolom (index % 3)
        const delay = (Array.from(cards).indexOf(entry.target) % 3) * 100;
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach(card => observer.observe(card));

  /* Hover tilt pada product cards */
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(500px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(0)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(500px) rotateY(0) rotateX(0) translateY(0)';
      card.style.transition = 'transform 0.5s ease, opacity 0.55s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

});