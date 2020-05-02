const Class = require('../../data/models/classes');

module.exports = async (req, res, next) => {
    try {
        // get (istructor or client) id and class_id from params
        const { id, class_id } = req.params;

        if (req.instructor) { // logged as an instructor means instructor needs to be the instructor of the class passed through param
            const currentClass = await Class.findById(class_id);

            if (currentClass.instructor_id != id) {
                return res.status(401).json({
                    errorMessage: 'Class ID passed in URL does not match with a class from this instructor'
                });
            }
    
            next();
        }
    } catch (error) {
        next(error);
    }
}