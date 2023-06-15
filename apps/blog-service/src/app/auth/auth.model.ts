import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export interface JTWTokenPayload {
  sub: number; // userId
  email: string;
}

export interface JWTUser extends JTWTokenPayload {
  iat: number;
  exp: number;
}

export interface SignInResponse {
  access_token: string;
}
