const express = require('express')
const router = express.Router();
const positionController = require('../controllers/PositionController')
const authMiddleware = require('../middlewares/AuthMiddleware');
const UserRole = require('../constant/UserRole');

router.get('/',authMiddleware([UserRole.Manager]) , positionController.all_get)
router.post('/',authMiddleware([UserRole.Manager]) ,positionController.add_post)

module.exports = router;


