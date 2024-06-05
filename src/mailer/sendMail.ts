import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

@Injectable()
export class EmailService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI,
    );

    this.oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
  }

  private async createTransport() {
    const accessToken = await this.oauth2Client.getAccessToken();

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    const transporter = await this.createTransport();
    const mailOptions = {
      from: 'First Leap <process.env.USER>',
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

  async sendCalendarInvite(
    to: string,
    subject: string,
    description: string,
    startTime: Date,
    endTime: Date,
    eventId: string, // New parameter to identify the event
  ): Promise<string> {
    const calendar = google.calendar({
      version: 'v3',
      auth: this.oauth2Client,
    });

    const event = {
      summary: subject,
      description: description,
      start: {
        dateTime: startTime.toISOString(),
      },
      end: {
        dateTime: endTime.toISOString(),
      },
      attendees: [{ email: to }],
      reminders: {
        useDefault: true,
      },
    };

    try {
      const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        sendUpdates: 'all',
      });

      console.log('Calendar invite sent: ', response.data);

      // Return the event ID
      return response.data.id;
    } catch (error) {
      console.error('Error sending calendar invite:', error);
      throw error; // Rethrow the error
    }
  }

  async handleRSVPResponse(eventId: string, response: string): Promise<void> {
    try {
      // Logic to handle the RSVP response
      if (response === 'yes') {
        // Accept the invitation
        console.log('Accepted invitation for event:', eventId);
      } else if (response === 'no') {
        // Decline the invitation
        console.log('Declined invitation for event:', eventId);
      } else {
        console.error('Invalid RSVP response:', response);
      }
    } catch (error) {
      console.error('Error handling RSVP response:', error);
      throw error; // Rethrow the error
    }
  }

  async sendCalendarInviteWithEmail(
    to: string,
    subject: string,
    description: string,
    startTime: Date,
    endTime: Date,
    emailSubject: string,
    emailText: string,
    emailHtml: string,
  ): Promise<string> {
    try {
      // First, send the email
      await this.sendEmail(to, emailSubject, emailText, emailHtml);

      // Then, send the calendar invite
      const eventId = await this.sendCalendarInvite(
        to,
        subject,
        description,
        startTime,
        endTime,
        'eventId_placeholder', // Replace with actual event ID
      );

      return eventId;
    } catch (error) {
      console.error('Error sending email with calendar invite:', error);
      throw error; // Rethrow the error
    }
  }

  getEmailTemplate(feedbackType: string, verificationCode?: string) {
    switch (feedbackType) {
      case 'invalid_cv':
        return {
          subject: 'Invalid CV',
          text: 'Your CV is invalid. Please update and try again.',
          html: '<p>Your CV is invalid. You do not possess the requirements.</p>',
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
