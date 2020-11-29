let express = require('express');
let router = express.Router();
const cardController = require("../controllers/cardController.js");

/* GET home page. */
router.get('/', cardController.getCards);
router.get('/showHand', cardController.getHand);

module.exports = router;