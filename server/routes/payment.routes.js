const express = require('express');
const router = express();
const paymentController = require('../controllers/payment.controller');

router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/create-subscription', paymentController.createSubscription)

module.exports = router;