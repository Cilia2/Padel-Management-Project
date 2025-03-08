// controllers/playersController.js
const playerService = require('../services/playersService');

class PlayersController {
    async getAllPlayers(req, res) {
        try {
            const players = await playerService.getAllPlayer();
            //res.json(players);
            const data = {
                players: players
            }
            res.render('players', data);
        } catch (error) {
            console.error('Error fetching players:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getPlayerById(req, res) {
        try {
            const playerId = parseInt(req.params.playerId, 10);
            const player = await playerService.getPlayerById(playerId);
            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }
            res.json(player);
        } catch (error) {
            console.error('Error fetching player:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async addPlayer(req, res) {
        try {
            const { playerName, playerNumber, playerCity, rank, matchId} = req.body;
            if (!playerName || !playerNumber || !playerCity || !rank || !matchId) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const newPlayer = await playerService.addPlayer({ playerName, playerNumber, playerCity, rank, matchId });
            //res.status(201).json(newPlayer);
            res.redirect('/api/player');
        } catch (error) {
            console.error('Error creating player:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updatePlayer(req, res) {
        try {
            const playerId = parseInt(req.params.playerId, 10);
            const { playerName, playerNumber, playerCity, rank, matchId } = req.body;
            const success = await playerService.updatePlayer(playerId, { playerName, playerNumber, playerCity, rank, matchId });
            if (!success) {
                return res.status(404).json({ message: 'Player not found or no changes made' });
            }
            //res.json({ message: 'Player updated successfully' });
            res.redirect('/api/player');
        } catch (error) {
            console.error('Error updating player:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deletePlayer(req, res) {
        try {
            const playerId = parseInt(req.params.playerId, 10);
            const success = await playerService.deletePlayer(playerId);
            if (!success) {
                //return res.status(404).json({ message: 'Player not found' });
                console.log('Error deleting player.');
            }
            //res.json({ message: 'Player deleted successfully' });
            res.redirect('/api/player');
        } catch (error) {
            console.error('Error deleting player:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getPlayerByRank(req, res) {
        try {
            const rank = req.params.rank;
            const players = await playerService.getPlayerByRank(rank);
            if (!players || players.length == 0) {
                return res.status(404).json({ message: 'No players found with this rank' });
            }
            res.json(players);
        } catch (error) {
            console.error('Error fetching players by rank:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async editForm(req, res) {
        try {
            const playerId = parseInt(req.params.playerId, 10);
            const player = await playerService.getPlayerById(playerId);
            res.render('editPlayer', {player: player});
        } catch (error) {
            console.error('Error updating player:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async addForm(req, res){
        res.render('addPlayer');
    }

    async searchPlayerById(req, res) {
        try {
            const playerId = parseInt(req.query.playerId, 10);  // Get playerId from query parameters
            console.log('Searching for player with ID:', playerId);
            if (isNaN(playerId)) {
                return res.status(400).json({ message: 'Invalid player ID' });
            }

            const player = await playerService.getPlayerById(playerId);
            const players = player ? [player] : [];
            
            res.render('players', { players });
        } catch (error) {
            console.error('Error searching for player:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new PlayersController();