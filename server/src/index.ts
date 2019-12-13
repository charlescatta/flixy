import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { loggerMiddleware } from './logger';
import { port } from './config';
import { torrentRoute } from './torrents/router';

const app = new Koa();

app.use(bodyParser());
app.use(loggerMiddleware);

const rootRouterV1 = new Router();

rootRouterV1.all('/', async (ctx) => {
  // tslint:disable-next-line: no-magic-numbers
  ctx.status = 200;
  ctx.body = `Hello ${ (typeof ctx.request.query.name !== 'undefined') ? ctx.request.query.name : 'you' }`;
});

rootRouterV1.use('/torrents', torrentRoute.routes());

app.use(rootRouterV1.routes());

app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`Listening on ${port}`);
});
