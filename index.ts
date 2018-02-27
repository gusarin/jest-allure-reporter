/**
 * jest-allure-reporter
 * @author: Pascal Esemann
 * @file: index.ts
 * @description: Entrypoint for the reporter.
 */

import { JestResults } from "./jest_results";
import { Allure } from "./allure";
import { Testsuite } from "./testsuite";


class JestAllureReporter {

    //Method is getting called after the tests ran.
    onRunComplete(contexts: any, results: any) {
        //remove old Results
        Allure.removeOldResults();


        const testResultsAsJson = JestResults.onRunComplete(contexts, results);
        results.testResults.forEach((suite: JSON) => {
            const testsuite = new Testsuite(suite, testResultsAsJson);
            testsuite.writeToFileAsAllureInput();
        });
        Allure.generateReport();
    }
}

module.exports = (results: any) => {
    const reporter = new JestAllureReporter();
    reporter.onRunComplete(null, results);

    return results;
};
