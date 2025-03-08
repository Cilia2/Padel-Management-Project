// Services/ teamsService.js
const { match } = require('assert');
const { initDB } = require('../config/database');
const Teams = require('../models/teamsModel');

class TeamsService{
    constructor(){
        this.pool = null;
        this.init();
    }

    async init(){
        this.pool = await initDB();
    }

    async getAllTeams(){
        try{
            const[rows] = await this.pool.query(`
                SELECT 
                teams.team_id,
                teams.team_name,
                teams.date_created,
                teams.employee_id,
                teams.ply_id
                FROM teams
                JOIN employees ON teams.employee_id = employees.employee_id
                JOIN players ON teams.ply_id = players.player_id`);
                return rows.map(Teams.fromRow);
        }catch(error) {
            console.error('Error getting all teams: ', error);
            throw error;
        }
    } 

    async getTeamById(teamId){
        try{
            const [rows] = await this.pool.query(`
                SELECT 
                teams.team_id,
                teams.team_name,
                teams.date_created,
                teams.employee_id,
                teams.ply_id
                FROM teams
                JOIN employees ON teams.employee_id = employees.employee_id
                JOIN players ON teams.ply_id = players.player_id
                WHERE teams.team_id = ?`, [teamId]);
                if(rows.length == 0)
                    return null;
                return Teams.fromRow(rows[0]);
        } catch (error) {
            console.error(`Error fetching team with ID (${teamId}):`, error);
            throw error;
        }
        
    }

    async addTeam(teamData){
        const { teamName, dateCreated, empId, plyId } = teamData;
        try{
            const [result] = await this.pool.query(
                'INSERT INTO teams (team_name, date_created, employee_id, ply_id) VALUES (?, ?, ?, ?)', 
                [teamName, dateCreated, empId, plyId]);
                console.log('Insert Result:', result);
                const insertedTeam = new Teams(result.insertId, teamName, dateCreated, empId, plyId);
                return insertedTeam;
        }catch (error) {
        console.error('Error adding team:', error); 
        throw error;
        }
    }

    async updateTeam(teamId, teamData) {
        const { teamName, dateCreated, empId, plyId } = teamData;

        const [result] = await this.pool.query(
            'UPDATE teams SET team_name = ?, date_created = ?, employee_id = ?, ply_id = ? WHERE team_id = ?', 
            [teamName, dateCreated, empId, plyId, teamId]
        );
        return result.affectedRows > 0;
    }
    
    async deleteTeam(teamId){
        const [result] = await this.pool.query('DELETE FROM teams WHERE team_id = ?', [teamId]);
        return result.affectedRows > 0;
    }

    async getTeamByEmployeeId(empId){
        try{
            const [rows] = await this.pool.query(`
                SELECT 
                teams.team_id,
                teams.team_name,
                teams.date_created,
                teams.employee_id,
                teams.ply_id
                FROM teams
                JOIN employees ON teams.employee_id = employees.employee_id
                JOIN players ON teams.ply_id = players.player_id
                WHERE teams.employee_id = ?`, [empId]);
                if(rows.length == 0)
                    return null;
                return rows.map(Teams.fromRow);
        } catch (error) {
            console.error(`Error fetching team with employee Id (${empId}):`, error);
            throw error;
        }
    }
}
module.exports = new TeamsService();