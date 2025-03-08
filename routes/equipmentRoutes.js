// routes/equipmentRoutes.js
const express = require('express');
const equipmentController = require('../controllers/equipmentController');
const { validateEquipment, validateEquipmentId } = require('../validators/equipmentDTO');

const router = express.Router();

router.get('/', (req, res) => equipmentController.getAllEquipment(req, res)); 

router.get('/search', (req, res) => equipmentController.searchEquipmentById(req, res));

router.get('/add-form', (req, res) => equipmentController.addForm(req, res));

router.get('/:equId', validateEquipmentId, (req, res) => equipmentController.getEquipmentById(req, res));

router.get('/edit-form/:equId', validateEquipmentId, (req, res) => equipmentController.editForm(req, res));

router.get('/delete/:equId', validateEquipmentId, (req, res) => equipmentController.deleteEquipment(req, res));

router.post('/addEquipment', validateEquipment, (req, res) => equipmentController.addEquipment(req, res));

router.post('/update-equipment/:equId', [validateEquipmentId, validateEquipment], (req, res) => equipmentController.updateEquipment(req, res));

// router.put('/:equId', [validateEquipmentId, validateEquipment], (req, res) => equipmentController.updateEquipment(req, res));
// router.delete('/:equId', validateEquipmentId, (req, res) => equipmentController.deleteEquipment(req, res));

module.exports = router;

