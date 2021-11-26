import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseSignInDto, SignInDto } from './dto/SignIn.dto';
import { ResponseSignUpDto, SignUpDto } from './dto/SignUp.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async signUp(payload: SignUpDto): Promise<ResponseSignUpDto> {
    const user = await this.prisma.user.create({ data: payload }).catch((e) => {
      if (e.code == 'P2002') {
        throw new BadRequestException('Email already taken');
      }

      return null;
    });

    if (user) {
      delete user.password;

      return {
        user: user,
        access_token: await this.authService.genToken(user),
      };
    }

    throw new BadRequestException('Error when trying to register');
  }

  async signIn(payload: SignInDto): Promise<ResponseSignInDto> {
    const user = await this.authService.validateUser(
      payload.email,
      payload.password,
    );

    if (user) {
      delete user.password;

      return {
        user,
        access_token: await this.authService.genToken(user),
      };
    }

    throw new BadRequestException('Invalid credentials.');
  }
}
