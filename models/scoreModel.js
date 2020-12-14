const db = require('./db.js');

function addScore(values, callback) {
    console.log("addScore");
    const sql = "INSERT INTO score (gameName) VALUES ($1)";
    db.add(sql, values, callback);
}

function getScore(values, callback) {
    console.log("getScore");
    const sql = "SELECT * FROM score WHERE gameName = $1";
    db.selByValues(sql, values, callback);
}

function setScoreInfo(values, callback) {
    console.log("setScoreInfo");
    const sql = "UPDATE score SET gameScore = $1, roundScore = $2, trickScore = $3 WHERE gameName = $5";
    db.selByValues(sql, values, callback);
}

module.exports = {
    addScore: addScore,
    getScore: getScore,
    setScoreInfo: setScoreInfo
};