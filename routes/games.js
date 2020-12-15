let express = require('express');
let router = express.Router();
const gameController = require("../controllers/gameController.js");

router.post('/show', gameController.showGames);
router.get('/show', gameController.showGames);
router.post('/add', gameController.addGame);
router.get('/add', gameController.addGame);
router.post('/get', gameController.getGame);
router.post('/join', gameController.joinGame);
router.post('/play', gameController.playGame);



//subscribe https://stackoverflow.com/questions/60115833/how-do-i-refresh-browser-from-server-side-with-node-js
//router.get('/subscribe', gameController.subscribe);

// send refresh event (must start with 'data: ')
//router.get('/refresh', gameController.sendRefresh);


module.exports = router;
