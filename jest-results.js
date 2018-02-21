// jest-allure-reporter.js
class JestResults {
    constructor(globalConfig, options) {
      this._globalConfig = globalConfig;
      this._options = options;
    }
    
  
    static onRunComplete(contexts, results) {
      var testResults = this.getTestResults(results);
      return testResults;
    }
  
  
    static getTestResults(results){
      var Hjson=require('hjson');
      return Hjson.parse(Hjson.stringify(results));
    }
  
}

module.exports = JestResults;