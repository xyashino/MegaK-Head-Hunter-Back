import {
  Body,
  Controller,
  Delete,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { Response } from 'express';
import { User } from '../users/entities/user.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendResetEmailDto } from './dto/send-reset-email.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Post('/login')
  async login(@Body() req: AuthLoginDto, @Res() res: Response): Promise<any> {
    return this.authService.login(req, res);
  }

  @Post('send-pwd-reset')
  async sendResetEmail(@Body() req: SendResetEmailDto) {
    return this.authService.sendResetEmail(req.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() req: ResetPasswordDto, @Res() res: Response) {
    return this.authService.resetPassword(req, res);
  }

  @Delete('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }
}
