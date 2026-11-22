# UNBOND – Icon-Audit, 9. November 2026

## Kurzbefund

Es gibt zwei **voneinander unabhängige** Ursachen:

1. **Live-Bereitstellung:** Alle neun im lokalen Projekt durch `unbond-weiter.js` bzw. `unbond-weiter.css` referenzierten Dateien unter `assets/icons/sm/` liefern auf `https://www.unbond.de/` am 09.11.2026 HTTP **404**. Im Projekt und im ursprünglichen ZIP sind sie unter exakt dieser Groß-/Kleinschreibung vorhanden und bytegleich (SHA-256). Fehlende Live-Dateien erklären die leeren Masken-Boxen bei Buch und Karten. Die vier statischen Icons unter `assets/icon-*.png`, die `index.html` verwendet, lieferten live dagegen HTTP **200**. Es wurde nichts hochgeladen oder veröffentlicht.
2. **Separater Pfadfehler bei Installation in einem Unterverzeichnis:** Auf `tools/spielautomat.html` wird `data-base="../"` in die dynamischen Masken-URLs aufgenommen. CSS löst die mit `var(--icon)` eingesetzte relative URL relativ zur CSS-Datei `unbond-weiter.css` auf, nicht relativ zur Tool-HTML-Datei. Ist die gesamte Site beispielsweise unter `/UNBOND_manus_2026-11-08/` installiert, führt das vorher nach `/assets/icons/sm/...` statt nach `/UNBOND_manus_2026-11-08/assets/icons/sm/...`: Beide Icons liefern 404 und sind leer. Am Domain-Wurzelverzeichnis war dieser Fehler durch das zufällig gleiche Ziel nicht sichtbar. Dieser **konkret reproduzierte** lokale Fehler wurde minimal behoben.

Die Live-404 sind **nicht** durch die lokale JS-Korrektur behoben; dafür müssen die Original-Assets erst mit Freigabe auf den Server. Ein vollständiger Live-Nachtest ist vor diesem Schritt nicht möglich.

## Lokale Änderungen

- `UNBOND_manus_2026-11-08/unbond-weiter.js`: Nur `iconUrl` geändert. Die aus `data-base`, `assets/icons/sm/` und dem vorhandenen Dateinamen zusammengesetzte Adresse wird mit `new URL(..., document.baseURI)` vor dem Einsetzen in die CSS-Maske aufgelöst; `JSON.stringify` stellt das zitierte `url(...)` bereit. Keine Änderung von Motiven, Texten, Farben, Größen oder Karten.
- `UNBOND_manus_2026-11-08/tools/spielautomat.html`: Nur den Versionsparameter von `../unbond-weiter.js?v=20261108` auf `?v=20261109-icons` geändert, damit die betroffene Unterordner-Seite keine alte Version aus dem Browser-Cache verwenden muss.

`tox-ergebnis.css`, `tox-ergebnis.js`, `toxikometer.html`, `report.html` und Klarheit-Dateien wurden im Rahmen dieses Audits nicht geändert. Das Original-ZIP und alle Icon-Bilder wurden nicht geändert. Die gesicherten Ausgangsstände der beiden geänderten Dateien liegen unter `icon-audit-evidence/unbond-weiter-vorher.js` bzw. `icon-audit-evidence/spielautomat-vorher.html`.

## Zur Bereitstellung vorbereitet – nicht veröffentlicht

[ZIP mit den neun fehlenden Original-Icons](/home/ubuntu/unbond-work/UNBOND-icon-upload-2026-11-09.zip). Das ZIP enthält ausschließlich diese neun Dateien unter `assets/icons/sm/`, ohne HTML oder JavaScript. Die gleichnamige Ordnerstruktur liegt unter `/home/ubuntu/unbond-work/icon-upload-2026/assets/icons/sm/`. Alle neun Dateien entsprechen bytegenau den Dateien im ursprünglichen ZIP, die Bilddateien lassen sich dekodieren; `ZipFile.testzip()` ergab keinen Fehler.

| Datei unter `assets/icons/sm/` | Verwendung | Lokal/Original-ZIP | Live-Leseabfrage |
|---|---|---|---|
| `icon-hand-schmetterling.png` | Buch-Block | vorhanden / bytegleich | 404 |
| `icon-gluehbirne-puzzle.png` | ToxiCometer / Report-Karte | vorhanden / bytegleich | 404 |
| `icon-auge-durchgestrichen.png` | Narzissmus-Karte | vorhanden / bytegleich | 404 |
| `icon-verbindung.webp` | Bindungsmuster-Karte | vorhanden / bytegleich | 404 |
| `icon-zielscheibe.png` | Heilungskompass-Karte | vorhanden / bytegleich | 404 |
| `icon-atom.png` | Spielautomat-Karte | vorhanden / bytegleich | 404 |
| `icon-hand-blaetter2.png` | No-Contact-Karte | vorhanden / bytegleich | 404 |
| `icon-klinisch.webp` | Quellen-Hinweis per CSS | vorhanden / bytegleich | 404 |
| `icon-fuersorge.webp` | Sicherheitshinweis per CSS | vorhanden / bytegleich | 404 |

Die Dateien `icon-hand-blaetter2.png` und `icon-hand-schmetterling.png` sind bereits im Original-ZIP unter zwei Namen byteidentisch. Sie wurden bewusst nicht ersetzt, um das ursprüngliche Design zu erhalten. Weitere im Projekt/ZIP vorhandene, nicht referenzierte Icons mussten nicht als Ersatz verwendet werden. Kein konkret referenziertes Icon fehlt im Originalpaket; in den geprüften Dateinamen wurde kein Groß-/Kleinschreibfehler gefunden.

## Vorher/Nachher-Tests

- **Reproduktion vor Korrektur:** Lokaler Server mit Projekt unter einem URL-Präfix, `tools/spielautomat.html`, Chromium 156 / Playwright, 375 und 1280 px. Gesichertes Original-JS über eine lokale Playwright-Route bereitgestellt. Beide Masken holen fälschlich `http://127.0.0.1:18765/assets/icons/sm/...`, HTTP 404; Buch- und No-Contact-Boxen sind sichtbar, aber leer.
- **Nach Korrektur:** Gleiche Seite, gleiches URL-Präfix und gleiche Breiten. Beide Masken holen `http://127.0.0.1:18765/UNBOND_manus_2026-11-08/assets/icons/sm/...`, HTTP 200; beide Motive sind sichtbar. `node --check` für das geänderte JS bestanden.
- **Regression:** Alle 42 lokalen HTML-Dateien vor und nach der Änderung mit Playwright im lokalen Chromium, 1280 px, inklusive Scrollen zum Auslösen von Lazy Loading. Jeweils 42 HTTP-200-Seiten, keine lokalen HTTP-Fehler, kein lokal fehlgeschlagenes Bild und keine JS-Seitenfehler in den beim Laden/Scrollen erreichten Zuständen. Externe Dienste wurden für diese Tests blockiert; daraus kann keine Aussage über deren Erreichbarkeit abgeleitet werden.
- **Ergebniszustände zusätzlich:** Je 375 und 1280 px auf `toxikometer.html`, `report.html`, `narzissmus-test.html`, `bindungsmuster-test.html`, `heilungskompass.html` und `tools/spielautomat.html`; beim Narzissmus- und Bindungstest und beim Kompass durch tatsächliche Antworten bis zum Ergebnis, bei ToxiCometer/Report durch synthetische lokale Ergebnisdaten. 12 Fälle mit 52 sichtbaren Masken insgesamt; jede Masken-URL lieferte HTTP 200. Screenshots wurden für Buch- und Kartenbereiche erstellt. Nicht alle sonstigen möglichen interaktiven Zustände und Browser-Engines wurden geprüft.

### Konkrete Screenshots

- Unterverzeichnis, Buch vorher: [Desktop](/home/ubuntu/unbond-work/icon-audit-evidence/unterordner-vorher-ub-buch-1280.png) · [Mobil](/home/ubuntu/unbond-work/icon-audit-evidence/unterordner-vorher-ub-buch-375.png).
- Unterverzeichnis, Buch nachher: [Desktop](/home/ubuntu/unbond-work/icon-audit-evidence/unterordner-nachher-ub-buch-1280.png) · [Mobil](/home/ubuntu/unbond-work/icon-audit-evidence/unterordner-nachher-ub-buch-375.png).
- Unterverzeichnis, No-Contact-Karte vorher: [Desktop](/home/ubuntu/unbond-work/icon-audit-evidence/unterordner-vorher-ub-weiter-1280.png) · [Mobil](/home/ubuntu/unbond-work/icon-audit-evidence/unterordner-vorher-ub-weiter-375.png).
- Unterverzeichnis, No-Contact-Karte nachher: [Desktop](/home/ubuntu/unbond-work/icon-audit-evidence/unterordner-nachher-ub-weiter-1280.png) · [Mobil](/home/ubuntu/unbond-work/icon-audit-evidence/unterordner-nachher-ub-weiter-375.png).
- Bereits vor der Änderung funktionierende lokale Wurzel-Ansicht: [ToxiCometer-Buch](/home/ubuntu/unbond-work/icon-audit-evidence/spot-vorher-ub-buch.png) · [ToxiCometer-Karten](/home/ubuntu/unbond-work/icon-audit-evidence/spot-vorher-ub-weiter.png).
- Beispiel echter Quizdurchlauf: [Narzissmus-Karten nachher](/home/ubuntu/unbond-work/icon-audit-evidence/ergebnis-nachher-narzissmus-test-karten-1280.png).
- Weitere Ergebnis-Screenshots: `/home/ubuntu/unbond-work/icon-audit-evidence/ergebnis-nachher-<seitenname>-{buch,karten}-{375,1280}.png`; maschinenlesbare Ergebnisse `vorher-browser.json`, `nachher-browser.json`, `ergebnis-nachher.json` im selben Ordner. Prüfskripte: `/home/ubuntu/unbond-work/icon-audit-browser.py` und `/home/ubuntu/unbond-work/icon-audit-results.py`.

## Geprüfte HTML-Seiten (42)

- Wurzel: `_test_schrift-index.html`, `bindungsmuster-test-vorher.html`, `bindungsmuster-test.html`, `blick-ins-buch.html`, `datenschutz.html`, `heilungskompass.html`, `impressum.html`, `index.html`, `klarheit-entwurf-a.html`, `klarheit-entwurf-b.html`, `klarheit.html`, `leseprobe-wolf-im-schafskittel.html`, `narzissmus-test-vorher.html`, `narzissmus-test.html`, `report.html`, `toxikometer-vorher.html`, `toxikometer.html`, `wissen.html`.
- Blog: `blog/index.html`, `blog/gaslighting-lesbische-beziehungen.html`, `blog/liebeskummer-neurobiologie.html`, `blog/narzissmus-lesbische-beziehungen-wlw.html`, `blog/narzissmus-weiblich-definition.html`, `blog/queer-breakup-lesbischer-kontext.html`, `blog/toxische-beziehung-unter-frauen-trauma-bonding.html`, `blog/toxische-beziehung-warnsignale-wlw.html`, `blog/trauma-bonding-loesen.html`, `blog/trennungsschmerzen-30-tage-plan.html`, `blog/verdeckter-narzissmus-erkennen.html`.
- Sonstige Unterordner: `no-contact/index.html`, `tools/index.html`, `tools/spielautomat.html`, `tools/phase-1/index.html`, `tools/phase-1/flashback-stopper/index.html`, `tools/phase-2/index.html`, `tools/phase-2/community-mapping/index.html`, `tools/phase-2/klarheitscheck/index.html`, `tools/phase-3/index.html`, `tools/phase-4/index.html`, `tools/phase-4/bindungsmuster-quiz/index.html`, `tools/phase-5/index.html`, `tools/phase-6/index.html`.

## Offen / Empfehlung

Mit ausdrücklicher Freigabe die neun Originaldateien in genau `assets/icons/sm/` auf dem tatsächlichen Webserver bereitstellen; Groß-/Kleinschreibung beibehalten. Anschließend die neun öffentlichen URLs auf HTTP 200 und korrekten Bild-Content-Type prüfen, ToxiCometer und Report mit echten sichtbaren Ergebniszuständen auf Mobil/Desktop ansehen und eventuelle CDN-/Browser-404-Caches berücksichtigen. Falls die Site unter einem URL-Unterverzeichnis deployt wird, auch die beiden geänderten Projektdateien gemeinsam ausrollen und die Spielautomat-Seite unter genau diesem Präfix erneut prüfen. Diese Arbeit hat keinen Upload oder Deployment ausgeführt.
