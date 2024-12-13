const express = require('express')
const router = express.Router();
const positionController = require('../controllers/PositionController')

router.get('/', positionController.all_get)
router.post('/add', positionController.add_post)

module.exports = router;


