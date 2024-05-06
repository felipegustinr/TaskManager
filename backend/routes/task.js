var express = require('express');
var router = express.Router();
const taskController = require('../controllers').taskController;
router.get('/', taskController.list);
router.get('/full', taskController.listFull);
router.get('/:id', taskController.getById);
router.post('/', taskController.add);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);
module.exports = router;

