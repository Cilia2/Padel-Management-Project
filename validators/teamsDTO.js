// validators/teamsValidator.js
const { body, param, validationResult } = require('express-validator');
const teamsService = require('../services/teamsService');

const validateTeam = [
    body('teamName')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),
    
    body('dateCreated')
    .optional()
    .isISO8601()
    .withMessage('Date must be a valid date'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateTeamId = [
    param('teamId').isInt().withMessage('ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log('Params:', req.params);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateEmployeeId = [
    body('empId')
        .optional()
        .isInt()
        .withMessage('Employee ID must be an integer')
        .custom(async (value) => {
            const [rows] = await teamsService.pool.query('SELECT 1 FROM employees WHERE employee_id = ?', [value]);
            if (rows.length == 0) {
                throw new Error('Employee ID does not exist');
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validatePlayerId = [
    body('plyId')
        .optional()
        .isInt()
        .withMessage('Player ID must be an integer')
        .custom(async (value) => {
            const [rows] = await teamsService.pool.query('SELECT 1 FROM players WHERE player_id = ?', [value]);
            if (rows.length == 0) {
                throw new Error('Player ID does not exist');
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateTeam,
    validateTeamId,
    validateEmployeeId,
    validatePlayerId
};