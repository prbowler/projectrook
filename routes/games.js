let express = require('express');
let router = express.Router();
const gameController = require("../controllers/gameController.js");
const playerController = require("../controllers/playerController.js");

/* GET users listing. */

//Check if user is logged in and if so go to game lounge
router.get('/', playerController.checkForUser, gameController.getGames);

router.get('/newGame', function(req, res, next) {
    console.log('newGame');
    res.render('pages/newGame', { title: 'New Game' });
});

router.get('/show', gameController.showGames);
router.get('/create', gameController.newGame);
router.get('/join', gameController.joinGame);
router.post('/bid', gameController.bid);


module.exports = router;