const playerModel = require("../models/playerModel.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

function addPlayer(req, res) { //INSERT INTO player (username, password) VALUES ($1, $2)
    console.log("addPlayer");
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        let values = [username, hash];
        playerModel.addPlayer(values, function(error, results) {
            if (!error && results) {
                console.log("new player results", results);
                req.session.player = username;
                req.session.save(function(err) {
                    if (!err) {
                        res.redirect('/');
                    } else {
                        res.render('pages/login', {title: 'Login'});
                    }
                });
            } else {
                console.log("could not add player");
                res.render('pages/login', { title: 'Login' });
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
            res.render('pages/login', { title: 'Login' });
        } else {
            bcrypt.compare(password, results.rows[0].password, function (err, result) {
                if (!error && result) {
                    req.session.player = username;
                    //res.cookie('user', req.body.username);
                    console.log("user login: ", result);
                    console.log("req.session.player ", req.session.player);
                    req.session.save(function(err) {
                        if (!err) {
                            res.redirect('/');
                        } else {
                            res.render('pages/login', {title: 'Login'});
                        }
                    });

                    //result = {success: true};
                    //callback(null, result);
                } else {
                    res.render('pages/login', { title: 'Login' });
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
    req.session.destroy();
    res.redirect('/');
}

function getUser (req, res) {
    let result = {user: req.session.player};
    console.log("user", req.session.player);
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
        res.json(results);
    });
}

module.exports = {
    addPlayer: addPlayer,
    getPlayer: getPlayer,
    getPlayers: getPlayers,
    validatePlayer: validatePlayer,
    requireLogin: requireLogin,
    logout: logout,
    getUser: getUser,
    getUsers: getUsers
};