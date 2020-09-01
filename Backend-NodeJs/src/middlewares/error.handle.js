exports.errorHandler = function () {
    return function (err, req, res, next) {
        console.log('err');
        console.log(err);
        if (err.payload) {
            return res.status(err.statusCode || 500).send({
                error: err.payload
            });
        } else {
            return res.status(500).send({
                error: err.message || err
            });
        }
    };
};