const express = require('express')
const router = express.Router();
const importController = require('../controllers/ImportController')

router.get('/', importController.all_get)
router.get('/getById/:id', importController.getById_get)
router.post('/', importController.add_post)
router.put('/:id', importController.edit_put)
router.get('/statistic', importController.statistic_get)

module.exports = router;


