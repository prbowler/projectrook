const gameModel = require("../models/gameModel.js");
//const cardController = require("./cardController.js");

function getGames(req, res) {
    gameModel.getGamesFromDB(function(error, result) {
        //res.json(result);
        res.render('pages/gameList', {result: result});
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
    gameModel.getGameFromDB(values, function(error, results) {
        res.render('pages/game', {result: results.rows});
    });
}

module.exports = {
    getGames: getGames,
    getGame: getGame,
    newGame: newGame,
    showGames: showGames,
    joinGame: joinGame
};