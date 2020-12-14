let express = require('express');
let router = express.Router();
const gameController = require("../controllers/gameController.js");
const playerController = require("../controllers/playerController.js");


router.use(function(req, res, next) {
    console.log("check for user");
    if (req.session && req.session.player) {
        console.log("user is logged in");
        next();
    } else {
        console.log("user is not logged in", req.session);
        res.render('pages/login', { title: 'Login' });
    }
});

router.post('/', gameController.showGames);
router.get('/', gameController.showGames);
router.post('/add', gameController.addGame);
router.get('/add', gameController.addGame);
router.post('/get', gameController.getGame);
router.post('/join', gameController.joinGame);



//subscribe https://stackoverflow.com/questions/60115833/how-do-i-refresh-browser-from-server-side-with-node-js
//router.get('/subscribe', gameController.subscribe);

// send refresh event (must start with 'data: ')
//router.get('/refresh', gameController.sendRefresh);


module.exports = router;
