import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfigAsync } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { HrModule } from './hr/hr.module';
import { MailModule } from './mail/mail.module';
import { AdminCommand } from './commands/admin.command';
import { ConsoleModule } from 'nestjs-console';
import { StudentsModule } from './students/students.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeormConfigAsync),
    HrModule,
    UsersModule,
    AuthModule,
    MailModule,
    ConsoleModule,
    StudentsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminCommand],
})
export class AppModule {}
