# UNBOND · Bericht zum Website-System

Stand: 22.11.2026 · Grundlage für einen Assistenten, der an unbond.de weiterarbeitet.

**Wie dieser Bericht zu lesen ist**

- „Geprüft 22.11." heißt: heute in den Dateien nachgesehen.
- „Laut Dokument vom …" heißt: aus einer älteren Unterlage übernommen, heute nicht nachgeprüft.
- „Nicht geprüft" heißt: unbekannt. Bitte nicht raten, sondern nachsehen oder Milena fragen.
- Was live auf unbond.de steht, ist von hier aus nicht sichtbar. Alle Angaben betreffen lokale Dateien.

---

## 1 · Zweck der Website

UNBOND ist ein deutschsprachiges Selbsthilfeprogramm für lesbische und queere Frauen nach toxischen Beziehungen. Selbsthilfe, keine Therapie, keine Krisenhilfe.

Die Website hat drei Aufgaben, in dieser Reihenfolge:

1. **Wiedererkennen auslösen.** Die Besucherin soll denken: „Das bin ich." Dafür gibt es kostenlose Selbsttests, eine interaktive Leseprobe und Blogartikel. Alles ohne Anmeldung.
2. **Zum passenden Angebot führen.** Je nach Thema eines von zwei Produkten (siehe Abschnitt 4).
3. **Den Kauf messbar machen.** Tracking in drei Stufen, Kauf über Digistore24 (ein Zahlungsanbieter).

Leitsatz der Marke: „Ich erkläre dir, warum du sie vermisst, obwohl sie dir wehgetan hat, und wie du aus diesem Kreislauf rauskommst."

**Woher die Besucherinnen kommen:** Instagram (@unbond.her mit Bio-Link `unbond.de/start`, @toxisch.raus mit `unbond.de/test`), ManyChat-Direktnachrichten (Stichwort NO, führt zu `/sos/`), Blog und Pinterest. Die meisten nutzen ein Handy.

**Rahmen:** Milena arbeitet Vollzeit und hat sehr wenig Zeit. Deshalb gilt: keine neuen E-Mail-Strecken, Angebote stehen direkt auf Ergebnis-, Leseproben- und Danke-Seiten.

---

## 2 · Der Weg der Besucherin (Zielführung)

```
Instagram / Pinterest / Blog
        │
        ▼
index.html  (Verkaufsseite, ein Hauptprodukt)
   ├── Kauf-Knopf ───────────────► Digistore-Checkout 695399
   ├── „Blick ins Buch" ─────────► blick-ins-buch.html (interaktive Leseprobe, endet im Kaufbereich)
   └── eine Kachel ──────────────► wissen.html  (Übersicht „Dein Weg")
                                       ├── Erkennen ──► klarheit.html ──► fünf Selbsttests
                                       ├── Abstand ───► no-contact/     ──► Notfallplan 7 €
                                       ├── Verstehen ─► blog/           ──► Angebot nach Thema
                                       ├── Weitergehen► tools/          (noch gesperrt)
                                       └── Zum Buch ──► index.html#angebot
```

**Kette im Bereich Klarheit** (gesteuert aus `unbond-weiter.js`, geprüft 22.11.):
ToxiCometer → Report → Narzissmus-Test → Bindungsmuster-Test → Heilungskompass → Spielautomat → No Contact → Buch (`index.html#angebot`).

Auf jeder dieser Seiten steht oben eine Leiste mit den Tests und unten „Wie geht es weiter?".

**Grundregel für jeden Kaufweg:** Unterseiten verlinken nie direkt in den Checkout, sondern auf die Angebotsseite (`index.html#angebot` oder `no-contact/`). Direkte Checkout-Links gibt es nur auf den Angebotsseiten selbst: `index.html`, `no-contact/index.html` und im Kaufbereich der Leseprobe.

---

## 3 · Die Seiten und ihre Aufgabe

Arbeitsordner (von Milena bestätigt):
`H:\Meine Ablage\Milena_os\unbond-os\02_Landingpage\15-11-26_Unbond_webseite\UNBOND_claude_2026-11-04\`

| Seite | Aufgabe | Führt zu | Tracking-Stufe |
|---|---|---|---|
| `index.html` | Verkaufsseite für das Buch, Video im Hintergrund, eigene Stile | Checkout 695399, Leseprobe, `wissen.html` | voll |
| `wissen.html` | Übersicht „Dein Weg", Verteiler in alle Bereiche | Klarheit, No Contact, Blog, Tools, Buch | voll |
| `klarheit.html` | Auswahl der Selbsttests als Kacheln (Stand 16.11.) | fünf Tests, Leseprobe | zählen |
| `toxikometer.html` | Haupttest, 15 Fragen, 2 Minuten | `report.html` | zählen |
| `report.html` | Ausführliches Ergebnis in fünf Bereichen, ohne E-Mail | nächste Station, Buch | zählen |
| `narzissmus-test.html` | „NarziScore WLW", 20 Fragen | nächste Station | zählen |
| `bindungsmuster-test.html` | 12 Fragen zu Schutzreaktionen | nächste Station | zählen |
| `heilungskompass.html` | 5 Fragen: Wo stehst du gerade? | nächste Station | zählen |
| `tools\spielautomat.html` | Trauma Bonding in 60 Sekunden selbst erleben | nächste Station | zählen |
| `blick-ins-buch.html` | Interaktive Leseprobe in fünf Teilen, endet im Kaufbereich | Checkout 695399 und 716182 | zählen |
| `leseprobe-wolf-im-schafskittel.html` | Ältere Einzel-Leseprobe zu einem Kapitel | `blick-ins-buch.html` | zählen |
| `no-contact\index.html` | Angebotsseite Notfallplan, Formular für den SOS-Koffer | Checkout 716182 | voll |
| `tools\index.html` | Platzhalter „Hier bauen wir gerade für dich", sechs Phasen | derzeit nur Phase 2 | zählen |
| `blog\index.html` und 10 Artikel | Suchmaschinen-Einstieg, erklärt Begriffe | Selbstcheck in der Mitte, ein Angebot am Ende | voll |
| `impressum.html`, `datenschutz.html` | Pflichtseiten | | zählen |

**Fehlt im Arbeitsordner (geprüft 22.11.):** der Ordner `sos\`, `danke.html`, und die Server-Datei `funnel_send_to_brevo.php`, die das Formular auf der No-Contact-Seite aufruft. Laut Dokument vom 13.11. liegt `sos\` im Paket `UNBOND_Gesamtpaket_mit_SOS_2026-11-10.zip`.

**Die interaktive Leseprobe im Einzelnen** (Stand 19.11.):
Teil 1 Nachricht von Sandra mit drei Antworten, Karte mit 3-Satz-Skript · Teil 2 Kreislauf als Ring mit Spielautomat · Teil 3 drei Sätze aufdecken · Teil 4 Kapitel „Der Wolf im Schafskittel" mit drei Bildern, Freundin-Szene und Marys Logbuch · Teil 5 Muster-Check mit acht Aussagen. Ab drei Aussagen zeigt das Ergebnis die passenden Buchschritte, und im Kaufbereich tragen diese Schritte die Marke „Passt zu deiner Auswahl".

---

## 4 · Angebot und Preise

| Produkt | Preis | Digistore-ID | Wo es steht |
|---|---|---|---|
| UNBOND – Breaking Chains, CORE-Edition (das Buch) | 29 € bis 31.12.2026, danach 49 € | 695399 | `index.html`, Kaufbereich der Leseprobe |
| 7-Tage-Notfallplan | 7 € | 716182 | `no-contact\`, kleiner Hinweis in der Leseprobe |
| Bonuskapitel D–F | 19 € | 695410 | nur auf der Danke-Seite nach dem Kauf |
| COMPLETE-Edition | 49 € / später 69 € | 695315 | nicht auf der Verkaufsseite |
| Workbook | 29 € | 715339 | wird nicht beworben |

**Regeln:**

- **Angebot nach Thema** (Entscheidung 27.09.): Akut, No Contact, Trennung führen zum Notfallplan. Erkennen, Trauma Bonding, Narzissmus führen zum Buch.
- **Kauflinks immer ohne Gutschein-Zusatz.** `?voucher=EARLYBIRD` zieht noch einmal 20 € ab, das Buch kostet dann 9 €. Das war am 29.10. live ein Fehler.
- **Preis und Frist stehen an mehreren Stellen:** `config.js` (Feld `earlyBirdUntil`), im Skript der Leseprobe (`UB_OFFER.ebEnd`), in sichtbaren Texten und im Digistore-Checkout. Wer eines ändert, muss alle ändern.
- Kein Bezahlprodukt je „Freebie" nennen.

---

## 5 · Technik

**Bauart:** Reine HTML-, CSS- und JavaScript-Dateien, kein Baukasten, kein Framework. Hosting bei Hostinger, Zielordner `public_html`. Nach dem Hochladen muss dort der Zwischenspeicher (CDN-Cache) geleert werden.

**Gemeinsame Bausteine** (liegen im Arbeitsordner, werden von vielen Seiten geladen):

| Datei | Wofür |
|---|---|
| `config.js` | Preise, Checkout-Adressen, Tracking-Kennungen. Einzige Stelle für diese Werte. |
| `unbond-weiter.js`, `unbond-weiter.css` | Testleiste oben und „Wie geht es weiter?" unten im Bereich Klarheit |
| `unbond-zurueck.js`, `unbond-zurueck.css` | Zurück-Knopf |
| `unbond-footer.css` | Einheitliche Fußzeile |
| `unbond-bereich.css` | Farbe je Bereich |
| `unbond-consent.css` | Cookie-Abfrage |
| `unbond-nothing.css`, `unbond-nothing-skin.css`, `unbond-nothing-poppins.css` | Stil der Unterseiten |
| `report-content.js`, `report-results.js`, `report.js`, `script.js` | Fragen, Auswertung und Texte von ToxiCometer und Report |
| `blog\blog-funnel.js` | Setzt in jeden Artikel den Selbstcheck und genau ein Angebot |

**Versionsnummern:** CSS- und JS-Dateien werden mit `?v=Datum` eingebunden. Nach jeder Änderung an so einer Datei die Nummer in allen Seiten erhöhen, die sie laden. Sonst sehen Besucherinnen bis zu sieben Tage die alte Fassung.

**Tracking in drei Stufen** (Attribut `data-tracking` am `<body>`): `voll` (Verkaufs- und Einstiegsseiten), `zaehlen` (Tests und Leseproben, nur anonyme Zählung), `aus`. Kennungen für Google Analytics, Microsoft Clarity, Meta-Pixel und Pinterest stehen in `config.js`. Testantworten und Ergebnisse dürfen nie an Analytics oder an Brevo gehen.

**E-Mail (Brevo):** Laut Dokument vom 13.11., nicht nachgeprüft.
- SOS-Koffer: Formular auf der No-Contact-Seite, Liste 13. Die nötige Server-Datei fehlt im Arbeitsordner.
- Freiwillige Begleitserie zum Report: fünf Mails, Liste 15, Automation inaktiv. Im Arbeitsordner ist sie in `report.html` nicht eingebaut (geprüft 22.11.).
- Tools-Warteliste auf `wissen.html`: Formular vorhanden, aber nicht angeschlossen (geprüft 22.11.).

---

## 6 · Gestaltung

**Unterseiten:** „Nothing-Design". Hintergrund Schwarz `#000`, Flächen `#0d0d0d`, Linien `#343434`, Text `#e8e8e8` und `#a3a3a3`. Bordeaux `#7d263f` für Knöpfe (Hover `#96334f`), Gold `#d2a63b` nur für Zahlen und kleine Beschriftungen, Salbeigrün `#5e9590` für kostenlose Wege. Flach, ohne Glas-Effekt. Schrift Poppins, lokal eingebunden. Vorlage ist `wissen.html`.

**Ausnahmen (geprüft 22.11.):**
- `index.html` hat eigene Stile mit Hintergrundvideo und wird **nur nach Milenas Freigabe** geändert.
- `blick-ins-buch.html` hat einen eigenen Stilblock direkt in der Datei (`<style id="leseprobe-v3">`), dunkelblau mit Serifenschrift für Zitate. Sie lädt die Nothing-Dateien nicht.

**Immer:** keine Emojis als Schmuck, kein Gelb als Bedienfarbe, kein Text in KI-Bildern. Handy zuerst, nichts darf seitlich überstehen, Tastatur-Fokus sichtbar.

---

## 7 · Regeln für die Arbeit

1. **Bestehende Seite als Basis nehmen und gezielt ändern.** Nie komplett neu schreiben. Eine am 19.09. neu gebaute Verkaufsseite wurde verworfen, weil sie von der Marke abdriftete.
2. **Nichts überschreiben ohne Sicherungskopie** mit Datum im Namen. Nichts hochladen, bevor Milena es sagt.
3. **Inhaltliche Grenzen:** nie „Opfer" für Betroffene, kein Victim-Blaming, keine Ferndiagnose über eine Person, keine Heilversprechen. Mary und Sandra sind erfundene Figuren und werden immer als Beispielgeschichte gekennzeichnet. Keine erfundenen Bewertungen.
4. **Sicherheit:** Bei Hinweisen auf Gewalt auf Fachstellen verweisen. Hilfetelefon 08000 116 016, Telefonseelsorge 0800 111 0 111, Notruf 110. Die Krisenleiste oben auf den Seiten bleibt.
5. **Tests sind Selbsteinschätzung, keine Diagnose.** Dieser Hinweis bleibt auf jeder Testseite.
6. **Sprache mit Milena:** Deutsch, einfach, jeden Fachbegriff erklären, genau eine Aufgabe nennen. Sie hat ADHS und wenig Zeit.
7. **Nach jeder Arbeitseinheit** ein Eintrag in `01_status\logbuch.md`.

Vollständige Regeln: `H:\Meine Ablage\Milena_os\unbond-os\CLAUDE.md`.

---

## 8 · Offene Punkte und Widersprüche

**A · Die Leseprobe liegt nicht mehr im Arbeitsordner (geprüft 22.11.).**
Milena hat die Dateien am 20.11. bewusst an einen anderen Ort gelegt (ihre Auskunft vom 22.11.). **Der aktuelle Website-Ordner ist seit dem 22.11. `D:\Unbond_Webseite\UNBOND_claude_2026-11-22\`**, daneben liegen `Marketing` und `export`. Die Leseprobe heißt dort `testsite_blick-ins-buch-interaktiv_2026-11-20_v2.html`, eine Datei `blick-ins-buch.html` gibt es dort nicht. Im alten Arbeitsordner oben liegt nur noch `testsite_blick-ins-buch-interaktiv_2026-11-20_v2.html`, die früheren Fassungen von `blick-ins-buch.html` liegen in `15-11-26_Unbond_webseite\archiv\`. Im Arbeitsordner verweisen `index.html`, `klarheit.html`, `leseprobe-wolf-im-schafskittel.html`, `unbond-weiter.js` und `sitemap.xml` weiter auf `blick-ins-buch.html`. Vor einem Upload prüfen, dass diese Datei am Ziel wirklich liegt.

**B · Zwei Entwicklungslinien.**
Der Arbeitsordner trägt überwiegend das Dateidatum 07.11. Daneben gibt es Pakete eines anderen Assistenten (Manus) vom 08. bis 13.11. mit einheitlichem Farbsystem, neuer Klarheit-Seite, Report-Begleitserie, SOS-Seite und Entwürfen für ein Glas-Design der Startseite. Im Arbeitsordner findet sich keine Datei mit der Versionsnummer `20261108` dieser Linie (geprüft 22.11.). Ob und was übernommen werden soll, ist nicht entschieden.

**C · Veraltete Statusdateien.**
`01_status\UNBOND_Projektstatus.md` steht auf dem 04.11., `01_status\uebergabe\website.md` auf dem 07.11. Beide nennen als Arbeitsordner noch `UNBOND_upload_komplett_2026-11-04`. Das Logbuch hat zwischen dem 08.11. und dem 14.11. keine Einträge.

**D · Aus dem Projektstatus, Stand nicht nachgeprüft:**
- Kaufmessung: Die Danke-Seite muss in Digistore eingetragen und mit einem Testkauf geprüft werden.
- Die drei Zahlen auf den Karten der Startseite sind als „nicht verifiziert" gekennzeichnet, Quellen fehlen.
- Zugangsdauer zum Buch: Die Leseprobe nennt „24 Monate Zugang", in `config.js` ist das Feld leer und als nicht bestätigt markiert.
- Tools: 4 von 12 geplanten gebaut, Bereich bleibt gesperrt.
- Am 01.01.2027 prüfen, ob Seite und Checkout beide auf 49 € stehen.

**E · In der Leseprobe:** Die Zuordnung der acht Aussagen im Muster-Check zu den Buchschritten hat Milena noch nicht gegengelesen (Logbuch 19.11., Teil 5).

---

## 9 · Wo was liegt

| Was | Pfad |
|---|---|
| Arbeitsordner Website | `…\02_Landingpage\15-11-26_Unbond_webseite\UNBOND_claude_2026-11-04\` |
| Sicherungen dazu | `…\02_Landingpage\15-11-26_Unbond_webseite\archiv\` |
| Vorschau-Server | `…\02_Landingpage\Manus_final_01\.claude\launch.json`, Eintrag `arbeitsordner-claude`, Port 8774 |
| Manus-Pakete und deren Dokumentation | `…\02_Landingpage\Manus_final_01\UNBOND_Gesamtpaket_2026-11-09\` |
| Regeln | `…\unbond-os\CLAUDE.md` |
| Projektstatus | `…\unbond-os\01_status\UNBOND_Projektstatus.md` |
| Logbuch | `…\unbond-os\01_status\logbuch.md` |
| Kurz-Übergabe Website | `…\unbond-os\01_status\uebergabe\website.md` |
| Tools-Konzept | `…\unbond-os\ausgabe\2026-11-03_konzept-tools-integration.md` |
| Ältere Fassungen einzelner Seiten | `…\unbond-os\04_technik\SEITEN_ZENTRAL\00_START_HIER.md` |
| Ergebnisse neuer Arbeit | `…\unbond-os\ausgabe\`, Datum im Namen |

`…` steht für `H:\Meine Ablage\Milena_os`.

**Ältere Ordner, nicht mehr als Basis nehmen:** `Unbond_final`, `Unbond_final_01`, `UNBOND_upload_komplett_2026-11-04`, `UNBOND_manus_vorschlag_2026-11-07`, alles unter `06_archiv` und `04_technik\archiv`.

---

## 10 · Vorhandene Teilberichte

Einen Gesamtbericht gab es bisher nicht. Diese Unterlagen decken Teile ab:

| Datei | Stand | Deckt ab |
|---|---|---|
| `01_status\uebergabe\website.md` | 07.11. | Kurzer Arbeitsstand, veraltet |
| `01_status\UNBOND_Projektstatus.md` | 04.11. | Produkte, Preise, Blocker, Messfehler |
| `…\UNBOND_Komplettpaket_2026-11-09\02_Dokumentation\AKTUELLER_STAND_UND_PRUEFPUNKTE.md` | 09.11. | Manus-Linie: Website und Brevo |
| `…\Manus_final_01\archiv\UNBOND_manus_2026-11-08_komplett\UNBOND_Bericht_2026-11-08.md` | 08.11. | Manus-Linie: Farbsystem, Klarheit-Seite |
| `02_Landingpage\PROMPT_FUER_EXTERNEN_AGENTEN.md` | 13.11. | Nur SOS-Versand und Brevo |
| `02_Landingpage\Übergabeprompt für den neuen UNBOND-Chat.md` | 13.11. | Nur Glas-Design der Startseite |
| `ausgabe\2026-11-19_anleitung-abacus-agenten.md` | 19.11. | Aufteilung in Agenten, kein Seiteninhalt |

---

## 11 · Mitgegebene Dateien (Ordner `ausgabe\export`)

Diese neun Dateien aus `ausgabe` sind aktuell und liegen als Kopie im Ordner `export`:

| Datei | Stand | Wofür | Hinweis |
|---|---|---|---|
| `2026-11-22_bericht-website-system.md` | 22.11. | Dieser Bericht, zuerst lesen | |
| `2026-11-19_anleitung-abacus-agenten.md` | 19.11. | Aufteilung in Hauptagent und vier Unteragenten | Menünamen in Abacus nicht bestätigt |
| `2026-11-19_bildprompts-wolf-kapitel.md` | 19.11. | Stilregeln und Prompts für Bilder von Mary und Sandra | Die drei Bilder sind schon eingebaut, offen ist nur das Tattoo |
| `2026-11-07_designsystem-unbond_v3.zip` | 07.11. | Farben, Schriften, Bausteine der drei Gestaltungswelten | Nennt noch den alten Ordner `UNBOND_upload_komplett_2026-11-04` |
| `2026-11-07_skill-unbond-tool-design.zip` | 07.11. | Gestaltungsvorlage für neue Tools | |
| `2026-11-05_tracking-stufen.md` | 05.11. | Welche Seite was misst | Nennt noch den alten Ordner, die Regeln gelten |
| `2026-11-03_konzept-tools-integration.md` | 04.11. | Plan für den Tools-Bereich, 12 Tools in Stufe 1 | Zählstand der gebauten Tools prüfen |
| `2026-10-31_prompt-webapp-inhalt.md` | 31.10. | Prompt, um die Texte eines Tools zu prüfen | |
| `unbond-webapp-umbau\SKILL.md` | 31.10. | Ablauf, um ein fertig gestaltetes Tool technisch einzubauen | Nennt noch den alten Ordner `Unbond_final_01` |

Alles andere in `ausgabe` ist erledigt, überholt oder gehört zum Bereich Content (Reels, Karussells) und nicht zur Website.
