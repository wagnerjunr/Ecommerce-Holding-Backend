import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto, @Res() res: Response) {
    console.log(registerDto.email, registerDto.password, registerDto.name);
    const result = await this.authService.registerUser(registerDto);

    res.json({
      message: result.message,
      user: result.user,
    });
  }

  
  @Post('logout')
  async logoutUser(@Req() req: Request, @Res() res: Response) {
    console.log(req.cookies);
    const result = await this.authService.logoutUser(req.cookies);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })
    .clearCookie('accessToken', {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })
    .json({
      message: result.message,
    });
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.loginUser(loginDto);

    res
      .cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 15 * 60 * 1000,
      })
      .json({
        message: 'Usuario logado com sucesso',
        user: result.user,
      });
  }
}
