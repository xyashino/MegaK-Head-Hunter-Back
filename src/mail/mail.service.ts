import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailContext } from '@interfaces/mail-context';
import { BaseEntity } from 'typeorm';
import {
  ADMIN_NOTIFICATION_SUBJECT, ADMIN_NOTIFICATION_TEMPLATE,
  REGISTRATION_SUBJECT, REGISTRATION_TEMPLATE,
  RESET_PASSWORD_SUBJECT,
  RESET_PASSWORD_TEMPLATE,
} from '@constants/mail.constants';

@Injectable()
export class MailService {
@Inject(forwardRef(()=>MailerService))
private readonly mailerService: MailerService
  private async sendMail(mailData: {
    to: string;
    subject: string;
    template: string;
    context: MailContext;
  }): Promise<void> {
    try {
      await this.mailerService.sendMail(mailData);
    } catch (e) {
      throw e;
    }
  }

  async sendResetPasswordEmail(
    email: string,
    resetPasswordLink: string,
  ): Promise<string> {
    try {
      await this.sendMail({
        to: email,
        subject: RESET_PASSWORD_SUBJECT,
        template: RESET_PASSWORD_TEMPLATE,
        context: { resetPasswordLink },
      });
      return 'Email with password reset link sent successfully';
    } catch (e) {
      throw new HttpException(
        `Something went wrong by sending the email. Please try again later`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendRegistrationLink<T extends BaseEntity, U extends BaseEntity>(
    email: string,
    id: string,
    url: string,
    registerEntity: T,
    userEntity: U,
  ): Promise<void> {
    try {
      await this.sendMail({
        to: email,
        subject: REGISTRATION_SUBJECT,
        template: REGISTRATION_TEMPLATE,
        context: { registrationLink: `${url}/${id}` },
      });
    } catch (e) {
      await registerEntity.remove();
      await userEntity.remove();
      throw new HttpException(
        'Something went wrong by sending the email. User has not been added',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendAdminNotification(
    email: string,
    studentInfo: {
      id: string;
      firstname: string;
      lastname: string;
    },
  ): Promise<void> {
    await this.sendMail({
      to: email,
      subject: ADMIN_NOTIFICATION_SUBJECT,
      template: ADMIN_NOTIFICATION_TEMPLATE,
      context: { studentInfo },
    });
  }
}
