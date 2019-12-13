import Router from 'koa-router';
import { store } from './store';

const torrentRoute = new Router();

torrentRoute.get('/', async (ctx) => {
  ctx.body = store.torrents;
});

torrentRoute.post('/', async (ctx) => {
  if (ctx.request.body.magnetURI && ctx.request.body.magnetURI.length > 0) {
    const torrent = await store.add(ctx.request.body.magnetURI);
    ctx.body = torrent;
  } else {
    ctx.body = { error: 'Invalid magnet link' };
  }
});

export { torrentRoute };
