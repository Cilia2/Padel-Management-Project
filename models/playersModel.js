// models/ playersModel.js
const moment = require("moment");

class Players{
    constructor(playerId, playerName, playerNumber, playerCity, rank, matchId){
        this.playerId = playerId;
        this.playerName = playerName;
        this.playerNumber = playerNumber;
        this.playerCity = playerCity;
        this.rank = rank;
        this.matchId = matchId;
    }

    static fromRow(row){
        return new Players(
            row.player_id,
            row.player_name,
            row.player_number,
            row.player_city,
            row.rank,
            row.match_id
        );
    }
}

module.exports = Players;