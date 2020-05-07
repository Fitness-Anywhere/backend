const router = require('express').Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Client = require('../../../data/models/clients');
const Class = require('../../../data/models/classes');
const Instructor = require('../../../data/models/instructors');
// midlewares
const verifyId = require('../../middleware/verifyClientId');
const verifyClassId = require('../../middleware/verifyClassId');
const verifyClientPermissionToClass = require('../../middleware/verifyClientPermissionToClass');
const verifyClientToken = require('../../middleware/verifyClientToken');

// Middleware that guarantees user logged in is a client
router.use('/', verifyClientToken);
router.use('/:id', verifyId);
router.use('/:id/classes/:class_id', verifyClassId);
router.use('/:id/classes/:class_id', verifyClientPermissionToClass);

// @route   GET /api/clients
// @desc    Return all clients
router.get('/', async (req, res, next) => {
    try {
        const clients = await Client.findAll();
        return res.json(clients);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/clients/:id
// @desc    Return an specific client
router.get('/:id', async (req, res, next) => {
    try {
        // req.client is set in verifyClientId middleware
        res.json(req.client);
    } catch (error) {
        next(error);
    }
});

// @route   DELETE /api/clients/:id
// @desc    Delete a client
router.delete('/:id', async (req, res, next) => {
    try {
        await Client.remove(req.params.id);
        res.json({
            message: 'Client removed successfully'
        });
    } catch (error) {
        next(error);
    }
});

// @route   PUT /api/clients/:id
// @desc    Update a client
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // required fields
        const { username, first_name, last_name, email, phone } = req.body;
        if (!username || !first_name || !last_name || !email) {
            return res.status(401).json({
                errorMessage: 'Missing required field'
            });
        }

        const client = await Client.update(id, {
            username,
            first_name,
            last_name,
            email,
            phone: phone || null
        });
        
        res.json(client);
    } catch (error) {
        next(error);
    }
});

// @route   POST /api/clients/:id/classes
// @desc    Client register to a class
router.post('/:id/classes', async (req, res, next) => {
    try {
        const { class_id } = req.body;
        
        if (!class_id) {
            return res.status(401).json({
                errorMessage: 'Missing required field'
            });
        }

        // TODO check if client is already register in the class

        // update DB
        const classRegistered = await Class.registerClient(req.params.id, class_id);

        // create stripe pay intent and return secret
        const client_secret = await createPaymentIntent(req.client, classRegistered);
        
        // send client secret to FE
        res.json({ client_secret });
    } catch (error) {
        next(error);
    }
});

const createPaymentIntent = async (client, classToRegister) => {
    try {
        const instructor = await Instructor.findById(classToRegister.instructor_id);
        
        let newClient = client;

        if (!classToRegister.price) {
            return res.status(401).json({
                errorMessage: 'The selected class has no charge'
            });
        }

        if (!instructor.stripe_account_id) {
            return res.status(401).json({
                errorMessage: 'The instructor of the selected class has not set up automatic payments'
            });
        }

        // get or create client stripe id
        if (!newClient.stripe_account_id) {
            const customer = await stripe.customers.create({
                email: newClient.email,
                name: `${newClient.first_name} ${newClient.last_name}`,
            });

            newClient = await Client.addStripeAccountId(newClient.id, customer.id);
        }

        // create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            payment_method_types: ['card'],
            amount: classToRegister.price * 100,
            currency: 'usd',
            // if client has stripe account, add it here using customer key
            customer: newClient.stripe_account_id,
            transfer_data: {
                destination: instructor.stripe_account_id,
            },
            metadata: { 'client_id': newClient.id, 'class_id': classToRegister.id }
        });

        console.log('client_sec: ', paymentIntent.client_secret);
        return paymentIntent.client_secret;
    } catch (error) {
        throw new Error('Error in payment intent');
    }
}

// @route   GET /api/clients/:id/classes
// @desc    Return classes from an specific client
router.get('/:id/classes', async (req, res, next) => {
    try {
        const classes = await Client.findClasses(req.params.id);
        res.json(classes);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/clients/:id/classes/:class_id
// @desc    Return a specific class if client is registered in class
router.get('/:id/classes/:class_id', async (req, res, next) => {
    try {
        // req.class is set in verifyClassId middleware
        res.json(req.class);
    } catch (error) {
        next(error);
    }
});

// @route   DELETE /api/clients/:id/classes/:class_id
// @desc    Client remove class
router.delete('/:id/classes/:class_id', async (req, res, next) => {
    try {
        const { id, class_id } = req.params;
        await Client.removeClass(id, class_id);
        res.json({
            message: 'Class successfully deleted'
        });
    } catch (error) {
        next(error);
    }
});



// @route   GET /api/clients/:id/classes/:class_id/payment
// @desc    Pay for a class
router.get('/:id/classes/:class_id/payment', async (req, res, next) => {
    try {
        const instructor_id = req.class.instructor_id;
        const instructor = await Instructor.findById(instructor_id);

        if (!req.class.price) {
            return res.status(401).json({
                errorMessage: 'The selected class has no charge'
            });
        }

        if (!instructor.stripe_account_id) {
            return res.status(401).json({
                errorMessage: 'The instructor of the selected class has not set up automatic payments'
            });
        }

        // get or create client stripe id
        if (!req.client.stripe_account_id) {
            const customer = await stripe.customers.create({
                email: req.client.email,
                name: `${req.client.first_name} ${req.client.last_name}`,
            });

            req.client = await Client.addStripeAccountId(req.client.id, customer.id);
        }

        // create payment intent
        stripe.paymentIntents.create({
            payment_method_types: ['card'],
            amount: req.class.price * 100,
            currency: 'usd',
            // if client has stripe account, add it here using customer key
            customer: req.client.stripe_account_id,
            transfer_data: {
                destination: instructor.stripe_account_id,
            }
        }).then(paymentIntent => {
            console.log(paymentIntent);
            res.json({
                client_secret: paymentIntent.client_secret
            });
        }).catch(err => {
            res.status(500).json({
                error: err,
                errorMessage: err.message
            });
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;