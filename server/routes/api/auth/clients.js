const JWT = require('jsonwebtoken');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../../../utils/generateToken');

const Client = require('../../../../data/models/clients');

// @route   /api/auth/clients/register
// @desc    Register client
router.post('/register', async (req, res, next) => {
    try {
        // required fields
        const { username, password, first_name, last_name, email } = req.body;
        if (!username || !password || !first_name || !last_name || !email) {
            return res.status(401).json({
                errorMessage: 'Missing required field'
            });
        }

        let client = await Client.findBy({username});
        if (client.length) {
            return res.status(401).json({
                errorMessage: 'Username is already taken'
            });
        }

        // verify if email is valid 
        client = await Client.findBy({email});
        if (client.length) {
            return res.status(401).json({
                errorMessage: 'This email is registered already'
            });
        }

        // Hash password with bcrypt
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
        const hash = bcrypt.hashSync(password, saltRounds);

        client = await Client.add({
            ...req.body,
            password: hash
        });

        res.status(201).json({
            id: client.id,
            username: client.username
        });
    } catch (error) {
        next(error);
    }
});



// @route   /api/auth/clients/login
// @desc    Client login
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
        const [client] = await Client.findBy({username});

        if (!client) {
            return res.status(401).json({
                errorMessage: 'Invalid username'
            });
        }

        // verify password
        if (!bcrypt.compareSync(password, client.password)) {
            return res.status(401).json({
                errorMessage: 'Invalid credentials'
            });
        }

        const token = generateToken({
            client: {
                id: client.id
            }
        });

        res.json({
            token,
            id: client.id
        });
    } catch (error) {
        next(err);
    }
});

module.exports = router;