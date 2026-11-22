# Konzept: Integration der Tools in unbond.de

Stand: 04.11.2026 · Stufe 1 von Milena am 04.11.2026 freigegeben, übrige Abschnitte Entwurf · gebaut: 3 von 12 (Flashback-Stopper, Community-Mapping, Klarheitscheck)
Quellen: `02_Landingpage\Tools_Planung\UebersichtWebapps\` (Notion-Export, 53 Tools, P1 bis P15), Entscheidungen vom 30. und 31.10.2026, aktueller Upload-Ordner `02_Landingpage\Unbond_final_01\`

---

## 1 · Wozu die Tools da sind

**Ein Satz:** Klarheit ordnet ein, Tools sind Übungen.

| Bereich | Frage der Nutzerin | Was sie bekommt |
|---|---|---|
| Klarheit | „Was ist mit mir passiert?“ | Tests und Einordnung: ToxiCometer, Narzissmus-Test, Bindungsmuster-Test, Heilungskompass, Spielautomat |
| Tools | „Was mache ich jetzt damit?“ | Kurze Übungen für einen konkreten Moment: Flashback, Sehnsucht, Kontaktversuch, Grübeln |
| Buch (CORE) | „Wie komme ich da ganz raus?“ | Den ganzen Weg, Kapitel für Kapitel |

Die Tools haben drei Aufgaben:

1. **Entlasten im Moment.** Eine Übung hilft in 2 bis 10 Minuten, zum Beispiel nachts um 2:47 Uhr.
2. **Das Buch ergänzen.** Jedes Tool nennt das passende Buchkapitel. Wer die Übung mag, will den Hintergrund.
3. **Später Einnahmen bringen.** Je Phase ist ein Tool frei, der Rest liegt hinter einer Bezahlschranke (englisch Paywall: Inhalt erst nach Kauf sichtbar). Die Schranke kommt erst, wenn Bücher verkauft sind.

**Was Tools nicht sind:** keine Therapie, keine Diagnose, keine Krisenhilfe, kein Ersatz für das Buch. Keine KI-Funktionen, kein E-V-E-Coach.

---

## 2 · Wie jedes Tool funktioniert

Jedes Tool folgt denselben Regeln, egal in welcher Phase.

| Baustein | Regel |
|---|---|
| Design | Das Stitch-Design der Vorlage bleibt. Umbau nur technisch, mit dem Skill `unbond-webapp-umbau` |
| Technik | Alles liegt auf unbond.de: Schriften, Bilder, Symbole. Keine fremden Dienste, die Daten sammeln |
| Daten | Eingaben bleiben im Browser der Nutzerin (localStorage, also ein Speicher nur auf ihrem Gerät). Immer mit Warnung „Wer dieses Gerät nutzt, kann das sehen“ und Knopf „Alles löschen“. Tests speichern nichts |
| Notfall | In jedem Tool ein Knopf „Notfallkontakte“ mit 110, 112, Telefonseelsorge 0800 111 0 111, Hilfetelefon 08000 116 016 |
| Kasten „Über diese Übung“ | Wann sie hilft · Wann lieber nicht · Dauer · Grundlage (DBT, ACT, Polyvagal, kognitive Verfahren und andere) · Quellen · Buchbezug · Stand der Prüfung · Version |
| Logo | UNBOND-Wortmarke oben, führt zurück zu `wissen.html` |
| Ausgang | Genau ein Angebot am Ende, nach Thema: Akut, No Contact, Trennung führen zum 7-€-Notfallplan. Erkennen, Trauma Bonding, Narzissmus führen zur CORE-Angebotsseite. Nie direkt in den Checkout |
| Sprache | „sie“ und „Partnerin“, nie „Opfer“, keine Heilversprechen, kein „Freebie“ |
| Barrierefreiheit | Bedienbar mit Tastatur, Knöpfe mindestens 44 Pixel groß, ruhige Darstellung bei „weniger Bewegung“ |
| Suchmaschinen | Gesperrte Tools stehen auf `noindex` und nicht in der Sitemap |

---

## 3 · Wie viele Tools umgesetzt werden

Die Planung enthält **53 Tools**, davon 15 als MVP markiert (MVP heißt: kleinste Version, die schon nützt). Nicht alle 53 gehören auf die Tools-Seite. Einige sind Tests oder Wissen und gehören zu Klarheit oder in den Blog. Einige verstoßen gegen die Regeln.

| Gruppe | Anzahl | Was passiert |
|---|---|---|
| **Stufe 1: Start** | **12** | Je Phase zwei Tools, eines frei, eines später bezahlt. Damit ist keine Phase leer |
| Stufe 2: Ausbau | 7 | Die übrigen MVP-Tools, nach dem Start |
| Gehört zu Klarheit oder Blog | 6 | Nicht als Tool bauen |
| Gestrichen | 3 | Verstößt gegen Regeln (KI, Diagnose, Alarm) |
| Später oder nie | 26 | Erst entscheiden, wenn Stufe 1 und 2 laufen |

Die 12 der Stufe 1 bestehen aus 11 Tools der Liste plus dem neuen Klarheitscheck. Zusammen mit Stufe 2 sind das **19 Tools**, nicht 53. (Seit 04.11.2026 17 Tools, siehe Abschnitt 6.)

### Stufe 1: Start (12 Tools)

| Phase | Frei | Später bezahlt |
|---|---|---|
| 1 Notfall & Stabilisierung | **Flashback-Stopper** (gebaut) | TIPP-Notfallkoffer |
| 2 Erkennen & Bruch | **Klarheitscheck** „Was vermisse ich wirklich?“ (gebaut am 04.11.2026) | Community-Mapping (gebaut) |
| 3 Entzug & No Contact | **No-Contact-Tracker** | Tresor-Brief |
| 4 Trigger & Regulation | **Körper-Anker-Übungen** | Gedankenfalle-Decoder |
| 5 Bindung & Selbstaufbau | **Bedürfnis-Finder** | Grenzen-Sätze (ohne KI-Rollenspiel) |
| 6 Zukunft & Prävention | **Red Flags & Dating-Ampel** | Love Bombing oder echte Zuneigung |

Phasen 5 und 6 hatten in der Planung kein MVP-Tool. Ich habe je zwei ausgewählt, die ohne KI und ohne Pflege von außen funktionieren.

### Stufe 2: Ausbau (7 Tools)

| Phase | Tool | Hinweis |
|---|---|---|
| 1 | Sicherheits-Check-Dashboard | Tägliche Werte, Verlauf nach 7 Tagen |
| 1 | STOP-Knopf | Kein eigenes Tool, sondern als Notbremse in alle Tools einbauen |
| 2 | Herz-vs-Gehirn-Diagramm | Ohne E-V-E |
| 2 | Realitäts-Check-Tafel & Timeline | |
| 3 | 24h-Struktur-Planer | |
| 3 | Hoovering-Protokoll | Hoovering heißt: Die Ex versucht, dich zurückzuholen. Warnung beim Speichern ist hier besonders wichtig |
| 4 | Trigger-Tagebuch | Mustererkennung einfach zählen, ohne KI-Vorschläge |

### Gehört nicht auf die Tools-Seite (6)

| Tool aus der Planung | Wohin |
|---|---|
| Toxikometer | Steht schon in Klarheit (`toxikometer.html`) |
| Attachment Style Quiz | Steht schon in Klarheit als Bindungsmuster-Test. Die umgebaute Kopie `tools\phase-4\bindungsmuster-quiz\` bleibt liegen, wird aber nicht verlinkt |
| Gaslighting-Beispiele | Blog oder Wissen |
| Manipulations-Taktiken-Bibliothek | Blog oder Wissen |
| Komplexes PTBS vs. PTBS | Blog, mit Hinweis auf Fachstellen |
| Gemeinschaftsnarzissmus-Checker | Nur als Blogartikel über die Dynamik. Als Test über die Ex wäre es eine Ferndiagnose |

### Gestrichen (3)

| Tool | Grund |
|---|---|
| Affirmationen-Generator | KI-Tool |
| Dissoziations-Alarm (Abfrage alle 2 Stunden) | Medizinisch heikel, braucht Benachrichtigungen |
| kPTBS-Symptom-Tracker | Zu nah an einer Diagnose |

Die übrigen 26 Tools bleiben in der Planung stehen. Über sie wird erst entschieden, wenn Stufe 1 und 2 laufen und Zahlen vorliegen.

---

## 4 · Wo die Tools im UNBOND-System liegen

### Wege der Nutzerin zu den Tools

```
Instagram-Reel oder Blogartikel
        ↓
wissen.html ── Kachel 1 Klarheit ── Tests ── Ergebnis nennt ein passendes Tool
        │
        └──── Kachel 2 Tools (derzeit gesperrt, „Im Aufbau“)
                    ↓
              tools/index.html  (6 Phasen-Karten)
                    ↓
              tools/phase-X/index.html  (Tools dieser Phase)
                    ↓
              tools/phase-X/<tool>/  ── Ende: ein Angebot nach Thema
```

Zusätzliche Einstiege, die später möglich sind:
- **Reel:** Der Klarheitscheck stammt aus dem Reel-Ordner und kann direkt aus einem Reel verlinkt werden.
- **Buch:** Im Buch steht bei passenden Kapiteln der Link zum Tool.
- **Klarheit:** Ein Testergebnis nennt genau ein passendes Tool, zum Beispiel Bindungsmuster-Test → Bedürfnis-Finder.

### Ordner auf der Website

Alle Pfade im Upload-Ordner `H:\Meine Ablage\Milena_os\unbond-os\02_Landingpage\Unbond_final_01\`

| Pfad | Inhalt | Stand |
|---|---|---|
| `wissen.html` | Startpunkt mit vier Kacheln, Tools gesperrt | fertig |
| `klarheit.html` | Tests, Heilungskompass, Spielautomat | fertig |
| `tools\spielautomat.html` | Spielautomat, verlinkt aus Klarheit | fertig |
| `tools\index.html` | Übersicht der 6 Phasen, gesperrt, noindex | Platzhalter |
| `tools\phase-1\` bis `phase-6\index.html` | Je Phase eine Übersicht | Platzhalter |
| `tools\phase-1\flashback-stopper\` | Flashback-Stopper | gebaut, fachliche Prüfung offen |
| `tools\phase-2\community-mapping\` | Community-Mapping | gebaut, fachliche Prüfung offen |
| `tools\phase-2\was-vermisse-ich\` | Klarheitscheck (Milenas Fassung, gilt) | gebaut 04.11.2026, verlinkt, Handy und fachliche Prüfung offen |
| `tools\phase-2\klarheitscheck\` | Zweite Fassung des Assistenten | nicht verlinkt, bleibt liegen |
| `tools\phase-4\bindungsmuster-quiz\` | Alte Kopie, nicht verlinkt | bleibt liegen |

Jedes neue Tool bekommt einen eigenen Ordner: `tools\phase-<Nummer>\<tool-name>\` mit `index.html`, `app.css`, `app.js` und `assets\`.

### Planung und Vorlagen

| Pfad | Inhalt |
|---|---|
| `02_Landingpage\Tools_Planung\UebersichtWebapps\` | Liste aller 53 Tools je Phase |
| `02_Landingpage\Tools_Planung\` | Stitch-Vorlagen als Zip und Ordner |
| `02_inhalte\oktober26\Klarheit_reel\` | Vorlage Klarheitscheck |
| `ausgabe\unbond-webapp-umbau\SKILL.md` | Bauanleitung (als Skill aktiv) |
| `ausgabe\2026-10-31_prompt-webapp-inhalt.md` | Prompt für die inhaltliche Überarbeitung |

---

## 5 · Ablauf je Tool

1. Milena liefert die Stitch-Vorlage.
2. Inhaltliche Prüfung mit dem Inhalts-Prompt, Textfassung nach `ausgabe\`.
3. Milena gibt die Texte frei.
4. Technischer Umbau mit dem Skill, Ablage im Phasen-Ordner.
5. Prüfung im Browser: Handy, Tastatur, keine toten Links.
6. Eintrag in der Phasen-Übersicht.
7. Hochladen erst ganz am Schluss, wenn Milena es sagt.

---

## 6 · Ergänzung vom 04.11.2026: Webapp-Übersicht vom 05.06.2026

Quelle: `02_Landingpage\Tools_Planung\webapp\` mit `1-3.txt` (Tabelle aller Phasen), `index.html` (gleich wie `thermo.html`, Übersicht der Phasen 1 bis 3) und `Durchsuche alle threats in diesem Space nach digit.md` (Chatverlauf, rund 20.000 Zeilen, mit Prompts, Doppelt-Prüfung und Bauplänen).

**Konflikt, benannt:** Die Liste vom 05.06. ist eine andere Fassung als der Notion-Export, auf dem dieses Konzept steht. Beide nennen 53 Tools, aber nicht dieselben. Die Plätze P12 bis P15 heißen dort Trigger-Landkarte, Atem-Pacer, Bindungsmuster-Quiz und Red-Green-Flags mit Dating-Journal, im Notion-Export dagegen Hoovering-Protokoll, Trigger-Tagebuch, Körper-Anker und Gedankenfalle-Decoder. Die Liste vom 05.06. teilt außerdem in acht Module (M0 bis M7) statt sechs. Es gilt weiter der Notion-Export, weil er neuer ist. Die freigegebene Stufe 1 bleibt unverändert.

### Was übernommen wird

| Nr. | Übernahme | Wo im Konzept |
|---|---|---|
| 1 | **Modul und Kapitel je Tool** (zum Beispiel „Modul 0, Kapitel 0.1“). Das ist der erste Entwurf für das Feld „Buchbezug“ | Kasten „Über diese Übung“ |
| 2 | **Einsatzszenario und Zustand je Phase** (Phase 1: akute Krise, Übererregung; Phase 3: Entzug, Drang nach Kontakt). Daraus entsteht der Einleitungstext jeder Phasenseite | `tools\phase-X\index.html` |
| 3 | **SOS-Dreieck** als Kopf der Phasenseite 1: drei große Knöpfe STOP, Flashback-Stopper, TIPP-Notfallkoffer. Laut Programmgliederung sind das „die ersten drei Übungen, die eine Nutzerin sieht“. Der STOP-Knopf braucht dadurch kein eigenes Tool | Phase 1, ersetzt „STOP-Knopf“ in Stufe 2 |
| 4 | **Vorher-Nachher-Check** (Anspannung 0 bis 10 vor und nach der Übung) für alle Übungen zur Beruhigung. Die Nutzerin sieht so selbst, ob es geholfen hat | Regel für TIPP, Körper-Anker, später Atem-Pacer |
| 5 | **Herz-vs-Gehirn und Realitäts-Check werden ein Tool.** Die Doppelt-Prüfung im Chatverlauf kam zum selben Schluss | Stufe 2 hat damit 5 statt 7 Tools |
| 6 | **Notfall-Kit „Meine Menschen“**: Die Nutzerin trägt 1 bis 2 Vertraute und eine Fachstelle ein, Knopf zum Anrufen, Speichern als Bild. Kommt als Erweiterung in den Notfallknopf, nicht als eigenes Tool. Warnung zum Gerät gilt besonders | Stufe 2 |
| 7 | **Regel gegen Unterricht (FernUSG):** keine Lernziele, keine Prüfungen, kein „Du lernst …“, nur Einladung zur Selbstreflexion. FernUSG ist das Gesetz über Fernunterricht. Bezahlte Lerninhalte mit Lernkontrolle können eine Zulassung brauchen. Das ist kein Rechtsrat, vor der Bezahlschranke prüfen lassen | Regeln je Tool |
| 8 | **Vier gute Ideen für „später“**, alle ohne KI: Atem-Pacer, Urge-Surfing-Timer (10 Minuten, die Welle des Drangs abwarten), Breadcrumb-Blocker (48 Stunden Pause nach einem Like oder einer „versehentlichen“ Nachricht der Ex), Fenster der Toleranz | Liste „Später“, Urge-Surfing ersetzt die Craving-Surf-Bibliothek |

### Was nicht übernommen wird

| Inhalt | Grund |
|---|---|
| React, Vue, Supabase, Manus, Lovable, Webjourney, iFrames | Unsere Tools sind einfache HTML-Seiten auf unbond.de |
| Google Maps, GPT-4, E-V-E, Kommunikations-Simulator, Scham-Analyse durch KI | Keine KI, keine fremden Dienste |
| Konten, Datenbank, Warteliste, „Freebie“-Formular, Google Analytics, Facebook Pixel | Keine Konten, keine neuen E-Mail-Strecken, Daten bleiben auf dem Gerät |
| Push-Nachrichten und Erinnerungen | Brauchen Einwilligung und Technik, die wir nicht haben |
| Rückfall-Ampel mit SMS an eine Vertraute | Schickt Daten an Dritte, bei Überwachung gefährlich |
| EMDR-Light (Punkt folgen mit den Augen) | EMDR ist eine Therapiemethode und gehört in fachliche Begleitung |
| Badges, Konfetti, „Streak gebrochen“ | Ein Rückfall darf keine Scham auslösen. Der Zähler bleibt, aber ohne Strafe |
| „Verschlüsselter“ Tresor-Brief | Im Browser ist eine echte Sperre nicht möglich. Ehrlich: „Du siehst ihn erst in 30 Tagen wieder“ |
| Roadmap mit 45 Wochen für 53 Apps | Passt nicht zu 90 Minuten pro Woche |

### Geänderte Stufe 2 (5 Tools)

| Phase | Tool |
|---|---|
| 1 | Sicherheits-Check-Dashboard |
| 2 | Realitäts-Check (Herz-vs-Gehirn und Timeline zusammen) |
| 3 | 24h-Struktur-Planer |
| 3 | Hoovering-Protokoll |
| 4 | Trigger-Tagebuch |

Dazu ohne eigenes Tool: SOS-Dreieck auf der Phasenseite 1 und „Meine Menschen“ im Notfallknopf. Zusammen mit Stufe 1 sind es damit **17 Tools**.

---

## 7 · Buchbezug (Entwurf vom 04.11.2026)

Milena hat am 04.11.2026 bestätigt: Die Module M0 bis M7 aus den Planungen passen **nicht** zum Buch. Grundlage ist deshalb das Buch selbst in `03_produkte\Unbond_ebook\book\`: Vorlauf, Fundament, Schritt 1 bis 10, Kintsugi, Schluss, Bonus D bis F.

**So passen Phasen und Buch zusammen:**

| Tool-Phase | Buch |
|---|---|
| 1 Notfall & Stabilisierung | Fundament, Schritt 1 SOS: Akute Stabilisierung |
| 2 Erkennen & Bruch | Schritt 2 Trauma-Bonding, Schritt 3 Die Rosa-Brille abnehmen |
| 3 Entzug & No Contact | Schritt 4 No Contact |
| 4 Trigger & Regulation | Schritt 5 Trigger entmachten, Schritt 6 Körper zuerst, Schritt 7 Suchtmuster brechen |
| 5 Bindung & Selbstaufbau | Schritt 9 Bindungsmuster & Inneres Kind |
| 6 Zukunft & Prävention | Schritt 10 Identität, Zukunft & Abschluss |
| quer durch alle Phasen | Schritt 8 WLW-Dynamiken |

**Zuordnung je Tool.** Gefunden über Stichwortsuche in den Kapiteldateien. Die Zahl nennt die Treffer, sie ist ein Hinweis, kein Beweis. Milena prüft.

| Tool | Kapitel | Hinweis |
|---|---|---|
| Flashback-Stopper | Schritt 6 Körper zuerst | „5-4-3-2-1“ 5 Treffer, im Tool selbst gehört es zu Phase 1 |
| TIPP-Notfallkoffer | Schritt 1 SOS | Suche unsicher, weil „Tipp“ mitgezählt wird |
| SOS-Dreieck, „Meine Menschen“, Sicherheits-Check | Schritt 1 SOS | |
| Klarheitscheck | Schritt 2 Trauma-Bonding | |
| Realitäts-Check (Herz-vs-Gehirn) | Schritt 3 Rosa-Brille | |
| Community-Mapping | Schritt 8 WLW-Dynamiken | „Szene“ und „gemeinsame Freund…“ 16 Treffer |
| No-Contact-Tracker | Schritt 4 No Contact | |
| Tresor-Brief | Schritt 3 Rosa-Brille | „Brief“ 13 Treffer, in Schritt 4 weniger |
| Hoovering-Protokoll | Schritt 3, danach Schritt 4 | „Hoovering“ 11 und 4 Treffer |
| 24h-Struktur-Planer | Schritt 1 SOS | keine eindeutigen Treffer |
| Körper-Anker-Übungen | Schritt 6 Körper zuerst | |
| Gedankenfalle-Decoder | Schritt 3 Rosa-Brille | |
| Trigger-Tagebuch | Schritt 5 Trigger entmachten | |
| Bedürfnis-Finder | Schritt 9, Grundlage im Fundament | „Bedürfnis“ im Fundament 6 Treffer |
| Grenzen-Sätze | Schritt 9 | auch Schritt 3 und 4 |
| Red Flags & Dating-Ampel | Schritt 10 | einziges Kapitel mit „Red Flag“ |
| Love Bombing oder echte Zuneigung | Schritt 2 und 3 | |

**Auffällig:** Schritt 3 Rosa-Brille trägt vier Tools, Schritt 7 Suchtmuster und Kintsugi keines. Bonus D bis F gehören nicht zu CORE und bekommen deshalb keine Tools.

---

## 8 · Offene Entscheidungen

| Frage | Wer |
|---|---|
| Ist die Auswahl der Stufe 1 so richtig? | Milena |
| Buchkapitel je Tool: Entwurf in Abschnitt 7 prüfen | Milena |
| FernUSG vor der Bezahlschranke prüfen lassen | Fachperson für Recht |
| Fachliche Prüfung der Inhalte | Fachperson |
| Technik der Bezahlschranke (Digistore-Zugang, Passwort je Phase oder Mitgliederbereich) | später, wenn Bücher verkauft sind |
| Wann die Kachel „Tools“ auf `wissen.html` entsperrt wird | Milena, frühestens wenn je Phase ein freies Tool steht |
