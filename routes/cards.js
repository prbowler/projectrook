let express = require('express');
let router = express.Router();
const cardController = require("../controllers/cardController.js");

router.post('/', cardController.getCards);
router.post('/id', cardController.getCardID);
router.post('/fromIDs', cardController.getCardsFromIDs);
router.post('/idFromSN', cardController.getCardIDFSN);

module.exports = router;