/* UNBOND · Klarheit v0. Keine Speicherung und keine Datenübertragung. */
(() => {
  'use strict';
  const section = document.getElementById('tests');
  if (!section) return;

  if (section.classList.contains('k-direction-a')) {
    const panel = section.querySelector('#k-recommendation');
    const links = Array.from(section.querySelectorAll('[data-question]'));
    const announcement = section.querySelector('.k-announcement');
    links.forEach(link => {
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const id = link.getAttribute('href');
        const target = section.querySelector(id);
        const source = target && target.querySelector('.k-card');
        if (!source || !panel) return;
        event.preventDefault();
        links.forEach(item => {
          item.classList.toggle('is-selected', item === link);
          if (item === link) item.setAttribute('aria-current', 'true');
          else item.removeAttribute('aria-current');
        });
        section.querySelectorAll('.k-list-item').forEach(item => item.classList.toggle('is-selected', item === target));
        const title = source.querySelector('.k-test-title').textContent;
        const description = source.querySelector('.k-description').textContent;
        const after = source.querySelector('.k-after').textContent;
        const number = link.dataset.question.padStart(2, '0');
        const card = panel.querySelector('.k-card');
        panel.querySelector('#k-rec-label').textContent = 'Ein Einstieg zu deiner Frage';
        panel.querySelector('#k-rec-note').textContent = source.dataset.reason;
        card.style.setProperty('--tile-img', source.style.getPropertyValue('--tile-img'));
        card.querySelector('.k-card-top').replaceChildren();
        const label = document.createElement('span');
        label.className = 'k-label';
        label.textContent = `${number} · Nach deiner Frage ausgewählt`;
        card.querySelector('.k-card-top').append(label);
        card.querySelector('.k-test-title').textContent = title;
        card.querySelector('.k-meta').replaceWith(source.querySelector('.k-meta').cloneNode(true));
        card.querySelector('.k-description').textContent = description;
        const resultText = card.querySelector('.k-after');
        resultText.replaceChildren();
        const resultLabel = document.createElement('span');
        resultLabel.className = 'k-label';
        resultLabel.textContent = 'Deine Orientierung';
        resultText.append(resultLabel, document.createTextNode(after));
        card.querySelector('.k-start').replaceWith(source.querySelector('.k-start').cloneNode(true));
        announcement.textContent = `${title}. ${source.dataset.reason} Die Auswahl wurde nicht gespeichert.`;
        const r = panel.getBoundingClientRect();
        if (r.top > innerHeight * .75 || r.bottom < 0) {
          const top = window.scrollY + r.top - 210;
          window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
        }
      });
    });
  }

  if (section.classList.contains('k-direction-b')) {
    const revealHash = () => {
      if (!/^#test-[1-5]$/.test(location.hash)) return;
      const item = section.querySelector(location.hash);
      const details = item && item.querySelector('.k-test-detail');
      if (details) details.open = true;
    };
    revealHash();
    window.addEventListener('hashchange', revealHash);
  }
})();
