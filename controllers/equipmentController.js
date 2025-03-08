//controllers/ equipmentController.js
const equipmentService = require('../services/equipmentService');

class EquipmentController{
    async getAllEquipment(req, res){
        try{
            const equipment = await equipmentService.getAllEquipment();
            //res.json(equipment);
            const data = {
                equipment: equipment
            }
            res.render('equipment', data);
        } catch(error){
            console.error('Error fetching equipment: ', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getEquipmentById(req, res){
        try{
            const equId = parseInt(req.params.equId, 10);
            const equipment = await equipmentService.getEquipmentById(equId);
            if(!equipment){
                return res.status(404).json({ message: 'Equipment not found' });
            }
            res.json(equipment);
        }catch(error){
            console.error('Error fetching equipment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async addEquipment(req, res){
        try{
            const { equName, equType, quantity } = req.body;
            if (!equName || !equType || !quantity) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const newEquipment = await equipmentService.addEquipment({equName, equType, quantity});
            //res.status(201).json(newEquipment);
            res.redirect('/api/equipment');
        }catch(error){
            console.error('Error creating equipment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateEquipment(req, res) {
        try {
            const equId = parseInt(req.params.equId, 10);
            const { equName, equType, quantity } = req.body;
            const success = await equipmentService.updateEquipment(equId, { equName, equType, quantity });
            if (!success) {
                return res.status(404).json({ message: 'Equipment not found or no changes made' });
            }
            //res.json({ message: 'Equipment updated successfully' });
            res.redirect('/api/equipment');
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteEquipment(req, res) {
        try {
            const equId = parseInt(req.params.equId, 10);
            const success = await equipmentService.deleteEquipment(equId);
            if (!success) {
                //return res.status(404).json({ message: 'Equipment not found' });
                console.log('Error deleting equipment.');
            }
            //res.json({ message: 'Equipment deleted successfully' });
            res.redirect('/api/equipment');
        } catch (error) {
            console.error('Error deleting equipment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async editForm(req, res) {
        try {
            const equId = parseInt(req.params.equId, 10);
            const equipment = await equipmentService.getEquipmentById(equId);
            res.render('editEquipment', {equipment: equipment});
        } catch (error) {
            console.error('Error updating equipment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async addForm(req, res){
        res.render('addEquipment');
    }

    async searchEquipmentById(req, res) {
        try {
            const equId = parseInt(req.query.equId, 10);  
            console.log('Searching for equipment with ID:', equId);
            if (isNaN(equId)) {
                return res.status(400).json({ message: 'Invalid equipment ID' });
            }

            const equipments = await equipmentService.getEquipmentById(equId);
            const equipment = equipments ? [equipments] : [];
            console.log('Equipment found:', equipment);
            
            res.render('equipment', { equipment });
        } catch (error) {
            console.error('Error searching for equipment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new EquipmentController();