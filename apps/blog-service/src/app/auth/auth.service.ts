import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JTWTokenPayload, SignInResponse } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    password: string
  ): Promise<SignInResponse | undefined> {
    if (!(await this.userService.validatePassword(email, password))) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    const payload: JTWTokenPayload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
