/**
 * jest-allure-reporter
 * @author: Pascal Esemann
 * @file: testsuite.ts
 * @description: Class for representing a testcase.
 */

import { Testcase } from "./testcase";
import { Allure } from "./allure";


//Getting testsuite-related data from the json-results of the testsuite.
export class Testsuite {
    public testSuiteResults: any;
    public startTime: String;
    public stopTime: String;
    public name: String;
    public testcases: Testcase[];

    constructor(testSuiteResults: any, jsonResults: any) {
        this.testSuiteResults = testSuiteResults;
        this.startTime = testSuiteResults.perfStats.start;
        this.stopTime = testSuiteResults.perfStats.end;
        this.name = testSuiteResults.testFilePath.split(/(\/|\\)/g).pop();
        this.testcases = [];
        this.testSuiteResults.testResults.forEach((testcase: JSON) => {
            this.testcases.push(new Testcase(testcase, jsonResults));
        });

    }

    //Triggering creation of an XML-resultfile from the testsuites data.
    writeToFileAsAllureInput() {
        Allure.generateAllureXMLOutput(this);
    }
} 
