let express = require('express');
let router = express.Router();
const scoreController = require("../controllers/scoreController.js");

router.post('/', scoreController.addScore);
router.post('/get', scoreController.getScore);
router.post('/set', scoreController.setScoreInfo);

module.exports = router;
