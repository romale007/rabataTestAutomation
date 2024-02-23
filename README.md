# rabataTestAutomation

Autotests and framework for rabata.io

## Content:

- [Framework features](#framework-features)
- [Installation](#installation)
- [Starting tests](#starting-tests)

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