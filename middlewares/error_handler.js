module.exports = function(err, req, res, next)  {
    if (err) {
        console.error('Error: ', err);
        res.status(500).send('Internal Server Error');
    } else {
        next();
    }
};
