// Services/ equipmentService.js
const { initDB } = require('../config/database');
const Equipment = require('../models/equipmentModel');

class EquipmentService{
    constructor(){
        this.pool = null;
        this.init();
    }

    async init(){
        this.pool = await initDB();
    }

    async getAllEquipment(){
        const[rows] = await this.pool.query('SELECT * FROM equipment');
        return rows.map(Equipment.fromRow);
    }

    async getEquipmentById(equId){
        const [rows] = await this.pool.query('SELECT * FROM equipment WHERE equipment_id = ?', [equId]);
        if(rows.length == 0)
            return null;
        return Equipment.fromRow(rows[0]);
    }

    async addEquipment(equipmentData){
        const { equName, equType, quantity } = equipmentData;
        const [result] = await this.pool.query(
            'INSERT INTO equipment (equipment_name, equipment_type, quantity) VALUES (?, ?, ?)', 
            [equName, equType, quantity]);
        const insertedEquipment = new Equipment(result.insertId, equName, equType, quantity);
        return insertedEquipment;
    }

    async updateEquipment(equId, equipmentData){
        const { equName, equType, quantity } = equipmentData;
        const [result] = await this.pool.query('UPDATE equipment SET equipment_name = ?, equipment_type = ?, quantity = ? WHERE equipment_id = ?', 
            [equName, equType, quantity, equId]);
        return result.affectedRows > 0;
    }

    async deleteEquipment(equId){
        const [result] = await this.pool.query('DELETE FROM equipment WHERE equipment_id = ?', [equId]);
        return result.affectedRows > 0;
    }
}
module.exports = new EquipmentService();