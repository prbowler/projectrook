const cardModel = require("../models/cardModel.js");

function getCards(req, res, next) {
    console.log('Deal');
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
        let gamename = 'test';
        let username = 'prbowler';
        let cards = h1;
        let values = [gamename, username, cards];
        cardModel.dealCardsToDB(values);
        gamename = 'test';
        username = 'bobo';
        cards = h2;
        values = [gamename, username, cards];
        cardModel.dealCardsToDB(values);
        gamename = 'test';
        username = 'momo';
        cards = h3;
        values = [gamename, username, cards];
        cardModel.dealCardsToDB(values);
        gamename = 'test';
        username = 'test';
        cards = h4;
        values = [gamename, username, cards];
        cardModel.dealCardsToDB(values);
        gamename = 'test';
        username = 'widow';
        cards = h5;
        values = [gamename, username, cards];
        cardModel.dealCardsToDB(values);
        getHand(req, res, next);
        //res.json(result);
    });
}

//get one hand
function getHand(req, res, next) {
    console.log('getHand');
    let gamename = 'test';
    let username = 'prbowler';
    let values = [gamename, username];
    cardModel.getHandInfo(values, function(error, result) {
        let cards = result.rows[0].cards;
        let id = result.rows[0].id;
        values = [id, cards];
        cardModel.getHandFromDB(values, function(error, result) {
            //res.render('pages/hand', {result: result.rows});
            res.json(result.rows);
        });
    });

    //cardModel.getHandFromDB(values, function(error, result) {
     //   res.render('pages/hand', {result: result});
    //});
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