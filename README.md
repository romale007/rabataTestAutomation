# rabataTestAutomation

Autotests and framework for rabata.io

## Content:

- [Framework features](#framework-features)
- [Installation](#installation)
- [Starting tests](#starting-tests)
- [Using allure-report](#using-allure-report)


## Framework features

Framework contains:
- Page object classes for rabata.io pages
- Extendable element objects for main controls (Input, Slider) and widgets
- Helpers based on playwright features.


## Installation

Install packages:
```
npm i
```
Install playwright browser:
```
npx playwright install chromium
```

## Starting tests

Headfull (debug mode):
```
npm run test:debug
```

Headless mode:
```
npm run test
```

## Using allure-report
Please insure, that allure environment have been installed already. Please refer allure installation [documentation](https://allurereport.org/docs/gettingstarted-installation/)

- Run tests with allure artifacts generation:
```
npm run test:allure
```

- Set results path into env. variable ALLURE_RESULTS_DIR:  

```
# Mac or Linux
export ALLURE_RESULTS_DIR=my-allure-results  
# Windows
set ALLURE_RESULTS_DIR=my-allure-results 
```  

- Run commands:
```
allure generate my-allure-results -o allure-report --clean
allure open allure-report  
```
