import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
class EmailService {
  constructor() {
    this.transporter = createTransport({
      // SMTP
    });
  }

  async sendEmail(to, subject, text) {
    try {
      await this.transporter.sendMail({
        from: 'verification@firtsleap.com',
        to: to,
        subject: subject,
        text: text,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

export default { EmailService };
