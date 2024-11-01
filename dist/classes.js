"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
    describe() {
        console.log(`${this.id}: IT Department.`);
    }
}
class AccountingDepartment extends Department {
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('Not report found.');
    }
    set mostRecentReport(report) {
        this.lastReport = report;
        this.reports.push(report);
    }
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[-1];
    }
    ;
    describe() {
        console.log(`Accounting Department, ID: ${this.id}`);
    }
    addEmployee(employee) {
        if (employee === 'Wen') {
            console.log('This employee can not be assigned here.');
            return;
        }
        this.employees.push(employee);
    }
    addReport(report) {
        this.reports.push(report);
        this.lastReport = report;
    }
    printReports() {
        console.log(this.reports);
    }
}
const it = new ITDepartment('d1', ['Wen']);
it.addEmployee('Wen');
it.describe();
it.printEmployeeInformation();
const accounting = new AccountingDepartment('d2', []);
accounting.addEmployee('Arc');
accounting.addReport('Initial Report');
console.log(accounting.mostRecentReport);
accounting.describe();
accounting.printEmployeeInformation();
accounting.addReport("Second report.");
console.log(accounting.mostRecentReport);
accounting.printReports();
accounting.mostRecentReport = "Year end report";
console.log(accounting.printReports());
console.log(accounting.mostRecentReport);
//# sourceMappingURL=classes.js.map