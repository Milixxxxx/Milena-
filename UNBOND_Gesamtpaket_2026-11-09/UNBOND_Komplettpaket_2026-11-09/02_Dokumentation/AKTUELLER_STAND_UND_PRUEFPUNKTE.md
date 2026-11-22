# UNBOND · aktueller lokaler Stand und Prüfpunkte

**Sicherungsstand: 9. November 2026.** Das Paket setzt sich aus dem von dir hochgeladenen Komplettprojekt, allen dazu später erstellten lokalen Änderungen und der gesondert korrigierten `index.html` zusammen. Es ist kein Abbild des tatsächlichen Hostinger-Servers.

## Website

- **Startseite:** Die drei Kartenrückseiten entsprechen wieder der hochgeladenen älteren Vorlage; die Zahlenblöcke sind nicht versteckt. Der Wissensbutton besitzt den später ergänzten Hover- und Tastaturfokuszustand.
- **Klarheit:** Gestaltungsrichtung A „Frage zuerst“, mit Auswahllinks zu den Tests.
- **Tests:** Dynamische Diagramme während der Fragen bei ToxiCometer, Narzissmus- und Bindungsmuster-Test. Bei engen mobilen Platzverhältnissen bleibt die Bedienbarkeit vorrangig; die Diagrammkarte kann im Seitenfluss statt dauerhaft angeheftet erscheinen.
- **ToxiCometer-Ergebnis:** Eine rechtsbündige Kurzfassung mit höchstens drei Sätzen, lesbarer Bildhintergrund und direkter Reportlink. Im lokalen Projekt wurde auch der Nullfall korrigiert. Der Report bleibt ohne E-Mail-Anmeldung erreichbar und berücksichtigt im selben Browser gespeicherte Antworten.
- **Report:** Ausführliche Inhalte, fünf Bereiche und eine freiwillige Einladung zur fünfteiligen Brevo-Serie. Das Formular wird erst auf Wunsch über Brevo geladen; technische Daten wie die IP-Adresse können dabei übertragen werden. Die Einbindung übergibt laut lokalem Test weder Testergebnisse noch Score als Formularfelder oder URL-Parameter.
- **Icons:** Die neun benötigten Originaldateien in `assets/icons/sm/` sind enthalten. Die Unterverzeichnis-Auflösung für den Spielautomaten wurde lokal korrigiert. Bei der letzten Live-Prüfung am 09.11.2026 lieferten die entsprechenden öffentlichen Adressen noch HTTP 404; die Ursache im Hosting oder Cache wurde nicht nachgewiesen.
- **Medien:** Die im Originalprojekt enthaltenen Videos und Personen-Videos, Poster, Transkripte und lokalen Schriftdateien sind enthalten. `assets/narcissist-grandios.png` fehlt bereits im gelieferten Original und wird dynamisch als Hintergrund referenziert; das betreffende Hintergrundelement ist in der aktuellen Gestaltung ausgeblendet. Falls es wieder aktiviert wird, muss das fehlende Bild ergänzt oder die Referenz angepasst werden.
- **Weitere Dienste:** Die Ortssuche verwendet externe Karten-/Ortssuchdienste. Die Tools-Warteliste auf `wissen.html` ist nicht angeschlossen und zeigt eine entsprechende Meldung; ihre Liste #9 ist nicht mit der Reportserie gleichzusetzen.

## Brevo und E-Mails

- Eigenständige Vorlagen: **#29–33**. Workflow-Kopien: **#34, #35, #36, #41, #42**. Der gespeicherte HTML-Code beider Gruppen wurde für dieses Paket am 09.11.2026 schreibgeschützt aus Brevo ausgelesen. Die sichtbaren Texte und Links stimmen mit den fünf lokalen Mailvorlagen überein; die HTML-Formatierung kann abweichen.
- Double-Opt-in-Bestätigung: Vorlage **#43**, Betreff „Bitte bestätige deine UNBOND-Begleitserie“, Absendername „Milena von UNBOND“, Absenderadresse `milena@unbond.de`, Vorschautext „Ein Klick – dann kann es losgehen.“ Der HTML-Quelltext inklusive `{{ doubleoptin }}` liegt im Mailordner. Dieser Platzhalter wird erst beim Versand durch Brevo ersetzt.
- Separate Serienliste **#15**; die bestehende Liste **#9 „Toolsamlung“** bleibt getrennt. Automation **#9** enthält laut letztem dokumentiertem Stand die fünf Mails an Tag 0, 2, 4, 7 und 10 und ist **inaktiv**. Das Brevo-Formular hat ein E-Mail-Pflichtfeld, einen freiwilligen Vornamen und eine zweckgebundene Einwilligung.
- Die Bestätigung und ein Listeneintritt wurden mit `noreply@unbond.de` getestet. Alle fünf früheren Mailfassungen wurden als Test zugestellt; nach der späteren Anrede- und Hoverkorrektur wurde Mail 1 noch einmal getestet, Mails 2–5 nicht erneut. Die Korrektur ist in den gespeicherten HTML-Fassungen vorhanden.
- Eine automatische Wiederherstellung der Listen, Kontakte, Einwilligungen und Automation aus diesem ZIP ist **nicht** enthalten. Die Einstellungen liegen in Brevo; für eine vollständige Kontosicherung ist ein gesonderter Export bzw. Kontoabgleich erforderlich.

## Vor einer Veröffentlichung oder Aktivierung

1. Das tatsächliche Hostinger-Webverzeichnis separat sichern und abgleichen. Das Paket enthält nicht den Quelltext des verwendeten Endpunkts `funnel_send_to_brevo.php`; seine öffentliche Adresse antwortete auf eine reine GET-Anfrage mit HTTP 405 und „Nur POST-Anfragen sind erlaubt“. Das beweist nicht, dass ein POST erfolgreich ist. Bestehende serverseitige Dateien, Geheimnisse und Konfigurationen weder löschen noch ungeprüft überschreiben.
2. Vor einer Veröffentlichung Datenschutzinformation, genaue Einwilligung und die Verarbeitung bei Brevo fachlich prüfen. Testen, dass nach Widerruf keine weiteren Serienmails versendet werden. Realen Listentrigger und Wartezeiten, vorhandenen Kontakt, Double-Opt-in, Abmeldelink und Darstellung in Mailclients kontrollieren. Die Brevo-Testfunktion allein überspringt Wartezeiten und andere Aktionen.
3. Angaben „7 × Versuche“, „2 von 3 Frauen“ und „Nur 12 %“ auf den ausdrücklich wiederhergestellten Karten sind im Ausgangstext selbst als nicht verifiziert gekennzeichnet. Quellen und Formulierungen vor öffentlicher Verwendung überprüfen.
4. Die bestätigte Angebotsfrist ist **31.12.2026**; sie steht im lokalen Startseiten-/Leseprobenstand und in `config.js`. Die Live-Leseprobe zeigte bei der früheren Prüfung noch 31.10.; Live-Seite und Checkout müssen abgeglichen werden.
5. Erst nach Abgleich und Backup Website aktualisieren und auf Mobil/Desktop nochmals prüfen. Die Brevo-Automation erst nach separater Freigabe aktivieren. Niemand wurde durch das Erstellen dieses ZIP neu angeschrieben.

## Prüfgrenzen

Die Startseite aus diesem Gesamtpaket wurde bei 375 und 1280 Pixeln mit allen drei Kartenrückseiten und ihren Zahlenblöcken geprüft; der Wissensbutton-Hover zusätzlich am Desktop. Im selben Paket wurde der Weg Klarheit → ToxiCometer mit 15 tatsächlichen Klickantworten bis zum Report bei beiden Breiten geprüft. Weitere Icon-, Tastatur- und Responsivprüfungen wurden zuvor lokal durchgeführt; sie ersetzen keinen vollständigen Produktionstest. Keine klinische Validierung oder Rechtsprüfung ist damit verbunden.
