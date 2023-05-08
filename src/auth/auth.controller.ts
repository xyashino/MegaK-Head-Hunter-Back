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
import { UserObj } from '../common/decorators/user-obj.decorator';
import { Response } from 'express';
import { User } from '../users/entities/user.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendResetEmailDto } from './dto/send-reset-email.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @ApiCookieAuth()
  @ApiOkResponse({ description: 'User logged in successfully' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Post('/login')
  async login(@Body() req: AuthLoginDto, @Res() res: Response): Promise<any> {
    return this.authService.login(req, res);
  }

  @ApiOkResponse({
    description: 'Email with password reset link sent successfully',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({
    description:
      'Something went wrong by sending the email. Please try again later',
  })
  @Post('send-pwd-reset')
  async sendResetEmail(@Body() req: SendResetEmailDto) {
    return this.authService.sendResetEmail(req.email);
  }

  @ApiOkResponse({
    description: 'User logged in successfully',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiConflictResponse({
    description: 'Invalid password reset token',
  })
  @ApiConflictResponse({
    description: 'New password must be different',
  })
  @Post('reset-password')
  async resetPassword(@Body() req: ResetPasswordDto, @Res() res: Response) {
    return this.authService.resetPassword(req, res);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'User logout successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Delete('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }
}
