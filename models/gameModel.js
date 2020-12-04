const db = require('./db.js');

function getGamesFromDB(callback) {
    console.log("getGamesFromDB");
    let player =
    const sql = "SELECT * FROM game";
    db.sel(sql, callback);
}

function getGameFromDB(values, callback) {
    console.log("getGameFromDB");
    const sql = "SELECT * FROM game WHERE name = $1";
    db.selByValues(sql, values, callback);
}

function deleteGame(values, callback) {
    console.log("deleteGame", values.gameName);
    const sql = "DELETE FROM game WHERE id = 1";
    let result = 'deleting game';
    callback(null, result);
}

function addGameToDB(values, callback) {
    console.log("addGameToDB");
    const sql = "INSERT INTO game (name, player1, player2, player3, player4) VALUES ($1, $2, $3, $4, $5)";
    db.add(sql, values, callback);
}

module.exports = {
    getGamesFromDB: getGamesFromDB,
    getGameFromDB: getGameFromDB,
    deleteGame: deleteGame,
    addGameToDB: addGameToDB
};