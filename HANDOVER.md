# Handover für neuen Chat

## Kontext

Projekt: `C:\Users\User\Documents\GitHub\Abschlusspruefungen`

Der Nutzer arbeitet an einer Lern-App mit Aufgaben für verschiedene Schulformen. Wichtig:

- Neue Aufgaben sollen grundsätzlich als einzelne Dateien angelegt werden, nicht als Sammeldateien.
- Aufgaben müssen in `src/content/exercises.tsx` registriert und in `src/content/navigations.tsx` passend einsortiert werden.
- Deutsch mit Umlauten verwenden.
- `€` statt ausgeschriebenem „Euro“ verwenden.
- AV-Aufgaben sollen einfach formuliert sein, mit wechselnden Kontexten und ausreichend Variation der Zahlenwerte.
- Physik-Aufgaben sollen Einheiten in den Rechnungen enthalten.

## Zuletzt erledigt

Die zuvor erzeugten AV-Mathe-Trainingsaufgaben `9608` bis `9665` lagen zunächst in zwei Sammeldateien:

- `src/content/implementations/Mathe_AV_Training/AV_Ergaenzungen_9608_9635.tsx`
- `src/content/implementations/Mathe_AV_Training/AV_Ergaenzungen_9636_9665.tsx`

Diese Sammeldateien wurden entfernt und durch Einzeldateien ersetzt:

- `src/content/implementations/Mathe_AV_Training/9608.tsx`
- ...
- `src/content/implementations/Mathe_AV_Training/9665.tsx`

Außerdem wurde eine kleine gemeinsame Hilfsdatei angelegt:

- `src/content/implementations/Mathe_AV_Training/_avTrainingShared.tsx`

Diese enthält nur kleine Helfer wie `round2`, `pick`, `timeText`, `clock`, `gcd`. Die eigentliche Aufgabenlogik liegt in den einzelnen `96xx.tsx`-Dateien.

`src/content/exercises.tsx` wurde angepasst und importiert `9608` bis `9665` nun einzeln.

## Font-Thema

Der Nutzer meldete, dass die Webseite plötzlich in Times/Serif angezeigt wird. Es wurden in `styles/global.css` robuste Font-Fallbacks ergänzt:

- `body`
- `html`
- `:root`
- Ionic-Elemente wie `ion-app`, `ion-page`, `ion-content`, `ion-tab-bar`, Buttons usw.

Die relevante Regel steht ganz unten in `styles/global.css`.

Trotzdem meldete der Nutzer weiterhin Times. Wahrscheinlich war das nicht primär ein CSS-Fehler, sondern Folge eines kaputten Dev-Server-/`.next`-Zustands.

## Aktueller Fehlerzustand

Der Nutzer meldete anschließend Whitescreen. Screenshots zeigten:

- Browser leer/weiß.
- Network-Requests auf Next-Assets lieferten `500`, z. B.
  - `/_next/static/css/app/layout.css`
  - `/_next/static/css/app/[...all]/page.css`
  - `/_next/static/chunks/app/[...all]/page.js`

Zwischendurch trat im Browser/Server auf:

```text
Cannot find module './948.js'
```

Später nach Dev-Server-Neustart:

```text
Cannot find module './vendor-chunks/@ionic.js'
Require stack:
- .next/server/webpack-runtime.js
- .next/server/app/[...all]/page.js
```

Analyse:

- Der Fehler sitzt sehr wahrscheinlich in einem inkonsistenten Next-Dev-Cache.
- Vorher wurde bei laufendem Dev-Server `npm run build` ausgeführt.
- Dadurch lagen Produktions- und Dev-Artefakte in `.next` durcheinander.
- `.next/server/vendor-chunks` hatte erst nur 2 Dateien, nach Dev-Neustart 124 Dateien.
- `@ionic.js` existierte danach zwar, aber der Dev-Server hing teilweise noch in einem fehlerhaften Zustand.

Wichtig: Das ist sehr wahrscheinlich kein Fehler in den neuen Aufgaben-Dateien selbst. Ein vollständiger Build lief vorher erfolgreich durch.

## Wichtige Prüfungen, die bereits liefen

Erfolgreich:

```bash
npm run lint
npm run build
```

Der vollständige Build war grün:

- compiled successfully
- lint/type check im Build erfolgreich
- static pages wurden erzeugt

Die reine TypeScript-Prüfung mit `tsc --noEmit` kann wegen `tsconfig.json` und `.next/types/**/*.ts` fehlschlagen, wenn `.next/types` fehlt. Das ist ein bekanntes Projektproblem und nicht automatisch relevant für die Aufgabenänderung.

## Aktueller Dev-Server

Der alte Dev-Prozess auf Port `3000` wurde gezielt beendet.

Danach wurde neu gestartet:

```bash
npm run dev
```

Der neue Dev-Server lief unter:

```text
http://localhost:3000
```

Zwischentests:

- `http://localhost:3000/` gab `200`.
- `http://localhost:3000/_next/static/chunks/main-app.js` gab `200`.
- `http://localhost:3000/app` gab zwischenzeitlich `200`, später wieder 404/Fehlerzustand wegen fehlender Error-Komponenten bzw. Dev-Cache.

## Nächster sinnvoller Schritt

Nicht weiter an Aufgaben oder Fonts herumprobieren, bevor der Dev-Cache sauber ist.

Empfohlene Schritte:

1. Dev-Server komplett stoppen.
2. `.next` vollständig löschen.
3. Dev-Server neu starten.
4. `http://localhost:3000/app/start` prüfen.

Falls Löschen per Tool blockiert wird, Nutzer bitten, im Projektordner `.next` manuell zu löschen, oder den Löschbefehl selbst auszuführen:

```powershell
Remove-Item -LiteralPath ".next" -Recurse -Force
```

Danach:

```powershell
npm run dev
```

Wenn danach weiterhin Whitescreen:

1. Browser-Konsole prüfen.
2. Terminalausgabe des Dev-Servers prüfen.
3. `Invoke-WebRequest http://localhost:3000/app/start` testen.
4. Prüfen, ob `src/app/[...all]/page.tsx` noch korrekt dynamisch `AppShell` lädt.
5. Prüfen, ob `src/content/exercises.tsx` alle neuen Einzeldateien importiert.

## Geänderte Dateien im aktuellen Arbeitsstand

Erwartete Änderungen:

- `styles/global.css`
- `src/content/exercises.tsx`
- neue Dateien `src/content/implementations/Mathe_AV_Training/9608.tsx` bis `9665.tsx`
- neue Datei `src/content/implementations/Mathe_AV_Training/_avTrainingShared.tsx`
- gelöschte Sammeldateien:
  - `src/content/implementations/Mathe_AV_Training/AV_Ergaenzungen_9608_9635.tsx`
  - `src/content/implementations/Mathe_AV_Training/AV_Ergaenzungen_9636_9665.tsx`

Zusätzlich waren schon vorher Änderungen an TG11 Physik vorhanden, z. B.:

- `src/content/implementations/Physik_TG11_Training/6000.tsx`
- `src/content/implementations/Physik_TG11_Training/6011.tsx`

Diese nicht ungefragt zurücksetzen.

## Wichtige Warnung

Nicht `git reset --hard` verwenden. Es gibt viele gewollte Änderungen und möglicherweise Nutzeränderungen im Arbeitsbaum.

Wenn ein neuer Chat übernimmt: Erst den Dev-Cache stabilisieren, dann erst weiter an Aufgaben arbeiten.
