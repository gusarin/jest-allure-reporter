/**
 * jest-allure-reporter
 * @author: Pascal Esemann
 * @file: jest-results.js
 * @description: Getting the jest test-results and converting them to normal json.
 */
class JestResults {
    constructor(globalConfig, options) {
      this._globalConfig = globalConfig;
      this._options = options;
    }
    
    //Entrypoint for getting the json-test-results
    static onRunComplete(contexts, results) {
      var testResults = this.getTestResults(results);
      return testResults;
    }
  
    //Convert original jest-rest-result-format to JSON-Format.
    static getTestResults(results){
      var Hjson=require('hjson');
      return Hjson.parse(Hjson.stringify(results));
    }
  
}

module.exports = JestResults;