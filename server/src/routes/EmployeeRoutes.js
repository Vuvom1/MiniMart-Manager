const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/EmployeeController')

router.get('/', employeeController.all_get);
router.get('/unscheduled', employeeController.unScheduledEmployees_get);

module.exports = router;   