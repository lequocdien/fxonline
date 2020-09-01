const nodemailer = require('nodemailer');
const configMailer = require('../../configs/mailer/mailer');

const option = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: configMailer.email,
        pass: configMailer.pass
    }
}

var transporter = nodemailer.createTransport(option)

const sendMail = ({ to, subject, html }) => {
    return new Promise((reject, resolve) => {
        transporter.verify((error, success) => {
            if (error) {
                console.log('verify error')
                return reject(error);
            }
            else {
                var mail = {
                    from: configMailer.email,
                    to,
                    subject,
                    html
                }
                transporter.sendMail(mail, (error, info) => {
                    if (error) {
                        console.log('send error')
                        return reject(error);
                    }
                    return resolve(info.response);
                })
            }
        })
    })
}

module.exports = sendMail;