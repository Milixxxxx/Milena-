/* UNBOND – Breaking Chains · Verkaufsseite + Danke-Seite
   Consent, Tracking, Interaktionen. Eventliste: TRACKING_UND_MESSUNG.md */
(() => {
  "use strict";

  const config = window.UNBOND_CONFIG || {};
  const product = config.product || {};
  const bonusUpgrade = config.bonusUpgrade || {};
  const tracking = config.tracking || {};
  const pageType = ({ sales: "core_sales", "thank-you": "thank_you" })[document.body.dataset.page] || document.body.dataset.page || "core_sales";

  /* ---------- Early-Bird: bis zum Stichtag 29 €, danach automatisch regulärer Preis ---------- */
  const earlyBirdEnd = Date.parse(product.earlyBirdUntil || "");
  const earlyBirdActive = () => Number.isFinite(earlyBirdEnd) && Date.now() < earlyBirdEnd;
  const currentPrice = () => earlyBirdActive() || !product.regularValue
    ? { display: product.priceDisplay || "29 €", value: Number(product.value || 29) }
    : { display: product.regularPriceDisplay, value: Number(product.regularValue) };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const consentKeys = Object.freeze({ decision: "cookie_consent", analytics: "consent_analytics", marketing: "consent_marketing" });

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
  let analyticsReady = false;
  let marketingReady = false;

  const readStorage = (key) => { try { return localStorage.getItem(key); } catch (_) { return null; } };
  const writeStorage = (key, value) => { try { localStorage.setItem(key, value); } catch (_) {} };
  const removeStorage = (key) => { try { localStorage.removeItem(key); } catch (_) {} };

  /* ---------- Interner Traffic: ?preview=true schließt diesen Browser dauerhaft aus ---------- */
  const query = new URLSearchParams(window.location.search);
  if (query.get("preview") === "true") writeStorage("internal_traffic", "true");
  if (query.get("preview") === "false") removeStorage("internal_traffic");
  const isInternal = () => readStorage("internal_traffic") === "true";

  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const getUtmParameters = () => UTM_KEYS.reduce((values, key) => {
    const value = query.get(key);
    if (value) values[key] = value.slice(0, 120);
    return values;
  }, {});
  const firstParam = (names) => {
    for (const name of names || []) {
      const value = query.get(name);
      if (value) return value.slice(0, 120);
    }
    return "";
  };

  /* ---------- gtag-Grundgerüst: Aufrufe vor der Einwilligung werden verworfen ---------- */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    if (!analyticsReady) return;
    window.dataLayer.push(arguments);
  };

  const track = (name, parameters = {}) => {
    if (!analyticsReady || isInternal()) return;
    window.gtag("event", name, limitParams(Object.assign({
      transport_type: "beacon",
      page_type: pageType,
      content_version: config.contentVersion || "unknown"
    }, getUtmParameters(), parameters)));
  };
  window.__unbondTrack = track;

  const hasConsent = (category) => readStorage(consentKeys[category]) === "granted";

  const loadExternalScript = (src, id) => {
    if (!src || (id && document.getElementById(id))) return;
    const script = document.createElement("script");
    if (id) script.id = id;
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  };

  const loadAnalytics = () => {
    if (analyticsReady || isInternal() || TRACKING_MODE === "aus") return;
    analyticsReady = true;
    if (tracking.gaId) {
      loadExternalScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tracking.gaId)}`, "unbond-ga4");
      const ads = TRACKING_MODE === "voll" && hasConsent("marketing") ? "granted" : "denied";
      window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: ads, ad_user_data: ads, ad_personalization: ads });
      window.gtag("js", new Date());
      window.gtag("config", tracking.gaId, {
        send_page_view: false,
        allow_google_signals: TRACKING_MODE === "voll",
        allow_ad_personalization_signals: TRACKING_MODE === "voll",
        linker: { domains: tracking.crossDomains || [], accept_incoming: true }
      });
      window.gtag("event", "page_view", Object.assign({
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname + window.location.search,
        page_type: pageType
      }, getUtmParameters()));
    }
    if (tracking.clarityId && TRACKING_MODE === "voll") {
      window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
      loadExternalScript(`https://www.clarity.ms/tag/${encodeURIComponent(tracking.clarityId)}`, "unbond-clarity");
    }
    if (pageType === "core_sales") track("sales_page_view");
  };

  const loadMarketing = () => {
    if (marketingReady || isInternal() || TRACKING_MODE !== "voll") return;
    marketingReady = true;
    if (analyticsReady) window.gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
    if (tracking.metaPixelId) {
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
        t = b.createElement(e); t.async = true; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      window.fbq("init", tracking.metaPixelId);
      window.fbq("track", "PageView");
    }
    if (tracking.pinterestTagId) {
      window.pintrk = window.pintrk || function () { (window.pintrk.queue = window.pintrk.queue || []).push(Array.from(arguments)); };
      window.pintrk.version = "3.0";
      loadExternalScript("https://s.pinimg.com/ct/core.js", "unbond-pinterest");
      window.pintrk("load", tracking.pinterestTagId);
      window.pintrk("page");
      window.pintrk("track", "pagevisit");
    }
  };

  /* Marketing-Events nur mit Marketing-Einwilligung */
  const trackMarketing = (kind, data) => {
    if (!marketingReady || isInternal()) return;
    const meta = { InitiateCheckout: "InitiateCheckout", ViewContent: "ViewContent", Purchase: "Purchase" }[kind];
    if (meta && typeof window.fbq === "function") {
      const payload = { value: data.value, currency: data.currency, content_ids: [data.product_id], content_name: data.product_name, content_type: "product" };
      if (kind === "Purchase" && data.transaction_id) window.fbq("track", meta, payload, { eventID: data.transaction_id });
      else window.fbq("track", meta, payload);
    }
    const pin = { InitiateCheckout: "addtocart", Purchase: "checkout" }[kind];
    if (pin && typeof window.pintrk === "function") {
      window.pintrk("track", pin, Object.assign({
        value: data.value, currency: data.currency, order_quantity: 1,
        line_items: [{ product_id: data.product_id, product_name: data.product_name, product_price: data.value, product_quantity: 1 }]
      }, data.transaction_id ? { order_id: data.transaction_id, event_id: data.transaction_id } : {}));
    }
  };

  const productData = (source = product) => ({
    product_id: source.id || "695399",
    product_name: source.name || "UNBOND – Breaking Chains (CORE-Edition)",
    currency: source.currency || "EUR",
    value: source === product ? currentPrice().value : Number(source.value || 0),
    price_phase: source === product ? (earlyBirdActive() ? "early_bird" : "regular") : "standard"
  });

  /* ---------- Kauf-Messung auf danke.html (einmal pro Bestellnummer) ---------- */
  const firePurchase = () => {
    if (pageType !== "thank_you") return;
    const orderId = firstParam(tracking.thankYouOrderParams);
    const amount = parseFloat((firstParam(tracking.thankYouAmountParams) || "").replace(",", "."));
    const productId = firstParam(tracking.thankYouProductParams) || product.id;
    const key = `purchase_sent_${orderId || "ohne-bestellnummer"}`;
    if (!orderId) {
      track("thank_you_without_order_id");       // Hinweis für die Einrichtung, kein Kauf
      return;
    }
    if (readStorage(key)) return;
    const base = productId === bonusUpgrade.id ? productData(bonusUpgrade) : productData(product);
    const value = Number.isFinite(amount) && amount > 0 ? amount : base.value;
    const data = Object.assign({}, base, { value, transaction_id: orderId });
    let sent = false;
    if (analyticsReady) {
      track("purchase", {
        transaction_id: orderId, value, currency: data.currency,
        items: [{ item_id: data.product_id, item_name: data.product_name, price: value, quantity: 1 }]
      });
      sent = true;
    }
    if (marketingReady) { trackMarketing("Purchase", data); sent = true; }
    if (sent) writeStorage(key, "1");
  };

  const applyConsent = () => {
    if (hasConsent("analytics")) loadAnalytics();
    if (hasConsent("marketing")) loadMarketing();
    firePurchase();
  };

  /* ---------- Cookie-Leiste: kompakt, blockiert die Seite nicht ---------- */
  const cookieBanner = $("#cookieBanner");
  const cookieReopen = $("#cookieReopen");
  const analyticsInput = $("#cookieAnalytics");
  const marketingInput = $("#cookieMarketing");
  const syncConsentInputs = () => {
    if (analyticsInput) analyticsInput.checked = hasConsent("analytics");
    if (marketingInput) marketingInput.checked = hasConsent("marketing");
  };
  const setCookieVisibility = (visible) => {
    if (!cookieBanner) return;
    cookieBanner.hidden = !visible;
    cookieReopen?.setAttribute("aria-expanded", String(visible));
  };
  const saveConsent = (analytics, marketing) => {
    const hadAnalytics = hasConsent("analytics");
    const hadMarketing = hasConsent("marketing");
    writeStorage(consentKeys.decision, "set");
    writeStorage(consentKeys.analytics, analytics ? "granted" : "denied");
    writeStorage(consentKeys.marketing, marketing ? "granted" : "denied");
    setCookieVisibility(false);
    if ((hadAnalytics && !analytics) || (hadMarketing && !marketing)) { window.location.reload(); return; }
    applyConsent();
    const live = $("#liveStatus");
    if (live) live.textContent = "Datenschutz-Einstellungen gespeichert.";
  };
  $("#cookieAcceptAll")?.addEventListener("click", () => saveConsent(true, true));
  $("#cookieRejectAll")?.addEventListener("click", () => saveConsent(false, false));
  $("#cookieSaveSelection")?.addEventListener("click", () => saveConsent(Boolean(analyticsInput?.checked), Boolean(marketingInput?.checked)));
  cookieReopen?.addEventListener("click", () => {
    syncConsentInputs();
    setCookieVisibility(true);
    $("#cookieAcceptAll")?.focus();
  });
  cookieBanner?.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && readStorage(consentKeys.decision)) setCookieVisibility(false);
  });

  if (readStorage(consentKeys.decision)) {
    syncConsentInputs();
    setCookieVisibility(false);
    applyConsent();
  } else {
    setCookieVisibility(true);
  }

  /* ---------- Kopfzeile ---------- */
  const header = $("[data-header]");
  window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 12), { passive: true });

  /* ---------- Early-Bird-Anzeige und ruhiger Countdown ---------- */
  const applyPrice = () => {
    const price = currentPrice();
    $$("[data-price]").forEach((node) => { node.textContent = price.display; });
    const active = earlyBirdActive();
    $$("[data-eb-only]").forEach((node) => { node.hidden = !active; });
    return active;
  };
  const updateTimer = () => {
    if (!applyPrice()) return false;
    const left = Math.max(0, earlyBirdEnd - Date.now());
    const days = Math.floor(left / 86400000);
    const hours = Math.floor((left % 86400000) / 3600000);
    const minutes = Math.floor((left % 3600000) / 60000);
    $$("[data-eb-timer]").forEach((timer) => {
      const d = $("[data-t-days]", timer), h = $("[data-t-hours]", timer), m = $("[data-t-min]", timer);
      if (d) d.textContent = String(days);
      if (h) h.textContent = String(hours);
      if (m) m.textContent = String(minutes);
    });
    return true;
  };
  if (updateTimer()) {
    const timerId = window.setInterval(() => { if (!updateTimer()) window.clearInterval(timerId); }, 30000);
  }

  /* ---------- Schmerzpunkt-Karten ---------- */
  $$(".oflip-card").forEach((card) => {
    const tag = $(".oflip-tag", card)?.textContent.trim() || "Karte";
    const front = $(".oflip-front", card);
    const back = $(".oflip-back", card);
    back?.setAttribute("aria-hidden", "true");
    const toggle = () => {
      const open = card.classList.toggle("flipped");
      card.setAttribute("aria-label", `${tag} – ${open ? "Karte zurückdrehen" : "Karte umdrehen"}`);
      front?.setAttribute("aria-hidden", String(open));
      back?.setAttribute("aria-hidden", String(!open));
      track("pain_card_toggle", { card: tag, state: open ? "open" : "closed" });
    };
    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggle();
    });
  });

  /* ---------- Aufklappbereiche ---------- */
  $("[data-steps-more]")?.addEventListener("toggle", (event) => { if (event.target.open) track("program_steps_open"); });
  $("[data-author-more]")?.addEventListener("toggle", (event) => { if (event.target.open) track("author_more_open"); });
  const comparisonDetails = $(".comparison-details--journey");
  if (comparisonDetails) {
    const comparisonStatus = $("[data-comparison-status]", comparisonDetails);
    const comparisonAction = $("[data-comparison-action]", comparisonDetails);
    const updateComparisonState = () => {
      const open = comparisonDetails.open;
      if (comparisonStatus) comparisonStatus.textContent = open ? "Schritte schließen" : "Klicke oder tippe, um die Schritte zu öffnen.";
      if (comparisonAction) comparisonAction.textContent = open ? "Schritte schließen" : "Schritte öffnen";
    };
    updateComparisonState();
    comparisonDetails.addEventListener("toggle", () => {
      updateComparisonState();
      if (comparisonDetails.open) track("comparison_steps_open");
    });
  }

  /* ---------- Sichtbarkeit wichtiger Abschnitte (einmal pro Seitenaufruf) ---------- */
  const observeOnce = (selector, onSeen, threshold = 0.35) => {
    const element = $(selector);
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { onSeen(); observer.disconnect(); }
    }, { threshold });
    observer.observe(element);
  };
  observeOnce("#angebot", () => { track("offer_view", productData()); trackMarketing("ViewContent", productData()); });
  observeOnce("[data-t-track]", () => track("testimonials_view"), 0.4);
  observeOnce("#faq", () => track("faq_view"), 0.2);

  /* ---------- Testimonials: Punkte zur Wischposition ---------- */
  const testimonialTrack = $("[data-t-track]");
  const testimonialDots = $$("[data-t-dots] span");
  if (testimonialTrack) {
    const cards = $$(".t-card", testimonialTrack);
    const updateDots = () => {
      const left = testimonialTrack.scrollLeft;
      let active = 0;
      cards.forEach((card, index) => {
        if (Math.abs(card.offsetLeft - testimonialTrack.offsetLeft - left) < Math.abs(cards[active].offsetLeft - testimonialTrack.offsetLeft - left)) active = index;
      });
      if (left + testimonialTrack.clientWidth >= testimonialTrack.scrollWidth - 4) active = cards.length - 1;
      testimonialDots.forEach((dot, index) => dot.classList.toggle("is-active", index === active));
    };
    testimonialTrack.addEventListener("scroll", () => window.requestAnimationFrame(updateDots), { passive: true });
  }

  /* ---------- FAQ: immer nur eine offen ---------- */
  $$(".faq-list details").forEach((item, index, items) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      items.forEach((other) => { if (other !== item) other.open = false; });
      track("faq_open", { faq_number: index + 1, faq_question: $(".faq-question", item)?.textContent.trim().slice(0, 90) || "" });
    });
  });

  /* ---------- Kaufbuttons (CORE) ---------- */
  const utm = getUtmParameters();
  const withUtm = (url) => {
    const target = new URL(url);
    Object.entries(utm).forEach(([key, value]) => target.searchParams.set(key, value));
    return target.toString();
  };
  $$(".core-cta").forEach((link) => {
    link.href = withUtm(product.checkoutUrl || "https://www.checkout-ds24.com/product/695399");
    link.addEventListener("click", () => {
      const data = Object.assign({ cta_location: link.dataset.ctaLocation || "unknown", destination: "core_checkout" }, productData());
      track("core_cta_click", data);
      trackMarketing("InitiateCheckout", data);
    });
  });

  /* ---------- Bonus-Upgrade (nur danke.html) ---------- */
  const bonusPriceNode = $("[data-bonus-price]");
  if (bonusPriceNode && bonusUpgrade.priceDisplay) bonusPriceNode.textContent = bonusUpgrade.priceDisplay;
  $$(".bonus-cta").forEach((link) => {
    link.href = withUtm(bonusUpgrade.checkoutUrl || "https://www.checkout-ds24.com/product/695410");
    link.addEventListener("click", () => {
      const data = Object.assign({ cta_location: link.dataset.ctaLocation || "bonus-upgrade", destination: "bonus_checkout" }, productData(bonusUpgrade));
      track("bonus_cta_click", data);
      trackMarketing("InitiateCheckout", data);
    });
  });
  $("[data-bonus-upgrade]")?.addEventListener("toggle", (event) => { if (event.target.open) track("bonus_upgrade_open"); });

  /* ---------- Weitere Klickziele ---------- */
  $$("[data-track-event]").forEach((link) => {
    link.addEventListener("click", () => track(link.dataset.trackEvent, { cta_location: link.dataset.trackLocation || "seitenende_auffangnetz", destination: link.getAttribute("href"), tool: link.dataset.tool || "" }));
  });
  $$("[data-footer-link]").forEach((link) => {
    link.addEventListener("click", () => track("footer_nav_click", { destination: link.dataset.footerLink }));
  });

  /* ---------- Zugangszeitraum nur anzeigen, wenn eingetragen ---------- */
  const accessItem = $("[data-access-period]");
  if (accessItem && product.accessPeriodDisplay) {
    accessItem.textContent = product.accessPeriodDisplay;
    accessItem.hidden = false;
  }

  /* ---------- Staging-Hinweis ---------- */
  const stagingWarning = $("#stagingWarning");
  const needsCheck = config.environment !== "production" || product.checkoutPublished === false || product.endPriceVerified === false
    || (product.accessPeriodDisplay && product.accessPeriodVerified === false);
  if (stagingWarning) stagingWarning.hidden = !needsCheck;

  /* ---------- Modul-Popups ---------- */
  const moduleDialogBackdrop = $("[data-module-dialog]");
  const moduleDialog = moduleDialogBackdrop ? $(".module-dialog", moduleDialogBackdrop) : null;
  const moduleDialogNumber = moduleDialogBackdrop ? $("[data-module-number]", moduleDialogBackdrop) : null;
  const moduleDialogTitle = moduleDialogBackdrop ? $("[data-module-title]", moduleDialogBackdrop) : null;
  const moduleDialogDescription = moduleDialogBackdrop ? $("[data-module-description]", moduleDialogBackdrop) : null;
  const moduleDialogImage = moduleDialogBackdrop ? $("[data-module-image]", moduleDialogBackdrop) : null;
  let moduleDialogTrigger = null;

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* v16: Popup öffnet sich waagerecht wie ein Akkordeon-Panel (Elastic Gallery):
     linke Karte → Panel geht nach rechts auf, rechte Karte → nach links. Nur clip-path/transform/opacity. */
  const ELASTIC = "cubic-bezier(.25,1,.5,1)";
  const moduleShade = moduleDialogBackdrop ? $(".module-dialog-shade", moduleDialogBackdrop) : null;
  const moduleGrid = $(".module-grid-phases");
  let moduleAnims = [];
  let moduleDir = "right";
  const stopModuleAnims = () => { moduleAnims.forEach((x) => x.cancel()); moduleAnims = []; };
  const collapsedClip = (dir) => dir === "right" ? "inset(0% 84% 0% 0% round 18px)" : "inset(0% 0% 0% 84% round 18px)";
  const closeModuleDialog = () => {
    if (!moduleDialogBackdrop || moduleDialogBackdrop.hidden || moduleDialogBackdrop.classList.contains("is-closing")) return;
    const finish = () => {
      stopModuleAnims();
      moduleDialogBackdrop.classList.remove("is-closing");
      moduleDialogBackdrop.hidden = true;
      document.body.classList.remove("module-dialog-open");
      if (moduleDialogImage) { moduleDialogImage.removeAttribute("src"); moduleDialogImage.alt = ""; }
      moduleDialogTrigger?.focus({ preventScroll: true });
    };
    if (reduceMotion || !moduleDialog.animate) { finish(); return; }
    moduleDialogBackdrop.classList.add("is-closing");
    stopModuleAnims();
    const opt = { duration: 460, easing: "cubic-bezier(.5,0,.75,0)", fill: "forwards" };
    moduleAnims = [
      moduleDialog.animate([{ clipPath: "inset(0% 0% 0% 0% round 18px)", opacity: 1 }, { opacity: 1, offset: .7 }, { clipPath: collapsedClip(moduleDir), opacity: 0 }], opt),
      moduleDialogBackdrop.animate([{ opacity: 1 }, { opacity: 0 }], opt),
    ];
    if (moduleShade) moduleAnims.push(moduleShade.animate([{ opacity: 0 }, { opacity: .55 }], opt));
    moduleAnims[0].onfinish = finish;
  };
  const openModuleDialog = (trigger) => {
    if (!moduleDialogBackdrop || !moduleDialog) return;
    moduleDialogTrigger = trigger;
    if (moduleDialogNumber) moduleDialogNumber.textContent = trigger.dataset.number || "";
    if (moduleDialogTitle) moduleDialogTitle.textContent = trigger.dataset.title || "";
    if (moduleDialogDescription) moduleDialogDescription.textContent = trigger.dataset.description || "";
    if (moduleDialogImage) {
      moduleDialogImage.src = trigger.dataset.image || "";
      moduleDialogImage.alt = `${trigger.dataset.number || ""} – ${trigger.dataset.title || "UNBOND – Breaking Chains"}`;
    }
    const r = trigger.getBoundingClientRect();
    const g = moduleGrid ? moduleGrid.getBoundingClientRect() : { left: 0, width: window.innerWidth };
    moduleDir = (r.left + r.width / 2) > (g.left + g.width / 2) + 4 ? "left" : "right";
    moduleDialogBackdrop.hidden = false;
    document.body.classList.add("module-dialog-open");
    track("module_open", { module_number: trigger.dataset.number || "", module_title: trigger.dataset.title || "" });
    if (reduceMotion || !moduleDialog.animate) { window.requestAnimationFrame(() => moduleDialog.focus({ preventScroll: true })); return; }
    stopModuleAnims();
    moduleDialog.style.opacity = "0";
    const ready = moduleDialogImage && moduleDialogImage.decode ? moduleDialogImage.decode().catch(() => {}) : Promise.resolve();
    ready.then(() => {
      if (moduleDialogBackdrop.hidden || moduleDialogBackdrop.classList.contains("is-closing")) return;
      moduleDialog.style.opacity = "";
      moduleAnims = [
        moduleDialogBackdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: "ease-out" }),
        moduleDialog.animate([{ clipPath: collapsedClip(moduleDir), opacity: 0 }, { opacity: 1, offset: .18 }, { clipPath: "inset(0% 0% 0% 0% round 18px)", opacity: 1 }],
          { duration: 760, easing: ELASTIC }),
      ];
      if (moduleDialogImage) moduleAnims.push(moduleDialogImage.animate([{ transform: "scale(1.1)" }, { transform: "scale(1)" }], { duration: 1000, easing: ELASTIC }));
      if (moduleShade) moduleAnims.push(moduleShade.animate([{ opacity: .55 }, { opacity: 0 }], { duration: 700, easing: "ease-out", fill: "forwards" }));
      moduleDialog.focus({ preventScroll: true });
    });
  };
  /* Bild vorladen, sobald die Maus/der Finger auf eine Karte kommt – dann öffnet das Panel ohne Wartezeit */
  $$("[data-module-card]").forEach((card) => {
    const warm = () => { if (!card.dataset.warm && card.dataset.image) { card.dataset.warm = "1"; const im = new Image(); im.decoding = "async"; im.src = card.dataset.image; } };
    card.addEventListener("pointerenter", warm, { passive: true });
    card.addEventListener("touchstart", warm, { passive: true });
    card.addEventListener("focus", warm);
  });
  /* Elastic-Galerie: ein Klick auf ein schmales Panel öffnet es erst, ein Klick auf das offene Panel zeigt das Kapitel */
  $$("[data-module-card]").forEach((card) => card.addEventListener("click", () => {
    if (card.closest("[data-elastic]") && !card.classList.contains("is-active")) return;
    openModuleDialog(card);
  }));

  /* Phasen-Akkordeon: Schritte liegen eingeklappt unter jeder Phase */
  $$("[data-phase-toggle]").forEach((btn) => {
    const phase = btn.closest("[data-phase]");
    const inner = phase && $(".phase-panel-inner", phase);
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      phase.classList.toggle("is-open", open);
      if (inner) inner.inert = !open;
      const label = $(".phase-cue-text", btn);
      if (label) label.textContent = open ? "Schritte schließen" : "Schritte ansehen";
      if (open) {
        $$("img", phase).forEach((im) => { im.loading = "eager"; });
        track("phase_open", { phase: ($(".phase-num", btn)?.textContent || "").trim() });
      }
    });
  });

  /* Elastic-Galerie: aktives Panel wird breit (Hover, Fokus oder Tippen) */
  $$("[data-elastic]").forEach((gal) => {
    const items = $$(".elastic-item", gal);
    const activate = (item) => items.forEach((it) => it.classList.toggle("is-active", it === item));
    items.forEach((item) => {
      item.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") activate(item); });
      item.addEventListener("focus", () => { if (item.matches(":focus-visible")) activate(item); });
      item.addEventListener("click", () => { if (!item.classList.contains("is-active")) activate(item); });
    });
  });
  if (moduleDialogBackdrop && moduleDialog) {
    $$("[data-module-close]", moduleDialogBackdrop).forEach((button) => button.addEventListener("click", closeModuleDialog));
    moduleDialogBackdrop.addEventListener("click", (event) => { if (event.target === moduleDialogBackdrop) closeModuleDialog(); });
    document.addEventListener("keydown", (event) => {
      if (moduleDialogBackdrop.hidden) return;
      if (event.key === "Escape") { event.preventDefault(); closeModuleDialog(); return; }
      if (event.key !== "Tab") return;
      const focusable = $$('button, [href], [tabindex]:not([tabindex="-1"])', moduleDialog).filter((el) => !el.disabled && el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }
})();

/* =====================================================================
   v15 · Bewegung: Hero-Text (Buchstaben-Einstieg, Magnet-Effekt, Parallax)
   und Kapitelkarten (Einblenden, federnde Neigung). Nur transform/opacity.
   ===================================================================== */
(() => {
  "use strict";
  const mq = (q) => window.matchMedia && window.matchMedia(q).matches;
  if (mq("(prefers-reduced-motion: reduce)")) return;
  const finePointer = mq("(hover: hover) and (pointer: fine)");
  const root = document.documentElement;
  root.classList.add("motion-on");

  /* ---------- Federn: ein gemeinsamer rAF-Loop, läuft nur solange etwas schwingt ---------- */
  const springs = new Set();
  let loopId = 0;
  const tick = () => {
    let active = false;
    springs.forEach((sp) => {
      let moving = false;
      for (const k in sp.t) {
        const x = sp.v[k], t = sp.t[k];
        sp.vel[k] = (sp.vel[k] + (t - x) * sp.k) * sp.d;
        sp.v[k] = x + sp.vel[k];
        if (Math.abs(sp.vel[k]) > 0.001 || Math.abs(t - sp.v[k]) > 0.001) moving = true;
        else sp.v[k] = t;
      }
      sp.apply(sp.v);
      if (moving) active = true; else if (!sp.keep) springs.delete(sp);
    });
    loopId = active || [...springs].some((s) => s.keep) ? requestAnimationFrame(tick) : 0;
  };
  const wake = (sp) => { springs.add(sp); if (!loopId) loopId = requestAnimationFrame(tick); };
  const makeSpring = (init, apply, k = 0.14, d = 0.74) => ({ v: { ...init }, t: { ...init }, vel: Object.fromEntries(Object.keys(init).map((x) => [x, 0])), apply, k, d });

  /* Hero copy stays immediately visible: no delayed character split, magnet or parallax. */
  const heroTitle = document.getElementById("hero-title");
  if (heroTitle) heroTitle.removeAttribute("aria-label");

  /* ---------- Kapitelkarten ---------- */
  const reveal = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && reveal.length) {
    let batch = 0, batchTimer = 0;
    const io = new IntersectionObserver((entries) => {
      entries.filter((e) => e.isIntersecting).forEach((e) => {
        e.target.style.transitionDelay = `${(batch++ * 0.06).toFixed(2)}s`;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
        e.target.addEventListener("transitionend", () => { e.target.style.transitionDelay = ""; }, { once: true });
      });
      clearTimeout(batchTimer); batchTimer = setTimeout(() => { batch = 0; }, 120);
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    reveal.forEach((el) => io.observe(el));
  } else reveal.forEach((el) => el.classList.add("is-in"));

  /* No scroll-out fading: visitors can pause and read every section. */

})();
