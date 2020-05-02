const Instructor = require('../../data/models/instructors');

module.exports = async (req, res, next) => {
    const { id } = req.params;

    const instructor = await Instructor.findById(id);
    if (!instructor) {
        return res.status(401).json({
            errorMessage: 'Invalid ID'
        });
    }

    if (req.instructor.id != id) {
        return res.status(401).json({
            errorMessage: 'Logged in instructor ID does not match with ID passed in URL'
        });
    }
    
    req.instructor = instructor;
    next();
}