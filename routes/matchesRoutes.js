// routes/matchesRoutes.js
const express = require('express');
const matchesController = require('../controllers/matchesController');
const { validateMatch, validateMatchId, validateEmployeeId, validateTournamentId, validateMatchDate } = require('../validators/matchesDTO');

const router = express.Router();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));

router.get('/search', (req, res) => matchesController.searchMatchById(req, res));

router.get('/add-form', (req, res) => matchesController.addForm(req, res));

router.get('/:matchId', validateMatchId, (req, res) => matchesController.getMatchById(req, res));

router.get('/edit-form/:matchId', validateMatchId, (req, res) => matchesController.editForm(req, res));

router.get('/delete/:matchId', validateMatchId, (req, res) => matchesController.deleteMatch(req, res));

router.post('/addMatch', [validateMatch, validateEmployeeId, validateTournamentId], (req, res) => matchesController.addMatch(req, res));

router.post('/update-match/:matchId', [validateMatch, validateMatchId, validateEmployeeId, validateTournamentId], (req, res) => matchesController.updateMatch(req, res));

router.get('/matchDate/:matchDate', validateMatchDate, (req, res) => matchesController.getMatchByDate(req, res));

router.get('/tourId/:tourId', validateTournamentId, (req, res) => matchesController.getMatchByTournamentId(req, res));

//DELETE and UPDATE 
//router.put('/:matchId', [validateMatch, validateMatchId, validateEmployeeId, validateTournamentId], (req, res) => matchesController.updateMatch(req, res));
//router.delete('/:matchId', validateMatchId, (req, res) => matchesController.deleteMatch(req, res));
module.exports = router;