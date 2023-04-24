import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import mailerconfig = require('../config/mailerconfig');

@Module({
  imports: [MailerModule.forRootAsync(mailerconfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
