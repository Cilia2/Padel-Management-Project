// Services/ employeesService.js
const { initDB } = require('../config/database');
const Employee = require('../models/employeeModel');

class EmployeeService{
    constructor(){
        this.pool = null;
        this.init();
    }

    async init(){
        this.pool = await initDB();
    }

    async getAllEmployee(){
        const[rows] = await this.pool.query('SELECT * FROM employees');
        return rows.map(Employee.fromRow);
    }

    async getEmployeeById(empId){
        const [rows] = await this.pool.query('SELECT * FROM employees WHERE employee_id = ?', [empId]);
        if(rows.length == 0)
            return null;
        return Employee.fromRow(rows[0]);
    }

    async addEmployee(employeeData) {
        try {
            const { empName, empNumber, position, salary, empEmail, empPass } = employeeData;
    
            // Insert into the database (make sure to adjust the query to match your table schema)
            const query = `
                INSERT INTO employees (employee_name, employee_number, position, salary, email, pass)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const [result] = await this.pool.query(query, [empName, empNumber, position, salary, empEmail, empPass]);
    
            // Return a success flag
            if (result.affectedRows > 0) {
                return { success: true };
            } else {
                return { success: false };
            }
        } catch (e) {
            console.error('Error creating employee: ', e);
            throw new Error('Error creating employee');
        }
    }
    

    async updateEmployee(empId, employeeData){
        const { empName, empNumber, position, salary, empEmail, empPass } = employeeData;
        const [result] = await this.pool.query('UPDATE employees SET employee_name = ?, employee_number = ?, position = ?, salary = ?, email = ?, pass = ? WHERE employee_id = ?', 
            [empName, empNumber, position, salary, empEmail, empPass, empId]);
        return result.affectedRows > 0;
    }

    async deleteEmployee(empId){
        const [result] = await this.pool.query('DELETE FROM employees WHERE employee_id = ?', [empId]);
        return result.affectedRows > 0;
    }

    async getEmployeeByPosition(position){
        const [rows] = await this.pool.query('SELECT * FROM employees WHERE position = ?', [position]);
        if(rows.length == 0)
            return null;
        return rows.map(Employee.fromRow);
    }

    async signIn(signIn){
        try{
            const{empEmail,empPass} = signIn;

            const [rows] = await this.pool.query('SELECT * FROM employees WHERE email = ?', [empEmail]);

            console.log('Fetched rows:', rows);
            
            if(rows.length == 0){
                return {success: false, message: 'Invalid Email'};
            }

            const employee = rows[0];
            const correctPass = employee.pass;

            //Log the fetched password for verification
            console.log('Correct password from DB:', correctPass);

            if(empPass == correctPass){
                return {success: true, employee};
            }

            return {success: false, message: 'Incorrect password'};
        } catch(e){
            throw new Error(`Error validating email and password: ${e.message}`);
        }
    }

}
module.exports = new EmployeeService();