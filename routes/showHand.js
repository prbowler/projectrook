const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://rookplayer:rookplayer@localhost:5432/rook";
const pool = new Pool({connectionString: connectionString});

/* GET home page. */
router.get('/', gethand);

function gethand(req, res, next) {
    console.log('gethand');
    getHandFromDB(function(error, result) {
        //shuffleCards(result);
        //res.json(result);
        res.render('pages/hand', {result: result});
    });
}

function getHandFromDB(callback) {
    console.log("getHandFromDB");
    const sql = "SELECT c.id, c.suit, c.number, c.value FROM card as c, hand_cards AS hc WHERE hc.cardID = c.id AND hc.handID = 1";
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

module.exports = router;