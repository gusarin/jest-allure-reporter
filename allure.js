class Allure {
    constructor() {
        //required Classes
        this.testSuite = require('./testsuite.js').Testsuite;

    }

    static generateAllureXMLOutput(testsuite){
        var allureXMLString = "";
        allureXMLString += "<?xml version='1.0'?>\n";
        allureXMLString += "<ns2:test-suite xmlns:ns2='urn:model.allure.qatools.yandex.ru' start='" + testsuite.startTime + "' stop='" + testsuite.stopTime + "'>\n";
        allureXMLString += "<name>" + testsuite.name + "</name>\n";
        allureXMLString += "<title>" + testsuite.name + "</title>\n";
        allureXMLString += "<test-cases>\n";
        testsuite.testcases.forEach(testcase =>{
            allureXMLString += "<test-case start='" + testcase.startTime + "' status='" + testcase.status + "' stop='" + testcase.stopTime + "'>\n";
            allureXMLString += "<name>" + testcase.fullName + "</name>\n";
            allureXMLString += "<title>" + testcase.title + "</title>\n";
            allureXMLString += "<failure>\n";    
            allureXMLString += "<message>" + testcase.failureMessages +"</message>\n";
            allureXMLString += "<stack-trace>" + testcase.failureMessages +"</stack-trace>\n";
            allureXMLString += "</failure>\n";
            allureXMLString += "</test-case>\n";
        });
        allureXMLString += "</test-cases>\n";
        allureXMLString += "</ns2:test-suite>\n";
        if(! (testsuite.name.includes('undefined'))){
            this.writeXMLToFile(allureXMLString, testsuite.name);
        }
    }

    static writeXMLToFile(xmlString, name) {

        const save = require('save-file');
        save(xmlString, 'allure-results/' + name + '-testsuite.xml');
    }

    static generateReport(){
        var allure = require('allure-commandline');
     
        // returns ChildProcess instance
        var generation = allure(['generate', 'node_modules/jest-allure-reporter/allure-results', '--clean']);
      
        generation.on('exit', function(exitCode) {
          console.log('Generation is finished with code:', exitCode);
        });
    }
}

module.exports = Allure;