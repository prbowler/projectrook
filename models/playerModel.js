const db = require('./db.js');

function getPlayersFromDB(callback) {
    console.log("getPlayersFromDB");
    const sql = "SELECT username, firstName, lastName, email, password FROM player";
    db.sel(sql, callback);
}

function getPlayerFromDB(values, callback) {
    console.log("getPlayerFromDB", values);
    const sql = "SELECT username, password FROM player WHERE username = $1";
    db.selByValues(sql, values, callback);
    //callback(result);
}

function validatePlayerFromDB(values, callback) {
    console.log("validatePlayerFromDB");
    const sql = "SELECT username, password FROM player WHERE username = $1";
    db.selByValues(sql, values, callback);
    //callback(result);
}

function deletePlayer(id, callback) {
    console.log("deleteHandCards", roundID);
    const sql = "DELETE FROM hand_cards WHERE roundid = 1";
    let result = 'deleting player';
    callback(result);
}

function addPlayerToDB(values, callback) {
    console.log("addPlayerToDB", values);
    const sql = "INSERT INTO player (username, firstName, lastName, email, password) VALUES ($1, $2, $3, $4, $5)";
    db.add(sql, values, callback);
}

module.exports = {
    getPlayersFromDB: getPlayersFromDB,
    getPlayerFromDB: getPlayerFromDB,
    addPlayerToDB: addPlayerToDB,
    validatePlayerFromDB: validatePlayerFromDB
};