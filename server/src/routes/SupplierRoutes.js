const express = require('express')
const router = express.Router();
const supplierController = require('../controllers/SupplierController')

router.get('/', supplierController.all_get)
router.post('/add', supplierController.add_post)

module.exports = router;


