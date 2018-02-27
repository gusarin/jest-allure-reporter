/**
 * jest-allure-reporter
 * @author: Pascal Esemann
 * @file: jest_results.ts
 * @description: Getting the jest test-results and converting them to normal json.
 */


import * as hjson from "hjson";

export class JestResults {
    //Entrypoint for getting the json-test-results
    static onRunComplete(contexts: JSON, results: JSON) {
        var testResults = this.getTestResults(results);
        return testResults;
    }

    //Convert original jest-rest-result-format to JSON-Format.
    static getTestResults(results: JSON) {
        return hjson.parse(hjson.stringify(results));
    }
}
