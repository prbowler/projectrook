let express = require('express');
let router = express.Router();
const handController = require("../controllers/handController.js");

router.get('/', handController.addHand);
router.post('/', handController.addHand);
router.post('/get', handController.getHand);
router.get('/update', handController.updateHand);
router.post('/add', handController.addToHand);
router.post('/subtract', handController.subtractFromHand);
router.post('/addToTrick', handController.addToTrick);
router.post('/addToWidow', handController.addToWidow);
router.post('/getTrick', handController.getHandTrick);
router.post('/getWidow', handController.getHandWidow);

module.exports = router;