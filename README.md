# padel management system

> A padel management system is an application designed to help employees manage their business in a more organized way, by keeping track of upcoming matches and tournaments all while storing teams, players, employees, and equipment information efficiently. 

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Dependencies](#Dependencies)
-[Key Features](#key-features)
-[Database](#database)

---

## Getting Started

This Node.js API helps store padel business information efficiently and in an organized manner. 
Follow the guide below to set up, run, and deploy the API.

### Prerequisites

- *Node.js* version >= 22.0
- *npm* version >= 6.0
- *MySQLDB*

### Installation

1. Clone the repository:  
   ```bash
   https://github.com/Cilia2/Padel-Management-System.git

### Dependencies

body-parser - Middleware to parse incoming request bodies.
cors - Express middleware for enabling CORS (Cross-Origin Resource Sharing).
dotenv - Module to load environment variables from a .env file.
express - Web application framework for Node.js.
express-validator - Middleware for request validation in Express.
moment - Library for handling dates and times in JavaScript.
mysql2 - MySQL library for Node.js.
nodemon - Utility to monitor changes in your Node.js application and automatically restart the server.

### API Endpoints

#### Equipment API
- `GET /api/equipment` - Get all equipment
- `POST /api/equipment` - Add or create a new equipment
- `GET /api/equipment/:equId` - Get a specific equipment by its personal ID
- `PUT /api/equipment/:equId` - Update a specific equipment's data
- `DELETE /api/equipment/:equId` - Delete a specific equipment

#### Employee API
- `GET /api/employee` - Get all employees
- `POST /api/employee` - Add or create a new employee
- `GET /api/employee/:empId` - Get a specific employee by their personal ID
- `PUT /api/employee/:empId` - Update a specific employee's data
- `DELETE /api/employee/:empId` - Delete a specific employee
- `GET /api/employee/position/:position` - Get all employees with this specific position

#### Tournament API
- `GET /api/tournament` - Get all tournaments
- `POST /api/tournament` - Add or create a new tournament
- `GET /api/tournament/:tourId` - Get a specific tournament by its personal ID
- `PUT /api/tournament/:tourId` - Update a specific tournament's data
- `DELETE /api/tournament/:tourId` - Delete a specific tournament
- `GET /api/tournament/location/:location` - Get all tournaments with this specific location

#### Player API
- `GET /api/player` - Get all players
- `POST /api/player` - Add or create a new player
- `GET /api/player/:playerId` - Get a specific player by their personal ID
- `PUT /api/player/:playerId` - Update a specific player's data
- `DELETE /api/player/:playerId` - Delete a specific player
- `GET /api/player/rank/:rank` - Get all players with this specific rank

#### Match API
- `GET /api/match` - Get all matches
- `POST /api/match` - Add or create a new match
- `GET /api/match/:matchId` - Get a specific match by its personal ID
- `PUT /api/match/:matchId` - Update a specific match's data
- `DELETE /api/match/:matchId` - Delete a specific match
- `GET /api/match/matchDate/:matchDate` - Get all matches with this specific date
- `GET /api/match/tourId/:tourId` - Get all matches for a specific tournament ID

#### Team API
- `GET /api/team` - Get all teams
- `POST /api/team` - Add or create a new team
- `GET /api/team/:teamId` - Get a specific team by its personal ID
- `PUT /api/team/:teamId` - Update a specific team's data
- `DELETE /api/team/:teamId` - Delete a specific team
- `GET /api/team/empId/:empId` - Get all teams with this specific employee ID

### Usage

The Padel Management System is a comprehensive application crafted to empower padel business owners with effective tools for managing and organizing their data. As padel gains rapid popularity worldwide, many businesses are newly established and face the challenge of staying organized while expanding. This system addresses these needs, providing a centralized platform to efficiently handle all aspects of data management at a lower cost and with greater ease. With the Padel Management System, users can effortlessly add, delete, and modify data, navigating through an intuitive interface. The application also offers robust search functionality, enabling users to locate specific information quickly. By streamlining data management, businesses can enhance client engagement and build stronger connections with players. Aligned with the dynamic growth of the padel industry, this system helps businesses thrive by making management more efficient, customer-focused, and adaptable to future needs.

## Testing

The following aspects should be tested:

- Endpoint availability and response validation  
- CRUD operations for each API resource  
- Input validation checks  
- Authorization and error handling cases  
- Edge cases, such as invalid IDs or missing required fields  

#### Testing via Postman  

Example test for the **Employee API**:  

- **Create a new employee (POST request):**  
  ```http
  POST http://localhost:3000/api/employee 
  {
  "empName": "John Doe",
  "empNumber": "12345678",
  "position": "Coach",
  "salary": 500
  }
  
- **Get a new employee (GET request):**  
  ```http
  GET http://localhost:3000/api/employee 

### Contributing

We welcome contributions to improve this project! Please follow the guidelines below if you would like to contribute:

1. **Fork the Repository**: Click on "Fork" at the top of the repository page to create a personal copy of the project.

2. **Clone the Forked Repository**: Clone the repository to your local machine.  
   ```bash
   git clone https://github.com/Cilia2/padelManagementSystem.git

### License

This project is licensed under the MIT License. This means you are free to use, modify, and distribute the code with proper attribution. See the [LICENSE](LICENSE) file for more details.

### Database Schema Description

The database for the Padel Management Syste API is named padel_management_system and consists of the following tables:

#### Tables

1. *employees*
   - Stores information about employees.
   - Columns:
     - employee_id - Primary key, unique identifier for each employee.
     - employee_name stores the name of the employee.
     - employee_number stores the phone number of the employee.
     - position stores the position of the employee (Coach, Manager ...).
     - salary stores the salary of the employee.

2. *equipment*
   - Stores information about each equipment.
   - Columns:
     - equipment_id - Primary key, unique identifier for each equipment.
     - equipment_name - name of the equipment.
     - equipment_type - Type of the equipment.
     - quantity - The quantity available of the equipment.

3. *matches*
- Stores the information about each match
- Columns:
	- match_id - Primary key, unique identifier for each match.
	- match_date - The date when the match is going to occur.
	- score - The match winning score.
	- emp_id - The id of the employee that is going to manage the match.
	- tournament_id - The id of the tournament the match is going to be in. 

4. *players*
- Stores the information about each player
- Columns:
	- player_id - Primary key, unique identifier for each player.
	- player_name - The name of the player
	- player_number - The phone number of the player
	- player_city - The city the player lives in
	- rank - The rank of the player (Beginner, Intermediate ...)
	- match_id - The id of the match the player is playing in

5. *teams*
- Stores the information about each team
- Columns:
	- team_id - Primary key, unique identifier for each team.
	- team_name - The name of the team
	- date_created - The date when the team was formed
	- employee_id - The id of the employee that coaches the team
	- ply_id - The id of the player belonging to that team

6. *tournaments*
- Stores the information about each tournament
- Columns:
	- tournament_id - Primary key, unique identifier for each tournament.
	- tournament_name - The name of the tournament
	- location - The location where the tournament will take place
	- start_date - The start date of the tournament
	- end_date - The end date of the tournament

#### Relationships

- One-to-many relationship between matches and players since many players can participate in one match.
- One-to-many relationship between employees and players because one employee can coach many players.
- One-to-many relationship where one tournament has many matches.
- One-to-many relationship where one employee can track many matches.
- Many to many relationship between players and teams because many players can be in more than one team and one team has more than one player.
