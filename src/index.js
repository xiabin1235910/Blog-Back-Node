import Koa from 'koa';

import config from '../config'

import { auth, blogEngine } from './middleware';
import * as router from './routers';

const app = new Koa();

app.use(auth());
app.use(blogEngine(config));

app.use('/user', router.user);

app.use(ctx => {
  ctx.body = 'hello world';
});

export default app