import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, type RegisterDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}


  async registerUser(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    if (!email || !password || !name) {
      throw new BadRequestException('Email, password e name são obrigatórios');
    }

    if (password.length < 6) {
      throw new BadRequestException('Password deve ter pelo menos 6 caracteres');
    }

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Usuário já existe com este email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return {
      message: 'Usuario registrado com sucesso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async logoutUser(cookies: any) {
    console.log('Cookies recebidos:', cookies);
    
    if (!cookies || !cookies.refreshToken) {
      throw new BadRequestException('Usuário não está logado ou token não encontrado');
    }
    
    const { refreshToken } = cookies;

    await this.prisma.user.updateMany({
      where: {
        refreshToken: refreshToken,
      },
      data: {
        refreshToken: null,
      },
    });

    return {
      message: 'Usuario deslogado com sucesso',
    };
  }

  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '15m' }
    );
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '7d' }
    );

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}