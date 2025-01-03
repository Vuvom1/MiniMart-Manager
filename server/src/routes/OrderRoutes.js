const express = require('express');
const orderController = require('../controllers/OrderController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const UserRole = require('../constant/UserRole');
const router = express.Router();

router.get('/', authMiddleware([UserRole.Manager, UserRole.Staff]), orderController.all_get);
router.get('/:id',authMiddleware([UserRole.Manager, UserRole.Staff]), orderController.getById_get);
router.get('/getOrdersSortedByStatuses', authMiddleware([UserRole.Manager, UserRole.Staff]), orderController.getOrdersSortedByStatuses_get);
router.get('/getOrdersGroupedByStatusByUserId/:id', authMiddleware([UserRole.Manager, UserRole.Staff ,UserRole.Customer]), orderController.getOrderGroupedByStatusesByUserId_get);
router.post('/createWithUser', authMiddleware([UserRole.Customer]), orderController.createWithUser_post);
router.put('/updateStatus/:id', authMiddleware([UserRole.Manager, UserRole.Staff, UserRole.Customer]), orderController.updateStatus_put);

module.exports = router;