import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInput } from './dto/signup.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(signUpInput: SignUpInput) {
    const hashedPassword = await argon2.hash(signUpInput.password);
    const user = await this.prisma.user.create({
      data: {
        email: signUpInput.email,
        hashedPassword,
        username: signUpInput.username,
      },
    });
    const { accessToken, refreshToken } = await this.createToken(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth, ${updateAuthInput}`;
  }

  remove(id: string) {
    return `This action removes a #${id} auth`;
  }

  async createToken(id: string, email: string) {
    const accessToken = await this.jwtService.signAsync(
      { id, email },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { id, email, accessToken },
      {
        expiresIn: '7d',
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const hashedToken = await argon2.hash(refreshToken);
    await this.prisma.user.update({
      where: { id },
      data: { hashedToken },
    });
  }
}
