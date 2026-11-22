/* UNBOND · Seitenadapter. Fragen, Profilauswertung und Live-Diagramm bleiben in script.js. */
(function () {
  'use strict';
  var root = document.getElementById('toxikometer');
  var banner = document.getElementById('tox-result-banner');
  var T = window.__unbondTox;
  if (!root || !banner || !T) return;

  function text(id, value) {
    var n = document.getElementById(id);
    if (n && n.textContent !== value) n.textContent = value;
  }
  function profile() {
    var n = document.getElementById('tox-profile');
    var name = n ? n.textContent : '';
    var found = null;
    Object.keys(T.profiles).some(function (key) {
      if (T.profiles[key].name === name) { found = Object.assign({ key: key }, T.profiles[key]); return true; }
      return false;
    });
    return found || T.resultProfile(T.avgs(Array(15).fill(0)), 0);
  }
  function shortSummary(p) {
    if (p.key === 'cluster_b_mix') {
      return 'Deine Antworten zeigen wechselnde Muster aus Abwertung, Kontrolle, Manipulation und emotionaler Unberechenbarkeit. Das ist eine Orientierung, keine Diagnose. Im Report siehst du deine fünf Bereiche und mögliche nächste Schritte.';
    }
    var main = (p.summary || '').trim();
    var sentences = main.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [main];
    if (sentences.length >= 3) return sentences.slice(0, 3).join('').trim();
    if (!/keine Diagnose/i.test(main)) main += ' Der Selbsttest bietet Orientierung, keine Diagnose.';
    if (sentences.length < 2) main += ' Im Report siehst du die fünf Bereiche und Hinweise für deinen nächsten Schritt.';
    return main;
  }
  function update() {
    if (!root.classList.contains('is-done')) return;
    var p = profile();
    text('tox-result-name', p.name);
    text('tox-result-summary', shortSummary(p));
    Array.prototype.forEach.call(banner.querySelectorAll('.tox-safe a'), function (a) {
      var original = a.textContent;
      var formatted = original.replace('08000 116 016', '08000\u00a0116\u00a0016').replace('0800 111 0 111', '0800\u00a0111\u00a00\u00a0111');
      if (formatted !== original) a.textContent = formatted;
    });
    var totalNode = document.getElementById('tox-total');
    var total = totalNode ? parseInt(totalNode.textContent, 10) : NaN;
    if (Number.isFinite(total)) {
      var label = 'Score: ' + total + '/75 · ' + T.scoreLabel(total);
      text('tox-result-score', label);
    }
  }
  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    Promise.resolve().then(function () { scheduled = false; update(); });
  }
  var observer = new MutationObserver(schedule);
  observer.observe(banner, { childList: true, characterData: true, subtree: true });
  observer.observe(root, { attributes: true, attributeFilter: ['class'] });
  update();
  var link = document.getElementById('tox-report-open');
  if (link) link.addEventListener('click', function () {
    if (typeof window.__unbondTrack === 'function') {
      window.__unbondTrack('klarheit_weiter_click', { cta_location: 'toxikometer_result', ziel: 'report' });
    }
  });
})();
