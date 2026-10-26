/* Portfolio Marlon - main.js */

// Menu mobile
(function () {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && window.innerWidth < 768) {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Mode gelap / terang
(function () {
  var root = document.documentElement;
  try { var saved = localStorage.getItem('marlon-theme'); if (saved) root.setAttribute('data-theme', saved); } catch (e) {}
  document.getElementById('theme-toggle').addEventListener('click', function () {
    var current = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('marlon-theme', next); } catch (e) {}
  });
})();

// Muncul saat scroll + animasi bar skill
(function () {
  var items = document.querySelectorAll('.reveal');
  var skills = document.getElementById('skills-grid');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    skills.classList.add('skills-visible');
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });

  var so = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { skills.classList.add('skills-visible'); so.disconnect(); }
    });
  }, { threshold: 0.25 });
  so.observe(skills);
})();

// Penanda menu aktif
(function () {
  if (!('IntersectionObserver' in window)) return;
  var links = document.querySelectorAll('#nav-menu .nav-link');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        if (map[en.target.id]) map[en.target.id].setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(map).forEach(function (id) {
    var s = document.getElementById(id);
    if (s) spy.observe(s);
  });
})();

// Form kontak (demo: belum terhubung ke server)
(function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Lengkapi nama, email yang valid, dan pesan terlebih dahulu.';
      form.reportValidity();
      return;
    }
    status.textContent = 'Terima kasih, ' + form.nama.value.trim() + '. Pesan Anda sudah tercatat.';
    form.reset();
  });
})();

document.getElementById('year').textContent = new Date().getFullYear();
