// models/matchesModel.js
const moment = require("moment");

class Matches {
  constructor(matchId, matchDate, score, empId, tourId) {
    this.matchId = matchId;
    this.matchDate = matchDate;
    this.score = score;
    this.empId = empId;
    this.tourId = tourId;
  }

  static fromRow(row) {
    return new Matches(
      row.match_id,       
      moment(row.match_date).format("YYYY-MM-DD HH:mm:SS"), 
      row.score,          
      row.emp_id,
      row.tournament_id
    );
  }
}

module.exports = Matches;