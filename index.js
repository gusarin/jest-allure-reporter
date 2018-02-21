"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_results_1 = require("./jest_results");
const allure_1 = require("./allure");
const testsuite_1 = require("./testsuite");
class JestAllureReporter {
    onRunComplete(contexts, results) {
        const testResultsAsJson = jest_results_1.JestResults.onRunComplete(contexts, results);
        results.testResults.forEach((suite) => {
            const testsuite = new testsuite_1.TestSuite(suite, testResultsAsJson);
            testsuite.writeToFileAsAllureInput();
        });
        allure_1.Allure.generateReport();
    }
}
//# sourceMappingURL=index.js.map