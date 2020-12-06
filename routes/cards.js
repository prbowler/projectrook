let express = require('express');
let router = express.Router();
const cardController = require("../controllers/cardController.js");
const playerController = require("../controllers/playerController");

/* GET home page. */
router.get('/', cardController.getCards);
router.get('/showHand', playerController.checkForUser, cardController.getHand);
router.post('/', cardController.getCards);
router.post('/showHand', playerController.checkForUser, cardController.getHand);

module.exports = router;