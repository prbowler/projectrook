const trickModel = require("../models/trickModel.js");

function addTrick(req, res) { //INSERT INTO trick (gameName) VALUES ($1)
    console.log("addTrick");
    let values = [req.body.gameName];
    trickModel.addTrick(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function getTrickCards(req, res, callback) { //SELECT playerCards FROM trick WHERE gameName = $1
    console.log("getTrickCards");
    let values = [req.session.game];
    trickModel.getTrickCards(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function addCardToTrick(req, res) { //UPDATE trick SET playerCards = array_append(playerCards, $1) WHERE gameName = $2
    console.log("addOneTrick");
    let playerCards = req.session.player + ':' + req.body.card;
    let values = [playerCards, req.session.game];
    trickModel.addCardToTrick(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function updateTrickCards(req, res) { //UPDATE trick SET playerCards = $1 WHERE gameName = $2
    console.log("updateTrickCards");
    let card = req.body.cards;
    let values = [card, req.session.game];
    trickModel.updateTrickCards(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

module.exports = {
    addTrick: addTrick,
    getTrickCards: getTrickCards,
    addCardToTrick: addCardToTrick,
    updateTrickCards: updateTrickCards
};
