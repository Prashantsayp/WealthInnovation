// emailService.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password'
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'your_email@gmail.com',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email', err);
  }
};

module.exports = { sendEmail };
