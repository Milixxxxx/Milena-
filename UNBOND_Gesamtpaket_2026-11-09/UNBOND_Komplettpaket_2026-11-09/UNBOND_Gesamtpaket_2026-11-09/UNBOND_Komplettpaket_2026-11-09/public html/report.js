/* UNBOND ToxiCometer – Report-Seite (data-page="report").
   Liest die Antworten (Link-Fragment, Verlauf oder localStorage), zeichnet das Spinnendiagramm mit
   derselben Funktion wie der Test und bietet Bild-Download, Link zum Ergebnis und Drucken/PDF an.
   Es wird nichts an einen Server gesendet und keine E-Mail benötigt. */
(function () {
  "use strict";
  if (!document.body || document.body.dataset.page !== "report") return;

  var T = window.__unbondTox;
  var C = window.__unbondReportContent;
  var STORE_KEY = "tox_step_scores";
  var VERSION_KEY = "tox_version";
  var IMAGE_NAME = "UNBOND-ToxiCometer-Ergebnis.png";

  function byId(id) { return document.getElementById(id); }
  function setText(id, text) { var n = byId(id); if (n) n.textContent = text; }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function track(name, params) {
    if (T && typeof T.gtagEvent === "function") {
      T.gtagEvent(name, Object.assign({ event_category: "ToxiCometer" }, params || {}));
    }
  }

  /* ---------- Immer aktiv: Neustart + Heilungskompass-Tracking ---------- */
  var restart = byId("tox-restart-from-report");
  if (restart) {
    restart.addEventListener("click", function () {
      try { localStorage.removeItem(STORE_KEY); localStorage.removeItem(VERSION_KEY); } catch (e) {}
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
      location.href = "toxikometer.html";
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll('a[href*="heilungskompass"]'), function (a) {
    a.addEventListener("click", function () {
      track("heilungskompass_start", { event_category: "Heilungskompass", event_label: "Button geklickt" });
    });
  });

  var emptyBox = byId("report-empty");
  var content = byId("report-content");
  if (!T || !C || !content) {
    if (emptyBox) emptyBox.hidden = false;
    return;
  }

  /* ---------- Antworten laden ---------- */
  var N = T.Q.length;
  function isValid(a) {
    return Array.isArray(a) && a.length === N && a.every(function (v) { return Number.isInteger(v) && v >= 0 && v <= 5; });
  }
  function fromHash() {
    var m = /(?:^|[#&])a=([0-5]+)(?:&|$)/.exec(location.hash || "");
    return m && m[1].length === N ? m[1].split("").map(Number) : null;
  }
  function fromHistory() {
    try { var s = history.state; return s && isValid(s.toxAnswers) ? s.toxAnswers : null; } catch (e) { return null; }
  }
  function fromStorage() {
    try { var a = JSON.parse(localStorage.getItem(STORE_KEY) || "null"); return isValid(a) ? a : null; } catch (e) { return null; }
  }
  function load() {
    var h = fromHash();
    if (h) {
      /* Antworten nur im Verlauf des Tabs merken und das Fragment aus der Adresszeile entfernen */
      try { history.replaceState({ toxAnswers: h }, "", location.pathname + location.search); } catch (e) {}
      return h;
    }
    return fromHistory() || fromStorage();
  }

  var ans = load();
  track("report_page_view", { event_label: "Report Seite geladen" });

  if (!ans) {
    setText("report-title", "Dein ToxiCometer-Report");
    setText("report-meta", "Dein Ergebnis ist in diesem Browser nicht verfügbar.");
    if (emptyBox) emptyBox.hidden = false;
    return;
  }

  /* ---------- Auswertung ---------- */
  var avg = T.avgs(ans);
  var total = ans.reduce(function (a, b) { return a + b; }, 0);
  /* Sonderfall „Wenige Hinweise“ (07.11.2026): dieselbe Regel wie im Test, siehe resultProfile in script.js */
  var prof = T.resultProfile ? T.resultProfile(avg, total) : T.matchProfile(avg);
  var isLow = prof.key === "low" && C.low;
  var detail = isLow ? C.low : (C.profiles[prof.key] || C.profiles.cluster_b_mix);
  /* Für report-results.js (Einordnung, Bereiche, Profil-Überblick) */
  window.__unbondReport = { ans: ans, avg: avg, total: total, prof: prof };

  function fmt(v) { return (Math.round(v * 10) / 10).toFixed(1).replace(".", ","); }
  function levelOf(v) {
    for (var i = 0; i < C.levels.length; i++) { if (v < C.levels[i].max) return C.levels[i].label; }
    return C.levels[C.levels.length - 1].label;
  }

  setText("report-title", "Dein ToxiCometer-Ergebnis ist da.");
  setText("report-meta", "");
  setText("report-profile-name", prof.name);
  setText("report-profile-hint", prof.hint ? "Dein Ergebnis zeigt " + prof.hint + ". Das beschreibt Verhalten, keine Diagnose." : "");
  setText("report-profile-summary", prof.summary);
  setText("report-score-num", String(total));
  setText("report-score-label", T.scoreLabel(total));

  var canvas = byId("report-radar");
  var summaryParts = T.catLabels.map(function (label, i) { return label + " " + fmt(avg[i]) + " von 5"; });
  if (canvas) {
    canvas.setAttribute("aria-label", "Spinnendiagramm deiner fünf Bereiche: " + summaryParts.join(", ") + ".");
  }

  /* Fünf Bereiche als Text (zugleich Textalternative zum Diagramm) */
  var cats = byId("report-cats");
  if (cats) {
    cats.textContent = "";
    T.catLabels.forEach(function (label, i) {
      var li = el("li", "report-cat");
      li.appendChild(el("span", "report-cat-name", label));
      var bar = el("span", "report-cat-bar");
      bar.setAttribute("aria-hidden", "true");
      var fill = el("span", "report-cat-fill");
      fill.style.width = Math.round((avg[i] / 5) * 100) + "%";
      bar.appendChild(fill);
      li.appendChild(bar);
      li.appendChild(el("span", "report-cat-val", fmt(avg[i]) + " / 5 · " + levelOf(avg[i])));
      cats.appendChild(li);
    });
  }

  /* Profil im Detail */
  function buildSafety() {
    var box = el("div", "report-safety");
    box.setAttribute("role", "note");
    box.appendChild(el("h3", null, "Wenn du dich unsicher oder bedroht fühlst"));
    var p = el("p");
    p.appendChild(document.createTextNode("Du musst das nicht allein tragen. Bei akuter Gefahr: Notruf 110. Rund um die Uhr, kostenlos und anonym erreichbar: "));
    var a1 = el("a", null, "Hilfetelefon Gewalt gegen Frauen 08000 116 016");
    a1.href = "tel:08000116016";
    var a2 = el("a", null, "Telefonseelsorge 0800 111 0 111");
    a2.href = "tel:08001110111";
    p.appendChild(a1);
    p.appendChild(document.createTextNode(" · "));
    p.appendChild(a2);
    p.appendChild(document.createTextNode("."));
    box.appendChild(p);
    return box;
  }
  /* Umbau 07.11.2026: Vorsicht- und Schutzhinweis direkt unter dem Kopf,
     der entlastende Satz und der Cliffhanger am Ende der Seite (report-book-card). */
  function renderDetail(host) {
    host.textContent = "";
    if (detail.caution) host.appendChild(el("p", "report-caution", detail.caution));
    if (detail.safety) host.appendChild(buildSafety());
  }
  function renderClose() {
    var noteHost = byId("report-close");
    /* 07.11.2026: statt Trostsatz zwei bis drei Sätze, was das Ergebnis bedeutet (vor dem Weg zum Buch) */
    if (noteHost && detail.meaning) {
      noteHost.textContent = "";
      var note = el("div", "report-note");
      note.appendChild(el("h3", null, "Was dein Ergebnis dir sagt"));
      note.appendChild(el("p", null, detail.meaning));
      noteHost.appendChild(note);
    }
    if (!detail.cliff) return;
    setText("report-cliff", "„" + detail.cliff.text + "“");
    var where = byId("report-cliff-where");
    if (where) {
      where.textContent = "";
      var label = el("span", null, "Die Auflösung steht im Buch · " + detail.cliff.step + " · ");
      label.id = "report-book-title";
      where.appendChild(label);
      where.appendChild(el("em", null, detail.cliff.module));
    }
    var cta = byId("report-book-cta");
    if (cta) cta.setAttribute("data-cliff", prof.key);
  }
  var detailHost = byId("report-detail");
  if (detailHost) renderDetail(detailHost);
  renderClose();

  /* Antworten im Überblick */
  var answersList = byId("report-answers");
  if (answersList) {
    answersList.textContent = "";
    T.Q.forEach(function (q, i) {
      var li = el("li", "report-answer");
      li.appendChild(el("span", "report-answer-cat", q.label));
      li.appendChild(el("span", "report-answer-q", q.q));
      li.appendChild(el("span", "report-answer-score", ans[i] + " von 5"));
      answersList.appendChild(li);
    });
  }

  /* ---------- Diagramm (gleiche Zeichenfunktion wie im Test, volle Größe) ---------- */
  content.hidden = false;
  if (emptyBox) emptyBox.hidden = true;
  function drawRadar() {
    if (canvas) T.drawRadarFrame(avg, { canvas: canvas, full: true });
  }
  drawRadar();
  var resizeRaf = 0;
  window.addEventListener("resize", function () {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(drawRadar);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawRadar);

  /* ---------- Ergebnis als Bild ---------- */
  var status = byId("report-status");
  function setStatus(msg) { if (status) status.textContent = msg; }

  function buildImage() {
    var W = 1080, H = 1350;
    var c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    var x = c.getContext("2d");
    var bg = x.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#131926");
    bg.addColorStop(1, "#0b1019");
    x.fillStyle = bg;
    x.fillRect(0, 0, W, H);
    x.strokeStyle = "rgba(210,166,59,.45)";
    x.lineWidth = 3;
    x.strokeRect(36, 36, W - 72, H - 72);
    x.textAlign = "center";
    x.textBaseline = "alphabetic";
    x.fillStyle = "#d2a63b";
    x.font = "700 30px Poppins, sans-serif";
    x.fillText("UNBOND · TOXICOMETER", W / 2, 120);
    x.fillStyle = "#edebe6";
    x.font = "700 62px 'Playfair Display', Georgia, serif";
    x.fillText(prof.name, W / 2, 200);
    if (prof.hint) {
      x.fillStyle = "#d2a63b";
      x.font = "400 28px Lato, sans-serif";
      x.fillText(prof.hint, W / 2, 248);
    }
    x.fillStyle = "rgba(237,235,230,.78)";
    x.font = "400 34px Lato, sans-serif";
    x.fillText("Score " + total + " / 75 · " + T.scoreLabel(total), W / 2, 295);
    var rc = document.createElement("canvas");
    T.drawRadarFrame(avg, { canvas: rc, full: true, size: 390, dpr: 3 });
    x.drawImage(rc, 60, 330, 960, 960);
    x.fillStyle = "rgba(237,235,230,.6)";
    x.font = "400 25px Lato, sans-serif";
    x.fillText("Selbsttest zur Orientierung – keine Diagnose · unbond.de", W / 2, H - 70);
    return c;
  }
  function downloadCanvas(c) {
    c.toBlob(function (blob) {
      if (!blob) { setStatus("Das Bild konnte nicht erstellt werden. Nutze bitte „Als PDF speichern“."); return; }
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = IMAGE_NAME;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      setStatus("Dein Ergebnis wurde als Bild gespeichert.");
    }, "image/png");
  }
  var imgBtn = byId("report-save-image");
  if (imgBtn) {
    imgBtn.addEventListener("click", function () {
      setStatus("Bild wird erstellt …");
      var fontLoads = ["700 20px Poppins", "700 20px 'Playfair Display'", "400 20px Lato"].map(function (f) {
        return document.fonts && document.fonts.load ? document.fonts.load(f).catch(function () {}) : Promise.resolve();
      });
      Promise.all(fontLoads).then(function () {
        downloadCanvas(buildImage());
        track("report_image_download", { event_label: prof.key });
      });
    });
  }

  /* ---------- Link zum Ergebnis ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      ta.remove();
      if (ok) resolve(); else reject(new Error("copy failed"));
    });
  }
  var linkBtn = byId("report-copy-link");
  var linkField = byId("report-link-field");
  if (linkBtn) {
    linkBtn.addEventListener("click", function () {
      var url = location.href.split("#")[0] + "#a=" + ans.join("");
      if (linkField) {
        linkField.value = url;
        linkField.hidden = false;
      }
      copyText(url).then(function () {
        setStatus("Link kopiert. Wer ihn öffnet, sieht dein Ergebnis – teile ihn nur mit Menschen, denen du vertraust.");
      }, function () {
        setStatus("Kopieren war nicht möglich. Markiere den Link im Feld und kopiere ihn von Hand.");
        if (linkField) linkField.select();
      });
      track("report_link_copy", { event_label: prof.key });
    });
  }

  /* ---------- Drucken / als PDF speichern ---------- */
  window.addEventListener("beforeprint", function () {
    var d = document.querySelector(".report-answers");
    if (d) d.open = true;
  });
  var printBtn = byId("report-print");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      track("report_print", { event_label: prof.key });
      window.print();
    });
  }
})();
