/**
 * jest-allure-reporter
 * @author: Pascal Esemann
 * @file: jest_results.js
 * @description: Getting the jest test-results and converting them to normal json.
 */
export class JestResults {
    //Entrypoint for getting the json-test-results
    static onRunComplete(contexts: any, results: any) {
        var testResults = this.getTestResults(results);
        return testResults;
    }

    //Convert original jest-rest-result-format to JSON-Format.
    static getTestResults(results: any) {
        var Hjson = require('hjson');
        return Hjson.parse(Hjson.stringify(results));
    }
}
