const bcrypt = require('bcryptjs');

module.exports = [
    {
        username: 'omarr',
        password: bcrypt.hashSync('omarrr', 12),
        first_name: 'Lopez',
        last_name: 'Omar',
        email: 'omar1@gmail.com'
    },
    {
        username: 'testclient',
        password: bcrypt.hashSync('test123', 12),
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@gmail.com'
    }
]