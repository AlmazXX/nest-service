import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export const refreshJwtConfig = registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: process.env.JWT_SECRET_REFRESH_KEY,
    expiresIn: process.env.TOKEN_REFRESH_EXPIRE_IN,
  }),
);
