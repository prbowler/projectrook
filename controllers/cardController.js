const cardModel = require("../models/cardModel.js");

function getCards(req, res) { //SELECT id, suit, number, value FROM card
    console.log('getCards');
    cardModel.getCards(function(error, result) {
        console.log("Cards: ", result);
        shuffleCards(result);
        console.log("Shuffled Cards: ", result);
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function getCardID(req, res) { //SELECT id FROM card WHERE suit = $1 AND number = $2
    console.log("getCardID");
    let values = [req.body.suit, req.body.number];
    cardModel.getCardID(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function getCardIDFSN(req, res) { //SELECT c.id FROM card AS c, suit as s WHERE s.suit = $1 AND s.id = c.suit AND c.number = $2
    console.log("getCardID");
    let values = [req.body.suit, req.body.number];
    cardModel.getCardIDFSN(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function getCardsFromIDs(req, res) { //SELECT id, suit, number, value FROM card WHERE id = ANY($1)
    console.log('getCards');
    let ids = req.body.ids;
    console.log("ids", ids);
    let values = [ids];
    console.log(values);
    cardModel.getCardsFromIDs(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

// Shuffle the cards into a random sequence and return the deck
function shuffleCards(deck) {
    console.log("shuffle cards");
    let i, j, k;
    console.log("Deck: ", deck.list.length);
    let max = deck.list.length;
    for (i = max - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        k = deck.list[i];
        deck.list[i] = deck.list[j];
        deck.list[j] = k;
    }
    return deck;
}

module.exports = {
    getCards: getCards,
    getCardID: getCardID,
    getCardsFromIDs: getCardsFromIDs,
    getCardIDFSN: getCardIDFSN
};

/*//get one hand
function getHand(req, res, next) {
    console.log('getHand');
    console.log("game", req.session.game);
    let game = req.session.game;
    console.log("user: ", req.session.player);
    let username = req.session.player;
    let gamename = req.session.game;
    let values = [gamename, username];
    cardModel.getHand(values, function(error, result) {
        let cards = result.rows[0].cards;
        let id = result.rows[0].id;
        values = [id, cards];
        cardModel.getHand(values, function(error, result) {
            //res.render('pages/game', {game: game, cards: result.rows});
            res.json(result.rows);
        });
    });
}

function playCard(req, res) {
    console.log("playcard ", req.body);
    let number = req.body.number;
    let suitName = req.body.suit;
    let suit = 5;
    if (suitName === 'red') {suit = 1;}
    if (suitName === 'yellow') {suit = 2;}
    if (suitName === 'black') {suit = 3;}
    if (suitName === 'green') {suit = 4;}
    let values = [suit, number];
    cardModel.getCardID(values, function(error, result) {
        console.log("cardid ", result.rows[0].id);
        let value = [1, result.rows[0].id, req.session.player];
        cardModel.addTrickCard(value);
    });

    let result = {
        success:true,
        number: number,
        suitName: suitName,
        suit: suit
    };
    res.json(result);
}

function showTrickCards(req, res) {
    console.log("show trick cards");
    let values = [req.body.trickID];
    cardModel.showTrickCards(values, function(error, result) {
        res.json(result.rows);
    });
}

function newTrick(req,res) {
    console.log("newTrick");
    let gameName = "test";
    let round = 1;
    let trickNumber = 2;
    let values = [gameName, round, trickNumber];
    cardModel.addTrick(values, function(error, result) {
        getCards(req,res);
    });
}

// Shuffle the cards into a random sequence and return the deck
function shuffleCards(deck) {
    let i, j, k;
    console.log("Deck: ", deck.length);
    let max = deck.length;
    for (i = max - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        k = deck[i];
        deck[i] = deck[j];
        deck[j] = k;
    }
    return deck;
}

module.exports = {
    getCards: getCards,
    getHand: getHand,
    playCard: playCard,
    showTrickCards: showTrickCards,
    newTrick: newTrick,
    shuffleCards: shuffleCards
};*/