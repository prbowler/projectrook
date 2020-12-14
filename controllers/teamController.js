const teamModel = require("../models/teamModel.js");

function addTeam(req, res) { //INSERT INTO team (gameName, players, team1, team2) VALUES ($1, $2, $3, $4)
    console.log("addTeam");
    let players = req.body.players;
    let team1 = [players[0], players[2]];
    let team2 = [players[1], players[3]];
    let values = [req.body.gameName, players, team1, team2];
    teamModel.addTeam(values, function(error, result) {
        if (!error && result) {
            res.json(result);
        }
    });
}

function getTeam(req, res, callback) { //SELECT * FROM team WHERE gameName = $1
    console.log("getTeam");
    let values = [req.session.game];
    teamModel.getTeam(values, function(error, result) {
        if (!error && result) {
            callback(result);
        } else {
            callback(error);
        }
    });
}

module.exports = {
    addTeam: addTeam,
    getTeam: getTeam
};