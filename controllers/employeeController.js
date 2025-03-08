//controllers/ employeeController.js
const employeeService = require('../services/employeeService');

class EmployeeController{
    async getAllEmployee(req, res){
        try{
            const employee = await employeeService.getAllEmployee();
            //res.json(employee);
            const data = {
                employees: employee
            }
            res.render('employees', data);
        } catch(error){
            console.error('Error fetching employee', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getEmployeeById(req, res){
        try{
            const empId = parseInt(req.params.empId, 10);
            const employee = await employeeService.getEmployeeById(empId);
            if(!employee){
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.json(employee);
        }catch(error){
            console.error('Error fetching employee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async addEmployee(req, res){
        try{
            const { empName, empNumber, position, salary, empEmail, empPass } = req.body;
            const newEmployee = await employeeService.addEmployee({ empName, empNumber, position, salary, empEmail, empPass });
            res.status(201).json(newEmployee);
        }catch(error){
            console.error('Error creating employee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateEmployee(req, res) {
        try {
            const empId = parseInt(req.params.empId, 10);
            const { empName, empNumber, position, salary, empEmail, empPass } = req.body;
            const success = await employeeService.updateEmployee(empId, { empName, empNumber, position, salary, empEmail, empPass });
            if (!success) {
                return res.status(404).json({ message: 'Employee not found or no changes made' });
            }
            //res.json({ message: 'Employee updated successfully' });
            res.redirect('/api/employee');
        } catch (error) {
            console.error('Error updating employee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteEmployee(req, res) {
        try {
            const empId = parseInt(req.params.empId, 10);
            const success = await employeeService.deleteEmployee(empId);
            if (!success) {
                //return res.status(404).json({ message: 'Employee not found' });
                console.log('Error deleting employee.');
            }
            //res.json({ message: 'Employee deleted successfully' });
            res.redirect('/api/employee');
        } catch (error) {
            console.error('Error deleting employee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getEmployeeByPosition(req, res){
        try{
            const position = req.params.position;
            const employee = await employeeService.getEmployeeByPosition(position);
            if(!employee || employee.length == 0){
                return res.status(404).json({ message: 'No employees found with this position' });
            }
            res.json(employee);
        }catch(error){
            console.error('Error fetching employee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async signIn(req, res){
        try{
            const {empEmail, empPass} = req.body;

            if(!empEmail || !empPass){
                return res.status(400).render('signin',{error: 'Email and Password are required'});
            }

            const result = await employeeService.signIn({empEmail, empPass});

            if(!result.success){
                return res.status(401).render('signin',{error: result.message});
            }
            
            // Redirect to homepage
            return res.render('homepage');
        } catch(e){
            console.error('Error during sign in: ', e);
            return res.status(500).render('signin',{error: 'Internal server error'});
        }
    }

    async signup(req, res) {
        try {
            const { empName, empNumber, position, salary, empEmail, empPass } = req.body;
    
            // Check if any field is missing
            if (!empName || !empNumber || !position || !salary || !empEmail || !empPass) {
                return res.status(400).render('signup', { error: 'All fields are required' });
            }
    
            const result = await employeeService.addEmployee({ empName, empNumber, position, salary, empEmail, empPass });
    
            if (result.success) {
                return res.redirect('/signin');
            }
    
            return res.status(500).render('signup', { error: 'Failed to create employee' });
        } catch (e) {
            console.error('Error during signup: ', e);
            return res.status(500).render('signup', { error: 'Internal server error' });
        }
    }    

    async editForm(req, res) {
        try {
            const empId = parseInt(req.params.empId, 10);
            const employee = await employeeService.getEmployeeById(empId);
            res.render('editEmployee', {employee: employee});
        } catch (error) {
            console.error('Error updating employee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async searchEmployeeById(req, res) {
        try {
            const empId = parseInt(req.query.empId, 10);  
            console.log('Searching for employee with ID:', empId);
            if (isNaN(empId)) {
                return res.status(400).json({ message: 'Invalid employee ID' });
            }

            const employee = await employeeService.getEmployeeById(empId);
            const employees = employee ? [employee] : [];
            console.log('Employee found:', employees);
            
            res.render('employees', { employees });
        } catch (error) {
            console.error('Error searching for employee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = new EmployeeController();