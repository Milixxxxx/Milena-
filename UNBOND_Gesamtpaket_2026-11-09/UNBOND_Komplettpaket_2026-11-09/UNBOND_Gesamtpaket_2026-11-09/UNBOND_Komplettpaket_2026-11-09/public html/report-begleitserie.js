/* Lädt Brevo erst nach ausdrücklichem Anzeigen; übergibt keine Reportdaten. */
(function () {
  'use strict';
  var toggle = document.getElementById('report-begleitserie-toggle');
  var frame = document.getElementById('report-begleitserie-formular');
  var fallback = document.querySelector('.report-begleitserie-fallback');
  if (!toggle || !frame || !fallback) return;

  toggle.addEventListener('click', function () {
    var show = frame.hidden;
    if (show && !frame.hasAttribute('src')) {
      frame.setAttribute('src', frame.getAttribute('data-src'));
    }
    frame.hidden = !show;
    fallback.hidden = !show;
    toggle.setAttribute('aria-expanded', String(show));
    toggle.textContent = show ? 'Anmeldeformular ausblenden' : 'Anmeldeformular anzeigen';
  });
})();
