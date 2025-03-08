// validators/equipmentValidator.js
const { body, param, validationResult } = require('express-validator');

const validateEquipment = [
    body('equName')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),

    body('equType')
    .isString()
    .withMessage('Type must be a String')
    .notEmpty()
    .withMessage('Type is required'),

    body('quantity')
    .isInt()
    .withMessage('Quantity must be an integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateEquipmentId = [
    param('equId').isInt().withMessage('ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log('Params:', req.params);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateEquipment,
    validateEquipmentId
};