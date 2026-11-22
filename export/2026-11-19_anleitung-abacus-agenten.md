# Abacus · Hauptagent mit Unteragenten für UNBOND
Stand 19.11.2026 · Kurzanleitung

**Vorab, ehrlich:** Eine offizielle Klick-für-Klick-Anleitung von Abacus dazu habe ich nicht gefunden. Gesichert ist:
- In ChatLLM gibt es **Projekte**.
- Mit dem **AI Engineer** baust du eigene Chatbots und Agenten, indem du ihm in normaler Sprache beschreibst, was sie tun sollen.

Nicht gesichert ist, ob ein eigener Agent in Abacus andere eigene Agenten **selbstständig aufrufen** kann. DeepAgent arbeitet intern mit Unteragenten, die kannst du aber nicht selbst festlegen. Die Menünamen unten können deshalb abweichen.

---

## Aufbau

```
Hauptagent „UNBOND Leitung“   ← hier fängst du immer an
├── Website      (unbond.de, HTML/CSS, Landingpages)
├── Content      (Reels, Karussells, Captions, Inventar)
├── Produkte     (Preise, Digistore, Angebotsseiten)
└── Zahlen       (Auswertung Instagram, Funnel)
```

Das sind dieselben vier Bereiche wie in `01_status\uebergabe\`. So passt alles zusammen.

## Schritt 1 · Projekt anlegen
1. Lege in ChatLLM ein neues Projekt **„UNBOND“** an.
2. Lade diese Dateien als Wissensbasis hoch:
   - `CLAUDE.md`
   - `01_status\UNBOND_Projektstatus.md`
   - `files\UNBOND_Regelwerk.md`
   - `02_inhalte\UNBOND_Content_Inventar.csv`
   - die vier Dateien aus `01_status\uebergabe\`
3. **Wenn möglich:** Verbinde stattdessen Google Drive (Ordner `unbond-os`). Dann ist der Stand immer aktuell und du musst nichts nachladen.

## Schritt 2 · Vier Unteragenten bauen (AI Engineer)
Für jeden Bereich einen Agenten, mit diesem Auftrag (Beispiel Website):

> Du bist der Website-Agent von UNBOND. Lies vor jeder Antwort `UNBOND_Projektstatus.md` und `uebergabe/website.md`. Du arbeitest nur an unbond.de: HTML, CSS, Landingpages, Kauflinks. Regeln aus `CLAUDE.md` gelten, besonders: Live-Seite als Basis, nie neu schreiben. Preise auf allen Seiten gleichzeitig ändern. Kauflinks ohne Voucher. Antworte auf Deutsch, in einfacher Sprache, mit genau einer nächsten Aufgabe. Am Ende: Übergabe-Text in höchstens 10 Zeilen für den Hauptagenten.

Für die anderen drei tauschst du jeweils aus:
- den Namen des Bereichs,
- die Übergabe-Datei,
- die Zuständigkeit.

Beim Content-Agenten kommen Faustregel, Doppelschloss und Freigabefelder dazu.

## Schritt 3 · Hauptagent bauen
> Du bist die Leitung von UNBOND. Du erledigst keine Fachaufgaben selbst. Du liest den Projektstatus, nennst den obersten offenen Blocker und entscheidest, welcher Unteragent zuständig ist: Website, Content, Produkte oder Zahlen. Dann schreibst du den fertigen Auftrag für diesen Agenten. Neue Ideen schreibst du in den Ideen-Parkplatz und nennst wieder die eigentliche Aufgabe. Immer nur eine Aufgabe.

## Schritt 4 · So arbeitest du damit
1. Du fragst den **Hauptagenten**: „Was steht heute an?“
2. Er nennt den Blocker und den zuständigen Unteragenten und gibt dir den Auftrag.
3. **Kann Abacus Agenten verketten:** Er gibt den Auftrag selbst weiter.
   **Kann es das nicht:** Du kopierst den Auftrag in den Unteragenten. Das ist eine Kopie, kein Mehraufwand.
4. Der Unteragent liefert und schreibt eine Übergabe.
5. Die Übergabe kommt in `uebergabe\<bereich>.md`, damit alle denselben Stand sehen.

## Regeln, damit es nicht ausufert
- Nicht mehr als diese 5 Agenten.
- Eine Quelle der Wahrheit: der Ordner `unbond-os` auf Google Drive, nicht die Chats.
- Erst 2 Wochen mit Hauptagent + Website-Agent testen, dann die anderen drei bauen.
