import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch ? user : null;
    }

    return null;
  }

  public async genToken(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
