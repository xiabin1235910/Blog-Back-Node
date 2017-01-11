import Koa from 'koa';

import { auth } from './middleware';
import * as router from './routers';

const app = new Koa();

app.use(auth());

app.use('/user', router.user)

app.use(ctx => {
  ctx.body = 'hello world';
});

export default app