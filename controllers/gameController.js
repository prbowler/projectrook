const gameModel = require("../models/gameModel.js");

function addGame(req, res) { //INSERT INTO game (name) VALUES ($1)
    console.log("game name: ", req.body.gameName);
    let gameName = req.body.gameName;
    let values = [gameName];
    gameModel.addGame(values, function(error, results) {
        console.log("error",error);
        console.log("results", results);
        res.json(results);
    });
}

function showGames(req, res) { //SELECT * FROM game
    gameModel.getGames(function(error, result) {
        if (!error && result.rows) {
            res.render('pages/gameLounge', {games: result.rows});
        } else {
            console.log("error showing games");
        }
    });
}

function getGame(req, res, callback) { //SELECT * FROM game WHERE name = $1
    let gameName = req.session.game;
    let values = [gameName];
    gameModel.getGame(values,function(error, results) {
        callback(results);
    });
}

function joinGame(req, res) {
    console.log("joinGame");
    let result = {
        success: false
    };
    let player = req.session.player;
    let gameName = req.body.gameName;
    console.log("player ", player);
    console.log("gameName ", gameName);
    req.session.game = gameName;
    req.session.save(function(err) {
        if (!err) {
            res.redirect('/');
        } else {
            res.render('pages/login', {title: 'Login'});
        }
    });
    if (player && gameName) {
        result = {
            success: true,
            player: player,
            gameName: gameName,
            joined: true
        }
    }
    //callback(null, result);
    res.render('pages/gameTable', result);
}

module.exports = {
    addGame: addGame,
    showGames: showGames,
    getGame: getGame,
    joinGame: joinGame
};

/*

function bid(req, res) {
    console.log("bid", req.body.bidAmount);
    let bid = req.body.bidAmount;
    let gameName = req.session.game[0].name;
    let player = req.session.player;
    let stringBids = player + ": " + bid;
    //let stringBids = "hellow";
    let bids = [stringBids];
    console.log("gameName ", gameName);
    let values = [bid, player, stringBids, gameName];
    gameModel.updateBid(values, function(error, result) {
        console.log(result);
        res.json(result);
    });
    gameModel.getBid(values, function(error, result) {
        console.log("bid results ", result.rows[0].bid);
        if (result && result.rows[0].bid < bid ) {
            let values = [bid, req.session.player, gameName];
            gameModel.updateBid(values, function(error, result) {
                res.json(result);
            });
            result = {
                success: true,
                bid: bid,
                bidwinner: req.session.player
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
    gameModel.getGame(values, function(error, result) {
        console.log("bid results ", result.rows[0]);
        res.json(result.rows);
    });
}

function pass(req, res) {
    console.log("pass");
    let gameName = req.session.game[0].name;
    let player = req.session.player;
    let values = [player, gameName];
    gameModel.update(values, function(error, result) {
        console.log("bid results ");
        res.json(result);
    });
}

function subscribe(req, res, next) {
    // send headers to keep connection alive
    const headers = {
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
    next();
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

function setGameName(req, res, next) {
    console.log("setGameName", req.query.game);
    if (!req.query.game) {
        res.redirect('/lounge');
    } else {
        gameName = req.query.game;
        req.session.game = gameName;
        console.log("gameName: ", gameName);
        next();
    }
}

function requireGamName(req, res, next) {
    console.log("check for gameName");
    if (req.session && req.session.game) {
        next();
    } else {
        res.redirect('/games');
    }
}

module.exports = {
    getGame: getGame,
    newGame: newGame,
    showGames: showGames,
    joinGame: joinGame,
    bid: bid,
    checkBid: checkBid,
    pass: pass,
    subscribe: subscribe,
    sendRefresh: sendRefresh,
    setGamName: setGameName,
    requireGameName: requireGamName
};*/