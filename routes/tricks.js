let express = require('express');
let router = express.Router();
const trickController = require("../controllers/trickController.js");

router.post('/', trickController.addTrick);
router.post('/getCards', trickController.getTrickCards);
router.post('/addCard', trickController.addCardToTrick);
router.post('/update', trickController.updateTrickCards);

module.exports = router;
