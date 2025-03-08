// validators/matchesValidator.js
const { body, param, validationResult } = require('express-validator');
const matchesService = require('../services/matchesService');

const validateMatch = [
    body('matchDate')
    .optional()
    .isISO8601()
    .withMessage('Match date must be a valid date'),

    body('score')
    .isInt()
    .withMessage('Score must be an integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateMatchId = [
    param('matchId').isInt().withMessage('ID must be an integer'),
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
            const [rows] = await matchesService.pool.query('SELECT 1 FROM employees WHERE employee_id = ?', [value]);
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

const validateTournamentId = [
    body('tourId')
        .optional()
        .isInt()
        .withMessage('Tournament ID must be an integer')
        .custom(async (value) => {
            const [rows] = await matchesService.pool.query('SELECT 1 FROM tournaments WHERE tournament_id = ?', [value]);
            if (rows.length == 0) {
                throw new Error('Tournament ID does not exist');
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

const validateMatchDate = [
    param('matchDate')
    .optional()
    .isISO8601()
    .withMessage('Match date must be a valid date'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateMatch,
    validateMatchId,
    validateEmployeeId,
    validateTournamentId,
    validateMatchDate
};