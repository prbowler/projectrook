const bidModel = require("../models/bidModel.js");

function addBid(req, res) { //INSERT INTO bid (name) VALUES ($1)
    console.log("addBid");
    let values = [req.body.gameName];
    bidModel.addBid(values, function(error, result) {
        res.json(result);
    });
}

function getBid(req, res) { //SELECT * FROM bid WHERE gameName = $1
    console.log("getBid");
    let values = [req.session.game];
    bidModel.getBid(values, function(error, result) {
        res.json(result);
    });
}

function addOneBid(req, res) { //UPDATE bid SET bids = array_append(bids, $1) WHERE gameName = $2
    console.log("addOneBid");
    let bid = {player: req.session.player, bid: req.body.bid};
    let values = [bid, req.session.game];
    bidModel.addOneBid(values, function(error, result) {
        res.json(result);
    });
}

function updateBid(req, res) { //UPDATE bid SET bids = $1 WHERE gameName = $2
    console.log("updateBid");
    let bids = res.query.bids;
    let values = [bids, req.session.game];
    bidModel.updateBid(values, function(error, result) {
        res.json(result);
    });
}

module.exports = {
    addBid: addBid,
    getBid: getBid,
    addOneBid: addOneBid,
    updateBid: updateBid
};