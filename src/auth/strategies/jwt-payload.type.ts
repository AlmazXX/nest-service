import { LocalPayload } from './local-payload.type';

export type JwtPayload = LocalPayload & {
  iat: number;
  exp: number;
};
