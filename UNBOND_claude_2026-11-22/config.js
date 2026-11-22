/* Zentrale Konfiguration – alle veränderlichen Werte stehen nur hier.
   Dokumentation: TRACKING_UND_MESSUNG.md */
window.UNBOND_CONFIG = Object.freeze({
  environment: "production",            // umgestellt 28.09.2026 (Staging-Banner entfernt)
  contentVersion: "breaking-chains-core-v21-2026-09-27",
  product: Object.freeze({
    id: "695399",
    name: "UNBOND – Breaking Chains (CORE-Edition)",
    brand: "UNBOND",
    edition: "CORE",
    priceDisplay: "29 €",                // aktueller Preis (Early Bird)
    value: 29,
    regularPriceDisplay: "49 €",         // regulärer Preis der CORE-Edition
    regularValue: 49,
    earlyBirdUntil: "2026-12-31T23:59:59+01:00", // danach stellt die Seite automatisch auf 49 € um
    currency: "EUR",
    checkoutUrl: "https://www.checkout-ds24.com/product/695399",
    checkoutPublished: true,             // bestätigt von Milena am 24.09.2026
    endPriceVerified: true,              // bestätigt von Milena am 24.09.2026
    accessPeriodDisplay: "",             // z. B. "24 Monate Zugang" – nur eintragen, wenn technisch so eingerichtet
    accessPeriodVerified: false
  }),
  bonusUpgrade: Object.freeze({          // nur auf danke.html, nie auf der Verkaufsseite
    id: "695410",
    name: "UNBOND – Breaking Chains · Bonuskapitel D–F",
    priceDisplay: "19 €",
    value: 19,
    currency: "EUR",
    checkoutUrl: "https://www.checkout-ds24.com/product/695410"
  }),
  links: Object.freeze({
    noContact: "no-contact/index.html",
    privacy: "datenschutz.html",
    imprint: "impressum.html",
    contact: "mailto:info@unbond.de"
  }),
  tracking: Object.freeze({
    gaId: "G-QWHMYTHDDS",
    clarityId: "x60dqjcnxu",
    metaPixelId: "1006203895535173",
    pinterestDomainVerify: "0d30089f0beffef244c180710d88afe5",
    pinterestTagId: "2612878748458",     // angelegt 21.10.2026 im Pinterest Ads Manager (Werbekonto 549770810730)
    crossDomains: ["unbond.de", "www.unbond.de", "checkout-ds24.com", "www.checkout-ds24.com", "digistore24.com", "www.digistore24.com", "digistore24-app.com"],
    // Parameternamen, unter denen die Danke-Seite Bestellnummer und Betrag sucht (erster Treffer gewinnt).
    // Mit einer Testbestellung prüfen, welche Namen Digistore24 tatsächlich anhängt.
    thankYouOrderParams: ["order_id", "orderid", "transaction_id"],
    thankYouAmountParams: ["amount", "gross_amount", "value"],
    thankYouProductParams: ["product_id", "productid"]
  })
});
