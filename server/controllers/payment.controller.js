const db = require('../config/database');
const { getUserIdFromPseudo } = require('./user.controller');
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

exports.createSubscription = async (req, res) => {
    const { name, email, paymentMethod } = req.body;
    const priceId = "price_1MX0h2BqDvJIyvrbLxNWZGTP";   //id product on stripe (TO DO : save in db)
    // create a stripe customer
    const customer = await stripe.customers.create({
        name: name,
        email: email,
        payment_method: paymentMethod.paymentMethod.id,
        invoice_settings: {
            default_payment_method: paymentMethod.paymentMethod.id,
        },
    });
    console.log("CUSTOMER", customer.email)

    // create a stripe subscription
    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: priceId }],
        expand: ['latest_invoice.payment_intent']
    });

    console.log("SUBSCRIPTION", subscription.id, subscription.latest_invoice.payment_intent.status)
    // return the client secret and subscription id
    res.status(200).send({
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        status: subscription.latest_invoice.payment_intent.status
    });
}

exports.manageEventStripe = async (req, res) => {
    const event = req.body;

    // Handle the event
    switch (event.type) {
        case 'customer.subscription.deleted':
            
            const subscriptionEvent = event.data.object;
            //console.log("WEBHOOK", subscriptionEvent)
            const customerId = subscriptionEvent.customer;
            //get customer
            const customer = await stripe.customers.retrieve(customerId);
            console.log(event.type + " : " +customer.name)

            //request to db get user
            const idUser = await getUserIdFromPseudo(customer.name);
            sql = "DELETE "
            //remove subscribe
            
            break;
        default:
            //console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });

}