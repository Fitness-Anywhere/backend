const router = require('express').Router();
const Classes = require('../../../data/models/classes');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const bodyParser = require('body-parser');

router.post('/stripe', bodyParser.raw({type: 'application/json'}), async (req, res, next) => {
    try {
        const sig = req.headers['stripe-signature'];

        let event;

        // Verify webhook signature and extract the event.
        // See https://stripe.com/docs/webhooks/signatures for more information.
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            console.log('Payment intent: ', paymentIntent);
            await handleSuccessfulPaymentIntent(paymentIntent);
        }

        res.json({received: true});
    } catch (error) {
        next(error);
    }
});

const handleSuccessfulPaymentIntent = async (paymentIntent) => {
    // Fulfill the purchase.
  console.log('PaymentIntent: ' + JSON.stringify(paymentIntent));
  const { client_id, class_id } = paymentIntent.metadata;
  await Classes.addStripePaymentId(class_id, client_id, paymentIntent.id);
}

module.exports = router;
