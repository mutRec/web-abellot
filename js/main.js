/* ABELLOT.net — interaccions SPA */
(function () {
  'use strict';

  // Any dinàmic al footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Language selector
  var langButtons = document.querySelectorAll('.lang-btn');
  var currentLang = 'ca';
  var translations = {
    ca: {
      tagline: 'Estudi web petit, resultats grans',
      h1_line1: 'Webs estàtiques.',
      h1_line2: 'Senzilles.',
      h1_line3: 'Ràpides.',
      description: 'ABELLOT.net dissenya pàgines web estàtiques: ràpides, clares i sense complicacions. Tot el que necessites, res que sobri.',
      cta: 'Parlem-ne',
      footer_desc: 'Disseny web estàtic, senzill i ràpid',
      marquee: 'Webs ràpides • Sense CMS • Codi net • Accessibles • Fet a mà • ABELLOT.net • Webs estàtiques • Senzilles • Dolces • ABELLOT.net • '
    },
    es: {
      tagline: 'Estudio web pequeño, resultados grandes',
      h1_line1: 'Webs estáticas.',
      h1_line2: 'Sencillas.',
      h1_line3: 'Rápidas.',
      description: 'ABELLOT.net diseña páginas web estáticas: rápidas, claras y sin complicaciones. Todo lo que necesitas, nada que sobre.',
      cta: 'Hablemos',
      footer_desc: 'Diseño web estático, sencillo y rápido',
      marquee: 'Webs rápidas • Sin CMS • Código limpio • Accesibles • Hecho a mano • ABELLOT.net • Webs estáticas • Sencillas • Dulces • ABELLOT.net • '
    },
    en: {
      tagline: 'Small web studio, big results',
      h1_line1: 'Static websites.',
      h1_line2: 'Simple.',
      h1_line3: 'Fast.',
      description: 'ABELLOT.net designing static websites: fast, clear, and uncomplicated. Everything you need, nothing extra.',
      cta: 'Talk to us',
      footer_desc: 'Static web design, simple and fast',
      marquee: 'Fast websites • No CMS • Clean code • Accessible • Handmade • ABELLOT.net • Static websites • Simple • Sweet • ABELLOT.net • '
    }
  };

  function setLanguage(lang) {
    currentLang = lang;
    var t = translations[lang];
    
    // Update language buttons
    langButtons.forEach(function(btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
      if (isActive) {
        btn.classList.remove('bg-cream/80', 'text-ink', 'border', 'border-ink/20', 'hover:bg-ink/10');
        btn.classList.add('bg-ink', 'text-cream');
      } else {
        btn.classList.remove('bg-ink', 'text-cream');
        btn.classList.add('bg-cream/80', 'text-ink', 'border', 'border-ink/20', 'hover:bg-ink/10');
      }
    });

    // Update content
    var taglineEl = document.querySelector('[data-i18n="tagline"]');
    if (taglineEl) taglineEl.textContent = t.tagline;

    var h1Line1 = document.querySelector('[data-i18n="h1-line1"]');
    var h1Line2 = document.querySelector('[data-i18n="h1-line2"]');
    var h1Line3 = document.querySelector('[data-i18n="h1-line3"]');
    if (h1Line1) h1Line1.textContent = t.h1_line1;
    if (h1Line2) h1Line2.textContent = t.h1_line2;
    if (h1Line3) h1Line3.textContent = t.h1_line3;

    var descEl = document.querySelector('[data-i18n="description"]');
    if (descEl) descEl.textContent = t.description;

    var ctaEl = document.querySelector('[data-i18n="cta"]');
    if (ctaEl) ctaEl.innerHTML = t.cta + ' <span aria-hidden="true">→</span>';

    var footerDesc = document.querySelector('[data-i18n="footer-desc"]');
    if (footerDesc) footerDesc.textContent = t.footer_desc;

    var marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
      marqueeTrack.innerHTML = '<span>' + t.marquee + '</span><span>' + t.marquee + '</span>';
    }

    // Update document lang
    document.documentElement.lang = lang;
  }

  langButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  // Reveal on scroll (IntersectionObserver)
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Parallax suau dels blobs del hero
  var parallaxEls = document.querySelectorAll('.parallax');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (parallaxEls.length && !reduceMotion) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
        el.style.transform = 'translateY(' + (y * speed) + 'px)';
      });
    }, { passive: true });
  }

  // Smooth scroll per a ancores (scroll-hint → footer)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          ev.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', id);
        }
      }
    });
  });

  // Grid pointer highlight - follows mouse on hero section
  var gridBg = document.querySelector('.grid-bg');
  var heroSection = document.getElementById('inici');
  if (gridBg && heroSection && !reduceMotion) {
    heroSection.addEventListener('mousemove', function (e) {
      var rect = heroSection.getBoundingClientRect();
      var mx = ((e.clientX - rect.left) / rect.width) * 100;
      var my = ((e.clientY - rect.top) / rect.height) * 100;
      gridBg.style.setProperty('--mx', mx + '%');
      gridBg.style.setProperty('--my', my + '%');
      gridBg.classList.add('active');
    });
    heroSection.addEventListener('mouseleave', function () {
      gridBg.classList.remove('active');
    });
  }
})();