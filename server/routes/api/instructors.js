const router = require('express').Router();
// DB model functions
const Instructor = require('../../../data/models/instructors');
const Class = require('../../../data/models/classes');
// middlewares
const verifyId = require('../../middleware/verifyInstructorId');
const verifyClassId = require('../../middleware/verifyClassId');
const verifyClassFields = require('../../middleware/verifyClassRequiredFields');
const verifyInstructorPermissionToClass = require('../../middleware/verifyInstructorPermissionToClass');
const verifyInstructorToken = require('../../middleware/verifyInstructorToken');

// @route   GET /api/instructors
// @desc    Return all instructors
router.get('/', async (req, res, next) => {
    try {
        const instructors = await Instructor.findAll();
        res.json(instructors);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/instructors/:id
// @desc    Return an instructor by id
router.get('/:id', async (req, res, next) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        res.json(instructor);
    } catch (error) {
        next(error);
    }
});

// Middlewares
router.use('/:id/classes/:class_id', verifyClassId);
router.use('/:id/classes/:class_id', verifyInstructorPermissionToClass);
// Middleware that guarantees user logged in is an instructor
router.use('/', verifyInstructorToken);
// Verify if its a valid ID and if it matches with logged instructor ID
router.use('/:id', verifyId);

// @route   DELETE /api/instructors/:id
// @desc    Delete a instructor
router.delete('/:id', async (req, res, next) => {
    try {
        await Instructor.remove(req.params.id);
        res.json({
            message: 'Instructor removed successfully'
        });
    } catch (error) {
        next(error);
    }
});

// @route   PUT /api/instructors/:id
// @desc    Update instructor
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
        
        const instructor = await Instructor.update(id, {
            username,
            first_name,
            last_name,
            email,
            phone: phone || null
        });
    
        res.json(instructor);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/instructors/:id/classes
// @desc    Return all classes by instructor
router.get('/:id/classes', async (req, res, next) => {
    try {
        const classes = await Instructor.findClasses(req.params.id);
        res.json(classes);
    } catch (error) {
        next(error);
    }
});

// @route   POST /api/instructors/:id/classes
// @desc    Add a new class
router.post('/:id/classes', verifyClassFields, async (req, res, next) => {
    try {
        const registeredClass = await Class.add({
           ...req.body,
           instructor_id: req.params.id,
        });
        res.status(201).json(registeredClass);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/instructors/:id/classes/:class_id
// @desc    Return an specific class if instructor is the instructor of the class
router.get('/:id/classes/:class_id', async (req, res, next) => {
    try {
        // req.class is set in verifyClassId middleware
        res.json(req.class);
    } catch (error) {
        next(error);
    }
});

// @route   PUT /api/instructors/:id/classes/:class_id
// @desc    Edit a class
router.put('/:id/classes/:class_id', verifyClassFields, async (req, res, next) => {
    try {
        const { id, class_id } = req.params;
        
        // update class
        const updatedClass = await Class.update(class_id, {
            ...req.body,
            id: class_id,
            instructor_id: id
        });
        res.json(updatedClass);
    } catch (error) {
        next(error);
    }
});

// @route   DELETE /api/instructors/:id/classes/:class_id
// @desc    Delete a class
router.delete('/:id/classes/:class_id', async (req, res, next) => {
    try {
        const { class_id } = req.params;
        
        // delete class
        await Class.remove(class_id);
        res.status(200).json({
            message: 'Class successfully deleted'
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/instructors/:id/classes/:class_id
// @desc    Return clients of an specific class
router.get('/:id/classes/:class_id/clients', async (req, res, next) => {
    try {
        const { class_id } = req.params;

        // get clients from class with class_id
        const clients = await Class.findClients(class_id);
        res.json(clients);
    } catch (error) {
        next(error);
    }
});

module.exports = router;