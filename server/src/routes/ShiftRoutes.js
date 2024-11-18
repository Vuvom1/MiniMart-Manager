const express = require('express')
const router = express.Router();
const shiftController = require('../controllers/ShiftController')

router.get('/', shiftController.all_get)

module.exports = router;


