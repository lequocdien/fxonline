const jwt = require('jsonwebtoken');
const { loginValidation } = require('../helpers/validations');
const { execFunc } = require('../db/postgresql.db');
const { SECRET_KEY } = require('../configs/authentication');

const generateToken = ({ username, group, type }) => {
    const payload = {
        usr: username,
        grp: group,
        typ: type
    }
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET_KEY, (err, token) => {
            if (err) {
                reject(err.message)
            }
            resolve({
                accessToken: token
            })
        })
    })
}

const login = (req, res, next) => {
    const { error } = loginValidation.validate(req.body);
    if (error) {
        return next({
            statusCode: 400,
            payload: error.details[0].message
        });
    }

    const { username, password } = req.body;
    execFunc('fn_check_auth($1::text, $2::text)', [username, password])
        .then(data => {
            const { p_is_authenticated, p_group, p_type } = data.rows[0];
            if (p_is_authenticated) {
                return {
                    username: username,
                    group: p_group,
                    type: p_type
                }
            }
            next({
                statusCode: 400
            })
        })
        .then(data => generateToken(data))
        .then(data => res.send(data))
        .catch(err => next({
            statusCode: err.statusCode,
            payload: err.payload
        }))
}

module.exports = {
    login
}