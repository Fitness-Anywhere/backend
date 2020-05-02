module.exports = (error, req, res, next) => {
    res.status(500).json({
        error,
        errorMessage: 'There was an error in the server'
    });
}