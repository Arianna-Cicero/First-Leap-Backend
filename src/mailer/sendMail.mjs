import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.USER, // Sender address
    to: to, // Recipient address
    subject: subject, // Subject line
    text: text, // Plain text body
    html: html, // HTML body
  };

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    console.log('Email Sent');
  } catch (error) {
    console.error(error);
  }
};

sendMail(
  ['ariannacicero@protonmail.com'],
  'verification codes',
  'heres your verification code 123123',
  '<b>congrats!!</b>',
);
