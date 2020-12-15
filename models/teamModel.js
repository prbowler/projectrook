const db = require('./db.js');

function addTeam(values, callback) {
    console.log("addTeam", values);
    const sql = "INSERT INTO team (gameName, players, team1, team2) VALUES ($1, $2, $3, $4)";
    db.add(sql, values, callback);
}

function getTeam(values, callback) {
    console.log("getPlayerFromDB", values);
    const sql = "SELECT * FROM team WHERE gameName = $1";
    db.selByValues(sql, values, callback);
}

function getGamesOfPlayer(values, callback) {
    console.log("getGamesOfPlayer-team-model");
    const sql = "SELECT gamename FROM team WHERE $1 = ANY(players)";
    db.selByValues(sql, values, callback);
}

module.exports = {
    addTeam: addTeam,
    getTeam: getTeam,
    getGamesOfPlayer: getGamesOfPlayer
};