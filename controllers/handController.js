const handModel = require("../models/handModel.js");

function addHand(req, res) { //INSERT INTO hand (gameName, userName, cards) VALUES ($1, $2, $3)
    console.log("addHand");
    let values = [req.body.gameName, req.body.player, req.body.cards];
    handModel.addHand(values, function (error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function getHand(req, res) { //SELECT * FROM hand WHERE gameName = $1 AND username = $2
    console.log("getHand", req.session.game + req.session.player);
    let values = [req.session.game, req.session.player];
    handModel.getHand(values, function (error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function getHandWidow(req, res) { //SELECT * FROM hand WHERE gameName = $1 AND username = $2
    console.log("getHandWidow", req.session.game + 'widow');
    let values = [req.session.game, 'widow'];
    handModel.getHand(values, function (error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function getHandTrick(req, res) { //SELECT * FROM hand WHERE gameName = $1 AND username = $2
    console.log("getHandTrick", req.session.game + 'trick');
    let values = [req.session.game, 'trick'];
    handModel.getHand(values, function (error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function updateHand(req, res) { //UPDATE hand SET cards = $1 WHERE gameName = $2 AND username = $3
    console.log("updateHand");
    let values = [req.body.cards, req.session.game, req.session.player];
    handModel.updateHand(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function updatePlayerHand(req, res) { //UPDATE hand SET cards = $1 WHERE gameName = $2 AND username = $3
    console.log("updateHand");
    let values = [req.body.cards, req.session.game, req.body.player];
    handModel.updateHand(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function addToHand(req,res) { //UPDATE hand SET cards = array_append(cards, $1) WHERE gameName = $2 AND username = $3
    console.log("addToHand");
    let values = [req.body.card, req.session.game, req.session.player];
    handModel.addToHand(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function addWidow(req,res) { //UPDATE hand SET cards = array_append(cards, $1) WHERE gameName = $2 AND username = $3
    console.log("addWidow");
    let values = [req.body.cards, req.session.game, req.body.player];
    handModel.addArrayToHand(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function addToTrick(req,res) { //UPDATE hand SET cards = array_append(cards, $1) WHERE gameName = $2 AND username = $3
    console.log("addCardToTrick");
    let values = [req.body.card, req.session.game, 'trick'];
    handModel.addToHand(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function addToWidow(req,res) { //UPDATE hand SET cards = array_append(cards, $1) WHERE gameName = $2 AND username = $3
    console.log("addToWidow");
    let values = [req.body.card, req.session.game, 'widow'];
    handModel.addToHand(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

function subtractFromHand(req, res) { //UPDATE hand SET cards = array_remove(cards, $1) WHERE gameName = $2 AND username = $3
    console.log("subtract from hand");
    let values = [req.body.card, req.session.game, req.session.player];
    handModel.subtractFromHand(values, function(error, result) {
        if(!error) {
            res.json(result);
        } else {
            res.json(error);
        }
    });
}

module.exports = {
    addHand: addHand,
    getHand: getHand,
    getHandWidow: getHandWidow,
    getHandTrick: getHandTrick,
    updateHand: updateHand,
    updatePlayerHand: updatePlayerHand,
    addToHand: addToHand,
    addWidow: addWidow,
    subtractFromHand: subtractFromHand,
    addToTrick: addToTrick,
    addToWidow: addToWidow
};

/*
function setupHand(req, res) {
    let player = req.session.player;
    let gameName = req.session.game;
    let p1 = req.body.p1;
    let p2 = req.body.p2
}

function dealHands(req, res) {
    const gameName = req.body.gameName;
    const players = req.body.players;
    const cards = req.body.cards;
    addHand([gameName, players[0], getID(cards, 0, 10)], req, res);
    addHand([gameName, players[1], getID(cards, 10, 20)], req, res);
    addHand([gameName, players[2], getID(cards, 20, 30)], req, res);
    addHand([gameName, players[3], getID(cards, 30, 40)], req, res);
    addHand([gameName, players[4], getID(cards, 40, 45)], req, res);
}

function getID(result, start, stop) {
    let cards = result.slice(start, stop);
    let ids = [];
    for (const c of cards) {
        ids.push(c.id);
    }
    return ids;
}

*/