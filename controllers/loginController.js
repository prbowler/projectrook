const playerModel = require("../models/playerModel.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

function validatePlayer(req, res) {
    console.log('validatePlayer');
    let player = req.body.username;
    let password = req.body.password;
    let values = [player];
    let result = {success: false};
    playerModel.getPlayer(values, function(error, results) {
        console.log(result);
        if (!error && results.list.length > 0) {
            bcrypt.compare(password, results.list[0].password, function (error, bcrypt_result) {
                console.log("validateresult", bcrypt_result);
                if (bcrypt_result) {
                    req.session.player = player;
                    result = {
                        success: true,
                        player: player
                    };
                }
                res.json(result);
            });
        }
    });
}

function handleLogout(req, res) {
    let result = {success: false};

    if (req.session.player) {
        req.session.destroy();
        result = {success: true};
    }

    res.json(result);
}

function verifyLogin(req, res, next) {
    if (req.session.player) {
        next();
    } else {
        let result = {success:false, message: "Access Denied"};
        res.status(401).json(result);
    }
}

function startPage(req, res) {
    res.render('pages/index', { title: 'Home' });
}

function loginPage(req, res) {
    res.render('pages/login');
}

module.exports = {
    validatePlayer: validatePlayer,
    handleLogout: handleLogout,
    verifyLogin: verifyLogin,
    startPage: startPage,
    loginPage: loginPage
};
