// Services/ tournamentsService.js
const { initDB } = require('../config/database');
const Tournament = require('../models/tournamentsModel');

class TournamentService{
    constructor(){
        this.pool = null;
        this.init();
    }

    async init(){
        this.pool = await initDB();
    }

    async getAllTournament(){
        const[rows] = await this.pool.query('SELECT * FROM tournaments');
        return rows.map(Tournament.fromRow);
    }

    async getTournamentById(tourId){
        const [rows] = await this.pool.query('SELECT * FROM tournaments WHERE tournament_id = ?', [tourId]);
        if(rows.length == 0)
            return null;
        return Tournament.fromRow(rows[0]);
    }

    async addTournament(tournamentData){
        const { tourName, location, startDate, endDate } = tournamentData;
        const [result] = await this.pool.query(
            'INSERT INTO tournaments (tournament_name, location, start_date, end_date) VALUES (?, ?, ?, ?)', 
            [tourName, location, startDate, endDate]);
        const insertedTournament = new Tournament(result.insertId, tourName, location, startDate, endDate);
        return insertedTournament;
    }

    async updateTournament(tourId, tournamentData){
        const { tourName, location, startDate, endDate } = tournamentData;
        const [result] = await this.pool.query('UPDATE tournaments SET tournament_name = ?, location = ?, start_date = ?, end_date = ? WHERE tournament_id = ?', 
            [tourName, location, startDate, endDate, tourId]);
        return result.affectedRows > 0;
    }

    async deleteTournament(tourId){
        const [result] = await this.pool.query('DELETE FROM tournaments WHERE tournament_id = ?', [tourId]);
        return result.affectedRows > 0;
    }

    async getTournamentByLocation(location){
        const [rows] = await this.pool.query('SELECT * FROM tournaments WHERE location = ?', [location]);
        if(rows.length == 0)
            return null;
        return rows.map(Tournament.fromRow);
    }
}
module.exports = new TournamentService();