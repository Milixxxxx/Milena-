/* UNBOND ToxiCometer – Ergänzungen der Ergebnisseite (report.html)
   1) Einordnung des Gesamtscores, 2) fünf Bereiche als Reiter. Kreislauf, Muster-Abgleich und Fahrplan am 07.11.2026 entfernt (Entscheidung Milena).
   Liest window.__unbondReport (von report.js), window.__unbondTox (script.js) und window.__unbondReportContent.
   Nichts wird gespeichert oder gesendet. */
(function () {
  "use strict";
  var R = window.__unbondReport;
  var T = window.__unbondTox;
  var C = window.__unbondReportContent;
  if (!R || !T || !C) return;

  function byId(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function fmt(v) { return (Math.round(v * 10) / 10).toFixed(1).replace(".", ","); }
  function levelIndex(v) {
    for (var i = 0; i < C.levels.length; i++) { if (v < C.levels[i].max) return i; }
    return C.levels.length - 1;
  }

  /* ---------- 1) Einordnung des Gesamtscores ---------- */
  function renderTier() {
    var host = byId("report-tier");
    if (!host || !C.tiers) return;
    var tier = C.tiers[C.tiers.length - 1];
    for (var i = 0; i < C.tiers.length; i++) {
      if (R.total <= C.tiers[i].max) { tier = C.tiers[i]; break; }
    }
    host.textContent = "";
    /* Titel der Stufe steht schon unter dem Score, hier nur Skala und ein Satz */
    var scale = el("ol", "report-scale");
    scale.setAttribute("aria-label", "Skala der Gesamtauswertung");
    C.tiers.forEach(function (t) {
      var li = el("li", t === tier ? "is-on" : "", t.title.replace(" Toxizität", ""));
      if (t === tier) li.setAttribute("aria-current", "true");
      scale.appendChild(li);
    });
    host.appendChild(scale);
    host.appendChild(el("p", null, tier.text));
  }

  function localEvent(root, name, detail) {
    try { root.dispatchEvent(new CustomEvent("unbond:report:" + name, { bubbles: true, detail: detail })); } catch (e) {}
  }

  /* ---------- 2) Fünf Bereiche als Reiter (ersetzt Häkchenlisten und Antworten-Überblick, 06.11.2026) ----------
     Gleiche Namen wie im Test. Sortiert nach den eigenen Antworten. Keine Zahlen, keine Stufen:
     gezeigt werden die eigenen Antworten in Worten und das passende Kapitel im Buch. */
  function buildAreaPanel(i, panelId, tabId) {
    var a = C.areas[i];
    var m = C.modules && C.modules[i];
    var panel = el("div", "report-area-panel");
    panel.id = panelId;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tabId);
    panel.tabIndex = 0;
    panel.appendChild(el("p", "report-area-sub", a.sub));
    panel.appendChild(el("p", "report-area-what", a.what));

    var list = el("ul", "report-area-answers");
    list.setAttribute("aria-label", "Deine Antworten in diesem Bereich");
    var qs = [];
    T.Q.forEach(function (q, qi) { if (q.cat === i) qs.push(qi); });
    qs.forEach(function (qi, k) {
      var v = R.ans[qi];
      var li = el("li", "report-area-answer is-v" + v);
      li.appendChild(el("span", "report-area-answer-q", (a.short && a.short[k]) || T.Q[qi].q));
      li.appendChild(el("span", "report-area-answer-v", C.answerWords[v] || ""));
      li.title = T.Q[qi].q;
      list.appendChild(li);
    });
    panel.appendChild(list);

    if (m) {
      var book = el("p", "report-area-book");
      book.appendChild(el("span", "report-area-book-step", "Im Buch · " + m.step));
      book.appendChild(el("strong", null, m.module));
      book.appendChild(el("span", null, "hilft dir, " + m.help + "."));
      panel.appendChild(book);
    }
    return panel;
  }
  function renderAreas() {
    var host = byId("report-areas-list");
    if (!host || !C.areas) return;
    host.textContent = "";
    var order = R.avg.map(function (v, i) { return i; }).sort(function (x, y) { return R.avg[y] - R.avg[x] || x - y; });
    var tablist = el("div", "report-area-tabs");
    tablist.setAttribute("role", "tablist");
    tablist.setAttribute("aria-label", "Deine fünf Bereiche, sortiert nach deinen Antworten");
    var tabs = [], panels = [];
    order.forEach(function (i, pos) {
      var tabId = "area-tab-" + i, panelId = "area-panel-" + i;
      var tab = el("button", "report-area-tab");
      tab.type = "button";
      tab.id = tabId;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", panelId);
      tab.appendChild(el("span", "report-area-tab-name", C.areas[i].title));
      if (pos === 0) tab.appendChild(el("span", "report-area-tab-flag", "am meisten erkannt"));
      tabs.push(tab);
      tablist.appendChild(tab);
      panels.push(buildAreaPanel(i, panelId, tabId));
    });
    function select(k, focus) {
      tabs.forEach(function (t, j) {
        var on = j === k;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[k].focus();
      localEvent(host, "bereich", { bereich: order[k] });
    }
    tabs.forEach(function (t, k) {
      t.addEventListener("click", function () { select(k, false); });
      t.addEventListener("keydown", function (e) {
        var n = tabs.length, key = e.key, to = null;
        if (key === "ArrowRight" || key === "ArrowDown") to = (k + 1) % n;
        if (key === "ArrowLeft" || key === "ArrowUp") to = (k + n - 1) % n;
        if (key === "Home") to = 0;
        if (key === "End") to = n - 1;
        if (to !== null) { e.preventDefault(); select(to, true); }
      });
    });
    host.appendChild(tablist);
    panels.forEach(function (p) { host.appendChild(p); });
    select(0, false);
  }

  renderTier();
  renderAreas();
})();
