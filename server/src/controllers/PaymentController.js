const express = require('express');
const crypto = require('crypto');

class PaymentController {
    verifySignature = (req, res, next) => {
        const signature = req.headers['x-signature'];
        const payload = JSON.stringify(req.body);
        const secret = process.env.WEBHOOK_SECRET;

        const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex');

        if (hash === signature) {
            next();
        } else {
            res.status(400).send('Invalid signature');
        }
    };

    checkStatus_post = (req, res, next) => {
        
    }

    webhook_post  = (req, res)  => {
        const event = req.body;

        // Handle the event
        switch (event.type) {
            case 'payment.success':
                // Handle successful payment
                console.log('Payment successful:', event.data);
                // Update order status in the database
                break;
            case 'payment.failed':
                // Handle failed payment
                console.log('Payment failed:', event.data);
                // Update order status in the database
                break;
            default:
                console.log('Unhandled event type:', event.type);
        }

        res.status(200).send('Received');
    }
}

module.exports = new PaymentController();




