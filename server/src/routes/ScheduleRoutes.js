const express = require('express');
const router = express.Router();

const scheduleController = require('../controllers/ScheduleController')

router.get('/', scheduleController.all_get);
router.post('/add', scheduleController.add_post);

module.exports = router;   