/**
 * jest-allure-reporter
 * @author: Pascal Esemann
 * @file: allure.ts
 * @description: Functionality for generating an Allure-Report from given Testsuites and Testcases.
 */

import { Testsuite } from "./testsuite";
import { Testcase } from "./testcase";
import save = require("save-file");
import allure = require("allure-commandline");
// FIXME imports
import fs = require('fs-extra');
import rp = require('rootpath');
import { escapeXml } from "./xmlescape";
import strip_ansi = require("strip-ansi");


export class Allure {
    // TODO solve via template
    //Generating an String containing the test-results in an XML-Format which is readable for Allure, and calling a method writing the string to a file. 
    static generateAllureXMLOutput(testsuite: Testsuite) {
        var allureXMLString = "";
        allureXMLString += "<?xml version='1.0'?>\n";
        allureXMLString += "<ns2:test-suite xmlns:ns2='urn:model.allure.qatools.yandex.ru' start='" + testsuite.startTime + "' stop='" + testsuite.stopTime + "'>\n";
        allureXMLString += "<name>" + testsuite.name + "</name>\n";
        allureXMLString += "<title>" + testsuite.name + "</title>\n";
        allureXMLString += "<test-cases>\n";
        testsuite.testcases.forEach((testcase: Testcase) => {
            allureXMLString += "<test-case start='" + testcase.startTime + "' status='" + testcase.status + "' stop='" + testcase.stopTime + "'>\n";
            allureXMLString += "<name>" + testcase.fullName + "</name>\n";
            allureXMLString += "<title>" + testcase.title + "</title>\n";
            allureXMLString += "<failure>\n";
            const messages = testcase.failureMessages ? testcase.failureMessages.split("\n").map((line) => {
                var esc: string = strip_ansi(line);
                esc = escapeXml(esc, '');
                return esc;
            }) : [];

            allureXMLString += "<message>" + messages.join("\n") + "</message>\n";
            allureXMLString += "<stack-trace>" + messages.join("\n") + "</stack-trace>\n";
            allureXMLString += "</failure>\n";
            allureXMLString += "</test-case>\n";
        });
        allureXMLString += "</test-cases>\n";
        allureXMLString += "</ns2:test-suite>\n";
        if (!(testsuite.name.includes('undefined'))) {
            this.writeXMLToFile(allureXMLString, testsuite.name);
        }
    }

    //removeOldResults from Filesystem
    static removeOldResults() {
        //remove old results
        fs.remove('/tmp/allure-results/*', (err) => {
            if (err) console.log("Deleting old result-files failed. There might be no old results or something unexpected happened.");
            else console.log('Successfully deleted old results!');
        });
    }


    //Write the given String to file, as an input for the report generation
    static writeXMLToFile(xmlString: String, name: String) {
        save(xmlString, '/tmp/allure-results/' + name + '-testsuite.xml');
    }

    //Generate the Allure-report.
    static generateReport() {
        //get history
        rp();
        fs.copy('allure-report/history/', '/tmp/allure-results/history/', err => {
            if (err) return console.log("Copying old history failed. There might be no history or something unexpected happened.")
            else console.log('Successfully copied history!')
        })

        // returns ChildProcess instance
        var generation = allure(['generate', '/tmp/allure-results', '--clean']);

        generation.on('exit', function (exitCode: any) {
            console.log('Generation is finished with code:', exitCode);
        });
    }
}
