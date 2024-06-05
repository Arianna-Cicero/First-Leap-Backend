import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from '@src/mailer/sendMail';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-calendar-invite')
  async sendCalendarInviteWithEmail(@Body() body: any) {
    const {
      to,
      subject,
      description,
      startTime,
      endTime,
      emailSubject,
      emailText,
      emailHtml,
    } = body;

    if (
      !to ||
      !subject ||
      !description ||
      !startTime ||
      !endTime ||
      !emailSubject ||
      !emailText ||
      !emailHtml
    ) {
      return { message: 'Missing required fields.' };
    }

    try {
      await this.emailService.sendCalendarInviteWithEmail(
        to,
        subject,
        description,
        new Date(startTime),
        new Date(endTime),
        emailSubject,
        emailText,
        emailHtml,
      );
      return { message: 'Email with calendar invite sent successfully.' };
    } catch (error) {
      console.error('Error sending email with calendar invite:', error);
      return { message: 'Failed to send email with calendar invite.' };
    }
  }
}
