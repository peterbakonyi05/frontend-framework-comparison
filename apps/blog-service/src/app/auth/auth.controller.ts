import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JWTUser, SignInDTO } from './auth.model';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';
import { AUTH_COOKIE_NAME } from './auth.constant';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: SignInDTO, @Res() res: Response) {
    const { access_token } = await this.authService.login(
      signInDto.email,
      signInDto.password
    );

    res
      .cookie(AUTH_COOKIE_NAME, access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      })
      .status(201)
      .send();
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  deleteCookie(@Res() res: Response) {
    res.clearCookie(AUTH_COOKIE_NAME).status(200).send();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const user: JWTUser = req.user;
    return this.userService.findOneById(user?.sub);
  }
}
