const router = require('express').Router();

router.use('/clients', require('./clients'));
router.use('/instructors', require('./instructors'));

module.exports = router;