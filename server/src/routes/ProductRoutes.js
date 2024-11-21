const express = require('express')
const router = express.Router();
const productController = require('../controllers/ProductController')

router.get('/', productController.all_get)
router.get('/getByCategories', productController.allByCategory_get)


module.exports = router;


