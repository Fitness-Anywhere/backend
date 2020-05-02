const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// custom middlewares
const auth = require('./middleware/auth');
const errorMiddleware = require('./middleware/error');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => res.send('API running'));

// Define routes
server.use('/api/auth/', require('./routes/api/auth'));
server.use('/api/instructors', auth, require('./routes/api/instructors'));
server.use('/api/clients', auth, require('./routes/api/clients'));
server.use('/api/classes', auth, require('./routes/api/classes'));
server.use('/api/webhooks', require('./routes/api/webhooks'));

server.use(errorMiddleware);

module.exports = server;