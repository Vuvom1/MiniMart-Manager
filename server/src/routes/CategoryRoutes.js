const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/CategoryController')

router.get('/', categoryController.all_get);
router.get('/:id/getSubCategoriesWithProducts', categoryController.subCategoriesWithProducts_get);

module.exports = router;
