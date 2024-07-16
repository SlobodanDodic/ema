import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from './types/auth.types';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignUpInput } from './dto/signup.input';
import { SignInInput } from './dto/signin.input';
import { SignResponse } from './dto/sign-response';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    console.log('Tokens in signup:', tokens);

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      user,
    };
  }

  async signin(signInInput: SignInInput): Promise<SignResponse> {
    const user = await this.prisma.user.findUnique({
      where: { username: signInInput.username },
    });

    if (!user) throw new ForbiddenException('Access Denied');
    if (!user.isActivated) throw new BadRequestException('Not activated yet');

    const passwordMatches = await argon2.verify(
      user.hashedPassword,
      signInInput.password,
    );
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        hashedPassword: user.hashedPassword,
        hashedToken: user.hashedToken,
        isActivated: user.isActivated,
      },
    };
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateAuthInput: UpdateAuthInput) {
    return this.prisma.user.update({
      where: { id },
      data: updateAuthInput,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // Helper functions

  private async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = await argon2.hash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedToken },
    });
  }
}
