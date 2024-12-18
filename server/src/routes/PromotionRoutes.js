const express = require('express')
const router = express.Router();
const promotionController = require('../controllers/PromotionController')

router.get('/', promotionController.all_get)
router.get('/:id/detail', promotionController.getById_get)
router.get('/usableByUserId/:id', promotionController.usablePromotionsByUserId_get)
router.get('/statistics', promotionController.statistics_get)
router.post('/add', promotionController.create_post)
router.put('/:id', promotionController.edit_put)

module.exports = router;


