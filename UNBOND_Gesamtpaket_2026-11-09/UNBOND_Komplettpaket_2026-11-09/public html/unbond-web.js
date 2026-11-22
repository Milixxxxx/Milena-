/*
 * UNBOND Website-System – Hintergrundvideo.
 * - lädt das Video erst beim ersten Herunterscrollen (wie die Landingpage)
 * - bleibt bei "weniger Bewegung" oder Datensparmodus beim Standbild
 * - Pausenknopf, sobald das Video läuft (WCAG 2.2.2)
 */
(function () {
  "use strict";

  var wrap = document.querySelector(".web-bg");
  var video = wrap && wrap.querySelector("video");
  var button = document.querySelector(".web-bg-toggle");
  if (!video || !button) return;

  var connection = navigator.connection || {};
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var saveData = connection.saveData === true || /(^|-)2g$/.test(connection.effectiveType || "");
  if (reduceMotion || saveData) return;

  var started = false;
  var loading = false;
  var lastY = window.scrollY;

  function label(playing) {
    button.textContent = playing ? "❚❚" : "▶";
    button.setAttribute("aria-label", playing ? "Hintergrundvideo pausieren" : "Hintergrundvideo abspielen");
    button.setAttribute("aria-pressed", playing ? "false" : "true");
  }

  function start() {
    if (started || loading) return;
    loading = true;
    video.muted = true;
    video.setAttribute("src", video.getAttribute("data-src"));
    var attempt = video.play();
    Promise.resolve(attempt).then(function () {
      started = true;
      loading = false;
      button.classList.add("is-visible");
      label(true);
      window.removeEventListener("scroll", onScroll);
    }).catch(function () {
      loading = false;
    });
  }

  function onScroll() {
    var y = window.scrollY;
    var down = y > lastY;
    lastY = y;
    if (down && y > 8) start();
  }

  button.addEventListener("click", function () {
    if (video.paused) {
      video.play();
      label(true);
    } else {
      video.pause();
      label(false);
    }
  });

  window.addEventListener("scroll", onScroll, { passive: true });
})();
