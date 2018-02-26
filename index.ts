import { JestResults } from "./jest_results";
import { Allure } from "./allure";
import { Testsuite } from "./testsuite";

/**
 * jest-allure-reporter
 * @author: Pascal Esemann
 * @file: index.js
 * @description: Entrypoint for the reporter.
 */
class JestAllureReporter {

    //Method is getting called after the tests ran.
    onRunComplete(contexts: any, results: any) {
        //required Classes


        const testResultsAsJson = JestResults.onRunComplete(contexts, results);
        results.testResults.forEach((suite: any) => {
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
