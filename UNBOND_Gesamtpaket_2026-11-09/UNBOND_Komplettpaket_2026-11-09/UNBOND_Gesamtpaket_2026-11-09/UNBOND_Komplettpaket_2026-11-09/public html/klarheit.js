/* UNBOND · Klarheit · Frage zuerst. Keine Speicherung, keine Datenübertragung. */
(() => {
  'use strict';
  const section = document.getElementById('tests');
  if (!section) return;
  const panel = section.querySelector('#k-recommendation');
  const links = Array.from(section.querySelectorAll('[data-question]'));
  const announcement = section.querySelector('.k-announcement');
  if (!panel || !links.length) return;

  const stickyOffset = () => {
    let bottom = 0;
    document.querySelectorAll('.nt-trust, .topnav, .ub-weg').forEach(element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      if ((style.position === 'fixed' || style.position === 'sticky') && rect.top < 240 && rect.bottom > 0) {
        bottom = Math.max(bottom, rect.bottom);
      }
    });
    return bottom + 16;
  };

  links.forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const target = section.querySelector(link.getAttribute('href'));
      const source = target && target.querySelector('.k-card');
      if (!source) return; // Real anchor navigation remains the fallback.
      event.preventDefault();
      links.forEach(item => {
        item.classList.toggle('is-selected', item === link);
        if (item === link) item.setAttribute('aria-current', 'true');
        else item.removeAttribute('aria-current');
      });
      section.querySelectorAll('.k-list-item').forEach(item => item.classList.toggle('is-selected', item === target));
      const card = panel.querySelector('.k-card');
      const heading = card.querySelector('.k-test-title');
      const title = source.querySelector('.k-test-title').textContent.trim();
      const number = link.dataset.question.padStart(2, '0');
      panel.querySelector('#k-rec-label').textContent = 'Ein Einstieg zu deiner Frage';
      panel.querySelector('#k-rec-note').textContent = source.dataset.reason;
      card.style.setProperty('--tile-img', source.style.getPropertyValue('--tile-img'));
      card.querySelector('.k-card-top').replaceChildren();
      const label = document.createElement('span');
      label.className = 'k-label';
      label.textContent = `${number} · Nach deiner Frage ausgewählt`;
      card.querySelector('.k-card-top').append(label);
      heading.textContent = title;
      card.querySelector('.k-meta').replaceWith(source.querySelector('.k-meta').cloneNode(true));
      card.querySelector('.k-description').textContent = source.querySelector('.k-description').textContent.trim();
      const topics = source.querySelector('.k-topics');
      const panelTopics = card.querySelector('.k-topics');
      panelTopics.hidden = !topics;
      panelTopics.textContent = topics ? topics.textContent.trim() : '';
      const resultText = card.querySelector('.k-after');
      resultText.replaceChildren();
      const resultLabel = document.createElement('span');
      resultLabel.className = 'k-label';
      resultLabel.textContent = 'Deine Orientierung';
      resultText.append(resultLabel, document.createTextNode(source.querySelector('.k-after').textContent.trim()));
      const nextAction = source.querySelector('.k-start').cloneNode(true);
      nextAction.setAttribute('aria-describedby', 'k-rec-note k-rec-after');
      card.querySelector('.k-start').replaceWith(nextAction);
      announcement.textContent = `${title} wurde nach deiner Frage ausgewählt. Die Auswahl wird nicht gespeichert.`;

      // Explicit navigation to the suggestion; next Tab leads to its start link.
      heading.focus({ preventScroll: true });
      const rect = panel.getBoundingClientRect();
      window.scrollTo({ top: Math.max(0, window.scrollY + rect.top - stickyOffset()), behavior: 'instant' });
    });
  });
})();
