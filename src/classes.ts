abstract class Department {
    protected employees: string[] = [];
    constructor(protected readonly id: string, public name: string) {
    }
    
    abstract describe(this: Department): void;
    
    
    addEmployee(employee: string) {
        this.employees.push(employee);
    }
    
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}


class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, "IT");
    }
    
    describe(this: ITDepartment): void {
        console.log(`${this.id}: IT Department.`)
    }
}


class AccountingDepartment extends Department {
    private lastReport: string;
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('Not report found.');
    }
    
    set mostRecentReport(report: string) {
        this.lastReport = report;
        this.reports.push(report);
    }
    constructor(id: string, private reports: string[]) {
        super(id, "Accounting");
        this.lastReport = reports[-1];
    };
    describe(this: AccountingDepartment): void {
        console.log(`Accounting Department, ID: ${this.id}`)
    } 
    addEmployee(employee: string) {
        if (employee === 'Wen') {
            console.log('This employee can not be assigned here.')
            return;
        }
        this.employees.push(employee);
    }
   
    addReport(report: string) {
        this.reports.push(report);
        this.lastReport = report; 
    }
    
    printReports() {
        console.log(this.reports);
    }
}


const it = new ITDepartment('d1', ['Wen']);
// it.id = 'd2';
it.addEmployee('Wen');
it.describe();
it.printEmployeeInformation();

const accounting = new AccountingDepartment('d2', []);
accounting.addEmployee('Arc');
accounting.addReport('Initial Report')
console.log(accounting.mostRecentReport);
accounting.describe();
accounting.printEmployeeInformation();
accounting.addReport("Second report.")
console.log(accounting.mostRecentReport);
accounting.printReports();
accounting.mostRecentReport = "Year end report";
console.log(accounting.printReports());
console.log(accounting.mostRecentReport);

// const accountingCopy = {name: "dummy", describe: accounting.describe};
// accountingCopy.describe();