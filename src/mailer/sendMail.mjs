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
    from: process.env.USER,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email Sent');
  } catch (error) {
    console.error(error);
  }
};

sendMail(
  ['xyz@xyz.com'],
  'verification codes',
  'heres your verification code 123123',
  '<b>congrats!!</b>',
);
