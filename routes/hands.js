let express = require('express');
let router = express.Router();
const handController = require("../controllers/handController.js");

/* GET home page. */
router.get('/', handController.addHand);
router.post('/', handController.addHand);
router.post('/get', handController.getHand);
router.get('/update', handController.updateHand);
router.post('/add', handController.addToHand);
router.get('/subtract', handController.subtractFromHand);
//router.post('/deal', handController.dealHands);

module.exports = router;
