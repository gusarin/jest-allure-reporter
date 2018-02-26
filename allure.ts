/**
 * jest-allure-reporter
 * @author: Pascal Esemann
 * @file: allure.js
 * @description: Functionality for generating an Allure-Report from given Testsuites and Testcases.
 */

import { Testsuite } from "./testsuite";
import save = require("save-file");
import allure = require("allure-commandline");


export class Allure {
    //Generating an String containing the test-results in an XML-Format which is readable for Allure, and calling a method writing the string to a file. 
    static generateAllureXMLOutput(testsuite: Testsuite) {
        var allureXMLString = "";
        allureXMLString += "<?xml version='1.0'?>\n";
        allureXMLString += "<ns2:test-suite xmlns:ns2='urn:model.allure.qatools.yandex.ru' start='" + testsuite.startTime + "' stop='" + testsuite.stopTime + "'>\n";
        allureXMLString += "<name>" + testsuite.name + "</name>\n";
        allureXMLString += "<title>" + testsuite.name + "</title>\n";
        allureXMLString += "<test-cases>\n";
        testsuite.testcases.forEach((testcase: any) => {
            allureXMLString += "<test-case start='" + testcase.startTime + "' status='" + testcase.status + "' stop='" + testcase.stopTime + "'>\n";
            allureXMLString += "<name>" + testcase.fullName + "</name>\n";
            allureXMLString += "<title>" + testcase.title + "</title>\n";
            allureXMLString += "<failure>\n";
            allureXMLString += "<message>" + testcase.failureMessages + "</message>\n";
            allureXMLString += "<stack-trace>" + testcase.failureMessages + "</stack-trace>\n";
            allureXMLString += "</failure>\n";
            allureXMLString += "</test-case>\n";
        });
        allureXMLString += "</test-cases>\n";
        allureXMLString += "</ns2:test-suite>\n";
        if (!(testsuite.name.includes('undefined'))) {
            this.writeXMLToFile(allureXMLString, testsuite.name);
        }
    }

    //Write the given String to file, as an input for the report generation
    static writeXMLToFile(xmlString: any, name: any) {

        //const save = require('save-file');
        save(xmlString, 'allure-results/' + name + '-testsuite.xml');
    }

    //Generate the Allure-report.
    static generateReport() {
        //var allure = require('allure-commandline');

        // returns ChildProcess instance
        var generation = allure(['generate', 'node_modules/jest-allure-reporter/allure-results', '--clean']);

        generation.on('exit', function (exitCode: any) {
            console.log('Generation is finished with code:', exitCode);
        });
    }
}
