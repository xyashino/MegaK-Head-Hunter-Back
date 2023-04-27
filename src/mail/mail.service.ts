import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailContext } from '../interfaces/mail-context';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: MailContext,
  ): Promise<any> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template,
        context,
      });
    } catch (e) {
      throw new HttpException(
        'Something went wrong by sending the email',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
