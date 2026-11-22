# UNBOND · Änderungsliste 08.11.2026

Automatisch erzeugt aus den Protokollen der Änderungsskripte. Grundlage: hochgeladener Stand `UNBOND_manus_vorschlag_2026-11-07`. Reihenfolge der Skripte: Farbersetzung → Einzeländerungen → Klarheit-Neugestaltung → Versionsnummern.

## A · Einzeländerungen (Hover, Schriftfarben, Video, Empfehlungen, Klarheit)

| Nr. | Bereich | Datei | Änderung |
|---|---|---|---|
| 1 | 1b Hover | `unbond-consent.css` | Cookie-Knöpfe „Alle akzeptieren“/„Nur Notwendige“: beim Überfahren Schrift weiß (war #edebe6) |
| 2 | 1b Hover | `blick-ins-buch.html` | Knöpfe: beim Überfahren Schrift weiß (war Creme #f7f2ea) |
| 3 | 1b Hover | `blick-ins-buch.html` | Umriss-Knopf: beim Überfahren voll #7d263f gefüllt, Schrift weiß (war 35 % Tönung) |
| 4 | 1b Hover | `leseprobe-wolf-im-schafskittel.html` | Knöpfe am Ende der Leseprobe: beim Überfahren #7d263f gefüllt, Schrift weiß (Umriss-Knopf war 18 % Tönung, Schrift #e8e8e8) |
| 5 | 1b Hover | `tools/tools.css` | Spielautomat „Drehen“: beim Überfahren Schrift weiß |
| 6 | 1b Hover | `tools/phase-2/klarheitscheck/app.css` | Notfall-Knopf: beim Überfahren voll #7d263f gefüllt; die hellrosa Schrift #ffb1c0 bleibt (Regel 5, Kontrast ca. 6:1) |
| 7 | 1b Hover | `tools/phase-2/community-mapping/app.css` | Stitch-Werkzeug: Mint-Hover (Tailwind primary-fixed #6efbc7) -> #5e9590 (Regel 3) |
| 8 | 1b Schrift | `unbond-nothing.css` | Zitatquelle im Blog: Schrift #e8e8e8 (war Rosé #c96a83, durch Regel 1 Bordeaux) |
| 9 | 1b Schrift | `blog/verdeckter-narzissmus-erkennen.html` | Zitatquelle (seitenintern): #e8e8e8 statt Bordeaux-Variable |
| 10 | 1b Schrift | `narzissmus-test.html` | Ergebnis-Markierung „hoch“ (.cat-high): Schrift #e8e8e8, Rahmen und Tönung bleiben Bordeaux |
| 11 | 1b Schrift | `bindungsmuster-test.html` | Ergebnis-Markierung „hoch“ (.cat-high): Schrift #e8e8e8, Rahmen und Tönung bleiben Bordeaux |
| 12 | 1b Schrift | `index.html` | Punkt hinter der Wortmarke (.brand-dot): #e8e8e8 (derzeit nicht im Markup, vorsorglich) |
| 13 | 1b Schrift | `_test_schrift-index.html` | Punkt hinter der Wortmarke (.brand-dot): #e8e8e8 (derzeit nicht im Markup, vorsorglich) |
| 14 | 1b Schrift | `unbond-nothing.css` | Punkt hinter der Wortmarke: #e8e8e8 (vorsorglich) |
| 15 | 1b Schrift | `unbond-nothing-skin.css` | Punkt hinter der Wortmarke: #e8e8e8 (vorsorglich) |
| 16 | 1b Schrift | `unbond-nothing.css` | Aufzählungszeichen › der Schlagwort-Zeilen: Grundwert #e8e8e8 (Bereichsseiten färben weiter mit ihrer Bereichsfarbe) |
| 17 | 1b Schrift | `unbond-nothing-skin.css` | Aufzählungszeichen › der Vertrauenszeile: Grundwert #e8e8e8 |
| 18 | 1b Schrift | `unbond-nothing-skin.css` | Aufzählungszeichen › in Artikellisten: Grundwert #e8e8e8 |
| 19 | 1b Schrift | `unbond-nothing-skin.css` | Listenpunkte im Report: #e8e8e8 |
| 20 | 1b Schrift | `tools/tools.css` | Spielautomat, Veränderungswert „+“: #e8e8e8 statt Bordeaux |
| 21 | 1b Schrift | `blick-ins-buch.html` | Hervorhebung in der Wortmarke: #e8e8e8 statt Bordeaux |
| 22 | 1b Kartenfarbe | `unbond-weiter.js` | ToxiCometer und Report: Schriftfarbe ct = #e8e8e8 neben der Kartenfarbe c = #7d263f (2×) |
| 23 | 1b Kartenfarbe | `unbond-weiter.js` | Setzt --c-text, wenn eine Karte eine eigene Schriftfarbe hat (4×) |
| 24 | 1b Kartenfarbe | `unbond-weiter.css` | Fokusrahmen der Weiter-Karte: bei Bordeaux-Karten #e8e8e8 (sichtbar auf Schwarz) |
| 25 | 1b Kartenfarbe | `unbond-weiter.css` | Kicker der Weiter-Karte (z. B. ToxiCometer): Schrift #e8e8e8 statt Bordeaux |
| 26 | 1b Kartenfarbe | `unbond-weiter.css` | Pfeil der Weiter-Karte: #e8e8e8 statt Bordeaux |
| 27 | 1b Kartenfarbe | `unbond-weiter.css` | Testnummer in der Klarheit-Leiste: #e8e8e8 statt Bordeaux |
| 28 | 1b Kartenfarbe | `unbond-weiter.css` | Aktive Testnummer auf Bordeaux-Kreis: Schrift #e8e8e8 statt Schwarz (andere Farben bleiben schwarz) |
| 29 | 1b Kartenfarbe | `unbond-weiter.css` | Testnummer in „Dein Weg“: #e8e8e8 statt Bordeaux |
| 30 | 1b Kartenfarbe | `unbond-weiter.css` | Aktive Testnummer in „Dein Weg“ auf Bordeaux: Schrift #e8e8e8 |
| 31 | 3 Video wissen | `wissen.html` | Video startet unter dem Kopfbereich (161/185/177/196 px je Breite), Bildausschnitt 50 % 20 % statt mittig |
| 32 | 2 S1 Krisennummern | `index.html` | S1: drei Krisennummern als Telefonlinks im Footer |
| 33 | 2 S2 Mary und Sandra | `index.html` | S2: Mary und Sandra als erfundene Beispielfiguren gekennzeichnet |
| 34 | 2 S2 Mary und Sandra | `index.html` | S2: Etikett auch für Screenreader im Knopfnamen |
| 35 | 2 S2 Mary und Sandra | `index.html` | S2: sichtbares Etikett „Beispielfigur aus dem Buch“ auf der Mary-Karte |
| 36 | 2 S3 Schmerzkarten | `index.html` | S3: Zahlenblock (Zahl, Satz zur Zahl, „nicht verifiziert“) der drei Schmerzkarten ausgeblendet; zum Zurückholen nur „hidden“ entfernen (3×) |
| 37 | 2 S5 Nutzen im Hero | `index.html` | S5: konkreter Nutzen-Satz direkt über dem Umfang |
| 38 | 2 S5 Nutzen im Hero | `index.html` | S5: zweiter Satz der Hero-Beschreibung in eine Klasse gefasst, damit er nur am Handy ausgeblendet werden kann (Text bleibt im HTML) |
| 39 | 2 S6 Perspektiven vor Preis | `index.html` | S6: Perspektiven-Block („Keine Kundinnenstimmen“) steht jetzt vor dem Preisblock statt direkt dahinter |
| 40 | 2 S4 Wissens-Kachel | `index.html` | S4: Wissens-Abschnitt mit Kachel steht jetzt hinter dem Schluss-Kaufaufruf statt direkt davor (kein kostenloser Ausgang vor der Entscheidung) |
| 41 | 2 CSS Startseite | `index.html` | Stile für S1, S2, S3 in einem markierten Block |
| 42 | 2 A1 ToxiCometer | `script.js` | A1: Wortlaut „erinnert an“ statt Diagnose |
| 43 | 2 A1 ToxiCometer | `script.js` | A1: Zusammenfassung ernst, aber ohne Diagnose |
| 44 | 2 A1 ToxiCometer | `script.js` | A1: Schutzkasten mit 110, Hilfetelefon und Telefonseelsorge ab hohem Ergebnis |
| 45 | 2 A1 ToxiCometer | `toxikometer.html` | A1: Stile des Schutzkastens (Linie #7d263f, Schrift #e8e8e8, Touch-Ziele) |
| 46 | 2 A2 No Contact | `no-contact/index.html` | A2: Link mitten im Text auf die Verkaufsseite (#programm) gestrichen |
| 47 | 2 A2 No Contact | `no-contact/index.html` | A2: Link auf die Verkaufsseite (#ueber-milena) gestrichen |
| 48 | 2 A4 Blick ins Buch | `blick-ins-buch.html` | A4: Notfallplan-Kasten mit Kauf-Knopf mitten in der CORE-Leseprobe entfernt; der leise Hinweis sos-mini am Ende bleibt |
| 49 | 3b Rosé-Pfeil | `unbond-nothing-buttons.css` | Pfeil ↗ in den Kauf-Knöpfen der Startseite: #e8e8e8 statt Rosé #d9879d (Entscheidung 3b) |
| 50 | 3b Rosé-Pfeil | `prompt-v5.css` | Gleiche Pfeilfarbe in prompt-v5.css: #e8e8e8 (Entscheidung 3b) |
| 51 | 4 Klarheit Bento | `klarheit.html` | Zeitleiste (identisch mit wissen.html) durch Bento-Raster ersetzt: große ToxiCometer-Kachel, breite Spielautomat-Kachel, Info- und Ausblick-Kachel |
| 52 | 4 Klarheit Bento | `klarheit.html` | Anleitung „So funktionieren die Tests“ ins Raster verschoben (Text unverändert); unten bleibt nur „Hintergrund und Literatur“ |
| 53 | 4 Klarheit Bento | `klarheit.html` | Neue Überschrift: wiederholt nicht mehr die Kachel-Überschrift von wissen.html, macht die Seite zur Auswahl |
| 54 | 4 Klarheit Bento | `klarheit.html` | Einleitung um Nutzen und Suchbegriff „toxische Muster erkennen“ ergänzt (Titel-Tag enthält „toxisch“) |
| 55 | 4 Klarheit Bento | `klarheit.html` | Frage-Finder: fünf Fragen springen direkt zum passenden Test und heben ihn hervor (ohne JavaScript) |
| 56 | 4 Klarheit Bento | `klarheit.html` | Stile des Bento-Rasters und Frage-Finders (eigener, markierter Block) |

## B · Farbersetzung (662 Ersetzungen in 57 Dateien)

Alle Bordeaux-Varianten wurden zu `#7d263f`, alle Grün- und Mint-Varianten zu `#5e9590`. Die Deckkraft bei `rgba()` bleibt jeweils erhalten.

| Datei | Ersetzungen | Werte (alt → neu, Anzahl) |
|---|---|---|
| `_test_schrift-index.html` | 4 | #c26a82 → #7d263f (2); #96334f → #7d263f (1); #a34b63 → #7d263f (1) |
| `bindungsmuster-test.html` | 10 | #7a9e8a → #5e9590 (2); #c97e92 → #7d263f (2); #6f2035 → #7d263f (1); rgba(111,32,53,.22) → rgba(125,38,63,.22) (1); rgba(122,158,138,.1) → rgba(94,149,144,.1) (1); rgba(111,32,53,.15) → rgba(125,38,63,.15) (1) … |
| `blick-ins-buch.html` | 25 | #6f2035 → #7d263f (1); #862840 → #7d263f (1); #7a9e8a → #5e9590 (1); #85ab91 → #5e9590 (1); #96334f → #7d263f (1); #a34b63 → #7d263f (1) … |
| `blog/gaslighting-lesbische-beziehungen.html` | 9 | #8b2035 → #7d263f (3); rgba(111,32,53,.4) → rgba(125,38,63,.4) (3); rgba(111,32,53,.18) → rgba(125,38,63,.18) (2); rgba(111,32,53,.40) → rgba(125,38,63,.40) (1) |
| `blog/index.html` | 9 | #6e1728 → #7d263f (1); #8f1f36 → #7d263f (1); #6fb0a8 → #5e9590 (1); #7a9e8a → #5e9590 (1); rgba(150,180,175,.16) → rgba(94,149,144,.16) (1); rgba(150,180,175,.26) → rgba(94,149,144,.26) (1) … |
| `blog/liebeskummer-neurobiologie.html` | 9 | #8b2035 → #7d263f (3); rgba(111,32,53,.4) → rgba(125,38,63,.4) (3); rgba(111,32,53,.18) → rgba(125,38,63,.18) (2); rgba(111,32,53,.40) → rgba(125,38,63,.40) (1) |
| `blog/narzissmus-lesbische-beziehungen-wlw.html` | 9 | #8b2035 → #7d263f (3); rgba(111,32,53,.4) → rgba(125,38,63,.4) (3); rgba(111,32,53,.18) → rgba(125,38,63,.18) (2); rgba(111,32,53,.40) → rgba(125,38,63,.40) (1) |
| `blog/narzissmus-weiblich-definition.html` | 9 | #8b2035 → #7d263f (3); rgba(111,32,53,.4) → rgba(125,38,63,.4) (3); rgba(111,32,53,.18) → rgba(125,38,63,.18) (2); rgba(111,32,53,.40) → rgba(125,38,63,.40) (1) |
| `blog/queer-breakup-lesbischer-kontext.html` | 9 | #8b2035 → #7d263f (3); rgba(111,32,53,.4) → rgba(125,38,63,.4) (3); rgba(111,32,53,.18) → rgba(125,38,63,.18) (2); rgba(111,32,53,.40) → rgba(125,38,63,.40) (1) |
| `blog/toxische-beziehung-unter-frauen-trauma-bonding.html` | 9 | #8b2035 → #7d263f (3); rgba(111,32,53,.4) → rgba(125,38,63,.4) (3); rgba(111,32,53,.18) → rgba(125,38,63,.18) (2); rgba(111,32,53,.40) → rgba(125,38,63,.40) (1) |
| `blog/toxische-beziehung-warnsignale-wlw.html` | 9 | #8b2035 → #7d263f (3); rgba(111,32,53,.4) → rgba(125,38,63,.4) (3); rgba(111,32,53,.18) → rgba(125,38,63,.18) (2); rgba(111,32,53,.40) → rgba(125,38,63,.40) (1) |
| `blog/trauma-bonding-loesen.html` | 9 | #8b2035 → #7d263f (3); rgba(111,32,53,.4) → rgba(125,38,63,.4) (3); rgba(111,32,53,.18) → rgba(125,38,63,.18) (2); rgba(111,32,53,.40) → rgba(125,38,63,.40) (1) |
| `blog/trennungsschmerzen-30-tage-plan.html` | 9 | #8b2035 → #7d263f (3); rgba(111,32,53,.4) → rgba(125,38,63,.4) (3); rgba(111,32,53,.18) → rgba(125,38,63,.18) (2); rgba(111,32,53,.40) → rgba(125,38,63,.40) (1) |
| `blog/verdeckter-narzissmus-erkennen.html` | 11 | #8b2035 → #7d263f (3); rgba(111,32,53,.4) → rgba(125,38,63,.4) (3); rgba(111,32,53,.18) → rgba(125,38,63,.18) (2); rgba(111,32,53,.40) → rgba(125,38,63,.40) (1); rgba(111,32,53,.55) → rgba(125,38,63,.55) (1); rgba(111,32,53,.10) → rgba(125,38,63,.10) (1) |
| `faq-chat-v7.css` | 2 | rgba(21, 154, 130, .10) → rgba(94, 149, 144, .10) (1); rgba(21, 154, 130, .46) → rgba(94, 149, 144, .46) (1) |
| `glass-v33.css` | 10 | rgba(190,99,126,.55) → rgba(125,38,63,.55) (4); #8c2c46 → #7d263f (3); #a9c9b3 → #5e9590 (1); #7b233c → #7d263f (1); rgba(169,201,179,.12) → rgba(94,149,144,.12) (1) |
| `heilungskompass.html` | 19 | #7a9e8a → #5e9590 (6); rgba(111,32,53,.18) → rgba(125,38,63,.18) (1); rgba(111,32,53,.3) → rgba(125,38,63,.3) (1); rgba(107,32,53,.32) → rgba(125,38,63,.32) (1); rgba(107,32,53,.45) → rgba(125,38,63,.45) (1); rgba(122,158,138,.12) → rgba(94,149,144,.12) (1) … |
| `hero-program-v1.css` | 7 | #159a82 → #5e9590 (4); rgba(21, 154, 130, .72) → rgba(94, 149, 144, .72) (1); rgba(21, 154, 130, .68) → rgba(94, 149, 144, .68) (1); rgba(21, 154, 130, .12) → rgba(94, 149, 144, .12) (1) |
| `index.html` | 4 | #c26a82 → #7d263f (2); #96334f → #7d263f (1); #a34b63 → #7d263f (1) |
| `klarheit.html` | 7 | #7a9e8a → #5e9590 (3); #6f2035 → #7d263f (2); #4a1523 → #7d263f (1); rgba(111,32,53,.16) → rgba(125,38,63,.16) (1) |
| `narzissmus-test.html` | 10 | #7a9e8a → #5e9590 (2); #c97e92 → #7d263f (2); #6f2035 → #7d263f (1); rgba(111,32,53,.22) → rgba(125,38,63,.22) (1); rgba(122,158,138,.1) → rgba(94,149,144,.1) (1); rgba(111,32,53,.15) → rgba(125,38,63,.15) (1) … |
| `no-contact/index.html` | 20 | #6B3E44 → #7d263f (2); #85ab91 → #5e9590 (2); #6f2035 → #7d263f (1); #862840 → #7d263f (1); #8B2035 → #7d263f (1); #aec8b6 → #5e9590 (1) … |
| `no-contact/no-contact.css` | 2 | rgba(111, 32, 53, .18) → rgba(125, 38, 63, .18) (1); rgba(133, 171, 145, .12) → rgba(94, 149, 144, .12) (1) |
| `perspectives-v3.css` | 5 | #159a82 → #5e9590 (4); rgba(21, 154, 130, .72) → rgba(94, 149, 144, .72) (1) |
| `prompt-v5.css` | 4 | #159A82 → #5e9590 (1); rgba(21, 154, 130, .55) → rgba(94, 149, 144, .55) (1); rgba(21, 154, 130, .13) → rgba(94, 149, 144, .13) (1); rgba(21, 154, 130, .72) → rgba(94, 149, 144, .72) (1) |
| `report-results.css` | 7 | #bc5470 → #7d263f (4); #7a9e8a → #5e9590 (2); #7fc4b0 → #5e9590 (1) |
| `report.css` | 18 | #85ab91 → #5e9590 (3); #a8c8b5 → #5e9590 (3); #6f2035 → #7d263f (2); #8b2b45 → #7d263f (2); #862840 → #7d263f (2); #a13a55 → #7d263f (2) … |
| `site-v21.css` | 20 | rgba(133,171,145,.15) → rgba(94,149,144,.15) (2); rgba(133,171,145,.55) → rgba(94,149,144,.55) (2); rgba(133,171,145,.4) → rgba(94,149,144,.4) (2); #85ab91 → #5e9590 (1); #6f2035 → #7d263f (1); #872942 → #7d263f (1) … |
| `style.css` | 36 | rgba(111,32,53,.18) → rgba(125,38,63,.18) (4); #7a9e8a → #5e9590 (3); rgba(122,158,138,.25) → rgba(94,149,144,.25) (3); #6f2035 → #7d263f (2); rgba(111,32,53,.45) → rgba(125,38,63,.45) (2); #862840 → #7d263f (1) … |
| `tools/phase-1/flashback-stopper/app.css` | 18 | rgb(63 211 162/var(--tw-bg-opacity,1)) → rgb(94 149 144/var(--tw-bg-opacity,1)) (5); rgb(98 240 189/var(--tw-text-opacity,1)) → rgb(94 149 144/var(--tw-text-opacity,1)) (4); rgb(63 211 162/var(--tw-border-opacity,1)) → rgb(94 149 144/var(--tw-border-opacity,1)) (2); rgba(63,211,162,.4) → rgba(94,149,144,.4) (2); rgba(63,211,162,.1) → rgba(94,149,144,.1) (2); #3fd3a2 → #5e9590 (1) … |
| `tools/phase-2/community-mapping/app.css` | 30 | rgb(98 240 189/var(--tw-border-opacity,1)) → rgb(94 149 144/var(--tw-border-opacity,1)) (5); rgb(98 240 189/var(--tw-bg-opacity,1)) → rgb(94 149 144/var(--tw-bg-opacity,1)) (5); rgb(98 240 189/var(--tw-text-opacity,1)) → rgb(94 149 144/var(--tw-text-opacity,1)) (3); #3fd3a2 → #5e9590 (2); rgba(98,240,189,.4) → rgba(94,149,144,.4) (2); rgba(63,211,162,.1) → rgba(94,149,144,.1) (2) … |
| `tools/phase-2/index.html` | 3 | #7a9e8a → #5e9590 (3) |
| `tools/phase-2/klarheitscheck/app.css` | 11 | rgba(98,240,189,.4) → rgba(94,149,144,.4) (2); rgba(98,240,189,.5) → rgba(94,149,144,.5) (2); #3fd3a2 → #5e9590 (1); #62f0bd → #5e9590 (1); #96334f → #7d263f (1); rgba(98,240,189,.05) → rgba(94,149,144,.05) (1) … |
| `tools/phase-2/klarheitscheck/app.js` | 2 | #62f0bd → #5e9590 (1); rgba(98,240,189,.4) → rgba(94,149,144,.4) (1) |
| `tools/phase-4/bindungsmuster-quiz/app.css` | 22 | rgb(63 211 162/var(--tw-bg-opacity,1)) → rgb(94 149 144/var(--tw-bg-opacity,1)) (5); rgba(98,240,189,.4) → rgba(94,149,144,.4) (3); #3fd3a2 → #5e9590 (2); rgb(98 240 189/var(--tw-border-opacity,1)) → rgb(94 149 144/var(--tw-border-opacity,1)) (2); rgba(98,240,189,.3) → rgba(94,149,144,.3) (2); rgb(98 240 189/var(--tw-bg-opacity,1)) → rgb(94 149 144/var(--tw-bg-opacity,1)) (2) … |
| `tools/tools.css` | 29 | rgba(122,158,138,.3) → rgba(94,149,144,.3) (3); #85ab91 → #5e9590 (2); rgba(111,32,53,.28) → rgba(125,38,63,.28) (2); rgba(122,158,138,.28) → rgba(94,149,144,.28) (2); #6f2035 → #7d263f (1); #832640 → #7d263f (1) … |
| `toxikometer.html` | 2 | rgba(111,32,53,.22) → rgba(125,38,63,.22) (1); #7a9e8a → #5e9590 (1) |
| `unbond-below-hero.css` | 4 | #159a82 → #5e9590 (1); #982e4d → #7d263f (1); #bc5470 → #7d263f (1); #af3758 → #7d263f (1) |
| `unbond-bereich.css` | 180 | rgb(182, 215, 192) → rgb(94, 149, 144) (20); #b6d7c0 → #5e9590 (16); rgba(182, 215, 192, 0.28) → rgba(94, 149, 144, 0.28) (12); rgba(182, 215, 192, 0.36) → rgba(94, 149, 144, 0.36) (8); rgba(182, 215, 192, 0.3) → rgba(94, 149, 144, 0.3) (8); rgba(182, 215, 192, 0.55) → rgba(94, 149, 144, 0.55) (8) … |
| `unbond-consent.css` | 6 | #6f2035 → #7d263f (4); #85ab91 → #5e9590 (1); #832640 → #7d263f (1) |
| `unbond-final-cta.css` | 3 | #982e4d → #7d263f (1); #bc5470 → #7d263f (1); #af3758 → #7d263f (1) |
| `unbond-focus.css` | 4 | #982e4d → #7d263f (1); #bc5470 → #7d263f (1); #af3758 → #7d263f (1); #159a82 → #5e9590 (1) |
| `unbond-nothing-alt.css` | 3 | #96334f → #7d263f (3) |
| `unbond-nothing-buttons.css` | 4 | #96334f → #7d263f (1); #159a82 → #5e9590 (1); #4a7a75 → #5e9590 (1); #9cc7c1 → #5e9590 (1) |
| `unbond-nothing-skin.css` | 2 | #96334f → #7d263f (2) |
| `unbond-nothing.css` | 2 | #96334f → #7d263f (1); #c96a83 → #7d263f (1) |
| `unbond-pages.css` | 1 | rgba(111, 32, 53, .14) → rgba(125, 38, 63, .14) (1) |
| `unbond-painpoints.css` | 2 | #159a82 → #5e9590 (2) |
| `unbond-shell.css` | 7 | #6f2035 → #7d263f (1); #862840 → #7d263f (1); #7a9e8a → #5e9590 (1); #7d263d → #7d263f (1); #96324e → #7d263f (1); rgba(122, 158, 138, .25) → rgba(94, 149, 144, .25) (1) … |
| `unbond-unified.css` | 1 | #159a82 → #5e9590 (1) |
| `unbond-web.css` | 4 | #85ab91 → #5e9590 (1); #a8c8b5 → #5e9590 (1); rgba(122, 158, 138, .5) → rgba(94, 149, 144, .5) (1); rgba(111, 32, 53, .26) → rgba(125, 38, 63, .26) (1) |
| `unbond-weg-tl.css` | 1 | #7a9e8a → #5e9590 (1) |
| `unbond-weiter.css` | 1 | #96334f → #7d263f (1) |
| `unbond-weiter.js` | 4 | #bc5470 → #7d263f (2); #6fb0a8 → #5e9590 (1); #7a9e8a → #5e9590 (1) |
| `unbond-zurueck.css` | 1 | #96334f → #7d263f (1) |
| `ux-refinement.css` | 2 | #b6d7c0 → #5e9590 (1); #963550 → #7d263f (1) |
| `wissen.html` | 2 | #7a9e8a → #5e9590 (2) |

## C · Versionsnummern (Cache)

An allen Verweisen auf die 36 geänderten CSS- und JS-Dateien steht jetzt `?v=20261108`, insgesamt 258 Verweise. Betroffene CSS/JS-Dateien:

`faq-chat-v7.css`, `glass-v33.css`, `hero-program-v1.css`, `no-contact/no-contact.css`, `perspectives-v3.css`, `prompt-v5.css`, `report-results.css`, `report.css`, `script.js`, `site-v21.css`, `style.css`, `tools/phase-1/flashback-stopper/app.css`, `tools/phase-2/community-mapping/app.css`, `tools/phase-2/klarheitscheck/app.css`, `tools/phase-2/klarheitscheck/app.js`, `tools/phase-4/bindungsmuster-quiz/app.css`, `tools/tools.css`, `unbond-below-hero.css`, `unbond-bereich.css`, `unbond-consent.css`, `unbond-final-cta.css`, `unbond-focus.css`, `unbond-nothing-alt.css`, `unbond-nothing-buttons.css`, `unbond-nothing-skin.css`, `unbond-nothing.css`, `unbond-pages.css`, `unbond-painpoints.css`, `unbond-shell.css`, `unbond-unified.css`, `unbond-web.css`, `unbond-weg-tl.css`, `unbond-weiter.css`, `unbond-weiter.js`, `unbond-zurueck.css`, `ux-refinement.css`


## D · Alle geänderten Dateien (73)

- `_test_schrift-index.html`
- `bindungsmuster-test.html`
- `blick-ins-buch.html`
- `blog/gaslighting-lesbische-beziehungen.html`
- `blog/index.html`
- `blog/liebeskummer-neurobiologie.html`
- `blog/narzissmus-lesbische-beziehungen-wlw.html`
- `blog/narzissmus-weiblich-definition.html`
- `blog/queer-breakup-lesbischer-kontext.html`
- `blog/toxische-beziehung-unter-frauen-trauma-bonding.html`
- `blog/toxische-beziehung-warnsignale-wlw.html`
- `blog/trauma-bonding-loesen.html`
- `blog/trennungsschmerzen-30-tage-plan.html`
- `blog/verdeckter-narzissmus-erkennen.html`
- `datenschutz.html`
- `faq-chat-v7.css`
- `glass-v33.css`
- `heilungskompass.html`
- `hero-program-v1.css`
- `impressum.html`
- `index.html`
- `klarheit.html`
- `leseprobe-wolf-im-schafskittel.html`
- `narzissmus-test.html`
- `no-contact/index.html`
- `no-contact/no-contact.css`
- `perspectives-v3.css`
- `prompt-v5.css`
- `report-results.css`
- `report.css`
- `report.html`
- `script.js`
- `site-v21.css`
- `style.css`
- `tools/index.html`
- `tools/phase-1/flashback-stopper/app.css`
- `tools/phase-1/flashback-stopper/index.html`
- `tools/phase-1/index.html`
- `tools/phase-2/community-mapping/app.css`
- `tools/phase-2/community-mapping/index.html`
- `tools/phase-2/index.html`
- `tools/phase-2/klarheitscheck/app.css`
- `tools/phase-2/klarheitscheck/app.js`
- `tools/phase-2/klarheitscheck/index.html`
- `tools/phase-3/index.html`
- `tools/phase-4/bindungsmuster-quiz/app.css`
- `tools/phase-4/bindungsmuster-quiz/index.html`
- `tools/phase-4/index.html`
- `tools/phase-5/index.html`
- `tools/phase-6/index.html`
- `tools/spielautomat.html`
- `tools/tools.css`
- `toxikometer.html`
- `unbond-below-hero.css`
- `unbond-bereich.css`
- `unbond-consent.css`
- `unbond-final-cta.css`
- `unbond-focus.css`
- `unbond-nothing-alt.css`
- `unbond-nothing-buttons.css`
- `unbond-nothing-skin.css`
- `unbond-nothing.css`
- `unbond-pages.css`
- `unbond-painpoints.css`
- `unbond-shell.css`
- `unbond-unified.css`
- `unbond-web.css`
- `unbond-weg-tl.css`
- `unbond-weiter.css`
- `unbond-weiter.js`
- `unbond-zurueck.css`
- `ux-refinement.css`
- `wissen.html`
