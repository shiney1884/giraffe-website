const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: '9e45d308c198a6d970098144c5daca86-71b35d7e-a0cd4042',
        domain: 'sandboxabfed12fc8aa4108809a818a6c6c6bff.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));
