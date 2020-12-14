const db = require('./db.js');

function addTrick(values, callback) {
    console.log("addTrick");
    const sql = "INSERT INTO trick (gameName) VALUES ($1)";
    db.add(sql, values, callback);
}

function getTrickCards(values, callback) {
    console.log("show trick cards");
    const sql = "SELECT playerCards FROM trick WHERE gameName = $1";
    db.selByValues(sql, values, callback);
}

function addCardToTrick(values, callback) {
    console.log("add card to trick");
    const sql = "UPDATE trick SET playerCards = array_append(playerCards, $1) WHERE gameName = $2";
    db.add(sql, values, callback);
}

function updateTrickCards(values) {
    console.log("update trick cards");
    const sql = "UPDATE trick SET playerCards = $1 WHERE gameName = $2";
    db.add(sql, values);
}

module.exports = {
    addTrick: addTrick,
    getTrickCards: getTrickCards,
    addCardToTrick: addCardToTrick,
    updateTrickCards: updateTrickCards

};