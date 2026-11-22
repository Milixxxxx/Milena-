/* UNBOND · Bindungsmuster-Quiz · Antworten liegen nur im Arbeitsspeicher und werden nicht gespeichert */
(function () {
  "use strict";
    const QUESTIONS = [
      {
        id: 1,
        category: "Kommunikation & Funkstille",
        text: "Deine Partnerin antwortet stundenlang unerwartet nicht auf deine Nachricht. Was geschieht in deinem Körper und Kopf?",
        options: [
          {
            type: "anxious",
            text: "Mein Puls steigt, ich prüfe das Handy alle 2 Minuten und befürchte, etwas falsch gemacht zu haben.",
            code: "A"
          },
          {
            type: "avoidant",
            text: "Ich zucke mit den Achseln, lege das Telefon weg und schätze den Freiraum ohne Verpflichtung.",
            code: "B"
          },
          {
            type: "disorganized",
            text: "Ich schwanke extrem zwischen Panik vor Ablehnung und plötzlicher kalter Wut, die mich abblocken lässt.",
            code: "C"
          },
          {
            type: "secure",
            text: "Ich nehme an, die Person ist beschäftigt. Ich gehe ruhig meinem Tag nach.",
            code: "D"
          }
        ]
      },
      {
        id: 2,
        category: "Konflikt & Spannungsaufbau",
        text: "Ein Streit eskaliert und die Stimmung wird emotional kalt und unberechenbar.",
        options: [
          {
            type: "avoidant",
            text: "Ich schalte emotional komplett ab, mauere und brauche sofort physischen Abstand.",
            code: "A"
          },
          {
            type: "anxious",
            text: "Ich kann die Kälte nicht ertragen und flehe fast um Klärung oder gebe klein bei, nur um Harmonie herzustellen.",
            code: "B"
          },
          {
            type: "disorganized",
            text: "Ich fühle mich in die Enge getrieben: Einerseits will ich Halt, andererseits möchte ich alles zerstören und fliehen.",
            code: "C"
          },
          {
            type: "secure",
            text: "Ich schlage vor, kurz durchzuatmen und das Gespräch respektvoll fortzuführen, sobald die Gemüter abkühlen.",
            code: "D"
          }
        ]
      },
      {
        id: 3,
        category: "Nähe & Intimität",
        text: "Jemand zeigt ehrliches, verlässliches Interesse und möchte dir sehr nah kommen.",
        options: [
          {
            type: "secure",
            text: "Ich fühle mich wohl, lasse Nähe in Ruhe zu und freue mich über echte Verbundenheit.",
            code: "A"
          },
          {
            type: "avoidant",
            text: "Ich empfinde es schnell als erdrückend oder einengend und suche unbewusst nach Fehlern bei ihr.",
            code: "B"
          },
          {
            type: "anxious",
            text: "Ich sehne mich extrem danach, habe aber sofort Angst, dass die Person mein wahres Ich bald langweilig findet.",
            code: "C"
          },
          {
            type: "disorganized",
            text: "Es löst Alarm aus: Nähe fühlt sich gleichzeitig nach dem größten Wunsch und der größten Bedrohung an.",
            code: "D"
          }
        ]
      },
      {
        id: 4,
        category: "Reaktion auf Kritik",
        text: "Deine Partnerin kritisiert eine deiner Verhaltensweisen in der Beziehung.",
        options: [
          {
            type: "anxious",
            text: "Ich fühle mich im Kern entwertet und fürchte unmittelbar das Ende der Beziehung.",
            code: "A"
          },
          {
            type: "avoidant",
            text: "Ich reagiere kühl oder gleichgültig: 'Wenn es dir nicht passt, geh doch.'",
            code: "B"
          },
          {
            type: "secure",
            text: "Ich höre zu, reflektiere, ob der Punkt gerechtfertigt ist, und setze bei Unfairness klare Grenzen.",
            code: "C"
          },
          {
            type: "disorganized",
            text: "Ich breche innerlich zusammen oder werde plötzlich sehr wütend.",
            code: "D"
          }
        ]
      },
      {
        id: 5,
        category: "Autonomie vs. Verschmelzung",
        text: "Wie definierst du deine persönlichen Grenzen innerhalb einer Partnerschaft?",
        options: [
          {
            type: "avoidant",
            text: "Strikte Unabhängigkeit steht über allem. Ich verlasse mich prinzipiell lieber nur auf mich selbst.",
            code: "A"
          },
          {
            type: "anxious",
            text: "Ich passe mich oft bis zur Selbstaufgabe an und verliere meine eigenen Bedürfnisse aus dem Fokus.",
            code: "B"
          },
          {
            type: "secure",
            text: "Ich kann ein 'Wir' genießen, behalte aber meine eigenen Interessen, Freunde und Werte bei.",
            code: "C"
          },
          {
            type: "disorganized",
            text: "Ich habe oft gar kein stabiles Gefühl für eigene Grenzen: Mal opfere ich mich auf, mal stoße ich hart ab.",
            code: "D"
          }
        ]
      },
      {
        id: 6,
        category: "Nähe nach Kälte",
        text: "Nach einer Phase von Ignoranz oder Kälte kommt sie plötzlich wieder liebevoll auf dich zu.",
        options: [
          {
            type: "anxious",
            text: "Ich spüre riesige Erleichterung und vergebe sofort alles, ohne darüber zu sprechen.",
            code: "A"
          },
          {
            type: "disorganized",
            text: "Ich sehne die Versöhnung herbei, misstraue ihr aber abgrundtief und warte auf den nächsten Einschlag.",
            code: "B"
          },
          {
            type: "avoidant",
            text: "Ich bleibe kühl und lasse mich ungern auf sentimentale Schwankungen ein.",
            code: "C"
          },
          {
            type: "secure",
            text: "Die Inkonsistenz irritiert mich. Ich spreche das Muster an, anstatt es als Liebesbeweis zu romantisieren.",
            code: "D"
          }
        ]
      },
      {
        id: 7,
        category: "Gefühlsausdruck & Verletzlichkeit",
        text: "Wie leicht fällt es dir, eigene tiefe Ängste und Schwächen vor deiner Partnerin auszusprechen?",
        options: [
          {
            type: "avoidant",
            text: "Extrem schwer. Verletzlichkeit fühlt sich nach Schwäche und potenziellem Kontrollverlust an.",
            code: "A"
          },
          {
            type: "secure",
            text: "Gut möglich, solange eine vertrauensvolle Basis vorhanden ist.",
            code: "B"
          },
          {
            type: "anxious",
            text: "Ich teile oft zu schnell sehr viel, in der Hoffnung, dadurch sofortige Verbundenheit zu erzwingen.",
            code: "C"
          },
          {
            type: "disorganized",
            text: "Ich öffne mich impulsiv, bereue es Minuten später bitterlich und ziehe eine eiserne Mauer hoch.",
            code: "D"
          }
        ]
      },
      {
        id: 8,
        category: "Verlustangst & Trennungsfantasien",
        text: "Welcher Gedanke taucht bei wiederkehrenden Schwierigkeiten als erstes auf?",
        options: [
          {
            type: "anxious",
            text: "'Wenn sie mich verlässt, bricht meine ganze Welt zusammen.'",
            code: "A"
          },
          {
            type: "avoidant",
            text: "'Beziehungen sind den Stress nicht wert. Alleine bin ich viel ungestörter.'",
            code: "B"
          },
          {
            type: "disorganized",
            text: "'Geh weg, aber verlass mich nicht.' Ein ständiger innerer Kampf zwischen Flucht und Festhalten.",
            code: "C"
          },
          {
            type: "secure",
            text: "'Eine Trennung täte weh, aber ich würde es überstehen.'",
            code: "D"
          }
        ]
      },
      {
        id: 9,
        category: "Misstrauen & Wachsamkeit",
        text: "Wie aufmerksam beobachtest du Stimmungswechsel deines Gegenübers?",
        options: [
          {
            type: "anxious",
            text: "Sehr wachsam: Jedes Seufzen oder kurze Schweigen werte ich als mögliches Alarmsignal gegen mich.",
            code: "A"
          },
          {
            type: "avoidant",
            text: "Ich ignoriere Stimmungen weitgehend; Drama anderer Menschen geht mich nichts an.",
            code: "B"
          },
          {
            type: "disorganized",
            text: "Ich suche ständig nach Gefahr und rechne jeden Augenblick mit Angriff oder Verlassenwerden.",
            code: "C"
          },
          {
            type: "secure",
            text: "Ich bemerke Veränderungen, frage bei Bedarf freundlich nach, beziehe es aber nicht sofort auf mich.",
            code: "D"
          }
        ]
      },
      {
        id: 10,
        category: "Bedürfnis nach Bestätigung",
        text: "Wie oft benötigst du Rückversicherung, dass du geliebt wirst?",
        options: [
          {
            type: "anxious",
            text: "Sehr oft. Bestätigung verfliegt wie Rauch und die Unsicherheit kehrt schnell zurück.",
            code: "A"
          },
          {
            type: "avoidant",
            text: "Selten bis gar nicht. Worte bedeuten mir wenig, Taten und Ruhe sind mir wichtiger.",
            code: "B"
          },
          {
            type: "secure",
            text: "Regelmäßige Wertschätzung tut gut, aber mein Selbstwert hängt nicht exklusiv davon ab.",
            code: "C"
          },
          {
            type: "disorganized",
            text: "Wenn ich Bestätigung bekomme, glaube ich sie nicht; wenn sie fehlt, gerate ich in Verzweiflung.",
            code: "D"
          }
        ]
      },
      {
        id: 11,
        category: "Streitmuster & Machtbalance",
        text: "Wenn deine Partnerin sich dir entzieht oder dich tagelang anschweigt:",
        options: [
          {
            type: "anxious",
            text: "Ich schreibe lange Textnachrichten, rufe mehrfach an und ertrage das Schweigen körperlich kaum.",
            code: "A"
          },
          {
            type: "avoidant",
            text: "Ich schneide sie im Gegenzug genauso ab und tue so, als wäre mir alles völlig gleichgültig.",
            code: "B"
          },
          {
            type: "disorganized",
            text: "Bei mir geht alles durcheinander: erst bitten, dann Wut, dann völlige Taubheit.",
            code: "C"
          },
          {
            type: "secure",
            text: "Ich sage klar, dass mir dieses Schweigen nicht gut tut, und gehe auf Abstand.",
            code: "D"
          }
        ]
      },
      {
        id: 12,
        category: "Zukunftsperspektive & Hoffnung",
        text: "Was erhoffst du dir primär von einer guten Beziehung?",
        options: [
          {
            type: "secure",
            text: "Gegenseitigen Respekt, verlässliche emotionale Sicherheit und gemeinsamen Raum zum Wachsen.",
            code: "A"
          },
          {
            type: "anxious",
            text: "Endlich bedingungslos gesehen zu werden und die quälende Angst vor dem Alleinsein zu verlieren.",
            code: "B"
          },
          {
            type: "avoidant",
            text: "Dass meine Grenzen respektiert werden und niemand versucht, mich zu verändern oder einzuengen.",
            code: "C"
          },
          {
            type: "disorganized",
            text: "Einen Ort der Sicherheit, an dem Nähe nicht mehr automatisch mit Schmerz und Verrat verbunden ist.",
            code: "D"
          }
        ]
      }
    ];

    const ATTACHMENT_PROFILES = {
      anxious: {
        title: "Ängstlich",
        subtitle: "ANXIOUS-PREOCCUPIED // BINDUNGSSYSTEM IN ALARMBEREITSCHAFT",
        description: "Bei Distanz schlägt dein Bindungssystem schnell Alarm. Du steckst viel Kraft in die Nähe und spürst Stimmungswechsel früh. In einer Beziehung, in der Nähe und Kälte sich abwechseln, kann dich das besonders fest halten.",
        toxicManifestations: [
          { title: "Anpassung bis zur Selbstaufgabe", desc: "Du stellst eigene Werte und Bedürfnisse zurück, damit es ruhig bleibt." },
          { title: "Festhalten im Wechsel von Nähe und Kälte", desc: "Die Erleichterung nach dem Rückzug fühlt sich an wie große Liebe. Das ist Trauma Bonding: eine Bindung, die durch den Wechsel entsteht." },
          { title: "Vieles versuchen, um Gewissheit zu bekommen", desc: "Anrufe, lange Nachrichten, Nachprüfen. Das ist ein Versuch, die Ungewissheit zu beenden." }
        ],
        triggers: "Unerwartete Funkstille, einsilbige Antworten, Rückzug nach innigen Momenten, vage Zukunftspläne.",
        actionSteps: [
          "Atme einmal lang aus, bevor du auf Distanz reagierst.",
          "Trenne Gefühl und Tatsache: 'Ich habe Angst vor Trennung' heißt nicht 'Ich werde verlassen'.",
          "Verlässlichkeit ist kein Extra. Du darfst sie erwarten."
        ]
      },
      avoidant: {
        title: "Vermeidend",
        subtitle: "DISMISSIVE-AVOIDANT // BINDUNGSSYSTEM AUF ABSTAND",
        description: "Du hast gelernt, dich vor allem auf dich selbst zu verlassen. Bei zu viel Nähe, Streit oder Erwartungen ziehst du dich zurück. Das schützt dich, kann dich aber auch allein lassen.",
        toxicManifestations: [
          { title: "Abschalten im Streit", desc: "Du wirst innerlich still oder gehst aus dem Raum, statt Gefühle zu zeigen." },
          { title: "Abstand durch kleine Makel", desc: "Du suchst Fehler bei ihr, um dir Nähe vom Leib zu halten." },
          { title: "Unabhängigkeit als Schutzpanzer", desc: "Sie wirkt wie Stärke, schützt dich aber oft vor erneuter Verletzung." }
        ],
        triggers: "Vorwürfe, Forderung nach sofortiger Aussprache, das Gefühl von Einengung oder Bevormundung.",
        actionSteps: [
          "Erkenne deinen Rückzug als Schutz. Sag kurz, dass du eine Pause brauchst.",
          "Teile eine kleine Sorge mit einem Menschen, dem du vertraust.",
          "Unterscheide: Fühlt sich das eng an, oder ist es wirklich Kontrolle?"
        ]
      },
      disorganized: {
        title: "Ängstlich-vermeidend",
        subtitle: "FEARFUL-AVOIDANT // NÄHE UND ANGST ZUGLEICH",
        description: "Du sehnst dich nach Nähe und erlebst sie zugleich als gefährlich. Das entsteht oft, wenn Nähe und Verletzung zusammenkamen. In einer toxischen Beziehung kann sich das in heftigen Wechseln zeigen.",
        toxicManifestations: [
          { title: "Heiß und kalt", desc: "Du suchst Nähe und stößt sie weg, sobald sie dir zu nah kommt." },
          { title: "Lieber selbst beenden", desc: "Bevor sie dich verletzen kann, ziehst du dich zurück oder brichst den Kontakt ab." },
          { title: "Taub werden", desc: "Taubheit und heftige Angst können sich abwechseln. Manchmal fühlst du dich wie neben dir." }
        ],
        triggers: "Unberechenbares Verhalten, plötzliche Nähe, gefühlter Kontrollverlust, ungleiche Macht.",
        actionSteps: [
          "Geh in den Körper: Füße auf den Boden, kaltes Wasser an die Hände.",
          "Triff keine Beziehungsentscheidung, solange du aufgewühlt bist.",
          "Hol dir Unterstützung, wenn du das nicht allein tragen willst. Eine Therapie kann dabei helfen."
        ]
      },
      secure: {
        title: "Sicher",
        subtitle: "SECURE-AUTONOMOUS // NÄHE UND EIGENSTÄNDIGKEIT",
        description: "Du kannst Nähe genießen und eigenständig bleiben. Du sprichst Bedürfnisse aus und achtest Grenzen. Auch das schützt nicht immer vor einer toxischen Beziehung.",
        toxicManifestations: [
          { title: "Zu lange helfen wollen", desc: "Du glaubst lange, Verständnis und Geduld könnten etwas ändern." },
          { title: "Zweifel an dir selbst", desc: "Langes Gaslighting, also das Verdrehen deiner Wahrnehmung, kann auch dich unsicher machen." },
          { title: "Später Absprung", desc: "Weil du gewohnt bist, Probleme zu lösen, bleibst du oft länger, als dir gut tut." }
        ],
        triggers: "Wiederholter Vertrauensbruch, keine Bereitschaft zum Gespräch, Verdrehen deiner Wahrnehmung.",
        actionSteps: [
          "Bleib bei dem, was du beobachtest. Muster zählen mehr als Versprechen.",
          "Halte deine Grenzen, auch wenn sie dafür kämpft, dass du nachgibst.",
          "Pflege Menschen außerhalb der Beziehung."
        ]
      }
    };

    var LABELS = { anxious: "Ängstlich", avoidant: "Vermeidend", disorganized: "Ängstlich-vermeidend", secure: "Sicher" };
    var state = { currentIndex: 0, answers: {}, completed: false };
    var hasStarted = false;

    function el(id) { return document.getElementById(id); }

    function track(name) {
      if (typeof window.__unbondTrack === "function") window.__unbondTrack(name, { tool: "bindungsmuster-quiz" });
    }

    function reducedMotion() {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function focusHeading(node) {
      var heading = node.querySelector("h1, h2");
      if (!heading) return;
      el("tool-live").textContent = heading.textContent.trim();
      heading.focus({ preventScroll: true });
    }

    function resetQuiz() {
      state = { currentIndex: 0, answers: {}, completed: false };
      hasStarted = false;
      showView("intro");
    }

    function showView(name) {
      ["intro", "quiz", "result"].forEach(function (v) { el("view-" + v).classList.toggle("hidden", v !== name); });
      if (name === "quiz") renderQuestion();
      if (name === "result") renderResult();
      focusHeading(el("view-" + name));
      window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
    }

    function renderQuestion() {
      var q = QUESTIONS[state.currentIndex];
      var total = QUESTIONS.length;
      var selected = state.answers[q.id];
      el("question-counter").textContent = "FRAGE " + String(state.currentIndex + 1).padStart(2, "0") + " / " + total;
      el("question-category").textContent = q.category;
      el("progress-bar-fill").style.width = ((state.currentIndex + 1) / total) * 100 + "%";
      el("progress-track").setAttribute("aria-valuenow", String(state.currentIndex + 1));
      el("question-text").textContent = q.text;

      var box = el("options-container");
      box.textContent = "";
      q.options.forEach(function (opt) {
        var isSelected = selected === opt.type;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("aria-pressed", String(isSelected));
        btn.className = "w-full p-4 text-left border rounded transition-all flex items-start gap-3 active:scale-[0.99] " + (isSelected ? "bg-canvas-elevated border-primary text-white ring-1 ring-primary/40" : "bg-canvas-surface border-white/10 text-on-surface-variant hover:border-white/20 hover:text-white");
        var code = document.createElement("div");
        code.className = "flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-label-caps font-bold transition-colors " + (isSelected ? "bg-accent-mint text-canvas-deep" : "border border-white/20 text-outline");
        code.textContent = opt.code;
        var wrap = document.createElement("div");
        wrap.className = "flex-1";
        var text = document.createElement("span");
        text.className = "text-body-sm font-body-sm leading-snug";
        text.textContent = opt.text;
        wrap.appendChild(text);
        btn.appendChild(code);
        btn.appendChild(wrap);
        btn.addEventListener("click", function () {
          state.answers[q.id] = opt.type;
          if (!hasStarted) { hasStarted = true; track("tool_gestartet"); }
          renderQuestion();
          el("next-question-btn").focus();
        });
        box.appendChild(btn);
      });

      el("prev-question-btn").disabled = state.currentIndex === 0;
      var last = state.currentIndex === total - 1;
      el("next-btn-text").textContent = last ? "AUSWERTUNG ANZEIGEN" : (selected ? "WEITER" : "ÜBERSPRINGEN");
    }

    function handleNext() {
      if (state.currentIndex < QUESTIONS.length - 1) {
        state.currentIndex += 1;
        renderQuestion();
        focusHeading(el("view-quiz"));
        return;
      }
      if (!Object.keys(state.answers).length) {
        resetQuiz();
        return;
      }
      state.completed = true;
      track("tool_abgeschlossen");
      showView("result");
    }

    function handlePrev() {
      if (state.currentIndex === 0) return;
      state.currentIndex -= 1;
      renderQuestion();
      focusHeading(el("view-quiz"));
    }

    function line(cls, text) {
      var node = document.createElement("span");
      node.className = cls;
      node.textContent = text;
      return node;
    }

    function renderBars(counts, total, topType) {
      var box = el("metrics-bars-container");
      box.textContent = "";
      Object.keys(counts).forEach(function (key) {
        var pct = Math.round((counts[key] / total) * 100);
        var primary = key === topType;
        var row = document.createElement("div");
        row.className = "space-y-1";
        var head = document.createElement("div");
        head.className = "flex justify-between text-label-caps font-label-caps text-xs";
        head.appendChild(line(primary ? "text-primary font-bold" : "text-on-surface-variant", LABELS[key]));
        head.appendChild(line((primary ? "text-primary" : "text-outline") + " font-mono", counts[key] + " von " + total));
        var track = document.createElement("div");
        track.className = "w-full h-2 bg-canvas-elevated rounded-full overflow-hidden border border-white/5";
        var fill = document.createElement("div");
        fill.className = "h-full transition-all duration-500 " + (primary ? "bg-primary" : "bg-outline-variant");
        fill.style.width = pct + "%";
        track.appendChild(fill);
        row.appendChild(head);
        row.appendChild(track);
        box.appendChild(row);
      });
    }

    function renderCards(items) {
      var box = el("dynamic-manifestation-cards");
      box.textContent = "";
      items.forEach(function (item, index) {
        var card = document.createElement("div");
        card.className = "p-4 bg-canvas-surface border border-white/10 rounded-lg space-y-1.5 hover:border-primary/30 transition-colors";
        var top = document.createElement("div");
        top.className = "flex items-center gap-2";
        top.appendChild(line("text-label-caps font-label-caps text-primary text-xs font-mono", "0" + (index + 1)));
        var title = document.createElement("h4");
        title.className = "text-body-sm font-body-sm text-white font-bold";
        title.textContent = item.title;
        top.appendChild(title);
        var desc = document.createElement("p");
        desc.className = "text-body-sm font-body-sm text-on-surface-variant pl-6";
        desc.textContent = item.desc;
        card.appendChild(top);
        card.appendChild(desc);
        box.appendChild(card);
      });
    }

    function renderSteps(steps) {
      var list = el("action-steps-list");
      list.textContent = "";
      steps.forEach(function (step) {
        var li = document.createElement("li");
        li.className = "flex items-start gap-2.5 text-on-surface-variant";
        var ns = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS(ns, "svg");
        svg.setAttribute("class", "ms text-primary mt-0.5");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("aria-hidden", "true");
        var use = document.createElementNS(ns, "use");
        use.setAttribute("href", "#i-check_circle");
        svg.appendChild(use);
        li.appendChild(svg);
        li.appendChild(line("leading-relaxed", step));
        list.appendChild(li);
      });
    }

    function renderResult() {
      var counts = { anxious: 0, avoidant: 0, disorganized: 0, secure: 0 };
      var values = Object.keys(state.answers).map(function (k) { return state.answers[k]; });
      values.forEach(function (type) { counts[type] += 1; });
      var max = Math.max.apply(null, Object.keys(counts).map(function (k) { return counts[k]; }));
      var top = Object.keys(counts).filter(function (k) { return counts[k] === max; });
      var profile = ATTACHMENT_PROFILES[top[0]];
      el("result-title").textContent = profile.title;
      el("result-subtitle").textContent = profile.subtitle;
      el("result-summary").textContent = profile.description;
      el("result-note").textContent = (top.length > 1 ? "Mehrere Muster liegen gleichauf: " + top.map(function (k) { return LABELS[k]; }).join(", ") + ". " : "") + "Das Muster beschreibt, wie du reagiert hast, oft zu deinem Schutz. Es erklärt nicht, warum dir wehgetan wurde. Das liegt nicht an dir.";
      renderBars(counts, values.length, top[0]);
      renderCards(profile.toxicManifestations);
      el("result-triggers").textContent = profile.triggers;
      renderSteps(profile.actionSteps);
    }

    el("start-quiz-btn").addEventListener("click", function () { showView("quiz"); });
    el("next-question-btn").addEventListener("click", handleNext);
    el("prev-question-btn").addEventListener("click", handlePrev);
    el("retest-btn").addEventListener("click", resetQuiz);
    el("print-btn").addEventListener("click", function () { window.print(); });
    el("reset-btn").addEventListener("click", function () {
      if (window.confirm("Möchtest du das Quiz von vorne beginnen?")) resetQuiz();
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

})();
