// validators/playerValidator.js
const { body, param, validationResult } = require('express-validator');
const playersService = require('../services/playersService');

const validatePlayer = [
    body('playerName')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),

    body('playerNumber')
    .isString()
    .withMessage('Number must be a String')
    .notEmpty()
    .withMessage('Number is required'),

    body('playerCity')
    .isString()
    .withMessage('City must be a String')
    .notEmpty()
    .withMessage('City is required'),

    body('rank')
    .isString()
    .withMessage('Rank must be a String')
    .notEmpty()
    .withMessage('Rank is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validatePlayerId = [
    param('playerId').isInt().withMessage('ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log('Params:', req.params);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateMatchId = [
    body('matchId')
        .isInt()
        .withMessage('Match ID must be an integer')
        .custom(async (value) => {
            const [rows] = await playersService.pool.query('SELECT 1 FROM matches WHERE match_id = ?', [value]);
            if (rows.length == 0) {
                throw new Error('Match ID does not exist');
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

const validatePlayerRank = [
    param('rank')
        .isString()
        .withMessage('Rank must be a string')
        .notEmpty()
        .withMessage('Rank is required'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validatePlayer,
    validatePlayerId,
    validateMatchId,
    validatePlayerRank
};