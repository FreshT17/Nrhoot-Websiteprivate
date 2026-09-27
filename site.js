// Shared behavior for every page: scroll reveal + mobile menu.
(function () {
  'use strict';

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        io.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Forms are UI-only for now: the browser runs `required` validation, then we
  // stop the submit and say so. TODO: send FormData to the real backend here.
  document.querySelectorAll('form[data-ui-only]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (status) status.textContent = 'Form submissions aren’t connected yet, so this wasn’t sent.';
    });
  });

  // Waitlist + Help: POST the fields to the Google Apps Script web app, which appends
  // a waitlist row to the "Nrhoot waitlist request" sheet, or (form=help) forwards the
  // question to Zoho Flow for email (see scripts/waitlist-apps-script.gs).
  // A form-encoded body keeps this a "simple" request, so there's no CORS preflight.
  document.querySelectorAll('form[data-sheet-endpoint]').forEach(function (form) {
    var status = form.querySelector('.form-status');
    var submit = form.querySelector('[type="submit"]');
    var label = submit ? submit.textContent : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.dataset.sending) return;
      form.dataset.sending = '1';
      if (submit) { submit.disabled = true; submit.textContent = 'Sending…'; }
      if (status) status.textContent = '';

      fetch(form.dataset.sheetEndpoint, {
        method: 'POST',
        body: new URLSearchParams(new FormData(form))
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data || !data.ok) throw new Error('rejected');
          form.reset();
          if (status) status.textContent = form.dataset.success || 'You’re on the list! We’ll email you when Nrhoot is ready.';
        })
        .catch(function () {
          if (status) status.textContent = 'Something went wrong, so this wasn’t sent. Please try again.';
        })
        .then(function () {
          delete form.dataset.sending;
          if (submit) { submit.disabled = false; submit.textContent = label; }
        });
    });
  });

  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }
})();
