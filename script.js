(function () {
  'use strict';

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  // Constellation: draw in once it scrolls into view
  var sky = document.querySelector('.sky');

  if (sky) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            sky.classList.add('is-drawn');
            observer.disconnect();
          }
        });
      }, { threshold: 0.35 });
      observer.observe(sky);
    } else {
      sky.classList.add('is-drawn');
    }
  }

  // Town chips and their stars light up together
  var towns = document.querySelectorAll('[data-town]');

  function setTown(name, active) {
    towns.forEach(function (el) {
      if (el.dataset.town === name) el.classList.toggle('is-active', active);
    });
  }

  towns.forEach(function (el) {
    el.addEventListener('pointerenter', function () { setTown(el.dataset.town, true); });
    el.addEventListener('pointerleave', function () { setTown(el.dataset.town, false); });
  });

  // Concept demo: the Booksy link is not connected yet
  var demoLink = document.querySelector('[data-demo-link]');
  var demoLinkNote = document.querySelector('.demo-link-note');

  if (demoLink && demoLinkNote) {
    demoLink.addEventListener('click', function (event) {
      event.preventDefault();
      demoLinkNote.hidden = false;
    });
  }

  // Concept demo: the quote form checks its fields but sends nothing
  var form = document.getElementById('quote');

  if (form) {
    var status = form.querySelector('.form-status');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var missing = [];
      form.querySelectorAll('[required]').forEach(function (field) {
        var empty = !field.value.trim();
        field.setAttribute('aria-invalid', String(empty));
        if (empty) missing.push(field);
      });

      status.hidden = false;

      if (missing.length) {
        status.textContent = 'Add your name and phone number so Shannon can get back to you.';
        missing[0].focus();
        return;
      }

      status.textContent = 'Concept demo: nothing was sent. On the live site, this request goes straight to Shannon.';
    });

    form.addEventListener('input', function (event) {
      if (event.target.getAttribute('aria-invalid') === 'true' && event.target.value.trim()) {
        event.target.setAttribute('aria-invalid', 'false');
      }
    });
  }
})();
