import Koa from 'koa';

import config from '../config'

import { auth, blogEngine } from './middleware';
import * as route from './routers';

const app = new Koa();

app.use(auth());
app.use(blogEngine(config));


import Router from 'koa-router';
let router = new Router();
router.use('/user', route.user);

app.use(router.routes());

app.use(ctx => {
  ctx.body = 'hello world';
});

export default app