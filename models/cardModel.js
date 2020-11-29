const db = require('./db.js');

function getCardsFromDB(callback) {
    console.log("getCardsFromDB");
    const sql = "SELECT id, suit, number, value FROM card";
    db.sel(sql, callback);
}

function getHandFromDB(values, callback) {
    console.log("getHandFromDB");
    const sql = "SELECT c.id, c.suit, c.number, c.value FROM card as c, hand AS h WHERE h.id = $1 AND c.id = ANY($2)";
    db.selByValues(sql, values, callback);
}

function getHandInfo(values, callback) {
    console.log("getHnadInfo");
    const sql = "SELECT * FROM hand WHERE gamename = $1 AND username = $2";
    db.selByValues(sql, values, callback);
}

function deleteHandCards(roundID) {
    console.log("deleteHandCards", roundID);
    const sql = "DELETE FROM hand_cards WHERE roundid = 1";
    db.del(sql);
}

function dealCardsToDB(values) {
    console.log("dealCardsToDB");
    const sql = "INSERT INTO hand (gamename, username, cards) VALUES ($1, $2, $3)";
    db.add(sql, values);
}

module.exports = {
    getCardsFromDB: getCardsFromDB,
    getHandFromDB: getHandFromDB,
    getHandInfo: getHandInfo,
    deleteHandCards: deleteHandCards,
    dealCardsToDB: dealCardsToDB
};