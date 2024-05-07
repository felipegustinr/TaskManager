var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController'); // Corregir la referencia al controlador
router.post('/login', loginController.login);
module.exports = router;
