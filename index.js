import Koa from 'koa';

const app = new Koa();

app.use(ctx => {
  ctx.body = 'hello world';
});

app.listen(4000);

console.log('server starts successfully...');