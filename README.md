Schwindeltagebuch 2.1.4 – Arztbericht-Tabelle aus 2.1.3 und optionaler Pulsimport.

Alle neun Dateien ins Repository-Hauptverzeichnis hochladen. Zuerst in der App JSON-Sicherung erstellen; App nicht löschen.

Der iPhone-Kurzbefehl muss pro Blutdruckmessung optional einen Pulswert mitgeben:
[{"timestamp":"2026-11-17T08:33:16+01:00","systolic":109,"diastolic":72,"pulse":68}]

Erlaubte Feldnamen für den Puls: pulse, heartRate, heart_rate oder puls. Ohne Puls funktioniert der bisherige Import unverändert. Ein erneuter Import ergänzt bisher fehlende Pulswerte bei identischem Zeitstempel und Blutdruck.

Wichtig: Nur den Puls der passenden OMRON-Messung zuordnen, keine beliebige Apple-Watch-Herzfrequenz. Der Kurzbefehl muss dafür separat erweitert werden.
