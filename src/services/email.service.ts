// email/email.service.ts
import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD,
      },
    });
  }

  async sendEmail(to: string[], subject: string, text: string, html: string) {
    const mailOptions = {
      from: {
        name: 'First Leap',
        address: process.env.USER,
      },
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email Sent');
    } catch (error) {
      console.error(error);
    }
  }
}
