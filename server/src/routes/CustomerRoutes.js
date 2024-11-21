const express = require('express');
const router = express.Router();

const customerController = require('../controllers/CustomerController')

router.get('/', customerController.all_get);
router.get('/statistic', customerController.statistic_get);


module.exports = router;   