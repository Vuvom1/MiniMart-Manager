const express = require('express')
const router = express.Router();
const promotionController = require('../controllers/PromotionController')

router.get('/', promotionController.all_get)
router.post('/add', promotionController.create_post)
router.get('/:id/detail', promotionController.getById_get)
router.put('/:id/edit', promotionController.edit_put)
router.get('/statistics', promotionController.statistics_get)

module.exports = router;


