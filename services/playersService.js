// Services/ playersService.js
const { match } = require('assert');
const { initDB } = require('../config/database');
const Player = require('../models/playersModel');

class PlayersService{
    constructor(){
        this.pool = null;
        this.init();
    }

    async init(){
        this.pool = await initDB();
    }

    async getAllPlayer(){
        try{
            const[rows] = await this.pool.query(`
                SELECT 
                players.player_id,
                players.player_name,
                players.player_number,
                players.player_city,
                players.rank,
                players.match_id
                FROM players
                JOIN matches ON players.match_id = matches.match_id`);
                return rows.map(Player.fromRow);
        }catch(error) {
            console.error('Error getting all players: ', error);
            throw error;
        }
    } 

    async getPlayerById(playerId){
        try{
            const [rows] = await this.pool.query(`
                SELECT 
                players.player_id,
                players.player_name,
                players.player_number,
                players.player_city,
                players.rank,
                players.match_id
                FROM players
                JOIN matches ON players.match_id = matches.match_id
                WHERE players.player_id = ?`, [playerId]);
                if(rows.length == 0)
                    return null;
                return Player.fromRow(rows[0]);
        } catch (error) {
            console.error(`Error fetching player with ID (${playerId}):`, error);
            throw error;
        }
        
    }

    async addPlayer(playerData){
        const { playerName, playerNumber, playerCity, rank, matchId } = playerData;
        try{
            const [result] = await this.pool.query(
                'INSERT INTO players (player_name, player_number, player_city, `rank`, match_id) VALUES (?, ?, ?, ?, ?)', 
                [playerName, playerNumber, playerCity, rank, matchId]);
                console.log('Insert Result:', result);
                const insertedPlayer = new Player(result.insertId, playerName, playerNumber, playerCity, rank, matchId);
                return insertedPlayer;
        }catch (error) {
        console.error('Error adding player:', error); 
        throw error;
        }
    }

    async updatePlayer(playerId, playerData) {
        const { playerName, playerNumber, playerCity, rank, matchId } = playerData;

        const [result] = await this.pool.query(
            'UPDATE players SET player_name = ?, player_number = ?, player_city = ?, `rank` = ?, match_id = ? WHERE player_id = ?', 
            [playerName, playerNumber, playerCity, rank, matchId, playerId]
        );
        return result.affectedRows > 0;
    }
    

    async deletePlayer(playerId){
        const [result] = await this.pool.query('DELETE FROM players WHERE player_id = ?', [playerId]);
        return result.affectedRows > 0;
    }

    async getPlayerByRank(rank){
        try{
            const [rows] = await this.pool.query(`
                SELECT 
                players.player_id,
                players.player_name,
                players.player_number,
                players.player_city,
                players.rank,
                players.match_id
                FROM players
                JOIN matches ON players.match_id = matches.match_id
                WHERE players.rank = ?`, [rank]);
                if(rows.length == 0)
                    return null;
                return rows.map(Player.fromRow);
        } catch (error) {
            console.error(`Error fetching player with rank (${rank}):`, error);
            throw error;
        }
    }
}
module.exports = new PlayersService();