const db = require('./db.js');

function addRound(values, callback) {
    console.log("addRound");
    const sql = "INSERT INTO round (gameName) VALUES ($1)";
    db.add(sql, values, callback);
}

function getRound(values, callback) {
    console.log("getRound");
    const sql = "SELECT * FROM round WHERE gameName = $1";
    db.selByValues(sql, values, callback);
}

function setRoundInfo(values, callback) {
    console.log("setRoundInfo");
    const sql = "UPDATE round SET round = $1, bid = $2, trump = $3, bidWinner = $4 WHERE gameName = $5";
    db.selByValues(sql, values, callback);
}

function setNewRound(values, callback) {
    console.log("setNewRound");
    const sql = "UPDATE round SET round = $1, bid = 0, trump = 5, bidWinner = NULL WHERE gameName = $2";
    db.selByValues(sql, values, callback);
}

module.exports = {
    addRound: addRound,
    getRound: getRound,
    setRoundInfo: setRoundInfo,
    setNewRound: setNewRound
};