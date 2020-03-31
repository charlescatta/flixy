import { Router, Request, Response } from 'express'
import { store } from './store';

const torrentRoute = new Router();

torrentRoute.get('/', async (_, res: Response) => {
  res.json(store.torrents);
});

torrentRoute.post('/', async (req: Request, res: Response) => {
  console.log(req.body)
  if (req.body.magnetURI && req.body.magnetURI.length > 0) {
    const torrent = await store.add(req.body.magnetURI);
    res.json(torrent);
  } else {
    res.json({ error: 'Invalid magnet link' });
  }
});


export { torrentRoute };
