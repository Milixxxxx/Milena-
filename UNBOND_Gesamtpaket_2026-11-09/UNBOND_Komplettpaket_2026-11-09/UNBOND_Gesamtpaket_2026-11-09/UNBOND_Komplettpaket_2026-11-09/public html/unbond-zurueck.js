/* UNBOND · Zurück-Knopf (06.11.2026)
   Kam die Besucherin von einer eigenen Seite, geht es genau dorthin zurück.
   Sonst (direkter Aufruf, fremde Seite) führt der Link zur übergeordneten Seite im href. */
(function () {
  var links = document.querySelectorAll("[data-zurueck]");
  if (!links.length) return;
  var fromOwnSite = false;
  try {
    fromOwnSite = !!document.referrer && new URL(document.referrer).origin === location.origin && history.length > 1;
  } catch (e) {
    fromOwnSite = false;
  }
  if (!fromOwnSite) return;
  Array.prototype.forEach.call(links, function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      history.back();
    });
  });
})();
