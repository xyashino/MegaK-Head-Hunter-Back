import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Response } from 'express';
import { JwtPayload } from './jwt.strategy';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { hashPwd } from '@utils/hash-pwd';
import { User } from '@users/entities/user.entity';
import { MailService } from '@mail/mail.service';
import { UserStatus } from '@enums/user-status.enums';

@Injectable()
export class AuthService {
  @Inject(forwardRef(() => ConfigService))
  private configService: ConfigService;
  @Inject(forwardRef(() => MailService))
  private mailService: MailService;
  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = +this.configService.get('JWT_EXPIRES_SECONDS');
    const accessToken = sign(
      payload,
      this.configService.get('JWT_ACCESS_KEY'),
      {
        expiresIn,
      },
    );
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOneBy({ currentTokenId: token });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await User.findOneBy({
        email: req.email,
      });

      if (!user || !user.isActive) {
        return res
          .status(401)
          .json({ error: 'Nieprawidłowe dane uwierzytelniające' });
      }

      const hashedPwd = hashPwd(req.pwd);
      if (hashedPwd !== user.hashedPassword) {
        return res
          .status(401)
          .json({ error: 'Nieprawidłowe dane uwierzytelniające' });
      }

      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure:
            this.configService.get<string>('JWT_PROTOCOL_SECURE') === 'true',
          domain: this.configService.get<string>('DOMAIN'),
          httpOnly: this.configService.get('JWT_HTTP_ONLY') === 'true',
          maxAge: +this.configService.get('JWT_EXPIRES_SECONDS'),
        })
        .json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async logout(user: User, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure:
          this.configService.get<string>('JWT_PROTOCOL_SECURE') === 'true',
        domain: this.configService.get<string>('DOMAIN'),
        httpOnly: this.configService.get('JWT_HTTP_ONLY') === 'true',
        maxAge: +this.configService.get('JWT_EXPIRES_SECONDS'),
      });
      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async sendResetEmail(email): Promise<string> {
    const user = await User.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('Nie znaleziono użytkownika');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = hashPwd(resetToken);
    await user.save();
    const resetPasswordLink = `${process.env.RESET_PASSWORD_URL}?token=${resetToken}&id=${user.id}`;
    return await this.mailService.sendResetPasswordEmail(
      email,
      resetPasswordLink,
    );
  }

  async resetPassword(req: ResetPasswordDto, res) {
    try {
      const user = await User.findOneBy({
        id: req.userId,
        isActive: UserStatus.ACTIVE,
      });
      if (!user) {
        throw new NotFoundException('Nie znaleziono użytkownika');
      }

      const hashedToken = hashPwd(req.resetPasswordToken);

      if (hashedToken !== user.resetPasswordToken) {
        throw new HttpException(
          'Nieprawidłowy token resetowania hasła',
          HttpStatus.CONFLICT,
        );
      }

      const hashedPassword = hashPwd(req.newPassword);
      if (hashedPassword === user.hashedPassword) {
        throw new HttpException(
          'Nowe hasło musi być inne od ustawionego poprzednio',
          HttpStatus.CONFLICT,
        );
      }
      user.hashedPassword = hashedPassword;
      user.resetPasswordToken = null;
      await user.save();

      const authLogin = {
        email: user.email,
        pwd: req.newPassword,
      };
      await this.login(authLogin, res);
    } catch (e) {
      if (e instanceof HttpException) {
        res.status(e.getStatus()).send(e.getResponse());
      } else {
        console.error(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: 'Coś poszło nie tak podczas resetowania hasła',
        });
      }
    }
  }
}
