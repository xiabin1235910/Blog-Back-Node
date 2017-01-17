import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello World';
  // await http request to other http server
});

router.get('/:id', async (ctx, next) => {
  let param = ctx.params.id;
  ctx.body = `Hello World! --- ${param}`;
  // await ctx.engine.get('');
  // await http request to other http server
});

router.post('/', async (ctx, next) => {
  let user = ctx.body;
  await ctx.engine.post('', user);
  // await http request to other http server
});

export const user = router.routes();