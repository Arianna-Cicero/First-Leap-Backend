import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
class VerificationService {
  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password',
      },
    });
  }

  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async sendVerificationEmail(email, verificationCode) {
    try {
      await this.transporter.sendMail({
        from: 'verification@firstleap.com',
        to: email,
        subject: 'Account Verification',
        text: `Your verification code is: ${verificationCode}`,
      });
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }
}

export default { VerificationService };
