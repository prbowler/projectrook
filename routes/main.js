let express = require('express');
let router = express.Router();

const gameController = require("../controllers/gameController.js");
const playerController = require("../controllers/playerController.js");

//Check if user is logged in and if so go to game lounge
router.get('/', playerController.startPage);
//router.post('/', playerController.requireLogin, gameController.showGames);
//router.get('/lounge', gameController.showGames);
//router.get('/table', mainController.setGamName, gameController.requireGameName, mainController.gameTable);

module.exports = router;
