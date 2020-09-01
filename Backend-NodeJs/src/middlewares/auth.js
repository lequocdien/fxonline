const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../configs/authentication')

const auth = () => (req, res, next) => {
    const accessToken = req.headers['x-access-token'];
    if (accessToken) {
        jwt.verify(accessToken, SECRET_KEY, function (err, decoded) {
            if (err) {
                return next({
                    statusCode: 401,
                    payload: 'Invalid token!'
                });
            }
            else {
                res.identity = decoded;
                const { grp } = decoded;
                if (!grp) {
                    next({
                        statusCode: 401,
                        payload: 'Unauthorized - Chua cap quyen'
                    })
                }
                next();
            }
        })
    }
    else {
        return next({
            statusCode: 401,
            payload: 'Unauthorized!'
        });
    }
}

module.exports = auth;