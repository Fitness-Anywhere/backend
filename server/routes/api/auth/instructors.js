const router = require('express').Router();
const bcrypt = require('bcryptjs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const generateToken = require('../../../utils/generateToken');

const Instructor = require('../../../../data/models/instructors');
    
// @route   /api/auth/instructors/register
// @desc    Register instructor
router.post('/register', async (req, res, next) => {
    try {
        // required fields
        const { username, password, first_name, last_name, email } = req.body;
        if (!username || !password || !first_name || !last_name || !email) {
            return res.status(401).json({
                errorMessage: 'Missing required field'
            });
        }

        let instructor = await Instructor.findBy({username});
        if (instructor.length) {
            return res.status(401).json({
                errorMessage: 'Username is already taken'
            });
        }

        // verify if email is valid 
        instructor = await Instructor.findBy({email});
        if (instructor.length) {
            return res.status(401).json({
                errorMessage: 'This email is registered already'
            });
        }

        // Hash password with bcrypt
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
        const hash = bcrypt.hashSync(password, saltRounds);

        instructor = await Instructor.add({
            ...req.body,
            password: hash
        });

        res.status(201).json({
            id: instructor.id,
            username: instructor.username
        });
    } catch (error) {
        next(error);
    }
});

// @route   /api/auth/instructors/login
// @desc    Instructor login
router.post('/login', async (req, res, next) => {
    try {
        // required fields
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(401).json({
                errorMessage: 'Missing required field'
            });
        }

        // verify username
        const [instructor] = await Instructor.findBy({username});

        if (!instructor) {
            return res.status(401).json({
                errorMessage: 'Invalid username'
            });
        }

        // verify password
        if (!bcrypt.compareSync(password, instructor.password)) {
            return res.status(401).json({
                errorMessage: 'Invalid credentials'
            });
        }

        const token = generateToken({
            instructor: {
                id: instructor.id
            }
        });

        res.json({
            token,
            id: instructor.id
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/auth/instructors/stripe/connect
// @desc    Create a new stripe account for instructor
router.get('/stripe/connect/', async (req, res, next) => {
   
    try {
        const { code, state } = req.query;

        const [instructor_id] = state.split(process.env.STRIPE_STATE_VALUE, 1);
        console.log('instructor_id: ', instructor_id);
        if (!instructor_id) {
            return res.status(401).json({
                errorMessage: 'Instructor ID not found in state query'
            });
        }

        if (state != `${instructor_id}${process.env.STRIPE_STATE_VALUE}`) {
            return res.status(401).json({
                errorMessage: 'Incorrect state parameter'
            });
        }

        // Send the authorization code to Stripe's API.
        stripe.oauth.token({
            grant_type: 'authorization_code',
            code
        }).then(
            async (response) => {
                const stripe_account_id = response.stripe_user_id;

                // save stripe_account_id in instructors DB
                const instructor = await Instructor.addStripeAccountId(instructor_id, stripe_account_id);
               
                res.redirect(`https://anywherefitness04.netlify.app/account/instructor/${instructor_id}/profile`);
            },
            (err) => {
                if (err.type === 'StripeInvalidGrantError') {
                    return res.status(400).json({error: 'Invalid authorization code: ' + code});
                } else {
                    return res.status(500).json({error: 'An unknown error occurred.'});
                }
            }
        );
    } catch(err) {
        next(err);
    }
});

module.exports = router;