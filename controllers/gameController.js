const gameModel = require("../models/gameModel.js");
let session = require('express-session');
//const cardController = require("./cardController.js");

function getGames(req, res) {
    gameModel.getGamesFromDB(function(error, result) {
        //res.json(result);
        console.log("result: ", result);
        res.render('pages/gameLounge', {games: result.rows});
    });
}

function getGame(gamename, req, res) {
    //let gameName = 'test';
    let values = [gameName];
    gameModel.getGameFromDB(values,function(error, results) {
        res.json(results);
    });
}

function newGame(req, res) {
    let gameName = req.query.gameName;
    let player1 = req.query.player1;
    let player2 = req.query.player2;
    let player3 = req.query.player3;
    let player4 = req.query.player4;
    let values = [gameName, player1, player2, player3, player4];
    gameModel.addGameToDB(values, function(error, results) {
        res.json(results);
    });
}

function showGames(req, res) {
    let result = getGames(req, res);
    res.json(result);
}

function joinGame(req, res) {
    console.log("joinGame");
    let name = req.query.game;
    let values = [name];
    gameModel.getGameFromDB(values, function(error, result) {
        console.log("result: ", result.rows);
        req.session.game = result.rows;
        console.log("session.game: ", req.session.game);
        //res.redirect('/cards/showHand');
        res.render('pages/gameTable', {game: result.rows});
        //res.json(result);
    });
}

function bid(req, res) {
    console.log("bid", req.body.bidAmount);
    let bid = req.body.bidAmount;
    let gameName = req.session.game[0].name;
    console.log("gameName ", gameName)
    let values = [gameName];
    gameModel.getBid(values, function(error, result) {
        console.log("bid results ", result.rows[0].bid);
        if (result && result.rows[0].bid < bid ) {
            let values = [bid, req.session.user, gameName];
            gameModel.updateBid(values, function(error, result) {
                res.json(result);
            });
            result = {
                success: true,
                bid: bid,
                bidwinner: req.sesion.user
            };
        } else {
            result = {
                success: false,
                bid: result.rows[0].bid,
                bidwinner: result.rows[0].bidwinner
            };
        }

        res.json(result);
    });
}

module.exports = {
    getGames: getGames,
    getGame: getGame,
    newGame: newGame,
    showGames: showGames,
    joinGame: joinGame,
    bid: bid
};