// controllers/matchesController.js
const matchesService = require('../services/matchesService');

class MatchesController {
    async getAllMatches(req, res) {
        try {
            const matches = await matchesService.getAllMatches();
            //res.json(matches);
            const data = {
                matches: matches
            }
            res.render('matches', data);
        } catch (error) {
            console.error('Error fetching matches:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getMatchById(req, res) {
        try {
            const matchId = parseInt(req.params.matchId, 10);
            const match = await matchesService.getMatchById(matchId);
            if (!match) {
                return res.status(404).json({ message: 'Match not found' });
            }
            res.json(match);
        } catch (error) {
            console.error('Error fetching match:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async addMatch(req, res) {
        try {
            const { matchDate, score, empId, tourId } = req.body;
            if (!matchDate || !score || !empId || !tourId) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const newMatch = await matchesService.addMatch({ matchDate, score, empId, tourId });
            //res.status(201).json(newMatch);
            res.redirect('/api/match');
        } catch (error) {
            console.error('Error creating match:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateMatch(req, res) {
        try {
            const matchId = parseInt(req.params.matchId, 10);
            const { matchDate, score, empId, tourId } = req.body;
            const success = await matchesService.updateMatch(matchId, { matchDate, score, empId, tourId });
            if (!success) {
                return res.status(404).json({ message: 'Match not found or no changes made' });
            }
            //res.json({ message: 'Match updated successfully' });
            res.redirect('/api/match');
        } catch (error) {
            console.error('Error updating match:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteMatch(req, res) {
        try {
            const matchId = parseInt(req.params.matchId, 10);
            const success = await matchesService.deleteMatch(matchId);
            if (!success) {
                //return res.status(404).json({ message: 'Match not found' });
                console.log('Error deleting match.');
            }
            //res.json({ message: 'Match deleted successfully' });
            res.redirect('/api/match');
        } catch (error) {
            console.error('Error deleting match:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getMatchByDate(req, res) {
        try {
            const matchDate = req.params.matchDate;
            const matches = await matchesService.getMatchByDate(matchDate);
            if (!matches || matches.length == 0) {
                return res.status(404).json({ message: 'No matches found with this date' });
            }
            res.json(matches);
        } catch (error) {
            console.error('Error fetching matches by date:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getMatchByTournamentId(req, res) {
        try {
            const tourId = req.params.tourId;
            const matches = await matchesService.getMatchByTournamentId(tourId);
            if (!matches || matches.length == 0) {
                return res.status(404).json({ message: 'No matches found with this tournament Id' });
            }
            res.json(matches);
        } catch (error) {
            console.error('Error fetching matches by tournament Id:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async editForm(req, res) {
        try {
            const matchId = parseInt(req.params.matchId, 10);
            const match = await matchesService.getMatchById(matchId);
            res.render('editMatch', {match: match});
        } catch (error) {
            console.error('Error updating match:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async addForm(req, res){
        res.render('addMatch');
    }

    async searchMatchById(req, res) {
        try {
            const matchId = parseInt(req.query.matchId, 10);  
            console.log('Searching for match with ID:', matchId);
            if (isNaN(matchId)) {
                return res.status(400).json({ message: 'Invalid match ID' });
            }

            const match = await matchesService.getMatchById(matchId);
            const matches = match ? [match] : [];
            console.log('match found:', matches);
            
            res.render('matches', { matches });
        } catch (error) {
            console.error('Error searching for match:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = new MatchesController();