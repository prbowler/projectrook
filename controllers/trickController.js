const trickModel = require("../models/trickModel.js");

function addTrick(req, res) { //INSERT INTO trick (gameName) VALUES ($1)
    console.log("addTrick");
    let values = [req.body.gameName];
    trickModel.addTrick(values, function(error, result) {
        res.json(result);
    });
}

function getTrickCards(req, res, callback) { //SELECT playerCards FROM trick WHERE gameName = $1
    console.log("getTrickCards");
    let values = [req.session.game];
    trickModel.getTrickCards(values, function(error, result) {
        res.json(result);
    });
}

function addCardToTrick(req, res) { //UPDATE trick SET playerCards = array_append(playerCards, $1) WHERE gameName = $2
    console.log("addOneTrick");
    let card = res.body.card;
    let values = [card, req.session.game];
    trickModel.addCardToTrick(values, function(error, result) {
        res.json(result);
    });
}

function updateTrickCards(req, res) { //UPDATE trick SET playerCards = $1 WHERE gameName = $2
    console.log("updateTrickCards");
    let cards = res.body.cards;
    let values = [cards, req.session.game];
    trickModel.updateTrickCards(values, function(error, result) {
        res.json(result);
    });
}

module.exports = {
    addTrick: addTrick,
    getTrickCards: getTrickCards,
    addCardToTrick: addCardToTrick,
    updateTrickCards: updateTrickCards
};
