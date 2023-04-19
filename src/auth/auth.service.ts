import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { hashPwd } from '../utils/hash-pwd';
import { Response } from 'express';
import { JwtPayload } from './jwt.strategy';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  @Inject(forwardRef(() => ConfigService))
  private configService: ConfigService;

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

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const hashedPwd = hashPwd(req.pwd);
      if (hashedPwd !== user.hashedPassword) {
        throw new UnauthorizedException('Invalid credentials');
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
}
