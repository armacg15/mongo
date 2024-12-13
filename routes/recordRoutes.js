const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

router.get('/', recordController.getRecords);
router.post('/create', recordController.createRecord);
router.post('/update/:id', recordController.updateRecord);
router.post('/delete/:id', recordController.deleteRecord);

module.exports = router;
