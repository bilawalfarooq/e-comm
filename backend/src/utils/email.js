const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = require('../config');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use your SMTP provider
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    text,
    html,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
