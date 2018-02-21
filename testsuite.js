/**
 * jest-allure-reporter
 * @author: Pascal Esemann
 * @file: testsuite.js
 * @description: Class for representing a testcase.
 */


 //Getting testsuite-related data from the json-results of the testsuite.
class Testsuite {
    constructor(testSuiteResults, jsonResults) {
      //required Classes
      const testCase = require('./testcase.js');


      this.testSuiteResults = testSuiteResults;
      this.startTime = testSuiteResults.perfStats.start;
      this.stopTime = testSuiteResults.perfStats.end;
      this.name = testSuiteResults.testFilePath.replace(/\//g, '');
      this.testcases = [];
      this.testSuiteResults.testResults.forEach( testcase => {
        this.testcases.push(new testCase(testcase, jsonResults));
      });

    }
    
    //Triggering creation of an XML-resultfile from the testsuites data.
    writeToFileAsAllureInput(){
        const allure = require('./allure.js');
        allure.generateAllureXMLOutput(this);
    }

} 

module.exports = Testsuite;
