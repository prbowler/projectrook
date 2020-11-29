let express = require('express');
let router = express.Router();
const gameController = require("../controllers/gameController.js");

/* GET users listing. */
router.get('/', gameController.getGames);

router.get('/newGame', function(req, res, next) {
    console.log('newGame');
    res.render('pages/newGame', { title: 'New Game' });
});

router.get('/show', gameController.showGames);
router.get('/create', gameController.newGame);
router.get('/join', gameController.joinGame);


module.exports = router;