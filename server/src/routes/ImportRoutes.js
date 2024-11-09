const express = require('express')
const router = express.Router();
const importController = require('../controllers/ImportController')

router.get('/', importController.all_get)
router.post('/add', importController.add_post)
router.put('/:id/edit', importController.edit_put)
router.get('/statistic', importController.statistic_get)

module.exports = router;


