import { LocalPayload } from './local-payload.type';

export type JwtPayload = {
  sub: string;
} & Pick<LocalPayload, 'login'>;

export type JwtPayloadSigned = {
  iat: number;
  exp: number;
} & JwtPayload;
