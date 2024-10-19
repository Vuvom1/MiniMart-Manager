const express = require('express');
const router = express.Router();

const customerController = require('../controllers/CustomerController')

router.use('/', customerController.index);

module.exports = router;   