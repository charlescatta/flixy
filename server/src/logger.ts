import koa from 'koa'

export const loggerMiddleware = async (ctx: koa.Context, next: koa.Next) => {
  // tslint:disable-next-line: no-console
  const start = Date.now();
  await next();

  const rt = Date.now() - start;
  ctx.set('X-Response-Time', `${rt}ms`);
  // tslint:disable-next-line: no-console
  console.log(`${ctx.status} - ${ctx.url} ${rt} ms`);
}