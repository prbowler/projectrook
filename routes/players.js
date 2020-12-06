let express = require('express');
let router = express.Router();
const playerController = require("../controllers/playerController.js");

//User routes
router.get('/', playerController.getPlayers);
router.post('/', playerController.getPlayers);
router.post('/validate', playerController.validatePlayer);
router.get('/create', playerController.addPlayer);
router.get('/add', function(req, res, next) {
    console.log("addPlayer");
    res.render('pages/newPlayer', { title: 'New Player' });
});
router.get('/login', function(req, res, next) {
    console.log("login");
    res.render('pages/login', { title: 'Login' });
});
router.get('/logout', playerController.logout);

module.exports = router;
