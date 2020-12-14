const db = require('./db.js');

function addPlayer(values, callback) {
    console.log("addPlayer", values);
    const sql = "INSERT INTO player (username, password) VALUES ($1, $2)";
    db.add(sql, values, callback);
}

function getPlayers(callback) {
    console.log("getPlayers");
    const sql = "SELECT username, password FROM player";
    db.sel(sql, callback);
}

function getPlayer(values, callback) {
    console.log("getPlayer", values);
    const sql = "SELECT username, password FROM player WHERE username = $1";
    db.selByValues(sql, values, callback);
}

function getUser(values, callback) {
    console.log("getUser");
    const sql = "SELECT username FROM player WHERE username = $1";
    db.selByValues(sql, values, callback);
}

function getUsers(callback) {
    console.log("getUsers");
    const sql = "SELECT username FROM player";
    db.sel(sql, callback);
}

module.exports = {
    addPlayer: addPlayer,
    getPlayers: getPlayers,
    getPlayer: getPlayer,
    getUser: getUser,
    getUsers: getUsers
};