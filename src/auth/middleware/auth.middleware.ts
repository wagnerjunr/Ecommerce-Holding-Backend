import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decodeJwt } from 'jose';

declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    const refreshToken = cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token não encontrado');
    }

    try {
      const decoded = decodeJwt(refreshToken);

      if (!decoded || !decoded.id) {
        throw new UnauthorizedException('Refresh token inválido');
      }

      const accessToken = decoded.id as string;
      req.user = accessToken;

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 15 * 60 * 1000, 
      });

      next();
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}