# Icon- und Pfadprüfung

Stand: 9. November 2026. Die Website verwendet für Buch und Weiter-Karten Bildmasken aus `assets/icons/sm/`. Die neun dafür benötigten Originaldateien sind im Ordner `public html/assets/icons/sm/` enthalten. Die vier Icons der Startseite liegen an anderen Pfaden direkt in `assets/`; auch diese Dateien sind vorhanden.

Bei der Prüfung der öffentlichen Website am 09.11.2026 lieferten die neun Adressen unter `/assets/icons/sm/` HTTP 404, während die vier Startseiten-Iconadressen HTTP 200 lieferten. Die öffentliche Seite war zu diesem Zeitpunkt nicht dieselbe Version wie der Projektstand. Ob Dateien im tatsächlichen Hosting fehlten oder ein anderer Umstand dafür verantwortlich war, ist ohne Zugriff auf das Hosting nicht bewiesen.

Ein zusätzliches Pfadproblem bei einer Installation der Website in einem Unterverzeichnis wurde lokal in `unbond-weiter.js` korrigiert. In `tools/spielautomat.html` wurde der Cache-Parameter dieser Datei aktualisiert. Der Fehler und die Korrektur wurden bei 375 und 1280 Pixeln separat reproduziert. Bei sechs lokalen Ergebnisansichten ließen sich die vorhandenen Iconmasken auf Mobil- und Desktopbreite laden.

Nicht veröffentlicht. Nach einem späteren, abgestimmten Live-Update sollten die Iconadressen erneut geprüft und die betroffenen Ergebnisansichten sichtbar getestet werden.
