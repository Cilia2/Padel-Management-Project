// validators/tournamentValidator.js
const { body, param, validationResult } = require('express-validator');

const validateTournament = [
    body('tourName')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),

    body('location')
    .isString()
    .withMessage('Number must be a String')
    .notEmpty()
    .withMessage('Number is required'),

    body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),

    body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateTournamentId = [
    param('tourId').isInt().withMessage('ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log('Params:', req.params);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateTournamentLocation = [
    param('location')
        .isString()
        .withMessage('Location must be a string')
        .notEmpty()
        .withMessage('Location is required'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateTournament,
    validateTournamentId,
    validateTournamentLocation
};