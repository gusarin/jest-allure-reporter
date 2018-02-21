/**
 * jest-allure-reporter
 * @author: Pascal Esemann
 * @file: testcase.js
 * @description: Class for representing a testcase.
 */

 //Getting testcase-related data from the json-results of the testcase.
class Testcase {
    constructor(testcase, jsonResults) {
        this.startTime = jsonResults.startTime;
        this.stopTime = (parseInt(jsonResults.startTime) + parseInt(testcase.duration)).toString();
        this.status = testcase.status;
        this.fullName = testcase.fullName;
        this.title = testcase.title;
        this.failureMessages = "";
        testcase.failureMessages.forEach(fMsg => {
            this.failureMessages += fMsg;
        });
    }
}

module.exports = Testcase;