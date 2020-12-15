const roundModel = require("../models/roundModel.js");

function addRound(req, res) { //INSERT INTO round (gameName) VALUES ($1)
    console.log("addRound");
    let values = [req.body.gameName];
    roundModel.addRound(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function getRound(req, res, callback) { //SELECT * FROM round WHERE gameName = $1
    console.log("getRound");
    let values = [req.session.game];
    roundModel.getRound(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function setRoundInfo(req, res) { //UPDATE round SET round = $1, bid = $2, trump = $3, bidWinner = $4 WHERE gameName = $5
    console.log("setRoundInfo");
    let values = [req.body.round, req.body.bid, req.body.trump, req.body.biddwinner, req.session.game];
    roundModel.setRoundInfo(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function setNewRound(req, res) { //UPDATE round SET round = $1, bid = 0, trump = 5, bidWinner = NULL WHERE gameName = $2
    console.log("updateRound");
    let values = [req.body.round, req.session.game];
    getRound(req, res, function (error, result) {
        let round = result.rows[0].round + 1;
        values = [round, req.session.game];
        roundModel.setNewRound(values, function(error, result) {
            if(!error) {
                res.json(result);
            } else {
                res.json(error);
            }
        });
    });
}

module.exports = {
    addRound: addRound,
    getRound: getRound,
    setRoundInfo: setRoundInfo,
    setNewRound: setNewRound
};