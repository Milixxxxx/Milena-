# UNBOND · Umsetzungsbericht 08.11.2026

Grundlage ist dein hochgeladener Stand `UNBOND_manus_vorschlag_2026-11-07` zusammen mit Designsystem v3, Regelwerk, Projektstatus und Logbuch. Alle Änderungen entstehen aus Skripten, die jede Ersetzung gegen den erwarteten Originaltext prüfen. Ein kompletter Neuaufbau aus dem Original ergibt Byte für Byte denselben Stand. Die vollständige Liste jeder Einzeländerung steht in `UNBOND_Aenderungsliste_2026-11-08.md`.

## Kurzfassung

| Bereich | Ergebnis |
|---|---|
| Farbsystem (Regeln 1–5) | 662 Ersetzungen in 57 Dateien. Bordeaux nur noch `#7d263f`, Grün nur noch `#5e9590`. Bordeaux ist nirgends mehr Schriftfarbe. Alle Knopf-Hover sind `#7d263f` mit weißer Schrift. Grüne Tool-Knöpfe haben schwarze Schrift. |
| wissen.html · Video | Das Video beginnt unter Krisenleiste, Kopfzeile und „Dein Weg“. Die Köpfe sind sichtbar. Das Video selbst ist unverändert. |
| wissen.html · ToxiCometer-Klick | Ursache gefunden: Es war kein technischer Fehler, sondern ein Doppelgänger-Effekt. Gelöst durch eine eigenständige Gestaltung von klarheit.html (Bento-Raster und Frage-Finder). |
| Empfehlungen 07.11. | S1–S6, A1, A2 und A4 sind umgesetzt. A3 bleibt unverändert (deine Entscheidung 2a). |
| Entscheidung 3b | Der Rosé-Pfeil ↗ in den Kauf-Knöpfen ist jetzt `#e8e8e8`. |
| Cache | 258 Verweise auf 36 geänderte CSS/JS-Dateien tragen jetzt `?v=20261108`. |

## 1 · Farbsystem

**Regel 1 und 3 (ein Bordeaux, ein Grün).** Alle Werte deiner Liste sind ersetzt, in Hex-, `rgb()`/`rgba()`- und Tailwind-Schreibweise (`rgb(98 240 189/var(--tw-…))`). Die Deckkraft bleibt dabei erhalten. Zusätzlich habe ich sechs Werte ersetzt, die nicht in deiner Liste standen, aber eindeutig Varianten sind:

| Wert | Fundstelle | Neu |
|---|---|---|
| `#c97e92` | Markierung „hoch“ in Narzissmus- und Bindungsmuster-Test | `#7d263f` (als Schrift dann `#e8e8e8`) |
| `#c96a83` | Zitatquelle im Blog (meine Kontrastkorrektur vom 07.11.) | `#7d263f` (als Schrift dann `#e8e8e8`) |
| `#4a1523` | dunkles Bordeaux in Verläufen (Cookie-Knopf Klarheit, Cortisol-Balken Spielautomat) | `#7d263f` |
| `#a33b3b` | Weinrot-Tönung im Report-Schutzkasten | `#7d263f` |
| `#6efbc7` | Mint-Hover im Stitch-Werkzeug Community-Mapping | `#5e9590` |
| `#d9879d` | Pfeil ↗ in den Kauf-Knöpfen der Startseite | `#e8e8e8` (Entscheidung 3b) |

Bewusst unverändert sind laut deinen Vorgaben: Mauve `#B4869F`, Gold, Terracotta, `#ffb1c0`/`#ffb4ab`, das Warnrot des Spielautomaten mit seinen Verwandten, sehr dunkle Hintergründe, fast weiße Schrift mit Grünstich (`#bbcac1`, `#d0dfd5`, `#c6ddcc`, `#c8d9cd`) und Bibliotheken wie `chart.umd.min.js`.

**Regel 2 (Hover).** Sieben Knöpfe hatten beim Überfahren keine weiße Schrift oder nur eine Tönung statt einer Füllung. Betroffen waren Cookie-Banner, Blick ins Buch (Knopf und Umriss-Knopf), Leseprobe, Spielautomat „Drehen“, Notfall-Knopf im Klarheitscheck und Community-Mapping. Alle füllen sich jetzt mit `#7d263f`. Der Notfall-Knopf behält nach Regel 5 seine rosa Schrift `#ffb1c0`, der Kontrast liegt bei etwa 6:1.

**Regel 4 (Bordeaux nie als Schrift).** Insgesamt 14 Stellen sind jetzt `#e8e8e8`: Zitatquellen, die „hoch“-Markierung, Aufzählungszeichen ›, Listenpunkte im Report, der „+“-Wert im Spielautomat und die Hervorhebung in der Wortmarke von Blick ins Buch. Hinzu kommen vorsorglich Stellen, die derzeit nicht sichtbar sind. In den Weiter-Karten und Testleisten (`unbond-weiter.js/.css`) haben ToxiCometer und Report jetzt eine eigene Schriftfarbe (`--c-text: #e8e8e8`). Die Kartenfarbe selbst bleibt Bordeaux.

**Prüfung im Browser:**

- 37 Seiten bei 375 und 1280 px: null Stellen mit Bordeaux als Schrift.
- Hover-Prüfung: ein Befund, und zwar die gewollte Ausnahme (Notfall-Knopf, Regel 5).
- 19 Werkzeug- und Testseiten: Alle grün gefüllten Knöpfe haben schwarze Schrift.

## 2 · wissen.html

**Video.** Das Hintergrundvideo war fest an den oberen Bildschirmrand gesetzt und lief unter Krisenleiste, Kopfzeile und „Dein Weg“ hindurch. Dadurch waren die Köpfe abgeschnitten. Jetzt beginnt es genau an der Unterkante dieses Kopfbereichs (161 px am Desktop, 177–196 px am Handy, je nach Breite). Der Bildausschnitt sitzt bei 50 % / 20 % statt mittig. Das Video selbst ist nicht verändert, es wird nur oben weniger und unten mehr beschnitten. Belegbild: `belege/VN_video_wissen.png` (links vorher, rechts nachher, bei 375, 1280 und 1920 px).

**ToxiCometer-Klick.** Auf wissen.html gibt es keinen Link zum ToxiCometer, keine Weiterleitung und kein Neuladen. Die Kachel „War das toxisch – oder bin ich zu empfindlich?“ führt zu klarheit.html. Diese Seite begann mit derselben Überschrift und demselben Zeitleisten-Layout. Deshalb wirkte es so, als lade wissen.html neu, und erst der zweite Klick führte zum Test. Die Lösung ist in Abschnitt 3 beschrieben.

## 3 · klarheit.html neu gestaltet (Skill: content-creation)

**Kernproblem:** Die Übersichtsseite war eine optische Kopie der vorherigen Seite. Sie wiederholte deren Frage, statt beim Auswählen zu helfen.

**Strategie:** Die Seite bekommt eine eigene Aufgabe, nämlich die Auswahl. Laut content-creation-Skill sollen Überschriften den Nutzen in wenigen Worten nennen, jeder Abschnitt die Frage „Was habe ich davon?“ beantworten und die Hauptaktion klar sein. Deshalb führt jetzt die Frage der Leserin, nicht der Testname: Wer eine Frage im Kopf hat, findet den passenden Test mit einem Tippen. Das ist ein Mikro-Schritt ohne Hürde, und die Erfahrung der Leserin steht vor jedem Angebot („Sie hat gesagt, du übertreibst …“ bleibt erhalten).

| Element | Umsetzung |
|---|---|
| Überschrift | „Welche Frage lässt dich nicht los?“, darunter „Wähle den Test, der dazu passt.“ Sie wiederholt nicht mehr die Kachel von wissen.html. |
| Einleitung | Ergänzt um „Fünf kostenlose Selbsttests helfen dir, toxische Muster zu erkennen – in deinem Tempo.“ So bleibt der Suchbegriff aus dem Seitentitel auf der Seite. |
| Frage-Finder | „Was beschäftigt dich gerade?“ mit fünf Fragen als Schaltflächen (44 px). Ein Tippen springt zum passenden Test, die Zielkachel bekommt einen Mauve-Rahmen. Das funktioniert ohne JavaScript. |
| Bento-Raster | Umgesetzt nach dem Prinzip deines Prompts (Feature-Section mit Bento-Grid), erweitert und in natives CSS Grid übertragen, weil die Seite kein React/Tailwind nutzt. Am Desktop wechseln breite und schmale Kacheln: ToxiCometer groß als „Empfohlen als Erstes“ plus Narzissmus-Test, dann Bindungsmuster plus Heilungskompass breit, dann Spielautomat breit plus Info-Kachel „So funktionieren die Tests“, darunter der Streifen „Weitere Tests folgen“. Am Tablet hat das Raster zwei Spalten, am Handy eine. |
| Kachel-Inhalt | Nummer (01–05, passend zu „Test x von 5“ auf den Testseiten), Badge, die Frage in Grün kursiv, Testname, der bisherige Beschreibungstext, Kennzahlen mit Linien-Symbolen (Fragen, Dauer, Sofort-Auswertung), Themen-Schlagworte und Knopf. Breite Kacheln zeigen das Bild rechts mit Verlauf, schmale vollflächig abgedunkelt. |
| Farben | Akzent ist die Bereichsfarbe Klarheit (Mauve), damit sich die Seite auch farblich von Wissen (Gold) abhebt. Knopf-Hover `#7d263f` mit weißer Schrift, Bordeaux nie als Schrift. |
| Barrierefreiheit | Echte Liste mit Beschriftung, Symbole mit `aria-hidden`, sichtbarer Fokusrahmen, `prefers-reduced-motion` berücksichtigt, kein seitliches Überlaufen. |
| Unverändert | Hinweis „Orientierung, keine Diagnose“, „Hintergrund und Literatur“, Tracking-Namen (`data-track`), Anker `#tests` und `#test-1` bis `#test-6`, die Brücke zu No Contact. |

Belegbild: `belege/VN_klarheit.png` (links Desktop, rechts Handy in zwei Spalten).

## 4 · Empfehlungen aus dem Bericht vom 07.11.

| Nr. | Umsetzung |
|---|---|
| S1 | Footer der Startseite: drei Krisennummern als Telefonlinks (Telefonseelsorge, Hilfetelefon, 110), Touch-Ziel 45 px. |
| S2 | „Beispielgeschichte zweier Frauen: Mary und Sandra. Die beiden sind erfunden, ihr Muster ist echt.“ Dazu ein Etikett „Beispielfigur aus dem Buch“ auf der Mary-Karte, das auch im Namen für Screenreader steht. |
| S3 | Die drei Zahlenblöcke der Schmerzkarten (Zahl mit „nicht verifiziert“) sind ausgeblendet, nicht gelöscht. Zum Zurückholen genügt es, `hidden` am `div.pf-stat` zu entfernen. |
| S4 | Der Abschnitt „Verstehen“ mit der kostenlosen Wissens-Kachel steht jetzt hinter dem Schluss-Kaufaufruf statt davor. |
| S5 | Nutzen-Satz im Hero: „Hier verstehst du, warum du sie vermisst, obwohl sie dir wehgetan hat. Und du gehst Schritt für Schritt aus diesem Kreislauf heraus.“ Damit der Kauf-Knopf am Handy sichtbar bleibt (840 → 776 px bei 812 px Bildschirmhöhe), ist der zweite Beschreibungssatz nur am Handy ausgeblendet. Am Desktop und im HTML für Google bleibt er erhalten. |
| S6 | Der Perspektiven-Block steht jetzt vor dem Preisblock. |
| A1 | ToxiCometer: Wortlaut „ein Muster, das an das erinnert, was Fachleute ‚malignen Narzissmus‘ nennen … Und es ist keine Diagnose über eine Person.“ Ab „Hohe Toxizität“ (Score > 35) erscheint direkt unter dem Ergebnis ein Schutzhinweis mit 110, Hilfetelefon und Telefonseelsorge (Touch-Ziele 44 px). |
| A2 | No Contact: Die beiden Links mitten im Text auf die Verkaufsseite sind gestrichen. Als reiner Text mit Pfeil hätten sie wie kaputte Links gewirkt. |
| A3 | Unverändert, deine Entscheidung: Die Zitate sind echt. |
| A4 | Blick ins Buch: Der Notfallplan-Kasten mit Kauf-Knopf mitten in der CORE-Leseprobe ist entfernt. Ohne Knopf wäre er ein Werbekasten ohne Handlung gewesen. Der leise Hinweis am Ende (`sos-mini`) bleibt. |

## 5 · Hochladen und testen

Lade alle 73 geänderten Dateien hoch. Sie liegen gesammelt im ZIP `…_nur_geaenderte_Dateien`, alternativ ist der Komplettordner im zweiten ZIP. Die Versionsnummern `?v=20261108` sorgen dafür, dass Browser und Server-Cache die neuen CSS/JS-Dateien laden. Die `.htaccess` ist unverändert.

Danach empfehle ich diese kurze Sichtprüfung am Handy:

1. wissen.html: Köpfe im Video sichtbar.
2. klarheit.html: Frage-Finder springt zur Kachel.
3. ToxiCometer bis zum Ergebnis durchspielen: Schutzhinweis erscheint.
4. Startseite: Footer mit drei Telefonlinks, Kauf-Knopf im ersten Bildschirm sichtbar.
5. Cookie-Banner: Hover beider Knöpfe am Desktop.

## 6 · Genutzte Skills

| Skill | Eingesetzt | Wo |
|---|---|---|
| content-creation | ja | klarheit.html: Seitenstruktur, Überschrift, Einleitung, Frage-Finder, Kachel-Wortlaut und Handlungsaufforderungen. Die Leitlinien zu Nutzen-Überschrift und einer klaren Hauptaktion sind direkt in die Gestaltung eingeflossen. |
| web-design-reviewer | am 07.11. | Prüfmethodik des Audits vom 07.11. Heute habe ich mit eigenen Browser-Skripten im gleichen Sinn geprüft und den Skill nicht erneut geladen. |
| muapi-ui-design | nein | Nicht nötig: Das Design ist direkt als Code im bestehenden Designsystem entstanden und im Browser geprüft. Ein generiertes Mockup hätte keine zusätzliche Sicherheit gebracht. |

## 7 · Bewusst nicht umgesetzt oder offen

- **Kleinigkeiten ohne konkreten Auftrag:** Ich habe sie nicht angefasst.
  - Formulierung „Test 1 von 5“
  - aufklappbare „Anleitung & Quellen“ im ToxiCometer
  - Buch-Hinweis in Phase 3–5
- **⚠-Zeichen im ToxiCometer-Ergebnis** beim Profil „Kontrolle mit System“: Es ist ein Warnsymbol und kein Bordeaux. Ich habe es belassen, auf Wunsch tausche ich es gegen ein Linien-Symbol.
- **Testdateien** (`_test_*.html`) sind nur mitgezogen, wo Farbwerte ersetzt wurden.
- **Logbuch, Projektstatus und website.md** habe ich nicht verändert. Der Umzugs-Prompt enthält einen fertigen Logbuch-Eintrag zum Übernehmen.
