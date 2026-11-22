/* UNBOND · vorläufiges Live-Radar · 08.11.2026
   Ereignis enthält berechnete Werte aus dem jeweiligen Test-IIFE.
   Dieses Modul liest/schreibt keine Antworten, Storage oder Tracking. */
(function () {
  'use strict';
  var latest = null;
  var ready = false;
  var panel, canvas, status, values, key, frame;
  var focusGuard = false;
  var scheduled = false;
  var lastTop = '';
  var lastClearance = '';

  // Nicht defer: Listener muss auch das Initialereignis der Inline-IIFEs erhalten.
  document.addEventListener('unbond:test-radar', function (event) {
    latest = event.detail;
    if (ready) updatePreview();
  });

  function textStatus(d) {
    return 'Vorläufig · ' + d.answered + ' von ' + d.total +
      ' beantwortet · keine vollständige Auswertung.';
  }

  function updatePreview() {
    if (!latest || !canvas || !status) return;
    var d = latest;
    var nextStatus = textStatus(d);
    if (status.textContent !== nextStatus) status.textContent = nextStatus;
    values.textContent = '';
    var descriptions = [];
    d.labels.forEach(function (label, i) {
      var value = d.values[i];
      var valueText = value === null ? 'noch nicht beantwortet' :
        d.kind === 'percent' ? value + '% · ' + d.coverage[i] + '/5 beantwortet' :
          value + ' von ' + d.answered;
      var li = document.createElement('li');
      var name = document.createElement('span');
      var amount = document.createElement('strong');
      name.textContent = (i + 1) + ' ' + label;
      amount.textContent = valueText;
      li.appendChild(name);
      li.appendChild(amount);
      values.appendChild(li);
      descriptions.push(label + ': ' + valueText);
    });
    key.textContent = d.labels.map(function (label, i) { return (i + 1) + ' ' + label; }).join(' · ');
    canvas.setAttribute('aria-label', 'Vorläufiges Spinnendiagramm. ' + descriptions.join('; ') + '.');
    paint();
    scheduleMeasure();
  }

  function paint() {
    if (!canvas || !latest || !frame) return;
    var box = frame.getBoundingClientRect();
    if (box.width < 1 || box.height < 1) return;
    var w = box.width, h = box.height;
    var dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    var cx = w / 2, cy = h / 2;
    var r = Math.max(10, Math.min(w / 2 - 24, h / 2 - 24));
    var d = latest;
    var max = Math.max(1, d.max);
    function point(i, radius) {
      var angle = -Math.PI / 2 + i * Math.PI / 2;
      return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
    }
    function polygon(radius) {
      ctx.beginPath();
      for (var i = 0; i < 4; i++) {
        var p = point(i, radius);
        if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
      }
      ctx.closePath();
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#343434';
    for (var step = 1; step <= 4; step++) {
      polygon(r * step / 4);
      ctx.stroke();
    }
    ctx.font = '500 12px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var axis = 0; axis < 4; axis++) {
      var p = point(axis, r);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p[0], p[1]); ctx.stroke();
      var label = point(axis, r + 16);
      ctx.fillStyle = '#e8e8e8';
      ctx.fillText(String(axis + 1), label[0], label[1]);
    }
    var points = d.values.map(function (value, i) {
      return value === null ? null : point(i, r * Math.max(0, Math.min(max, value)) / max);
    });
    var allKnown = points.every(function (p) { return p !== null; });
    ctx.strokeStyle = '#b4869f';
    ctx.fillStyle = 'rgba(180,134,159,.16)';
    ctx.lineWidth = 2;
    if (allKnown) {
      ctx.beginPath();
      points.forEach(function (p, i) { if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); });
      ctx.closePath(); ctx.fill(); ctx.stroke();
    } else {
      // Fehlende Dimensionen: kein künstlicher Nullpunkt und keine geschlossene Fläche.
      points.forEach(function (p, i) {
        var next = points[(i + 1) % 4];
        if (p && next) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(next[0], next[1]); ctx.stroke(); }
      });
    }
    ctx.fillStyle = '#b4869f';
    points.forEach(function (p) {
      if (!p) return;
      ctx.beginPath(); ctx.arc(p[0], p[1], 3.5, 0, Math.PI * 2); ctx.fill();
    });
  }

  function scheduleMeasure() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(function () { scheduled = false; measure(); });
  }

  function measure() {
    if (!panel) return;
    var body = document.body;
    var bars = document.querySelectorAll('.nt-trust, .trust-bar, header.topnav, .ub-weg, .ub-ktests');
    var bottom = 0;
    for (var i = 0; i < bars.length; i++) {
      var style = window.getComputedStyle(bars[i]);
      if (style.position !== 'fixed' && style.position !== 'sticky') continue;
      var rect = bars[i].getBoundingClientRect();
      if (rect.height > 0 && rect.bottom > 0 && style.display !== 'none') bottom = Math.max(bottom, rect.bottom);
    }
    var top = Math.ceil(bottom) + 8;
    var mobile = window.matchMedia(body.dataset.testRadar === 'toxikometer' ? '(max-width:850px)' : '(max-width:880px)').matches;
    var height = panel.getBoundingClientRect().height;
    var viewport = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    var tooTall = mobile ? height > 200 || viewport - top - height < 260 : viewport - top - height < 16;
    // A short two-column row otherwise clips native sticky at its lower edge.
    // Keep its measured space; pin only while the actual question card is visible.
    {
      var grid = panel.parentElement;
      var question = grid.firstElementChild;
      var gridBox = grid.getBoundingClientRect();
      var questionBox = question.getBoundingClientRect();
      var gap = parseFloat(window.getComputedStyle(grid).columnGap) || 24;
      var tox = document.getElementById('toxikometer');
      var screenQ = document.getElementById('screen-q');
      var done = tox ? tox.classList.contains('is-done') : screenQ && screenQ.getBoundingClientRect().height === 0;
      if (!mobile) {
        body.style.setProperty('--test-radar-row-height', height + 'px');
        body.style.setProperty('--test-radar-left', (questionBox.right + gap) + 'px');
        body.style.setProperty('--test-radar-width', Math.max(0, gridBox.right - questionBox.right - gap) + 'px');
      }
      panel.classList.toggle('test-radar-desktop-fixed', !mobile && !tooTall && !focusGuard && !done &&
        gridBox.top < top && questionBox.bottom > top && questionBox.top < viewport - 32);
    }
    panel.classList.toggle('test-radar-in-flow', tooTall || focusGuard);
    var topValue = top + 'px';
    if (topValue !== lastTop) { body.style.setProperty('--test-radar-top', topValue); lastTop = topValue; }
    var clearance = (top + (mobile && !tooTall && !focusGuard ? height : 0) + 16) + 'px';
    if (clearance !== lastClearance) { body.style.setProperty('--test-radar-clearance', clearance); lastClearance = clearance; }
    if (!tooTall && !focusGuard && document.activeElement) protectFocus({ target: document.activeElement });
  }

  function protectFocus(event) {
    var target = event.target;
    if (!panel || !target.matches || !target.closest('.test-radar-flow, .tox-grid') || panel.contains(target)) return;
    var card = panel.getBoundingClientRect();
    var focused = target.getBoundingClientRect();
    if (card.top < focused.bottom && card.bottom > focused.top && card.left < focused.right && card.right > focused.left) {
      focusGuard = true;
      panel.classList.add('test-radar-in-flow');
      scheduleMeasure();
    }
  }

  function init() {
    var body = document.body;
    if (!body || !body.hasAttribute('data-test-radar')) return;
    panel = document.querySelector('.test-radar-sticky');
    if (!panel) return;
    canvas = document.querySelector('[data-test-radar-canvas]');
    status = document.querySelector('[data-test-radar-status]');
    values = document.querySelector('[data-test-radar-values]');
    key = document.querySelector('[data-test-radar-key]');
    frame = document.querySelector('.test-radar-plot');
    ready = true;
    if (canvas) updatePreview();
    if (body.dataset.testRadar === 'toxikometer') {
      var tox = document.getElementById('toxikometer');
      function syncToxStatus() {
        if (status) status.hidden = tox.classList.contains('is-done');
        scheduleMeasure();
      }
      syncToxStatus();
      new MutationObserver(syncToxStatus).observe(tox, { attributes: true, attributeFilter: ['class'] });
    }
    window.addEventListener('scroll', scheduleMeasure, { passive: true });
    window.addEventListener('resize', function () { paint(); scheduleMeasure(); });
    window.addEventListener('load', function () { paint(); scheduleMeasure(); });
    if (window.visualViewport) window.visualViewport.addEventListener('resize', scheduleMeasure);
    document.addEventListener('focusin', protectFocus);
    document.addEventListener('focusout', function () { focusGuard = false; scheduleMeasure(); });
    var bars = document.querySelectorAll('.nt-trust, .trust-bar, header.topnav, .ub-weg, .ub-ktests');
    var headerObserver = new MutationObserver(scheduleMeasure);
    for (var i = 0; i < bars.length; i++) headerObserver.observe(bars[i], { attributes: true, childList: true, subtree: true });
    if (window.ResizeObserver) {
      var resize = new ResizeObserver(function () { paint(); scheduleMeasure(); });
      resize.observe(panel);
      if (frame) resize.observe(frame);
      for (var j = 0; j < bars.length; j++) resize.observe(bars[j]);
    }
    var screen = document.getElementById('screen-q');
    if (screen) new MutationObserver(function () { paint(); scheduleMeasure(); }).observe(screen, { attributes: true, attributeFilter: ['class'] });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { paint(); scheduleMeasure(); });
    scheduleMeasure();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
