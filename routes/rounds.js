let express = require('express');
let router = express.Router();
const roundController = require("../controllers/roundController.js");

router.post('/', roundController.addRound);
router.post('/get', roundController.getRound);
router.post('/set', roundController.setRoundInfo);
router.post('/setNew', roundController.setNewRound);

module.exports = router;
