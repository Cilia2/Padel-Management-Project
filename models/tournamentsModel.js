//models/tournamentsModel.js
const moment = require("moment");

class Tournaments{
    constructor(tourId, tourName, location, startDate, endDate){
        this.tourId = tourId;
        this.tourName = tourName;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    static fromRow(row){
        return new Tournaments(
            row.tournament_id,
            row.tournament_name,
            row.location,
            moment(row.start_date).format("YYYY-MM-DD HH:mm:SS"),
            moment(row.end_date).format("YY-MMM-DD hh:mm:ss")
        )
    }
}

module.exports = Tournaments;