const jwt = require('jsonwebtoken');

module.exports = payload => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, {
        expiresIn: '1h'
    });
}