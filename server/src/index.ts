import express, { Response } from 'express';
import morgan from 'morgan';
import { torrentRoute } from './torrents/router';
import { port } from './config';


const app = express();

app.use(morgan('combined'));
app.use(express.json());


app.all('/', async (_, res: Response) => {
  // tslint:disable-next-line: no-magic-numbers
  res.status = 200;
  res.send("UP");
});

app.use('/torrents', torrentRoute);


app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`Listening on ${port}`);
});
