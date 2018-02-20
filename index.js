// jest-allure-reporter.js
class JestAllureReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }
  

  onRunComplete(contexts, results) {
    var testResults = this.getTestResults(results);
    console.log(testResults);
    console.log("Startzeit: " + testResults.startTime);
    console.log('Anzahl erfolgreicher Tests: ' + testResults.numPassedTests);
    testResults.testResults.forEach(element => {
      console.log('Erfolgreich: ' + element.numPassingTests + ' | Fehlgeschlagen: ' + element.numFailingTests +'\n');
      console.log(element.testResults);
    });
    
    var resultsAsXML = this.generateAllureXMLOutput(testResults);
    this.writeXMLToFile(resultsAsXML);
  }


  getTestResults(results){
    var Hjson=require('hjson');
    return Hjson.parse(Hjson.stringify(results));
  }


  generateAllureXMLOutput(results){
    
    
    results.testResults.forEach(suite => {
      var allureXMLString = "";
      allureXMLString += "<?xml version='1.0'?>\n";
      allureXMLString += "<ns2:test-suite xmlns:ns2='urn:model.allure.qatools.yandex.ru' start='" + results.startTime + "' stop='" + results.startTime + "'>\n";
      allureXMLString += "<name>" + suite.testFilePath + "</name>\n";
      allureXMLString += "<title>" + suite.testFilePath + "</title>\n";
      allureXMLString += "<test-cases>\n";
      suite.testResults.forEach(testcase =>{
        allureXMLString += "<test-case start='" + results.startTime + "' status='" + testcase.status + "' stop='" + (parseInt(results.startTime) + parseInt(testcase.duration)).toString() + "'>\n";
        allureXMLString += "<name>" + testcase.fullName + "</name>\n";
        allureXMLString += "<title>" + testcase.title + "</title>\n";
        allureXMLString += "<failure>\n";
        var errorMsg = "";
        testcase.failureMessages.forEach(fMsg => {
            errorMsg += fMsg;
        });

        allureXMLString += "<message>" + errorMsg +"</message>";
        allureXMLString += "<stack-trace>" + errorMsg +"</stack-trace>";
        allureXMLString += "</failure>\n";
        allureXMLString += "</test-case>\n";
      });
      allureXMLString += "</test-cases>\n";
      allureXMLString += "</ns2:test-suite>\n";
      if(suite.testFilePath != 'undefined'){
        this.writeXMLToFile(allureXMLString, suite.testFilePath.replace(/\//g, ''));
      }
      

    });
    this.generateReport();
  } 

  writeXMLToFile(xmlString, name) {

    const save = require('save-file');
    save(xmlString, 'allure-results/' + name + '-testsuite.xml');
  }
  


  generateReport(){
    var allure = require('allure-commandline');
 
    // returns ChildProcess instance
    var generation = allure(['generate', 'allure-results', '--clean']);
  
    generation.on('exit', function(exitCode) {
      console.log('Generation is finished with code:', exitCode);
    });
  }
}



module.exports = (results) => {
    reporter = new JestAllureReporter(null, results);
    reporter.onRunComplete(null, results);

    return results;
}