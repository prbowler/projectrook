var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://rookplayer:rookplayer@localhost:5432/rook";
const pool = new Pool({connectionString: connectionString});

/* GET home page. */
router.get('/', getcards);

function getcards(req, res, next) {
    console.log('Deal');
    getCardsFromDB(function(error, result) {
        console.log("Cards: ", result);
        //let shuffledDeck =
        shuffleCards(result);
        deleteHandCards(1);
        let i = 0;
        let p = 1;
        for (r of result) {
            ++i;
            dealCardsToDB(p, r.id, 1);
            if (i >= 10) { i = 0; p++;}
        }
        res.render('pages/deal', {result: result});
        //res.json(result);
    });
}

function getCardsFromDB(callback) {
    console.log("getCardsFromDB");
    const sql = "SELECT id, suit, number, value FROM card";
    pool.query(sql, function(error, result) {
        if (error) {
            console.log("DataBase error");
            console.log(error);
            callback(error, null);
        }
        console.log("Results: " + JSON.stringify(result.rows));
        callback(null, result.rows);
    });
}

function deleteHandCards(roundID) {
    console.log("deleteHandCards", roundID);
    const sql = "DELETE FROM hand_cards WHERE roundid = 1";
    pool.query(sql, (err, res) => {
        if (err) {
            console.log("DataBase error");
            console.log(err);
        }
    });
}

function dealCardsToDB(handID, cardID, roundID) {
    console.log("dealCardsToDB");
    console.log("handID", handID);
    console.log("cardID", cardID);
    console.log("roundID", roundID);
    const sql = "INSERT INTO hand_cards (handID, cardID, roundID) VALUES ($1, $2, $3)";
    const values = [handID, cardID, roundID];
    pool.query(sql, values, (err, res) => {
        if (err) {
            console.log("DataBase error");
            console.log(err);
        }
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

module.exports = router;