const playerModel = require("../models/playerModel.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;



function addPlayer(req, res) { //INSERT INTO player (username, password) VALUES ($1, $2)
    console.log("addPlayer");
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        let values = [username, hash];
        playerModel.addPlayer(values, function(error, result) {
            if (!error && result) {
                result = {success: true};
                req.session.player = username;
                res.render('pages/gameLounge', { title: 'Game Lounge' });
                //res.json(result);
            } else {
                res.json(error);
            }
        });
    });
}

function getPlayer(req, res, callback) { //SELECT username, password FROM player WHERE username = $1
    let values = [res.session.player];
    playerModel.getPlayer(values, function(error, results) {
        callback(null, results);
    });
}

function getPlayers(req, res) { //SELECT username, password FROM player
    playerModel.getPlayers(1, function(error, results) {
        res.json(results);
    });
}

function validatePlayer(req, res) {
    console.log('validatePlayer');
    let username = req.body.username;
    let password = req.body.password;
    let values = [username];
    playerModel.getPlayer(values, function(error, results) {
        console.log(results.rows.length);
        if (error || !results.rows.length) {
            res.json(error);
        } else {
            bcrypt.compare(password, results.rows[0].password, function (error, result) {
                if (!error && result) {
                    req.session.player = username;
                    result = {success: true};
                    //res.json(result);
                    res.render('pages/gameLounge', { title: 'Game Lounge' });
                } else {
                    res.json(error);
                }
            });
        }
    });
}

function requireLogin(req, res, next) {
    console.log("check for user");
    if (req.session && req.session.player) {
        console.log("user is logged in");
        next();
    } else {
        console.log("user is not logged in", req.session);
        res.render('pages/login', { title: 'Login' });
    }
}

function logout(req, res) {
    console.log("logout");
    let result = {success: false};
    if (req.session.player) {
        req.session.destroy();
        result = {success: true};
    }
    res.render('pages/index', { title: 'Home' });
}

function getUser (req, res) {
    let result = {player: req.session.player};
    console.log("server result", result);
    res.json(result);
}

/*function getUser(req, res, callback) {
    console.log("getUser");
    let values = [req.session.player];
    playerModel.getUser(values, function(error, result) {
        if (!error && result) {
            res.json(result);
        } else {
            callback(error);
        }
    });
}*/

function getUsers(req, res, callback) {
    console.log("getUsers");
    playerModel.getUsers(function(error, results) {
        console.log("server results: ", results);
        callback(error, results);
    });
}

function startPage(req, res) {
    res.render('pages/index', { title: 'Home' });
}

function login(req, res) {
    res.render('pages/login');
}

module.exports = {
    addPlayer: addPlayer,
    getPlayer: getPlayer,
    getPlayers: getPlayers,
    validatePlayer: validatePlayer,
    requireLogin: requireLogin,
    logout: logout,
    getUser: getUser,
    getUsers: getUsers,
    startPage: startPage,
    login: login
};