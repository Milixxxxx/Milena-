(() => {
  "use strict";

  const root = document.querySelector("[data-perspectives]");
  if (!root) return;

  const deck = root.querySelector("[data-perspectives-deck]");
  const controls = Array.from(root.querySelectorAll("[data-perspective]"));
  const cards = Array.from(root.querySelectorAll("[data-perspective-card]"));
  const status = root.querySelector("[data-perspectives-status]");
  if (!deck || !controls.length || !cards.length) return;

  const perspectives = Object.freeze({
    eva: {
      label: "FOKUS · IDEALISIERUNG ERKENNEN",
      title: "Eva",
      copy: "Du vermisst vielleicht nicht sie, sondern die Hoffnung auf die Version von ihr, die dir versprochen wurde. Diese Idealisierung hält Trauma Bonding oft am Leben; UNBOND hilft dir, Wunsch, Erinnerung und Beziehungsmuster wieder klar zu trennen.",
      transcript: "Ich hab die Frau vermisst, in die ich mich verliebt hatte. Dann hab ich begriffen, die gab es so nie. Sie war der Köder. Heute sage ich: Stopp",
      poster: "assets/personas/eva-poster.webp",
      video: "assets/personas/eva.mp4"
    },
    lisa: {
      label: "FOKUS · ERLEICHTERUNG EINORDNEN",
      title: "Lisa",
      copy: "Die Erleichterung nach einem Streit kann sich wie Nähe anfühlen – in toxischen Beziehungen ist sie oft nur die kurze Pause zwischen Anspannung und dem nächsten Ausbruch. UNBOND hilft dir, diesen Trauma-Bonding-Kreislauf zu erkennen und nicht länger mit Liebe zu verwechseln.",
      transcript: "Ich hab mich jedes Mal erleichtert gefühlt, wenn der Streit vorbei war. Bis ich verstand, das war keine Liebe. Das war die Pause zwischen zwei Ausbrüchen. Heute sage ich: Stopp. Unbond. Breaking Chains.",
      poster: "assets/personas/lisa-poster.webp",
      video: "assets/personas/lisa.mp4"
    },
    mary: {
      label: "FOKUS · SICH WIEDERFINDEN",
      title: "Mary",
      copy: "Gaslighting besteht oft aus vielen kleinen Momenten, in denen du dir selbst weniger traust. Wenn du dich klein machst und deine Wahrnehmung zurückstellst, verlierst du den Kontakt zu dir – UNBOND hilft dir, wieder bei dem anzuknüpfen, was du wirklich erlebt hast.",
      transcript: "Ich hab mich für sie klein gemacht, verbogen, bis ich mich kaum noch wiedererkannt habe. Heute sage ich: Stopp! Unbond. Breaking Chains.",
      poster: "",
      video: "assets/personas/mary.mp4?video=" + window.UNBOND_VIDEO_REVISION
    },
    monika: {
      label: "FOKUS · ISOLATION WAHRNEHMEN",
      title: "Monika",
      copy: "Isolation entsteht schleichend: Du meldest dich seltener, erklärst weniger und ziehst dich zurück, bis die Beziehung dein einziger Bezugspunkt wird. UNBOND zeigt dir, wie toxische Bindung und Rückzug zusammenwirken, damit du wieder sichere Verbindung außerhalb dieser Dynamik aufbauen kannst.",
      transcript: "Ich hab meine Freundinnen immer seltener angerufen. Irgendwann war sie die Einzige, die noch übrig war und das war kein Zufall. Heute sage ich: Stopp. Unbond. Breaking Chains",
      poster: "assets/personas/monika-poster.webp",
      video: "assets/personas/monika.mp4"
    }
  });

  let activeId = "";

  const unloadCard = (card) => {
    const player = card.querySelector("[data-perspective-player]");
    const detail = card.querySelector("[data-perspective-detail]");

    if (player) {
      player.pause();
      try { player.currentTime = 0; } catch (_) {}
      player.removeAttribute("src");
      player.removeAttribute("poster");
      player.load();
    }
    if (detail) detail.hidden = true;
    card.classList.remove("is-active");
  };

  const selectPerspective = (control) => {
    const id = control.dataset.perspective;
    const perspective = perspectives[id];
    if (!perspective) return;

    const moveFocusToPlayer = document.activeElement === control;

    if (activeId === id) {
      const activePlayer = control.closest("[data-perspective-card]")?.querySelector("[data-perspective-player]");
      activePlayer?.play().catch(() => {});
      return;
    }

    cards.forEach((card) => unloadCard(card));
    controls.forEach((button) => button.setAttribute("aria-expanded", "false"));

    const card = control.closest("[data-perspective-card]");
    if (!card) return;

    const detail = card.querySelector("[data-perspective-detail]");
    const player = card.querySelector("[data-perspective-player]");
    const label = card.querySelector("[data-perspectives-label]");
    const title = card.querySelector("[data-perspectives-title]");
    const copy = card.querySelector("[data-perspectives-copy]");
    const transcript = card.querySelector("[data-perspectives-transcript]");
    if (!detail || !player || !label || !title || !copy || !transcript) return;

    activeId = id;
    card.classList.add("is-active");
    deck.classList.add("has-active");
    control.setAttribute("aria-expanded", "true");

    label.textContent = perspective.label;
    title.textContent = perspective.title;
    copy.textContent = perspective.copy;
    transcript.textContent = perspective.transcript;
    detail.hidden = false;

    if (perspective.poster) player.poster = perspective.poster;
    else player.removeAttribute("poster");
    player.setAttribute("aria-label", `Video von ${perspective.title}`);
    player.muted = true;
    player.defaultMuted = true;
    player.src = perspective.video;
    player.load();

    if (moveFocusToPlayer) player.focus({ preventScroll: true });

    player.play().then(() => {
      if (status) status.textContent = `${perspective.title}: Clip läuft direkt in der ausgewählten Perspektive.`;
    }).catch(() => {
      if (status) status.textContent = `${perspective.title} ist geöffnet. Die Wiedergabe kann über die Player-Steuerung gestartet werden.`;
    });
  };

  controls.forEach((control) => {
    control.addEventListener("click", () => selectPerspective(control));
  });

  window.addEventListener("pagehide", () => {
    cards.forEach((card) => unloadCard(card));
  }, { once: true });
})();
