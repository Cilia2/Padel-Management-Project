// models/ employeeModel.js
const moment = require("moment");

class Employee{
    constructor(empId, empName, empNumber, position, salary, empEmail, empPass){
        this.empId = empId;
        this.empName = empName;
        this.empNumber = empNumber;
        this.position = position;
        this.salary = salary;
        this.empEmail = empEmail;
        this.empPass = empPass;
    }

    static fromRow(row){
        return new Employee(
            row.employee_id,
            row.employee_name,
            row.employee_number,
            row.position,
            row.salary,
            row.email,
            row.pass
        );
    }
}

module.exports = Employee;