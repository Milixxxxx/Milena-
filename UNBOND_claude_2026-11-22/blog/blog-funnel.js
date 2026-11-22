/* UNBOND · Blog-Funnel (Konzept C „Wissen, das verkauft“) · Stand 27.10.2026
   Einbau: in jedem Blogartikel vor </body> EINE Zeile einfügen:
     <script src="blog-funnel.js?v=20261027" defer></script>
   Was das Skript macht:
   1. Mitten im Artikel: ein Selbstcheck-Kasten (Test oder Heilungskompass).
   2. Am Artikelende: genau EIN passender Hinweis (Ebook-Seite oder 7-€-Notfallplan).
   3. Die alte kleine Link-Zeile am Ende (.article-end-cta) und das Leitfaden-Opt-in (.blog-optin) werden ausgeblendet.
      Grund: Sie verlinkte teils direkt in den Checkout, einmal sogar mit altem Gutschein.
   4. Klicks werden über window.__unbondTrack gemessen (beachtet Einwilligung und Filter für eigenen Traffic).
   Neue Artikel: unten in ARTICLES eine Zeile ergänzen – fertig.
   Texte sind bewusst neutral: kein „10 Schritte“, keine Schritt-Nummern. */
(function () {
  "use strict";

  var CHECKS = {
    toxi: {
      label: "Selbstcheck · 2 Minuten · anonym",
      text: "Du erkennst Muster wieder, bist dir aber nicht sicher, ob es wirklich toxisch war? Der ToxiCometer ordnet in 15 Fragen ein, was in deiner Beziehung gewirkt hat. Ohne E-Mail, ohne Diagnose.",
      btn: "ToxiCometer starten →",
      href: "../toxikometer.html"
    },
    narzi: {
      label: "Selbstcheck · anonym · keine Diagnose",
      text: "Narzisstische Züge oder eine schwierige Phase? Der NarziScore WLW hilft dir, das Verhalten einzuordnen, das du erlebt hast – ohne Ferndiagnose über eine Person.",
      btn: "NarziScore WLW starten →",
      href: "../narzissmus-test.html"
    },
    kompass: {
      label: "Standortbestimmung · 2 Minuten",
      text: "Akut, mittendrin oder schon im Rückblick? Der Heilungskompass zeigt dir, wo du gerade stehst – und welcher Schritt jetzt der richtige ist.",
      btn: "Heilungskompass öffnen →",
      href: "../heilungskompass.html"
    }
  };

  var OFFERS = {
    notfall: {
      title: "Wenn ihr Chat gerade offen ist",
      text: "Der 7-Tage-Notfallplan gibt dir für jeden Tag eine klare nächste Handlung – für No Contact in einer kleinen queeren Szene, in der sie überall auftauchen kann.",
      note: "Einmalig 7 € · kein Abo · sofort verfügbar",
      btn: "Zum 7-Tage-Notfallplan →",
      href: "../no-contact/index.html"
    },
    core: {
      title: "Verstehen ist der erste Schritt. Lösen der zweite.",
      text: "UNBOND – Breaking Chains ist das Selbsthilfe-Ebook für Frauen, die Frauen lieben – mit Erklärungen und Übungen, die dir helfen, dich aus dem Kreislauf zu lösen.",
      note: "UNBOND – Breaking Chains · Ebook für Frauen, die Frauen lieben",
      btn: "Das Ebook kennenlernen →",
      href: "../angebot.html#programm"
    }
  };

  /* Ein Artikel = ein Selbstcheck + ein Angebot. Bei core kann ein themenpassender Text ergänzt werden. */
  var ARTICLES = {
    "toxische-beziehung-warnsignale-wlw": { check: "toxi", offer: "core", text: "Das Ebook zeigt dir die Warnsignale und den Kreislauf dahinter – mit Übungen, die du sofort anwenden kannst." },
    "gaslighting-lesbische-beziehungen": { check: "toxi", offer: "core", text: "Mit dem 4-Spalten-Realitätscheck im Ebook lernst du, deiner eigenen Wahrnehmung wieder zu trauen." },
    "liebeskummer-neurobiologie": { check: "kompass", offer: "notfall" },
    "trauma-bonding-loesen": { check: "toxi", offer: "core", text: "Das Ebook erklärt genau diesen Kreislauf und zeigt dir, wie du das Suchtmuster Tag für Tag durchbrichst." },
    "queer-breakup-lesbischer-kontext": { check: "toxi", offer: "notfall" },
    "trennungsschmerzen-30-tage-plan": { check: "kompass", offer: "notfall" },
    "narzissmus-weiblich-definition": { check: "narzi", offer: "core", text: "Ohne Diagnose, aber mit Klarheit: Das Ebook hilft dir, die rosa Brille abzunehmen und zu sehen, was wirklich passiert ist." },
    "verdeckter-narzissmus-erkennen": { check: "narzi", offer: "core", text: "Leise Abwertung ist schwer zu greifen. Der 4-Spalten-Realitätscheck im Ebook macht sie schwarz auf weiß sichtbar." },
    "narzissmus-lesbische-beziehungen-wlw": { check: "narzi", offer: "core", text: "Das Ebook widmet sich auch den WLW-Dynamiken: Fusion, U-Hauling und dem Verlust der Community." },
    "toxische-beziehung-unter-frauen-trauma-bonding": { check: "toxi", offer: "core", text: "Das Ebook zeigt dir den toxischen Kreislauf im Detail und hilft dir, das Suchtmuster Tag für Tag zu durchbrechen." }
  };

  var slug = (location.pathname.split("/").pop() || "").replace(/\.html?$/, "");
  var cfg = ARTICLES[slug];
  var body = document.querySelector(".article-body");
  if (!cfg || !body) return;

  var css = document.createElement("style");
  css.textContent =
    ".bf-check{margin:36px 0}.bf-check p{margin-bottom:14px}" +
    ".bf-offer{margin:0 0 28px}.bf-offer h3{margin-bottom:10px}.bf-offer .bf-note{display:block;margin-top:12px;font-size:.78rem;color:rgba(247,242,234,.6)}" +
    ".article-end-cta,.blog-optin{display:none!important}";
  document.head.appendChild(css);

  var track = function (name, params) {
    try {
      if (typeof window.__unbondTrack === "function") window.__unbondTrack(name, params);
      if (typeof window.fbq === "function" && name === "blog_offer_click") window.fbq("trackCustom", "BlogOfferClick", params);
    } catch (e) {}
  };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* 1 · Selbstcheck in der Mitte des Artikels (vor einer mittleren Zwischenüberschrift).
     Steht im Artikel schon ein fest eingebauter Selbstcheck-Kasten (.intext-cta), wird keiner zusätzlich eingefügt. */
  var staticBox = body.querySelector(".intext-cta");
  if (staticBox && staticBox.querySelector("a")) {
    staticBox.querySelector("a").addEventListener("click", function () { track("blog_selfcheck_click", { article: slug, target: cfg.check }); });
  }
  var c = staticBox ? null : CHECKS[cfg.check];
  var heads = Array.prototype.filter.call(body.querySelectorAll(":scope > h2"), function (h) {
    return !/^(Fazit|Literatur|Quellen|Was bleibt)/i.test(h.textContent.trim());
  });
  if (c && heads.length) {
    var anchor = heads[Math.min(heads.length - 1, Math.max(1, Math.floor(heads.length / 2)))];
    var box = document.createElement("aside");
    box.className = "intext-cta bf-check";
    box.innerHTML = '<span class="intext-cta-label">' + esc(c.label) + "</span><p>" + esc(c.text) + '</p><a href="' + c.href + '">' + esc(c.btn) + "</a>";
    body.insertBefore(box, anchor);
    box.querySelector("a").addEventListener("click", function () { track("blog_selfcheck_click", { article: slug, target: cfg.check }); });
  }

  /* 2 · Genau ein Angebot direkt nach dem Artikel */
  var o = OFFERS[cfg.offer];
  if (o) {
    var offer = document.createElement("aside");
    offer.className = "article-cta bf-offer";
    offer.innerHTML = "<h3>" + esc(o.title) + "</h3><p>" + esc(cfg.text || o.text) + '</p><a href="' + o.href + '">' + esc(o.btn) + '</a><span class="bf-note">' + esc(o.note) + "</span>";
    body.parentNode.insertBefore(offer, body.nextSibling);
    offer.querySelector("a").addEventListener("click", function () { track("blog_offer_click", { article: slug, offer: cfg.offer }); });
  }
})();
