/* UNBOND · 5-4-3-2-1 Grounding · Eingaben bleiben im Browser und werden nicht gespeichert */
(function () {
  "use strict";
  var SENSES = ["", "SEHEN", "SPÜREN", "HÖREN", "RIECHEN", "SCHMECKEN"];
  var TIMER_SECONDS = 30;
  var RING_LENGTH = 283;
  var currentStep = 0;
  var isGuideOnly = false;
  var timerInterval = null;
  var lastFocus = null;
  var hasStarted = false;
  var modal = document.getElementById("sos-modal");
  var live = document.getElementById("tool-live");

  function track(name) {
    if (typeof window.__unbondTrack === "function") window.__unbondTrack(name, { tool: "flashback-stopper" });
  }

  function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function updateDate() {
    var el = document.getElementById("current-date-str");
    if (el) el.textContent = new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
  }

  function goToStep(step) {
    clearInterval(timerInterval);
    currentStep = step;
    document.querySelectorAll(".slide").forEach(function (s) { s.classList.add("hidden"); });
    var slide = document.getElementById("slide-" + step);
    slide.classList.remove("hidden");

    var progress = document.getElementById("progress-container");
    var inExercise = step >= 1 && step <= 5;
    progress.classList.toggle("hidden", !inExercise);
    if (inExercise) {
      document.getElementById("progress-bar-fill").style.width = (step / 5) * 100 + "%";
      document.getElementById("progress-track").setAttribute("aria-valuenow", String(step));
      document.getElementById("step-badge").textContent = "SCHRITT " + step + " VON 5";
      document.getElementById("step-sense-name").textContent = SENSES[step];
      if (isGuideOnly) startTimer(slide);
      if (!hasStarted) { hasStarted = true; track("tool_gestartet"); }
    }
    if (step === 6) { updateDate(); track("tool_abgeschlossen"); }

    var heading = slide.querySelector("h1, h2");
    if (heading) {
      live.textContent = heading.textContent.trim();
      heading.focus({ preventScroll: true });
    }
    window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
  }

  function setChecked(box, checked) {
    box.setAttribute("aria-pressed", String(checked));
    box.querySelector("svg").classList.toggle("hidden", !checked);
    box.classList.toggle("bg-accent-mint", checked);
    box.classList.toggle("border-accent-mint", checked);
    box.classList.toggle("bg-canvas-surface", !checked);
    box.classList.toggle("border-outline", !checked);
  }

  function startTimer(slide) {
    clearInterval(timerInterval);
    var label = slide.querySelector(".timer-countdown");
    var ring = slide.querySelector(".timer-circle");
    if (!label || !ring) return;
    var left = TIMER_SECONDS;
    label.textContent = left + "s";
    ring.style.strokeDashoffset = "0";
    timerInterval = setInterval(function () {
      left -= 1;
      if (left < 0) {
        clearInterval(timerInterval);
        label.textContent = "Fertig";
        return;
      }
      label.textContent = left + "s";
      ring.style.strokeDashoffset = String(RING_LENGTH - ((TIMER_SECONDS - left) / TIMER_SECONDS) * RING_LENGTH);
    }, 1000);
  }

  function setGuideMode(on) {
    isGuideOnly = on;
    document.getElementById("mode-label").textContent = on ? "Modus: Nur Anleitung" : "Modus: Interaktiv";
    document.querySelectorAll(".step-interactive-block").forEach(function (el) { el.classList.toggle("hidden", on); });
    document.querySelectorAll(".step-timer-block").forEach(function (el) {
      el.classList.toggle("hidden", !on);
      el.classList.toggle("flex", on);
    });
    clearInterval(timerInterval);
    if (on && currentStep >= 1 && currentStep <= 5) startTimer(document.getElementById("slide-" + currentStep));
  }

  function resetExercise() {
    document.querySelectorAll(".check-box").forEach(function (box) { setChecked(box, false); });
    document.querySelectorAll('input[type="text"]').forEach(function (input) { input.value = ""; });
    hasStarted = false;
    goToStep(0);
  }

  function openModal() {
    lastFocus = document.activeElement;
    modal.classList.remove("hidden");
    document.getElementById("sos-title").focus();
  }

  function closeModal() {
    modal.classList.add("hidden");
    if (lastFocus) lastFocus.focus();
  }

  function trapFocus(e) {
    var items = modal.querySelectorAll("a[href], button");
    var first = items[0];
    var last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement.id === "sos-title")) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-go],[data-reset],[data-sos-open],[data-sos-close],[data-print],[data-row]");
    if (!el) return;
    if (el.hasAttribute("data-go")) goToStep(Number(el.getAttribute("data-go")));
    else if (el.hasAttribute("data-reset")) resetExercise();
    else if (el.hasAttribute("data-sos-open")) openModal();
    else if (el.hasAttribute("data-sos-close")) closeModal();
    else if (el.hasAttribute("data-print")) window.print();
    else if (el.hasAttribute("data-row") && e.target.tagName !== "INPUT") {
      var box = el.querySelector(".check-box");
      setChecked(box, box.getAttribute("aria-pressed") !== "true");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (modal.classList.contains("hidden")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") trapFocus(e);
  });

  document.getElementById("mode-toggle-btn").addEventListener("click", function () { setGuideMode(!isGuideOnly); });
  document.getElementById("sos-open-btn").addEventListener("click", openModal);
  updateDate();
})();
