## Backend CD pipeline

This is the backend CD pipeline for the Chas Advance project.
It automatically deploys the backend to the Azure Web App Service
whenever changes are pushed to the dev branch.

CD workflow:
```yaml
name: Deploy Node.js App

on:
  push:
    branches:
      - dev

jobs:
  deploy-dev:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build TypeScript
        run: npm run build

      - name: Deploy to Azure Dev App Service
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'team3'
          publish-profile: ${{ secrets.AZURE_DEV_PUBLISH_PROFILE }}
          package: .

```

### Pipeline Triggers
    The CD pipeline runs automatically when:
    A commit is pushed to the dev branch.
    Deployment can also be triggered manuallay through Github Actions.

### Steps

#### Checkout:
    Uses actions/checkout@v3 to fetch the latest code from the repository
    so that the deployment is based on the current version of the project.

#### Dependencies: 
    Runs npm install to install all Node modules required by the project.

#### Build Project:
    Runs npm build to compile TypeScript files into JavaScript and verify that
    the project builds successfully before deployment.

#### Deploy to Azure:
    Uses azure/webapps-deploy@v2 to push the built project to the Azure Web App Service.
    The deployment is authenticated using the AZURE_DEV_PUBLISH_PROFILE secret stored in Github.
    After this step, the latest backend version is live on the development web app.

#### Completion:    
    Once all steps complete successfully, the backend is automatically deployed and ready to be tested.