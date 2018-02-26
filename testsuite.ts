/**
 * jest-allure-reporter
 * @author: Pascal Esemann
 * @file: testsuite.js
 * @description: Class for representing a testcase.
 */


import { Testcase } from "./testcase";
import { Allure } from "./allure";

    //Getting testsuite-related data from the json-results of the testsuite.
export class Testsuite {
    public testSuiteResults: any;
    public startTime: any;
    public stopTime: any;
    public name: any;
    public testcases: any;

    constructor(testSuiteResults: any, jsonResults: any) {
        //required Classes
        //const testCase = require('./testcase.js');


        this.testSuiteResults = testSuiteResults;
        this.startTime = testSuiteResults.perfStats.start;
        this.stopTime = testSuiteResults.perfStats.end;
        this.name = testSuiteResults.testFilePath.replace(/\//g, '');
        this.testcases = [];
        this.testSuiteResults.testResults.forEach((testcase: any) => {
            this.testcases.push(new Testcase(testcase, jsonResults));
        });

    }

    //Triggering creation of an XML-resultfile from the testsuites data.
    writeToFileAsAllureInput() {
        //const allure = require('./allure.js');
        Allure.generateAllureXMLOutput(this);
    }
} 
