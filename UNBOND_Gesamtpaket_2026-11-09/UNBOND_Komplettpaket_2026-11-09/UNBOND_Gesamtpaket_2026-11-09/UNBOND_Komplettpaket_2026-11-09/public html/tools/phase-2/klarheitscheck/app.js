/* UNBOND Tools · Klarheitscheck „Was vermisse ich wirklich?“ · v0.1
   Alle Antworten bleiben im localStorage dieses Browsers. Nichts wird übertragen. */
(function () {
  "use strict";

  /* Nur Bedürfnisse – keine Eigenschaften der Person (früher „Ihr Humor“, „Ihre Stimme“) */
  var ITEMS = ["Nähe", "Gesehen werden", "Sicherheit", "Zugehörigkeit", "Verlässlichkeit", "Zärtlichkeit",
    "Lebendigkeit", "Eine gemeinsame Zukunft", "Jemand, der zu mir hält", "Gemeinsamer Alltag", "Wertschätzung", "Ruhe"];
  var CATS = ["", "Benennen", "Auswählen", "Prüfen", "Erkenntnis", "Zurückholen"];
  var KEY = "unbond_klarheitscheck_v1";
  var EMPTY = function () { return { missing: "", selected: [], ratings: {}, back: "", step: "", card: "", cardStep: "" }; };
  var S = EMPTY();
  var rateIdx = 0, cyc = 0, round = 1;

  function $(id) { return document.getElementById(id); }
  function load() { try { var r = localStorage.getItem(KEY); if (r) { var o = JSON.parse(r); Object.keys(S).forEach(function (k) { if (o[k] !== undefined) S[k] = o[k]; }); S.selected = S.selected.filter(function (i) { return ITEMS.indexOf(i) > -1; }); return true; } } catch (e) {} return false; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function wipe() { try { localStorage.removeItem(KEY); } catch (e) {} }
  function live(t) { $("tool-live").textContent = t; }

  function waited() { return S.selected.filter(function (i) { return S.ratings[i] === "manchmal" || S.ratings[i] === "selten"; }); }
  function there() { return S.selected.filter(function (i) { return S.ratings[i] === "verlaesslich"; }); }
  function complete() { return S.selected.length >= 3 && S.selected.every(function (i) { return S.ratings[i]; }); }

  /* ---------- Navigation ---------- */
  function show(n) {
    for (var i = 0; i <= 6; i++) { $("v" + i).hidden = i !== n; }
    var pr = $("prog");
    if (n >= 1 && n <= 5) {
      pr.hidden = false;
      $("prog-count").textContent = "Schritt 0" + n + " / 05";
      $("prog-cat").textContent = CATS[n];
      $("track-fill").style.width = (n / 5 * 100) + "%";
      $("track").setAttribute("aria-valuenow", n);
    } else { pr.hidden = true; }
    window.scrollTo(0, 0);
    var h = $("v" + n).querySelector("h1,h2");
    if (h) { try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } }
  }
  function go(n) {
    n = +n;
    if (n >= 4 && !complete()) { n = S.selected.length >= 3 ? 3 : 2; }
    if (n === 1) { $("f-missing").value = S.missing; }
    if (n === 2) { renderChips(); }
    if (n === 3) { rateIdx = 0; renderRate(); }
    if (n === 4) { renderInsight(); }
    if (n === 5) { renderBack(); }
    if (n === 6) { renderOverview(); }
    show(n);
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-go]"); if (b) { go(b.getAttribute("data-go")); }
  });

  /* ---------- 1 · Benennen ---------- */
  $("next1").addEventListener("click", function () { S.missing = $("f-missing").value.trim(); save(); go(2); });
  $("f-missing").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); $("next1").click(); } });

  /* ---------- 2 · Auswählen ---------- */
  function chip(label, pressed, onClick) {
    var li = document.createElement("li"), b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.textContent = label; b.setAttribute("aria-pressed", pressed ? "true" : "false");
    b.addEventListener("click", onClick); li.appendChild(b); return li;
  }
  function renderChips() {
    var ul = $("chips"); ul.innerHTML = "";
    ITEMS.forEach(function (it) {
      ul.appendChild(chip(it, S.selected.indexOf(it) > -1, function () {
        var i = S.selected.indexOf(it);
        if (i > -1) { S.selected.splice(i, 1); delete S.ratings[it]; } else { S.selected.push(it); }
        this.setAttribute("aria-pressed", i > -1 ? "false" : "true"); save(); counter();
      }));
    });
    counter();
  }
  function counter() {
    var n = S.selected.length, c = $("counter");
    c.textContent = n >= 3 ? n + " gewählt" : n + " gewählt · noch " + (3 - n);
    c.classList.toggle("ok", n >= 3); $("next2").disabled = n < 3;
  }
  $("next2").addEventListener("click", function () { go(3); });

  /* ---------- 3 · Prüfen ---------- */
  function renderRate() {
    var it = S.selected[rateIdx];
    $("rate-item").textContent = "„" + it + "“";
    $("rate-pos").textContent = (rateIdx + 1) + " von " + S.selected.length;
    [].forEach.call(document.querySelectorAll("[data-rate]"), function (b) {
      b.setAttribute("aria-pressed", S.ratings[it] === b.getAttribute("data-rate") ? "true" : "false");
    });
  }
  [].forEach.call(document.querySelectorAll("[data-rate]"), function (b) {
    b.addEventListener("click", function () {
      S.ratings[S.selected[rateIdx]] = b.getAttribute("data-rate"); save();
      b.setAttribute("aria-pressed", "true");
      setTimeout(function () {
        if (rateIdx < S.selected.length - 1) { rateIdx++; renderRate(); live((rateIdx + 1) + " von " + S.selected.length); }
        else { go(4); }
      }, 220);
    });
  });
  $("back3").addEventListener("click", function () { if (rateIdx > 0) { rateIdx--; renderRate(); } else { go(2); } });

  /* ---------- 4 · Erkenntnis ---------- */
  function headline(w, t) {
    if (!w.length) return "Vieles davon war wirklich da.";
    if (w.length > t.length) return "Vieles, was du vermisst, hast du nur manchmal bekommen.";
    return "Einiges war da. Auf anderes hast du gewartet.";
  }
  function fill(ul, arr, empty) {
    ul.innerHTML = "";
    if (!arr.length) { var e = document.createElement("li"); e.style.color = "var(--outline)"; e.textContent = empty; ul.appendChild(e); return; }
    arr.forEach(function (x) { var li = document.createElement("li"); li.textContent = x; ul.appendChild(li); });
  }
  var PHASES = [
    ["Hoch", function (x) { return "„" + x + "“ ist plötzlich da"; }, "Erleichterung, ein starkes Hoch. Du denkst: Jetzt wird es gut."],
    ["Alarm", function (x) { return "„" + x + "“ bleibt wieder aus"; }, "Rückzug, Kälte oder Streit. Dein Körper schaltet auf Alarm."],
    ["Hoffen", function () { return "Du wartest und strengst dich an"; }, "Du suchst den Fehler bei dir und hoffst auf das nächste Mal."],
    ["Erleichterung", function (x) { return "„" + x + "“ kommt zurück"; }, "Die Erleichterung fühlt sich oft noch stärker an als beim ersten Mal."]
  ];
  function cycleWord() { return waited()[0] || "Nähe"; }
  function renderCycle() {
    var x = cycleWord(), ph = PHASES[cyc];
    $("c-phase").textContent = (cyc + 1) + " / 4 · " + ph[0];
    $("c-title").textContent = ph[1](x);
    $("c-text").textContent = ph[2];
    $("round").textContent = "Runde " + round;
    [].forEach.call(document.querySelectorAll(".dots i"), function (d, i) { d.classList.toggle("on", i <= cyc); });
    $("c-next").innerHTML = cyc < 3
      ? '<span>Was passiert dann?</span><svg class="ms" width="14" height="14" aria-hidden="true"><use href="#i-chevron_right"></use></svg>'
      : '<span>Noch eine Runde</span><svg class="ms" width="14" height="14" aria-hidden="true"><use href="#i-restart_alt"></use></svg>';
  }
  $("c-next").addEventListener("click", function () { if (cyc < 3) { cyc++; } else { cyc = 0; round++; } renderCycle(); });

  function renderInsight() {
    var w = waited(), t = there();
    $("t4").textContent = headline(w, t);
    fill($("list-there"), t, "Nichts davon kam verlässlich.");
    fill($("list-wait"), w, "Nichts. Vieles war wirklich da.");
    $("quote4").textContent = w.length
      ? "Du vermisst nicht nur, was war. Du vermisst, worauf du gewartet hast."
      : "Deine Trauer ist echt. Und was du vermisst, gehört dir auch ohne sie.";
    /* Erklärteil nur, wenn „manchmal/selten“ überwiegt (moreWait) – sonst keine Einordnung als Muster */
    var moreWait = w.length > t.length;
    $("tb").hidden = !moreWait;
    $("tb-note").hidden = !moreWait;
    $("one-wait").hidden = !(w.length > 0 && !moreWait);
    $("one-wait-text").textContent = (w.length === 1 ? "Eine Sache kam nur manchmal." : "Manches kam nur manchmal, anderes war verlässlich da.") + " Das allein ist noch kein Muster – aber es lohnt sich, genauer hinzuschauen, warum gerade das dir so fehlt.";
    if (moreWait) {
      $("tb-lead").textContent = "Wenn „" + cycleWord() + "“ nur manchmal kommt, bindet das oft stärker als Verlässlichkeit. Das nennt man intermittierende Verstärkung. Es kann ein Teil von Trauma Bonding sein.";
      cyc = 0; round = 1; renderCycle();
    }
  }
  $("back4").addEventListener("click", function () { rateIdx = S.selected.length - 1; renderRate(); show(3); });

  /* ---------- 5 · Zurückholen ---------- */
  function renderBack() {
    var ul = $("chips5"); ul.innerHTML = "";
    var opts = waited().length ? waited() : S.selected.slice();
    if (S.back && opts.indexOf(S.back) < 0) { S.back = ""; }
    opts.forEach(function (it) {
      ul.appendChild(chip(it, S.back === it, function () { S.back = (S.back === it) ? "" : it; save(); renderBack(); }));
    });
    $("l-step").textContent = S.back ? "Mein kleiner Schritt zu „" + S.back + "“" : "Mein kleiner Schritt";
    $("f-step").value = S.step;
  }
  $("f-step").addEventListener("input", function () { S.step = this.value; save(); });

  /* ---------- 6 · Überblick ---------- */
  function renderOverview() {
    var w = waited(), t = there();
    $("t6").textContent = headline(w, t);
    $("o-missing").textContent = S.missing || "–";
    $("o-there").textContent = t.join(" · ") || "–";
    $("o-wait").textContent = w.join(" · ") || "–";
    $("o-step").textContent = (S.back ? S.back + ": " : "") + (S.step || "–");
    if (!S.card) { S.card = w.length ? "Ich vermisse nicht nur sie. Ich vermisse, worauf ich gewartet habe." : "Was ich vermisse, gehört mir auch ohne sie."; }
    if (!S.cardStep) { S.cardStep = S.step || ""; }
    $("f-card").value = S.card; $("f-card-step").value = S.cardStep; save();
  }
  $("f-card").addEventListener("input", function () { S.card = this.value; save(); });
  $("f-card-step").addEventListener("input", function () { S.cardStep = this.value; save(); });
  $("print-btn").addEventListener("click", function () { window.print(); });

  function reset(ask) {
    if (ask && !window.confirm("Alle Antworten auf diesem Gerät löschen und neu beginnen?")) return;
    wipe(); S = EMPTY(); $("resume").hidden = true; $("card-preview").hidden = true; go(0);
  }
  $("reset-data").addEventListener("click", function () { reset(true); });
  $("reset-btn").addEventListener("click", function () { reset(true); });

  /* ---------- Merkkarte 1080 × 1920 im Tool-Design ---------- */
  function wrapText(ctx, text, x, y, maxW, lh) {
    var words = String(text).split(/\s+/), line = "", lines = [];
    words.forEach(function (w) { var t = line ? line + " " + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else { line = t; } });
    if (line) lines.push(line);
    lines.forEach(function (l, i) { ctx.fillText(l, x, y + i * lh); });
    return y + lines.length * lh;
  }
  function drawCard() {
    var c = document.createElement("canvas"); c.width = 1080; c.height = 1920;
    var x = c.getContext("2d");
    var HEAD = '"Space Grotesk", system-ui, sans-serif', BODY = '"Plus Jakarta Sans", system-ui, sans-serif', MONO = '"Space Mono", ui-monospace, monospace';
    x.fillStyle = "#0f141b"; x.fillRect(0, 0, 1080, 1920);
    x.fillStyle = "#0e131a"; x.fillRect(60, 60, 960, 1800);
    x.strokeStyle = "rgba(94,149,144,.4)"; x.lineWidth = 2; x.strokeRect(60, 60, 960, 1800);
    x.fillStyle = "#5e9590"; x.font = "700 30px " + MONO; x.fillText("// DEIN ANKER", 120, 200);
    x.fillStyle = "#ffffff"; x.font = "600 72px " + HEAD;
    var y = wrapText(x, S.card || "", 120, 330, 840, 90);
    if (S.cardStep) {
      y += 80;
      x.fillStyle = "#ffb1c0"; x.fillRect(120, y, 6, 160);
      x.font = "700 28px " + MONO; x.fillText("MEIN KLEINER SCHRITT", 150, y + 36);
      x.fillStyle = "#dee2ed"; x.font = "500 44px " + BODY; wrapText(x, S.cardStep, 150, y + 100, 800, 60);
    }
    x.fillStyle = "#86948c"; x.font = "400 28px " + BODY;
    x.fillText("Du kannst jemanden vermissen,", 120, 1700); x.fillText("ohne zurückgehen zu müssen.", 120, 1742);
    x.fillStyle = "#dee2ed"; x.font = "700 30px " + HEAD; x.fillText("UNBOND", 120, 1810);
    return c.toDataURL("image/png");
  }
  $("card-save").addEventListener("click", function () {
    var go2 = function () {
      var url = drawCard(), img = $("card-preview");
      img.src = url; img.hidden = false;
      var a = document.createElement("a"); a.href = url; a.download = "UNBOND-Merkkarte.png";
      document.body.appendChild(a); a.click(); a.remove();
      live("Merkkarte erstellt.");
    };
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('600 72px "Space Grotesk"'), document.fonts.load('500 44px "Plus Jakarta Sans"'), document.fonts.load('700 30px "Space Mono"')]).then(go2, go2);
    } else { go2(); }
  });

  /* ---------- Notfall-Dialog ---------- */
  var modal = $("sos-modal"), lastFocus = null;
  function openModal() { lastFocus = document.activeElement; modal.hidden = false; $("sos-title").focus(); }
  function closeModal() { modal.hidden = true; if (lastFocus) { lastFocus.focus(); } }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-sos-open]")) openModal();
    if (e.target.closest("[data-sos-close]") || e.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  /* ---------- Start ---------- */
  if (load() && complete()) { $("resume").hidden = false; }
})();
