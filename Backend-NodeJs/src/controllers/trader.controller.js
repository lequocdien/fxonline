const generator = require('generate-password');
const { execFunc } = require("../db");
const sendMail = require('../helpers/mailer/mailer');
const { verifyTemplate } = require('../helpers/mailer/emailTemplate');
const { schemaInsertTrader, schemaUpdateTrader } = require("../helpers/validations/trader.validation");

const getByTradingAcc = (req, res, next) => {
    const tradingAcc = req.query['tradingAcc'];
    if (tradingAcc) {
        execFunc('fn_get_info_trader($1::integer)', [tradingAcc])
            .then(data => res.send(data))
            .catch(err => next(err));
    }
    else {
        next({
            statusCode: 400,
            payload: `param 'tradingAcc' is required.`
        })
    }
}

const lst = (req, res, next) => {
    execFunc('fn_get_info_trader()')
        .then(data => res.send(data))
        .catch(err => next(err));
}

const create = (req, res, next) => {
    const { first_name, last_name, gender, email, phone, identity_card, issued_on, issued_by, address, user_name, status_acc, group_id, description } = { ...req.body };

    var password = generator.generate({
        length: 6,
        uppercase: true
    });
    execFunc('fn_add_account_trader($1::text, $2::text, $3::bool, $4::text, $5::text, $6::text, $7::date, $8::text, $9::text, $10::text, $11::text, $12::bool, $13::text, $14::integer)', [first_name, last_name, gender, email, phone, identity_card, issued_on, issued_by, address, user_name, password, status_acc, description, group_id])
        .then(data => {
            sendMail({ to: email, subject: 'Đăng ký tài khoản FXOnline thành công.', html: verifyTemplate({ fullname: first_name + ' '+ last_name, username: user_name, password }) });
            res.send(data);
        })
        .catch(err => next(err));
}

const updateByAccountId = (req, res, next) => {
    const { first_name, last_name, gender, email, phone, identity_card, issued_on, issued_by, address, status_acc, description, group_id, acc_id } = { ...req.body };

    execFunc('fn_update_account_trader($1::text, $2::text, $3::bool, $4::text, $5::text, $6::text, $7::date, $8::text, $9::text, $10::bool, $11::text, $12::integer, $13::integer)', [first_name, last_name, gender, email, phone, identity_card, issued_on, issued_by, address, status_acc, description, group_id, acc_id])
        .then(data => res.send(data))
        .catch(err => next(err));
}

const deleteByAccountId = (req, res, next) => {
    const { acc_id } = { ...req.body };

    execFunc('fn_delete_account_trader($1::integer)', [acc_id])
        .then(data => res.send(data))
        .catch(err => next(err));
}

module.exports = {
    getByTradingAcc,
    lst,
    create,
    updateByAccountId,
    deleteByAccountId
}