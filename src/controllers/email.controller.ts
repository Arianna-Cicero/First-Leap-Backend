import { Controller, Post } from '@nestjs/common';
import { EmailService } from './../services/email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail() {
    const to = ['ariannacicero@protonmail.com'];
    const subject = 'Validation Code';
    const text = 'Here is your validation code xxx-xxx';
    const html = '<b>testtest?</b>';

    await this.emailService.sendEmail(to, subject, text, html);
  }
}

module.exports = EmailController;
