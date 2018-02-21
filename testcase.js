class Testcase {
    constructor(testcase, jsonResults) {
        this.startTime = jsonResults.startTime;
        this.stopTime = (parseInt(jsonResults.startTime) + parseInt(testcase.duration)).toString();
        this.status = testcase.status;
        this.fullName = testcase.fullName;
        this.title = testcase.title;
        this.failureMessages = "";
        testcase.failureMessages.forEach(fMsg => {
            this.failureMessages += fMsg;
        });
    }
}

module.exports = Testcase;