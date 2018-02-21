// jest-allure-reporter.js
class JestAllureReporter {
  constructor(globalConfig, options) {

    //Jest Results Data
    this._globalConfig = globalConfig;
    this._options = options;
  }
  

  onRunComplete(contexts, results) {
      //required Classes
      const jestResults = new require('./jest-results.js');
      const testSuite = require('./testsuite.js');
      const allure = new require('./allure.js');

    var testResultsAsJson = jestResults.onRunComplete(contexts, results);
    results.testResults.forEach(suite => {
      var testsuite = new testSuite(suite, testResultsAsJson);
      testsuite.writeToFileAsAllureInput();
    });
    allure.generateReport();
  }
}

module.exports = (results) => {
    reporter = new JestAllureReporter(null, results);
    reporter.onRunComplete(null, results);

    return results;
}