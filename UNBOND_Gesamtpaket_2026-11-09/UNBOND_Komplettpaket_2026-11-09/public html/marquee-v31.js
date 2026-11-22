(() => {
  'use strict';
  const button = document.querySelector('[data-quote-pause]');
  const band = document.querySelector('#recognition-quotes');
  if (!button || !band) return;

  button.addEventListener('click', () => {
    const paused = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(paused));
    button.textContent = paused ? 'Bewegung fortsetzen' : 'Bewegung anhalten';
    band.classList.toggle('is-paused', paused);
  });

  document.addEventListener('visibilitychange', () => {
    band.classList.toggle('is-hidden', document.hidden);
  });
})();
