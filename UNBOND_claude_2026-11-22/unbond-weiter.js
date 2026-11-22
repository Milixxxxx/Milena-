/* UNBOND · Navigation im Bereich Klarheit (07.11.2026)
   Eine Quelle für beide Navigationen, damit alle Testseiten gleich aussehen:
   1) oben  <nav class="ub-ktests" data-ktests="SCHLÜSSEL"></nav>   Leiste der fünf Selbsttests
   2) unten <nav class="ub-weiter" data-weiter="SCHLÜSSEL"></nav>   „Wie geht es weiter?“
   Optional data-base="../" für Seiten in Unterordnern. Farben: Report/ToxiCometer rot, Narzissmus mauve,
   Bindungsmuster terracotta, Heilungskompass salbei, Spielautomat türkis, No Contact salbeigrün, Buch gold. */
(function () {
  "use strict";

  var ICONS = "assets/icons/sm/";
  var STEPS = {
    toxikometer: { name: "ToxiCometer", href: "toxikometer.html", c: "#7d263f", icon: "icon-gluehbirne-puzzle",
      title: "War es toxisch?", text: "Welches Muster dich festhält.", facts: ["15 Fragen, 2 Minuten", "Mit ausführlichem Report"] },
    report: { name: "Dein Report", href: "report.html", c: "#7d263f", icon: "icon-gluehbirne-puzzle",
      title: "Dein Muster im Detail", text: "Was dein Ergebnis bedeutet und was dich festhält.", facts: ["Deine fünf Bereiche", "Als Bild oder PDF speichern"], go: "Report öffnen", id: "tox-report-cta" },
    narzissmus: { name: "Narzissmus-Test", href: "narzissmus-test.html", c: "#9b7fa4", icon: "icon-auge-durchgestrichen",
      title: "Hatte sie narzisstische Muster?", text: "Keine Diagnose, aber endlich Worte dafür.", facts: ["20 Fragen, etwa 2 Minuten", "Speziell für WLW"] },
    bindung: { name: "Bindungsmuster-Test", short: "Bindungsmuster", href: "bindungsmuster-test.html", c: "#c4836e", icon: "icon-verbindung.webp",
      title: "Wie reagierst du in Beziehungen?", text: "Deine Schutzreaktionen bei Nähe, Streit und Trennung.", facts: ["12 Fragen, etwa 4 Minuten", "Ohne Wertung"] },
    kompass: { name: "Heilungskompass", short: "Kompass", href: "heilungskompass.html", c: "#5e9590", icon: "icon-zielscheibe",
      title: "Wo stehst du gerade?", text: "Und was jetzt für dich dran ist.", facts: ["5 Fragen, etwa 3 Minuten", "Mit einer Übung für jetzt"], go: "Kompass starten" },
    spielautomat: { name: "Spielautomat", href: "tools/spielautomat.html", c: "#5e9590", icon: "icon-atom",
      title: "Warum kann ich nicht loslassen?", text: "Trauma Bonding in 60 Sekunden selbst erleben.", facts: ["Selbstexperiment", "60 Sekunden"], go: "Ausprobieren" },
    nocontact: { name: "No Contact", href: "no-contact/index.html", c: "#5e9590", icon: "icon-hand-blaetter2",
      title: "Abstand, der hält", text: "Schritt 02 deines Wegs: Kontakt beenden, ohne rückfällig zu werden.", facts: ["Soforthilfe bei Kontaktimpuls", "Speziell für die kleine Szene"], go: "Weiter zu No Contact" },
    buch: { name: "Das Buch", href: "angebot.html#angebot", c: "#d2a63b", icon: "icon-hand-schmetterling",
      title: "Der Weg raus", text: "UNBOND – Breaking Chains, für Frauen, die Frauen lieben.", facts: ["Trauma Bonding verstehen", "Einmalzahlung, kein Abo"], go: "Zum Buch" }
  };
  /* Reihenfolge der Selbsttests in Klarheit (wie auf klarheit.html) */
  var TESTS = ["toxikometer", "narzissmus", "bindung", "kompass", "spielautomat"];
  /* Was unten als Nächstes kommt, je Seite (07.11.2026, 2. Fassung):
     steps = die nächsten Stationen des Wegs in Reihenfolge, ohne Buch (kein Test wird übersprungen).
     Das Buch steht getrennt als eigener Block (renderBook), auf dem Report direkt unter dem Cliffhanger. */
  var NEXT = {
    toxikometer: { steps: ["report", "narzissmus", "bindung"], sub: "Die nächsten Schritte in Klarheit, in dieser Reihenfolge.", bookId: "tox-book-cta", loc: "toxikometer_result" },
    report: { steps: ["narzissmus", "bindung", "kompass"], sub: "Weiter in Klarheit: als Nächstes Test 2 von 5.", bookId: "report-book-cta", loc: "report", bookFirst: true },
    narzissmus: { steps: ["bindung", "kompass", "spielautomat"], sub: "Weiter in Klarheit: als Nächstes Test 3 von 5." },
    bindung: { steps: ["kompass", "spielautomat", "nocontact"], sub: "Weiter in Klarheit: als Nächstes Test 4 von 5." },
    kompass: { steps: ["spielautomat", "nocontact"], sub: "Weiter in Klarheit: als Nächstes Test 5 von 5." },
    spielautomat: { steps: ["nocontact"], sub: "Klarheit hast du durchlaufen. Jetzt geht es um Abstand.", noSos: true }
  };
  /* Buch-Block: ein Hauptknopf (Hick), Leseprobe als risikofreier Zwischenschritt, keine Preise
     (Preise stehen nur auf der Angebotsseite, damit sie bei Änderungen an einer Stelle bleiben). */
  var BOOK = {
    kicker: "Das Buch · UNBOND – Breaking Chains",
    title: "Raus aus dem Kreislauf, Schritt für Schritt.",
    text: "Du weißt jetzt, was passiert ist. Das Buch zeigt dir, warum du sie trotzdem vermisst und wie du dich löst.",
    points: ["Verstehen, warum es so festhält", "No Contact, der auch in einer kleinen Szene hält", "Übungen für die schweren Momente"],
    meta: "E-Book für Frauen, die Frauen lieben · Einmalzahlung, kein Abo · sofort lesbar",
    cta: "Zum Buch",
    sample: "Erst reinlesen: freie Leseprobe"
  };

  function iconUrl(base, name) { return "url(" + base + ICONS + (name.indexOf(".") > -1 ? name : name + ".png") + ")"; }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function arrow() { var s = el("span", null, "→"); s.setAttribute("aria-hidden", "true"); return s; }

  function buildCard(key, base, bookId, page) {
    var s = STEPS[key];
    var li = el("li");
    li.style.setProperty("--c", s.c);
    li.style.setProperty("--c-text", s.c === "#7d263f" ? "#e8e8e8" : s.c);
    var a = el("a", "ub-weiter-card");
    a.href = base + s.href;
    a.style.setProperty("--c", s.c);
    a.style.setProperty("--c-text", s.c === "#7d263f" ? "#e8e8e8" : s.c);
    a.style.setProperty("--icon", iconUrl(base, s.icon));
    if (s.id) a.id = s.id;
    if (key === "buch" && bookId) a.id = bookId;
    a.setAttribute("data-weiter-ziel", key);
    var icon = el("span", "ub-weiter-icon");
    icon.setAttribute("aria-hidden", "true");
    a.appendChild(icon);
    a.appendChild(el("span", "ub-weiter-kicker", s.name));
    a.appendChild(el("h3", null, s.title));
    a.appendChild(el("p", null, s.text));
    var ul = el("ul", "ub-weiter-points");
    s.facts.forEach(function (f) { ul.appendChild(el("li", null, f)); });
    a.appendChild(ul);
    var go = el("span", "ub-weiter-go", (s.go || (key === "buch" ? "Zum Buch" : "Test starten")) + " ");
    go.appendChild(arrow());
    a.appendChild(go);
    a.addEventListener("click", function () {
      if (typeof window.__unbondTrack === "function") {
        /* Ersetzt die früheren Inline-Skripte tox-book-track und report-book-track (gleicher Ereignisname fürs Buch) */
        window.__unbondTrack(key === "buch" ? "tox_book_click" : "klarheit_weiter_click", { cta_location: page, ziel: key });
      }
    });
    li.appendChild(a);
    return li;
  }

  function track(name, params) {
    if (typeof window.__unbondTrack === "function") window.__unbondTrack(name, params);
  }

  function renderBook(base, cfg, loc) {
    var box = el("section", "ub-buch");
    box.setAttribute("aria-labelledby", "ub-buch-title");
    box.style.setProperty("--icon", iconUrl(base, STEPS.buch.icon));
    var icon = el("span", "ub-buch-icon");
    icon.setAttribute("aria-hidden", "true");
    box.appendChild(icon);
    var body = el("div", "ub-buch-body");
    body.appendChild(el("p", "ub-buch-kicker", BOOK.kicker));
    var h = el("h2", null, BOOK.title);
    h.id = "ub-buch-title";
    body.appendChild(h);
    body.appendChild(el("p", "ub-buch-text", BOOK.text));
    var ul = el("ul", "ub-buch-points");
    BOOK.points.forEach(function (p) { ul.appendChild(el("li", null, p)); });
    body.appendChild(ul);
    var act = el("div", "ub-buch-actions");
    var a = el("a", "ub-buch-cta", BOOK.cta + " ");
    a.href = base + STEPS.buch.href;
    if (cfg.bookId) a.id = cfg.bookId;
    a.appendChild(arrow());
    a.addEventListener("click", function () { track("tox_book_click", { cta_location: loc }); });
    act.appendChild(a);
    var s = el("a", "ub-buch-sample", BOOK.sample);
    s.href = base + "blick-ins-buch.html";
    s.addEventListener("click", function () { track("klarheit_weiter_click", { cta_location: loc, ziel: "leseprobe" }); });
    act.appendChild(s);
    body.appendChild(act);
    body.appendChild(el("p", "ub-buch-meta", BOOK.meta));
    box.appendChild(body);
    return box;
  }

  function renderWeiter(nav) {
    var page = nav.getAttribute("data-weiter");
    var cfg = NEXT[page];
    if (!cfg) return;
    var base = nav.getAttribute("data-base") || "";
    var loc = cfg.loc || page;
    var book = renderBook(base, cfg, loc);
    /* Reihenfolge laut Milena (07.11.2026): erst das Buch, darunter der Weg durch Klarheit */
    nav.parentNode.insertBefore(book, nav);
    nav.textContent = "";
    var headId = "ub-weiter-title-" + page;
    nav.setAttribute("aria-labelledby", headId);
    var head = el("div", "ub-weiter-head");
    head.appendChild(el("p", "eyebrow", "Dein Weg ab hier"));
    var h2 = el("h2", null, "Wie geht es weiter?");
    h2.id = headId;
    head.appendChild(h2);
    head.appendChild(el("p", null, cfg.sub));
    nav.appendChild(head);
    var ol = el("ol", "ub-weiter-list ub-weiter-list--" + cfg.steps.length);
    cfg.steps.forEach(function (k) { ol.appendChild(buildCard(k, base, null, loc)); });
    nav.appendChild(ol);
    if (!cfg.noSos) {
      var more = el("p", "ub-weiter-more");
      var a = el("a", null, "Akuter Kontaktimpuls? No-Contact-Soforthilfe");
      a.href = base + "no-contact/index.html";
      more.appendChild(a);
      nav.appendChild(more);
    }
  }

  /* 07.11.2026: Die fünf Tests stehen in derselben Zeile wie „Dein Weg“, direkt hinter „01 Erkennen“.
     Vorher waren es zwei Leisten übereinander, das wirkte doppelt. Ohne „Dein Weg“ bleibt die eigene Leiste. */
  function mergeIntoWeg(nav, cur, base) {
    var stepLink = document.querySelector("nav.ub-weg a[aria-current='step']");
    if (!stepLink || !stepLink.parentNode) return false;
    var ol = el("ol", "ub-weg-tests");
    ol.setAttribute("aria-label", "Selbsttests in Klarheit");
    TESTS.forEach(function (k, i) {
      var s = STEPS[k];
      var li = el("li");
      var a = el("a");
      a.href = base + s.href;
      a.style.setProperty("--c", s.c);
      a.style.setProperty("--c-text", s.c === "#7d263f" ? "#e8e8e8" : s.c);
      if (k === cur) a.setAttribute("aria-current", "page");
      a.title = s.name;
      a.setAttribute("aria-label", "Test " + (i + 1) + ": " + s.name);
      a.appendChild(el("span", "ub-weg-tn", String(i + 1)));
      a.appendChild(el("span", "ub-weg-tt", s.short || s.name));
      li.appendChild(a);
      ol.appendChild(li);
    });
    stepLink.parentNode.appendChild(ol);
    stepLink.closest("nav.ub-weg").classList.add("ub-weg--tests");
    /* Am Handy ist die Zeile wischbar: aktuellen Test beim Laden ins Bild holen */
    var inner = stepLink.closest("nav.ub-weg").querySelector(".ub-weg-inner");
    var curLink = ol.querySelector("a[aria-current]");
    if (inner && curLink && inner.scrollWidth > inner.clientWidth) {
      inner.scrollLeft = Math.max(0, curLink.offsetLeft - inner.offsetLeft - 48);
    }
    nav.parentNode.removeChild(nav);
    return true;
  }

  function renderTests(nav) {
    var cur = nav.getAttribute("data-ktests");
    var base = nav.getAttribute("data-base") || "";
    if (mergeIntoWeg(nav, cur, base)) return;
    nav.textContent = "";
    nav.setAttribute("aria-label", "Selbsttests in Klarheit");
    var inner = el("div", "ub-ktests-inner");
    var label = el("a", "ub-ktests-label", "Klarheit");
    label.href = base + "klarheit.html";
    inner.appendChild(label);
    var ol = el("ol");
    TESTS.forEach(function (k, i) {
      var s = STEPS[k];
      var li = el("li");
      var a = el("a");
      a.href = base + s.href;
      a.style.setProperty("--c", s.c);
      a.style.setProperty("--c-text", s.c === "#7d263f" ? "#e8e8e8" : s.c);
      if (k === cur) a.setAttribute("aria-current", "step");
      a.appendChild(el("span", "ub-ktests-n", "0" + (i + 1)));
      a.appendChild(el("span", "ub-ktests-t", s.short || s.name));
      li.appendChild(a);
      ol.appendChild(li);
    });
    inner.appendChild(ol);
    nav.appendChild(inner);
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll("nav[data-ktests]"), renderTests);
    Array.prototype.forEach.call(document.querySelectorAll("nav[data-weiter]"), renderWeiter);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
