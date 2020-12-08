const db = require('./db.js');

function getCardsFromDB(callback) {
    console.log("getCardsFromDB");
    const sql = "SELECT id, suit, number, value FROM card";
    db.sel(sql, callback);
}

function getCardID(values, callback) {
    console.log("getCardsFromDB");
    const sql = "SELECT id FROM card WHERE suit = $1 AND number = $2";
    db.selByValues(sql, values, callback);
}

function getHandFromDB(values, callback) {
    console.log("getHandFromDB");
    const sql = "SELECT c.id, c.suit, c.number, c.value FROM card as c, hand AS h WHERE h.id = $1 AND c.id = ANY($2)";
    db.selByValues(sql, values, callback);
}

function getHandInfo(values, callback) {
    console.log("getHandInfo");
    const sql = "SELECT * FROM hand WHERE gamename = $1 AND username = $2";
    db.selByValues(sql, values, callback);
}

function deleteHandCards(values) {
    console.log("deleteHandCards", values);
    const sql = "DELETE FROM hand WHERE gamename = $1";
    db.del(sql, values);
}

function dealCardsToDB(values) {
    console.log("dealCardsToDB");
    const sql = "INSERT INTO hand (gamename, username, cards) VALUES ($1, $2, $3)";
    db.add(sql, values);
}

function addTrickCard(values) {
    console.log("addTrickCard");
    const sql = "INSERT INTO trick_cards (trickID, cardID, playerName) VALUES ($1, $2, $3)";
    db.add(sql, values);
}

function addTrick(values, callback) {
    console.log("addTrick");
    const sql = "INSERT INTO trick (gameName, roundID, trickNumber) VALUES ($1, $2, $3)";
    db.add(sql, values, callback);
}

function showTrickCards(values, callback) {
    console.log("show trick cards");
    const sql = "SELECT c.id, c.suit, c.number FROM card AS c, trick_cards as t WHERE t.trickid = $1 AND c.id = t.cardID";
    db.selByValues(sql, values, callback);
}

module.exports = {
    getCardsFromDB: getCardsFromDB,
    getCardID: getCardID,
    getHandFromDB: getHandFromDB,
    getHandInfo: getHandInfo,
    deleteHandCards: deleteHandCards,
    dealCardsToDB: dealCardsToDB,
    addTrickCard: addTrickCard,
    addTrick: addTrick,
    showTrickCards: showTrickCards
};