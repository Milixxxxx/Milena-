# Website-Update: ToxiCometer-Report und freiwillige Begleitserie

Dieses Paket aktualisiert die bestehende UNBOND-Website; es ist keine eigenständige Website. Es enthält die bereits vorbereitete ToxiCometer-Ergebnis- und Reportkorrektur einschließlich Laptopbild sowie die neue freiwillige Brevo-Einladung auf dem Report. Die bestehende Testlogik, sonstige Seiten und gemeinsame Styles bleiben im vorhandenen Webverzeichnis.

**Wichtig:** Die Dateien wurden lokal geprüft, aber noch nicht veröffentlicht. Die Brevo-Automation ist inaktiv. Vor einer öffentlichen Freigabe bitte zuerst `START_HIER.md` lesen und die dort beschriebenen Datenschutz-, Test- und Fristfragen klären.

## Einspielen

1. Vorhandene Dateien im Webverzeichnis sichern, besonders `toxikometer.html` und `report.html`.
2. Die Projektdateien aus diesem ZIP im bestehenden Webverzeichnis ablegen. Die HTML-, CSS- und JS-Dateien gehören direkt ins Webverzeichnis; `toxi-frau-am-laptop.png` gehört nach `assets/results/`. Nur im ZIP enthaltene gleichnamige Dateien ersetzen, keine Verzeichnisse löschen.
3. Die Markdown-Anleitungen sind nur zur Information und müssen nicht auf den Webserver geladen werden. Die Website benötigt weiterhin ihre bestehenden Dateien, insbesondere `script.js`, `style.css`, `unbond-nothing-*`, `unbond-weiter.*`, Schriften, Logos und Radar-Dateien.
4. Falls Caching aktiv ist, den Cache der betroffenen Dateien aktualisieren. Dann den Test vollständig durchgehen, den Report öffnen und auf Handy und Desktop prüfen. Anmeldung und tatsächlicher E-Mail-Versand erfordern die separaten Tests in `START_HIER.md`.

## Datenschutz und Umfang

Der ausführliche Report funktioniert ohne E-Mail-Anmeldung. Das Formular wird erst nach einem bewussten Klick von Brevo geladen; dabei werden technische Daten wie die IP-Adresse an Brevo übertragen. In dieser Einbindung werden keine Testantworten, Scorewerte oder Profile als Formularfelder oder URL-Parameter übermittelt; der Referrer ist unterdrückt. Aussagen zu anderen Teilen der Website und zur rechtlichen Einordnung müssen gesondert geprüft werden.
