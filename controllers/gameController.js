const gameModel = require("../models/gameModel.js");
let session = require('express-session');
const cardController = require("./cardController.js");
let client = null;

function returnToGame(req, res) {
    console.log("return to the game");
}

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
                bidwinner: req.session.user
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

function checkBid(req, res) {
    console.log("checkBid");
    let gameName = req.session.game[0].name;
    let values = [gameName];
    gameModel.getGameFromDB(values, function(error, result) {
        console.log("bid results ", result.rows[0]);
        res.json(result.rows);
    });
}

function pass(req, res) {
    console.log("pass");
    let gameName = req.session.game[0].name;
    let player = req.session.user;
    let values = [player, gameName];
    gameModel.updateBidPass(values, function(error, result) {
        console.log("bid results ");
        res.json(result);
    });
}

function subscribe(req, res, next) {
    // send headers to keep connection alive
    /*const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);

    // send client a simple response
    res.write('you are subscribed');

    // store `res` of client to let us send events at will
    client = res;

    // listen for client 'close' requests
    req.on('close', () => { client = null; });
    next();*/
    app.get('/sse-server', function (req, res) {
        res.status(200).set({
            "connnection": "keep-alive",
            "cache-control": "no-cache",
            "content-Type": "text/event-stream"
        })
        const data = {
            message: "update"
        }
        setInterval(() => {
            data.timestamp = Date.now()
            res.write('data: update\n\n')
        }, 5000)
    });
}

function sendRefresh(req, res, next) {
    client.write('data: refresh');
    next();
}


module.exports = {
    getGames: getGames,
    getGame: getGame,
    newGame: newGame,
    showGames: showGames,
    joinGame: joinGame,
    bid: bid,
    checkBid: checkBid,
    pass: pass,
    subscribe: subscribe,
    sendRefresh: sendRefresh
};