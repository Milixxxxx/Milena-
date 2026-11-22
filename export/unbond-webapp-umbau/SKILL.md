---
name: unbond-webapp-umbau
description: Baut eine fertig gestaltete HTML-Webapp (zum Beispiel aus Stitch) technisch so um, dass sie auf unbond.de im Ordner tools läuft. Das Design bleibt unverändert. Nutzen, wenn eine Übung oder ein Tool für UNBOND eingebaut, produktionsreif gemacht oder von externen Diensten gelöst werden soll, etwa bei "bau dieses Tool um" oder "mach die Webapp fertig für die Tools-Seite". Nicht für neue Designs und nicht für die inhaltliche Überarbeitung.
---

# UNBOND Webapp-Umbau

Du machst aus einem Design-Entwurf eine Webapp, die sicher, datensparsam und dauerhaft auf unbond.de läuft. **Das Aussehen bleibt gleich:** Farben, Schriften, Abstände, Layout, Animationen und Ablauf übernimmst du aus der Vorlage.

## Eingaben

Frag nach, was fehlt, und rate nicht:
1. Die HTML-Datei der Vorlage
2. Phase (1 bis 6) und Kurzname, zum Beispiel `flashback-stopper`
3. Zugang: `frei` oder `gesperrt`
4. Optional die freigegebene Textfassung. Fehlt sie, bleiben die Texte unverändert und du vermerkst das im Bericht.

## Ablage

`Unbond_final_01\tools\phase-<N>\<kurzname>\` mit `index.html`, `app.css`, `app.js` und `assets\`. Alle Pfade relativ. Solange das Tool nicht freigegeben ist: `<meta name="robots" content="noindex, nofollow">` und kein Eintrag in der Sitemap. Bestehende Dateien nie ohne Rückfrage überschreiben.

## Grenzen

- Keine Änderung am Design. Wirkt etwas falsch, meldest du es, statt es zu ändern.
- Texte nur austauschen, wenn eine freigegebene Fassung vorliegt.
- Keine KI-Funktionen, keine Anmeldung, keine Bezahlfunktion, keine Bewerbung des Buchs innerhalb der Übung.
- `index.html` der Startseite und andere Seiten nicht anfassen. Nichts hochladen.

## Schritte

### 1. Bestand aufnehmen
Liste auf: alle externen Adressen, Schriften, Icons, Bilder, Skripte, Inline-Handler, toten Links und die Klassen, die keine Wirkung haben. Lege die Liste dem Bericht bei.

### 2. Von fremden Servern lösen
Am Ende darf die Seite nur Dateien von der eigenen Domain laden.
- **Tailwind:** CDN entfernen. Übernimm die Konfiguration aus der Vorlage unverändert und erzeuge mit der Tailwind-Kommandozeile eine statische `app.css`, die nur genutzte Klassen enthält. Ohne Tailwind-Kommandozeile: die wirksamen Regeln von Hand in `app.css` schreiben.
- **Schriften:** Dieselben Schriften als `woff2` lokal in `assets\` einbinden, mit `font-display: swap`. Keine Google Fonts.
- **Icons:** Icon-Schriften durch eingebettete SVG-Symbole in gleicher Größe und Farbe ersetzen.
- **Bilder:** Fremd gehostete Bilder herunterladen, als WebP in `assets\` speichern, mit `width`, `height` und passendem `alt`. Das UNBOND-Logo durch `assets/logo.png` der Website ersetzen. Ist die Herkunft eines Bildes unklar, im Bericht melden.

### 3. Funktion reparieren
- Inline-Handler wie `onclick` nach `app.js` verlegen, mit `addEventListener`
- Klassen ohne Wirkung und widersprüchliche Anzeige-Klassen so korrigieren, dass das sichtbare Ergebnis der Vorlage entspricht
- Tote Links ersetzen oder entfernen. Impressum und Datenschutz zeigen auf die echten Seiten.
- Nutzereingaben nie per `innerHTML` ausgeben, nur per `textContent`
- Kein Weiterkommen darf von einer Texteingabe abhängen. Jeder Schritt lässt sich überspringen.

### 4. Zugänglichkeit
- Alles Klickbare ist ein `button` oder `a`, per Tastatur bedienbar, mit sichtbarem Fokus
- Tippflächen mindestens 44 × 44 Pixel
- Dialoge: Fokus wandert hinein und bleibt dort, Escape schließt, danach zurück zum Auslöser. `role="dialog"`, `aria-modal="true"`
- Schrittwechsel werden über einen `aria-live`-Bereich angesagt
- `prefers-reduced-motion`: Pulsieren, Atmen und Blinken aus
- Keine Überläufe von 320 bis 1440 Pixel Breite

### 5. Daten und Messung
- Eingaben verlassen nie das Gerät. Kein Versand, keine Weitergabe an Analyse-Dienste.
- Speichert das Tool etwas, dann nur in `localStorage`, mit `try/catch`, sichtbarem Hinweis und einem Knopf „Alles löschen“. Das Tool muss auch ohne Speicher funktionieren.
- Sichtbarer Satz: „Deine Eingaben bleiben auf deinem Gerät.“ Wird nichts gespeichert: „Deine Eingaben werden nicht gespeichert.“
- Messung nur über die vorhandene Einwilligung der Website (`script.js`). Erlaubt sind nur die Ereignisse „gestartet“ und „abgeschlossen“, nie Inhalte.

### 6. Pflichtbausteine im Stil der Vorlage
- **Notfallkontakte** auf jedem Bildschirm mit einem Tipp erreichbar, als `tel:`-Links: Notruf 110, Rettungsdienst 112, Telefonseelsorge 0800 111 0 111, Hilfetelefon Gewalt gegen Frauen 08000 116 016
- **Hinweis:** „Selbsthilfe, kein Ersatz für Therapie oder Krisenhilfe.“
- **Abschnitt „Über diese Übung“** am Seitenende mit: Wann sie hilft, Wann lieber nicht, Dauer, Grundlage, Quellen, Buchbezug, Stand der Prüfung, Version
- Dieselben Angaben als JSON in `<script type="application/json" id="tool-meta">`, zusätzlich mit `phase` und `zugang`. Unbekannte Werte bleiben `null`. Nichts erfinden.

### 7. Prüfen
Öffne das Tool im Browser und belege jeden Punkt:
- [ ] Netzwerk zeigt keine fremde Domain
- [ ] Konsole ohne Fehler
- [ ] Ablauf von Anfang bis Ende per Maus und per Tastatur durchgespielt
- [ ] Notfallkontakte in jedem Schritt erreichbar, alle vier Nummern stimmen
- [ ] Bei 320, 375, 768 und 1440 Pixeln kein Überlauf
- [ ] Vergleich mit der Vorlage: Farben, Schriften und Layout gleich
- [ ] `prefers-reduced-motion` getestet
- [ ] Kein Link ohne Ziel, kein Gutschein-Parameter

## Bericht

Sag in einfacher Sprache und auf Deutsch: was geändert wurde, was geprüft wurde, was nicht geprüft werden konnte, welche Metadaten fehlen, wo die Dateien liegen. Benenne jede sichtbare Abweichung von der Vorlage. Schreibe den Logbuch-Eintrag in `01_status\logbuch.md`.
