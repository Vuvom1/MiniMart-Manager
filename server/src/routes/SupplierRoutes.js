const express = require('express')
const router = express.Router();
const supplierController = require('../controllers/SupplierController')

router.get('/', supplierController.all_get)
router.post('/', supplierController.add_post)
router.put('/:id', supplierController.edit_put)
router.get('/statistic', supplierController.statistic_get)

module.exports = router;


