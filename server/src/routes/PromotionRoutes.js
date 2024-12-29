const express = require('express')
const router = express.Router();
const promotionController = require('../controllers/PromotionController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const UserRole = require('../constant/UserRole');

router.get('/', authMiddleware([UserRole.Staff, UserRole.Manager]), promotionController.all_get)
router.get('/:id/detail', authMiddleware([UserRole.Staff, UserRole.Manager]), promotionController.getById_get)
router.get('/usableByUserId/:id', authMiddleware([UserRole.Staff, UserRole.Manager], UserRole.Customer),promotionController.usablePromotionsByUserId_get)
router.get('/statistics', authMiddleware([UserRole.Staff, UserRole.Manager]), promotionController.statistics_get)
router.post('/add',authMiddleware([UserRole.Manager]), promotionController.create_post)
router.put('/:id', authMiddleware([UserRole.Manager]),promotionController.edit_put)

module.exports = router;


