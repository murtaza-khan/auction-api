import { createParamDecorator } from '@nestjs/common';

const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);
export { CurrentUser };
