//controllers/ tournamentsController.js
const tournamentsService = require('../services/tournamentsService');

class TournamentController{
    async getAllTournament(req, res){
        try{
            const tournament = await tournamentsService.getAllTournament();
            //res.json(tournament);
            const data = {
                tournaments: tournament
            }
            res.render('tournament', data);
        } catch(error){
            console.error('Error fetching tournament', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getTournamentById(req, res){
        try{
            const tourId = parseInt(req.params.tourId, 10);
            const tournament = await tournamentsService.getTournamentById(tourId);
            if(!tournament){
                return res.status(404).json({ message: 'tournament not found' });
            }
            res.json(tournament);
        }catch(error){
            console.error('Error fetching tournament:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async addTournament(req, res){
        try{
            const { tourName, location, startDate, endDate } = req.body;
            if (!tourName || !location || !startDate || !endDate) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const newTournament = await tournamentsService.addTournament({ tourName, location, startDate, endDate });
            //res.status(201).json(newTournament);
            res.redirect('/api/tournament');
        }catch(error){
            console.error('Error creating tournament:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateTournament(req, res) {
        try {
            const tourId = parseInt(req.params.tourId, 10);
            const { tourName, location, startDate, endDate } = req.body;
            const success = await tournamentsService.updateTournament(tourId, { tourName, location, startDate, endDate });
            if (!success) {
                return res.status(404).json({ message: 'tournament not found or no changes made' });
            }
            //res.json({ message: 'tournament updated successfully' });
            res.redirect('/api/tournament');
        } catch (error) {
            console.error('Error updating tournament:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteTournament(req, res) {
        try {
            const tourId = parseInt(req.params.tourId, 10);
            const success = await tournamentsService.deleteTournament(tourId);
            if (!success) {
                //return res.status(404).json({ message: 'tournament not found' });
                console.log('Error deleting tournament.');
            }
            //res.json({ message: 'tournament deleted successfully' });
            res.redirect('/api/tournament');
        } catch (error) {
            console.error('Error deleting tournament:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getTournamentByLocation(req, res){
        try{
            const location = req.params.location;
            const tournament = await tournamentsService.getTournamentByLocation(location);
            if(!tournament || tournament.length == 0){
                return res.status(404).json({ message: 'No tournaments found with this location' });
            }
            res.json(tournament);
        }catch(error){
            console.error('Error fetching tournament:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async editForm(req, res) {
        try {
            const tourId = parseInt(req.params.tourId, 10);
            const tournament = await tournamentsService.getTournamentById(tourId);
            res.render('editTournament', {tournament: tournament});
        } catch (error) {
            console.error('Error updating tournament:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async addForm(req, res){
        res.render('addTournament');
    }

    async searchTournamentById(req, res) {
        try {
            const tourId = parseInt(req.query.tourId, 10);  
            console.log('Searching for tournament with ID:', tourId);
            if (isNaN(tourId)) {
                return res.status(400).json({ message: 'Invalid tournament ID' });
            }

            const tournament = await tournamentsService.getTournamentById(tourId);
            const tournaments = tournament ? [tournament] : [];
            console.log('Tournament found:', tournaments);
            
            res.render('tournament', { tournaments });
        } catch (error) {
            console.error('Error searching for tournament:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new TournamentController();