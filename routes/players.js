let express = require('express');
let router = express.Router();
const playerController = require("../controllers/playerController.js");

//User routes
router.post('/', playerController.addPlayer);
router.post('/getOne', playerController.getPlayer);
router.post('/get', playerController.getPlayers);
router.post('/validate', playerController.validatePlayer);
router.post('/require', playerController.requireLogin);
router.post('/logout', playerController.logout);
router.get('/logout', playerController.logout);
router.post('/user', playerController.getUser);
router.post('/getUsers', playerController.getUsers);

module.exports = router;
