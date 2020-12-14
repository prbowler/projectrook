const db = require('./db.js');

// Bid modules
function addBid(values, callback) {
    console.log("addBid");
    const sql = "INSERT INTO bid (gameName) VALUES ($1)";
    db.add(sql, values, callback);
}

function getBid(values, callback) {
    console.log("getBid");
    const sql = "SELECT * FROM bid WHERE gameName = $1";
    db.selByValues(sql, values, callback);
}

function addOneBid(values, callback) {
    console.log("updateBid");
    const sql = "UPDATE bid SET bids = array_append(bids, $1) WHERE gameName = $2";
    db.add(sql, values, callback);
}

function updateBid(values, callback) {
    console.log("update pass");
    const sql = "UPDATE bid SET bids = $1 WHERE gameName = $2";
    db.add(sql, values, callback);
}

module.exports = {
    addBid: addBid,
    getBid: getBid,
    addOneBid: addOneBid,
    updateBid: updateBid
};