import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
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
    const expiresIn = 60 * 60 * 24;
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
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (user) {
        const hashedPwd = hashPwd(req.pwd);

        if (hashedPwd !== user.hashedPassword) {
          throw new HttpException('Password incorrect', HttpStatus.CONFLICT);
        }
      }

      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: this.configService.get('JWT_DOMAIN'),
          httpOnly: true,
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
        secure: false,
        domain: this.configService.get('JWT_DOMAIN'),
        httpOnly: true,
      });
      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
