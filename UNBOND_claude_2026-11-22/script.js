(function () {
  const $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  let trafficType = "";
  /* --- Internal traffic filter: ?preview=true setzt persistentes Flag, unterdrückt alle GA-Events --- */
  try {
    const _p = new URLSearchParams(location.search);
    if (_p.get("preview") === "true") {
      localStorage.setItem("internal_traffic", "true");
    }
    if (_p.get("preview") === "false") {
      localStorage.removeItem("internal_traffic");
    }
    trafficType = _p.get("traffic_type") || "";
  } catch (e) {}
  const isInternal = () => {
    try {
      return localStorage.getItem("internal_traffic") === "true";
    } catch (e) {
      return false;
    }
  };
  const getTrafficParams = () => (trafficType ? { traffic_type: trafficType } : {});
  /* Tracking-Stufe der Seite (05.11.2026): <body data-tracking="voll|zaehlen|aus">.
     voll    = Analyse (GA4, Clarity) und Marketing (Meta, Pinterest), jeweils nur nach Einwilligung
     zaehlen = nur GA4 ohne Werbesignale, kein Clarity, kein Marketing, nur erlaubte Event-Angaben
     aus     = gar nichts. Fehlt die Angabe, gilt "zaehlen". */
  const TRACKING_MODE = (function () {
    const m = (document.body && document.body.dataset.tracking) || "";
    return m === "voll" || m === "aus" ? m : "zaehlen";
  })();
  window.__unbondTrackingMode = TRACKING_MODE;
  const COUNT_ONLY_PARAMS = ["event_category", "cta_location", "tool", "transport_type", "page_type", "content_version", "traffic_type", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const limitParams = (params) => {
    if (TRACKING_MODE === "voll") return params;
    return Object.keys(params || {}).reduce((out, key) => {
      if (COUNT_ONLY_PARAMS.indexOf(key) !== -1) out[key] = params[key];
      return out;
    }, {});
  };
  /* GA-Aufrufe werden erst nach wirksamer Analyse-Einwilligung zugelassen.
     So werden Ereignisse vor einer Entscheidung nicht nachträglich aus der Queue versendet. */
  window.dataLayer = window.dataLayer || [];
  window.__unbondAnalyticsConsent = false;
  if (typeof window.gtag !== "function") {
    window.gtag = function () {
      if (!window.__unbondAnalyticsConsent) return;
      window.dataLayer.push(arguments);
    };
  }
  /* GA4-ID zentral definieren, damit auch Seiten ohne eigenes Inline-Setup (Report, Blog, Heilungskompass) getrackt werden */
  if (!window.GA_ID) {
    window.GA_ID = "G-QWHMYTHDDS";
  }
  /* Microsoft Clarity – Projekt-ID hier eintragen (ersetze PLATZHALTER durch deine ID) */
  window.CLARITY_ID = "x60dqjcnxu";
  /* Werbe-IDs zentral (Platzhalter auf einzelnen Seiten werden ersetzt) */
  if (!window.META_PIXEL_ID || window.META_PIXEL_ID === "DEINE_META_PIXEL_ID") window.META_PIXEL_ID = "1006203895535173";
  if (!window.PINTEREST_TAG_ID || window.PINTEREST_TAG_ID === "DEINE_PINTEREST_TAG_ID") window.PINTEREST_TAG_ID = "2612878748458";
  const gtagEvent = (name, params = {}) => {
    if (TRACKING_MODE === "aus" || isInternal() || !window.__unbondAnalyticsConsent) return;
    try {
      window.gtag(
        "event",
        name,
        limitParams(Object.assign({ transport_type: "beacon" }, getTrafficParams(), params)),
      );
    } catch (e) {}
  };
  window.__unbondTrack = gtagEvent;
  const nav = $(".topnav");
  const menu = $(".menu-btn");
  const panel = $(".mobile-panel");
  const menuIcon = menu ? $(".menu-icon", menu) : null;
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 12);
  }
  function setMenu(open) {
    if (!nav || !menu || !panel) return;
    panel.classList.toggle("show", open);
    nav.classList.toggle("open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    panel.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("nav-open", open);
    if (menuIcon) menuIcon.textContent = open ? "×" : "☰";
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  if (menu && panel)
    menu.addEventListener("click", () => {
      setMenu(!panel.classList.contains("show"));
    });
  $$(".mobile-panel a").forEach((a) =>
    a.addEventListener("click", () => {
      setMenu(false);
    }),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel && panel.classList.contains("show")) {
      setMenu(false);
      menu.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1020) setMenu(false);
  });
  $$("[data-flip]").forEach((card) =>
    card.addEventListener("click", () => card.classList.toggle("flipped")),
  );
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      }),
    { threshold: 0.12 },
  );
  $$(".fade-up").forEach((el) => io.observe(el));
  /* --- Early-Bird Countdown (Deadline 31.12.2026 23:59:59 MEZ) --- */
  (function ebCountdown() {
    const timer = document.getElementById("eb-timer");
    const box = document.getElementById("eb-countdown");
    if (!timer) return;
    const deadline = new Date('2026-12-31T23:59:59+01:00').getTime(); // Deadline 31.12.2026, MEZ
    function pad(n) {
      return String(n).padStart(2, "0");
    }
    function tick() {
      const diff = deadline - Date.now();
      if (diff <= 0) {
        timer.textContent = "Aktion beendet";
        if (box) box.classList.add("is-expired");
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;
      timer.textContent = `${pad(d)}:${pad(h)}:${pad(m)}:${pad(s)}`;
      setTimeout(tick, 1000);
    }
    tick();
  })();
  /* --- Consent Manager (3 Kategorien, GA4 nur nach Einwilligung) --- */
  (function consentManager() {
    const KEY = "cookie_consent",
      AK = "consent_analytics",
      MK = "consent_marketing";
    const banner = document.getElementById("cookieBanner");
    const reopen = document.getElementById("cookieReopen");
    const analyticsCb = document.getElementById("cookieAnalytics");
    const marketingCb = document.getElementById("cookieMarketing");
    let gaLoaded = false;
    let gaConfigured = false;
    let clarityLoaded = false;
    function gaScriptSrc() {
      return window.GA_ID ? "https://www.googletagmanager.com/gtag/js?id=" + window.GA_ID : "";
    }
    function hasAnalyticsConsent() {
      const analyticsState = localStorage.getItem(AK);
      const consentState = localStorage.getItem(KEY);
      if (analyticsState === "granted") return true;
      if (analyticsState === "denied") return false;
      return consentState === "accepted" || consentState === "1" || consentState === "true";
    }
    function hasMarketingConsent() {
      const marketingState = localStorage.getItem(MK);
      const consentState = localStorage.getItem(KEY);
      if (marketingState === "granted") return true;
      if (marketingState === "denied") return false;
      return consentState === "accepted" || consentState === "1" || consentState === "true";
    }
    function sendPageView() {
      gtag(
        "config",
        window.GA_ID,
        Object.assign(
          { anonymize_ip: true, send_page_view: false },
          TRACKING_MODE === "voll" ? {} : { allow_google_signals: false, allow_ad_personalization_signals: false },
          getTrafficParams(),
        ),
      );
      gtag(
        "event",
        "page_view",
        Object.assign(
          {
            page_title: document.title,
            page_location: location.href,
            page_path: location.pathname + location.search,
          },
          getTrafficParams(),
        ),
      );
    }
    function configureGoogleAnalytics() {
      if (gaConfigured || !window.GA_ID) return;
      if (isInternal()) return; /* internen Traffic vollständig ausschließen */
      gaConfigured = true;
      gtag("js", new Date());
      sendPageView();
    }
    function loadGoogleAnalytics() {
      if (!window.GA_ID) return;
      if (isInternal()) return; /* internen Traffic vollständig ausschließen */
      const src = gaScriptSrc();
      if (src && !document.querySelector(`script[src="${src}"]`)) {
        const sc = document.createElement("script");
        sc.async = true;
        sc.src = src;
        document.head.appendChild(sc);
      }
      gaLoaded = true;
      configureGoogleAnalytics();
    }
    function loadClarity() {
      if (clarityLoaded || !window.CLARITY_ID || window.CLARITY_ID === "PLATZHALTER") return;
      if (isInternal()) return; /* internen Traffic vollständig ausschließen */
      clarityLoaded = true;
      (function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", window.CLARITY_ID);
    }
    let metaLoaded = false;
    let pinterestLoaded = false;
    function loadMetaPixel() {
      if (metaLoaded || !window.META_PIXEL_ID || window.META_PIXEL_ID === "DEINE_META_PIXEL_ID") return;
      if (isInternal()) return;
      metaLoaded = true;
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", window.META_PIXEL_ID);
      fbq("track", "PageView");
    }
    function loadPinterestTag() {
      if (pinterestLoaded || !window.PINTEREST_TAG_ID || window.PINTEREST_TAG_ID === "DEINE_PINTEREST_TAG_ID") return;
      if (isInternal()) return;
      pinterestLoaded = true;
      !(function (e) {
        if (!window.pintrk) {
          window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments));
          };
          var n = window.pintrk;
          n.queue = [];
          n.version = "3.0";
          var t = document.createElement("script");
          t.async = !0;
          t.src = e;
          var r = document.getElementsByTagName("script")[0];
          r.parentNode.insertBefore(t, r);
        }
      })("https://s.pinimg.com/ct/core.js");
      pintrk("load", window.PINTEREST_TAG_ID);
      pintrk("page");
    }
    function loadMarketingPixels() {
      loadMetaPixel();
      loadPinterestTag();
    }
    function migrateLegacyConsent() {
      try {
        const legacy = localStorage.getItem(KEY);
        if (legacy === "accepted" && localStorage.getItem(AK) === null) {
          localStorage.setItem(KEY, "1");
          localStorage.setItem(AK, "granted");
          localStorage.setItem(MK, "granted");
        } else if (legacy === "rejected" && localStorage.getItem(AK) === null) {
          localStorage.setItem(KEY, "1");
          localStorage.setItem(AK, "denied");
          localStorage.setItem(MK, "denied");
        }
        /* Alt-Werte des früheren Inline-Banners (yes/no + "set") übernehmen */
        if (localStorage.getItem(AK) === "yes") localStorage.setItem(AK, "granted");
        if (localStorage.getItem(AK) === "no") localStorage.setItem(AK, "denied");
        if (localStorage.getItem(MK) === "yes") localStorage.setItem(MK, "granted");
        if (localStorage.getItem(MK) === "no") localStorage.setItem(MK, "denied");
        if (localStorage.getItem(KEY) === "set") localStorage.setItem(KEY, "1");
      } catch (e) {}
    }
    migrateLegacyConsent();
    function applyConsent() {
      if (TRACKING_MODE === "aus") {
        window.__unbondAnalyticsConsent = false;
        return;
      }
      window.__unbondAnalyticsConsent = hasAnalyticsConsent();
      if (window.__unbondAnalyticsConsent) {
        loadGoogleAnalytics();
        if (TRACKING_MODE === "voll") loadClarity();
      }
      if (TRACKING_MODE === "voll" && hasMarketingConsent()) {
        loadMarketingPixels();
      }
    }
    window.__ensureAnalyticsLoaded = applyConsent;
    function showBanner() {
      if (banner) {
        banner.hidden = false;
      }
      if (reopen) {
        reopen.hidden = true;
      }
    }
    function hideBanner() {
      if (banner) {
        banner.hidden = true;
      }
      if (reopen) {
        reopen.hidden = false;
      }
    }
    function save(analytics, marketing) {
      window.__unbondAnalyticsConsent = !!analytics;
      localStorage.setItem(KEY, "1");
      localStorage.setItem(AK, analytics ? "granted" : "denied");
      localStorage.setItem(MK, marketing ? "granted" : "denied");
      hideBanner();
      applyConsent();
    }
    // Initial: Banner zeigen falls noch keine Entscheidung
    if (!localStorage.getItem(KEY)) {
      showBanner();
    } else {
      if (reopen) reopen.hidden = false;
      applyConsent();
    }
    // Vorzustand der Checkboxen
    if (analyticsCb) analyticsCb.checked = hasAnalyticsConsent();
    if (marketingCb) marketingCb.checked = localStorage.getItem(MK) === "granted";
    const accept = document.getElementById("cookieAcceptAll");
    const saveBtn = document.getElementById("cookieSaveSelection");
    const reject = document.getElementById("cookieRejectAll");
    if (accept) accept.addEventListener("click", () => save(true, true));
    if (saveBtn)
      saveBtn.addEventListener("click", () =>
        save(!!(analyticsCb && analyticsCb.checked), !!(marketingCb && marketingCb.checked)),
      );
    if (reject) reject.addEventListener("click", () => save(false, false));
    if (reopen)
      reopen.addEventListener("click", () => {
        if (analyticsCb) analyticsCb.checked = hasAnalyticsConsent();
        if (marketingCb) marketingCb.checked = localStorage.getItem(MK) === "granted";
        showBanner();
      });
  })();

  const Q = [
    {
      q: "Hat sie deine Wahrnehmung infrage gestellt? („Das hast du dir eingebildet”, „Du bist zu sensibel”, „Das war doch nicht so gemeint”)",
      cat: 0,
      label: "Manipulation & Gaslighting",
    },
    {
      q: "Hat sie Dinge abgestritten, die eindeutig passiert sind – obwohl du es selbst erlebt hast?",
      cat: 0,
      label: "Manipulation & Gaslighting",
    },
    {
      q: "Wechselte sie zwischen extremer Zuneigung und plötzlicher Kälte – ohne erkennbaren Grund?",
      cat: 0,
      label: "Manipulation & Gaslighting",
    },
    {
      q: "Hat sie kontrolliert, mit wem du Zeit verbringst, oder deine Freundschaften und Familie systematisch schlechtgeredet?",
      cat: 1,
      label: "Kontrolle & Isolation",
    },
    {
      q: "Musstest du ständig erreichbar sein – und hast du dich angepasst, um Konflikte zu vermeiden?",
      cat: 1,
      label: "Kontrolle & Isolation",
    },
    {
      q: "Hast du bemerkt, dass du dich von deinem sozialen Umfeld entfernt hast – und dachtest, das sei deine eigene Entscheidung?",
      cat: 1,
      label: "Kontrolle & Isolation",
    },
    {
      q: "Hat sie dich vor anderen herabgesetzt, deine Leistungen kleingemacht oder dich öffentlich bloßgestellt?",
      cat: 2,
      label: "Abwertung & Respektlosigkeit",
    },
    {
      q: "Hat sie dich mit anderen verglichen oder dein Aussehen, deine Intelligenz oder deinen Wert als Partnerin kritisiert?",
      cat: 2,
      label: "Abwertung & Respektlosigkeit",
    },
    {
      q: "Hattest du das Gefühl, dass du dir ihre Zuneigung ständig verdienen musstest?",
      cat: 2,
      label: "Abwertung & Respektlosigkeit",
    },
    {
      q: "War ihre Stimmung völlig unvorhersehbar – du wusstest nie, welche „Version” dich erwartet?",
      cat: 3,
      label: "Chaos & Unberechenbarkeit",
    },
    {
      q: "Gab es ein Muster aus impulsiven Trennungen und Versöhnungen – ein On-Off-Kreislauf, aus dem du nicht herauskamst?",
      cat: 3,
      label: "Chaos & Unberechenbarkeit",
    },
    {
      q: "Hast du dich ständig in Alarmbereitschaft befunden – immer auf der Hut, was als Nächstes kommt?",
      cat: 3,
      label: "Chaos & Unberechenbarkeit",
    },
    {
      q: "Drehten sich die meisten Gespräche hauptsächlich um sie – ihre Bedürfnisse, ihre Probleme, ihre Gefühle?",
      cat: 4,
      label: "Egoismus & Gegenseitigkeit",
    },
    {
      q: "Hat sie Verantwortung für Fehler abgelehnt und sich nie wirklich entschuldigt – oder die Schuld auf dich umgelenkt?",
      cat: 4,
      label: "Egoismus & Gegenseitigkeit",
    },
    {
      q: "Hattest du das Gefühl, dass deine eigenen Bedürfnisse in der Beziehung keine Rolle spielten?",
      cat: 4,
      label: "Egoismus & Gegenseitigkeit",
    },
  ];
  const profiles = {
    grandiose_narcissist: {
      name: "Charme und Absturz",
      hint: "Merkmale von grandiosem Narzissmus",
      icon: "♛",
      summary:
        "Extremer Charme und plötzliche Abwertung wirken widersprüchlich – im Muster einer grandiosen narzisstischen Dynamik gehören sie oft zusammen.",
      teaser: [
        "Warum extrem hoher Charme und plötzliche Abwertung kein Widerspruch sind – sondern ein System",
        "Was der Dopamin-Absturz nach der Bewunderung mit deinem Nervensystem macht",
        "Das 3-Phasen-Muster: Love Bombing → Abwertung → Discard",
      ],
      triggers: { manipulation: [3, 5], disrespect: [4, 5], egoism: [4, 5], control: [2, 4] },
    },
    covert_narcissist: {
      name: "Verletzlichkeit als Hebel",
      hint: "Merkmale von verdecktem Narzissmus",
      icon: "◑",
      summary:
        "Dieses Profil wirkt oft verletzlich oder sensibel – und kann dich gerade dadurch in Schuld, Rechtfertigung und ständige Validierung ziehen.",
      teaser: [
        "Warum das Opfer-Narrativ so effektiv ist – und wie es dich unbewusst in Schuld einbindet",
        "Der Unterschied zwischen echter Sensibilität und strategischer Verletzlichkeit",
        "Warum du dich konstant zu wenig gefühlt hast – obwohl du alles gegeben hast",
      ],
      triggers: {
        manipulation: [4, 5],
        egoism: [3, 5],
        disrespect: [2, 4],
        unpredictability: [3, 5],
      },
    },
    borderline_dynamics: {
      name: "Nähe und Bruch im Wechsel",
      hint: "Merkmale einer Borderline-Dynamik",
      icon: "↯",
      summary:
        "Die Auswertung zeigt eine starke On-Off- und Splitting-Dynamik: intensive Nähe, abrupte Abwertung, Trennung, Reue und erneute Hoffnung.",
      teaser: [
        "Die Neurobiologie hinter dem Hassen-und-Klammern-Paradox",
        "Was Splitting ist und wie es dein Selbstbild dauerhaft beeinflusst hat",
        "Warum die On-Off-Zyklen dich neurobiologisch süchtig gemacht haben",
      ],
      triggers: {
        unpredictability: [4, 5],
        control: [3, 5],
        manipulation: [3, 5],
        disrespect: [2, 4],
      },
    },
    malignant_narcissist: {
      name: "Kontrolle mit System",
      hint: "Merkmale von malignem Narzissmus",
      icon: "⚠",
      summary:
        "Dieses Profil deutet auf ein besonders gefährliches Muster aus Kontrolle, Abwertung, Manipulation und möglicher psychologischer Gewalt hin.",
      teaser: [
        "Was maligner Narzissmus von normaler Toxizität unterscheidet",
        "Warum du dir die psychologische Gewalt nicht eingebildet hast",
        "Wie Isolation, Triangulation und Lügen als System funktionieren",
      ],
      triggers: {
        manipulation: [4, 5],
        disrespect: [4, 5],
        control: [4, 5],
        egoism: [4, 5],
        unpredictability: [3, 5],
      },
    },
    histrionic: {
      name: "Drama als Dauerzustand",
      hint: "Merkmale histrionischer Züge",
      icon: "✦",
      summary:
        "Die Dynamik kann von Drama, wechselnden Emotionen und dem Gefühl geprägt sein, ständig reagieren und emotional verfügbar sein zu müssen.",
      teaser: [
        "Warum du konstant emotionaler Erschöpfung ausgesetzt warst",
        "Der Unterschied zwischen echter Emotion und performativer Emotionalität",
        "Warum du das Gefühl hattest, nie richtig anzukommen",
      ],
      triggers: {
        unpredictability: [3, 5],
        egoism: [3, 5],
        manipulation: [2, 4],
        disrespect: [2, 4],
      },
    },
    /* psychopathic_traits („Kühle Berechnung“) am 07.11.2026 gestrichen (Entscheidung Milena):
       war mit diesen Auslösern nie erreichbar, grandiose_narcissist gewann immer vorher. */
    cluster_b_mix: {
      name: "Mehrere Muster im Wechsel",
      hint: "Merkmale mehrerer Cluster-B-Muster (Narzissmus, Borderline, Histrionik)",
      icon: "◈",
      summary:
        "Mehrere Muster überlagern sich: narzisstische Kälte, emotionale Unberechenbarkeit, Kontrolle und Manipulation können sich abgewechselt haben.",
      teaser: [
        "Warum gemischte Cluster-B-Muster besonders chaotische Beziehungsdynamiken erzeugen",
        "Wie narzisstische Kälte und Borderline-Intensität im Wechsel wirken",
        "Was maximale Verwirrung mit deinem Nervensystem macht",
      ],
      triggers: {
        manipulation: [3, 5],
        control: [3, 5],
        unpredictability: [3, 5],
        egoism: [3, 5],
        disrespect: [3, 5],
      },
    },
    narc_clear: {
      name: "Klare Anzeichen narzisstischer Muster",
      icon: "⚡",
      summary:
        "Deine Antworten zeigen ein ausgeprägtes Muster – mehrere Kerndimensionen des Narzissmus traten deutlich auf.",
      teaser: [
        "Was Grandiosität und Anspruchsdenken über deine Beziehungsdynamik verraten",
        "Warum Schuldumkehr dein Selbstbild so stark verändert hat",
        "Welche Manipulationsmuster am häufigsten in WLW-Beziehungen auftreten",
      ],
      triggers: {},
    },
    narc_likely: {
      name: "Deutliche Anzeichen narzisstischer Muster",
      icon: "◑",
      summary:
        "Mehrere Muster deuten auf narzisstische Dynamiken hin – in einzelnen Bereichen besonders stark.",
      teaser: [
        "Welche Dimensionen in deiner Beziehung am stärksten ausgeprägt waren",
        "Wie Empathiemangel und Kontrolle zusammenspielen",
        "Was dein Ergebnis für deine nächsten Schritte bedeutet",
      ],
      triggers: {},
    },
    narc_possible: {
      name: "Einzelne narzisstische Muster vorhanden",
      icon: "◐",
      summary: "Einige Verhaltensmuster traten auf, aber nicht durchgängig in allen Bereichen.",
      teaser: [
        "Welche Muster erkennbar waren – und welche weniger ausgeprägt",
        "Wie du narzisstische Tendenzen von anderen Dynamiken abgrenzt",
        "Nächste Schritte für dein Verständnis der Beziehung",
      ],
      triggers: {},
    },
    narc_none: {
      name: "Keine klaren narzisstischen Anzeichen",
      icon: "○",
      summary:
        "Deine Antworten zeigen wenig Hinweise auf Narzissmus – andere toxische Dynamiken könnten relevanter sein.",
      teaser: [
        "Was dein Ergebnis tatsächlich bedeutet",
        "Andere Muster, die toxische Beziehungen verursachen können",
        "Welche Schritte jetzt für dich sinnvoll sind",
      ],
      triggers: {},
    },
  };
  const catKeys = ["manipulation", "control", "disrespect", "unpredictability", "egoism"];
  const catLabels = ["Manipulation", "Kontrolle", "Abwertung", "Chaos", "Egoismus"];
  function scoreLabel(t) {
    return t <= 15
      ? "Geringe Toxizität"
      : t <= 35
        ? "Moderate Toxizität"
        : t <= 55
          ? "Hohe Toxizität"
          : "Sehr hohe Toxizität";
  }
  function avgs(ans) {
    return [0, 1, 2, 3, 4].map((c) => {
      const xs = Q.map((q, i) => (q.cat === c ? ans[i] : -1)).filter((v) => v >= 0);
      return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
    });
  }
  function matchProfile(a) {
    const scores = {};
    catKeys.forEach((k, i) => (scores[k] = a[i]));
    let best = 0,
      key = "cluster_b_mix";
    Object.entries(profiles).forEach(([pk, p]) => {
      let m = 0;
      Object.entries(p.triggers).forEach(([cat, r]) => {
        if (scores[cat] >= r[0] && scores[cat] <= r[1]) m++;
      });
      if (m > best) {
        best = m;
        key = pk;
      }
    });
    return { key, ...profiles[key] };
  }
  // Sonderfall (07.11.2026): Bei Gesamtscore bis 15 fiel matchProfile ohne Treffer auf cluster_b_mix zurück.
  // Test und Report nutzen beide resultProfile, damit sie dasselbe Ergebnis zeigen.
  const LOW_MAX = 15;
  const lowProfile = {
    key: "low",
    name: "Wenige Hinweise",
    hint: "",
    icon: "○",
    summary: "Deine Antworten zeigen wenig von den Mustern, die dieser Test abfragt.",
  };
  function resultProfile(a, sum) {
    return sum <= LOW_MAX ? { ...lowProfile } : matchProfile(a);
  }
  // Radar: auf dem Handy (<=850px) kompakte, mitlaufende Version; Werte werden weich animiert
  const radarMQ = window.matchMedia("(max-width:850px)");
  let radarShown = null, radarRaf = 0;
  // opts (optional): { canvas, full, size, dpr } – der Report nutzt dieselbe Zeichenfunktion in voller Größe
  function drawRadarFrame(vals, opts) {
    const o = opts || {};
    const c = o.canvas || $("#radar");
    if (!c) return;
    const compact = !o.full && radarMQ.matches;
    const dpr = o.dpr || window.devicePixelRatio || 1;
    let W, H;
    if (compact) { W = 200; H = 124; }
    else { W = H = o.size || Math.max(220, Math.min(c.parentElement.clientWidth - 20, 390)); }
    c.width = W * dpr;
    c.height = H * dpr;
    c.style.width = W + "px";
    c.style.height = H + "px";
    const ctx = c.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    /* Seitliche Beschriftungen duerfen bei schmalen Diagrammen nicht abgeschnitten werden */
    const r = compact ? 46 : Math.min(W * 0.36, (W / 2 - 30) / 0.951 - 32);
    const N = 5;
    ctx.font = (compact ? "600 10px" : "12px") + " Lato, sans-serif";
    ctx.textBaseline = "middle";
    for (let step = 1; step <= 5; step++) {
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / N;
        const rr = (r * step) / 5;
        const x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(244,237,228,.15)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    for (let i = 0; i < N; i++) {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / N;
      const ca = Math.cos(ang), sa = Math.sin(ang);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + ca * r, cy + sa * r);
      ctx.strokeStyle = "rgba(244,237,228,.15)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "rgba(244,237,228,.85)";
      if (compact) {
        ctx.textAlign = ca > 0.3 ? "left" : ca < -0.3 ? "right" : "center";
        ctx.fillText(catLabels[i], cx + ca * (r + 6), cy + sa * (r + 10));
      } else {
        ctx.textAlign = "center";
        ctx.fillText(catLabels[i], cx + ca * (r + 32), cy + sa * (r + 24));
      }
    }
    function poly(data, fill, stroke) {
      ctx.beginPath();
      data.forEach((v, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / N;
        const rr = (r * v) / 5;
        const x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
    }
    /* Bereichsfarbe der Seite (unbond-bereich.css, --ub-c), sonst Mauve von Klarheit */
    const sig = (getComputedStyle(document.body).getPropertyValue("--ub-c").trim() || "#B4869F").replace("#", "");
    const sigRgb = sig.length === 6 ? [0, 2, 4].map((k) => parseInt(sig.slice(k, k + 2), 16)).join(",") : "180,134,159";
    poly([1.5, 1.5, 1.5, 1.5, 1.5], "rgba(232,232,232,.06)", "rgba(232,232,232,.35)");
    poly(vals, "rgba(" + sigRgb + ",.32)", "rgba(" + sigRgb + ",1)");
  }
  function drawRadar(vals) {
    cancelAnimationFrame(radarRaf);
    const from = radarShown, to = vals.slice();
    const same = !from || from.every((v, i) => Math.abs(v - to[i]) < 0.001);
    if (same || window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
      radarShown = to; drawRadarFrame(to); return;
    }
    const t0 = performance.now(), dur = 380;
    (function step(now) {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      const cur = to.map((v, i) => from[i] + (v - from[i]) * e);
      radarShown = cur; drawRadarFrame(cur);
      if (k < 1) radarRaf = requestAnimationFrame(step);
      else radarShown = to;
    })(t0);
  }
  // Header-Höhe für das mitlaufende Mini-Diagramm (fixe Kopfzeile + Krisenleiste)
  function setStickyTop() {
    const h = document.querySelector("header.topnav");
    const top = h ? Math.max(0, Math.round(h.getBoundingClientRect().bottom)) : 0;
    document.documentElement.style.setProperty("--tox-sticky-top", top + "px");
  }
  setStickyTop();
  window.addEventListener("scroll", setStickyTop, { passive: true });
  window.addEventListener("resize", setStickyTop);
  // Schmale Schnittstelle für report.js: gleiche Fragen, Profile und Diagramm-Zeichnung wie im Test
  window.__unbondTox = { Q, profiles, catKeys, catLabels, avgs, matchProfile, resultProfile, scoreLabel, drawRadarFrame, gtagEvent };
  const tox = $("#toxikometer");
  if (tox) {
    let ans;
    try { ans = JSON.parse(localStorage.getItem("tox_step_scores") || "null"); } catch (e) {}
    if (!Array.isArray(ans) || ans.length !== 15) ans = Array(15).fill(-1);
    let current = ans.findIndex((v) => v < 0);
    if (current < 0) current = 14;
    const els = {
      step: $("#tox-step"), cat: $("#tox-cat"), bar: $("#tox-bar"), q: $("#tox-question"),
      buttons: $$(".score-btn"), total: $("#tox-total"), profile: $("#tox-profile"),
      label: $("#tox-label"), summary: $("#tox-summary"), done: $("#tox-done")
    };
    function total(){ return ans.reduce((a,b)=>a+Math.max(0,b),0); }
    function completed(){ return ans.every((v)=>v>=0); }
    function render(){
      const p=resultProfile(avgs(ans),total());
      els.step.textContent=`Frage ${Math.min(current+1,Q.length)} von ${Q.length}`;
      els.cat.textContent=Q[current].label;
      els.q.textContent=Q[current].q;
      els.bar.style.width=((current+(ans[current]>=0?1:0))/Q.length)*100+"%";
      els.total.innerHTML=`${total()}<span style="font-size:20px;color:rgba(244,237,228,.35)">/75</span>`;
      els.buttons.forEach((b,i)=>{const on=ans[current]===i;b.classList.toggle("selected",on);b.setAttribute("aria-pressed",on?"true":"false");});
      if(completed()){
        els.profile.textContent=p.name;
        els.label.textContent=scoreLabel(total());
        tox.classList.add("is-done");
        const rn=document.getElementById("tox-result-name");
        const rs=document.getElementById("tox-result-summary");
        if(rn)rn.textContent=p.icon+" "+p.name;
        if(rs)rs.textContent=(p.hint?"Dein Ergebnis zeigt "+p.hint+". ":"")+p.summary;
        if(els.summary)els.summary.innerHTML=`<div style="font-size:56px">${p.icon}</div><p class="eyebrow">Deine vollständige Auswertung</p><h3>${p.name}</h3>${p.hint?`<p class="muted">Dein Ergebnis zeigt ${p.hint}.</p>`:""}<p>${p.summary}</p><p class="muted">Score: <strong>${total()}/75</strong> · ${scoreLabel(total())}</p>`;
        if(els.done)els.done.classList.add("show");
        if(!tox.dataset.scrolled){
          tox.dataset.scrolled="1";
          setTimeout(()=>document.getElementById("tox-result-banner").scrollIntoView({behavior:"smooth",block:"center"}),300);
        }
        setTimeout(()=>drawRadar(avgs(ans)),0);
      }else{
        els.profile.textContent="";
        els.label.textContent="";
        tox.classList.remove("is-done");
        tox.dataset.scrolled="";
        if(els.done)els.done.classList.remove("show");
      }
      drawRadar(avgs(ans));
    }
    els.buttons.forEach((b,i)=>b.addEventListener("click",()=>{
      const isFirst=ans.every((v)=>v<0);
      if(isFirst){gtagEvent("toxikometer_start");gtagEvent("quiz_start",{event_category:"ToxiCometer",event_label:"Erste Antwort gegeben"});}
      gtagEvent("answer_selected",{event_category:"ToxiCometer",question_number:current+1});
      ans[current]=i;
      try{localStorage.setItem("tox_step_scores",JSON.stringify(ans));localStorage.setItem("tox_version","15q-direct");}catch(e){}
      if(current<Q.length-1)current++;else{
        gtagEvent("toxikometer_complete",{event_category:"ToxiCometer"});
        gtagEvent("quiz_complete",{event_category:"ToxiCometer",event_label:"Frage 15 beantwortet"});
      }
      render();
      const rc=document.querySelector(".radar-card");
      if(rc){rc.classList.remove("radar-bump");void rc.offsetWidth;rc.classList.add("radar-bump");}
    }));
    $("#tox-back").addEventListener("click",()=>{current=Math.max(0,current-1);render();});
    $("#tox-reset").addEventListener("click",()=>{
      ans=Array(15).fill(-1);current=0;
      try{localStorage.removeItem("tox_step_scores");localStorage.removeItem("tox_version");}catch(e){}
      render();
    });
    // Neustart auch aus dem Ergebnis-Kasten: Fragekarte ist nach Abschluss ausgegraut
    const restart=$("#tox-restart");
    if(restart)restart.addEventListener("click",()=>{
      $("#tox-reset").click();
      gtagEvent("toxikometer_restart",{event_category:"ToxiCometer"});
      tox.scrollIntoView({behavior:"smooth",block:"start"});
    });
    render();
    window.addEventListener("resize",()=>drawRadar(avgs(ans)));
  }
  /* Die Report-Seite (data-page="report") wird von report.js gerendert (Diagramm, Profil, Bild/Link, Tracking). */
})();
