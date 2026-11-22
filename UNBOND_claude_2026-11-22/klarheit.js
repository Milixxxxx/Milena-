/* UNBOND · Klarheit · Kacheln als Reiter. Keine Speicherung, keine Datenübertragung.
   Ohne JavaScript bleiben die Kacheln normale Sprunglinks zu den vier Beschreibungen. */
(() => {
  'use strict';
  const wahl = document.getElementById('k-wahl');
  if (!wahl) return;
  const tabs = Array.from(wahl.querySelectorAll('.k-kachel'));
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('href').slice(1)));
  const announcement = wahl.querySelector('.k-announcement');
  if (!tabs.length || panels.some(panel => !panel)) return;

  const SICHTBAR_ANTEIL = 0.55;
  const ABSTAND_OBEN = 12;
  const kacheln = wahl.querySelector('.k-kacheln');

  /** @returns {number} Unterkante der oben klebenden Leisten in Pixeln. */
  const klebeHoehe = () => {
    let unten = 0;
    document.querySelectorAll('.nt-trust, .topnav, .ub-weg').forEach(element => {
      const position = getComputedStyle(element).position;
      const rect = element.getBoundingClientRect();
      if ((position === 'fixed' || position === 'sticky') && rect.top < 240 && rect.bottom > 0) {
        unten = Math.max(unten, rect.bottom);
      }
    });
    return unten;
  };
  wahl.classList.add('is-tabs');
  wahl.querySelector('.k-kacheln').setAttribute('role', 'tablist');
  wahl.querySelector('.k-kacheln').setAttribute('aria-label', 'Selbsttests');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
  });

  const waehle = (index, { ansage = false, fokus = false } = {}) => {
    tabs.forEach((tab, i) => {
      const aktiv = i === index;
      tab.setAttribute('aria-selected', String(aktiv));
      tab.tabIndex = aktiv ? 0 : -1;
      panels[i].inert = !aktiv;
    });
    if (fokus) tabs[index].focus({ preventScroll: true });
    if (!ansage) return;
    const name = tabs[index].querySelector('.k-kachel-name').textContent.trim();
    announcement.textContent = `${name} ausgewählt. Die Beschreibung steht unter den Kacheln.`;
    // Liegt die Beschreibung zu weit unten, gleiten die Kacheln sichtbar nach oben. Sie bleiben im Bild.
    if (panels[index].getBoundingClientRect().top > window.innerHeight * SICHTBAR_ANTEIL) {
      const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ziel = window.scrollY + kacheln.getBoundingClientRect().top - klebeHoehe() - ABSTAND_OBEN;
      window.scrollTo({ top: Math.max(0, ziel), behavior: ruhig ? 'auto' : 'smooth' });
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      waehle(index, { ansage: true });
    });
    tab.addEventListener('keydown', event => {
      const schritt = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
      let ziel = null;
      if (schritt) ziel = (index + schritt + tabs.length) % tabs.length;
      else if (event.key === 'Home') ziel = 0;
      else if (event.key === 'End') ziel = tabs.length - 1;
      else if (event.key === ' ') ziel = index;
      if (ziel === null) return;
      event.preventDefault();
      waehle(ziel, { ansage: true, fokus: true });
    });
  });

  const ausAdresse = () => panels.findIndex(panel => `#${panel.id}` === window.location.hash);
  waehle(Math.max(0, ausAdresse()));
  window.addEventListener('hashchange', () => {
    const index = ausAdresse();
    if (index >= 0) waehle(index, { ansage: true });
  });
})();
