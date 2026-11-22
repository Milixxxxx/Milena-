/* UNBOND · Community-Mapping · Einträge bleiben im localStorage dieses Browsers */
(function () {
  "use strict";
  var KEY = "unbond_community_mapping";
  var TYPE_LABEL = { place: "Ort", person: "Person", event: "Event" };
  var TYPE_ICON = { place: "assets/ort.webp", person: "assets/person.webp", event: "assets/event.webp" };
  var STATUS = {
    safe: { label: "TUT GUT", short: "Tut gut", dot: "bg-accent-mint", badge: "text-accent-mint bg-accent-mint/10 border-accent-mint/30" },
    risk: { label: "VORSICHT", short: "Vorsicht", dot: "bg-tertiary-container", badge: "text-tertiary bg-tertiary-container/10 border-tertiary-container/30" },
    avoid: { label: "ZU MEIDEN", short: "Meiden", dot: "bg-secondary", badge: "text-secondary bg-secondary/10 border-secondary/30" }
  };
  var ACTIVE_FILTER = "filter-btn active-pill px-3 py-1.5 rounded text-xs font-label-caps whitespace-nowrap bg-primary text-canvas-deep font-bold transition-all";
  var INACTIVE_FILTER = "filter-btn px-3 py-1.5 rounded text-xs font-label-caps whitespace-nowrap bg-canvas-elevated text-on-surface-variant border border-outline-variant hover:border-primary transition-all";
  var memory = [];
  var currentFilter = "all";
  var selectedId = null;
  var hasTracked = false;

  function el(id) { return document.getElementById(id); }

  function track(name) {
    if (typeof window.__unbondTrack === "function") window.__unbondTrack(name, { tool: "community-mapping" });
  }

  function isEntry(item) {
    return item && typeof item.name === "string" && STATUS[item.status] && TYPE_LABEL[item.type];
  }

  function getEntries() {
    try {
      var stored = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(stored) ? stored.filter(isEntry) : [];
    } catch (e) {
      return memory;
    }
  }

  function saveEntries(entries) {
    memory = entries;
    try {
      localStorage.setItem(KEY, JSON.stringify(entries));
    } catch (e) {
      el("tool-live").textContent = "Speichern ist in diesem Browser nicht möglich. Deine Einträge gelten nur, bis du die Seite schließt.";
    }
    renderApp();
  }

  function make(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function icon(name, size) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "ms");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("aria-hidden", "true");
    var use = document.createElementNS(ns, "use");
    use.setAttribute("href", "#i-" + name);
    svg.appendChild(use);
    return svg;
  }

  function position(status) {
    if (status === "safe") return { x: 42 + Math.floor(Math.random() * 16), y: 42 + Math.floor(Math.random() * 16) };
    if (status === "risk") return { x: 20 + Math.floor(Math.random() * 60), y: 20 + Math.floor(Math.random() * 60) };
    return {
      x: Math.random() > 0.5 ? 80 + Math.floor(Math.random() * 12) : 10 + Math.floor(Math.random() * 15),
      y: Math.random() > 0.5 ? 78 + Math.floor(Math.random() * 14) : 12 + Math.floor(Math.random() * 18)
    };
  }

  function toggleForm() {
    var form = el("entry-form");
    var open = form.classList.toggle("hidden") === false;
    el("toggle-form-btn").setAttribute("aria-expanded", String(open));
    el("form-chevron").classList.toggle("rotate-180", open);
  }

  function handleSave(e) {
    e.preventDefault();
    var name = el("entry-name").value.trim();
    if (!name) return;
    var status = document.querySelector('input[name="safety-status"]:checked').value;
    var pos = position(status);
    var entry = {
      id: Date.now().toString(),
      name: name,
      type: document.querySelector('input[name="entry-type"]:checked').value,
      affiliation: document.querySelector('input[name="affiliation"]:checked').value,
      status: status,
      notes: el("entry-notes").value.trim(),
      x: pos.x,
      y: pos.y
    };
    selectedId = entry.id;
    el("entry-form").reset();
    toggleForm();
    saveEntries([entry].concat(getEntries()));
    if (!hasTracked) { hasTracked = true; track("tool_gestartet"); }
    el("tool-live").textContent = name + " eingetragen.";
  }

  function tip(symbol, cls, title, text) {
    var row = make("div", "flex items-start gap-2");
    row.appendChild(make("span", cls + " font-bold text-xs mt-0.5", symbol));
    var p = make("p");
    p.appendChild(make("span", "font-bold " + cls, title + " "));
    p.appendChild(document.createTextNode(text));
    row.appendChild(p);
    return row;
  }

  function renderTips(entries) {
    var box = el("dynamic-tips-content");
    var safe = entries.filter(function (e) { return e.status === "safe"; });
    var risk = entries.filter(function (e) { return e.status === "risk"; });
    var avoid = entries.filter(function (e) { return e.status === "avoid"; });
    box.textContent = "";
    if (safe.length) {
      var names = safe.slice(0, 2).map(function (e) { return e.name; }).join(" und ");
      box.appendChild(tip("●", "text-accent-mint", "Was dir gut tut:", "Plan diese Woche bewusst Zeit dafür ein: " + names + "."));
    }
    if (risk.length) box.appendChild(tip("▲", "text-tertiary", "Vorsicht:", "Überleg vorher, wie lange du bleibst, wer mitkommt und wie du gehst."));
    if (avoid.length) {
      box.appendChild(tip("■", "text-secondary", "Abstand:", "Du darfst diese Orte meiden, auch wenn andere das nicht verstehen. Lässt es sich in eurer Szene nicht vermeiden, hilft ein Plan für diesen Abend."));
      box.appendChild(tip("!", "text-secondary", "Hast du Angst vor ihr?", "Das Hilfetelefon berät dich: 08000 116 016."));
    }
    if (!entries.length) box.appendChild(make("p", "text-outline text-xs", "Trag etwas ein, dann erscheinen hier Hinweise."));
    el("count-safe").textContent = safe.length;
    el("count-risk").textContent = risk.length;
    el("count-avoid").textContent = avoid.length;
  }

  function renderPreview(entries) {
    var item = entries.filter(function (e) { return e.id === selectedId; })[0] || entries[0];
    var box = el("active-marker-preview");
    box.classList.toggle("hidden", !item);
    if (!item) return;
    el("preview-title").textContent = item.name;
    var meta = TYPE_LABEL[item.type] + " • " + item.affiliation + " • " + STATUS[item.status].short;
    el("preview-meta").textContent = item.notes ? meta + " • " + item.notes : meta;
    el("preview-color-indicator").className = "w-3 h-3 rounded-full flex-shrink-0 " + STATUS[item.status].dot;
  }

  function matches(entry) {
    if (currentFilter === "all") return true;
    if (STATUS[currentFilter]) return entry.status === currentFilter;
    return entry.type === currentFilter;
  }

  function renderMarkers(entries) {
    var box = el("radar-markers-container");
    box.textContent = "";
    entries.filter(matches).forEach(function (entry) {
      var selected = entry.id === selectedId;
      var marker = make("button", "radar-marker absolute transform -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full border transition-all duration-200 z-10 flex items-center justify-center " + STATUS[entry.status].dot + " " + (selected ? "scale-125 ring-2 ring-primary ring-offset-2 ring-offset-canvas-deep shadow-lg z-20" : "opacity-90 hover:scale-110"));
      marker.type = "button";
      marker.dataset.select = entry.id;
      marker.setAttribute("aria-label", entry.name + ", " + STATUS[entry.status].short);
      marker.setAttribute("aria-pressed", String(selected));
      marker.style.left = Number(entry.x) + "%";
      marker.style.top = Number(entry.y) + "%";
      var img = make("img", "w-3.5 h-3.5 object-contain filter invert brightness-200");
      img.src = TYPE_ICON[entry.type];
      img.alt = "";
      marker.appendChild(img);
      box.appendChild(marker);
    });
  }

  function card(item) {
    var selected = item.id === selectedId;
    var box = make("div", "cursor-pointer bg-canvas-surface border " + (selected ? "border-primary ring-1 ring-primary/40" : "border-outline-variant") + " rounded p-3.5 hover:border-primary/60 transition-all");
    box.dataset.select = item.id;
    var top = make("div", "flex items-start justify-between gap-3");
    var left = make("div", "flex items-center gap-2.5 min-w-0");
    var iconBox = make("div", "w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant flex-shrink-0");
    var img = make("img", "w-4 h-4 object-contain");
    img.src = TYPE_ICON[item.type];
    img.alt = "";
    iconBox.appendChild(img);
    left.appendChild(iconBox);
    var text = make("div", "min-w-0");
    var title = make("button", "font-body-md text-sm font-bold text-text-primary leading-tight text-left break-words", item.name);
    title.type = "button";
    title.dataset.select = item.id;
    title.setAttribute("aria-pressed", String(selected));
    text.appendChild(title);
    var line = make("div", "flex items-center gap-1.5 mt-0.5");
    line.appendChild(make("span", "font-label-sm text-[10px] text-outline uppercase", TYPE_LABEL[item.type]));
    line.appendChild(make("span", "text-outline text-[10px]", "•"));
    line.appendChild(make("span", "font-label-sm text-[10px] text-on-surface-variant", item.affiliation));
    text.appendChild(line);
    left.appendChild(text);
    top.appendChild(left);
    var right = make("div", "flex items-center gap-2 flex-shrink-0");
    right.appendChild(make("span", "font-label-caps text-[10px] uppercase border px-2 py-0.5 rounded " + STATUS[item.status].badge, STATUS[item.status].label));
    var del = make("button", "text-outline hover:text-secondary p-1 transition-colors");
    del.type = "button";
    del.dataset.delete = item.id;
    del.title = "Eintrag löschen";
    del.setAttribute("aria-label", item.name + " löschen");
    del.appendChild(icon("delete", 18));
    right.appendChild(del);
    top.appendChild(right);
    box.appendChild(top);
    if (item.notes) {
      var note = make("div", "mt-2.5 pt-2 border-t border-outline-variant/40 flex items-start gap-1.5 text-xs text-on-surface-variant font-body-sm");
      var noteIcon = icon("notes", 14);
      noteIcon.classList.add("text-outline", "flex-shrink-0", "mt-0.5");
      note.appendChild(noteIcon);
      note.appendChild(make("p", "leading-snug break-words min-w-0", item.notes));
      box.appendChild(note);
    }
    return box;
  }

  function renderList(entries) {
    var box = el("entries-list");
    var shown = entries.filter(matches);
    el("total-visible").textContent = shown.length + " von " + entries.length + " Einträgen";
    box.textContent = "";
    if (!shown.length) {
      var empty = make("div", "p-6 text-center border border-outline-variant rounded bg-canvas-surface");
      var ic = icon("filter_list_off", 32);
      ic.classList.add("text-outline", "mb-1");
      empty.appendChild(ic);
      empty.appendChild(make("p", "font-body-sm text-sm text-outline", entries.length ? "Keine Einträge für diesen Filter." : "Noch keine Einträge."));
      box.appendChild(empty);
      return;
    }
    shown.forEach(function (item) { box.appendChild(card(item)); });
  }

  function renderApp() {
    var entries = getEntries();
    renderTips(entries);
    renderList(entries);
    renderMarkers(entries);
    renderPreview(entries);
  }

  document.addEventListener("click", function (e) {
    var del = e.target.closest("[data-delete]");
    if (del) {
      var id = del.dataset.delete;
      if (selectedId === id) selectedId = null;
      saveEntries(getEntries().filter(function (item) { return item.id !== id; }));
      return;
    }
    var sel = e.target.closest("[data-select]");
    if (sel) {
      selectedId = sel.dataset.select;
      renderApp();
      return;
    }
    var filter = e.target.closest(".filter-btn");
    if (filter) {
      currentFilter = filter.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach(function (btn) {
        var on = btn.dataset.filter === currentFilter;
        btn.className = on ? ACTIVE_FILTER : INACTIVE_FILTER;
        btn.setAttribute("aria-pressed", String(on));
      });
      renderApp();
    }
  });

  el("toggle-form-btn").addEventListener("click", toggleForm);
  el("entry-form").addEventListener("submit", handleSave);
  el("clear-btn").addEventListener("click", function () {
    if (!window.confirm("Möchtest du alle Einträge von diesem Gerät löschen?")) return;
    selectedId = null;
    memory = [];
    try { localStorage.removeItem(KEY); } catch (e) { /* ohne Speicher reicht das Leeren der Liste */ }
    renderApp();
  });

  /* Notfallkontakte */
  var modal = document.getElementById("sos-modal");
  var lastFocus = null;
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
    if (e.target.closest("[data-sos-open]")) openModal();
    if (e.target.closest("[data-sos-close]")) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (modal.classList.contains("hidden")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") trapFocus(e);
  });

  renderApp();
})();
