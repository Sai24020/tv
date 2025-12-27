## Plan: Sammanfattning och åtgärder

Kort TL;DR — Jag har skannat repot och föreslår fyra konkreta åtgärder:
1) fixa filnamn/variabler och HTML-småfel i `script.js`/`index.html`;
2) göra tidslogik i testhjälpare dynamisk;
3) stabilisera Cypress-tester (ta bort pixelberoenden och fasta waits);
4) köra testsviten och iterera.

Målet är stabila, icke-fragila tester och att appen laddar korrekt data.

### Steps
1. Korrigera appen: uppdatera `script.js` och `index.html` (rätta felaktigt filnamn, deklarera `ANIMATION` med `const`, ta bort extra tecken).
2. Normalisera tidslogik: ändra `cypress/e2e/utils/helpers.js` så datum byggs dynamiskt från dagens datum + `HH:MM` istället för hårdkodat år.
3. Stabilisera tester: ersätt exakta pixelkontroller och `cy.wait(...)` i `cypress/e2e/tvscheduletests.cy.js` och `cypress/e2e/tvschedule-new.cy.js` med klass-/state-assertioner och `cy.intercept`-baserade väntningar.
4. Kör hela testsviten lokalt via `PSCypressRun.ps1` / `PsCypressOpen.ps1`, analysera kvarstående fel, iterera på småändringar och dokumentera de gjorda ändringarna.

### Further Considerations
- Beslut: ändra filnamn i `data/` eller göra koden okänslig för kapitalisering? Rekommendation: ändra koden så den matchar befintliga filnamn.
- Prioritet: börja med `script.js` + HTML-fix för snabb testförbättring, sedan testhjälpare och teststabilisering.
- Vill du att jag gör ändringarna i en branch och skapar en PR, eller föredrar du att jag bara levererar en detaljerad patchplan att du implementerar?
