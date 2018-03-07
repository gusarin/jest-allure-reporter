# jest-allure-reporter

This Project brings an jest-reporter for getting an allure-Report from the jest test results.
> A Jest Allure Reporter, which takes the test-results from jest and creates an allure-report from it.

## What's jest?
[Jest](https://facebook.github.io/jest/) is a javascript testing framework, for testing javascript code, including ui-tests. 

## What's allure?
[Allure](http://allure.qatools.ru/) is a tool for creating an helpfull report of testresults.

## What's the jest-allure-reporter?
The jest-allure-reporter connects the jest-tests with the allure-report as both tools doesn't support each other directly. The jest-allure-reporter takes the test-results from jest and creates an allure-report automatically.

## Installation/ Configuration
Installation is relatively simple.
In your jest-project add the following to the dependencies section of the package.json:
```json
"dependencies": {
    "jest-allure-reporter": "^1.2.1"
}
```
Additionally configure the jest-allure-reporter as the test-reporter used by jest by adding the following to your jest.config.ts:
```typescript
testResultsProcessor: "jest-allure-reporter"
```
After editing of the two files install by running ``` npm update ``` on the commandline:
```
npm update
```