## CI/CD pipeline

CI pipelinen körs automatiskt när:
En commit pushas till brancherna dev eller feature/ci-cd
En pull request skapas mot main, dev eller feature/ci-cd
Den kan även startas manuellt via Github Actions (workflow_dispatch)

CI flöde:
```yaml
- uses: actions/checkout@v3 Säkerställer att pipelinen hämtar senaste koden från repot.

- uses: actions/setup-node@v3
  with:
    node-version: '18' Installerar Node.js version 18. 
```    

Kör npm ci för att installera alla Node moduler som projektet har.

Kör npm run lint för att kontrollera att koden följer kodstandarder och flaggar/failar pipeline vid fel.

Kör npm run test för att säkerställa att kod fungerar innan den byggs vidare.

Kör npm run build för att testa att projektet byggs utan fel.

När alla steg har körts och lyckas loggas det en bekräftelse att pipelinen är godkänd.




