/* FelipeUliani.com — script.js */

// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Active nav link
(function () {
  const pathname = window.location.pathname;
  const path = pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop().split('#')[0] || 'index.html';
    if (linkPage === path) {
      a.classList.add('active');
    }
    // Articles sub-pages
    if (pathname.includes('/articles/') && linkPage === 'articles.html') {
      a.classList.add('active');
    }
  });
})();

// Fade-in on scroll
(function () {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(function (el) { observer.observe(el); });
})();

// Newsletter form inline success
(function () {
  const form = document.querySelector('.nl-form');
  if (!form) return;

  form.addEventListener('submit', function () {
    setTimeout(function () {
      const row = form.querySelector('.nl-form-row');
      const msg = form.querySelector('.nl-success');
      if (row) row.style.display = 'none';
      if (msg) msg.style.display = 'block';
    }, 800);
  });
})();

// GA4 CTA click tracking
(function () {
  document.querySelectorAll('a.btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (typeof gtag !== 'function') return;
      gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: btn.textContent.trim()
      });
    });
  });
})();
