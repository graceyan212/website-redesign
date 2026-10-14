// Menu page: highlight the category chip for the section currently in view.
(function () {
  'use strict';
  var links = Array.prototype.slice.call(document.querySelectorAll('.catbar a'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('is-active'); });
        var a = map[e.target.id];
        if (a) {
          a.classList.add('is-active');
          a.scrollIntoView({ inline: 'nearest', block: 'nearest' });
        }
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('.mcat').forEach(function (s) { io.observe(s); });
})();
