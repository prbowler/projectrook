const db = require('./db.js');

// Hand modules
function addHand(values, callback) {
    console.log("addHand");
    const sql = "INSERT INTO hand (gameName, userName, cards) VALUES ($1, $2, $3)";
    db.add(sql, values, callback);
}

function getHand(values, callback) {
    console.log("getHand");
    const sql = "SELECT * FROM hand WHERE gameName = $1 AND username = $2";
    db.selByValues(sql, values, callback);
}

function updateHand(values, callback) {
    console.log("updateHand");
    const sql = "UPDATE hand SET cards = $1 WHERE gameName = $2 AND username = $3";
    db.add(sql, values, callback);
}

function addToHand(values, callback) {
    console.log("addToHand");
    const sql = "UPDATE hand SET cards = array_append(cards, $1) WHERE gameName = $2 AND username = $3";
    db.add(sql, values, callback);
}

function addArrayToHand(values, callback) {
    console.log("addToHand");
    const sql = "UPDATE hand SET cards = array_cat(cards, $1) WHERE gameName = $2 AND username = $3";
    db.add(sql, values, callback);
}

function subtractFromHand(values, callback) {
    console.log("subtract from hand");
    const sql = "UPDATE hand SET cards = array_remove(cards, $1) WHERE gameName = $2 AND username = $3";
    db.add(sql, values, callback);
}

module.exports = {
    addHand: addHand,
    getHand: getHand,
    updateHand: updateHand,
    addToHand: addToHand,
    addArrayToHand: addArrayToHand,
    subtractFromHand: subtractFromHand
};

/*function updateBidPass(values, callback) {
    console.log("update pass");
    const sql = "UPDATE game SET pass = array_append(pass, $1) WHERE name = $2";
    db.add(sql, values, callback);
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
}*/