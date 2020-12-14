const db = require('./db.js');

// Game modules
function addGame(values, callback) {
    console.log("addGameToDB");
    const sql = "INSERT INTO game (name) VALUES ($1)";
    db.add(sql, values, callback);
}

function getGames(callback) {
    console.log("getGamesFromDB");
    const sql = "SELECT * FROM game";
    db.sel(sql, callback);
}

function getGame(values, callback) {
    console.log("getGameFromDB");
    const sql = "SELECT * FROM game WHERE name = $1";
    db.selByValues(sql, values, callback);
}

module.exports = {
    addGame: addGame,
    getGames: getGames,
    getGame: getGame
};