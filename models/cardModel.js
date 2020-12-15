const db = require('./db.js');

function getCards(callback) {
    console.log("getCardsFromDB");
    const sql = "SELECT id, suit, number, value FROM card";
    db.sel(sql, callback);
}

function getCardID(values, callback) {
    console.log("getCardsFromDB");
    const sql = "SELECT id FROM card WHERE suit = $1 AND number = $2";
    db.selByValues(sql, values, callback);
}

function getCardIDFSN(values, callback) {
    console.log("getCardsFromDB");
    const sql = "SELECT c.id FROM card AS c, suit as s WHERE s.name = $1 AND s.id = c.suit AND c.number = $2";
    db.selByValues(sql, values, callback);
}

function getCardsFromIDs(values, callback) {
    console.log("getCardsFromIDs");
    const sql = "SELECT id, suit, number, value FROM card WHERE id = ANY($1)";
    db.selByValues(sql, values, callback);
}

module.exports = {
    getCards: getCards,
    getCardID: getCardID,
    getCardsFromIDs: getCardsFromIDs,
    getCardIDFSN: getCardIDFSN
};