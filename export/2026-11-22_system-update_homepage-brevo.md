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
| `send_to_brevo.php` | Brevo-Anmeldung (SOS-Koffer und Haupt-Leadmagnet) | neu im Repo, Inhalt 1:1 aus dem Upload |
| `no-contact/index.html` | No-Contact-Seite | Formular sendet an `../send_to_brevo.php`; Hintergrundvideo zeigt auf `assets/videos/nocontact.mp4` |
| `sitemap.xml` | Sitemap | `angebot.html`, Leseprobe „Wolf“ und Impressum ergänzt |

### Aufbau der neuen Startseite
1. Krisenleiste (Telefonseelsorge 0800 111 0 111 · Hilfetelefon 08000 116 016)
2. Kopfzeile: Logo · Wissen · Klarheit · Blog · No Contact · **Zum Buch → angebot.html**
3. Wegweiser „Dein Weg“ (00–04)
4. Hero: „UNBOND – Breaking Chains“ + „Dein Selbsthilfeprogramm nach einer toxischen Beziehung.“, Knöpfe „Kostenlos testen“ (→ klarheit.html) und „Zum Buch“ (→ angebot.html)
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
- Lokal geprüft (PHP 8.2):
  - Syntax fehlerfrei
  - GET → 405
  - ohne API-Key → „Der Brevo-API-Key ist serverseitig nicht hinterlegt.“
  - Das Formular schickt die richtige SOS-Payload an `/send_to_brevo.php` und zeigt bei einem Fehler die Fehlermeldung an.
- **Nicht** geprüft: die echte Übertragung zu Brevo. Dafür braucht es den Server und den API-Key.

---

## 4. Offene Punkte (To-dos für Milena)

1. **Hochladen:** `index.html`, `angebot.html`, `blick-ins-buch.html`, `send_to_brevo.php`, `sitemap.xml` und die geänderten Unterseiten auf Hostinger übertragen.
2. **brevo_key.txt** muss eine Ebene über `public_html` liegen und nur den Key enthalten. Danach einmal mit einer echten Adresse testen: Kommt der Kontakt in Liste 13 an?
3. **Double-Opt-in für Liste 13 prüfen:** Die PHP trägt Kontakte direkt per API ein, ohne Bestätigungsmail. Prüfen, ob in Brevo für Liste 13 eine Bestätigung bzw. die Zustellung des SOS-Koffers eingerichtet ist (DSGVO).
4. Die alte Datei `funnel_send_to_brevo.php` auf dem Server kann bleiben, bis der neue Weg getestet ist. Danach löschen.
5. **Brevo-Automation #9** ist weiterhin inaktiv. Aktivieren erst nach dem Testdurchlauf laut `Brevo_Stand_und_Testcheckliste.md`.
6. **Datenschutzerklärung** aktualisieren: Brevo-Listen 12/13/15 und das Double-Opt-in beschreiben.
7. **Report-Einladung zur Begleitserie:** Sie gibt es nur im Paket vom 09.11., nicht in der aktuellen `report.html`. Bewusst nicht eingebaut.
8. **Unbelegte Zahlen** auf Karten („7 × Versuche“, „2 von 3 Frauen“, „Nur 12 %“): Quelle prüfen oder entfernen.
9. **Tools-Warteliste** auf `wissen.html`: `data-endpoint` ist weiter leer.
10. **noindex-Seiten** (`report.html`, `datenschutz.html`, `tools/…`) stehen bewusst nicht in der Sitemap. Eintragen erst, wenn dort das noindex entfernt ist.
11. `robots.txt`: `Disallow: /danke_core/` wurde **bewusst behalten**. Der Ordner fehlt zwar im Repo, liegt aber vermutlich auf dem Server (Danke-Seite nach dem Kauf).
