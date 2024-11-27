const express = require('express')
const router = express.Router();
const promotionController = require('../controllers/PromotionController')

router.get('/', promotionController.all_get)
router.post('/add', promotionController.create_post)
router.get('/:id', promotionController.getById_get)
router.put('/:id/edit', promotionController.edit_put)

module.exports = router;


