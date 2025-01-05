const express = require('express');
const paymentController = require('../controllers/PaymentController');
const router = express.Router();

router.post('/webhook', paymentController.webhook_post);
router.post('/:id/status', paymentController.checkStatus_post);

module.exports = router;