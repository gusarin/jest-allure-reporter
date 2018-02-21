import {JestResults} from "./jest_results";
import {Allure} from "./allure";
import {TestSuite} from "./testsuite";

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
            const testsuite = new TestSuite(suite, testResultsAsJson);
            testsuite.writeToFileAsAllureInput();
        });
        Allure.generateReport();
    }
}

// module.exports = (results) => {
//     reporter = new JestAllureReporter(null, results);
//     reporter.onRunComplete(null, results);
//
//     return results;
// };
