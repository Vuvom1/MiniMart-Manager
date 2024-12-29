const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/AuthMiddleware');

const customerController = require('../controllers/CustomerController');
const UserRole = require('../constant/UserRole');

router.get('/', authMiddleware([UserRole.Staff, UserRole.Manager]), customerController.all_get);
router.get('/statistic', authMiddleware([UserRole.Staff, UserRole.Manager]), customerController.statistic_get);
router.put('/:id/status', authMiddleware([UserRole.Staff, UserRole.Manager]), customerController.updateStatus_put);


module.exports = router;   