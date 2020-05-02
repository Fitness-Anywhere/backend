module.exports = (req, res, next) => {
    const { name, type, start_time, location, intensity, price } = req.body;

    if (!name || !type || !start_time || !location || !intensity || !price) {
        return res.status(401).json({
            errorMessage: 'Missing required field'
        });
    }

    next();
}