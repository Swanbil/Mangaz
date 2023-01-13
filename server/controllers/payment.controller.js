const db = require('../config/database');
const stripe = require("stripe")('sk_test_51MPrQLBqDvJIyvrbo2uyIBeIxKYU79YS5o7JTl3LqkpgS8p7aJqxIqPPmhNrCzaGhj4gLe4PBusChPwcixok9HYi00WVNDxBUn');

const calculateOrderAmount = (items) => {
    //getAmount
    return 1000;
  };

exports.createPaymentIntent = async (req, res) => {
    const { items } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}