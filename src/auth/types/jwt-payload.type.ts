import { LocalPayload } from './local-payload.type';

export type JwtPayload = {
  iat: number;
  exp: number;
} & LocalPayload;
