// validators/employeeValidator.js
const { body, param, validationResult } = require('express-validator');

const validateEmployee = [
    body('empName')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),

    body('empNumber')
    .isString()
    .withMessage('Number must be a String')
    .notEmpty()
    .withMessage('Number is required'),

    body('position')
    .isString()
    .withMessage('Position must be a String')
    .notEmpty()
    .withMessage('Position is required'),

    body('salary')
    .isInt()
    .withMessage('Salary must be an integer'),

    body('empEmail')
    .isString()
    .withMessage('Email must be a String')
    .notEmpty()
    .withMessage('Email is required'),

    body('empPass')
    .isString()
    .withMessage('Password must be a String')
    .notEmpty()
    .withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateEmployeeId = [
    param('empId').isInt().withMessage('ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log('Params:', req.params);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateEmployeePosition = [
    param('position')
        .isString()
        .withMessage('Position must be a string')
        .notEmpty()
        .withMessage('Position is required'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateEmployee,
    validateEmployeeId,
    validateEmployeePosition
};