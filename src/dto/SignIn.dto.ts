import { User } from '.prisma/client';
import { IsDefined, IsEmail } from 'class-validator';

export interface ResponseSignInDto {
  user: User;
  access_token: string;
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsDefined()
  password: string;
}
