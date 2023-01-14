const db = require('../config/database');
const stripe = require("stripe")(process.env.STRIPE_SK_KEY_TEST);

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