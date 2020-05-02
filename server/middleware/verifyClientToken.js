module.exports = (req, res, next) => {
    if (req.client) {
        next();
    } else {
        res.status(401).json({
            errorMessage: 'Invalid credentials'
        });
    }
}