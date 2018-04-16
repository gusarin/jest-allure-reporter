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
import fse = require('fs-extra');
import rp = require('rootpath');
import { escapeXml } from "./xmlescape";
import * as fs from "fs";
import * as st from "string-template";
import * as path from "path";
import * as os from "os";

const tempDir = path.resolve(path.join(os.tmpdir(), `./allure-results`));

export class Allure {
    //Generating an String containing the test-results in an XML-Format which is readable for Allure, and calling a method writing the string to a file. 
    static generateAllureXMLOutput(testsuite: Testsuite) {

        const xmlSuiteTempPath = path.resolve(path.join(__dirname, "./xmlSuiteTemplate"));
        const xmlTestCasePath = path.resolve(path.join(__dirname, "./xmlTestcaseTemplate"));
        const xmlSuiteTemplate: string = fs.readFileSync(xmlSuiteTempPath, "utf8").toString();
        const xmlTestcaseTemplate: string = fs.readFileSync(xmlTestCasePath, "utf8").toString();
        let testcases: string = "";

        testsuite.testcases.forEach((testcase: Testcase) => {
            testcases += st(xmlTestcaseTemplate, {
                testStartTime: testcase.startTime
                , testStatus: testcase.status
                , testStopTime: testcase.stopTime
                , testName: testcase.fullName
                , testTitle: testcase.title
                , testMessage: escapeXml(testcase.failureMessages, '')
            });
        });

        const allureXMLString: string = st(xmlSuiteTemplate, {
            suiteStartTime: testsuite.startTime
            , suiteStopTime: testsuite.stopTime
            , suiteName: testsuite.name
            , testCases: testcases
        });

        if (!(testsuite.name.includes('undefined'))) {
            this.writeXMLToFile(allureXMLString, testsuite.name);
        }
    }

    //removeOldResults from Filesystem
    static removeOldResults() {
        //remove old results
        fse.remove(`${tempDir}/*`, (err) => {
            if (err) console.log("Deleting old result-files failed. There might be no old results or something unexpected happened.");
            else console.log('Successfully deleted old results!');
        });
    }


    //Write the given String to file, as an input for the report generation
    static writeXMLToFile(xmlString: String, name: String) {
        const target = path.resolve(path.join(tempDir, `./${name}-testsuite.xml`));
        save(xmlString, target);
    }

    //Generate the Allure-report.
    static generateReport() {
        //get history
        rp();
        const historyDir = path.resolve(path.join(tempDir, "./history/"));
        fse.copy('allure-report/history/', historyDir, err => {
            if (err) return console.log("Copying old history failed. There might be no history or something unexpected happened.")
            else console.log('Successfully copied history!')
        });

        // returns ChildProcess instance
        const generation = allure(['generate', `${tempDir}`, '--clean']);

        generation.on('exit', function (exitCode: any) {
            console.log('Generation is finished with code:', exitCode);
        });
    }
}
