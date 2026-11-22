# UNBOND-Begleitserie in Brevo einrichten

**Stand vom 09.11.2026:** Die fünf Mails und ihre Workflow-Kopien wurden in Brevo angelegt und um Anrede, Formulierung und Button-Hover ergänzt. Die separate Liste 15, das Formular und die Double-Opt-in-Bestätigung sind eingerichtet; die Nutzerin hat die Anmeldung mit `noreply@unbond.de` bestätigt und alle fünf Testmails erhalten. Die Automation ist weiterhin **inaktiv**; Wartezeiten und Abmeldeschutz sind noch nicht vollständig im Echtablauf getestet. Bereits versendete Testmails ändern sich nicht nachträglich. Die folgenden Einrichtungsschritte sind als Nachschlageanleitung für eine eventuelle spätere Neueinrichtung zu verstehen; sie müssen nicht noch einmal durchgeführt werden.

## Die Dateien

Im Paket findest du fünf separate HTML-Dateien `UNBOND_Begleitserie_01.html` bis `UNBOND_Begleitserie_05.html`. Jede ist eine eigenständige E-Mail. `BETREFFE_UND_ABSTAENDE.md` enthält pro Mail den Betreff, den Vorschautext und die vorgeschlagenen Abstände nach bestätigter Anmeldung. Betreff und Vorschautext werden in Brevo separat eingegeben; der HTML-`title` alleine setzt sie nicht automatisch.

Alle fünf verwenden die Tabellenstruktur, den Bildkopf und den CSS-Stil aus deiner hochgeladenen `Mail2.html`. Die Texte und Buttonziele wurden ausgetauscht, veraltete Profil-/Namensvariablen und Checkoutlinks entfernt und die Fußzeile um Serienhinweis, Absender, Impressum und Datenschutz ergänzt. Das ist gegenüber „nur Text ändern“ eine notwendige kleine Anpassung an Links und Fußzeileninhalt; das Erscheinungsbild und die vorhandenen CSS-Regeln wurden nicht neu gestaltet. Für die Buttons sind ein Inline-Fallback und eine gezielte Hover-/Fokusregel ergänzt; Details stehen in `HINWEISE_KORREKTUR.md`.

Der frühere Platzhalter `{{ unsubscribeLink }}` wurde durch `{{ unsubscribe }}` ersetzt: Dieser wird von Brevo aktuell für HTML-E-Mails dokumentiert. In der Vorschau einer zugestellten Testmail wurde daraus ein Brevo-Abmeldelink. Welche Abmeldung er auslöst und ob sie weitere Automationsmails verhindert, muss mit einem Testkontakt geprüft werden. [1]

## Bevor die Serie eingeschaltet wird

1. **Inhalte und Zielseiten prüfen.** Die Angebotsfrist endet laut Bestätigung der Inhaberin am **31.12.2026**. Auf der öffentlichen Leseprobe stand bei Prüfung am 09.11.2026 noch „Early Bird bis 31.10.“; der Fehler sollte vor Liveversand korrigiert werden. Im lokalen Projektstand der Leseprobe steht bereits „31.12.“; diese lokale Datei ist dadurch nicht automatisch veröffentlicht. Die neue Mailserie selbst enthält keine Preis- oder Fristangaben. Die No-Contact-Seite enthält ebenfalls kostenpflichtige Angebote und teils absolute Formulierungen.
2. **Darstellung ansehen.** Die ursprüngliche Gestaltung und der Mauve-Ruhezustand wurden auf Wunsch beibehalten. Die kleine Fußzeilenschrift und weiße Schrift auf dem Mauve-Button haben einen schwachen Farbkontrast. In der lokalen Prüfung lagen die Werte bei etwa 2,85:1 beziehungsweise 3,52:1. Die neue Hover-/Fokusfarbe erreicht mit Weiß etwa 8,76:1, funktioniert jedoch nicht in allen E-Mail-Clients. Vor echtem Versand ist eine kleine Farbanpassung für bessere Lesbarkeit empfehlenswert; sie ist nicht ungefragt in diesem Paket vorgenommen worden. Browser-Vorschau ersetzt keinen Test in Gmail/Outlook und auf Mobilgeräten.
3. **Absender und Rechtstexte abgleichen.** Die Fußzeile übernimmt die Angaben aus dem UNBOND-Impressum. Prüfe, dass sie zum tatsächlichen Absenderkonto, deiner Datenschutzerklärung und dem konkreten Versand passen. Diese Anleitung ist keine individuelle Rechtsberatung.
4. **Keine bestehenden Kontakte übernehmen.** Die bestehende Liste 9 „Toolsamlung“ ist für einen anderen Zweck und soll nicht automatisch zu dieser Serie angemeldet oder von der neuen Automation erfasst werden.

## Vorgesehener Weg von der Website zur Serie

Der persönliche Report bleibt ohne E-Mail-Adresse erreichbar. Erst auf der Reportseite oder nach einer hilfreichen Reportpassage folgt ein freiwilliger Einladungsblock. Die Serie besteht aus fünf allgemeinen E-Mails mit Impulsen und Hinweisen auf das UNBOND-Buch; sie verwendet keine individuellen ToxiCometer-Antworten oder Profile.

**Vorschlag für den Formulartext:**

> Ja, ich möchte die kostenlose fünfteilige UNBOND-Begleitserie per E-Mail mit hilfreichen Impulsen und Hinweisen auf das UNBOND-Buch erhalten. Ich kann meine Einwilligung jederzeit über den Abmeldelink widerrufen.

E-Mail-Adresse als notwendiges Feld, Vorname freiwillig. Der Sinn dieser Anmeldung muss vor dem Absenden sichtbar sein; keine vorab angekreuzte allgemeine Werbezustimmung. Keine Testantworten, Scores, Diagnosen oder vermutete sexuelle Orientierung in der Liste speichern. Die E-Mails verwenden den Vornamen auch bei Angabe derzeit bewusst nicht, sodass leere Werte keine fehlerhafte Anrede erzeugen.

## Einrichtung in Brevo – Nachschlageanleitung

1. **Eigene Liste anlegen:** z. B. „UNBOND · Begleitserie Klarheit“. Nicht Liste 9 umbenennen oder vorhandene Kontakte importieren. Die neue Liste erhält eine eigene Brevo-ID.
2. **Separates Anmeldeformular erstellen:** in Brevo das Anmeldeformular für diese Serie auswählen oder neu erstellen. Die oben beschriebene Einwilligung und den Datenschutzlink aufnehmen. Als Ziel nur die neue Serienliste festlegen. Vorname optional.
3. **Double-Opt-in einrichten:** eine Bestätigungs-E-Mail mit einem funktionsfähigen Brevo-Bestätigungslink und passendem Zwecktext verwenden. Prüfen, dass erst bestätigte Anmeldungen in die Zielliste für die Automation gelangen. Eine ausgefüllte Anmeldung oder eine bei einem anderen Zweck früher bestätigte Adresse darf nicht stillschweigend als Einwilligung zu dieser Serie gelten. [2]
4. **Erfolgsmeldung setzen:** Nach dem Absenden beispielsweise: „Deine Anmeldung ist eingegangen. Bitte bestätige deine E-Mail-Adresse über den Link in deinem Postfach. Erst danach startet die Begleitserie.“ Dies meldet die Anfrage, nicht schon die erfolgte Bestätigung. Eine getrennte Bestätigungsseite darf nach erfolgreichem Klick die abgeschlossene Anmeldung anzeigen.
5. **Fünf E-Mail-Vorlagen erstellen:** jeweils das zugehörige HTML in Brevos HTML-Editor übernehmen; Betreff und Vorschau aus der Betreffdatei ergänzen. Den vorgeschlagenen Absender prüfen. Das Vorlagenbild wird weiterhin über die in der Ursprungsvorlage vorhandene `img.mailinblue.com`-Adresse eingebunden.
6. **Automation als Entwurf aufbauen:** Auslöser ist die Aufnahme in die neue Liste durch bestätigte Anmeldung, nicht das Absolvieren des Tests und nicht die Liste „Toolsamlung“. Vorschlag ab bestätigter Anmeldung: Mail 1 sofort, Mail 2 an Tag 2, Mail 3 an Tag 4, Mail 4 an Tag 7, Mail 5 an Tag 10. Wird in Brevo zwischen einzelnen Schritten gewartet, sind dies entsprechend 2, 2, 3 und 3 Tage. Prüfen, dass wartende Kontakte nach einer Abmeldung keine weiteren Werbemails bekommen. Das Verhalten bei erneuter Anmeldung und bei bereits im Konto bestehenden Kontakten muss im tatsächlichen Konto getestet werden.
7. **Formular an die Reportseite anbinden:** Erst wenn der vollständige Brevo-Einbettungscode vorliegt, diesen in die Reportseite einbauen bzw. ein gehostetes Formular verlinken. Liste und Listen-ID allein bilden keine funktionierende Anmeldung. Bei einer Iframe-Einbettung eine Bestätigung im Iframe anzeigen lassen; ein automatisch geöffnetes Website-Fenster ohne geprüfte Erfolgsantwort wäre irreführend. Ein lokaler Reportlink in einer E-Mail stellt das individuelle Ergebnis auf einem anderen Gerät oder Browser nicht zuverlässig wieder her.
8. **Erst nach vollständigem Test aktivieren:** einmal mit einer eigenen Testadresse ohne Vorname, einmal mit Vorname; Eingabe ohne Bestätigungs-Klick; erfolgreiche Bestätigung; bereits vorhandener Kontakt; erneute Anmeldung; Abmeldung während einer Wartephase; erfolgreiche Unterdrückung späterer Mails. Alle Links, Absender, Postfachzustellung und die Darstellung in Gmail/Outlook/Mobil prüfen. Nur mit eigenen oder ausdrücklich freigegebenen Testadressen testen. Kein Versand an bestehende Listen.

Bei Formularabgabe und DOI sollten Zeitpunkt, Formularversion, konkreter Einwilligungstext und Bestätigung nachvollziehbar aufbewahrt werden. Die Datenschutzerklärung muss das tatsächliche Formular und Brevo berücksichtigen. [2] [3]

## Was ich übernehmen kann

Wenn der Brevo-Zugang im verbundenen Browser funktioniert, kann Manus die neue Liste, die Formular- und Vorlagenentwürfe sowie die Automation vorbereiten, ohne vorhandene Kontakte umzustellen. Der Nutzer muss gegebenenfalls den Browser für die Anmeldung und Geräteverifizierung kurz selbst bedienen. Passwort und Bestätigungscode müssen nicht im Chat geteilt werden. Änderungen am Hosting und ein produktiver Versand sind nicht allein durch das lokale Dateipaket erfolgt.

## Quellen

[1] Brevo: [Variablen für Links und Abmeldung in E-Mails](https://help.brevo.com/hc/en-us/articles/4402386448530--Manual-Personalize-your-messages-with-dynamic-content-Brevo-Template-Language)

[2] Brevo: [Double-Opt-in und Anmeldenachweise](https://help.brevo.com/hc/en-us/articles/208733449)

[3] BfDI: [Newsletter-Bestellung auf Webseiten](https://www.bfdi.bund.de/DE/Fachthemen/Inhalte/Telemedien/Newsletter.html)
