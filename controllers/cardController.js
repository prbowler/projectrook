const cardModel = require("../models/cardModel.js");
let session = require('express-session');

function getCards(req, res, next) {
    console.log('Deal');
    console.log("req.session.game", req.session.game[0].name);
    let gamename = req.session.game[0].name;
    console.log("session game name: ", gamename);
    cardModel.getCardsFromDB(function(error, result) {
        console.log("Cards: ", result);
        shuffleCards(result);
        let h1 = [];
        let h2 = [];
        let h3 = [];
        let h4 = [];
        let h5 = [];

        for (let i = 0; i < 10; i++) {
            h1.push(result[i].id);
            h2.push(result[i + 10].id);
            h3.push(result[i + 20].id);
            h4.push(result[i + 30].id);
            if (i < 5) { h5.push(result[i + 40].id); }
        }

        let username = req.session.game[0].player1;
        let cards = h1;
        let values = [gamename, username, cards];
        cardModel.dealCardsToDB(values);
        username = req.session.game[0].player2;
        cards = h2;
        values = [gamename, username, cards];
        cardModel.dealCardsToDB(values);
        username = req.session.game[0].player3;
        cards = h3;
        values = [gamename, username, cards];
        cardModel.dealCardsToDB(values);
        username = req.session.game[0].player4;
        cards = h4;
        values = [gamename, username, cards];
        cardModel.dealCardsToDB(values);
        username = 'widow';
        cards = h5;
        values = [gamename, username, cards];
        cardModel.dealCardsToDB(values);
        console.log("deal result: ", result);
        res.json(result);
    });
}

//get one hand
function getHand(req, res, next) {
    console.log('getHand');
    console.log("game", req.session.game);
    let game = req.session.game;
    console.log("user: ", req.session.user);
    let username = req.session.user;
    let gamename = req.session.game[0].name;
    let values = [gamename, username];
    cardModel.getHandInfo(values, function(error, result) {
        let cards = result.rows[0].cards;
        let id = result.rows[0].id;
        values = [id, cards];
        cardModel.getHandFromDB(values, function(error, result) {
            //res.render('pages/game', {game: game, cards: result.rows});
            res.json(result.rows);
        });
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
    shuffleCards: shuffleCards
};