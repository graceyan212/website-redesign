// Wu's Korean BBQ (editorial) — restrained motion. All effects are opt-out under reduced-motion.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('nav');

  function setNavState() {
    if (nav) nav.classList.toggle('is-solid', window.pageYOffset > 0);
  }

  // Reduced motion: reveal everything immediately, pause autoplay video, do nothing else.
  if (reduce) {
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('is-in'); });
    document.querySelectorAll('video').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
    window.addEventListener('scroll', setNavState, { passive: true });
    setNavState();
    return;
  }

  // Scroll-reveal
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('is-in'); });
  }

  // Nav: transparent at the top of the hero, solid after the first scroll movement.
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.pageYOffset;
      setNavState();
      // Subtle parallax: shift media a little slower than scroll while in view.
      parallaxEls.forEach(function (el) {
        var rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          var shift = (rect.top) * -0.08;
          el.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
        }
      });
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
