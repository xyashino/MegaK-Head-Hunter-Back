import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailContext } from '@interfaces/mail-context';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: MailContext,
  ): Promise<any> {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }
}
