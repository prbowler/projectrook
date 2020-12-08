const db = require('./db.js');

function getGamesFromDB(callback) {
    console.log("getGamesFromDB");
    const sql = "SELECT * FROM game";
    db.selByValues(sql, callback);
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

function getBid(values, callback) {
    console.log("getBid");
    const sql = "SELECT bid, bidwinner FROM game WHERE name = $1";
    db.selByValues(sql, values, callback);
}

function updateBid(values, callback) {
    console.log("updateBid");
    const sql = "UPDATE game SET bid = $1, bidwinner = $2 WHERE name = $3";
    db.add(sql, values, callback);
}



function updateTrick(values, callback) {
    console.log("updateBid");
    const sql = "UPDATE trick SET winnerID = $1, points = $2 WHERE gameName = $3 AND roundID = $4 AND tickNumber = $5";
    db.add(sql, values, callback);
}

module.exports = {
    getGamesFromDB: getGamesFromDB,
    getGameFromDB: getGameFromDB,
    deleteGame: deleteGame,
    addGameToDB: addGameToDB,
    getBid: getBid,
    updateBid: updateBid,
    updateTrick: updateTrick
};