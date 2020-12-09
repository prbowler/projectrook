const playerModel = require("../models/playerModel.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;
let session = require('express-session');
let FileStore = require('session-file-store')(session);


function getPlayers(req, res) {
    playerModel.getPlayersFromDB(1, function(error, results) {
        res.json(results);
    });
}

function addPlayer(req, res) {
    let username = req.query.username;
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;
    let email = req.query.email;
    let password = req.query.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        let values = [username, firstName, lastName, email, hash];
        playerModel.addPlayerToDB(values, function(error, results) {
            res.json(results);
        });
    });
    res.render('pages/login', { title: 'Login' });
}

function validatePlayer(req, res) {
    console.log('validatePlayer');
    //let result = {success: false};
    let username = req.body.username;
    console.log('username', username);
    let password = req.body.password;
    console.log('password ', password);
    let values = [username];
    playerModel.getPlayerFromDB(values, function(error, results) {
        bcrypt.compare(password, results.rows[0].password, function (err, result) {
            if (result) {
                req.session.user = req.body.username;
                console.log("user login: ", result);
                res.redirect('/games');
                //res.render('pages/gameLounge', { title: 'Game Lounge' });
            } else {
                res.render('pages/login', { title: 'Login' });
            }
        });
    });
    // Load hash from your password DB.
    //bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        // result == true
    //});
}

function checkForUser(req, res, next) {
    console.log("check for user");
    if (!req.session.user) {
        res.render('pages/login', { title: 'Login' });
    } else {
        console.log("user is logged in as: ", req.session.user);
    }
    next();
}

function logout(req, res, next) {
    console.log("logout");
    if (req.session.user) {
        req.session.destroy();
    }
    res.render('pages/login', { title: 'Login' });
}



module.exports = {
    getPlayers: getPlayers,
    addPlayer: addPlayer,
    validatePlayer: validatePlayer,
    checkForUser: checkForUser,
    logout: logout
};