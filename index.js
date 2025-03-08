const express = require('express');
const dotenv = require('dotenv');
const equipmentRoutes = require('./routes/equipmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const playersRoutes = require('./routes/playersRoutes');
const tournamentsRoutes = require('./routes/tournamentsRoutes');
const matchesRoutes = require('./routes/matchesRoutes');
const teamsRoutes = require('./routes/teamsRoutes');
const employeeController = require('./controllers/employeeController');
const ejs = require("ejs");

dotenv.config();

const app = express();
// initialize the template engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parses incoming JSON requests
app.use(express.static('public'));

app.use('/api/equipment', equipmentRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/player', playersRoutes);
app.use('/api/tournament', tournamentsRoutes);
app.use('/api/match', matchesRoutes);
app.use('/api/team', teamsRoutes);

// Homepage route - Render home.ejs
app.get('/', (req, res) => {
    res.render('home'); // Will render the home.ejs file
});

// Route to render Sign In page
app.get('/signin', (req, res) => {
    res.render('signin', { error: null }); // Pass null as the error initially
});

app.get('/signup', (req, res) => {
    res.render('signup', { error: null }); // Pass an empty error variable
});

app.post('/signup', (req, res) => employeeController.signup(req, res));

app.get('/about', (req, res) => {
    res.render('about'); // Renders the about.ejs template
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});
  
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});