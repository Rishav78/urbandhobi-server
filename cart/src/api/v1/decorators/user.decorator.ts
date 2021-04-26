import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from 'src/typings';

export const UserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequest>();
    return request.user;
  },
);
