# Tracking in drei Stufen · unbond.de
Stand 05.11.2026 · umgesetzt im Upload-Ordner `02_Landingpage\UNBOND_upload_komplett_2026-11-04`
Ergänzt `04_technik\TRACKING_UND_MESSUNG.md`, ersetzt sie nicht.

## Grundregel
Jede Seite trägt im `<body>` eine Angabe `data-tracking="…"`. Die Skripte `script.js` (Unterseiten) und `hybrid-sales.js` (Startseite, Spielautomat) lesen sie. Fehlt die Angabe, gilt „zaehlen“. Alles startet weiterhin erst nach Zustimmung im Cookie-Banner.

| Stufe | Was läuft nach Zustimmung | Seiten |
|---|---|---|
| `voll` | GA4, Clarity, Meta-Pixel, Pinterest-Tag | index.html, wissen.html, blog\ (alle 11), no-contact\ |
| `zaehlen` | Nur GA4, ohne Google Signals und ohne Werbepersonalisierung. Kein Clarity, kein Meta, kein Pinterest. Events nur mit erlaubten Angaben (event_category, cta_location, tool, page_type, content_version, traffic_type, utm_*). Testergebnisse, Profile und Fragennummern werden nicht gesendet. | klarheit, toxikometer, narzissmus-test, bindungsmuster-test, heilungskompass, report, tools\spielautomat, tools\index, tools\phase-1 bis 6, impressum, datenschutz, blick-ins-buch |
| `aus` | Nichts | Jede Übung unter tools\phase-X\<übung>\ (Klarheitscheck, Community-Mapping, Flashback-Stopper, Bindungsmuster-Quiz) |

## Warum
- Antworten in Tests und Übungen sind Angaben zu Gesundheit und sexueller Orientierung (DSGVO Art. 9). Clarity zeichnet Klicks auf, Werbepixel melden das Thema der Seite an Meta und Pinterest.
- Für den Verkauf reicht auf diesen Seiten das Zählen: Aufruf, Test gestartet, Test beendet, Angebot geklickt.

## IDs (zentral)
- GA4 `G-QWHMYTHDDS`, Clarity `x60dqjcnxu` (in script.js und config.js)
- Meta-Pixel `1006203895535173`, Pinterest-Tag `2612878748458`: in config.js für die Startseite; script.js setzt sie für alle Unterseiten, auch wo auf der Seite noch ein Platzhalter steht.
- Pinterest-Verifizierung `0d30089f0beffef244c180710d88afe5` im Kopf von index.html.

## Neue Seite anlegen
1. `data-tracking="voll"`, `"zaehlen"` oder `"aus"` in den `<body>` schreiben.
2. Übungen und Tools immer `aus`.
3. Nach Änderungen an script.js oder hybrid-sales.js `?v=` in allen Seiten erhöhen.

## Getestet (05.11.2026, lokal)
- Mit Zustimmung: voll lädt alle vier Dienste, zaehlen nur GA4, aus nichts.
- Ohne Zustimmung: auf allen geprüften Seiten kein fremdes Messskript.
- Auf zaehlen-Seiten wird `event_label` (zum Beispiel das Report-Profil) entfernt.

## Offen
- Erledigt 05.11.2026: Datenschutzerklärung Abschnitt 6.4 mit der Stufentabelle, Abschnitte 3, 6.2, 6.3, 8, 14 bis 16 und 18 angepasst. Rechtliche Prüfung offen.
