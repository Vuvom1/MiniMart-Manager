const express = require('express')
const router = express.Router();
const shiftController = require('../controllers/ShiftController')

router.get('/', shiftController.all_get)
router.get('/groupByScheduleAndWeek', shiftController.allGroupByScheduleAndWeek_get)
router.post('/add', shiftController.add_post)
router.put('/:id', shiftController.edit_put)
router.delete('/:id', shiftController.delete)


module.exports = router;


