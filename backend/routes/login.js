var express = require('express');
var router = express.Router();
const loginController = require('../controllers').loginController;
router.post('/login', loginController.login);
module.exports = router;
