// routes/teamsRoutes.js
const express = require('express');
const teamsController = require('../controllers/teamsController');
const { validateTeam, validateTeamId, validateEmployeeId, validatePlayerId } = require('../validators/teamsDTO');

const router = express.Router();

router.get('/', (req, res) => teamsController.getAllTeams(req, res));

router.get('/search', (req, res) => teamsController.searchTeamById(req, res));

router.get('/add-form', (req, res) => teamsController.addForm(req, res));

router.get('/:teamId', validateTeamId, (req, res) => teamsController.getTeamById(req, res));

router.get('/edit-form/:teamId', validateTeamId, (req, res) => teamsController.editForm(req, res));

router.get('/delete/:teamId', validateTeamId, (req, res) => teamsController.deleteTeam(req, res));

router.post('/addTeam', [validateTeam, validateEmployeeId, validatePlayerId], (req, res) => teamsController.addTeam(req, res));

router.post('/update-team/:teamId', [validateTeam, validateTeamId, validateEmployeeId, validatePlayerId], (req, res) => teamsController.updateTeam(req, res));

router.get('/empId/:empId', validateEmployeeId, (req, res) => teamsController.getTeamByEmployeeId(req, res));

//UPDATE and DELETE
//router.put('/:teamId', [validateTeam, validateTeamId, validateEmployeeId, validatePlayerId], (req, res) => teamsController.updateTeam(req, res));
//router.delete('/:teamId', validateTeamId, (req, res) => teamsController.deleteTeam(req, res));

module.exports = router;