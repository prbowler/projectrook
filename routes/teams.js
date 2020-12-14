let express = require('express');
let router = express.Router();
const teamController = require("../controllers/teamController.js");

router.post('/', teamController.addTeam);
router.post('/get', teamController.getTeam);

module.exports = router;