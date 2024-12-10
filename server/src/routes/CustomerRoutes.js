const express = require('express');
const router = express.Router();

const customerController = require('../controllers/CustomerController')

router.get('/', customerController.all_get);
router.get('/statistic', customerController.statistic_get);
router.put('/:id/updateStatus', customerController.updateStatus_put);


module.exports = router;   