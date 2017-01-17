export const auth = config => {
  return async (ctx, next) => {
    ctx.token = ctx.header.token;
    await next();
  }
}