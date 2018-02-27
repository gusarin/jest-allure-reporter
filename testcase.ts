/**
 * jest-allure-reporter
 * @author: Pascal Esemann
 * @file: testcase.ts
 * @description: Class for representing a testcase.
 */

//Getting testcase-related data from the json-results of the testcase.
export class Testcase {
    public startTime: string;
    public stopTime: string;
    public status: string;
    public fullName: string;
    public title: string;
    public failureMessages: string;
    
    constructor(testcase: any, jsonResults: any) {
        this.startTime = jsonResults.startTime;
        this.stopTime = (parseInt(jsonResults.startTime) + parseInt(testcase.duration)).toString();
        this.status = testcase.status;
        this.fullName = testcase.fullName;
        this.title = testcase.title;
        this.failureMessages = "";
        testcase.failureMessages.forEach((fMsg: any) => {
            this.failureMessages += fMsg;
        });
    }
}

