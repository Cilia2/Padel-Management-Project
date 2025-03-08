// models/ equipmentModel.js
const moment = require("moment");

class Equipment{
    constructor(equId, equName, equType, quantity){
        this.equId = equId;
        this.equName = equName;
        this.equType = equType;
        this.quantity = quantity;
    }

    static fromRow(row){
        return new Equipment(
            row.equipment_id,
            row.equipment_name,
            row.equipment_type,
            row.quantity
        );
    }
}

module.exports = Equipment;