let express = require('express');
let router = express.Router();
const bidController = require("../controllers/bidController.js");

router.post('/', bidController.addBid);
router.post('/get', bidController.getBid);
router.post('/addOne', bidController.addOneBid);
router.post('/update', bidController.updateBid);

module.exports = router;
