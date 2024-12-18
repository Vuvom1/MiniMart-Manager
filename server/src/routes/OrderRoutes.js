const express = require('express');
const orderController = require('../controllers/OrderController');
const router = express.Router();

router.get('/', orderController.all_get);
router.get('/:id', orderController.getById_get);
router.get('/getOrdersSortedByStatuses', orderController.getOrdersSortedByStatuses_get);
router.get('/getOrdersGroupedByStatusByUserId/:id', orderController.getOrderGroupedByStatusesByUserId_get);
router.post('/createWithUser', orderController.createWithUser_post);
router.put('/updateStatus/:id', orderController.updateStatus_put);

module.exports = router;