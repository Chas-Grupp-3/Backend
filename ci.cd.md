## Backend CI/CD pipeline

This is the backend CI pipeline for the Chas Advance project.

CI workflow:
```yaml
name: CI pipeline

on:
  push:
    branches: ["dev", "feature/ci-cd" ]
  pull_request:
    branches: [ "main", "dev", "feature/ci-cd" ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci
      
      - name: Run lint
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build project
        run: npm run build

      - name: Pipeline finished
        run: echo "Pipeline is successful!"

```    
### Pipeline Triggers
    The pipeline runs automatically when:
    A commit is pushed to these branches: dev, feature/ci-cd
    A pull request is created against main, dev or feature/ci-cd
    It can also be triggered manually through Github Actions (workflow_dispatch)

### Steps

#### Checkout:
    Uses actions/checkout@v3 to fetch the latest code from the repository
    so the pipeline works with the current version of the project.

#### Dependencies: 
    Installs version 18 of Node.js
    Runs npm ci to install all Node modules required by the project.

#### Linting:
    Runs npm run lint to check that the code follows coding standards
    and the pipeline fails if any issues occur.

#### Tests:
    Runs npm test to ensure that code works before proceeding to build.

#### Build:
    Runs npm run build to verify that the project can be built without errors.

#### Completion:    
    Once all the steps have successfully run, a confirmation message is logged
    that the pipeline has passed.





