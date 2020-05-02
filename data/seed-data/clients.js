const bcrypt = require('bcryptjs');

module.exports = [
    {
        username: 'beesly',
        password: bcrypt.hashSync('ilovejim', 12),
        first_name: 'Pam',
        last_name: 'Halpert',
        email: 'beesly@dundermifflin.com',
        phone: '5701548524'
    },
    {
        username: 'ryanhoward',
        password: bcrypt.hashSync('forevertemp', 12),
        first_name: 'Ryan',
        last_name: 'Howard',
        email: 'ryan@tempatdundermifflin.com'
    },
    {
        username: 'Creed',
        password: bcrypt.hashSync('iamafraud', 12),
        first_name: 'Creed',
        last_name: 'Bratton',
        email: 'creed@dundermifflin.com'
    }
]