const router = require('express').Router();

router.post('/stripe', async (req, res, next) => {
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
            handleSuccessfulPaymentIntent(paymentIntent);
        }

        res.json({received: true});
    } catch (error) {
        next(error);
    }
});

const handleSuccessfulPaymentIntent = (paymentIntent) => {
    // Fulfill the purchase.
  console.log('PaymentIntent: ' + JSON.stringify(paymentIntent));
}

module.exports = router;