/* UNBOND · ausführliche, bereits gelieferte Profiltexte; kein neuer Test und keine E-Mail-Schranke.
   Keine Wiederherstellung des entfernten Mustervergleichs, Kreis-Widgets oder Fahrplans. */
(function () {
  'use strict';
  var R = window.__unbondReport;
  var C = window.__unbondReportContent;
  if (!R || !C) return;
  var host = document.getElementById('report-detail');
  var detail = R.prof.key === 'low' ? C.low : C.profiles[R.prof.key];
  function node(tag, cls, value) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (value) n.textContent = value;
    return n;
  }
  var title = document.getElementById('report-title');
  if (title) title.textContent = 'Dein ausführlicher ToxiCometer-Report';
  var hint = document.getElementById('report-profile-hint');
  if (hint) hint.textContent = '';

  if (host && detail && Array.isArray(detail.signs)) {
    var section = node('section', 'report-card report-long-profile');
    section.setAttribute('aria-labelledby', 'report-long-title');
    section.appendChild(node('p', 'eyebrow', 'Dein Muster genauer betrachten'));
    var h = node('h2', '', 'Was sich im Alltag zeigen kann');
    h.id = 'report-long-title'; section.appendChild(h);
    if (detail.lead) section.appendChild(node('p', 'report-long-lead', detail.lead));
    section.appendChild(node('p', 'report-long-context', 'Die folgenden Beispiele sind keine zusätzlichen Testergebnisse und keine Diagnose. Prüfe in Ruhe, welche davon zu deinen eigenen Erfahrungen passen.'));
    section.appendChild(node('h3', '', 'Mögliche Anzeichen'));
    var list = node('ul', 'report-long-signs');
    detail.signs.forEach(function (sign) {
      list.appendChild(node('li', '', sign.replace('Rolle als ewiges Opfer:', 'Häufige Schuldzuweisungen:')));
    });
    section.appendChild(list);
    if (Array.isArray(detail.phases) && detail.phases.length) {
      var fold = node('details', 'report-long-phases');
      fold.appendChild(node('summary', '', 'Wie sich eine solche Dynamik entwickeln kann'));
      var phases = node('ol', 'report-long-phase-list');
      detail.phases.forEach(function (phase) {
        var li = node('li', '');
        li.appendChild(node('h3', '', phase.title));
        li.appendChild(node('p', '', phase.text));
        phases.appendChild(li);
      });
      fold.appendChild(phases); section.appendChild(fold);
    }
    host.appendChild(section);
  }

  var topics = [
    'Gaslighting und Zweifel an der eigenen Wahrnehmung',
    'Kontrolle, Erreichbarkeit und Isolation',
    'Abwertung, Vergleiche und das Gefühl, sich Zuneigung verdienen zu müssen',
    'Unberechenbarkeit, On-Off und Alarmbereitschaft',
    'Einseitigkeit, Schuldumkehr und den Raum für deine Bedürfnisse'
  ];
  Array.prototype.forEach.call(document.querySelectorAll('.report-area-panel'), function (panel) {
    var i = parseInt(panel.id.replace('area-panel-', ''), 10);
    if (!Number.isInteger(i) || !C.areas[i]) return;
    var what = panel.querySelector('.report-area-what');
    var values = R.ans.slice(i * 3, i * 3 + 3);
    if (what) what.textContent = values.every(function (v) { return v === 0; })
      ? 'Du hast alle drei Aussagen in diesem Bereich mit „trifft nicht zu“ bewertet. Der Test zeigt hier keine von dir bestätigten Hinweise; Belastungen außerhalb dieser Fragen werden damit nicht ausgeschlossen.'
      : 'Hier geht es um ' + topics[i] + '. Deine konkreten Antworten findest du unten – sie sind die Grundlage für deine Einordnung.';
    var printTitle = node('h3', 'report-print-title', C.areas[i].title);
    panel.insertBefore(printTitle, panel.firstChild);
  });
  if (Math.max.apply(null, R.avg) <= 1.5) {
    var flag = document.querySelector('.report-area-tab-flag');
    if (flag) flag.textContent = 'Bereich ansehen';
  }

  var openedForPrint = [];
  window.addEventListener('beforeprint', function () {
    openedForPrint = Array.prototype.filter.call(document.querySelectorAll('.report-long-phases'), function (d) { return !d.open; });
    openedForPrint.forEach(function (d) { d.open = true; });
  });
  window.addEventListener('afterprint', function () {
    openedForPrint.forEach(function (d) { d.open = false; }); openedForPrint = [];
  });
})();
