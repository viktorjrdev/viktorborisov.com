/* Shared navigation behaviour for viktorborisov.com
   - Courses dropdown: opens on hover (mouse), on first tap (touch), on focus (keyboard)
   - Mobile menu button below 860px
   - Escape closes everything */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;

  var mobile = window.matchMedia('(max-width: 860px)');
  var toggle = nav.querySelector('.nav-toggle');
  var drops = Array.prototype.slice.call(nav.querySelectorAll('.nav-drop'));

  function closeDrops() {
    drops.forEach(function (d) {
      d.classList.remove('open');
      var t = d.querySelector('.drop-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }
  function closeMenu() {
    nav.classList.remove('menu-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  drops.forEach(function (d) {
    var trigger = d.querySelector('.drop-trigger');
    var pointer = 'mouse';

    trigger.addEventListener('pointerdown', function (e) { pointer = e.pointerType || 'mouse'; });

    // Touch screens have no hover: the first tap opens the list, a second tap follows the link.
    trigger.addEventListener('click', function (e) {
      if (mobile.matches) return;
      if (pointer !== 'mouse' && !d.classList.contains('open')) {
        e.preventDefault();
        d.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    d.addEventListener('mouseenter', function () {
      d.classList.remove('suppress');
      trigger.setAttribute('aria-expanded', 'true');
    });
    d.addEventListener('mouseleave', function () {
      d.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });
    d.addEventListener('focusin', function () { trigger.setAttribute('aria-expanded', 'true'); });
    d.addEventListener('focusout', function (e) {
      if (!d.contains(e.relatedTarget)) {
        d.classList.remove('suppress');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close the mobile menu after choosing a link
  Array.prototype.forEach.call(nav.querySelectorAll('.nav-links a'), function (a) {
    a.addEventListener('click', function () { if (mobile.matches) closeMenu(); });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-drop')) closeDrops();
    if (!e.target.closest('.nav')) closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    drops.forEach(function (d) { if (d.contains(document.activeElement)) d.classList.add('suppress'); });
    closeDrops();
    if (nav.classList.contains('menu-open')) { closeMenu(); if (toggle) toggle.focus(); }
  });

  mobile.addEventListener && mobile.addEventListener('change', function () { closeMenu(); closeDrops(); });
})();
