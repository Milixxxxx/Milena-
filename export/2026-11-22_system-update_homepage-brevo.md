# UNBOND · System-Update 22.11.2026: neue Startseite, Verkaufsseite, Brevo-Formular

Branch: `feature/homepage-und-fixes` · Website-Ordner: `UNBOND_claude_2026-11-22/`
Das Archiv `UNBOND_Gesamtpaket_2026-11-09/` und die Brevo-Automation wurden **nicht** verändert.

---

## 1. Neue Seitenstruktur

| Datei | Rolle | Was sich geändert hat |
|---|---|---|
| `index.html` | **Neue Startseite** im Nothing-Design (Vorlage `wissen.html`) | komplett neu |
| `angebot.html` | Verkaufsseite (bisherige `index.html`) | Inhalt gleich; canonical/og:url auf `angebot.html`, Mary & Sandra als erfundene Figuren gekennzeichnet, Fußzeilen-Link „Startseite“ |
| `blick-ins-buch.html` | Interaktive Leseprobe | aus `testsite_blick-ins-buch-interaktiv_2026-11-20_v2.html` umbenannt, `noindex` entfernt |
| `blick-ins-buch-interaktiv.html` | Weiterleitung → `blick-ins-buch.html` | Auf `main` wurde die Testfassung parallel unter diesem Namen abgelegt. Damit es keinen doppelten Inhalt gibt, leitet der Name jetzt weiter (noindex, Parameter und Anker bleiben erhalten). |
| `send_to_brevo.php` | Brevo-Anmeldung (SOS-Koffer und Haupt-Leadmagnet) | neu im Repo, Grundlage ist die Datei aus dem Upload. Neu: abschaltbarer Double-Opt-in-Modus (Standard **aus**, siehe Abschnitt 3) |
| `no-contact/index.html` | No-Contact-Seite | Formular sendet an `../send_to_brevo.php`; Hintergrundvideo zeigt auf `assets/videos/nocontact.mp4`. Neu: Erwartungszeile unter dem Knopf, Erfolgsmeldung passend zur Antwort der PHP, Link zum Soforttool, „Falsche Adresse? Nochmal eintragen“ |
| `no-contact/bestaetigt.html` | Bestätigungsseite nach dem Klick in der Double-Opt-in-Mail | neu. „Bestätigt. Danke dir.“, Hinweis auf die Mail von UNBOND und den Spam-Ordner, Link zum Soforttool, Krisennummern. `noindex`, steht nicht in der Sitemap |
| `sitemap.xml` | Sitemap | `angebot.html`, Leseprobe „Wolf“ und Impressum ergänzt |

### Aufbau der neuen Startseite
1. Krisenleiste (Telefonseelsorge 0800 111 0 111 · Hilfetelefon 08000 116 016)
2. Kopfzeile: Logo · Wissen · Klarheit · Blog · No Contact · **Zum Buch → angebot.html**
3. Wegweiser „Dein Weg“ (00–04)
4. Hero: „UNBOND – Breaking Chains“ + „Dein Selbsthilfeprogramm nach einer toxischen Beziehung.“ + „Für Frauen, die Frauen lieben.“, Knöpfe „Kostenlos testen“ (→ klarheit.html) und „Zum Buch“ (→ angebot.html)
5. Vier Bereichskarten: Erkennen · Verstehen · Abstand halten · Weitergehen
6. Leseprobe „Erst kostenlos reinlesen“ → `blick-ins-buch.html` (+ Link zur Wolf-Leseprobe)
7. Buchbereich `id="angebot"`: 10 Schritte · 120+ Seiten · 15 Übungen · 29 € (Early Bird bis 31.12.2026) → `angebot.html#angebot`
8. Häufige Fragen (Tests = Selbsteinschätzung, keine Anmeldung, Mary & Sandra erfunden, Krisenhilfe)
9. Standard-Fußzeile und Cookie-Banner wie auf `wissen.html`

Preis und Early-Bird-Hinweis kommen aus `config.js`. Ab 01.01.2027 zeigt die Startseite automatisch 49 €, der Early-Bird-Hinweis verschwindet. Das ist dieselbe Logik wie auf der Verkaufsseite.

---

## 2. Alte Links funktionieren weiter

- **Brevo-Mail 5** verlinkt auf `https://www.unbond.de/index.html#angebot`. Ein Skript im `<head>` der Startseite leitet sofort auf `angebot.html#angebot` weiter. UTM-Parameter bleiben erhalten (lokal getestet: `index.html?utm_source=brevo&utm_campaign=mail5#angebot` → `angebot.html?utm_source=brevo&utm_campaign=mail5#angebot`).
- Das gilt auch für andere alte Anker der früheren Startseite: `#programm`, `#ueber-milena`, `#stimmen`, `#methodik`, `#perspektiven`, `#faq` usw.
- **Mail 3** → `/blick-ins-buch.html#schleife`: Die Datei existiert jetzt, der Anker `id="schleife"` ist vorhanden.
- Seitweit wurden **106 Links in 35 Dateien** umgestellt: `index.html#angebot` → `angebot.html#angebot`, dazu `#programm` und `#ueber-milena`. Relative Pfade (`../`, `../../`, `../../../`) bleiben erhalten. Die Links „← Zur Startseite“ zeigen weiter auf `index.html`, also auf die neue Startseite.

---

## 3. Brevo: wie die Anmeldung jetzt läuft

```
No-Contact-Seite (Formular SOS-Koffer)
   └─ fetch POST ../send_to_brevo.php   JSON: email, profil:"notfallkoffer_sos", quelle:"no_contact_landingpage"
        └─ send_to_brevo.php erkennt SOS → Brevo-Liste 13
           (ohne SOS-Kennung → Liste 12, dann ist ein Vorname Pflicht)
           API-Key: Umgebungsvariable BREVO_API_KEY oder brevo_key.txt EINE EBENE ÜBER public_html
```

- **Begleitserie Klarheit** (Liste #15, Bestätigungsmail #43, Automation #9 = **inaktiv**, Mails Tag 0/2/4/7/10) läuft getrennt über das Brevo-Formular, **nicht** über diese PHP. Daran wurde nichts geändert.

### Double-Opt-in-Modus (neu, Standard: aus)

Oben in `send_to_brevo.php` stehen vier Einstellungen:

| Einstellung | Wert jetzt | Bedeutung |
|---|---|---|
| `BREVO_DOI_TEMPLATE_SOS` | `0` | SOS-Koffer (Liste 13) |
| `BREVO_DOI_TEMPLATE_MAIN` | `0` | Haupt-Leadmagnet (Liste 12) |
| `BREVO_DOI_REDIRECT_SOS` | `https://www.unbond.de/no-contact/bestaetigt.html` | Seite nach dem Bestätigungsklick (SOS) |
| `BREVO_DOI_REDIRECT_MAIN` | `https://www.unbond.de/` | Seite nach dem Bestätigungsklick (Liste 12) |

- **`0` = alles wie bisher.** Die Adresse wird sofort in die Liste eingetragen (Schritte 1–4 in der PHP, Code unverändert).
- **Zahl größer 0 = Double-Opt-in.** Die Zahl ist die ID der DOI-Vorlage in Brevo. Dann passiert Folgendes:
  1. Die PHP fragt Brevo, ob die Adresse schon in der Liste steht und nicht abgemeldet ist. Wenn ja, antwortet sie mit `already_subscribed`, und es geht keine zweite Mail raus.
  2. Sonst ruft sie `POST /v3/contacts/doubleOptinConfirmation` auf. Brevo verschickt die Bestätigungsmail und antwortet mit 201 oder 204. Die PHP meldet dann `doi_pending`.
  3. Erst nach dem Klick auf „Anmeldung bestätigen“ steht die Adresse in der Liste. Danach öffnet sich die Redirect-Seite.
  4. Bei einem Fehler meldet die PHP Status 502 mit `brevo_step: "doi"` und schreibt ins Server-Log.
- Das Formular auf der No-Contact-Seite zeigt je nach Antwort die passende Meldung:

| Antwort der PHP | Meldung auf der Seite |
|---|---|
| `doi_pending` | „Fast geschafft: Wir haben dir eine Mail geschickt. Tipp auf den Knopf „Anmeldung bestätigen“ – erst dann kommt dein SOS-Koffer. …“ |
| `already_subscribed` | „Du bist schon eingetragen. Deine Mails von UNBOND findest du in deinem Postfach.“ (zählt nicht als neuer Lead) |
| sonst (direkt eingetragen) | „Geschafft. Schau in dein Postfach — auch im Spam-Ordner. Dein SOS-Notfallkoffer ist unterwegs.“ |

  In allen drei Fällen folgen darunter „Brauchst du jetzt sofort Halt? → Soforttool gratis“ (Anker `#leadmagnet`) und „Falsche Adresse? Nochmal eintragen“.
- **Einschalten:** DOI-Vorlage in Brevo anlegen (Tag `optin`, Knopf „Double-Opt-in-Link“), die ID in `BREVO_DOI_TEMPLATE_SOS` eintragen und die PHP erneut hochladen. Ausführlich steht das in **`Brevo-DOI-Liste13-Anleitung.md`** (separat geliefert).
- **Voraussetzung:** Der SOS-Koffer muss in Brevo durch „Kontakt zu Liste 13 hinzugefügt“ ausgelöst werden. Dann kommt er mit DOI automatisch erst nach dem Klick.
- `BREVO_DOI_TEMPLATE_MAIN` (Liste 12) vorerst auf `0` lassen. Im Website-Ordner sendet derzeit nur das No-Contact-Formular an diese PHP. Ein Formular für Liste 12 müsste die Meldung `doi_pending` erst noch genauso auswerten.

### Lokal geprüft (PHP 8.2)
- Syntax fehlerfrei
- GET → 405
- ohne API-Key → „Der Brevo-API-Key ist serverseitig nicht hinterlegt.“
- Mit einem nachgebauten Brevo-Server:
  - Bei `0` laufen dieselben Aufrufe wie in der alten Fassung.
  - Mit Vorlagen-ID kommen `doi_pending`, `already_subscribed` und der Fehlerfall (502) korrekt zurück.
- Formular mit Test-Antworten bei 375 px: Alle drei Erfolgsmeldungen, die Fehlermeldung, der Soforttool-Link und „Nochmal eintragen“ funktionieren.
- `bestaetigt.html` bei 375 px ohne Querscrollen, alle internen Links gültig.
- **Nicht** geprüft: die echte Übertragung zu Brevo und der echte DOI-Versand. Dafür braucht es den Server, den API-Key und die aktive Vorlage.

---

## 4. Offene Punkte (To-dos für Milena)

1. **Hochladen:** `index.html`, `angebot.html`, `blick-ins-buch.html`, `send_to_brevo.php`, `sitemap.xml` und die geänderten Unterseiten auf Hostinger übertragen.
2. **brevo_key.txt** muss eine Ebene über `public_html` liegen und nur den Key enthalten. Danach einmal mit einer echten Adresse testen: Kommt der Kontakt in Liste 13 an?
3. **Double-Opt-in für Liste 13 einschalten (DSGVO):** Solange die Einstellung auf `0` steht, trägt die PHP Kontakte weiterhin direkt ein, ohne Bestätigungsmail. Zum Einschalten:
   1. In Brevo eine eigene DOI-Vorlage für den SOS-Koffer anlegen und aktivieren (Tag `optin`, Knopf „Double-Opt-in-Link“, neutraler Betreff).
   2. Die Template-ID in `send_to_brevo.php` bei `BREVO_DOI_TEMPLATE_SOS` eintragen.
   3. Die PHP erneut nach `public_html` hochladen.
   4. Mit einer eigenen Adresse testen.

   Schritt für Schritt steht das in `Brevo-DOI-Liste13-Anleitung.md`. Vorher hochladen: `no-contact/bestaetigt.html`, denn dorthin führt der Bestätigungsklick.
4. Die alte Datei `funnel_send_to_brevo.php` auf dem Server kann bleiben, bis der neue Weg getestet ist. Danach löschen.
5. **Brevo-Automation #9** ist weiterhin inaktiv. Aktivieren erst nach dem Testdurchlauf laut `Brevo_Stand_und_Testcheckliste.md`.
6. **Datenschutzerklärung** aktualisieren: Brevo-Listen 12/13/15 und das Double-Opt-in beschreiben.
7. **Report-Einladung zur Begleitserie:** Sie gibt es nur im Paket vom 09.11., nicht in der aktuellen `report.html`. Bewusst nicht eingebaut.
8. **Unbelegte Zahlen** auf Karten („7 × Versuche“, „2 von 3 Frauen“, „Nur 12 %“): Quelle prüfen oder entfernen.
9. **Tools-Warteliste** auf `wissen.html`: `data-endpoint` ist weiter leer.
10. **noindex-Seiten** (`report.html`, `datenschutz.html`, `tools/…`) stehen bewusst nicht in der Sitemap. Eintragen erst, wenn dort das noindex entfernt ist.
11. `robots.txt`: `Disallow: /danke_core/` wurde **bewusst behalten**. Der Ordner fehlt zwar im Repo, liegt aber vermutlich auf dem Server (Danke-Seite nach dem Kauf).
