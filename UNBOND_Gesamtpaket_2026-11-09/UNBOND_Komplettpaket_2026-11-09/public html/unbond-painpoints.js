/* UNBOND · Schmerzpunkt-Karten umdrehen
   - Maus (Gerät mit Hover): dreht sich über CSS :hover, Mausklick wird hier bewusst ignoriert.
   - Touch und Tastatur: Tippen auf die Karte bzw. Enter/Leertaste auf "Details aufdecken" dreht um.
   - Beide Seiten bleiben im DOM, Screenreader lesen also Vorder- und Rückseite.
   - Tracking: gleiches Ereignis wie zuvor ("pain_card_toggle"), nur mit Einwilligung über window.__unbondTrack. */
(() => {
  "use strict";

  const cards = document.querySelectorAll("[data-pf]");
  if (!cards.length) return;

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const seenByHover = new Set();

  const track = (state, name) => {
    if (typeof window.__unbondTrack === "function") {
      window.__unbondTrack("pain_card_toggle", { card: name, state });
    }
  };

  cards.forEach((card) => {
    const name = card.dataset.pfName || "Karte";
    const button = card.querySelector(".pf-turn");

    card.addEventListener("click", (event) => {
      // Mausklick bei vorhandenem Hover: die Karte dreht sich bereits über :hover.
      // Ein per Tastatur ausgelöster Klick hat detail === 0 und wird immer verarbeitet.
      if (finePointer.matches && event.detail > 0) return;
      const open = !card.classList.contains("is-flipped");
      card.classList.toggle("is-flipped", open);
      if (button) button.setAttribute("aria-pressed", String(open));
      track(open ? "open" : "closed", name);
    });

    card.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse" || !finePointer.matches || seenByHover.has(card)) return;
      seenByHover.add(card);
      track("open", name);
    });
  });
})();
