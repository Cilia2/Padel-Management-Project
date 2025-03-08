// models/teamsModel.js
const moment = require("moment");

class Teams{
    constructor(teamId, teamName, dateCreated, empId, plyId){
        this.teamId = teamId;
        this.teamName = teamName;
        this.dateCreated = dateCreated;
        this.empId = empId;
        this.plyId = plyId;
    }

    static fromRow(row){
        return new Teams(
            row.team_id,
            row.team_name,
            moment(row.date_created).format("YYYY-MM-DD HH:mm:SS"),
            row.employee_id,
            row.ply_id
        )
    }
}

module.exports = Teams;