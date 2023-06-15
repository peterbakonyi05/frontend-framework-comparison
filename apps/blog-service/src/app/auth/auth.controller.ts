import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTUser, SignInDTO } from './auth.model';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const a: JWTUser | undefined = req.user;
    return a ? this.userService.findOneById(a.sub) : undefined;
  }
}
