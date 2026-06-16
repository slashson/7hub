/* Gallery photo swap.
   The big slot (.g1) shows the currently-open photo. Clicking a thumbnail
   (.g-thumb) swaps that photo into the big slot — the previously-open photo
   takes the thumbnail's place, so all photos stay reachable and reversible.
   The caption (.m-gallery-label) follows the open photo and is re-rendered on
   language change (the 'langchange' event dispatched by i18n.js). */
(function () {
  'use strict';

  function init() {
    var gallery = document.querySelector('.sec--main .m-gallery');
    if (!gallery) return;
    var big = gallery.querySelector('.g1');
    var label = gallery.querySelector('.m-gallery-label');
    if (!big || !label) return;

    function lang() {
      var l = document.documentElement.lang;
      return (l === 'ru' || l === 'en') ? l : 'uk';
    }

    function renderLabel() {
      label.textContent = big.getAttribute('data-cap-' + lang()) || '';
    }

    // Move the photo + its caption data + alt between the big slot and a thumb.
    function swap(thumb) {
      var ATTRS = ['src', 'alt', 'data-cap-uk', 'data-cap-ru', 'data-cap-en'];
      var thumbVals = ATTRS.map(function (a) { return thumb.getAttribute(a); });
      var bigVals = ATTRS.map(function (a) { return big.getAttribute(a); });

      ATTRS.forEach(function (a, i) {
        thumb.setAttribute(a, bigVals[i]);
        if (a !== 'src') big.setAttribute(a, thumbVals[i]);
      });

      // Fade the big image in once the new photo is ready.
      big.style.opacity = '0';
      var reveal = function () { big.style.opacity = '1'; };
      big.addEventListener('load', reveal, { once: true });
      big.setAttribute('src', thumbVals[0]);
      setTimeout(reveal, 250); // safety if the load event is missed (cached)

      renderLabel();
    }

    gallery.querySelectorAll('.g-thumb').forEach(function (thumb) {
      thumb.addEventListener('click', function () { swap(thumb); });
      thumb.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          swap(thumb);
        }
      });
    });

    document.addEventListener('langchange', renderLabel);
    renderLabel(); // initial caption in the saved language
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
