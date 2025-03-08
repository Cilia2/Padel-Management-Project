// routes/tournamentsRoutes.js
const express = require('express');
const tournamentController = require('../controllers/tournamentsController');
const {validateTournament, validateTournamentId, validateTournamentLocation } = require('../validators/tournamentsDTO');

const router = express.Router();

router.get('/', (req, res) => tournamentController.getAllTournament(req, res));

router.get('/search', (req, res) => tournamentController.searchTournamentById(req, res));

router.get('/add-form', (req, res) => tournamentController.addForm(req, res));

router.get('/:tourId', validateTournamentId, (req, res) => tournamentController.getTournamentById(req, res));

router.get('/edit-form/:tourId', validateTournamentId, (req, res) => tournamentController.editForm(req, res));

router.get('/delete/:tourId', validateTournamentId, (req, res) => tournamentController.deleteTournament(req, res));

router.post('/addTournament', validateTournament, (req, res) => tournamentController.addTournament(req, res));

router.post('/update-tournament/:tourId', [validateTournamentId, validateTournament], (req, res) => tournamentController.updateTournament(req, res));

router.get('/location/:location', validateTournamentLocation, (req, res) => tournamentController.getTournamentByLocation(req, res));

//UPDATE and DELETE
//router.put('/:tourId', [validateTournamentId, validateTournament], (req, res) => tournamentController.updateTournament(req, res));
//router.delete('/:tourId', validateTournamentId, (req, res) => tournamentController.deleteTournament(req, res));

module.exports = router;