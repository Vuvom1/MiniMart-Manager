const express = require('express')
const router = express.Router();
const reportController = require('../controllers/ReportController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const UserRole = require('../constant/UserRole');

router.get('/overall-reports', authMiddleware([UserRole.Manager]), reportController.overallReport_get);
router.get('/shift-time-distribution',authMiddleware([UserRole.Manager]) , reportController.shiftTimeDistributionByMonths_get);
router.get('/order-sources-distribution',authMiddleware([UserRole.Manager]),  reportController.orderSourceDistributionByMonths_get);  
router.get('/current-stock-level', authMiddleware([UserRole.Manager]), reportController.currrentStockLevel_get);
router.get('/sale-distribution-by-category', authMiddleware([UserRole.Manager]), reportController.saleDistributionByCategory_get);

module.exports = router;


