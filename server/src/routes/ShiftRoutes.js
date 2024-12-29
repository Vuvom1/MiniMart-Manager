const express = require('express')
const router = express.Router();
const shiftController = require('../controllers/ShiftController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const UserRole = require('../constant/UserRole');

router.get('/', authMiddleware([UserRole.Manager]), shiftController.all_get)
router.get('/groupByScheduleAndWeek', authMiddleware([UserRole.Manager]), shiftController.allGroupByScheduleAndWeek_get)
router.post('/add', authMiddleware([UserRole.Manager]), shiftController.add_post)
router.put('/:id', authMiddleware([UserRole.Manager]), shiftController.edit_put)
router.delete('/:id', authMiddleware([UserRole.Manager]), shiftController.delete)


module.exports = router;


