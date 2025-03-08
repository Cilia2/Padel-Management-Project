// controllers/teamssController.js
const teamsService = require('../services/teamsService');

class TeamsController {
    async getAllTeams(req, res) {
        try {
            const team = await teamsService.getAllTeams();
            //res.json(teams);
            const data = {
                teams: team
            }
            res.render('teams', data);
        } catch (error) {
            console.error('Error fetching teams:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getTeamById(req, res) {
        try {
            const teamId = parseInt(req.params.teamId, 10);
            const team = await teamsService.getTeamById(teamId);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.json(team);
        } catch (error) {
            console.error('Error fetching team:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async addTeam(req, res) {
        try {
            const { teamName, dateCreated, empId, plyId } = req.body;
            console.log('Received team data:', req.body);
            if (!teamName || !dateCreated || !empId || !plyId) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const newTeam = await teamsService.addTeam({ teamName, dateCreated, empId, plyId });
            //res.status(201).json(newTeam);
            res.redirect('/api/team');
        } catch (error) {
            console.error('Error creating team:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateTeam(req, res) {
        try {
            const teamId = parseInt(req.params.teamId, 10);
            const { teamName, dateCreated, empId, plyId } = req.body;
            const success = await teamsService.updateTeam(teamId, { teamName, dateCreated, empId, plyId });
            if (!success) {
                return res.status(404).json({ message: 'Team not found or no changes made' });
            }
            //res.json({ message: 'Team updated successfully' });
            res.redirect('/api/team');
        } catch (error) {
            console.error('Error updating team:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteTeam(req, res) {
        try {
            const teamId = parseInt(req.params.teamId, 10);
            const success = await teamsService.deleteTeam(teamId);
            if (!success) {
                //return res.status(404).json({ message: 'Team not found' });
                console.log('Error deleting team.');
            }
            //res.json({ message: 'Team deleted successfully' });
            res.redirect('/api/team');
        } catch (error) {
            console.error('Error deleting team:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getTeamByEmployeeId(req, res) {
        try {
            const empId = req.params.empId;
            const teams = await teamsService.getTeamByEmployeeId(empId);
            if (!teams || teams.length == 0) {
                return res.status(404).json({ message: 'No teams found with this employee Id' });
            }
            res.json(teams);
        } catch (error) {
            console.error('Error fetching teams by employee Id:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async editForm(req, res) {
        try {
            const teamId = parseInt(req.params.teamId, 10);
            const team = await teamsService.getTeamById(teamId);
            res.render('editTeam', {team: team});
        } catch (error) {
            console.error('Error updating team:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async addForm(req, res){
        res.render('addTeam');
    }

    async searchTeamById(req, res) {
        try {
            const teamId = parseInt(req.query.teamId, 10);  
            console.log('Searching for team with ID:', teamId);
            if (isNaN(teamId)) {
                return res.status(400).json({ message: 'Invalid team ID' });
            }

            const team = await teamsService.getTeamById(teamId);
            const teams = team ? [team] : [];
            console.log('Team found:', teams);
            
            res.render('teams', { teams });
        } catch (error) {
            console.error('Error searching for team:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new TeamsController();