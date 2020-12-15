const scoreModel = require("../models/scoreModel.js");

function addScore(req, res) { //INSERT INTO score (gameName) VALUES ($1)
    console.log("addScore");
    let values = [req.body.gameName];
    scoreModel.addScore(values, function(error, result) {
        res.json(result);
    });
}

function getScore(req, res, callback) { //SELECT * FROM score WHERE gameName = $1
    console.log("getScore");
    let values = [req.session.game];
    scoreModel.getScore(values, function(error, result) {
        res.json(result);
    });
}

function setScoreInfo(req, res) { //UPDATE score SET gameScore = $1, roundScore = $2, trickScore = $3 WHERE gameName = $5
    console.log("setScoreInfo");
    let values = [req.body.gameScore, req.body.roundScore, req.body.trickScore, req.session.game];
    scoreModel.setScoreInfo(values, function(error, result) {
        res.json(result);
    });
}

module.exports = {
    addScore: addScore,
    getScore: getScore,
    setScoreInfo: setScoreInfo
};