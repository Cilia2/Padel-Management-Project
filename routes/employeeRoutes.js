// routes/employeeRoutes.js
const express = require('express');
const employeeController = require('../controllers/employeeController');
const { validateEmployee, validateEmployeeId, validateEmployeePosition } = require('../validators/employeeDTO');

const router = express.Router();

router.get('/', (req, res) => employeeController.getAllEmployee(req, res));

router.post('/signin', (req, res) => employeeController.signIn(req, res));

router.get('/search', (req, res) => employeeController.searchEmployeeById(req, res));

router.get('/:empId', validateEmployeeId, (req, res) => employeeController.getEmployeeById(req, res));

router.post('/', validateEmployee, (req, res) => employeeController.addEmployee(req, res));

router.post('/update-employee/:empId', [validateEmployeeId, validateEmployee], (req, res) => employeeController.updateEmployee(req, res));

router.get('/delete/:empId', validateEmployeeId, (req, res) => employeeController.deleteEmployee(req, res));

router.get('/position/:position', validateEmployeePosition, (req, res) => employeeController.getEmployeeByPosition(req, res));

router.get('/edit-form/:empId', validateEmployeeId, (req, res) => employeeController.editForm(req, res));

//DELETE and UPDATE 
//router.delete('/:empId', validateEmployeeId, (req, res) => employeeController.deleteEmployee(req, res));
//router.put('/:empId', [validateEmployeeId, validateEmployee], (req, res) => employeeController.updateEmployee(req, res));

module.exports = router;