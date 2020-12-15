let express = require('express');
let router = express.Router();
const loginController = require("../controllers/loginController.js");

router.post('/', loginController.startPage);
router.get('/', loginController.startPage);
router.post('/login', loginController.loginPage);
router.get('/login', loginController.loginPage);
router.post('/validate', loginController.validatePlayer);
router.post('/logout', loginController.handleLogout);
router.get('/logout', loginController.handleLogout);
router.post('/verify', loginController.verifyLogin);

module.exports = router;
