const express = require('express')
const router = express.Router();
const importController = require('../controllers/ImportController')
const authMiddleware = require('../middlewares/AuthMiddleware');
const UserRole = require('../constant/UserRole');

router.get('/', authMiddleware([UserRole.Staff, UserRole.Manager]), importController.all_get)
router.get('/getById/:id', authMiddleware([UserRole.Staff, UserRole.Manager]), importController.getById_get)
router.post('/', authMiddleware([UserRole.Manager]), importController.add_post)
router.put('/:id',authMiddleware([UserRole.Manager]), importController.edit_put)
router.get('/statistic',authMiddleware([UserRole.Staff, UserRole.Manager]), importController.statistic_get)

module.exports = router;


