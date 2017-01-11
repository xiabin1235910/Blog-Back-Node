export const auth = config => async (ctx, next) => {
  ctx.token = ctx.header.token;
  await next()
}