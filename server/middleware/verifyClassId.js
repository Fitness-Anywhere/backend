const Class = require('../../data/models/classes');

module.exports = async (req, res, next) => {
    const { class_id } = req.params;
    
    const currentClass = await Class.findById(class_id);
    if (!currentClass) {
        return res.status(401).json({
            errorMessage: 'Invalid class ID'
        });
    }
    req.class = currentClass;
    next();
}