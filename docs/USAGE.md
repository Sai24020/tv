# Användning

Syfte: En kort guide för att köra och felsöka TV‑tablå‑projektet och Cypress‑tester.

Vad som täcks:
- Kort beskrivning av projektet
- Hur man kör tester lokalt (interaktivt och headless)
- Var testfiler och data finns (cypress/e2e, data/)
- Vanliga felsökningstips

Förutsättningar
- Node.js 14 eller senare
- Git
- PowerShell (Windows)

Snabba steg
1. Kör interaktivt (öppnar Cypress Test Runner):

   .\PsCypressOpen.ps1

2. Kör headless (CI / snabb körning):

   .\PSCypressRun.ps1

3. Om tester eller skript misslyckas:

- Kör `npm install` i projektroten
- Kontrollera Node‑version: `node -v`
- Kontrollera att PowerShell‑skripten inte blockerats av policy

Var finns sakerna
- Testerna: cypress/e2e/
- Testdata: data/
- Huvudsida: index.html

Felsökningstips
- Om Cypress inte startar: kör `npm install` och försök igen.
- Om PowerShell rapporterar restriktioner, kör PowerShell som administratör eller ändra `ExecutionPolicy` enligt organisationens riktlinjer.

Feedback
Om något i guiden inte stämmer, meddela vilka kommandon eller vägar som behöver korrigeras så uppdaterar jag filen.
