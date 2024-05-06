var express = require('express');
var router = express.Router();
const task_listController = require('../controllers').task_listController;
router.get('/', task_listController.list);
router.get('/full', task_listController.listFull);
router.get('/:id', task_listController.getById);
router.post('/', task_listController.add);
router.put('/:id', task_listController.update);
router.delete('/:id', task_listController.delete);
module.exports = router;

