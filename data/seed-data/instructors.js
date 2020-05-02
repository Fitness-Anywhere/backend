const bcrypt = require('bcryptjs');

module.exports = [
    {
        username: 'michaelscott',
        password: bcrypt.hashSync('bestbossever', 12),
        first_name: 'Michael',
        last_name: 'Scott',
        email: 'michaelscott@dundermifflin.com',
        phone: '5701234567'
    },
    {
        username: 'schrute',
        password: bcrypt.hashSync('fjdk.wo@dnvp#wu31&2987', 12),
        first_name: 'Dwight',
        last_name: 'Schrute',
        email: 'dwight@dundermifflin.com'
    },
    {
        username: 'jimhalpert',
        password: bcrypt.hashSync('dwightsucks', 12),
        first_name: 'James',
        last_name: 'Halpert',
        email: 'halpert@dundermifflin.com',
        phone: '5709155534'
    },
    {
        username: 'kevin',
        password: bcrypt.hashSync('iwantcookies', 12),
        first_name: 'Kevin',
        last_name: 'Malone',
        email: 'iwantcookies@dundermifflin.com',
        phone: '5708794565'
    }
]