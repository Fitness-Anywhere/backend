const router = require('express').Router();
const Class = require('../../../data/models/classes');
// middleware
const verifyClassId = require('../../middleware/verifyClassId');

router.use('/:class_id', verifyClassId);

// @route   GET /api/classes
// @desc    Return all classes
router.get('/', async (req, res, next) => {
    try {
        const classes = await Class.findAll();
        return res.json(classes);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/classes/:id
// @desc    Return specific class
router.get('/:class_id', async (req, res, next) => {
    try {
        // req.class is set in verifyClassId middleware
        res.json(req.class);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/classes/:id/instructor
// @desc    Return instructor of a specific class
router.get('/:class_id/instructor', async (req, res, next) => {
    try {
        // req.class is set in verifyClassId middleware
        const instructor = await Class.findInstructor(req.params.class_id);
        res.json(instructor);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/classes/:id/instructor
// @desc    Return clients of a specific class
router.get('/:class_id/clients', async (req, res, next) => {
    try {
        // req.class is set in verifyClassId middleware
        const instructor = await Class.findClients(req.params.class_id);
        res.json(instructor);
    } catch (error) {
        next(error);
    }
});

module.exports = router;