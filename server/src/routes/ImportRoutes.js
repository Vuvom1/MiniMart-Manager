const express = require('express')
const router = express.Router();
const importController = require('../controllers/ImportController')

router.get('/', importController.all_get)
router.post('/add', importController.add_post)

module.exports = router;


