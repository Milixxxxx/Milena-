/* UNBOND · Zeitstrahl wie auf wissen.html (05.11.2026). Gilt für jede Liste mit class="w-tl". */
(function () {
  var lists = document.querySelectorAll(".w-tl");
  if (!lists.length) return;
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still) {
    lists.forEach(function (tl) { tl.style.setProperty("--w-tl-p", "1"); });
    return;
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    lists.forEach(function (tl) {
      tl.classList.add("js-tl");
      tl.querySelectorAll(".w-stage").forEach(function (s) { io.observe(s); });
    });
  }
  var ticking = false;
  function draw() {
    ticking = false;
    lists.forEach(function (tl) {
      var r = tl.getBoundingClientRect();
      var p = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - r.top) / r.height));
      tl.style.setProperty("--w-tl-p", p.toFixed(4));
      tl.style.setProperty("--w-tl-y", (p * r.height - 4).toFixed(1) + "px");
    });
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(draw); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  draw();
})();
