const Client = require('../../data/models/clients');

module.exports = async (req, res, next) => {
    try {
        // get (istructor or client) id and class_id from params
        const { id, class_id } = req.params;

        if (req.client) { // logged as a client means client needs to be registered in the class passes through param
            const clientClass = await Client.findClassById(id, class_id);

            if (!clientClass) {
                return res.status(401).json({
                    errorMessage: 'Client is not registered in class passed in URL'
                });
            }
    
            next();
        }
    } catch (error) {
        next(error);
    }
}