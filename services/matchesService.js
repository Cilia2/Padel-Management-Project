// Services/ matchesService.js
const { match } = require('assert');
const { initDB } = require('../config/database');
const Matches = require('../models/matchesModel');

class MatchesService{
    constructor(){
        this.pool = null;
        this.init();
    }

    async init(){
        this.pool = await initDB();
    }

    async getAllMatches(){
        try{
            const[rows] = await this.pool.query(`
                SELECT 
                matches.match_id,
                matches.match_date,
                matches.score,
                matches.emp_id,
                matches.tournament_id
                FROM matches
                JOIN employees ON matches.emp_id = employees.employee_id
                JOIN tournaments ON matches.tournament_id = tournaments.tournament_id`);
                return rows.map(Matches.fromRow);
        }catch(error) {
            console.error('Error getting all matches: ', error);
            throw error;
        }
    } 

    async getMatchById(matchId){
        try{
            const [rows] = await this.pool.query(`
                SELECT 
                matches.match_id,
                matches.match_date,
                matches.score,
                matches.emp_id,
                matches.tournament_id
                FROM matches
                JOIN employees ON matches.emp_id = employees.employee_id
                JOIN tournaments ON matches.tournament_id = tournaments.tournament_id
                WHERE matches.match_id = ?`, [matchId]);
                if(rows.length == 0)
                    return null;
                return Matches.fromRow(rows[0]);
        } catch (error) {
            console.error(`Error fetching match with ID (${matchId}):`, error);
            throw error;
        }
        
    }

    async addMatch(matchData){
        const { matchDate, score, empId, tourId } = matchData;
        try{
            const [result] = await this.pool.query(
                'INSERT INTO matches (match_date, score, emp_id, tournament_id) VALUES (?, ?, ?, ?)', 
                [matchDate, score, empId, tourId]);
                console.log('Insert Result:', result);
                const insertedMatch = new Matches(result.insertId, matchDate, score, empId, tourId);
                return insertedMatch;
        }catch (error) {
        console.error('Error adding match:', error); 
        throw error;
        }
    }

    async updateMatch(matchId, matchData) {
        const { matchDate, score, empId, tourId } = matchData;

        const [result] = await this.pool.query(
            'UPDATE matches SET match_date = ?, score = ?, emp_id = ?, tournament_id = ? WHERE match_id = ?', 
            [matchDate, score, empId, tourId, matchId]
        );
        return result.affectedRows > 0;
    }
    
    async deleteMatch(matchId){
        const [result] = await this.pool.query('DELETE FROM matches WHERE match_id = ?', [matchId]);
        return result.affectedRows > 0;
    }

    async getMatchByDate(matchDate){
        try{
            const [rows] = await this.pool.query(`
                SELECT 
                matches.match_id,
                matches.match_date,
                matches.score,
                matches.emp_id,
                matches.tournament_id
                FROM matches
                JOIN employees ON matches.emp_id = employees.employee_id
                JOIN tournaments ON matches.tournament_id = tournaments.tournament_id
                WHERE matches.match_date = ?`, [matchDate]);
                if(rows.length == 0)
                    return null;
                return rows.map(Matches.fromRow);
        } catch (error) {
            console.error(`Error fetching match with date (${matchDate}):`, error);
            throw error;
        }
    }

    async getMatchByTournamentId(tourId){
        try{
            const [rows] = await this.pool.query(`
                SELECT 
                matches.match_id,
                matches.match_date,
                matches.score,
                matches.emp_id,
                matches.tournament_id
                FROM matches
                JOIN employees ON matches.emp_id = employees.employee_id
                JOIN tournaments ON matches.tournament_id = tournaments.tournament_id
                WHERE matches.tournament_id = ?`, [tourId]);
                if(rows.length == 0)
                    return null;
                return rows.map(Matches.fromRow);
        } catch (error) {
            console.error(`Error fetching match with tournament Id (${tourId}):`, error);
            throw error;
        }
    }
}
module.exports = new MatchesService();