const express = require('express')
const router = express.Router();
const supplierController = require('../controllers/SupplierController')
const authMiddleware = require('../middlewares/AuthMiddleware');
const UserRole = require('../constant/UserRole');

router.get('/', authMiddleware([UserRole.Staff, UserRole.Manager]),supplierController.all_get)
router.post('/', authMiddleware([UserRole.Manager]),supplierController.add_post)
router.put('/:id',  authMiddleware([UserRole.Manager]),supplierController.edit_put)
router.get('/statistic',  authMiddleware([UserRole.Manager, UserRole.Staff]),supplierController.statistic_get)

module.exports = router;


