// routes/playerRoutes.js
const express = require('express');
const playersController = require('../controllers/playersController');
const { validatePlayer, validatePlayerId, validateMatchId, validatePlayerRank } = require('../validators/playersDTO');

const router = express.Router();

router.get('/', (req, res) => playersController.getAllPlayers(req, res));

router.get('/search', (req, res) => playersController.searchPlayerById(req, res));

router.get('/add-form', (req, res) => playersController.addForm(req, res));

router.get('/:playerId', validatePlayerId, (req, res) => playersController.getPlayerById(req, res));

router.get('/edit-form/:playerId', validatePlayerId, (req, res) => playersController.editForm(req, res));

router.get('/delete/:playerId', validatePlayerId, (req, res) => playersController.deletePlayer(req, res));

router.get('/rank/:rank', validatePlayerRank, (req, res) => playersController.getPlayerByRank(req, res));

router.post('/addPlayer', [validatePlayer, validateMatchId], (req, res) => playersController.addPlayer(req, res));

router.post('/update-player/:playerId', [validatePlayerId, validatePlayer, validateMatchId], (req, res) => playersController.updatePlayer(req, res));

//PUT/DELETE 
//router.put('/:playerId', [validatePlayerId, validatePlayer, validateMatchId], (req, res) => playersController.updatePlayer(req, res));
//router.delete('/:playerId', validatePlayerId, (req, res) => playersController.deletePlayer(req, res));

module.exports = router;
