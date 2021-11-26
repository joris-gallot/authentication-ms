import { User } from '.prisma/client';
import { IsDefined, IsEmail } from 'class-validator';

export interface ResponseSignUpDto {
  user: User;
  access_token: string;
}

export class SignUpDto {
  @IsDefined()
  username: string;

  @IsEmail()
  email: string;

  @IsDefined()
  password: string;
}
