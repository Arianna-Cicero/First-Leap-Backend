// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.USER,
//     pass: process.env.APP_PASSWORD,
//   },
// });

// export const sendMail = async (to, subject, text, html) => {
//   const mailOptions = {
//     from: process.env.USER,
//     to: to,
//     subject: subject,
//     text: text,
//     html: html,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email Sent');
//   } catch (error) {
//     console.error(error);
//   }
// };

// sendMail(
//   ['xyz@xyz.com'],
//   'verification codes',
//   'heres your verification code 123123',
//   '<b>congrats!!</b>',
// );
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

@Injectable()
export class EmailService {
  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
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
      console.error('Error sending email:', error);
    }
  }

  getEmailTemplate(feedbackType: string, verificationCode?: string) {
    switch (feedbackType) {
      case 'invalid_cv':
        return {
          subject: 'Invalid CV',
          text: 'Your CV is invalid. Please update and try again.',
          html: '<p>Your CV is invalid. You do not posses the requirements.</p>',
        };
      case 'next_phase':
        return {
          subject: 'Next Phase',
          text: 'Congratulations! You have moved to the next phase.',
          html: '<p>Congratulations! You have moved to the next phase.</p>',
        };
      case 'process_succeed':
        return {
          subject: 'Process Succeeded',
          text: 'You have successfully passed the selection process.',
          html: '<p>You have successfully passed the selection process.</p>',
        };
      case 'process_failed':
        return {
          subject: 'Process Failed',
          text: 'Unfortunately, you did not pass the selection process.',
          html: '<p>Unfortunately, you did not pass the selection process.</p>',
        };
      case 'interview_scheduled':
        return {
          subject: 'Interview Scheduled',
          text: 'Your interview has been scheduled.',
          html: '<p>Your interview has been scheduled.</p>',
        };
      case 'interview_not_scheduled':
        return {
          subject: 'Interview Not Scheduled',
          text: 'We could not schedule your interview at this time.',
          html: '<p>We could not schedule your interview at this time.</p>',
        };
      case 'congratulations':
        return {
          subject: 'Congratulations!',
          text: 'Congratulations! You have been selected.',
          html: '<p>Congratulations! You have been selected.</p>',
        };
      case 'not_selected':
        return {
          subject: 'Not Selected',
          text: 'We regret to inform you that you were not selected.',
          html: '<p>We regret to inform you that you were not selected.</p>',
        };
      case 'verification_code':
        return {
          subject: 'Verification Code',
          text: `Here is your verification code: ${verificationCode}`,
          html: `<p>Here is your verification code: <b>${verificationCode}</b></p>`,
        };
      default:
        return {
          subject: 'Notification',
          text: 'You have received a new notification.',
          html: '<p>You have received a new notification.</p>',
        };
    }
  }
}
