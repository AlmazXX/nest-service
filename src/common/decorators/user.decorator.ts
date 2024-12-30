import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LocalPayload } from 'src/auth/types/local-payload.type';

export const User = createParamDecorator<string, ExecutionContext>(
  (data, ctx): LocalPayload | LocalPayload[keyof LocalPayload] => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;

    return data ? user?.[data] : user;
  },
);
